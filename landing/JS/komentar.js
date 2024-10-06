import { getDatabase, ref, set, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPLSygmsxDFsOViBpBSLop6W6VZxX01qI",
    authDomain: "bemfda-553f6.firebaseapp.com",
    projectId: "bemfda-553f6",
    storageBucket: "bemfda-553f6.appspot.com",
    messagingSenderId: "827643126339",
    appId: "1:827643126339:web:dacd7b9880c83f196deaf6",
    measurementId: "G-WQ5FKPHT39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Variable to store the current user's username
let currentUsername = '';

// Helper function to encode ID for selectors
function encodeId(id) {
    return id.replace(/[/]/g, '_');
}

// Function to add comment to Firebase
export function addComment() {
    const usernameInput = document.getElementById('username');
    const commentText = document.getElementById('commentText').value;

    if (currentUsername === '' && usernameInput.value === '') {
        alert('Harap isi nama!');
        return;
    }

    if (commentText === '') {
        alert('Harap isi komentar!');
        return;
    }

    if (currentUsername === '') {
        currentUsername = usernameInput.value;
    }

    const commentRef = push(ref(database, 'comments'));

    set(commentRef, {
        username: currentUsername,
        text: commentText,
        timestamp: new Date().toISOString(),
        replies: {}
    }).then(() => {
        displayComments();
    }).catch((error) => {
        console.error("Error writing new comment to Firebase Database", error);
    });

    document.getElementById('commentText').value = '';
    if (usernameInput) {
        usernameInput.style.display = 'none';
    }
}

// Function to create comment element with conditional delete button
function createCommentElement(comment, commentId, level = 0, replyToName = null) {
    let commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.style.marginLeft = `${level * 20}px`;

    const encodedId = encodeId(commentId);

    let replyToHTML = '';
    if (replyToName) {
        replyToHTML = `<p class="membalas"><small>Membalas ke: ${replyToName}</small></p>`;
    }

    let deleteButtonHTML = '';
    if (comment.username === currentUsername) {
        deleteButtonHTML = `<span class="delete-btn" onclick="deleteComment('${commentId}')">❌</span>`;
    }

    commentDiv.innerHTML = `
    <div class="comment-box">
        ${deleteButtonHTML}
        <h4 class="comment-username">${comment.username}</h4>
        ${replyToHTML}
        <p class="comment-text">${comment.text}</p>
        <p class="comment-timestamp"><small>${new Date(comment.timestamp).toLocaleString()}</small></p>
        <button class="comment-reply-btn" onclick="showReplyForm('${encodedId}', '${comment.username}')">Balas</button>
    
        <div id="replyForm-${encodedId}" class="reply-form" style="display: none;">
            ${currentUsername ? '' : `<input type="text" id="replyUsername-${encodedId}" class="reply-input" placeholder="Nama Anda" required autocomplete="off">`}
            <input type="text" id="replyText-${encodedId}" class="reply-input" placeholder="Tulis balasan..." required autocomplete="off">
            <button class="reply-submit-btn" onclick="addReply('${commentId}', '${comment.username}')">Kirim Balasan</button>
        </div>
        <div id="replies-${encodedId}" class="replies-container"></div>
    </div>
    `;
    return commentDiv;
}

// Recursive function to display comments and replies
function displayCommentAndReplies(comment, commentId, parentElement, level = 0) {
    const commentElement = createCommentElement(comment, commentId, level, comment.replyTo);
    parentElement.appendChild(commentElement);

    const encodedId = encodeId(commentId);
    const repliesContainer = commentElement.querySelector(`#replies-${encodedId}`);

    if (comment.replies) {
        Object.entries(comment.replies).forEach(([replyId, reply]) => {
            displayCommentAndReplies(reply, `${commentId}/replies/${replyId}`, repliesContainer, level + 1);
        });
    }
}

// Function to display comments from Firebase
export function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    const commentRef = ref(database, 'comments');
    onValue(commentRef, (snapshot) => {
        const comments = snapshot.val();
        if (comments) {
            Object.entries(comments).forEach(([commentId, comment]) => {
                displayCommentAndReplies(comment, commentId, commentList);
            });
        } else {
            commentList.innerHTML = '<p>Tidak ada komentar yang tersedia.</p>';
        }
    });

    // Hide username input if user has already commented
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.style.display = currentUsername ? 'none' : 'block';
    }
}

// Function to show reply form
window.showReplyForm = function(encodedId, replyToName) {
    const replyForm = document.getElementById(`replyForm-${encodedId}`);
    if (replyForm) {
        replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
        const replyText = document.getElementById(`replyText-${encodedId}`);
        replyText.placeholder = `Balas ke ${replyToName}...`;
    }
}

// Function to add reply to Firebase
window.addReply = function(commentId, replyToName) {
    const encodedId = encodeId(commentId);
    const replyText = document.getElementById(`replyText-${encodedId}`).value;

    if (currentUsername === '' && document.getElementById(`replyUsername-${encodedId}`)) {
        currentUsername = document.getElementById(`replyUsername-${encodedId}`).value;
    }

    if (currentUsername === '') {
        alert('Harap isi nama!');
        return;
    }

    if (replyText === '') {
        alert('Harap isi balasan!');
        return;
    }

    const replyRef = push(ref(database, `comments/${commentId}/replies`));

    set(replyRef, {
        username: currentUsername,
        text: replyText,
        timestamp: new Date().toISOString(),
        replies: {},
        replyTo: replyToName
    }).then(() => {
        displayComments();
    }).catch((error) => {
        console.error("Error writing new reply to Firebase Database", error);
    });

    document.getElementById(`replyText-${encodedId}`).value = '';
}

// Updated function to delete a comment or reply
window.deleteComment = function(path) {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus komentar ini?");
    if (confirmDelete) {
        const commentRef = ref(database, `comments/${path}`);
        remove(commentRef)
            .then(() => {
                displayComments();
            })
            .catch((error) => {
                console.error("Error deleting comment from Firebase", error);
            });
    }
}

// Load comments on window load
window.onload = function() {
    // Check if there's a stored username in localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        currentUsername = storedUsername;
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.style.display = 'none';
        }
    }
    displayComments();
};

// Expose addComment function to window
window.addComment = function() {
    addComment();
    // Store username in localStorage
    if (currentUsername) {
        localStorage.setItem('username', currentUsername);
    }
};
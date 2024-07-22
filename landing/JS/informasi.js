// Function to open the information overlay
function openInfo() {
    document.getElementById("info-overlay").style.display = "flex";
  }
  
  // Function to close the information overlay
  function closeInfo() {
    document.getElementById("info-overlay").style.display = "none";
  }
  
  // Add event listeners to menu items
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".info").addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default anchor behavior
      openInfo(); // Show the info overlay
    });
  
    // Optionally, you could also add an event listener to close the info overlay
    // when clicking outside of the content or on the close button
    document.querySelector(".info-close-btn").addEventListener("click", closeInfo);
  });
  
  // Optional: To open the info overlay automatically when the page loads
  document.addEventListener("DOMContentLoaded", function() {
     openInfo();
   });
  
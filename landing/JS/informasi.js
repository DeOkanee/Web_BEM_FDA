// Function to open the information overlay
function openInfo() {
    document.getElementById("info-overlay").style.display = "flex";
  }
  
  // Function to close the information overlay
  function closeInfo() {
    document.getElementById("info-overlay").style.display = "none";
  }
  
  // Check if the info overlay has been shown before
  function hasInfoBeenShown() {
    return localStorage.getItem("infoShown") === "true";
  }
  
  // Function to mark info as shown
  function markInfoAsShown() {
    localStorage.setItem("infoShown", "true");
  }
  
  // Add event listeners to menu items
  document.addEventListener("DOMContentLoaded", function() {
    // Show the info overlay if it hasn't been shown before
    if (!hasInfoBeenShown()) {
      openInfo();
      markInfoAsShown();
    }
  
    // Add event listener to the "info" menu item
    document.querySelector(".info").addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default anchor behavior
      openInfo(); // Show the info overlay
    });
  
    // Add event listener to the close button of the info overlay
    document.querySelector(".info-close-btn").addEventListener("click", closeInfo);
  
    // Optionally, add an event listener to close the info overlay when clicking outside of the content
    document.getElementById("info-overlay").addEventListener("click", function(event) {
      if (event.target === document.getElementById("info-overlay")) {
        closeInfo();
      }
    });
  });
  
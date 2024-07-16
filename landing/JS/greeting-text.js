let isScrolling;

window.addEventListener('scroll', function() {
  const greeting = document.getElementById('greeting');
  greeting.style.color = 'rgb(0, 0, 0)'; // Change to black while scrolling

  // Clear timeout if it's already set
  window.clearTimeout(isScrolling);

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function() {
    greeting.style.color = 'rgb(255, 255, 255)'; // Change back to white after scrolling stops
  }, 200); // Timeout in milliseconds (200ms in this example)
});

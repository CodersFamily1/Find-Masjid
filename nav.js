const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const homeIcon = document.getElementById("home-icon");

// Show or hide the navbar
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  
});

// Close navbar and go to home when home icon is clicked
homeIcon.addEventListener("click", () => {
  navbar.classList.remove("active");
  // Optionally navigate to the home section
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
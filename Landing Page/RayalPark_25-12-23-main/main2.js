document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.getElementById("nav-links");

  navMenu.addEventListener("click", () => {
    navMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    const status = navMenu.classList.contains("active");
    navMenu.classList.remove(`${status ? "ri-menu-line" : "ri-close-line"}`);
    navMenu.classList.add(`${status ? "ri-close-line" : "ri-menu-line"}`);
  });
});

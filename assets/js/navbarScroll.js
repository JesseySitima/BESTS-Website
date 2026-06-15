window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if (!nav) return;

  if (window.scrollY > 20) {
    nav.classList.add("shadow-lg");
  } else {
    nav.classList.remove("shadow-lg");
  }

});
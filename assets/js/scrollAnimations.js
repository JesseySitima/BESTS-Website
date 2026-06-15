// assets/js/scrollAnimations.js

export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // optional: stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  const elements = document.querySelectorAll(".scroll-animate");

  elements.forEach((el) => observer.observe(el));
}
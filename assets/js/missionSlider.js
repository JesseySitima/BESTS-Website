export function initMissionSlider() {
  const slides = document.querySelectorAll(".mission-slide");
  const dots = document.querySelectorAll("#slideDots button");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const missionVideo = document.getElementById("missionVideo");
  const missionSection = document.getElementById("mission");
  const sliderContainer = document.querySelector(".mission-slider");

  if (!slides.length || !missionSection) return;

  let currentSlide = 0;
  let slideInterval = null;

  const slideDuration = 2000;

  function showSlide(index) {
    // Stop any running timer
    stopAutoCycle();

    // Handle boundaries
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, idx) => {
      const isActive = idx === currentSlide;
      const video = slide.querySelector("video");

      if (isActive) {
        slide.classList.replace("opacity-0", "opacity-100");

        slide.classList.replace("z-0", "z-10");

        // VIDEO SLIDE
        if (video) {
          missionVideo.currentTime = 0;

          missionVideo
            .play()
            .catch((err) => console.log("Video autoplay blocked:", err));

          missionVideo.onended = () => {
            showSlide(currentSlide + 1);
          };
        }
      } else {
        slide.classList.replace("opacity-100", "opacity-0");

        slide.classList.replace("z-10", "z-0");

        // Reset inactive video
        if (video) {
          missionVideo.pause();
          missionVideo.currentTime = 0;
        }
      }
    });

    // Update dots

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.remove("bg-white/40");

        dot.classList.add(
          "bg-white",
          "ring-2",
          "ring-offset-2",
          "ring-california-gold",
          "w-6",
        );
      } else {
        dot.classList.remove(
          "bg-white",
          "ring-2",
          "ring-offset-2",
          "ring-california-gold",
          "w-6",
        );

        dot.classList.add("bg-white/40");
      }
    });

    // Start timer only for image slides

    const activeSlide = slides[currentSlide];

    if (!activeSlide.querySelector("video")) {
      startAutoCycle();
    }
  }

  function startAutoCycle() {
    stopAutoCycle();

    const activeSlide = slides[currentSlide];

    // Video controls itself
    if (activeSlide.querySelector("video")) {
      return;
    }

    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopAutoCycle() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Next button

  nextBtn?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  // Previous button

  prevBtn?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  // Dots

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.dot);

      showSlide(index);
    });
  });

  // Pause on hover

  sliderContainer?.addEventListener("mouseenter", () => {
    stopAutoCycle();
  });

  sliderContainer?.addEventListener("mouseleave", () => {
    startAutoCycle();
  });

  // Only run slider when Mission section visible

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAutoCycle();
        } else {
          stopAutoCycle();

          if (missionVideo) {
            missionVideo.pause();
          }
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(missionSection);

  // Initial load

  showSlide(currentSlide);
}

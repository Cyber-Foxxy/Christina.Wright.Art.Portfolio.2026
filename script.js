const music = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");

if (music && musicToggle) {
  music.volume = 0.18;

  const savedTime = localStorage.getItem("musicTime");
  const musicOn = localStorage.getItem("musicOn") === "true";

  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  musicToggle.textContent = musicOn ? "♫ Resume Music" : "♫ Play Music";

  musicToggle.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        localStorage.setItem("musicOn", "true");
        musicToggle.textContent = "♫ Pause Music";
      } else {
        music.pause();
        localStorage.setItem("musicOn", "false");
        musicToggle.textContent = "♫ Play Music";
      }
    } catch (error) {
      musicToggle.textContent = "Click Again";
    }
  });

  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  }, 500);
}const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const slides = document.querySelectorAll(".category-slide");
const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");
const dotsContainer = document.getElementById("carouselDots");

let currentIndex = 0;

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.className = "category-slide";

    const diff = (index - currentIndex + slides.length) % slides.length;

    if (diff === 0) slide.classList.add("active");
    else if (diff === 1) slide.classList.add("next-slide");
    else if (diff === 2) slide.classList.add("far-next");
    else if (diff === slides.length - 1) slide.classList.add("prev-slide");
    else if (diff === slides.length - 2) slide.classList.add("far-prev");
  });

  document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

if (slides.length && dotsContainer) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to category ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  updateCarousel();
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

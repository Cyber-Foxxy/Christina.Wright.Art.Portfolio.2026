/* Mobile menu */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

/* Paintings gallery */
const galleryGrid = document.getElementById("galleryGrid");

if (galleryGrid) {
  const paintings = [
    "painting-01.jpg", "painting-02.jpg", "painting-03.jpg",
    "painting-04.jpg", "painting-05.jpg", "painting-06.jpg",
    "painting-07.jpg", "painting-08.jpg", "painting-09.jpg",
    "painting-10.jpg", "painting-11.jpg", "painting-12.jpg",
    "painting-13.jpg", "painting-14.jpg", "painting-15.jpg",
    "painting-16.jpg", "painting-17.jpg", "painting-18.jpg"
  ];

  paintings.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    item.innerHTML = `
      <img 
        src="images/paintings/${file}" 
        alt="Painting ${index + 1}"
        loading="lazy"
      >
    `;

    galleryGrid.appendChild(item);
  });
}

/* Lightbox */
const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close-lightbox");

if (images.length && lightbox && lightboxImg && closeBtn) {
  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

/* Main page rotating carousel */
const slides = document.querySelectorAll(".category-slide");
const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");
const dotsContainer = document.getElementById("carouselDots");

let currentIndex = 0;
let carouselTimer;

function updateCarousel() {
  if (!slides.length) return;

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

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function previousSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 4000);
}

if (slides.length && dotsContainer) {
  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      startCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  prevBtn?.addEventListener("click", () => {
    previousSlide();
    startCarousel();
  });

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startCarousel();
  });

  updateCarousel();
  startCarousel();
}

/* Music */
const music = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");

if (music && musicToggle) {
  music.volume = 0.15;

  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) music.currentTime = parseFloat(savedTime);

  musicToggle.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        localStorage.setItem("musicPlaying", "true");
        musicToggle.textContent = "♫ Pause Music";
      } else {
        music.pause();
        localStorage.setItem("musicPlaying", "false");
        musicToggle.textContent = "♫ Play Music";
      }
    } catch {
      musicToggle.textContent = "Click Again";
    }
  });

  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  }, 1000);
}

/* Footer year */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

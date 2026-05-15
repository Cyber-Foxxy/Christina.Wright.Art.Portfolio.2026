const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const digitalImages = Array.from(document.querySelectorAll(".digital-card img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");
const prevLightbox = document.querySelector(".lightbox-prev");
const nextLightbox = document.querySelector(".lightbox-next");
let currentDigitalIndex = 0;

function openLightbox(index) {
  currentDigitalIndex = index;
  lightboxImg.src = digitalImages[currentDigitalIndex].src;
  lightboxImg.alt = digitalImages[currentDigitalIndex].alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeViewer() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

function showDigital(step) {
  currentDigitalIndex = (currentDigitalIndex + step + digitalImages.length) % digitalImages.length;
  lightboxImg.src = digitalImages[currentDigitalIndex].src;
  lightboxImg.alt = digitalImages[currentDigitalIndex].alt;
}

digitalImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

if (closeLightbox) closeLightbox.addEventListener("click", closeViewer);
if (prevLightbox) prevLightbox.addEventListener("click", () => showDigital(-1));
if (nextLightbox) nextLightbox.addEventListener("click", () => showDigital(1));

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeViewer();
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") showDigital(-1);
  if (event.key === "ArrowRight") showDigital(1);
});

/* Music button: MP3 file must be in the repository root:
   delosound-lofi-chill-2-466475.mp3 */
const music = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");

if (music && musicToggle) {
  music.volume = 0.15;

  const savedTime = localStorage.getItem("musicTime");
  const savedPlaying = localStorage.getItem("musicPlaying");

  if (savedTime && !Number.isNaN(parseFloat(savedTime))) {
    music.currentTime = parseFloat(savedTime);
  }

  musicToggle.textContent = savedPlaying === "true" ? "♫ Resume Music" : "♫ Play Music";

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
    } catch (error) {
      musicToggle.textContent = "Click Again";
    }
  });

  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  }, 1000);
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

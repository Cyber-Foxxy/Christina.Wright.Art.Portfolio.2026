const galleryGrid = document.getElementById("galleryGrid");

const paintings = [
  "painting-01.jpg",
  "painting-02.jpg",
  "painting-03.jpg",
  "painting-04.jpg",
  "painting-05.jpg",
  "painting-06.jpg",
  "painting-07.jpg",
  "painting-08.jpg",
  "painting-09.jpg",
  "painting-10.jpg",
  "painting-11.jpg",
  "painting-12.jpg",
  "painting-13.jpg",
  "painting-14.jpg",
  "painting-15.jpg",
  "painting-16.jpg",
  "painting-17.jpg",
  "painting-18.jpg"
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

const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close-lightbox");

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

const music = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");

if (music && musicToggle) {
  music.volume = 0.15;

  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  if (localStorage.getItem("musicPlaying") === "true") {
    music.play().catch(() => {});
    musicToggle.textContent = "♫ Pause Music";
  }

  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      localStorage.setItem("musicPlaying", "true");
      musicToggle.textContent = "♫ Pause Music";
    } else {
      music.pause();
      localStorage.setItem("musicPlaying", "false");
      musicToggle.textContent = "♫ Play Music";
    }
  });

  setInterval(() => {
    localStorage.setItem("musicTime", music.currentTime);
  }, 1000);
}

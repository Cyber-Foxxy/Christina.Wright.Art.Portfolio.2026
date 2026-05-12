const comicImages = Array.from(document.querySelectorAll(".comic-card img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");
const prevLightbox = document.querySelector(".lightbox-prev");
const nextLightbox = document.querySelector(".lightbox-next");
let currentComicIndex = 0;

function openLightbox(index) {
  currentComicIndex = index;
  lightboxImg.src = comicImages[currentComicIndex].src;
  lightboxImg.alt = comicImages[currentComicIndex].alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeViewer() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function showComic(step) {
  currentComicIndex = (currentComicIndex + step + comicImages.length) % comicImages.length;
  lightboxImg.src = comicImages[currentComicIndex].src;
  lightboxImg.alt = comicImages[currentComicIndex].alt;
}

comicImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeLightbox.addEventListener("click", closeViewer);
prevLightbox.addEventListener("click", () => showComic(-1));
nextLightbox.addEventListener("click", () => showComic(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeViewer();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") showComic(-1);
  if (event.key === "ArrowRight") showComic(1);
});

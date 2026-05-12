const menuToggle=document.querySelector(".menu-toggle");const navLinks=document.querySelector(".nav-links");const slides=Array.from(document.querySelectorAll(".category-slide"));const prevButton=document.querySelector(".carousel-arrow.prev");const nextButton=document.querySelector(".carousel-arrow.next");const dotsContainer=document.getElementById("carouselDots");let currentSlide=0;let autoplayTimer;document.getElementById("year").textContent=new Date().getFullYear();menuToggle.addEventListener("click",()=>{navLinks.classList.toggle("open")});slides.forEach((slide,index)=>{const dot=document.createElement("button");dot.className="carousel-dot";dot.setAttribute("aria-label",`Go to category ${index+1}`);dot.addEventListener("click",()=>{currentSlide=index;updateCarousel();resetAutoplay()});dotsContainer.appendChild(dot)});const dots=Array.from(document.querySelectorAll(".carousel-dot"));function updateCarousel(){const totalSlides=slides.length;slides.forEach((slide,index)=>{slide.className="category-slide";const previous=(currentSlide-1+totalSlides)%totalSlides;const next=(currentSlide+1)%totalSlides;const farPrevious=(currentSlide-2+totalSlides)%totalSlides;const farNext=(currentSlide+2)%totalSlides;if(index===currentSlide){slide.classList.add("active")}else if(index===previous){slide.classList.add("prev-slide")}else if(index===next){slide.classList.add("next-slide")}else if(index===farPrevious){slide.classList.add("far-prev")}else if(index===farNext){slide.classList.add("far-next")}});dots.forEach((dot,index)=>{dot.classList.toggle("active",index===currentSlide)})}function goToNextSlide(){currentSlide=(currentSlide+1)%slides.length;updateCarousel()}function goToPreviousSlide(){currentSlide=(currentSlide-1+slides.length)%slides.length;updateCarousel()}function startAutoplay(){autoplayTimer=setInterval(goToNextSlide,4500)}function resetAutoplay(){clearInterval(autoplayTimer);startAutoplay()}nextButton.addEventListener("click",()=>{goToNextSlide();resetAutoplay()});prevButton.addEventListener("click",()=>{goToPreviousSlide();resetAutoplay()});document.addEventListener("keydown",event=>{if(event.key==="ArrowRight"){goToNextSlide();resetAutoplay()}if(event.key==="ArrowLeft"){goToPreviousSlide();resetAutoplay()}});let touchStartX=0;let touchEndX=0;const carousel=document.getElementById("categoryCarousel");carousel.addEventListener("touchstart",event=>{touchStartX=event.changedTouches[0].screenX});carousel.addEventListener("touchend",event=>{touchEndX=event.changedTouches[0].screenX;handleSwipe()});function handleSwipe(){const swipeDistance=touchEndX-touchStartX;if(swipeDistance>50){goToPreviousSlide();resetAutoplay()}if(swipeDistance<-50){goToNextSlide();resetAutoplay()}}updateCarousel();startAutoplay();
const menuToggle = document.querySelector(".menu-toggle");
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

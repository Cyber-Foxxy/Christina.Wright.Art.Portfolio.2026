const galleryGrid = document.getElementById("galleryGrid");

for(let i=1;i<=18;i++){

  const number = String(i).padStart(2,"0");

  const item = document.createElement("div");
  item.className = "gallery-item";

  item.innerHTML = `
   <img src="images/paintings/painting-01.jpg"
   <img src="images/paintings/painting-02.jpg"
   <img src="images/paintings/painting-03.jpg"
   <img src="images/paintings/painting-04.jpg"
   <img src="images/paintings/painting-05.jpg"
   <img src="images/paintings/painting-06.jpg"
   <img src="images/paintings/painting-07.jpg"
   <img src="images/paintings/painting-08.jpg"
   <img src="images/paintings/painting-09.jpg"
   <img src="images/paintings/painting-10.jpg"
   <img src="images/paintings/painting-11.jpg"
   <img src="images/paintings/painting-12.jpg"
   <img src="images/paintings/painting-13.jpg"
   <img src="images/paintings/painting-14.jpg"
   <img src="images/paintings/painting-15.jpg"
   <img src="images/paintings/painting-16.jpg"
   <img src="images/paintings/painting-17.jpg"
   <img src="images/paintings/painting-18.jpg"
  alt="Painting ${number}">
  `;

  galleryGrid.appendChild(item);
}

const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close-lightbox");

images.forEach(img=>{
  img.addEventListener("click",()=>{
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click",()=>{
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click",(e)=>{
  if(e.target === lightbox){
    lightbox.classList.remove("active");
  }
});

const music = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");

music.volume = 0.15;

if(localStorage.getItem("musicTime")){
  music.currentTime = parseFloat(localStorage.getItem("musicTime"));
}

if(localStorage.getItem("musicPlaying") === "true"){
  music.play().catch(()=>{});
  musicToggle.textContent = "♫ Pause Music";
}

musicToggle.addEventListener("click",()=>{
  if(music.paused){
    music.play();
    localStorage.setItem("musicPlaying","true");
    musicToggle.textContent = "♫ Pause Music";
  }else{
    music.pause();
    localStorage.setItem("musicPlaying","false");
    musicToggle.textContent = "♫ Play Music";
  }
});

setInterval(()=>{
  localStorage.setItem("musicTime", music.currentTime);
},1000);

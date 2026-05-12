const galleryGrid = document.getElementById("galleryGrid");

for(let i=1;i<=18;i++){

  const number = String(i).padStart(2,"0");

  const item = document.createElement("div");
  item.className = "gallery-item";

  item.innerHTML = `
  <img src="images/paintings/painting-${number}.jpg"
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

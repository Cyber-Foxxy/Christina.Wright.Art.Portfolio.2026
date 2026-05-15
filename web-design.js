const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

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

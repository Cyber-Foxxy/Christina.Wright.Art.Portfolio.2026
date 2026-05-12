const track = document.getElementById('carouselTrack');
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');

if (track && prev && next) {
  prev.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' });
  });
}

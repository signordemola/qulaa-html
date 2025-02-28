document.addEventListener("DOMContentLoaded", () => {
  // Banner Slider
  const slides = document.querySelectorAll("#slider li");
  const tabs = document.querySelectorAll(".callbacks_tabs li");

  const nextSlideBtn = document.getElementById("next");
  const prevSlideBtn = document.getElementById("prev");
  let currentSlide = 0;
  let autoPlay = true;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
      slide.style.zIndex = i === index ? "2" : "1";
    });

    tabs.forEach((tab, i) => {
      i === index
        ? tab.classList.add("callbacks_here")
        : tab.classList.remove("callbacks_here");
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextSlideBtn.addEventListener("click", () => {
    nextSlide();
  });

  prevSlideBtn.addEventListener("click", () => {
    prevSlide();
  });

  // Auto-play
  function startSlider() {
    slideInterval = setInterval(nextSlide, 3500);
  }

  // Tab click handlers
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      currentSlide = index;
      showSlide(currentSlide);
      if (autoPlay) {
        clearInterval(slideInterval);
        startSlider();
      }
    });
  });

  // Initial setup
  showSlide(0);
  startSlider();

  //   Products slider
  const bxslider = document.getElementById("bxslider");
  let scrollPosition = 0;
  const scrollSpeed = 1; // Pixels per frame

  function animateSlider() {
    scrollPosition += scrollSpeed;

    // Reset position when scrolled full width
    if (scrollPosition >= bxslider.scrollWidth - bxslider.clientWidth) {
      scrollPosition = 0;
    }

    bxslider.style.transform = `translateX(-${scrollPosition}px)`;
    requestAnimationFrame(animateSlider);
  }

  // Start animation
  animateSlider();
});

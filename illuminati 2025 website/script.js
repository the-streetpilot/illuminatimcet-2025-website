// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".about-img");
  let currentIndex = 0;

  setInterval(() => {
    images.forEach((img, index) => {
      img.classList.toggle("active", index === currentIndex);
    });

    currentIndex = (currentIndex + 1) % images.length;
  }, 2000); // Change every 2 seconds
});


// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const qrCode = document.getElementById("qrCodeImage");

qrCode.addEventListener("click", function () {
  lightbox.classList.add("show");
  lightboxImg.src = qrCode.src;
});

// Function to open the lightbox with the active image
function openLightbox() {
  const activeImage = document.querySelector('.about-img.active'); // Get the active image
  if (activeImage) {
    lightbox.classList.add('show');
    lightboxImg.src = activeImage.src; // Set the lightbox image source to the active image
  }
}

// Add click event to the about-image container
document.querySelector('.about-image').addEventListener('click', openLightbox);

// Close Lightbox when the close button is clicked
closeBtn.addEventListener("click", function () {
  lightbox.classList.remove("show");
});

// Close Lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
  }
});

// Close Lightbox on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    lightbox.classList.remove('show');
  }
});



// Initialize Swiper for Events Section
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".events-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Category Tab Switching Logic
  const categoryButtons = document.querySelectorAll(".event-tabs .tab-button");
  const slides = document.querySelectorAll(".swiper-slide");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show or hide slides based on the selected category
      slides.forEach((slide) => {
        if (category === "all" || slide.getAttribute("data-category") === category) {
          slide.style.display = "flex"; // Show matching slides
        } else {
          slide.style.display = "none"; // Hide non-matching slides
        }
      });

      swiper.update(); // Update Swiper after filtering
    });
  });
});

// Navbar Opacity on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.opacity = '0'; // Hide when scrolling down
  } else {
    navbar.style.opacity = '1'; // Show only when at the top
  }
});

// Modal Event Listener
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalRules = document.getElementById("modalRules");
const closeModal = document.getElementById("closeModal");

// Modal Tab Switching Logic
const modalTabButtons = document.querySelectorAll(".modal-tabs .tab-button");
const modalTabContents = document.querySelectorAll(".modal-info .tab-content");

let defaultImage = "";
let rulesImage = "";

modalTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.getAttribute("data-tab");

    // Remove active class from all modal tab buttons and contents
    modalTabButtons.forEach((btn) => btn.classList.remove("active"));
    modalTabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to the clicked modal tab button and corresponding content
    button.classList.add("active");
    document.getElementById(tab).classList.add("active");

    // Change the poster image when switching tabs
    modalImg.src = (tab === "rules") ? rulesImage : defaultImage;
  });
});

// Open Modal Logic
document.querySelectorAll('.btn-secondary').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const card = e.target.closest('.event-card');
    defaultImage = card.querySelector("img").src;
    rulesImage = e.target.getAttribute("data-rules-image") || defaultImage;

    modalImg.src = defaultImage;

    const title = e.target.getAttribute("data-title");
    const description = e.target.getAttribute("data-description");
    const rules = e.target.getAttribute("data-rules");

    modalTitle.innerText = title;
    modalDescription.innerText = description;
    modalRules.innerText = rules;

    // Reset modal tabs to show Info by default
    modalTabButtons[0].classList.add("active");
    modalTabButtons[1].classList.remove("active");
    modalTabContents[0].classList.add("active");
    modalTabContents[1].classList.remove("active");

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

// Close Modal Logic
if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  });
}

// Close Modal When Clicking Outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});


document.addEventListener("scroll", function () {
  const scrolled = window.scrollY;
  const parallax = document.querySelector(".events-section");
  
  if (parallax) {
    parallax.style.backgroundPositionY = -(scrolled * 0.3) + "px"; // Adjust speed
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

 
document.addEventListener("DOMContentLoaded", function () {
  const paymentCard = document.querySelector(".payment-card");

  // Add a fade-in animation when the payment card comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  observer.observe(paymentCard);
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const closeMenu = document.getElementById("closeMenu");

  // Open menu on clicking ☰
  menuToggle.addEventListener("click", () => {
    navLinks.classList.add("active");
  });

  // Close menu on clicking ✖
  closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("backgroundMusic");
  const playPauseBtn = document.getElementById("togglePlayPause");
  const decreaseVolumeBtn = document.getElementById("decreaseVolume");
  const increaseVolumeBtn = document.getElementById("increaseVolume");

  // Set default volume to 50%
  audio.volume = 0.02;

  // Try autoplaying when user interacts
  function enableAudioPlayback() {
    audio.play().catch(error => {
      console.log("Autoplay blocked. Waiting for user interaction.");
    });

    // Remove the event listener after the first interaction
    document.removeEventListener("click", enableAudioPlayback);
  }

  // Try playing when the user clicks anywhere on the page
  document.addEventListener("click", enableAudioPlayback);

  // Play/Pause Button
  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = "⏸"; // Change icon to pause
    } else {
      audio.pause();
      playPauseBtn.innerHTML = "▶"; // Change icon to play
    }
  });

  // Decrease Volume
  decreaseVolumeBtn.addEventListener("click", function () {
    if (audio.volume > 0.1) {
      audio.volume -= 0.1;
    } else {
      audio.volume = 0; // Mute if too low
    }
  });

  // Increase Volume
  increaseVolumeBtn.addEventListener("click", function () {
    if (audio.volume < 0.9) {
      audio.volume += 0.1;
    } else {
      audio.volume = 1; // Max volume
    }
  });
});



window.addEventListener("load", function () {
  const loading = document.querySelector(".loading");

  // Hide the loading animation after 3 seconds
  setTimeout(function () {
    if (loading) {
      // Add the fade-out class to trigger the transition
      loading.classList.add("fade-out");

      // Remove the loading element after the transition ends
      loading.addEventListener("transitionend", function () {
        loading.remove();
      });
    }
  }); // 3000ms = 3 seconds
});
 


// Countdown Timer Logic
const countdown = () => {
  const countDate = new Date("March 21, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  // Time calculations
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Calculate the remaining time
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  // Update the HTML
  document.getElementById("days").innerText = textDay;
  document.getElementById("hours").innerText = textHour;
  document.getElementById("minutes").innerText = textMinute;
  document.getElementById("seconds").innerText = textSecond;
};

// Update the countdown every second
setInterval(countdown, 1000);


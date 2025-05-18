document.addEventListener("DOMContentLoaded", function () {
  // Category Tab Switching Logic
  const categoryButtons = document.querySelectorAll(".event-tabs .tab-button");
  const eventCards = document.querySelectorAll(".event-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show or hide event cards based on the selected category
      eventCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Modal Elements
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
});


document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".event-tabs .tab-button");
  const eventCards = document.querySelectorAll(".event-card");

  // Function to set the active category
  function setActiveCategory(category) {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-category") === category) {
        btn.classList.add("active");
      }
    });

    eventCards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Check URL parameters for category selection
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");

  if (categoryFromUrl) {
    setActiveCategory(categoryFromUrl);
  }

  // Event listener for category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedCategory = this.getAttribute("data-category");
      setActiveCategory(selectedCategory);
    });
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

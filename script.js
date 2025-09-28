document.addEventListener("DOMContentLoaded", () => {
  // === Responsive nav ===
  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.getElementById("mainNav");

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      console.log("aria-expanded now:", menuBtn.getAttribute("aria-expanded"));
    });
  }

  // === Portfolio Filtering ===
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".gallery .card");

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");
        portfolioCards.forEach(card => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // === Lightbox ===
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbClose = document.getElementById("lbClose");

  document.querySelectorAll("#portfolio .gallery img").forEach(img => {
    img.addEventListener("click", () => {
      if (!lightbox || !lbImg) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    if (!lightbox || !lbImg) return;
    lightbox.style.display = "none";
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // === Contact Form ===
  const form = document.getElementById("contactForm");
  const thankYouMsg = document.getElementById("thankYouMsg");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          thankYouMsg.style.display = "block";
          form.reset();
          setTimeout(() => {
            thankYouMsg.style.display = "none";
          }, 5000);
        } else {
          alert("Oops! Something went wrong.");
        }
      } catch (error) {
        alert("Error submitting form. Try again later.");
      }
    });
  }
});

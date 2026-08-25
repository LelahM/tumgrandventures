// TUM Grand Venture — site interactions
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("shadow-soft");
    } else {
      header.classList.remove("shadow-soft");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
      menuBtn.innerHTML = !isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-7 w-7"><path d="M6 6l12 12M18 6L6 18"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-7 w-7"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    });
  }

  const servicesToggle = document.getElementById("mobile-services-toggle");
  const servicesMenu = document.getElementById("mobile-services-menu");
  const servicesChevron = document.getElementById("mobile-services-chevron");
  if (servicesToggle && servicesMenu) {
    servicesToggle.addEventListener("click", () => {
      const isOpen = !servicesMenu.classList.contains("hidden");
      servicesMenu.classList.toggle("hidden");
      servicesToggle.setAttribute("aria-expanded", String(!isOpen));
      if (servicesChevron) servicesChevron.classList.toggle("rotate-180");
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const btn = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector("[data-faq-panel]");
    const icon = item.querySelector("[data-faq-icon]");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      // close all others in the same group
      const group = item.closest("[data-faq-group]");
      if (group) {
        group.querySelectorAll("[data-faq-item]").forEach((other) => {
          if (other !== item) {
            other.setAttribute("data-open", "false");
            other.querySelector("[data-faq-panel]").style.maxHeight = null;
            other.querySelector("[data-faq-icon]")?.classList.remove("rotate-45");
          }
        });
      }
      item.setAttribute("data-open", String(!isOpen));
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon?.classList.add("rotate-45");
      } else {
        panel.style.maxHeight = null;
        icon?.classList.remove("rotate-45");
      }
    });
  });

  /* ---------- Testimonial carousel ---------- */
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    if (!track || slides.length === 0) return;
    let index = 0;

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "h-2.5 w-2.5 rounded-full bg-navy-200 transition-all data-[active=true]:w-7 data-[active=true]:bg-gold-400";
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((dot, i) => {
          dot.setAttribute("data-active", String(i === index));
        });
      }
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }
    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));
    update();

    let autoplay = setInterval(() => goTo(index + 1), 6000);
    carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
    carousel.addEventListener("mouseleave", () => {
      autoplay = setInterval(() => goTo(index + 1), 6000);
    });
  });

  /* ---------- Contact / lead forms ---------- */
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";
      }
      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = "Thanks — your request has been sent! Our team will contact you shortly.";
            status.className = "mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200";
          }
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        if (status) {
          status.textContent =
            "We couldn't submit the form automatically — please call (813) 590-4080 or email info@tumgrandventures.com and we'll take care of you right away.";
          status.className = "mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });
});

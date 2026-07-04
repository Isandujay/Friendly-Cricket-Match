/* ============================================================
   Friendly Cricket Match — script.js
   Vanilla JS only. No external libraries.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Loading Screen ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 500);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add("hidden"), 2500);

  /* ---------- Scroll Progress Bar ---------- */
  const progressBar = document.getElementById("progress-bar");
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  /* ---------- Navbar solid on scroll ---------- */
  const navbar = document.getElementById("navbar");
  function updateNavbar() {
    if (window.scrollY > 60) navbar.classList.add("solid");
    else navbar.classList.remove("solid");
  }

  /* ---------- Scroll to top button ---------- */
  const scrollTopBtn = document.getElementById("scroll-top");
  function updateScrollTopBtn() {
    if (window.scrollY > 500) scrollTopBtn.classList.add("visible");
    else scrollTopBtn.classList.remove("visible");
  }
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Combine scroll listeners for performance */
  window.addEventListener("scroll", () => {
    updateProgressBar();
    updateNavbar();
    updateScrollTopBtn();
  });
  updateProgressBar();
  updateNavbar();

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ---------- Mouse Glow Effect ---------- */
  const mouseGlow = document.getElementById("mouse-glow");
  window.addEventListener("mousemove", (e) => {
    mouseGlow.style.left = e.clientX + "px";
    mouseGlow.style.top = e.clientY + "px";
  });
  window.addEventListener("mouseleave", () => { mouseGlow.style.opacity = "0"; });
  window.addEventListener("mouseenter", () => { mouseGlow.style.opacity = "1"; });

  /* ---------- Countdown Timer ---------- */
  const targetDate = new Date("2026-07-11T00:00:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const footnote = document.getElementById("countdown-footnote");

  function pad(num) { return String(num).padStart(2, "0"); }

  function tick(el, newValue) {
    if (el.textContent !== newValue) {
      el.textContent = newValue;
      el.classList.remove("tick");
      // restart animation
      void el.offsetWidth;
      el.classList.add("tick");
    }
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      footnote.textContent = "🏏 It's match day! See you at TC Ground, Monaragala.";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    tick(daysEl, pad(days));
    tick(hoursEl, pad(hours));
    tick(minutesEl, pad(minutes));
    tick(secondsEl, pad(seconds));
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  /* ---------- Poster Lightbox ---------- */
  const posterImg = document.getElementById("poster-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox() {
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
  posterImg.addEventListener("click", openLightbox);
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Scroll Reveal Animations ---------- */
  const revealTargets = document.querySelectorAll(
    ".glass-card, .flip-card, .section-heading"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Floating Cricket Ball drift (random path) ---------- */
  const floatingBall = document.getElementById("floating-ball");
  function randomizeBallPosition() {
    const top = 10 + Math.random() * 55;
    const left = 65 + Math.random() * 25;
    floatingBall.style.top = top + "%";
    floatingBall.style.left = left + "%";
    floatingBall.style.right = "auto";
  }
  randomizeBallPosition();
  setInterval(randomizeBallPosition, 8000);

  /* ---------- Particle Background ---------- */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const PARTICLE_COUNT = window.innerWidth < 700 ? 35 : 70;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.6,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.5 ? "gold" : "orange"
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === "gold"
        ? `rgba(212, 175, 55, ${p.opacity})`
        : `rgba(255, 122, 60, ${p.opacity})`;
      ctx.fill();

      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    });
    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  // Recalculate canvas height when content loads/reflows
  setTimeout(resizeCanvas, 1000);
});

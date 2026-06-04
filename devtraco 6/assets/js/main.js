/* ========================================================
   DEVTRACO LIMITED — main.js
   Original interactions: reveals, counter, slider, filter
   ======================================================== */

(function () {
  'use strict';

  /* ---------- HEADER SCROLL STATE ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  menuToggle && menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose && mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    const startVal = 0;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = current.toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('en-US');
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- PROJECTS FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.cat;
        const show = (filter === 'all') || (cat === filter);

        card.style.transition = 'opacity .3s ease, transform .3s ease';
        if (show) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ---------- TESTIMONIAL SLIDER ---------- */
  const tTrack = document.getElementById('tTrack');
  const tPrev = document.getElementById('tPrev');
  const tNext = document.getElementById('tNext');

  if (tTrack && tPrev && tNext) {
    let position = 0;
    const totalCards = tTrack.children.length;

    const getVisible = () => (window.innerWidth <= 1024 ? 1 : 2);

    const updateSlider = () => {
      const visible = getVisible();
      const maxPos = Math.max(0, totalCards - visible);
      position = Math.max(0, Math.min(position, maxPos));

      const card = tTrack.children[0];
      const gap = 24; // 1.5rem
      const cardWidth = card.offsetWidth + gap;
      tTrack.style.transform = `translateX(-${position * cardWidth}px)`;

      tPrev.disabled = position === 0;
      tNext.disabled = position >= maxPos;
    };

    tPrev.addEventListener('click', () => { position--; updateSlider(); });
    tNext.addEventListener('click', () => { position++; updateSlider(); });

    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(updateSlider, 150);
    });

    // Initial layout — let CSS settle first
    setTimeout(updateSlider, 50);
  }

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = Array.from(navLinks).map(a => {
    const id = a.getAttribute('href');
    return id && id.startsWith('#') ? document.querySelector(id) : null;
  });

  const setActiveLink = () => {
    const scrollY = window.scrollY + 120;
    let activeIdx = 0;
    sections.forEach((sec, i) => {
      if (sec && sec.offsetTop <= scrollY) activeIdx = i;
    });
    navLinks.forEach(l => l.classList.remove('active'));
    if (navLinks[activeIdx]) navLinks[activeIdx].classList.add('active');
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------- SMOOTH SCROLL TO ANCHORS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        const target = document.querySelector(id);
        const headerH = document.querySelector('.site-header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();

/* Shared interactions — Andrei Vilau Portfolio */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .fade-up').forEach((el) => observer.observe(el));

  const bootLines = document.querySelectorAll('[data-type]');
  if (bootLines.length) {
    let delay = 400;
    bootLines.forEach((line) => {
      const text = line.getAttribute('data-type') || line.textContent;
      line.textContent = '';
      line.style.opacity = '1';
      setTimeout(() => typeLine(line, text, 0), delay);
      delay += text.length * 22 + 280;
    });
  }

  function typeLine(el, text, i) {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(() => typeLine(el, text, i + 1), 18 + Math.random() * 24);
    } else {
      el.classList.add('typed');
    }
  }

  const clock = document.getElementById('sysClock');
  if (clock) {
    const tick = () => {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    tick();
    setInterval(tick, 1000);
  }

  const cursor = document.getElementById('cursorGlow');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;

    document.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
    }, { passive: true });

    const animate = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      cursor.style.transform = `translate(${cx - 180}px, ${cy - 180}px)`;
      requestAnimationFrame(animate);
    };
    animate();
  }

  document.querySelectorAll('.marquee-track').forEach((track) => {
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;
  });

  document.querySelectorAll('.accordion-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const open = item.classList.contains('open');
      item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach((i) => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();

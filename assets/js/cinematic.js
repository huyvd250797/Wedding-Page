/* v2.0.0 — Progressive cinematic enhancement, no additional dependencies. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interlude = document.querySelector('.cinematic-interlude');
  const navLinks = [...document.querySelectorAll('#siteNav a[href^="#"]')];

  // Only animate the full-bleed still photo once it has entered the viewport.
  if (interlude) {
    if ('IntersectionObserver' in window && !reduceMotion.matches) {
      const io = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          interlude.classList.add('in-view');
          io.disconnect();
        }
      }, {threshold: 0.08});
      io.observe(interlude);
    } else {
      interlude.classList.add('in-view');
    }
  }

  // Keep the cinematic cover free of duplicate fixed CTAs. The header still has
  // a visible gift button; the floating shortcut appears after the cover.
  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      document.documentElement.classList.toggle('past-hero', !entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    }, {threshold: 0});
    heroObserver.observe(hero);
  } else {
    document.documentElement.classList.add('past-hero');
  }

  // Indicate the chapter currently being read; no per-frame layout measurements.
  if ('IntersectionObserver' in window && navLinks.length) {
    const targets = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      // Use a centered viewport band to avoid rapidly flashing adjacent chapters.
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const activeId = visible[0].target.id;
      navLinks.forEach(link => {
        if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-20% 0px -55% 0px', threshold: [0, .2, .5]});
    targets.forEach(target => observer.observe(target));
  }

  // Mobile photo swipe; mouse and keyboard navigation remain with the original viewer.
  const viewer = document.getElementById('lightbox');
  const previous = document.getElementById('photoPrev');
  const next = document.getElementById('photoNext');
  if (!viewer || !previous || !next) return;
  let startX = null;
  let startY = null;
  viewer.addEventListener('touchstart', event => {
    if (!viewer.open || event.touches.length !== 1) return;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }, {passive: true});
  viewer.addEventListener('touchend', event => {
    if (startX == null || !viewer.open || !event.changedTouches.length) return;
    const deltaX = event.changedTouches[0].clientX - startX;
    const deltaY = event.changedTouches[0].clientY - startY;
    startX = null; startY = null;
    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    (deltaX > 0 ? previous : next).click();
  }, {passive: true});
  viewer.addEventListener('close', () => {startX = null; startY = null});
})();

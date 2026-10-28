(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('#siteHeader');
  const menuButton = $('#menuToggle');
  const progress = $('#scrollProgress');
  const backTop = $('#backTop');
  const nav = $('#siteNav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu');
  };
  menuButton.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  });
  $$('.nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });

  // One passive scroll subscription, scheduled at most once per animation frame.
  let scrollFrame = false;
  const updateScrollUI = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    header.classList.toggle('scrolled', window.scrollY > 40);
    backTop.classList.toggle('visible', window.scrollY > 650);
    scrollFrame = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) {
      scrollFrame = true;
      requestAnimationFrame(updateScrollUI);
    }
  }, {passive: true});
  updateScrollUI();
  backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: reducedMotion ? 'instant' : 'smooth'}));

  // Reveal only once when entering the viewport. Content remains visible without JS.
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, {rootMargin: '0px 0px -35px 0px', threshold: .06});
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  let toastTimeout;
  const toast = $('#toast');
  const showToast = message => {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3400);
  };
  const copyText = async content => {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
      return;
    }
    const temp = document.createElement('textarea');
    temp.value = content;
    temp.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.appendChild(temp);
    temp.select();
    const ok = document.execCommand('copy');
    temp.remove();
    if (!ok) throw new Error('Clipboard unavailable');
  };

  // Existing source contained presentation-only RSVP buttons without a receiver.
  // This explicitly copies a guest's wish; it does NOT claim to submit it.
  $('#wishForm').addEventListener('submit', async event => {
    event.preventDefault();
    const name = $('#guestName').value.trim();
    const wish = $('#wishMessage').value.trim();
    if (!name || !wish) return;
    try {
      await copyText(`Lời chúc từ ${name}:\n${wish}`);
      showToast('Đã sao chép lời chúc. Bạn hãy gửi trực tiếp cho chúng mình nhé ♡');
    } catch {
      showToast('Không thể tự động sao chép. Hãy chọn và sao chép lời chúc thủ công.');
    }
  });

  const giftDialog = $('#giftDialog');
  const giftAccounts = {
    groom: {account: '0090125071997', qr: 'assets/img/gift/QR-code-detail.jpg', label: 'chú rể Huy'},
    bride: {account: '0050174411808', qr: 'assets/img/gift/QR-code-detail-SaoDao.jpg', label: 'cô dâu Sao'}
  };
  let currentGift = 'groom';
  const selectGift = key => {
    if (!giftAccounts[key]) return;
    currentGift = key;
    const data = giftAccounts[key];
    $('#giftQR').src = data.qr;
    $('#giftQR').alt = `Mã QR chuyển khoản mừng cưới của ${data.label}`;
    $('#giftAccount').textContent = data.account;
    $$('[data-gift]').forEach(button => {
      const active = button.dataset.gift === key;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active) $('#giftPanel').setAttribute('aria-labelledby', button.id);
    });
  };
  $$('[data-gift]').forEach(button => button.addEventListener('click', () => selectGift(button.dataset.gift)));
  $('.gift-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const next = currentGift === 'groom' ? 'bride' : 'groom';
    selectGift(next);
    $(`[data-gift="${next}"]`).focus();
  });
  const openDialog = dialog => {
    closeMenu();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
  };
  const closeDialog = dialog => {
    if (dialog.open) dialog.close();
    document.body.classList.remove('dialog-open');
  };
  $$('[data-open-gift]').forEach(button => button.addEventListener('click', () => openDialog(giftDialog)));
  $('#copyBank').addEventListener('click', async () => {
    try {
      await copyText(giftAccounts[currentGift].account);
      showToast('Đã sao chép số tài khoản MB Bank ♡');
    } catch {
      showToast('Không thể sao chép tự động. Bạn hãy chọn số tài khoản trên màn hình.');
    }
  });

  // Gallery previews load lazily; full images load only when opened.
  const lightbox = $('#lightbox');
  const photos = $$('.gallery-photo');
  let photoIndex = 0;
  const showPhoto = index => {
    photoIndex = (index + photos.length) % photos.length;
    const button = photos[photoIndex];
    const image = $('img', button);
    $('#lightboxImage').src = button.dataset.full;
    $('#lightboxImage').alt = image.alt;
    $('#lightboxCaption').textContent = image.alt;
    $('#lightboxCounter').textContent = `${photoIndex + 1} / ${photos.length}`;
  };
  photos.forEach((button, index) => button.addEventListener('click', () => {
    showPhoto(index);
    openDialog(lightbox);
  }));
  $('#photoPrev').addEventListener('click', () => showPhoto(photoIndex - 1));
  $('#photoNext').addEventListener('click', () => showPhoto(photoIndex + 1));
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {event.preventDefault();showPhoto(photoIndex - 1)}
    if (event.key === 'ArrowRight') {event.preventDefault();showPhoto(photoIndex + 1)}
  });
  $$('.dialog').forEach(dialog => {
    $$('[data-close-dialog]', dialog).forEach(button => button.addEventListener('click', () => closeDialog(dialog)));
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  });
})();

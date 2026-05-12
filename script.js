/* ============================================================
   OMEGA PRIME — script.js
   ============================================================ */

// Header scroll effect
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Scroll reveal
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('up');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => observer.observe(el));
})();

// Smooth scroll for internal links
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// Active nav link on scroll
(function () {
  const links = document.querySelectorAll('.nav a[href^="#"]');
  const sections = [...links]
    .map((l) => document.getElementById(l.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sections.length) return;
  const activate = () => {
    const scrollY = window.scrollY + 120;
    let current = sections[0];
    sections.forEach((sec) => { if (sec.offsetTop <= scrollY) current = sec; });
    links.forEach((l) => {
      const isActive = l.getAttribute('href') === '#' + current.id;
      l.style.color = isActive ? 'var(--white)' : '';
    });
  };
  window.addEventListener('scroll', activate, { passive: true });
  activate();
})();

// Staggered cards delay
(function () {
  [
    '.difs-grid .dif-card',
    '.deps-grid .dep',
    '.produtos-grid .produto',
  ].forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = `${i * 75}ms`;
    });
  });
})();

// WhatsApp float hide near footer
(function () {
  const btn = document.querySelector('.wpp-float');
  const footer = document.querySelector('.footer');
  if (!btn || !footer) return;
  const check = () => {
    const footerTop = footer.getBoundingClientRect().top;
    const hide = footerTop < window.innerHeight - 40;
    btn.style.opacity = hide ? '0' : '1';
    btn.style.pointerEvents = hide ? 'none' : 'auto';
  };
  window.addEventListener('scroll', check, { passive: true });
  check();
})();

// Partners highlight animation
(function () {
  const items = document.querySelectorAll('.parceira');
  if (!items.length) return;
  let last = -1;
  setInterval(() => {
    if (last >= 0) {
      items[last].style.background = '';
      items[last].style.color = '';
      items[last].style.borderColor = '';
      items[last].style.transform = '';
    }
    let next;
    do { next = Math.floor(Math.random() * items.length); } while (next === last);
    items[next].style.background = 'var(--dark)';
    items[next].style.color = 'var(--white)';
    items[next].style.borderColor = 'var(--dark)';
    items[next].style.transform = 'translateY(-2px)';
    last = next;
  }, 1800);
})();

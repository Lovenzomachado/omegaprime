/* ============================================
   OMEGA PRIME — script.js
   ============================================ */

/* ── Header scroll ── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── Scroll reveal ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();

/* ── Smooth scroll para links internos ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('site-header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── Nav link ativo conforme scroll ── */
(function () {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [...links].map((l) => document.getElementById(l.getAttribute('href').slice(1))).filter(Boolean);
  if (!sections.length) return;

  const activate = () => {
    const scrollY = window.scrollY + 120;
    let current = sections[0];
    sections.forEach((sec) => { if (sec.offsetTop <= scrollY) current = sec; });
    links.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
    });
  };

  window.addEventListener('scroll', activate, { passive: true });
  activate();
})();

/* ── Contador animado nos números do hero ── */
(function () {
  const nums = document.querySelectorAll('.hn-value');
  if (!nums.length) return;

  const parseTarget = (el) => {
    const text = el.textContent.replace(/[^0-9.]/g, '');
    return parseFloat(text) || 0;
  };

  const formatValue = (val, originalText) => {
    if (originalText.includes('.')) return Math.round(val).toLocaleString('pt-BR');
    return Math.round(val).toString();
  };

  const animateNum = (el) => {
    const target = parseTarget(el);
    if (!target) return;
    const plus = el.querySelector('.hn-plus');
    const plusHTML = plus ? plus.outerHTML : '';
    const duration = 1600;
    const start = performance.now();
    const originalText = el.textContent;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatValue(target * eased, originalText);
      if (plusHTML) el.insertAdjacentHTML('beforeend', plusHTML);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNum(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach((el) => observer.observe(el));
})();

/* ── Stagger delay nos cards ── */
(function () {
  ['.cards-grid .card-dif', '.produtos-grid .produto-card', '.depoimentos-grid .dep-card'].forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });
})();

/* ── WhatsApp float: esconde ao chegar no footer ── */
(function () {
  const btn = document.querySelector('.whatsapp-float');
  const footer = document.querySelector('.site-footer');
  if (!btn || !footer) return;

  const check = () => {
    const footerTop = footer.getBoundingClientRect().top;
    btn.style.opacity = footerTop < window.innerHeight - 40 ? '0' : '1';
    btn.style.pointerEvents = footerTop < window.innerHeight - 40 ? 'none' : 'auto';
  };

  window.addEventListener('scroll', check, { passive: true });
  check();
})();

/* ── Parceiras: highlight aleatório suave ── */
(function () {
  const items = document.querySelectorAll('.parceira-item');
  if (!items.length) return;

  let last = -1;
  setInterval(() => {
    if (last >= 0) items[last].classList.remove('parceira-highlight');
    let next;
    do { next = Math.floor(Math.random() * items.length); } while (next === last);
    items[next].classList.add('parceira-highlight');
    last = next;
  }, 1800);
})();


/* ==========================================================
   Personal Developer Portfolio - script.js
   Vanilla JavaScript (ES6+)
   ========================================================== */

(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* 1. Dark / Light Theme */
  const themeBtn = $('#theme-toggle');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );

    try {
      localStorage.setItem('theme', theme);
    } catch (error) {}
  };

  applyTheme(root.getAttribute('data-theme') || 'light');

  themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  /* 2. Mobile Hamburger Navigation */
  const menuBtn = $('#menu-toggle');
  const navLinks = $('#nav-links');

  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  menuBtn.addEventListener('click', () => {
    setMenu(!navLinks.classList.contains('open'));
  });

  $$('a', navLinks).forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  /* 3. Smooth Scrolling */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');

      if (id.length < 2) return;

      const target = $(id);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      history.pushState(null, '', id);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* 4. Active Navigation Link */
  const sections = $$('main section[id]');
  const navAnchors = $$('a', navLinks);

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px'
    });

    sections.forEach((section) => spy.observe(section));
  }

  /* 5. Scroll Reveal Animation */
  const reveals = $$('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    reveals.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 4) * 70}ms`;
      revealObserver.observe(element);
    });
  } else {
    reveals.forEach((element) => element.classList.add('visible'));
  }

  /* 6. Contact Form Validation */
  const form = $('#contact-form');
  const status = $('#form-status');

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (value) =>
      value.trim().length < 2
        ? 'Please enter your name (at least 2 characters).'
        : '',

    email: (value) =>
      !emailRe.test(value.trim())
        ? 'Please enter a valid email address.'
        : '',

    message: (value) =>
      value.trim().length < 10
        ? 'Your message should be at least 10 characters.'
        : ''
  };

  const validateField = (input) => {
    const message = rules[input.name](input.value);
    const wrapper = input.closest('.field');

    $(`#${input.id}-error`).textContent = message;

    wrapper.classList.toggle('invalid', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));

    return !message;
  };

  const inputs = $$('input, textarea', form);

  inputs.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));

    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('invalid')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    const results = inputs.map(validateField);
    const firstInvalid = inputs.find((input, index) => !results[index]);

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    status.textContent =
      'Your information is valid. Please connect an email service to send messages.';

    status.classList.add('success');
  });

  /* 7. Header Shadow on Scroll */
  const header = $('.site-header');

  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 6px 24px rgba(0,0,0,0.08)'
      : 'none';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 8. Automatic Footer Year */
  $('#year').textContent = new Date().getFullYear();

})();

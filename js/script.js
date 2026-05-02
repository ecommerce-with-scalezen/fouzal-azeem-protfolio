/* =========================================================
   Fouzal-Azeem Portfolio - Main Script
   Lightweight JS for navigation, forms, and blog toggles.
   ========================================================= */

// ---------- 1. Mobile menu toggle ----------
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
  updateThemeToggleIcon();

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
      updateThemeToggleIcon();
    });
  }

  function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (themeToggle) {
      themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
  }

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ---------- 2. Highlight active nav link ----------
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // ---------- 3. Animate skill bars on view ----------
  document.querySelectorAll('.skill-bar .fill').forEach((el) => {
    const value = el.getAttribute('data-value') || '0';
    requestAnimationFrame(() => { el.style.width = value + '%'; });
  });

  // ---------- 4. Blog cards expand/collapse ----------
  document.querySelectorAll('.blog-card').forEach((card) => {
    card.addEventListener('click', () => {
      const content = card.querySelector('.blog-content');
      if (content) content.classList.toggle('open');
    });
  });

  // ---------- 5. Contact form (no backend) ----------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');
      // Open user's email client with prefilled message
      const subject = encodeURIComponent(`New message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:fouzalazeemwork@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // ---------- 6. Booking form ----------
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const subject = encodeURIComponent(`Booking request: ${data.get('service')}`);
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n` +
        `Service: ${data.get('service')}\nPreferred date: ${data.get('date')}\n\nMessage:\n${data.get('message')}`
      );
      window.location.href = `mailto:fouzalazeemwork@gmail.com?subject=${subject}&body=${body}`;
      const ok = document.getElementById('booking-success');
      if (ok) ok.style.display = 'block';
    });
  }
});

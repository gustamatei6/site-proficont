// Sticky navbar — slides in from top once navbar scrolls off screen
const navbar = document.getElementById('navbar');
const navbarHeight = navbar.offsetHeight;
let isSticky = false;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > navbarHeight && !isSticky) {
    isSticky = true;
    navbar.classList.add('sticky');
    document.body.style.paddingTop = navbarHeight + 'px';
  } else if (scrollY <= navbarHeight && isSticky) {
    isSticky = false;
    navbar.classList.remove('sticky');
    document.body.style.paddingTop = '';
  }

  document.getElementById('scrollTop').classList.toggle('show', scrollY > 400);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// Card scroll-in animation
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), Number(delay));
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(c => cardObserver.observe(c));

// Counters in hero stats
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const suffix = el.textContent.replace(/[0-9]/g, '');
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const raw = entry.target.textContent;
      const num = parseInt(raw);
      if (!isNaN(num)) animateCounter(entry.target, num);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statsObserver.observe(el));

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Se trimite...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('show');
    this.reset();
    btn.textContent = 'Trimite mesajul';
    btn.disabled = false;
  }, 1200);
});
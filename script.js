/* 
  Mohammad Zuber Portfolio - Frontend Interactions Script
  Contains Theme toggle, menu navigation, scroll spies, dynamic filters, carousel, and contact handlers
*/

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. THEME MANAGER (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  // Load and apply previous theme preference
  const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
    darkIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
    lightIcon.classList.add('hidden');
  }

  // Handle click on theme switcher button
  themeToggleBtn.addEventListener('click', () => {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  });

  // ==========================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
  }

  menuToggle.addEventListener('click', toggleMobileMenu);
  mobileMenuClose.addEventListener('click', toggleMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // ==========================================
  // 3. FLOATING NAV ON SCROLL
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('py-3', 'shadow-md', 'bg-white/80', 'dark:bg-slate-900/85');
      navbar.classList.remove('py-5', 'bg-transparent');
    } else {
      navbar.classList.remove('py-3', 'shadow-md', 'bg-white/80', 'dark:bg-slate-900/85');
      navbar.classList.add('py-5', 'bg-transparent');
    }
  });

  // ==========================================
  // 4. INTERSECTION OBSERVER - REVEAL ON SCROLL
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 5. INTERSECTION OBSERVER - SCROLL SPY NAV
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-link-active');
          } else {
            link.classList.remove('nav-link-active');
          }
        });
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-20% 0px -55% 0px'
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // ==========================================
  // 6. PORTFOLIO / PROJECTS FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/20');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800/80', 'text-slate-600', 'dark:text-slate-400');
      });

      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/20');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800/80', 'text-slate-600', 'dark:text-slate-400');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          // Smooth fade-in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 15);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });

  // ==========================================
  // 7. TESTIMONIALS SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot-btn');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;
  let sliderInterval;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'absolute');
        slide.classList.add('opacity-100');
      } else {
        slide.classList.add('opacity-0', 'pointer-events-none', 'absolute');
        slide.classList.remove('opacity-100');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('bg-indigo-600', 'dark:bg-indigo-500', 'w-8');
        dot.classList.remove('bg-slate-300', 'dark:bg-slate-700', 'w-3');
      } else {
        dot.classList.remove('bg-indigo-600', 'dark:bg-indigo-500', 'w-8');
        dot.classList.add('bg-slate-300', 'dark:bg-slate-700', 'w-3');
      }
    });
  }

  function startAutoSlider() {
    sliderInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6500);
  }

  function stopAutoSlider() {
    clearInterval(sliderInterval);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    startAutoSlider();

    prevBtn.addEventListener('click', () => {
      stopAutoSlider();
      showSlide(currentSlide - 1);
      startAutoSlider();
    });

    nextBtn.addEventListener('click', () => {
      stopAutoSlider();
      showSlide(currentSlide + 1);
      startAutoSlider();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopAutoSlider();
        showSlide(idx);
        startAutoSlider();
      });
    });

    const sliderWrapper = document.getElementById('testimonial-wrapper');
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', stopAutoSlider);
      sliderWrapper.addEventListener('mouseleave', startAutoSlider);
    }
  }

  // ==========================================
  // 8. CONTACT FORM SIMULATION & VALIDATION (AJAX FORMSPREE)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const toastSuccess = document.getElementById('toast-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitText = document.getElementById('submit-btn-text');
      const submitSpinner = document.getElementById('submit-btn-spinner');

      // Validation check
      if (!name || !email || !subject || !message) {
        return; 
      }

      // Start submission animation states
      submitBtn.disabled = true;
      submitSpinner.classList.remove('hidden');
      submitText.textContent = 'Sending Message...';

      // Perform AJAX Formspree fetch
      fetch("https://formspree.io/f/xbdezbdb", {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success toast notification
          toastSuccess.classList.remove('translate-y-24', 'opacity-0');
          toastSuccess.classList.add('translate-y-0', 'opacity-100');

          // Reset all form inputs
          contactForm.reset();

          // Auto-hide success toast after 4.5 seconds
          setTimeout(() => {
            toastSuccess.classList.remove('translate-y-0', 'opacity-100');
            toastSuccess.classList.add('translate-y-24', 'opacity-0');
          }, 4500);
        } else {
          alert("Oops! There was an issue sending your message. Please try again.");
        }
      })
      .catch(error => {
        alert("Oops! Network connection issue. Please check your connection and try again.");
      })
      .finally(() => {
        // Restore buttons state
        submitBtn.disabled = false;
        submitSpinner.classList.add('hidden');
        submitText.textContent = 'Send Message';
      });
    });
  }

  // ==========================================
  // 9. BACK-TO-TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

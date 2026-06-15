// assets/js/main.js
import { loadComponent } from './mobileMenu.js';
import { initContactForm } from './contactForm.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initScrollAnimations } from './scrollAnimations.js';

function initThemeToggle() {
  // Create the toggle button
  const toggleContainer = document.getElementById('themeToggleContainer');
  if (!toggleContainer) return;
  
  // Check for saved theme preference in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or default to light mode
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-mode');
  } else {
    // Optional: Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark-mode');
    }
  }
  
  // Create the button element
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'themeToggle';
  toggleBtn.className = 'w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-all hover:scale-105';
  
  // Set initial icon based on current mode
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  toggleBtn.innerHTML = isDarkMode ? '🌙' : '☀️';
  
  // Add click handler
  toggleBtn.onclick = () => {
    // Toggle dark mode class
    document.documentElement.classList.toggle('dark-mode');
    
    // Update button icon
    const isNowDark = document.documentElement.classList.contains('dark-mode');
    toggleBtn.innerHTML = isNowDark ? '🌙' : '☀️';
    
    // Save preference to localStorage
    localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
    
    // Optional: Add a subtle animation effect
    toggleBtn.style.transform = 'rotate(20deg)';
    setTimeout(() => {
      toggleBtn.style.transform = 'rotate(0deg)';
    }, 200);
  };
  
  // Add button to container
  toggleContainer.appendChild(toggleBtn);
}

// Load all components sequentially
async function loadAllComponents() {
  const components = [
    { id: 'navbar-container', path: '../../components/navbar.html' },
    { id: 'hero-container', path: '../../components/hero.html' },
    { id: 'mission-container', path: '../../components/mission.html' },
    { id: 'expertise-container', path: '../../components/expertise.html' },
    { id: 'testimonials-container', path: '../../components/testimonials.html' },
    { id: 'partners-container', path: '../../components/partners.html' },
    { id: 'contact-container', path: '../../components/contact.html' },
    { id: 'footer-container', path: '../../components/footer.html' }
  ];

  for (const comp of components) {
    await loadComponent(comp.id, comp.path);
  }

  // Initialize all interactive features after DOM is fully populated
  initMobileMenu();
  initContactForm();
  initSmoothScroll();
  updateActiveNavOnScroll();
  initThemeToggle();  
  initScrollAnimations();
}

function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        const icon = btn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
        const icon = btn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }
}

function updateActiveNavOnScroll() {
  const sections = ['home', 'mission', 'expertise', 'testimonials', 'partners', 'connect'];
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  function setActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          current = section;
        }
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('text-emerald-600', 'font-semibold');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) {
        link.classList.add('text-emerald-600', 'font-semibold');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
}

// Start loading
loadAllComponents();
// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.querySelector('.toggle-btn');
  const typingElement = document.querySelector('.typing-text');
  const words = ["Data Scientist", "AI Engineer", "Data Analyst", "Data Engineer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  // Restore dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
  }

  // Toggle dark mode with persistence
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });
  }

  // Typing animation
  function type() {
    const currentWord = words[wordIndex];
    if (!typingElement) return;

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 200);
      } else {
        setTimeout(type, 60);
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex++);
      if (charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else {
        setTimeout(type, 100);
      }
    }
  }
  if (typingElement && words.length) type();

  // Active nav highlighting on scroll
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sections.forEach(sec => observer.observe(sec));
});

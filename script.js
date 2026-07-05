(function () {
  'use strict';

  // Sticky header scroll effect
  const header = document.getElementById('siteHeader');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 4) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }
})();

(function () {
  'use strict';

  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'portfolio.lang';

  // ==========================================================
  // i18n
  // ==========================================================
  let translations = null;
  let currentLang = DEFAULT_LANG;

  const getStoredLang = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  };
  const storeLang = (lang) => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  };

  const applyTranslations = (lang) => {
    if (!translations || !translations[lang]) return;
    const dict = translations[lang];

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    document.querySelectorAll('[data-lang-btn]').forEach((el) => {
      el.classList.toggle('is-active', el.getAttribute('data-lang-btn') === lang);
    });

    currentLang = lang;
    storeLang(lang);
  };

  const setupLangToggle = () => {
    const toggle = document.getElementById('langToggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang-btn]');
      if (btn) {
        applyTranslations(btn.getAttribute('data-lang-btn'));
      } else {
        applyTranslations(currentLang === 'en' ? 'ru' : 'en');
      }
    });
  };

  const loadTranslations = async () => {
    const scriptEl = document.querySelector('script[data-base]');
    const base = scriptEl ? scriptEl.getAttribute('data-base') : '';
    try {
      const res = await fetch(base + 'data/translations.json', { cache: 'no-cache' });
      translations = await res.json();
      const initial = getStoredLang() || DEFAULT_LANG;
      applyTranslations(initial);
    } catch (err) {
      console.error('Failed to load translations:', err);
    }
  };

  // ==========================================================
  // Sticky header scroll effect
  // ==========================================================
  const setupHeader = () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const updateHeader = () => {
      if (window.scrollY > 4) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  };

  // ==========================================================
  // Init
  // ==========================================================
  document.addEventListener('DOMContentLoaded', () => {
    setupHeader();
    setupLangToggle();
    loadTranslations();
  });
})();

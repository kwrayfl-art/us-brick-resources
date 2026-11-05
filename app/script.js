(function () {
  // Dark/light theme toggle
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var dark = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', dark);

  function renderIcon(mode) {
    return mode === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (toggle) {
    toggle.innerHTML = renderIcon(dark);
    toggle.addEventListener('click', function () {
      dark = dark === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', dark);
      toggle.setAttribute('aria-label', 'Switch to ' + (dark === 'dark' ? 'light' : 'dark') + ' mode');
      toggle.innerHTML = renderIcon(dark);
    });
  }

  // Catalog tabs
  var tabButtons = document.querySelectorAll('.catalog-tab');
  var tabPanels = document.querySelectorAll('.catalog-panel');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      tabPanels.forEach(function (panel) {
        var match = panel.getAttribute('data-tab-panel') === target;
        panel.classList.toggle('is-active', match);
        if (match) { panel.removeAttribute('hidden'); } else { panel.setAttribute('hidden', ''); }
      });
    });
  });

  // Catalog viewer modal
  var CATALOGS = {
    eldorado: {
      title: 'Eldorado Stone 2026 Product Guide',
      src: 'assets/catalogs/eldorado-stone-product-guide-2026.pdf',
      download: 'US-Brick-Eldorado-Stone-Product-Guide-2026.pdf'
    },
    cultured: {
      title: 'Cultured Stone 2026 Collections Guide',
      src: 'assets/catalogs/cultured-stone-product-guide-2026.pdf',
      download: 'US-Brick-Cultured-Stone-Product-Guide-2026.pdf'
    },
    dutchquality: {
      title: 'Dutch Quality Stone 2026 Brochure',
      src: 'assets/catalogs/dutch-quality-stone-brochure-2026.pdf',
      download: 'US-Brick-Dutch-Quality-Stone-Brochure-2026.pdf'
    },
    stonecraft: {
      title: 'StoneCraft 2025 Profile Book',
      src: 'assets/catalogs/stonecraft-profile-book-2025.pdf',
      download: 'US-Brick-StoneCraft-Profile-Book-2025.pdf'
    },
    versetta: {
      title: 'Versetta Stone Panelized Veneer Brochure',
      src: 'assets/catalogs/versetta-stone-brochure.pdf',
      download: 'US-Brick-Versetta-Stone-Brochure.pdf'
    },
    tuuci: {
      title: 'TUUCI — Shade & Umbrella Systems Catalog',
      src: 'assets/catalogs/tuuci-catalog-2020.pdf',
      download: 'US-Brick-TUUCI-Catalog.pdf'
    },
    barlow: {
      title: 'Barlow Tyrie — New Products 2026 (Luxury Teak Outdoor Furniture)',
      src: 'assets/catalogs/barlow-tyrie-new-products-2026.pdf',
      download: 'US-Brick-Barlow-Tyrie-New-Products-2026.pdf'
    },
    earthcore: {
      title: 'Isokern · Earthcore — Fireplaces & Chimneys Catalog (2024)',
      src: 'assets/catalogs/earthcore-isokern-catalog-2024.pdf',
      download: 'US-Brick-Isokern-Fireplaces-Catalog-2024.pdf'
    },
    shutters: {
      title: 'Beyond Aesthetics — Complete Shutter Overview Brochure',
      src: 'assets/catalogs/shutters-brochure.pdf',
      download: 'US-Brick-Shutters-Overview-Brochure.pdf'
    }
  };

  var viewerEl = document.getElementById('catalog-viewer');
  if (viewerEl) {
    var viewerFrame = document.getElementById('catalog-viewer-frame');
    var viewerTitle = document.getElementById('catalog-viewer-title');
    var viewerDownload = document.getElementById('catalog-viewer-download');
    var viewerTabs = viewerEl.querySelectorAll('.catalog-viewer-tab');
    var lastFocused = null;

    function openCatalog(id) {
      var cat = CATALOGS[id];
      if (!cat) return;
      viewerFrame.src = cat.src + '#toolbar=1&view=FitH';
      viewerTitle.textContent = cat.title;
      viewerDownload.href = cat.src;
      viewerDownload.setAttribute('download', cat.download);
      viewerTabs.forEach(function (tab) {
        tab.classList.toggle('is-active', tab.getAttribute('data-catalog-id') === id);
      });
      lastFocused = document.activeElement;
      viewerEl.classList.add('is-open');
      viewerEl.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeCatalog() {
      viewerEl.classList.remove('is-open');
      viewerEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      viewerFrame.src = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    document.querySelectorAll('[data-catalog-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openCatalog(btn.getAttribute('data-catalog-view'));
      });
    });

    viewerTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        openCatalog(tab.getAttribute('data-catalog-id'));
      });
    });

    viewerEl.querySelectorAll('[data-catalog-close]').forEach(function (el) {
      el.addEventListener('click', closeCatalog);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && viewerEl.classList.contains('is-open')) closeCatalog();
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Pricing request form -> mailto
  var form = document.getElementById('pricing-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var company = form.company.value.trim();
      var email = form.email.value.trim();
      var type = form.type.value;
      var details = form.details.value.trim();

      var subject = 'US Brick Pricing Request — ' + (company || name || 'New Inquiry');
      var bodyLines = [
        'Name: ' + name,
        'Company: ' + company,
        'Email: ' + email,
        'Project type: ' + type,
        '',
        'Project details:',
        details
      ];
      var mailto = 'mailto:Kwray@usbrick.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(bodyLines.join('\n'));
      window.location.href = mailto;
    });
  }
})();

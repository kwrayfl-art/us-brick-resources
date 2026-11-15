(function () {
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
        if (match) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
      });
    });
  });
  var CATALOGS = {
    eldorado: {title:'Eldorado Stone 2026 Product Guide',src:'assets/catalogs/eldorado-stone-product-guide-2026.pdf',download:'US-Brick-Eldorado-Stone-Product-Guide-2026.pdf'},
    cultured: {title:'Cultured Stone 2026 Collections Guide',src:'assets/catalogs/cultured-stone-product-guide-2026.pdf',download:'US-Brick-Cultured-Stone-Product-Guide-2026.pdf'},
    dutchquality: {title:'Dutch Quality Stone 2026 Brochure',src:'assets/catalogs/dutch-quality-stone-brochure-2026.pdf',download:'US-Brick-Dutch-Quality-Stone-Brochure-2026.pdf'},
    stonecraft: {title:'StoneCraft 2025 Profile Book',src:'assets/catalogs/stonecraft-profile-book-2025.pdf',download:'US-Brick-StoneCraft-Profile-Book-2025.pdf'},
    versetta: {title:'Versetta Stone Panelized Veneer Brochure',src:'assets/catalogs/versetta-stone-brochure.pdf',download:'US-Brick-Versetta-Stone-Brochure.pdf'},
    tuuci: {title:'TUUCI — Shade & Umbrella Systems Catalog',src:'assets/catalogs/tuuci-catalog-2020.pdf',download:'US-Brick-TUUCI-Catalog.pdf'},
    barlow: {title:'Barlow Tyrie — New Products 2026 (Luxury Teak Outdoor Furniture)',src:'assets/catalogs/barlow-tyrie-new-products-2026.pdf',download:'US-Brick-Barlow-Tyrie-New-Products-2026.pdf'},
    earthcore: {title:'Isokern · Earthcore — Fireplaces & Chimneys Catalog (2024)',src:'assets/catalogs/earthcore-isokern-catalog-2024.pdf',download:'US-Brick-Isokern-Fireplaces-Catalog-2024.pdf'},
    shutters: {title:'Beyond Aesthetics — Complete Shutter Overview Brochure',src:'assets/catalogs/shutters-brochure.pdf',download:'US-Brick-Shutters-Overview-Brochure.pdf'}
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
      viewerTabs.forEach(function (tab) { tab.classList.toggle('is-active', tab.getAttribute('data-catalog-id') === id); });
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
    document.querySelectorAll('[data-catalog-view]').forEach(function (btn) {btn.addEventListener('click', function () {openCatalog(btn.getAttribute('data-catalog-view'));});});
    viewerTabs.forEach(function (tab) {tab.addEventListener('click', function () {openCatalog(tab.getAttribute('data-catalog-id'));});});
    viewerEl.querySelectorAll('[data-catalog-close]').forEach(function (el) {el.addEventListener('click', closeCatalog);});
    document.addEventListener('keydown', function (e) {if (e.key === 'Escape' && viewerEl.classList.contains('is-open')) closeCatalog();});
  }
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
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
      var bodyLines = ['Name: ' + name,'Company: ' + company,'Email: ' + email,'Project type: ' + type,'','Project details:',details];
      window.location.href = 'mailto:Kwray@usbrick.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
    });
  }
})();

(function () {
  function initSharing() {
    if (document.getElementById('usbrick-share')) return;
    var url = 'https://kwrayfl-art.github.io/us-brick-resources/app/index.html';
    var title = 'US Brick Resources | Kyle Wray';
    var text = 'Explore brick, stone, and outdoor living catalogs, request project pricing, and connect with Kyle Wray at US Brick.';
    var message = text + '\n' + url;
    var style = document.createElement('style');
    style.textContent = '#usbrick-share{position:fixed;right:16px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:900;background:#c41f28;color:#fff;border:2px solid #fff;border-radius:999px;padding:14px 20px;min-height:48px;box-shadow:0 4px 18px #0004;font:700 16px system-ui;cursor:pointer;display:flex;align-items:center;gap:9px}#usbrick-share svg{width:22px;height:22px}#usbrick-share-dialog{box-sizing:border-box;width:calc(100% - 32px);max-width:420px;border:0;border-radius:20px;padding:24px;background:#fff;color:#0e1a3c;font:16px system-ui;max-height:85vh;overflow:auto}#usbrick-share-dialog::backdrop{background:#0008}#usbrick-share-dialog h2{font:700 24px system-ui;margin:0 0 10px}#usbrick-share-dialog p{line-height:1.5}#usbrick-share-dialog a,#usbrick-share-dialog button{box-sizing:border-box;display:block;width:100%;margin:10px 0;padding:13px 16px;min-height:46px;border:1px solid #cbd0da;border-radius:10px;background:#f4f6fa;color:#0e1a3c;text-align:center;text-decoration:none;font:600 16px system-ui;cursor:pointer}#usbrick-share-dialog input{box-sizing:border-box;width:100%;padding:10px;font:14px system-ui}#usbrick-share-dialog :focus-visible,#usbrick-share:focus-visible{outline:3px solid #3478f6;outline-offset:3px}';
    document.head.appendChild(style);
    var button = document.createElement('button');
    button.id = 'usbrick-share';
    button.type = 'button';
    button.setAttribute('aria-label', 'Share US Brick app');
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 16V3m-5 5 5-5 5 5M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/></svg>Share App';
    var dialog = document.createElement('dialog');
    dialog.id = 'usbrick-share-dialog';
    dialog.setAttribute('aria-labelledby', 'usbrick-share-title');
    dialog.innerHTML = '<h2 id="usbrick-share-title">Share US Brick</h2><p>Send catalogs and project resources to a colleague.</p><a data-share="sms">Text Message</a><a data-share="email">Email</a><a data-share="facebook" target="_blank" rel="noopener noreferrer">Facebook</a><a data-share="linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a><button type="button" data-copy>Copy Link</button><label for="usbrick-share-url">App link</label><input id="usbrick-share-url" readonly><p data-status role="status" aria-live="polite"></p><button type="button" data-close>Close</button>';
    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    dialog.querySelector('[data-share=sms]').href = 'sms:' + (ios ? '&' : '?') + 'body=' + encodeURIComponent(message);
    dialog.querySelector('[data-share=email]').href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(message);
    dialog.querySelector('[data-share=facebook]').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    dialog.querySelector('[data-share=linkedin]').href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
    var input = dialog.querySelector('input');
    input.value = url;
    var status = dialog.querySelector('[data-status]');
    function openOptions() {status.textContent = ''; if (!dialog.open) dialog.showModal();}
    dialog.querySelector('[data-copy]').addEventListener('click', async function () {
      try {await navigator.clipboard.writeText(url); status.textContent = 'Link copied. Paste it into a text, email, or social post.';}
      catch (e) {input.focus(); input.select(); input.setSelectionRange(0, input.value.length); status.textContent = 'Touch and hold the selected link, then choose Copy.';}
    });
    dialog.querySelector('[data-close]').addEventListener('click', function () {dialog.close();});
    dialog.addEventListener('close', function () {button.focus();});
    button.addEventListener('click', async function () {
      if (navigator.share) {
        try {await navigator.share({title:title,text:text,url:url}); return;}
        catch (e) {if (e.name === 'AbortError') return;}
      }
      openOptions();
    });
    var options = document.createElement('button');
    options.type = 'button';
    options.className = 'btn btn-ghost';
    options.textContent = 'Share / Text / Email';
    options.addEventListener('click', openOptions);
    var cover = document.querySelector('.cover-ctas');
    if (cover) cover.appendChild(options);
    document.body.appendChild(dialog);
    document.body.appendChild(button);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSharing); else initSharing();
})();

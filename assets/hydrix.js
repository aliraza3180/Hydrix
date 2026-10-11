/* HYDRIX — shared front-end interactions
   - Animated waitlist counters
   - PDP plan selector / qty / gallery
   - Subscribe bundle builder
   Guards each feature so a page only runs what it needs. */
(function () {
  'use strict';

  /* ---------- Waitlist counter ---------- */
  function initCounters() {
    document.querySelectorAll('[data-hx-counter]').forEach(function (el) {
      if (el.dataset.hxInit) return;
      el.dataset.hxInit = '1';
      var target = parseInt(el.dataset.target, 10) || 0;
      var step = parseInt(el.dataset.step, 10) || 1;
      var interval = (parseFloat(el.dataset.interval) || 5) * 1000;
      var current = parseInt((el.textContent || '0').replace(/[^0-9]/g, ''), 10) || 0;
      var fmt = function (n) { return n.toLocaleString('en-US'); };
      el.textContent = fmt(current);
      var ramp = setInterval(function () {
        if (current < target) {
          current = Math.min(target, current + Math.ceil((target - current) / 6));
          el.textContent = fmt(current);
        } else {
          clearInterval(ramp);
        }
      }, 55);
      if (step > 0 && interval > 0) {
        setInterval(function () {
          if (current >= target) { current += step; el.textContent = fmt(current); }
        }, interval);
      }
    });
  }

  /* ---------- PDP (product buy box) ---------- */
  function initPdp() {
    document.querySelectorAll('[data-hx-pdp]').forEach(function (root) {
      if (root.dataset.hxInit) return;
      root.dataset.hxInit = '1';

      // Gallery thumbnails
      var main = root.querySelector('[data-hx-main]');
      root.querySelectorAll('[data-hx-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var src = thumb.getAttribute('data-src');
          if (main && src) main.src = src;
          root.querySelectorAll('[data-hx-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
        });
      });

      // Flavor pills
      root.querySelectorAll('[data-hx-flavor]').forEach(function (pill) {
        pill.addEventListener('click', function () {
          root.querySelectorAll('[data-hx-flavor]').forEach(function (p) { p.classList.remove('hx-chip--active'); });
          pill.classList.add('hx-chip--active');
        });
      });

      var priceEl = root.querySelector('[data-hx-price]');
      var btnTotal = root.querySelector('[data-hx-btn-total]');
      var qtyEl = root.querySelector('[data-hx-qty]');
      var qty = 1;
      var plan = root.querySelector('[data-hx-plan].is-active');
      function planPrice() {
        var active = root.querySelector('[data-hx-plan].is-active');
        return active ? parseFloat(active.getAttribute('data-price')) : 0;
      }
      function refresh() {
        var unit = planPrice();
        if (priceEl) priceEl.textContent = '$' + unit.toFixed(2);
        if (btnTotal) btnTotal.textContent = '$' + (unit * qty).toFixed(2);
      }
      root.querySelectorAll('[data-hx-plan]').forEach(function (card) {
        card.addEventListener('click', function () {
          root.querySelectorAll('[data-hx-plan]').forEach(function (c) { c.classList.remove('is-active'); });
          card.classList.add('is-active');
          refresh();
        });
      });
      var dec = root.querySelector('[data-hx-dec]');
      var inc = root.querySelector('[data-hx-inc]');
      if (dec) dec.addEventListener('click', function () { qty = Math.max(1, qty - 1); if (qtyEl) qtyEl.textContent = qty; refresh(); });
      if (inc) inc.addEventListener('click', function () { qty = Math.min(9, qty + 1); if (qtyEl) qtyEl.textContent = qty; refresh(); });
      refresh();
    });
  }

  /* ---------- Subscribe bundle builder ---------- */
  function initBundle() {
    document.querySelectorAll('[data-hx-bundle]').forEach(function (root) {
      if (root.dataset.hxInit) return;
      root.dataset.hxInit = '1';
      var unit = parseFloat(root.getAttribute('data-unit')) || 49;
      var save = parseFloat(root.getAttribute('data-save')) || 0.15;
      var itemsEl = root.querySelector('[data-hx-items]');
      var subEl = root.querySelector('[data-hx-subtotal]');
      var saveEl = root.querySelector('[data-hx-savings]');
      var totalEl = root.querySelector('[data-hx-total]');
      function refresh() {
        var count = root.querySelectorAll('[data-hx-tile].is-active').length;
        var subtotal = count * unit;
        var savings = subtotal * save;
        if (itemsEl) itemsEl.textContent = count;
        if (subEl) subEl.textContent = '$' + subtotal.toFixed(2);
        if (saveEl) saveEl.textContent = '−$' + savings.toFixed(2);
        if (totalEl) totalEl.textContent = '$' + (subtotal - savings).toFixed(2);
      }
      root.querySelectorAll('[data-hx-tile]').forEach(function (tile) {
        tile.addEventListener('click', function () { tile.classList.toggle('is-active'); refresh(); });
      });
      refresh();
    });
  }

  /* ---------- Review / card slider (scroll-snap + arrows + dots) ---------- */
  function initSliders() {
    document.querySelectorAll('[data-hx-slider]').forEach(function (root) {
      if (root.dataset.hxInit) return;
      root.dataset.hxInit = '1';
      var track = root.querySelector('[data-hx-track]');
      if (!track) return;
      var prev = root.querySelector('[data-hx-prev]');
      var next = root.querySelector('[data-hx-next]');
      var dotsWrap = root.querySelector('[data-hx-dots]');
      var slides = Array.prototype.slice.call(track.children);

      function step() {
        var c = track.children[0];
        if (!c) return track.clientWidth;
        var st = getComputedStyle(track);
        var gap = parseFloat(st.columnGap || st.gap) || 0;
        return c.getBoundingClientRect().width + gap;
      }
      function go(dir) { track.scrollBy({ left: dir * step(), behavior: 'smooth' }); }
      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });

      var dots = [];
      if (dotsWrap) {
        slides.forEach(function (s, i) {
          var d = document.createElement('button');
          d.type = 'button'; d.className = 'hxh-rs__dot';
          d.setAttribute('aria-label', 'Go to review ' + (i + 1));
          d.addEventListener('click', function () { track.scrollTo({ left: step() * i, behavior: 'smooth' }); });
          dotsWrap.appendChild(d); dots.push(d);
        });
      }
      function update() {
        var idx = Math.round(track.scrollLeft / step());
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      }
      track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();

      var ms = parseInt(root.getAttribute('data-autoplay'), 10) || 0;
      if (ms > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var timer = setInterval(tick, ms);
        function tick() {
          if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) track.scrollTo({ left: 0, behavior: 'smooth' });
          else go(1);
        }
        root.addEventListener('mouseenter', function () { clearInterval(timer); });
        root.addEventListener('mouseleave', function () { timer = setInterval(tick, ms); });
      }
    });
  }

  /* ---------- Custom product page: live variant switching + gallery + qty ---------- */
  function initProductForm() {
    document.querySelectorAll('[data-hx-product]').forEach(function (root) {
      if (root.dataset.hxInit) return;
      root.dataset.hxInit = '1';

      var dataEl = root.querySelector('[data-hx-variant-json]');
      var variants = [];
      if (dataEl) { try { variants = JSON.parse(dataEl.textContent); } catch (e) { variants = []; } }
      var idInput = root.querySelector('[data-hx-variant-id]');
      var priceEl = root.querySelector('[data-hx-price]');
      var compareEl = root.querySelector('[data-hx-compare]');
      var atcBtn = root.querySelector('[data-hx-atc-btn]');
      var atcLabel = atcBtn ? (atcBtn.getAttribute('data-label') || atcBtn.textContent.trim()) : 'Add to cart';
      var mainImg = root.querySelector('[data-hx-main]');
      var fmtEl = root.querySelector('[data-hx-money-format]');
      var moneyFormat = fmtEl ? fmtEl.textContent.trim() : '${{amount}}';

      function money(cents) {
        var value = (cents / 100).toFixed(2);
        if (moneyFormat.indexOf('amount') > -1) {
          return moneyFormat
            .replace(/\{\{\s*amount\s*\}\}/g, value)
            .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, Math.round(cents / 100))
            .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, value.replace('.', ','))
            .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, Math.round(cents / 100));
        }
        return '$' + value;
      }
      function selectedOptions() {
        var opts = [];
        root.querySelectorAll('[data-hx-opt]:checked').forEach(function (el) {
          opts[parseInt(el.dataset.position, 10) - 1] = el.value;
        });
        return opts;
      }
      function matchVariant(opts) {
        for (var i = 0; i < variants.length; i++) {
          var ok = true;
          for (var j = 0; j < opts.length; j++) { if (variants[i].options[j] !== opts[j]) { ok = false; break; } }
          if (ok) return variants[i];
        }
        return null;
      }
      function showMedia(mediaId) {
        if (!mainImg || !mediaId) return;
        var thumb = root.querySelector('[data-hx-thumb][data-media-id="' + mediaId + '"]');
        if (thumb) {
          mainImg.src = thumb.getAttribute('data-src');
          root.querySelectorAll('[data-hx-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
        }
      }
      function update() {
        var v = matchVariant(selectedOptions());
        if (!v) { if (atcBtn) { atcBtn.disabled = true; atcBtn.textContent = 'Unavailable'; } return; }
        if (idInput) idInput.value = v.id;
        if (priceEl) priceEl.textContent = money(v.price);
        if (compareEl) {
          if (v.compare_at_price && v.compare_at_price > v.price) { compareEl.textContent = money(v.compare_at_price); compareEl.hidden = false; }
          else { compareEl.hidden = true; }
        }
        if (atcBtn) { atcBtn.disabled = !v.available; atcBtn.textContent = v.available ? atcLabel : 'Sold out'; }
        showMedia(v.media_id);
        if (window.history && window.history.replaceState) {
          try { var u = new URL(window.location.href); u.searchParams.set('variant', v.id); window.history.replaceState({}, '', u); } catch (e) {}
        }
      }

      root.querySelectorAll('[data-hx-opt]').forEach(function (el) { el.addEventListener('change', update); });
      root.querySelectorAll('[data-hx-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          if (mainImg) mainImg.src = thumb.getAttribute('data-src');
          root.querySelectorAll('[data-hx-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
        });
      });
      var qty = root.querySelector('[data-hx-qty]');
      var dec = root.querySelector('[data-hx-dec]'), inc = root.querySelector('[data-hx-inc]');
      if (dec && qty) dec.addEventListener('click', function () { qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) - 1); });
      if (inc && qty) inc.addEventListener('click', function () { qty.value = (parseInt(qty.value, 10) || 1) + 1; });
    });
  }

  /* ---------- Add to cart (AJAX; falls back to a normal POST without JS) ---------- */
  function sectionInner(html) {
    try { var doc = new DOMParser().parseFromString(html, 'text/html'); var w = doc.querySelector('.shopify-section'); return w ? w.innerHTML : html; }
    catch (e) { return html; }
  }
  function initAtc() {
    document.querySelectorAll('form[data-hx-atc], form.hx-mp__form').forEach(function (form) {
      if (form.dataset.hxInit) return;
      form.dataset.hxInit = '1';
      form.addEventListener('submit', function (e) {
        var idEl = form.querySelector('[name=id]');
        if (!idEl || !idEl.value) return; // let it submit normally
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var orig = btn ? btn.innerHTML : '';
        var qtyEl = form.querySelector('[name=quantity]');
        var quantity = qtyEl ? Math.max(1, parseInt(qtyEl.value, 10) || 1) : 1;
        if (btn) { btn.disabled = true; btn.innerHTML = 'Adding…'; }

        // Use the theme's default cart drawer / notification element when present
        var cartEl = document.querySelector('cart-drawer') || document.querySelector('cart-notification');
        var sections = ['cart-icon-bubble'];
        if (cartEl && typeof cartEl.getSectionsToRender === 'function') {
          try { sections = cartEl.getSectionsToRender().map(function (sec) { return sec.id; }); } catch (e2) {}
        }

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: idEl.value, quantity: quantity, sections: sections.join(','), sections_url: window.location.pathname })
        })
          .then(function (r) { return r.json().then(function (d) { if (!r.ok) throw d; return d; }); })
          .then(function (res) {
            if (cartEl && typeof cartEl.renderContents === 'function') {
              cartEl.renderContents(res); // Dawn injects the cart sections and opens the drawer
            } else {
              var bubble = document.getElementById('cart-icon-bubble');
              if (bubble && res.sections && res.sections['cart-icon-bubble']) {
                bubble.innerHTML = sectionInner(res.sections['cart-icon-bubble']);
              } else {
                fetch('/cart.js').then(function (r) { return r.json(); }).then(function (cart) {
                  document.querySelectorAll('.cart-count-bubble, .hx-header__cart-count').forEach(function (el) { el.textContent = cart.item_count; el.classList.remove('hidden'); });
                });
              }
            }
            document.dispatchEvent(new CustomEvent('hx:cart:added', { detail: res }));
            if (btn) btn.innerHTML = 'Added ✓';
          })
          .catch(function () { if (btn) btn.innerHTML = 'Try again'; })
          .finally(function () { setTimeout(function () { if (btn) { btn.disabled = false; btn.innerHTML = orig; } }, 1600); });
      });
    });
  }

  /* ---------- Custom slide-in cart drawer ---------- */
  function initCartDrawer() {
    var drawer = document.querySelector('[data-hx-cart-drawer]');
    if (!drawer || drawer.dataset.hxInit) return;
    drawer.dataset.hxInit = '1';
    var content = drawer.querySelector('[data-hx-cd-content]');

    function open() { drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); document.body.classList.add('hx-cd-lock'); }
    function close() { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('hx-cd-lock'); }

    function setCount(n) {
      var holder = document.getElementById('cart-icon-bubble');
      if (holder) {
        var bubble = holder.querySelector('.cart-count-bubble');
        if (n > 0) {
          if (!bubble) { bubble = document.createElement('div'); bubble.className = 'cart-count-bubble'; holder.appendChild(bubble); }
          bubble.innerHTML = '<span aria-hidden="true">' + n + '</span><span class="visually-hidden">' + n + '</span>';
        } else if (bubble) { bubble.remove(); }
      }
      document.querySelectorAll('.hx-header__cart-count').forEach(function (el) { el.textContent = n; });
    }

    function refresh(thenOpen) {
      return fetch(window.location.pathname + '?sections=hydrix-cart-drawer', { headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var html = data['hydrix-cart-drawer'];
          if (html && content) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var fresh = doc.querySelector('[data-hx-cd-content]');
            if (fresh) content.innerHTML = fresh.innerHTML;
          }
          if (thenOpen) open();
        })
        .catch(function () { if (thenOpen) open(); });
    }

    function change(key, qty) {
      fetch('/cart/change.js', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty })
      })
        .then(function (r) { return r.json(); })
        .then(function (cart) { setCount(cart.item_count); document.dispatchEvent(new CustomEvent('hx:cart:changed', { detail: cart })); return refresh(false); });
    }

    if (content) {
      content.addEventListener('click', function (e) {
        var ctl = e.target.closest('[data-hx-cd-inc],[data-hx-cd-dec],[data-hx-cd-remove]');
        if (!ctl) return;
        var line = ctl.closest('[data-key]');
        if (!line) return;
        var key = line.getAttribute('data-key');
        var numEl = line.querySelector('[data-hx-cd-qnum]');
        var cur = numEl ? (parseInt(numEl.textContent, 10) || 1) : 1;
        if (ctl.hasAttribute('data-hx-cd-inc')) change(key, cur + 1);
        else if (ctl.hasAttribute('data-hx-cd-dec')) change(key, Math.max(0, cur - 1));
        else change(key, 0);
      });
    }

    drawer.addEventListener('click', function (e) { if (e.target.closest('[data-hx-cd-close]')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) close(); });
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('#cart-icon-bubble, [data-hx-cart-open]');
      if (trigger) { e.preventDefault(); open(); refresh(false); }
    });
    document.addEventListener('hx:cart:added', function () { refresh(true); });
  }

  function initAll() { initCounters(); initPdp(); initBundle(); initSliders(); initProductForm(); initAtc(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else { initAll(); }
  document.addEventListener('shopify:section:load', initAll);
})();

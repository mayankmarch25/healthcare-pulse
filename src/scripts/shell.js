// Shared page behaviour: reading progress, dark mode, mobile nav, back to top,
// section highlighting, related carousel, share links.
// One copy for the entire site. Previously this was pasted into 68 pages
// and had drifted into 20+ slightly different versions.
(function () {
  var bar = document.getElementById('prog');
  if (bar) addEventListener('scroll', function () {
    var h = document.documentElement;
    bar.style.width = ((h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) || 0) + '%';
  }, { passive: true });

  var tt = document.getElementById('themeToggle');
  if (tt) tt.addEventListener('click', function () {
    var r = document.documentElement;
    if (r.getAttribute('data-theme') === 'dark') {
      r.removeAttribute('data-theme');
      try { localStorage.setItem('hp-theme', 'light'); } catch (e) {}
    } else {
      r.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('hp-theme', 'dark'); } catch (e) {}
    }
  });

  var t = document.getElementById('navToggle'), n = document.getElementById('siteNav');
  if (t && n) t.addEventListener('click', function () {
    var o = n.classList.toggle('open');
    t.setAttribute('aria-expanded', o ? 'true' : 'false');
  });

  var toTop = document.querySelector('.to-top');
  if (toTop) {
    addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var hd = document.querySelector('.site-header');
  function setH() { if (hd) document.documentElement.style.setProperty('--hdr', hd.offsetHeight + 'px'); }
  setH(); addEventListener('resize', setH); addEventListener('load', setH);

  var links = [].slice.call(document.querySelectorAll('.jump a'));
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('data-s')); });
  function spy() {
    var off = (hd ? hd.offsetHeight : 68) + 90, y = window.scrollY + off, idx = 0;
    secs.forEach(function (s, i) { if (s && s.offsetTop <= y) idx = i; });
    links.forEach(function (a, i) { a.classList.toggle('on', i === idx); });
  }
  if (links.length) { addEventListener('scroll', spy, { passive: true }); spy(); }

  document.querySelectorAll('.related').forEach(function (sec) {
    var track = sec.querySelector('.related-grid');
    if (!track) return;
    sec.querySelectorAll('.rel-arrow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.getAttribute('data-dir'), 10) || 1;
        var card = track.querySelector('.related-card');
        var step = card ? (card.offsetWidth + 14) * 2 : 300;
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      });
    });
  });

  var sb = document.querySelector('.share-bar');
  var url = encodeURIComponent(location.href);
  var txt = encodeURIComponent(sb ? (sb.getAttribute('data-share-text') || document.title) : document.title);
  var wa = document.getElementById('shWa'); if (wa) wa.href = 'https://wa.me/?text=' + txt + '%20' + url;
  var li = document.getElementById('shLi'); if (li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
  var x = document.getElementById('shX'); if (x) x.href = 'https://twitter.com/intent/tweet?text=' + txt + '&url=' + url;
  var cp = document.getElementById('shCopy');
  if (cp) cp.addEventListener('click', function () {
    navigator.clipboard.writeText(location.href).then(function () { cp.textContent = 'Copied!'; });
  });
})();


(function(){
  var search = document.getElementById('fSearch');
  var year = document.getElementById('fYear');
  var topic = document.getElementById('fTopic');
  var btn = document.getElementById('fBtn');
  var clear = document.getElementById('fClear');
  var count = document.getElementById('fCount');
  var cards = Array.prototype.slice.call(document.querySelectorAll('#postGrid .card'));
  var PAGE = 12;            // how many to show initially / per "load more"
  var visibleLimit = PAGE;  // current cap when NOT searching/filtering
  var loadMoreBtn = document.getElementById('loadMore');

  function applyLimit(){
    // Only used when there's no active search/filter: show first N, hide rest
    cards.forEach(function(card, i){
      card.style.display = (i < visibleLimit) ? '' : 'none';
    });
    if(loadMoreBtn){
      loadMoreBtn.style.display = (visibleLimit < cards.length) ? '' : 'none';
      loadMoreBtn.textContent = 'Load more (' + (cards.length - visibleLimit) + ' more)';
    }
  }

  function runFilter(){
    var q = (search.value || '').trim().toLowerCase();
    var y = year.value;
    var t = topic.value;
    var filtering = !!(q || y || t);

    if(!filtering){
      // No search/filter active → show first N with Load more
      applyLimit();
      count.textContent = '';
      return;
    }

    // Search/filter active → show ALL matches, hide the Load more button
    if(loadMoreBtn) loadMoreBtn.style.display = 'none';
    var shown = 0;
    cards.forEach(function(card){
      var title = card.getAttribute('data-title') || '';
      var excerpt = card.getAttribute('data-excerpt') || '';
      var cardYear = card.getAttribute('data-year') || '';
      var cardTopic = card.getAttribute('data-topic') || '';
      var matchText = !q || title.indexOf(q) > -1 || excerpt.indexOf(q) > -1;
      var matchYear = !y || cardYear === y;
      var matchTopic = !t || cardTopic.split(',').map(function(s){return s.trim();}).indexOf(t) > -1;
      if(matchText && matchYear && matchTopic){
        card.style.display = '';
        shown++;
      } else {
        card.style.display = 'none';
      }
    });
    count.textContent = shown + (shown === 1 ? ' perspective found' : ' perspectives found');
    revealVisible();
  }

  function clearFilter(){
    search.value = ''; year.value = ''; topic.value = '';
    visibleLimit = PAGE;
    applyLimit();
    count.textContent = '';
  }

  if(loadMoreBtn){
    loadMoreBtn.addEventListener('click', function(){
      visibleLimit += PAGE;
      applyLimit();
      revealVisible();
    });
  }

  // reveal cards as they appear (fade-in); also handles load-more cards
  function revealVisible(){
    cards.forEach(function(card){
      if(card.style.display !== 'none') card.classList.add('in');
    });
  }
  applyLimit();  // set initial state on page load
  revealVisible();

  // real-time filtering as the user types or changes dropdowns
  if(search) search.addEventListener('input', runFilter);
  if(year) year.addEventListener('change', runFilter);
  if(topic) topic.addEventListener('change', runFilter);
  if(btn) btn.addEventListener('click', runFilter);
  if(clear) clear.addEventListener('click', clearFilter);

  // theme chips (e.g. Autism) fill the search box and filter
  document.querySelectorAll('.topic-chip-theme').forEach(function(chip){
    chip.addEventListener('click', function(e){
      e.preventDefault();
      var term = chip.getAttribute('data-search') || '';
      if(search){ search.value = term; runFilter(); }
      var fb = document.querySelector('.filter-bar');
      if(fb){ fb.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // sort coverage bars largest to smallest (keeps itself right as counts change)
  (function(){
    var bars = document.getElementById('statsBars');
    if(!bars) return;
    var rows = Array.prototype.slice.call(bars.querySelectorAll('.stat-row'));
    if(rows.length < 2) return;
    function val(row){
      var f = row.querySelector('.stat-fill');
      var pct = f ? parseFloat(f.getAttribute('data-pct')) || 0 : 0;
      var cEl = row.querySelector('.stat-count');
      var cnt = cEl ? parseFloat((cEl.textContent||'').replace(/[^0-9.]/g,'')) || 0 : 0;
      return pct * 1000 + cnt;   // pct first, edition count breaks ties
    }
    rows.sort(function(a,b){ return val(b) - val(a); })
        .forEach(function(r){ bars.appendChild(r); });
  })();

  // animate coverage bars when scrolled into view
  var statsBars = document.getElementById('statsBars');
  if(statsBars && 'IntersectionObserver' in window){
    var sObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          statsBars.querySelectorAll('.stat-fill').forEach(function(bar){
            bar.style.width = (bar.getAttribute('data-pct') || 0) + '%';
          });
          sObs.disconnect();
        }
      });
    }, {threshold: .3});
    sObs.observe(statsBars);
  } else if(statsBars){
    statsBars.querySelectorAll('.stat-fill').forEach(function(bar){
      bar.style.width = (bar.getAttribute('data-pct') || 0) + '%';
    });
  }

})();

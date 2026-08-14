
(function(){
  var search = document.getElementById('fSearch');
  var year = document.getElementById('fYear');
  var topic = document.getElementById('fTopic');
  var btn = document.getElementById('fBtn');
  var clear = document.getElementById('fClear');
  var count = document.getElementById('fCount');
  var cards = Array.prototype.slice.call(document.querySelectorAll('#postGrid .card'));

  function runFilter(){
    var q = (search.value || '').trim().toLowerCase();
    var y = year.value;
    var t = topic.value;
    var shown = 0;
    cards.forEach(function(card){
      var title = card.getAttribute('data-title') || '';
      var excerpt = card.getAttribute('data-excerpt') || '';
      var cardYear = card.getAttribute('data-year') || '';
      var cardTopic = card.getAttribute('data-topic') || '';
      var matchText = !q || title.indexOf(q) > -1 || excerpt.indexOf(q) > -1;
      var matchYear = !y || cardYear === y;
      var matchTopic = !t || cardTopic.split(',').map(function(s){return s.trim();}).indexOf(t) > -1;
      if(matchText && matchYear && matchTopic){ card.style.display = ''; shown++; }
      else { card.style.display = 'none'; }
    });
    count.textContent = (q || y || t) ? shown + (shown === 1 ? ' perspective found' : ' perspectives found') : '';
  }
  function clearFilter(){
    search.value=''; year.value=''; topic.value='';
    cards.forEach(function(c){ c.style.display=''; });
    count.textContent='';
  }
  if(search) search.addEventListener('input', runFilter);
  if(year) year.addEventListener('change', runFilter);
  if(topic) topic.addEventListener('change', runFilter);
  if(btn) btn.addEventListener('click', runFilter);
  if(clear) clear.addEventListener('click', clearFilter);

  document.querySelectorAll('.topic-chip-theme').forEach(function(chip){
    chip.addEventListener('click', function(e){
      e.preventDefault();
      var term = chip.getAttribute('data-search') || '';
      if(search){ search.value = term; runFilter(); }
      var fb = document.querySelector('.filter-bar');
      if(fb){ fb.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // reveal cards on load (no hero, so just show them)
  document.querySelectorAll('#postGrid .card.reveal').forEach(function(c){ c.classList.add('in'); });
})();

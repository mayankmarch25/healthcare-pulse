
(function(){
  var chips=document.getElementById('toolChips'),search=document.getElementById('toolSearch'),count=document.getElementById('toolCount');
  if(!chips)return;
  var cards=[].slice.call(document.querySelectorAll('.tools-grid .tool-card'));
  var active='all';
  function apply(){
    var q=(search.value||'').trim().toLowerCase(),shown=0;
    cards.forEach(function(c){
      var cats=(c.getAttribute('data-cat')||'').split(' ');
      var okC=active==='all'||cats.indexOf(active)>=0;
      var okQ=!q||c.textContent.toLowerCase().indexOf(q)>=0;
      var show=okC&&okQ; c.classList.toggle('hide',!show); if(show)shown++;
    });
    count.textContent=shown+' of '+cards.length+' tools';
  }
  chips.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;active=b.getAttribute('data-c');
    [].slice.call(chips.children).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});apply();});
  search.addEventListener('input',apply);
  apply();
})();

(function(){
 var dk=document.documentElement.getAttribute('data-theme')==='dark';
 Chart.defaults.font.family="'Manrope',system-ui,sans-serif";
 Chart.defaults.color=dk?'#AFC2C8':'#5A6B72';
 var GRID=dk?'rgba(175,194,200,.14)':'#E6EBEE';
 var C=['#0FA3A3','#2E7CB8','#7A5378','#E08A3C','#37B68A','#C2563F'];
 var el=document.getElementById('cProg');
 if(el) new Chart(el,{type:'bar',data:{labels:['U-WIN','NCD','SCD','Ni-kshay','JANANI','PMNDP'],
  datasets:[{data:[15.2,9.13,7.1,1.75,1.33,0.31],backgroundColor:C,borderRadius:5,barThickness:30}]},
  options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},
   tooltip:{callbacks:{label:function(c){var d=['15.2 crore immunised','9.13 crore under treatment','7.1 crore screened','1.75 crore cases notified','1.33 crore under maternal management','31.13 lakh availed dialysis'];return ' '+d[c.dataIndex];}}}},
   scales:{x:{grid:{color:GRID},title:{display:true,text:'crore (portal counters, not unique people)',font:{weight:600}}},y:{grid:{display:false},ticks:{font:{size:12,weight:'600'}}}}}});
 var e2=document.getElementById('cEff');
 if(e2) new Chart(e2,{type:'bar',data:{labels:['Infrastructure load','Data entry effort','HR duplication'],
  datasets:[
   {label:'Floor of the claim',data:[20,20,20],backgroundColor:['#2E7CB8','#0FA3A3','#E08A3C'],borderRadius:{topRight:0,bottomRight:0},barThickness:40,stack:'s'},
   {label:'Up to',data:[10,20,20],backgroundColor:['rgba(46,124,184,.35)','rgba(15,163,163,.35)','rgba(224,138,60,.35)'],borderRadius:{topRight:5,bottomRight:5},barThickness:40,stack:'s'}
  ]},
  options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
   plugins:{legend:{display:true,position:'bottom',labels:{boxWidth:12,font:{size:11.5},padding:12,
     generateLabels:function(){return [
       {text:'Floor of the projection (20%)',fillStyle:'#0FA3A3',strokeStyle:'#0FA3A3',lineWidth:0},
       {text:'Upper end of the stated band',fillStyle:'rgba(15,163,163,.35)',strokeStyle:'rgba(15,163,163,.35)',lineWidth:0}];}}},
    tooltip:{callbacks:{title:function(c){return c[0].label;},
      label:function(c){var hi=[30,40,40][c.dataIndex];
        return c.datasetIndex===0? ' at least 20% reduction claimed' : ' up to '+hi+
        (c.dataIndex===0?'% (band: 20 to 30%)':'% (band: 20 to 40%)');}}}},
   scales:{x:{stacked:true,min:0,max:50,grid:{color:GRID},ticks:{callback:function(v){return v+'%';}},
     title:{display:true,text:'projected reduction (ex-ante, unaudited)',font:{weight:600}}},
    y:{stacked:true,grid:{display:false},ticks:{font:{size:12.5,weight:'600'}}}}}});
})();
(function(){
  var box=document.getElementById('simBox'); if(!box) return;
  var STEPS=[
   {t:"Ready",n:"Press start to begin her year.",p:"",c:"#EAF6F6",k:[],kw:"The seven links of the chain. Start the run to see which one you are in.",
    silo:[0,0,0],conv:[0,0,0],convNo:[0,0,0]},
   {t:"First antenatal visit",n:"The ASHA registers her in the maternal programme. Name, age, address, husband's name, phone, village code. In the silo model this is the first of five separate registrations.",p:"JANANI",c:"#E8F3EC",k:[0,1],kw:"Link 1-2 &middot; <b>Identify and Capture</b>. Her identity is created and her details are entered for the first time.",
    silo:[1,4,1],conv:[1,4,1],convNo:[1,4,1]},
   {t:"Blood pressure is high",n:"She is referred for hypertension follow-up. A second programme, a second login, and her demographics are re-keyed from scratch. Under convergence she is retrieved, not re-registered.",p:"NCD PORTAL",c:"#FBEEDE",k:[1],kw:"Link 2 &middot; <b>Capture</b>. This is where duplicate entry either happens or does not.",
    silo:[2,8,2],conv:[1,6,1],convNo:[1,6,2]},
   {t:"Diabetes screening",n:"The same NCD contact adds a diabetes screen. In the silo model this is another form. Under convergence the clinical detail is added to a person who already exists.",p:"NCD PORTAL",c:"#FBEEDE",k:[1,2],kw:"Link 2-3 &middot; <b>Capture and Converge</b>. Clinical detail is added to a person who already exists.",
    silo:[3,11,3],conv:[1,7,1],convNo:[1,7,3]},
   {t:"Immunisation due",n:"Her child's vaccination is recorded in the immunisation system. A separate portal, a separate login, her details entered once more.",p:"U-WIN",c:"#E7F0F8",k:[2],kw:"Link 3 &middot; <b>Converge</b>. A third programme joins the same record, or starts a new one.",
    silo:[4,15,4],conv:[1,9,1],convNo:[1,9,4]},
   {t:"District sickle cell camp",n:"Her block is running sickle cell screening. Fifth programme, fifth registration in the silo model.",p:"SICKLE CELL",c:"#F1E9F5",k:[3],kw:"Link 4 &middot; <b>Exchange</b>. Records become portable across programmes, if the identity holds.",
    silo:[5,19,5],conv:[1,10,1],convNo:[1,10,5]},
   {t:"Follow-up, six months on",n:"She returns. In the silo model the worker cannot see that the pregnant woman and the hypertensive are the same person, because nothing joins them. Under convergence with ABHA, hypertension in pregnancy becomes visible inside the maternal workflow.",p:"CROSS-PROGRAMME",c:"#EAF6F6",k:[4,5],kw:"Link 5-6 &middot; <b>Analyse and Act</b>. This is the link most platforms never reach.",
    silo:[6,23,5],conv:[1,11,1],convNo:[1,11,5]},
   {t:"Her year, totalled",n:"Same woman. Same five care needs. The difference is not clinical effort, it is administrative friction, and it is borne entirely by the frontline worker.",p:"YEAR END",c:"#EAF6F6",k:[6],kw:"Link 7 &middot; <b>Outcome</b>. Continuity, cost and equity, or none of them.",
    silo:[6,23,5],conv:[1,11,1],convNo:[1,11,5]}
  ];
  var i=0, abha=true;
  var el={stage:document.getElementById('simStage'),narr:document.getElementById('simNarr'),
    step:document.getElementById('simStep'),next:document.getElementById('simNext'),
    back:document.getElementById('simBack'),reset:document.getElementById('simReset'),
    ab:document.getElementById('simAbha'),abs:document.getElementById('simAbhaState'),
    sL:document.getElementById('sLog'),sE:document.getElementById('sEnt'),sR:document.getElementById('sRec'),
    cL:document.getElementById('cLog'),cE:document.getElementById('cEnt'),cR:document.getElementById('cRec')};
  function render(){
    var s=STEPS[i], c=abha?s.conv:s.convNo;
    el.stage.style.background=s.c;
    el.narr.innerHTML='<b>'+s.t+'</b>'+s.n+(s.p?'<span class="tagp">'+s.p+'</span>':'');
    el.step.textContent='STEP '+i+' / 7';
    var nodes=document.querySelectorAll('#simChain .sc-node');
    var maxK = s.k.length? Math.max.apply(null,s.k) : -1;
    nodes.forEach(function(nd,ix){
      nd.classList.remove('on','done');
      if(s.k.indexOf(ix)>-1) nd.classList.add('on');
      else if(ix<maxK) nd.classList.add('done');
    });
    var w=document.getElementById('scWhat'); if(w) w.innerHTML=s.kw||'';
    el.sL.textContent=s.silo[0]; el.sE.textContent=s.silo[1]; el.sR.textContent=s.silo[2];
    el.cL.textContent=c[0]; el.cE.textContent=c[1]; el.cR.textContent=c[2];
    el.back.disabled=(i===0); el.next.disabled=(i===STEPS.length-1);
    el.next.textContent = i===0 ? 'Start \u203A' : (i===STEPS.length-1?'Done':'Next \u203A');
    if(i===STEPS.length-1 && !abha){
      el.narr.innerHTML+='<br><br><b style="color:#C2563F;display:inline;font-size:14.5px">Without ABHA linkage she is still five records.</b> One login, fewer entries, no joined-up patient. That is administrative convergence, and it is where this stops.';
    }
  }
  el.next.addEventListener('click',function(){ if(i<STEPS.length-1){i++;render();} });
  el.back.addEventListener('click',function(){ if(i>0){i--;render();} });
  el.reset.addEventListener('click',function(){ i=0; render(); });
  el.ab.addEventListener('change',function(){
    abha=el.ab.checked; el.abs.textContent=abha?'ON':'OFF';
    el.ab.closest('.sim-tog').classList.toggle('off',!abha); render();
  });
  render();
})();
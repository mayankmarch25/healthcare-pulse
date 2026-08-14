// ---------- chart defaults ----------
const dk=document.documentElement.getAttribute('data-theme')==='dark';
const P='#0FA3A3', L='#E08A3C', INK=dk?'#EAF6F6':'#1B3A4B', SLATE=dk?'#AFC2C8':'#5A6B72',
      HAIR=dk?'rgba(175,194,200,.18)':'#E2E8EC', AMB='#E08A3C', COR='#C2563F',
      TEAL='#0FA3A3', MIST=dk?'#2E4A57':'#B6E1DC', NAVY='#1B3A4B', BLUE='#2E7CB8';
Chart.defaults.font.family="'Manrope',system-ui,sans-serif";
Chart.defaults.font.size=11.5;
Chart.defaults.color=SLATE;
Chart.defaults.plugins.legend.labels.boxWidth=10;
Chart.defaults.plugins.legend.labels.boxHeight=10;
Chart.defaults.plugins.legend.labels.usePointStyle=true;
Chart.defaults.plugins.legend.labels.pointStyle='rect';
Chart.defaults.plugins.legend.labels.padding=14;
Chart.defaults.maintainAspectRatio=false;

const gridX={grid:{display:false},border:{color:HAIR}};
const gridY={grid:{color:HAIR,drawTicks:false},border:{display:false}};

function mk(id,cfg){const el=document.getElementById(id);if(el)new Chart(el,cfg);}

// ---------- panel 1 ----------
function p1(){
  mk('cUnlock',{type:'bar',data:{
    labels:['Doctors','Nurses & midwives'],
    datasets:[
      {label:'Registered stock',data:[8.8,17.7],backgroundColor:MIST,borderColor:MIST,borderWidth:0},
      {label:'Active in labour market',data:[6.1,10.6],backgroundColor:P},
      {label:'Active AND adequately qualified',data:[5.0,6.0],backgroundColor:INK}
    ]},
    options:{indexAxis:'y',scales:{x:{...gridY,title:{display:true,text:'Per 10,000 population',font:{size:10}}},y:gridX},
    plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>c.dataset.label+': '+c.raw+' per 10,000'}}}}});
}

// ---------- panel 2 ----------
function p2(){
  mk('cRadar',{type:'radar',data:{
    labels:['Health outcomes','Patient experience','Clinician experience','Lower cost','Health equity'],
    datasets:[
      {label:'Promise under ideal governance',data:[8,8.5,6.5,8,9],borderColor:P,backgroundColor:'rgba(15,163,163,.14)',borderWidth:2,pointBackgroundColor:P,pointRadius:3.5},
      {label:'Likely delivery, current structure',data:[4.5,7,4,4,2],borderColor:INK,backgroundColor:'rgba(218,242,29,.30)',borderWidth:2,pointBackgroundColor:L,pointBorderColor:INK,pointRadius:3.5}
    ]},
    options:{scales:{r:{min:0,max:10,ticks:{stepSize:2,backdropColor:'transparent',font:{size:9.5}},grid:{color:HAIR},angleLines:{color:HAIR},pointLabels:{font:{size:11,family:"'Space Grotesk'",weight:'600'},color:INK}}},
    plugins:{legend:{position:'bottom'}}}});

  mk('cGap',{type:'bar',data:{
    labels:['Health equity','Lower cost','Health outcomes','Clinician experience','Patient experience'],
    datasets:[{label:'Promise minus likely delivery',data:[7,4,3.5,2.5,1.5],
      backgroundColor:[COR,COR,AMB,AMB,TEAL],borderRadius:1}]},
    options:{indexAxis:'y',scales:{x:{...gridY,min:0,max:8,title:{display:true,text:'Delivery deficit (0-10 scale)',font:{size:10}}},y:gridX},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>'Deficit of '+c.raw+' points'}}}}});
}

// ---------- panel 3 ----------
function p3(){
  mk('cDensity',{type:'bar',data:{
    labels:['WHO benchmark','Registered stock','Active workforce','Active & adequately qualified'],
    datasets:[{data:[44.5,26.5,16.7,11.0],backgroundColor:[MIST,BLUE,P,COR],borderRadius:1}]},
    options:{scales:{x:gridX,y:{...gridY,title:{display:true,text:'Doctors, nurses & midwives per 10,000',font:{size:10}}}},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' per 10,000'}}}}});

  mk('cRural',{type:'bar',data:{
    labels:['Rural','Urban'],
    datasets:[
      {label:'Share of population',data:[66,34],backgroundColor:P},
      {label:'Share of health workforce',data:[33,67],backgroundColor:L,borderColor:INK,borderWidth:1}
    ]},
    options:{scales:{x:gridX,y:{...gridY,max:80,ticks:{callback:v=>v+'%'}}},
    plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>c.dataset.label+': '+c.raw+'%'}}}}});

  mk('cGrowth',{type:'bar',data:{
    labels:['2020-21','2024-25','2029-30 (projected)'],
    datasets:[{label:'Gig and platform workers (millions)',data:[7.7,10,23.5],
      backgroundColor:[MIST,P,INK],borderRadius:1}]},
    options:{scales:{x:gridX,y:{...gridY,title:{display:true,text:'Millions of workers',font:{size:10}}}},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' million'}}}}});

  mk('cEshram',{type:'bar',data:{
    labels:['Gig workforce, est. 2024-25','Registered on e-Shram, Dec 2025'],
    datasets:[{data:[100,5],backgroundColor:[MIST,COR],borderRadius:1}]},
    options:{indexAxis:'y',scales:{x:{...gridY,max:110,title:{display:true,text:'Lakh workers',font:{size:10}}},y:gridX},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' lakh workers'}}}}});
}

// ---------- panel 4 ----------
function p4(){
  mk('cScatter',{type:'bubble',data:{datasets:[
    {label:'Green tier',backgroundColor:'rgba(154,190,20,.55)',borderColor:'#B8892B',data:[
      {x:1,y:9,r:20,n:'Medical coding & scribing'},
      {x:1.5,y:8.5,r:14,n:'Scheduling & outreach'},
      {x:2,y:8,r:11,n:'De-identified data labelling'}]},
    {label:'Amber tier',backgroundColor:'rgba(242,160,61,.55)',borderColor:'#C97A15',data:[
      {x:4,y:7.5,r:22,n:'Teleconsultation'},
      {x:4.5,y:6.5,r:18,n:'Home sample collection'},
      {x:5.5,y:6,r:17,n:'Routine home nursing'},
      {x:5,y:6.8,r:13,n:'Physiotherapy'},
      {x:6,y:5,r:10,n:'Locum OPD shifts'}]},
    {label:'Red tier',backgroundColor:'rgba(232,56,79,.55)',borderColor:'#8B2635',data:[
      {x:9,y:2,r:9,n:'ICU staffing'},
      {x:9.5,y:1.5,r:7,n:'Surgery & anaesthesia'},
      {x:8.5,y:2.5,r:8,n:'Emergency medicine'},
      {x:9,y:1.2,r:6,n:'Neonatal critical care'}]}
  ]},
  options:{scales:{
    x:{min:0,max:11,grid:{color:HAIR},border:{display:false},title:{display:true,text:'Clinical risk to the patient →',font:{size:10.5}}},
    y:{min:0,max:10.5,grid:{color:HAIR},border:{display:false},title:{display:true,text:'Suitability for flexible / gig delivery →',font:{size:10.5}}}},
  plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>c.raw.n}}}}});

  mk('cGov',{type:'line',data:{
    labels:['Identity check','Credential verification','Named supervisor','Assignment orientation','Institutional indemnity'],
    datasets:[
      {label:'Green tier',data:[3,1,0,1,1],borderColor:'#B8892B',backgroundColor:'rgba(154,190,20,.12)',fill:true,tension:.3,pointRadius:3.5},
      {label:'Amber tier',data:[8,8,7,7,6],borderColor:AMB,backgroundColor:'rgba(242,160,61,.12)',fill:true,tension:.3,pointRadius:3.5},
      {label:'Red tier',data:[10,10,10,10,10],borderColor:COR,backgroundColor:'rgba(232,56,79,.12)',fill:true,tension:.3,pointRadius:3.5}
    ]},
    options:{scales:{x:gridX,y:{...gridY,min:0,max:10,title:{display:true,text:'Governance requirement index',font:{size:10}}}},
    plugins:{legend:{position:'bottom'}}}});
}





// render all figures on load
[p1,p2,p3,p4].forEach(function(f){ try{ f&&f(); }catch(e){} });
const dark=document.documentElement.getAttribute('data-theme')==='dark';
Chart.defaults.font.family="'Manrope',system-ui,sans-serif";
Chart.defaults.color=dark?'#AFC2C8':'#5A6B72';
const GRID=dark?'rgba(175,194,200,.14)':'#E6EBEE';
const TEAL='#0FA3A3',RED='#C2563F',AMBER='#E08A3C',NAVY='#1B3A4B',BLUE='#2E7CB8';
const fmt=n=>n.toLocaleString('en-IN');
const refLine=(axis,val,label)=>({id:'ref'+axis+val,afterDraw(ch){const s=ch.scales[axis];if(!s)return;const p=s.getPixelForValue(val),a=ch.chartArea,c=ch.ctx;c.save();c.setLineDash([5,4]);c.strokeStyle=dark?'#AFC2C8':NAVY;c.lineWidth=1.3;c.beginPath();if(axis==='y'){c.moveTo(a.left,p);c.lineTo(a.right,p);}else{c.moveTo(p,a.top);c.lineTo(p,a.bottom);}c.stroke();c.setLineDash([]);c.fillStyle=dark?'#AFC2C8':NAVY;c.font='700 10px Manrope';if(axis==='y')c.fillText(label,a.left+4,p-5);else c.fillText(label,p+5,a.top+11);c.restore();}});

/* Fig 1: tier shortfall (CHC worst, on top) */
const tiers=[{n:'CHC · referral hospital',pct:34,short:2544,c:RED},{n:'PHC · first doctor tier',pct:28,short:8343,c:AMBER},{n:'Sub-Centre · first contact',pct:18,short:33021,c:TEAL}];
new Chart(tierChart,{type:'bar',data:{labels:tiers.map(t=>t.n),datasets:[{data:tiers.map(t=>t.pct),backgroundColor:tiers.map(t=>t.c),borderRadius:5,barThickness:34}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.raw}% of needed facilities missing \u00b7 ${fmt(tiers[c.dataIndex].short)} facilities short`}}},scales:{x:{min:0,max:40,grid:{color:GRID},ticks:{callback:v=>v+'%'}},y:{grid:{display:false},ticks:{font:{size:12,weight:'600'}}}}}});

/* Fig 2: reframe - % of requirement filled */
new Chart(reframeChart,{type:'bar',data:{labels:['PHC generalist doctors','CHC generalist doctors (GDMOs)','CHC specialists'],datasets:[{data:[116,146,37],backgroundColor:[TEAL,BLUE,RED],borderRadius:6,barThickness:56}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>[' 29,949 in position of 25,785 required (116%)',' 16,483 in position of 11,278 required (146%) \u00b7 same buildings as the specialists',' 5,223 filled of 14,137 sanctioned (37%)'][c.dataIndex]}}},scales:{y:{min:0,max:160,grid:{color:GRID},ticks:{callback:v=>v+'%'}},x:{grid:{display:false},ticks:{font:{size:12,weight:'600'}}}}},plugins:[refLine('y',100,'fully staffed 100%')]});

/* Fig 3: trajectory grouped */
new Chart(trajChart,{type:'bar',data:{labels:['2005','2024'],datasets:[
 {label:'Sanctioned',data:[7582,14137],backgroundColor:NAVY,borderRadius:4},
 {label:'Filled',data:[3550,5223],backgroundColor:TEAL,borderRadius:4},
 {label:'Vacant',data:[3538,8923],backgroundColor:RED,borderRadius:4}]},
 options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{boxWidth:12,font:{size:12}}},tooltip:{callbacks:{label:c=>` ${c.dataset.label}: ${fmt(c.raw)} posts`}}},scales:{y:{beginAtZero:true,grid:{color:GRID},ticks:{callback:v=>fmt(v)}},x:{grid:{display:false},ticks:{font:{size:14,weight:'700'}}}}}});

/* Fig 4: state specialist vacancy ranking */
const SPEC=[["Madhya Pradesh",1308,1237],["Uttarakhand",198,171],["Punjab",259,208],["Bihar",1401,1048],["Odisha",1259,932],["Jharkhand",760,573],["Chhattisgarh",580,406],["Uttar Pradesh",3018,2042],["Rajasthan",1844,1098],["Jammu & Kashmir",181,81],["Gujarat",481,281],["Ladakh",43,30],["West Bengal",202,75],["Haryana",34,24],["Assam",293,75],["Maharashtra",566,219],["Telangana",79,37],["Karnataka",439,144],["Andhra Pradesh",551,91],["Tamil Nadu",509,111],["Kerala",38,3]];
const srows=SPEC.map(([s,sa,va])=>({s,rate:Math.round(va/sa*100),va,sa})).sort((a,b)=>b.rate-a.rate);
new Chart(stateChart,{type:'bar',data:{labels:srows.map(r=>r.s),datasets:[{data:srows.map(r=>r.rate),backgroundColor:srows.map((r,i)=>i<3?RED:(r.rate>=63?'#D08A7F':'#C9C7C0')),borderRadius:3,barThickness:13}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.raw}% vacant \u00b7 ${fmt(srows[c.dataIndex].va)} of ${fmt(srows[c.dataIndex].sa)} empty`}}},scales:{x:{min:0,max:100,grid:{color:GRID},ticks:{callback:v=>v+'%'}},y:{grid:{display:false},ticks:{font:{size:10.5}}}}},plugins:[refLine('x',63,'national 63%')]});
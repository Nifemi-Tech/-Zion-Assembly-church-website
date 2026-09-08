const C=window.ZION_CONFIG;
if(sessionStorage.getItem('zion_role')!=='member') location.href='index.html';
const defaults={
 sermons:[
  {id:'s1',title:'Walking in Faith',speaker:'Pastor',date:'2026-09-08',description:'A message about trusting God through every season.',file:''},
  {id:'s2',title:'The Power of Prayer',speaker:'Pastor',date:'2026-09-01',description:'Learning to build a consistent and meaningful prayer life.',file:''},
  {id:'s3',title:'Living With Purpose',speaker:'Pastor',date:'2026-08-25',description:'Discovering how faith shapes our daily choices.',file:''}
 ],
 events:[{id:'e1',title:'Sunday Worship Service',date:'2026-09-13',time:'[Add time]',location:'[Add location]',description:'Join us for worship, teaching and fellowship.'}],
 announcements:[{id:'a1',title:'Welcome to the Zion Assembly Portal',date:'2026-09-08',body:'This is your new home for sermons, announcements and church updates.'}]
};
function getData(){try{const saved=localStorage.getItem(C.storageKey);if(saved)return JSON.parse(saved)}catch(e){} localStorage.setItem(C.storageKey,JSON.stringify(defaults));return structuredClone(defaults)}
const data=getData();
const fmt=d=>new Date(d+'T00:00:00').toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'});
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function renderSermons(q=''){const el=document.getElementById('sermon-list');if(!el)return;const x=data.sermons.filter(s=>(s.title+' '+s.speaker+' '+s.description).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date));el.innerHTML=x.length?x.map(s=>`<article class="sermon-card"><div class="sermon-top"><span class="message-icon">♫</span><span class="date">${fmt(s.date)}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><small class="speaker">${esc(s.speaker||'Zion Assembly')}</small>${s.file?`<a class="download" href="${esc(s.file)}" download>Download message <b>→</b></a>`:`<span class="unavailable">File not uploaded yet</span>`}</article>`).join(''):`<div class="empty-state">No sermons matched your search.</div>`}
function renderEvents(){const el=document.getElementById('event-list');if(!el)return;const x=[...data.events].sort((a,b)=>a.date.localeCompare(b.date));el.innerHTML=x.length?x.map(e=>`<article class="event-card"><div class="calendar-tile"><strong>${new Date(e.date+'T00:00:00').getDate()}</strong><span>${new Date(e.date+'T00:00:00').toLocaleDateString('en-NG',{month:'short'})}</span></div><div><span class="date">${fmt(e.date)}</span><h3>${esc(e.title)}</h3><p>◷ ${esc(e.time||'Time to be announced')}</p><p>⌖ ${esc(e.location||'Location to be announced')}</p><small>${esc(e.description)}</small></div></article>`).join(''):`<div class="empty-state">No events have been added yet.</div>`}
function renderAnnouncements(){const el=document.getElementById('announcement-list');if(!el)return;const x=[...data.announcements].sort((a,b)=>b.date.localeCompare(a.date));el.innerHTML=x.length?x.slice(0,5).map(a=>`<article class="announcement"><span class="date">${fmt(a.date)}</span><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p></article>`).join(''):`<div class="empty-state">No announcements yet.</div>`}
renderSermons();renderEvents();renderAnnouncements();
const search=document.getElementById('sermon-search');if(search)search.addEventListener('input',e=>renderSermons(e.target.value));
const sc=document.getElementById('sermon-count');if(sc)sc.textContent=data.sermons.length;const ec=document.getElementById('event-count');if(ec)ec.textContent=data.events.length;
const form=document.getElementById('prayer-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form);const subject=encodeURIComponent('Zion Assembly Prayer Request');const body=encodeURIComponent(`Name: ${f.get('name')}\n\nPrayer request:\n${f.get('request')}`);window.location.href=`mailto:${C.churchEmail}?subject=${subject}&body=${body}`;const r=document.getElementById('prayer-result');if(r)r.textContent='Your email app should open with the prayer request prepared.'});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const logout=document.getElementById('logout');if(logout)logout.onclick=()=>{sessionStorage.clear();location.href='index.html'};

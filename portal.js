const C=window.ZION_CONFIG;
if(sessionStorage.getItem("zion_role")!=="member") location.href="index.html";
const defaults={
 sermons:[
  {id:"s1",title:"Walking in Faith",speaker:"Pastor",date:"2026-09-08",description:"A message about trusting God through every season.",file:""},
  {id:"s2",title:"The Power of Prayer",speaker:"Pastor",date:"2026-09-01",description:"Learning to build a consistent and meaningful prayer life.",file:""},
  {id:"s3",title:"Living With Purpose",speaker:"Pastor",date:"2026-08-25",description:"Discovering how faith shapes our daily choices.",file:""}
 ],
 events:[{id:"e1",title:"Sunday Worship Service",date:"2026-09-13",time:"[Add time]",location:"[Add location]",description:"Join us for worship, teaching and fellowship."}],
 announcements:[{id:"a1",title:"Welcome to the Zion Assembly Portal",date:"2026-09-08",body:"This is your new home for sermons, announcements and church updates."}]
};
function getData(){const saved=localStorage.getItem(C.storageKey);if(saved)return JSON.parse(saved);localStorage.setItem(C.storageKey,JSON.stringify(defaults));return structuredClone(defaults)}
const data=getData();
const fmt=d=>new Date(d+"T00:00:00").toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"});
function renderSermons(q=""){const x=data.sermons.filter(s=>(s.title+" "+s.speaker+" "+s.description).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date));document.getElementById("sermon-list").innerHTML=x.length?x.map(s=>`<article class="sermon-card"><div class="date">${fmt(s.date)}</div><h3>${s.title}</h3><p>${s.description||""}</p><p><strong>${s.speaker||"Zion Assembly"}</strong></p>${s.file?`<a class="download" href="${s.file}" download>Download message →</a>`:`<span class="unavailable">File will be available here when uploaded.</span>`}</article>`).join(""):`<div class="empty-state">No sermons matched your search.</div>`}
function renderEvents(){document.getElementById("event-list").innerHTML=data.events.sort((a,b)=>a.date.localeCompare(b.date)).map(e=>`<article class="event-card"><div class="event-date">${fmt(e.date)}</div><h3>${e.title}</h3><p>🕐 ${e.time||"[Add time]"}</p><p>📍 ${e.location||"[Add location]"}</p><small>${e.description||""}</small></article>`).join("")||`<div class="empty-state">No events have been added yet.</div>`}
function renderAnnouncements(){document.getElementById("announcement-list").innerHTML=data.announcements.sort((a,b)=>b.date.localeCompare(a.date)).map(a=>`<article class="announcement"><div class="date">${fmt(a.date)}</div><h3>${a.title}</h3><p>${a.body||""}</p></article>`).join("")||`<div class="empty-state">No announcements yet.</div>`}
document.getElementById("sermon-search").addEventListener("input",e=>renderSermons(e.target.value));
renderSermons();renderEvents();renderAnnouncements();
document.getElementById("sermon-count").textContent=data.sermons.length;document.getElementById("event-count").textContent=data.events.length;
document.getElementById("verse-text").textContent="“Commit your works to the Lord, and your plans will be established.”";
document.getElementById("verse-ref").textContent="Proverbs 16:3";
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("logout").onclick=()=>{sessionStorage.clear();location.href="index.html"};
document.querySelector(".menu-toggle").onclick=()=>document.getElementById("nav-links").classList.toggle("open");
document.getElementById("prayer-form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);const subject=encodeURIComponent("Zion Assembly Prayer Request");const body=encodeURIComponent(`Name: ${f.get("name")}\n\nPrayer request:\n${f.get("request")}`);window.location.href=`mailto:${C.churchEmail}?subject=${subject}&body=${body}`;document.getElementById("prayer-result").textContent="Your email app should open with the prayer request prepared."});

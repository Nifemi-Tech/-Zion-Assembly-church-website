const C=window.ZION_CONFIG;
if(sessionStorage.getItem("zion_role")!=="admin") location.href="index.html";
const defaults={sermons:[{id:"s1",title:"Walking in Faith",speaker:"Pastor",date:"2026-09-08",description:"A message about trusting God through every season.",file:""}],events:[{id:"e1",title:"Sunday Worship Service",date:"2026-09-13",time:"[Add time]",location:"[Add location]",description:"Join us for worship, teaching and fellowship."}],announcements:[{id:"a1",title:"Welcome to the Zion Assembly Portal",date:"2026-09-08",body:"This is your new home for sermons, announcements and church updates."}]};
function getData(){const s=localStorage.getItem(C.storageKey);if(s)return JSON.parse(s);localStorage.setItem(C.storageKey,JSON.stringify(defaults));return structuredClone(defaults)}
let data=getData();const save=()=>localStorage.setItem(C.storageKey,JSON.stringify(data));const fmt=d=>new Date(d+"T00:00:00").toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"});
function id(){return Date.now().toString(36)}
function render(){document.getElementById("a-sermons").textContent=data.sermons.length;document.getElementById("a-events").textContent=data.events.length;document.getElementById("a-announcements").textContent=data.announcements.length;
document.getElementById("admin-sermon-list").innerHTML=data.sermons.map(s=>`<div class="admin-item"><div><strong>${s.title}</strong><small>${fmt(s.date)} · ${s.speaker||"No speaker"}</small></div><div><button onclick="editSermon('${s.id}')">Edit</button><button class="danger" onclick="del('sermons','${s.id}')">Delete</button></div></div>`).join("");
document.getElementById("admin-event-list").innerHTML=data.events.map(s=>`<div class="admin-item"><div><strong>${s.title}</strong><small>${fmt(s.date)} · ${s.time||""}</small></div><div><button onclick="editEvent('${s.id}')">Edit</button><button class="danger" onclick="del('events','${s.id}')">Delete</button></div></div>`).join("");
document.getElementById("admin-announcement-list").innerHTML=data.announcements.map(s=>`<div class="admin-item"><div><strong>${s.title}</strong><small>${fmt(s.date)}</small></div><div><button onclick="editAnnouncement('${s.id}')">Edit</button><button class="danger" onclick="del('announcements','${s.id}')">Delete</button></div></div>`).join("")}
window.del=(type,key)=>{if(confirm("Delete this item?")){data[type]=data[type].filter(x=>x.id!==key);save();render()}};
function fill(form,obj){Object.keys(obj).forEach(k=>{const el=form.elements[k];if(el)el.value=obj[k]||""})}
window.editSermon=i=>fill(document.getElementById("sermon-form"),data.sermons.find(x=>x.id===i));
window.editEvent=i=>fill(document.getElementById("event-form"),data.events.find(x=>x.id===i));
window.editAnnouncement=i=>fill(document.getElementById("announcement-form"),data.announcements.find(x=>x.id===i));
function formData(form){return Object.fromEntries(new FormData(form).entries())}
function setup(formId,type,cancelId){const form=document.getElementById(formId);form.onsubmit=e=>{e.preventDefault();const o=formData(form);o.id=o.id||id();const n=data[type].findIndex(x=>x.id===o.id);if(n<0)data[type].push(o);else data[type][n]=o;save();form.reset();form.elements.id.value="";render()};document.getElementById(cancelId).onclick=()=>{form.reset();form.elements.id.value=""}}
setup("sermon-form","sermons","sermon-cancel");setup("event-form","events","event-cancel");setup("announcement-form","announcements","announcement-cancel");
document.getElementById("year").textContent=new Date().getFullYear();document.getElementById("logout").onclick=()=>{sessionStorage.clear();location.href="index.html"};document.querySelector(".menu-toggle").onclick=()=>document.getElementById("nav-links").classList.toggle("open");render();

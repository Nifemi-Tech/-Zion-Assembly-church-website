const sermons = [
  {title:"Walking in Faith", date:"September 8, 2026", speaker:"Pastor", description:"A message about trusting God through every season.", file:"sermons/walking-in-faith.pdf"},
  {title:"The Power of Prayer", date:"September 1, 2026", speaker:"Pastor", description:"Learning to build a consistent and meaningful prayer life.", file:"sermons/the-power-of-prayer.pdf"},
  {title:"Living With Purpose", date:"August 25, 2026", speaker:"Pastor", description:"Discovering how faith shapes our daily choices.", file:"sermons/living-with-purpose.pdf"}
];
const list=document.getElementById('sermon-list');
sermons.forEach(s=>{list.innerHTML += `<article class="sermon-card"><div class="date">${s.date}</div><h3>${s.title}</h3><p>${s.description}</p><p><strong>${s.speaker}</strong></p><a class="download" href="${s.file}" download>Download message →</a></article>`});
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelector('.menu-toggle').addEventListener('click',()=>document.getElementById('nav-links').classList.toggle('open'));

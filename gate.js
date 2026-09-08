const roleStep=document.getElementById("role-step"),passStep=document.getElementById("passcode-step");
const title=document.getElementById("passcode-title"),help=document.getElementById("passcode-help"),badge=document.getElementById("role-badge");
let selectedRole="";
document.querySelectorAll(".role-card").forEach(btn=>btn.addEventListener("click",()=>{
  selectedRole=btn.dataset.role; roleStep.classList.add("hidden"); passStep.classList.remove("hidden");
  const label=selectedRole==="admin"?"Admin":"Member";
  title.textContent=`${label} passcode`; help.textContent=`Enter your ${label.toLowerCase()} passcode to continue.`;
  badge.textContent=selectedRole==="admin"?"👑 ADMIN":"👤 MEMBER"; document.getElementById("passcode").focus();
}));
document.getElementById("back-btn").addEventListener("click",()=>{passStep.classList.add("hidden");roleStep.classList.remove("hidden");document.getElementById("passcode").value="";document.getElementById("error-message").textContent=""});
document.getElementById("toggle-pass").addEventListener("click",e=>{const x=document.getElementById("passcode");x.type=x.type==="password"?"text":"password";e.target.textContent=x.type==="password"?"Show":"Hide"});
document.getElementById("passcode-form").addEventListener("submit",e=>{
 e.preventDefault(); const entered=document.getElementById("passcode").value;
 const expected=selectedRole==="admin"?window.ZION_CONFIG.demoAdminPasscode:window.ZION_CONFIG.demoMemberPasscode;
 const err=document.getElementById("error-message");
 if(expected.startsWith("CHANGE_ME")){err.textContent="The site owner needs to set this passcode in config.js first.";return}
 if(entered!==expected){err.textContent="That passcode is not correct. Please try again.";return}
 sessionStorage.setItem("zion_role",selectedRole);
 location.href=selectedRole==="admin"?"admin.html":"member.html";
});

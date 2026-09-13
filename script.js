const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const toast = document.querySelector('#toast');
const loginBtn = document.querySelector('#loginBtn');
const searchInput = document.querySelector('#searchInput');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>toast.classList.remove('show'), 2400);
}

menuToggle?.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link=>{
  link.addEventListener('click', ()=>nav.classList.remove('open'));
});

loginBtn?.addEventListener('click', ()=>showToast('Fitur login siap dihubungkan ke sistem akun Anda.'));

document.querySelectorAll('.card-btn, .resource-card a').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const href = btn.getAttribute('href');
    if(!href || href === '#'){
      e.preventDefault();
      showToast('Konten ini bisa Anda hubungkan ke halaman materi/file berikutnya.');
    }
  });
});

searchInput?.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  const allCards = [...document.querySelectorAll('.lesson-card, .resource-card')];
  if(!q){ allCards.forEach(c=>c.hidden=false); return; }
  allCards.forEach(card=>{
    card.hidden = !card.innerText.toLowerCase().includes(q);
  });
});

document.querySelectorAll('.gallery img').forEach(img=>{
  img.addEventListener('click', ()=>{
    showToast('Gambar: ' + img.alt);
  });
});

const H=window.HUB;const app=document.getElementById('app');
const st={page:'landing',meeting:1,tab:'agenda',frame:0,full:false,history:[]};
const ICON={home:'⌂',profile:'◎',program:'ⓘ',files:'▣',meetings:'▦',media:'▶',lk:'▤',download:'⇩',reference:'▥',agenda:'▣',materi:'▤',kebijakan:'▤',rptm:'▤',rpp:'▤',rubrik:'▦',audio:'♫',gambar:'▧'};
const tabs=[['agenda','Agenda'],['materi','Tujuan Pembelajaran'],['kebijakan','Kebijakan'],['rptm','RPTM'],['rpp','RPP'],['lk','LK & Tugas'],['rubrik','Rubrik'],['audio','Audio/Video'],['gambar','Gambar']];
const exists=(key,n=st.meeting)=>key==='rptm'&&n===1||['rpp','lk','rubrik'].includes(key)&&n===1;
const m=()=>H.meetings[st.meeting-1];const frames=()=>m().stages.flatMap((s,si)=>s.frames.map((f,fi)=>({...f,si,fi,stage:s.title,duration:s.duration})));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function navigate(page,opts={}){st.history.push({page:st.page,meeting:st.meeting,tab:st.tab,frame:st.frame});Object.assign(st,{page,...opts});st.full=false;document.body.classList.remove('full');render();window.scrollTo(0,0)}
function goMeeting(n){
  navigate('meeting',{
    meeting:n,
    tab:'agenda',
    frame:n===2?-1:0
  });
}
function tab(t){
  st.tab=t;
  if(t==='agenda' && st.meeting===2){
    st.frame=-1;
  }
  render();
}
function setFrame(i){st.frame=Math.max(0,Math.min(frames().length-1,i));st.tab='agenda';render()}
function goBack(){const x=st.history.pop();if(x){Object.assign(st,x);render()}else navigate('dashboard')}
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.style.display='none',3000)}
function toggleFull(){st.full=!st.full;document.body.classList.toggle('full',st.full);render()}
function copyLink(path){const u=new URL(path,location.href).href;if(navigator.clipboard?.writeText)navigator.clipboard.writeText(u).then(()=>toast('Tautan disalin')).catch(()=>prompt('Salin tautan ini:',u));else prompt('Salin tautan ini:',u)}
function sidebar(){const nav=[['home','Beranda','dashboard'],['profile','Profil Fasilitator','profile'],['program','Tentang Program','program'],['files','Perangkat Program','files'],['meetings','Pertemuan (1–10)','dashboard'],['media','Bahan & Media','media'],['lk','LK & Rubrik','library'],['download','Pusat Unduhan','downloads'],['reference','Referensi','references']];return `<aside class="sidebar"><div class="sidehead"><span class="sideicon">▥</span><span>PKGSD-MBI<small>Facilitator Hub</small></span></div><div class="navgroup">${nav.map(([ico,title,page])=>`<button class="navitem ${st.page===page?'active':''}" onclick="navigate('${page}')"><span class="ico">${ICON[ico]}</span>${title}</button>`).join('')}${st.page==='meeting'?`<div class="subnav">${m().stages.map((s,i)=>`<button class="navitem" onclick="setFrame(${m().stages.slice(0,i).reduce((a,x)=>a+x.frames.length,0)})">${i+1}. ${esc(s.title)}</button>`).join('')}</div>`:''}</div><div class="sidebarfoot"></div></aside>`}
function layout(title,content){return `<div class="shell">${sidebar()}<main class="main"><div class="crumb"><span onclick="navigate('dashboard')" style="cursor:pointer">⌂ Beranda</span> ❯ <b>${esc(title)}</b></div><div class="panel">${content}</div></main></div>`}
function landing(){return `<main class="land"><div class="panel"><div class="logos"><img src="assets/kemdik.png" alt="Kemendikdasmen"><img src="assets/uika.png" alt="UIKA Bogor"><img src="assets/easy.png" alt="EASY English"></div><section class="hero"><div><span class="smalltag">WELCOME • FACILITATOR HUB</span><h1>PKGSD-MBI</h1><p>Program Pengembangan Kompetensi Guru Sekolah Dasar<br>Mengajar Bahasa Inggris</p><p class="muted">Cluster Rahmi Sukmawidianto</p><div class="buttonrow"><button class="btn yellow" onclick="navigate('profile')">👤 Profil Fasilitator</button><button class="btn primary" onclick="navigate('dashboard')">Masuk Dashboard →</button></div><p style="font-size:13px;margin-top:22px"><a href="/">← Kembali ke Website Utama</a></p></div><div class="hero-art">📚🌏</div></section></div></main>`}
function profile(){return layout('Profil Fasilitator',`<section class="hero profilehero"><img class="portrait" src="assets/rahmi.jpg" alt="Foto Rahmi Sukmawidianto"><div><span class="smalltag">Profil Fasilitator</span><h1>Rahmi Sukmawidianto</h1><p>▣ SMPN 3 Purabaya</p><p>🎓 Pendidikan: S2 Pendidikan Bahasa Inggris</p></div><div class="hero-art" style="font-size:75px">📚🌐</div></section><div class="grid"><div class="card"><h2>🏅 Pelatihan</h2><ul><li>ToT Calon Fasilitator PKGSD-MBI</li><li>PKGBI</li><li>Beasiswa TESOL</li><li>Google Certified Educator Level 1 & 2</li><li>Gemini Certified Educator</li><li>Microsoft Certified Educator</li></ul></div><div class="card green"><h2>💼 Pengalaman</h2><ul><li>Fasilitator PKGSD-MBI</li><li>Mentor Google Certified Educator</li><li>Mentor Gemini Academy</li><li>Trainer AI dan Coding Microsoft Elevate</li></ul></div><div class="card purple"><h2>📊 English Level</h2><ul><li>TOEFL ITP — B1</li><li>Versant 4 Skills Essential Test — B2</li></ul></div><div class="card pink"><h2>🔗 Media Sosial</h2><ul><li>Instagram: <a href="https://www.instagram.com/rahmi_sukmawidianto/" target="_blank" rel="noopener">@rahmi_sukmawidianto</a></li><li>Facebook: Rahmi Sukmawidianto</li></ul></div></div><div class="bottom"><button class="btn" onclick="navigate('landing')">← Landing Page</button><button class="btn primary" onclick="navigate('dashboard')">Dashboard Pertemuan →</button></div>`)}
function dashboard(){return layout('Dashboard 10 Pertemuan',`<h1 class="section-title">Selamat Datang di PKGSD-MBI 👋</h1><p class="muted">Pilih pertemuan untuk membuka presentasi, RPTM, RPP, LK, dan bahan pendukung.</p><div class="meetings">${H.meetings.map(x=>`<button class="meeting" onclick="goMeeting(${x.number})"><span class="num">${x.number}</span><strong>Pertemuan ${x.number}</strong><div>${esc(x.title)}</div><small>${x.number===1?'Kerangka kegiatan tersedia':'Menunggu RPTM dan bahan resmi'}</small></button>`).join('')}</div><div class="note">Pertemuan 2–10 disiapkan sebagai kerangka kosong. Isi judul dan aktivitas melalui <code>data.js</code> setelah dokumen resmi tersedia.</div>`)}
function generic(){let title={program:'Tentang Program',files:'Perangkat Program',media:'Bahan & Media',library:'LK & Rubrik',downloads:'Pusat Unduhan',references:'Referensi'}[st.page];let inner='';if(st.page==='program')inner=`<p>Program Pengembangan Kompetensi Guru Sekolah Dasar Mengajar Bahasa Inggris (PKGSD-MBI).</p><p>Dokumen kebijakan dan silabus dapat dibuka pada menu Perangkat Program setelah file ditambahkan.</p>`;else if(st.page==='files')inner=H.programFiles.map(f=>fileCard(f.label,f.path,false)).join('');else if(st.page==='references')inner='<p>Tambahkan daftar referensi resmi program di sini. Belum ada referensi yang diunggah.</p>';else inner=H.meetings.map(x=>`<div class="card" style="margin-bottom:12px"><b>Pertemuan ${x.number} — ${esc(x.title)}</b><div class="buttonrow">${(st.page==='media'?['audio','gambar']:st.page==='library'?['lk','rubrik']:['rptm','rpp','lk','rubrik']).map(k=>`<button class="btn" onclick="goMeeting(${x.number});tab('${k}')">${tabs.find(t=>t[0]===k)?.[1]}</button>`).join('')}</div></div>`).join('');return layout(title,`<h1 class="section-title">${title}</h1>${inner}`)}
function fileCard(label,path,available){return `<div class="card" style="margin:10px 0"><h2>📄 ${esc(label)}</h2>${available?`<div class="buttonrow"><a class="btn primary" href="${path}" target="_blank" rel="noopener">Buka File</a><a class="btn" href="${path}" download>Unduh</a><button class="btn" onclick="copyLink('${path}')">Salin Tautan</button></div>`:`<p class="muted">Belum diunggah. Letakkan file di <code>${esc(path)}</code>.</p>`}</div>`}

function tujuanPembelajaran() {
  const tujuan = {
    2: [
      "Peserta dapat menganalisa CP (Capaian Pembelajaran), TP/ATP (Tujuan Pembelajaran/Alur Tujuan Pelatihan), dan materi pembelajaran terkait My Self (alphabet, self-introduction, numbers and age).",

      "Peserta mampu menggunakan kosakata dan ungkapan terkait My Self (alphabet, self-introduction, numbers and age) dengan pelafalan yang dapat dipahami dalam kegiatan pembelajaran.",

      "Peserta mampu menggunakan Classroom English sederhana untuk memberikan instruksi dan memfasilitasi interaksi dan aktivitas pembelajaran materi My Self (alphabet, self-introduction, numbers and age).",

      "Peserta mampu mengimplementasikan pembelajaran dari buku murid materi My Self (alphabet, self-introduction, numbers and age).",

      "Peserta mampu memberikan, menerima umpan balik, dan menentukan perbaikan dalam praktik pembelajaran di kelas."
    ]
  };

  const daftar = tujuan[st.meeting];

  if (!daftar) {
    return `
      <h2>Tujuan Pembelajaran Pertemuan ${st.meeting}</h2>
      <p>Tujuan pembelajaran belum ditambahkan.</p>
    `;
  }

  return `
    <div style="padding:8px">
      <h2>Tujuan Pembelajaran — Pertemuan ${st.meeting}</h2>

      <div style="display:grid;gap:14px;margin-top:20px">
        ${daftar.map((teks, i) => `
          <div class="card"
               style="padding:18px;display:flex;gap:15px;align-items:flex-start">
            <span style="
              background:#e5f1ff;
              color:#0759bc;
              font-weight:bold;
              border-radius:10px;
              padding:9px 14px">
              ${i + 1}
            </span>
            <p style="margin:0;line-height:1.7">
              ${esc(teks)}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


function docView(){
  if(st.tab==='materi') return tujuanPembelajaran();
  let t=st.tab,n=st.meeting;
let file=t==='kebijakan'?H.programFiles[0]:t==='materi'?null:t==='rptm'||t==='rpp'||t==='lk'||t==='rubrik'||t==='audio'||t==='gambar'?{label:tabs.find(x=>x[0]===t)[1],path:H.files[t](n)}:null;let available=t==='kebijakan'?false:exists(t,n);if(t==='materi')return `<h2>Materi dan Media</h2><p>Materi Pertemuan ${n}: ${esc(m().title)}.</p><div class="buttonrow">${tabs.filter(x=>['rptm','rpp','lk','audio','gambar'].includes(x[0])).map(x=>`<button class="btn" onclick="tab('${x[0]}')">${x[1]}</button>`).join('')}</div><div class="note">Unggah materi resmi untuk menampilkan isi pembelajaran yang lengkap.</div>`;if(t==='agenda')return `<h2>Agenda Pertemuan ${n}</h2>${m().stages.length?`<div class="stages">${m().stages.map((s,i)=>`<div class="card" style="margin-bottom:10px"><h2>Tahap ${i+1} — ${esc(s.title)} <small>(${s.duration})</small></h2>${s.frames.map(f=>`<p>• ${esc(f.title)}</p>`).join('')}</div>`).join('')}</div>`:'<div class="empty"><div class="big">📅</div>Agenda menunggu RPTM resmi.</div>'}`;if(!file)return `<div class="empty">Bahan belum ditetapkan.</div>`;if(!available)return `<div class="empty"><div class="big">📂</div><h2>${esc(file.label)} belum diunggah</h2><p>Tambahkan file di <code>${esc(file.path)}</code></p></div>`;if(t==='rptm')return `<iframe title="RPTM Pertemuan ${n}" src="${file.path}#toolbar=1&navpanes=1"></iframe>`;if(t==='gambar')return `<img class="media" src="${file.path}" alt="Gambar pembelajaran">`;if(t==='audio')return `<audio controls src="${file.path}"></audio>`;return `<div class="empty"><div class="big">📄</div><h2>${esc(file.label)} Pertemuan ${n}</h2><p>File Word asli tersedia untuk dibuka atau diunduh.</p><p>Browser tidak selalu dapat menampilkan DOCX langsung. Gunakan tombol Unduh atau Buka File.</p></div>`}

function agendaRingkasan() {
  const n = st.meeting;
  const stages = m().stages;

  const times = n === 2
    ? ["13.00–13.20", "13.20–14.10", "14.10–16.00"]
    : [];

  const descriptions = n === 2
    ? [
        "Menghubungkan pembelajaran mandiri Ruang GTK, mengamati stimulus, mendiskusikan CP–TP, dan mengerjakan LK 2.",
        "Fasilitator memperagakan pembelajaran Alphabet, Self-Introduction, Numbers and Age sesuai urutan RPTM.",
        "Persiapan praktik, microteaching kelompok, peer feedback, dan refleksi sesuai petunjuk RPTM."
      ]
    : [];

  return `
    <div class="agenda-summary">
      <h2>Alur Fasilitasi 13.00–16.00</h2>
      <p><strong>180 menit</strong></p>

      ${stages.map((s, i) => {
        const firstFrame = stages
          .slice(0, i)
          .reduce((total, stage) => total + stage.frames.length, 0);

        return `
          <div class="card" style="margin-bottom:16px;padding:20px">
            <h2>${i + 1}. ${esc(s.title)}</h2>
            <p><strong>${esc(s.duration)}</strong></p>
            <p>${esc(times[i] || "")}</p>
            <p>${esc(descriptions[i] || "")}</p>

            <button class="btn primary"
              onclick="setFrame(${firstFrame})">
              Buka Aktivitas →
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function meeting(){let f=frames(),current=f[st.frame],n=st.meeting,docPath=['rptm','rpp','lk','rubrik','audio','gambar'].includes(st.tab)?H.files[st.tab](n):null,available=exists(st.tab,n);let stageHTML=m().stages.map((s,i)=>`<h4>Tahap ${i+1} — ${esc(s.title)} <small>${s.duration}</small></h4>${s.frames.map((x,j)=>{let k=m().stages.slice(0,i).reduce((a,v)=>a+v.frames.length,0)+j;return `<button onclick="setFrame(${k})" style="${st.frame===k?'background:#ffed8b':''}">${k+1}. ${esc(x.title)}</button>`}).join('')}`).join('');let display=st.tab==='agenda'&&st.meeting===2&&st.frame===-1
  ? agendaRingkasan()
  : st.tab==='agenda'&&current?`<div class="framebody"><span class="tag">Tahap ${current.si+1} · ${current.duration}</span><h2>${esc(current.title)}</h2><p>${esc(current.desc)}</p>${current.question?`<div class="question"><b>Pertanyaan fasilitator</b><br>${esc(current.question)}</div>`:''}<button class="btn yellow" onclick="tab('${current.material}')">Buka Bahan Terkait → ${esc(tabs.find(x=>x[0]===current.material)?.[1]||'Materi')}</button></div>`:docView();return layout(`Pertemuan ${n} ❯ ${tabs.find(x=>x[0]===st.tab)?.[1]}`,`<div class="tabs">${tabs.map(([key,label])=>`<button class="tab ${st.tab===key?'active':''}" onclick="tab('${key}')">${ICON[key]||'▣'} ${label}</button>`).join('')}</div><div class="workarea"><div class="docbox"><div class="doctitle">${st.tab==='agenda'?'📘 Agenda dan Aktivitas':st.tab==='rptm'?'📕 Rencana Pertemuan Tatap Muka':st.tab==='rpp'?'📕 Rencana Pembelajaran (RPP)':`📄 ${tabs.find(x=>x[0]===st.tab)?.[1]}`} — Pertemuan ${n}</div><div class="docbody">${display}</div></div><aside><div class="asidecard"><h3>Aksi Cepat</h3><div class="quick">${docPath&&available?`<a class="btn" href="${docPath}" download>⇩ Unduh</a><button onclick="copyLink('${docPath}')">🔗 Salin Tautan</button>`:`<button onclick="tab('rptm')">📄 RPTM</button><button onclick="tab('lk')">📄 LK</button>`}<button onclick="showQR()">▦ Bagikan QR</button><button onclick="window.print()">▣ Cetak</button></div></div><div class="asidecard"><h3>Daftar Isi / Quick Jump</h3><div class="stages">${stageHTML||'<p>Menunggu bahan resmi.</p>'}</div></div></aside></div><div class="bottom"><button class="btn primary" onclick="navigate('dashboard')">⌂ Home</button><button class="btn" onclick="setFrame(${st.frame-1})" ${!f.length||st.frame===0?'disabled':''}>❮ Sebelumnya</button><select aria-label="Pilih bagian" onchange="setFrame(Number(this.value))">${f.map((x,i)=>`<option value="${i}" ${i===st.frame?'selected':''}>${i+1}. ${esc(x.title)}</option>`).join('')||'<option>Belum tersedia</option>'}</select><button class="btn primary" onclick="setFrame(${st.frame+1})" ${!f.length||st.frame===f.length-1?'disabled':''}>Berikutnya ❯</button><span class="tag">${f.length?st.frame+1:0} / ${f.length}</span><button class="btn" onclick="toggleFull()">${st.full?'Keluar PID':'⛶ PID Fullscreen'}</button><button class="btn" onclick="goBack()">↩ Kembali</button></div>`)}
function showQR(){const path=st.tab==='lk'?H.files.lk(st.meeting):st.tab==='rptm'?H.files.rptm(st.meeting):st.tab==='rpp'?H.files.rpp(st.meeting):st.tab==='rubrik'?H.files.rubrik(st.meeting):H.files.lk(st.meeting);if(!['lk','rptm','rpp','rubrik'].some(k=>H.files[k](st.meeting)===path&&exists(k,st.meeting))){toast('File belum tersedia untuk dibagikan');return}const url=new URL(path,location.href).href;const qr=document.getElementById('qrmodal');qr.innerHTML=`<div class="card" style="max-width:420px;margin:12vh auto;text-align:center"><h2>Bagikan Bahan</h2><img src="${path===H.files.lk(1)?'assets/qr-lk1.png':path===H.files.rpp(1)?'assets/qr-rpp1.png':path===H.files.rubrik(1)?'assets/qr-rubrik1.png':'assets/qr-rptm1.png'}" alt="QR unduhan" style="width:230px;max-width:100%"><p style="overflow-wrap:anywhere;font-size:13px">${esc(url)}</p><button class="btn primary" onclick="copyLink('${path}')">Salin Tautan</button> <button class="btn" onclick="document.getElementById('qrmodal').remove()">Tutup</button></div>`;qr.style.display='block'}
function render(){let html=st.page==='landing'?landing():st.page==='profile'?profile():st.page==='dashboard'?dashboard():st.page==='meeting'?meeting():generic();app.innerHTML=html;const old=document.getElementById('qrmodal');if(old)old.remove();let qr=document.createElement('div');qr.id='qrmodal';qr.style.cssText='display:none;position:fixed;inset:0;background:#001b498c;z-index:50;padding:12px';qr.addEventListener('click',e=>{if(e.target===qr)qr.remove()});document.body.appendChild(qr)}
window.addEventListener('keydown',e=>{if(st.page==='meeting'&&['ArrowRight','ArrowLeft'].includes(e.key)&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();setFrame(st.frame+(e.key==='ArrowRight'?1:-1))}if(e.key==='Escape'&&st.full)toggleFull()});
render();

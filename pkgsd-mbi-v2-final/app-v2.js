const H=window.HUB;
// Setiap pertemuan membaca links.json di foldernya sendiri. Tidak perlu mengubah app-v2.js.
const CFG={};
const fileMap={agenda:['agenda.pdf','agenda.jpg','agenda.png'],analisis:['analisis-cp.pdf','analisis-cp.jpg','analisis-cp.png','lembar-kerja.pdf','lembar-kerja.jpg','lembar-kerja.png'],modelling:['activity-1.jpg','activity-1.png','activity-1.pdf','activity-2.jpg','activity-2.png','activity-2.pdf','activity-3.jpg','activity-3.png','activity-3.pdf','activity-4.jpg','activity-4.png','activity-4.pdf','activity-5.jpg','activity-5.png','activity-5.pdf'],microteaching:['langkah-2.jpg','langkah-2.png','langkah-2.pdf','classroom.jpg','classroom.png','classroom.pdf']};
async function loadMeeting(n){
  const root=`pertemuan-${n}/`;
  let conf={};
  try {const r=await fetch(root+'links.json',{cache:'no-store'});if(r.ok)conf=await r.json();}catch(e){console.warn('Konfigurasi belum dapat dibaca:',e)}
  const data={};
  for(const t of ['agenda','analisis','modelling','microteaching','audio','video','games','extras']){
    const rows=Array.isArray(conf[t])?conf[t]:[];
    data[t]=rows.filter(x=>x&&typeof x.url==='string'&&x.url.trim()).map(x=>[x.judul||'Materi', /^(https?:|\/)/i.test(x.url)?x.url:root+x.url.replace(/^\.\//,'')]);
  }
  // Nama file standar terdeteksi otomatis tanpa perlu mengisi links.json.
  await Promise.all(Object.entries(fileMap).map(async ([t,names])=>{
    for(const filename of names){
      try{const r=await fetch(root+filename,{method:'HEAD',cache:'no-store'});if(r.ok){data[t].push([filename,root+filename])}}catch(e){}
    }
  }));
  CFG[n]=data;
}

const S={meeting:0,tab:'agenda',selection:{},game:null,fullscreen:false};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nav=[['agenda','Agenda'],['analisis','Analisis CP'],['modelling','Modelling'],['microteaching','Microteaching']];
function title(n){return H.meetings[n-1]?.title||'Materi belum ditetapkan'}
function media(n,t){return (CFG[n]?.[t]||[]).filter(x=>x[1]);}
function embed(url){if(!url)return '';let u=url.trim();let y=u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);if(y)return 'https://www.youtube-nocookie.com/embed/'+y[1];if(/docs\.google\.com\/(presentation|document|spreadsheets)\/d\//.test(u))return u.replace(/\/(edit|view)(\?.*)?$/,'/preview');let d=u.match(/drive\.google\.com\/file\/d\/([^/?]+)/);if(d)return 'https://drive.google.com/file/d/'+d[1]+'/preview';if(/\.(docx|pptx|xlsx)(\?|$)/i.test(u))return '';if(/drive\.google\.com\/drive\//.test(u))return '';return u;}
function shell(content){$('app').innerHTML=content;}
function home(){S.meeting=0;setRoute('');shell(`<section class="v2hero profile-home" id="profil-beranda"><div class="hero-intro"><div class="eyebrow">PERSONAL ONLY</div><h1>PKGSD-MBI</h1><div class="developer">Developed by Rahmi Sukmawidianto</div></div><div class="hero-portrait"><img src="assets/rahmi.png" alt="Foto Rahmi Sukmawidianto"></div><div class="hero-bio"><h2>Rahmi Sukmawidianto</h2><p class="hero-school">▣ SMPN 3 Purabaya</p><div class="hero-bio-grid"><div><h3>Pendidikan &amp; Pelatihan</h3><p><b>S2 Pendidikan Bahasa Inggris</b></p><p>ToT PKGSD-MBI</p><p>PKGBI · Beasiswa TESOL</p><p>Google Certified Educator Level 1 &amp; 2</p><p>Gemini Certified Educator · Microsoft Certified Educator</p></div><div><h3>Pengalaman</h3><p>Fasilitator PKGSD-MBI</p><p>Mentor Google Certified Educator</p><p>Mentor Gemini Academy</p><p>Trainer AI dan Coding Microsoft Elevate</p></div><div><h3>English Level</h3><p>TOEFL ITP — B</p><p>Versant 4 Skills Essential Test — B2</p></div><div><h3>🔗Media Sosial</h3><p><a href="https://www.instagram.com/rahmi_sukmawidianto/" target="_blank" rel="noopener noreferrer">Instagram: @rahmi_sukmawidianto</a></p><p>Facebook: Rahmi Sukmawidianto</p></div></div></div></section><section class="v2home"><div class="home-title"><h2>Dashboard Pertemuan</h2></div><div class="meetinggrid">${H.meetings.map(x=>`<button class="meetingtile" onclick="openMeeting(${x.number})"><span class="numb">${x.number}</span><b>Pertemuan ${x.number}</b><small>${esc(title(x.number))}</small></button>`).join('')}</div></section>`)}
function profile(){home();window.scrollTo({top:0,behavior:'smooth'});}
async function openMeeting(n){if(!Number.isInteger(n)||n<1||n>H.meetings.length)return;S.meeting=n;S.tab='agenda';S.selection={};S.game=null;setRoute('pertemuan-'+n+'/agenda');render();await loadMeeting(n);if(S.meeting===n)render();window.scrollTo(0,0)}
function selectTab(t){if(!nav.some(x=>x[0]===t))return;S.tab=t;S.game=null;setRoute('pertemuan-'+S.meeting+'/'+t);render()}
function pick(i){S.selection[S.tab]=i;render();const box=$('mainViewer');if(box)box.scrollIntoView({behavior:'smooth',block:'nearest'})}
function showGame(i){S.game=S.game===i?null:i;render();if(S.game!==null)setTimeout(()=>{$('gameArea')?.scrollIntoView({behavior:'smooth',block:'start'})},40)}
function viewer(item,placeholder){if(!item)return `<div class="placeholder"><span>📄</span><h3>${placeholder}</h3><p>Link atau file belum ditambahkan. Unggah file dengan nama standar ke folder pertemuan, atau isi <code>links.json</code>.</p></div>`;let [name,url]=item,src=embed(url);if(!src)return `<div class="placeholder"><span>📁</span><h3>${esc(name)}</h3><p>Format ini tidak mendukung pratinjau langsung.</p><a class="action" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Buka dokumen ↗</a></div>`;if(/\.(png|jpe?g|gif|webp)(\?|$)/i.test(src))return `<img class="content-image" src="${esc(src)}" alt="${esc(name)}">`;if(/\.(mp3|wav|ogg)(\?|$)/i.test(src))return `<div class="audioarea"><h3>${esc(name)}</h3><audio controls src="${esc(src)}"></audio></div>`;if(/\.(mp4|webm)(\?|$)/i.test(src))return `<video class="videoplayer" controls src="${esc(src)}"></video>`;return `<iframe title="${esc(name)}" src="${esc(src)}" loading="lazy" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`}
function resourceLinks(list,selected){return `<div class="resourcebar">${list.map((x,i)=>`<button class="resource ${selected===i?'selected':''}" onclick="pick(${i})">${esc(x[0])}</button>`).join('')}</div>`}
function orderedItems(t){const n=S.meeting,items=media(n,t);if(t==='agenda')return items.slice(0,1);if(t==='analisis'){return [items.find(x=>/analisis-cp\.|analisis cp|cp\/tp|cp tp/i.test(x[0]))||items[0],items.find(x=>/lembar-kerja\.|lembar kerja|\blk\b/i.test(x[0]))||items[1]].map((x,i)=>x||[i?'Lembar Kerja':'Analisis CP/TP','']);}if(t==='modelling'){return Array.from({length:5},(_,i)=>items.find(x=>new RegExp('activity[- ]?'+(i+1)+'(?:\\.|\\b)','i').test(x[0]))||items[i]||['Activity '+(i+1),'']);}return items;}
function twoPane(t){const list=media(S.meeting,t);let left,right;if(t==='analisis'){left=orderedItems(t)[S.selection.analisis||0];right=list.find(x=>/refleksi|gambar-pendukung|pendukung\./i.test(x[0]));return `<div class="split-layout cp-layout"><aside class="side-picture"><h3>Gambar Pendukung</h3><div class="viewer side-viewer">${viewer(right,'Tambahkan gambar-pendukung.jpg atau tautan gambar di links.json')}</div></aside><section class="primary-picture"><div class="resourcebar"><button class="resource ${(S.selection.analisis||0)===0?'selected':''}" onclick="pick(0)">Analisis CP/TP</button><button class="resource ${S.selection.analisis===1?'selected':''}" onclick="pick(1)">Lembar Kerja</button></div><div id="mainViewer" class="viewer">${viewer(left,'Tambahkan file Analisis CP/TP atau Lembar Kerja')}</div></section></div>`}left=list.find(x=>/langkah-2\.|langkah 2/i.test(x[0]))||list[0];right=list.find(x=>/classroom\.|classroom/i.test(x[0]))||list[1];return `<div class="split-layout micro-layout"><section class="primary-picture"><h3>Praktik Pembelajaran</h3><div class="viewer">${viewer(left,'Unggah langkah-2.jpg ke folder pertemuan')}</div></section><aside class="side-picture"><h3>Classroom</h3><div class="viewer side-viewer">${viewer(right,'Unggah classroom.jpg ke folder pertemuan')}</div></aside></div>`}
function mainContent(){const t=S.tab,n=S.meeting;if(t==='analisis'||t==='microteaching')return `<section class="singlepane">${twoPane(t)}</section>`;if(t==='agenda'){const item=orderedItems(t)[0];return `<section class="singlepane"><div id="mainViewer" class="viewer agenda-viewer">${viewer(item,'Unggah agenda.pdf atau agenda.jpg ke folder pertemuan')}</div></section>`}const list=orderedItems('modelling'),chosen=Math.min(S.selection.modelling??5,5),games=media(n,'games'),videos=media(n,'video'),extras=media(n,'extras'),audios=media(n,'audio');return `<div class="modelling-grid"><section class="main-pane"><div class="resourcebar"><button class="resource ${chosen===5?'selected':''}" style="${chosen===5?'background:#e88a16;color:white;':''}" onclick="pick(5)">Classroom English</button>${Array.from({length:5},(_,i)=>`<button class="resource ${chosen===i?'selected':''}" onclick="pick(${i})">Activity ${i+1}</button>`).join('')}</div><div id="mainViewer" class="viewer">${chosen===5?viewer(['Classroom English','https://rahmicourse.github.io/pkgsd-mbi-v2-final/pertemuan-'+n+'/classroom-english.png'],'Unggah classroom-english.png'):viewer(list[chosen],chosen===4?'Tambahkan game Activity 5 melalui links.json':'Unggah activity-'+(chosen+1)+'.jpg atau tambahkan link gambar')}</div>${chosen===4&&games.length?`<div class="gamearea"><h3>Game Activity 5</h3><div class="viewer gameviewer">${viewer(games[0],'Game belum tersedia')}</div></div>`:''}${S.game!==null?`<section id="gameArea" class="gamearea"><div class="paneheading"><h2>Media Interaktif</h2><button class="action light" onclick="showGame(${S.game})">✕ Tutup</button></div><div class="viewer gameviewer">${viewer([...games,...videos][S.game],'Media belum tersedia')}</div></section>`:''}</section><aside class="media-pane"><h3>🎧 Audio Activity</h3>${Array.from({length:4},(_,i)=>{const a=audios[i];return `<div class="audioitem"><b>Audio Activity ${i+1}</b>${a?(/\.(mp3|wav|ogg)(\?|$)/i.test(a[1])?`<audio controls src="${esc(a[1])}"></audio>`:`<a href="${esc(a[1])}" target="_blank" rel="noopener noreferrer">Putar / Buka ↗</a>`):`<span class="small-muted">Belum tersedia</span>`}</div>`}).join('')}<h3>🎮 Game</h3>${games.map((x,i)=>`<button class="medialink" onclick="showGame(${i})">${esc(x[0])} ▼</button>`).join('')||'<p class="small-muted">Belum ada game.</p>'}<h3>🔗 Link Cadangan</h3>${extras.map(x=>`<a class="medialink" href="${esc(x[1])}" target="_blank" rel="noopener noreferrer">${esc(x[0])} ↗</a>`).join('')||'<p class="small-muted">Belum tersedia.</p>'}${videos.map((x,i)=>`<button class="medialink" onclick="showGame(${i+games.length})">${esc(x[0])} ▼</button>`).join('')}</aside></div>`}
function render(){if(!S.meeting)return home();shell(`<div class="v2top"><div class="v2context"><b>Pertemuan ${S.meeting}</b><span>${esc(title(S.meeting))}</span></div><div class="v2nav"><button class="v2navbtn" onclick="home()">⌂ Dashboard</button><button class="v2navbtn" onclick="profile()">👤 Profile</button>${nav.map(([key,label])=>`<button class="v2navbtn ${S.tab===key?'active':''}" onclick="selectTab('${key}')">${label}</button>`).join('')}</div><div class="v2actions"><button class="action light" onclick="window.print()">⎙ Cetak</button><button class="action" onclick="toggleFull()">⛶ Layar Penuh</button></div></div>${mainContent()}`)}
function toggleFull(){if(!document.fullscreenElement){document.documentElement.requestFullscreen?.()}else document.exitFullscreen?.()}
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.game!==null){S.game=null;render()}});
// URL menyimpan pertemuan dan tab agar refresh / Back / Forward tetap pada halaman yang sama.
function setRoute(route){
  const target=route?'#'+route:window.location.pathname+window.location.search;
  const current=route?window.location.hash:window.location.pathname+window.location.search;
  if(current!==target)window.history.pushState(null,'',target);
}
let routeSequence=0;
async function initRoute(){
  const sequence=++routeSequence;
  const match=window.location.hash.match(/^#pertemuan-(\d+)\/(agenda|analisis|modelling|microteaching)$/);
  if(!match||+match[1]<1||+match[1]>H.meetings.length){home();return;}
  const n=+match[1],tab=match[2];
  S.meeting=n;S.tab=tab;S.selection={};S.game=null;
  render();
  if(!CFG[n])await loadMeeting(n);
  if(sequence===routeSequence&&S.meeting===n&&S.tab===tab)render();
}
window.addEventListener('popstate',initRoute);
window.addEventListener('hashchange',initRoute);
initRoute();

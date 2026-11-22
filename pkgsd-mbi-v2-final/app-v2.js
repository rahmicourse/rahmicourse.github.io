const H=window.HUB;
// Setiap pertemuan membaca links.json di foldernya sendiri. Tidak perlu mengubah app-v2.js.
const CFG={};
const fileMap={agenda:['agenda.pdf','agenda.jpg','agenda.png','agenda.mp4'],analisis:['analisis-cp.pdf','analisis-cp.jpg','analisis-cp.png'],modelling:['modelling.pdf','modelling.jpg','modelling.png'],microteaching:['microteaching.pdf','microteaching.jpg','microteaching.png']};
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
      try{const r=await fetch(root+filename,{method:'HEAD',cache:'no-store'});if(r.ok){data[t].unshift([filename,root+filename]);break}}catch(e){}
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
function home(){S.meeting=0;shell(`<section class="v2hero"><div><div class="eyebrow">FACILITATOR HUB · VERSI 2</div><h1>PKGSD-MBI</h1><p>Portal pembelajaran dan presentasi fasilitator</p><p class="muted">Pilih pertemuan untuk membuka Agenda, Analisis CP, Modelling, dan Microteaching.</p></div><div class="heroemoji">📚</div></section><section class="v2home"><h2>Dashboard Pertemuan</h2><div class="meetinggrid">${H.meetings.map(x=>`<button class="meetingtile" onclick="openMeeting(${x.number})"><span class="numb">${x.number}</span><b>Pertemuan ${x.number}</b><small>${esc(title(x.number))}</small></button>`).join('')}</div></section>`)}
async function openMeeting(n){S.meeting=n;S.tab='agenda';S.selection={};S.game=null;render();await loadMeeting(n);if(S.meeting===n)render();window.scrollTo(0,0)}
function selectTab(t){S.tab=t;S.game=null;render()}
function pick(i){S.selection[S.tab]=i;render();const box=$('mainViewer');if(box)box.scrollIntoView({behavior:'smooth',block:'nearest'})}
function showGame(i){S.game=S.game===i?null:i;render();if(S.game!==null)setTimeout(()=>{$('gameArea')?.scrollIntoView({behavior:'smooth',block:'start'})},40)}
function viewer(item,placeholder){if(!item)return `<div class="placeholder"><span>📄</span><h3>${placeholder}</h3><p>Link atau file belum ditambahkan. Unggah file dengan nama standar ke folder pertemuan, atau isi <code>links.json</code>.</p></div>`;let [name,url]=item,src=embed(url);if(!src)return `<div class="placeholder"><span>📁</span><h3>${esc(name)}</h3><p>Format ini tidak mendukung pratinjau langsung.</p><a class="action" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Buka dokumen ↗</a></div>`;if(/\.(png|jpe?g|gif|webp)(\?|$)/i.test(src))return `<img class="content-image" src="${esc(src)}" alt="${esc(name)}">`;if(/\.(mp3|wav|ogg)(\?|$)/i.test(src))return `<div class="audioarea"><h3>${esc(name)}</h3><audio controls src="${esc(src)}"></audio></div>`;if(/\.(mp4|webm)(\?|$)/i.test(src))return `<video class="videoplayer" controls src="${esc(src)}"></video>`;return `<iframe title="${esc(name)}" src="${esc(src)}" loading="lazy" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`}
function resourceLinks(list,selected){return `<div class="resourcebar">${list.map((x,i)=>`<button class="resource ${selected===i?'selected':''}" onclick="pick(${i})">${esc(x[0])}</button>`).join('')}</div>`}
function stageText(){const m=H.meetings[S.meeting-1];if(!m?.stages?.length)return '';return `<details class="stage-details"><summary>📋 Lihat tahapan pelatihan (${m.stages.length} tahap)</summary>${m.stages.map((s,i)=>`<div class="stage"><b>${i+1}. ${esc(s.title)} · ${esc(s.duration)}</b>${s.frames.map(f=>`<p>${esc(f.title)} — ${esc(f.desc)}</p>`).join('')}</div>`).join('')}</details>`}
function mainContent(){let t=S.tab,n=S.meeting,list=media(n,t),chosen=Math.min(S.selection[t]||0,Math.max(0,list.length-1));if(t==='modelling')return `<div class="modelling-grid"><section class="main-pane"><div class="paneheading"><h2>Materi Utama</h2><span>PDF · Slide · Video</span></div>${list.length?resourceLinks(list,chosen):''}<div id="mainViewer" class="viewer">${viewer(list[chosen],'Materi modelling belum ditambahkan')}</div>${S.game!==null?`<section id="gameArea" class="gamearea"><div class="paneheading"><h2>🎮 Game / Video Interaktif</h2><button class="action light" onclick="showGame(${S.game})">✕ Tutup Game</button></div><div class="viewer gameviewer">${viewer([...media(n,'games'),...media(n,'video')][S.game],'Media belum tersedia')}</div></section>`:''}</section><aside class="media-pane"><h3>🎧 Media Pendukung</h3>${media(n,'audio').map(([label,url])=>`<div class="audioitem"><b>${esc(label)}</b>${/\.(mp3|wav|ogg)(\?|$)/i.test(url)?`<audio controls src="${esc(url)}"></audio>`:`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Buka ↗</a>`}</div>`).join('')||'<p class="small-muted">Audio belum ditambahkan.</p>'}<h3>🎬 Video</h3>${media(n,'video').map(([label,url],i)=>`<button class="medialink" onclick="showGame(${i+media(n,'games').length})">${esc(label)} ▼</button>`).join('')||'<p class="small-muted">Belum ada video.</p>'}<h3>🎮 Game</h3>${media(n,'games').map((x,i)=>`<button class="medialink ${S.game===i?'selected':''}" onclick="showGame(${i})">${esc(x[0])} ${S.game===i?'▲':'▼'}</button>`).join('')||'<p class="small-muted">Tambahkan link game di links.json pertemuan.</p>'}<h3>🔗 Link Lain</h3>${media(n,'extras').map(x=>`<a class="medialink" href="${esc(x[1])}" target="_blank" rel="noopener noreferrer">${esc(x[0])} ↗</a>`).join('')||'<p class="small-muted">Belum ada link.</p>'}</aside></div>`;
return `<section class="singlepane"><div class="paneheading"><h2>${nav.find(x=>x[0]===t)[1]} — Pertemuan ${n}</h2><span>Pratinjau di dalam website</span></div>${list.length?resourceLinks(list,chosen):''}<div id="mainViewer" class="viewer">${viewer(list[chosen],t==='agenda'?'Agenda belum ditambahkan':t==='analisis'?'Materi Analisis CP belum ditambahkan':'Panduan Microteaching belum ditambahkan')}</div>${stageText()}</section>`}
function render(){if(!S.meeting)return home();shell(`<div class="v2top"><div class="v2context"><b>Pertemuan ${S.meeting}</b><span>${esc(title(S.meeting))}</span></div><div class="v2nav"><button class="v2navbtn" onclick="home()">⌂ Dashboard</button>${nav.map(([key,label])=>`<button class="v2navbtn ${S.tab===key?'active':''}" onclick="selectTab('${key}')">${label}</button>`).join('')}</div><div class="v2actions"><button class="action light" onclick="window.print()">⎙ Cetak</button><button class="action" onclick="toggleFull()">⛶ PID</button></div></div>${mainContent()}`)}
function toggleFull(){if(!document.fullscreenElement){document.documentElement.requestFullscreen?.()}else document.exitFullscreen?.()}
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.game!==null){S.game=null;render()}});
home();

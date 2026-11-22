// Edit daftar ini untuk mengisi file dan aktivitas Pertemuan 2–10.
window.HUB = {
 programFiles:[{label:'Kebijakan Program',path:'files/kebijakan/kebijakan.pdf',kind:'pdf'},{label:'Silabus',path:'files/silabus/silabus.pdf',kind:'pdf'}],
 meetings:Array.from({length:10},(_,i)=>({number:i+1,title:i===0?'Greetings and Partings':'Materi belum ditetapkan',stages:i===0?[
 {title:'Analisis Capaian dan Alur Pembelajaran',duration:'20 menit',frames:[
 {title:'Mengaitkan Ruang GTK dan Pengalaman',desc:'Diskusi pengalaman peserta setelah belajar mandiri di Ruang GTK.',question:'Bagaimana Bapak/Ibu biasanya menyapa murid saat memasuki kelas?',material:'agenda'},
 {title:'Listen and Respond',desc:'Putar dialog tanpa teks. Jempol untuk greeting, lambaian untuk parting.',question:'What greetings and partings did you hear?',material:'audio'},
 {title:'Memahami CP dan TP',desc:'Identifikasi kata kerja CP: memahami dan merespons. Tunjukkan contoh TP dari RPP.',question:'Apa kemampuan yang harus ditunjukkan murid?',material:'rpp'},
 {title:'Empat Kunci Analisis TP',desc:'Kompetensi = bisa apa? Cakupan = bagian mana? Keterukuran = apa buktinya? Konteks = dalam situasi apa?',question:'Bagaimana membuktikan murid mampu membedakan greeting dan parting?',material:'materi'},
 {title:'Comic Strip dan Keselarasan',desc:'Cocokkan CP, TP, indikator, kegiatan, dan bukti belajar menggunakan gambar situasi.',question:'Apakah aktivitas ini menghasilkan bukti yang sesuai TP?',material:'gambar'},
 {title:'LK 1: Matriks Keselarasan',desc:'Salin CP dari RPP, pilih satu TP, lalu analisis kompetensi, cakupan, keterukuran, dan konteks.',question:'Bukti dari RPP mana yang mendukung alasan kelompok?',material:'lk'}]},
 {title:'Modelling',duration:'50 menit',frames:[{title:'Demonstrasi Greetings and Partings',desc:'Fasilitator memodelkan aktivitas sesuai RPTM dan bahan resmi.',material:'materi'},{title:'Mengamati Praktik dan Bukti Belajar',desc:'Peserta mengamati strategi, dukungan bertahap, dan asesmen selama modelling.',material:'rptm'}]},
 {title:'Praktik Pembelajaran',duration:'110 menit',frames:[{title:'Persiapan Praktik',desc:'Peserta menyiapkan media dan aktivitas praktik pembelajaran.',material:'rptm'},{title:'Praktik dan Umpan Balik',desc:'Laksanakan praktik pembelajaran dan berikan umpan balik sesuai RPTM.',material:'rubrik'},{title:'Refleksi dan Penutup',desc:'Refleksi pengalaman, tindak lanjut, dan salam perpisahan.',material:'agenda'}]}
 ]:[]})),
 files:{rptm:n=>`files/rptm/rptm-${n}.pdf`,rpp:n=>`files/rpp/rpp-${n}.docx`,lk:n=>`files/lk/lk-${n}.docx`,rubrik:n=>`files/rubrik/rubrik-${n}.docx`,audio:n=>`files/audio/audio-${n}.mp3`,gambar:n=>`files/gambar/gambar-${n}.png`}
};

/* AGENDA PERTEMUAN 2 — MY SELF */
window.HUB.meetings[1].title = "My Self";

window.HUB.meetings[1].stages = [
  {
    title: "Analisis CP dan Alur Pembelajaran",
    duration: "20 menit",
    frames: [
      {
        title: "Analisis CP dan Alur Pembelajaran",
        desc: "13.00–13.20 | Menghubungkan pembelajaran mandiri Ruang GTK, mengamati stimulus, mendiskusikan CP–TP, dan mengerjakan LK 2.",
        material: "lk"
      }
    ]
  },
  {
    title: "Modelling",
    duration: "50 menit",
    frames: [
      {
        title: "Pembelajaran My Self",
        desc: "13.20–14.10 | Fasilitator memperagakan pembelajaran Alphabet, Self-Introduction, Numbers and Age sesuai urutan RPTM.",
        material: "materi"
      }
    ]
  },
  {
    title: "Praktik Pembelajaran",
    duration: "110 menit",
    frames: [
      {
        title: "Persiapan Praktik",
        desc: "14.10–16.00 | Peserta menyiapkan media, kegiatan, dan pembagian peran.",
        material: "rptm"
      },
      {
        title: "Microteaching",
        desc: "Peserta melaksanakan praktik mengajar secara berkelompok sesuai petunjuk RPTM.",
        material: "materi"
      },
      {
        title: "Peer Feedback",
        desc: "Peserta mengamati praktik dan memberikan catatan perbaikan.",
        material: "rubrik"
      },
      {
        title: "Refleksi",
        desc: "Peserta merefleksikan praktik dan menyusun tindak lanjut.",
        material: "agenda"
      }
    ]
  }
];

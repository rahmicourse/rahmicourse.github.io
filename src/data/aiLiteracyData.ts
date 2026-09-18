export interface AiCardInfo {
  id: string;
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
  description: string;
  points: Array<{
    title: string;
    desc: string;
    icon?: string;
  }>;
  tips?: string;
}

export const AI_LITERACY_CARDS: AiCardInfo[] = [
  {
    id: 'what-is-ai',
    icon: '🤖',
    badge: 'Konsep Dasar',
    title: 'Apa itu AI?',
    subtitle: 'Kecerdasan Buatan (Artificial Intelligence)',
    color: 'blue',
    description:
      'AI (Artificial Intelligence) adalah teknologi komputer canggih yang dilatih menggunakan data berjumlah besar agar dapat mengenali pola bahasa, menjawab pertanyaan, dan membantu menyelesaikan tugas.',
    points: [
      {
        title: 'Pengenal Pola Bahasa',
        desc: 'AI membaca jutaan kalimat bahasa Inggris untuk memahami tata bahasa (grammar), kosakata baru, dan susunan kalimat.',
      },
      {
        title: 'Asisten Belajar Digital',
        desc: 'Bayangkan AI seperti asisten perpustakaan kilat yang siap memberikan contoh dialog dan ide saat kamu berlatih speaking.',
      },
      {
        title: 'Bukan Manusia Sungguhan',
        desc: 'AI tidak memiliki perasaan, kesadaran, ataupun pengalaman hidup nyata. AI bekerja berdasarkan perhitungan algoritma statistik!',
      },
    ],
    tips: '💡 Tips Siswa Kelas 7: Jadikan AI sebagai teman belajar interaktif, namun otak dan usahamu sendirilah yang membuatmu benar-benar pintar!',
  },
  {
    id: 'benefits',
    icon: '✅',
    badge: 'Manfaat Positif',
    title: 'Manfaat Positif AI',
    subtitle: 'Membantu Siswa Belajar Lebih Cepat & Menyenangkan',
    color: 'green',
    description:
      'Jika digunakan secara tepat dan jujur, AI mempermudah siswa SMP menguasai bahasa Inggris serta teknologi modern di era digital Nusantara.',
    points: [
      {
        title: 'Penjelasan Instan 24 Jam',
        desc: 'Dapatkan penjelasan arti kata sulit, rumus tata bahasa (seperti penggunaan am/is/are), dan contoh kalimat kapan saja.',
      },
      {
        title: 'Latihan Percakapan Tanpa Takut',
        desc: 'Kamu bisa bebas berlatih mengetik dan bercakap-cakap dalam bahasa Inggris tanpa rasa malu jika membuat kesalahan pengucapan.',
      },
      {
        title: 'Eksplorasi Wawasan Luas',
        desc: 'Cari tahu informasi menarik tentang budaya daerah, keanekaragaman Nusantara, maupun pengetahuan dunia dengan cepat.',
      },
    ],
    tips: '💡 Coba Praktikkan: Tanyakan ke AI: "Bisakah kamu jelaskan perbedaan have dan has dengan contoh kalimat untuk siswa kelas 7?"',
  },
  {
    id: 'avoid-these',
    icon: '⚠️',
    badge: 'Waspada & Hindari',
    title: 'Hal yang Harus Dihindari',
    subtitle: 'Etika & Keamanan Privasi Siswa',
    color: 'orange',
    description:
      'Jaga selalu keamanan data pribadi dan kejujuran akademikmu. Ada aturan penting yang wajib dipatuhi siswa SMP saat berselancar dengan AI.',
    points: [
      {
        title: 'Jangan Bagikan Data Pribadi',
        desc: 'JANGAN PERNAH mengetikkan alamat rumah, nomor HP, kata sandi, nama lengkap keluarga, atau foto pribadi ke dalam aplikasi AI.',
      },
      {
        title: 'Jangan Mencontek Tanpa Berpikir',
        desc: 'Jangan asal salin-tempel (copy-paste) jawaban PR dari AI tanpa memahaminya. Mencontek mentah-mentah membuat otak berhenti belajar!',
      },
      {
        title: 'AI Bisa Salah & Tidak Nyambung',
        desc: 'AI bisa mengalami "halusinasi" atau memberikan jawaban keliru dan ngawur. Selalu verifikasi kebenaran informasi dengan buku sekolah atau guru!',
      },
    ],
    tips: '⚠️ Aturan Keamanan: Jika kamu ragu terhadap jawaban atau keamanan aplikasi digital, selalu konsultasikan dengan guru atau orang tua.',
  },
  {
    id: 'use-wisely',
    icon: '💡',
    badge: 'Panduan Bijak',
    title: 'Gunakan AI Secara Bijak',
    subtitle: 'Menjadi Pelajar Cerdas & Beretika di Nusantara',
    color: 'blue',
    description:
      'Jadilah generasi muda Indonesia yang berdaya saing global dengan memanfaatkan teknologi kecerdasan buatan secara bertanggung jawab.',
    points: [
      {
        title: 'Buat Perintah (Prompt) yang Jelas',
        desc: 'Berikan instruksi spesifik kepada AI, contohnya: "Buatkan dialog perkenalan diri bahasa Inggris 2 orang untuk anak SMP kelas 7."',
      },
      {
        title: 'Verifikasi & Cek Fakta',
        desc: 'Selalu bandingkan jawaban AI dengan kamus resmi, buku paket Bahasa Inggris SMP, atau materi yang diajarkan bapak/ibu guru.',
      },
      {
        title: 'Utamakan Kreativitas Sendiri',
        desc: 'Gunakan AI untuk memancing inspirasi, lalu kembangkan kalimat serta tugas menggunakan gaya bahasa dan usahamu sendiri.',
      },
    ],
    tips: '💡 Banggalah dengan hasil karyamu sendiri! Teknologi hadir untuk melipatgandakan prestasimu, bukan menggantikan proses belajarmu.',
  },
];

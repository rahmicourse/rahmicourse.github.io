import { LearnExpression } from '../types';

export const LEARN_TOPICS: LearnExpression[] = [
  {
    id: 'name',
    topic: 'Name (Nama)',
    topicId: 'Nama',
    icon: '👤',
    expressions: [
      { en: 'My name is Rina.', idMeaning: 'Nama saya Rina.' },
      { en: "I'm Rina.", idMeaning: 'Saya Rina.' },
      { en: 'You can call me Rina.', idMeaning: 'Kamu bisa memanggilku Rina.' },
    ],
    questions: [
      { en: 'What is your name?', idMeaning: 'Siapa nama kamu?' },
      { en: 'What should I call you?', idMeaning: 'Bagaimana saya memanggilmu?' },
    ],
    explanationId:
      'Untuk menyebutkan nama, kamu bisa menggunakan pola "My name is [Nama]" atau disingkat "I\'m [Nama]". Dalam perkenalan santai, keduanya sangat umum digunakan.',
    grammarTip: '💡 "I am" sering disingkat menjadi "I\'m". "My" adalah kata ganti kepemilikan (possessive adjective).',
    dialogue: {
      speakerA: 'Hi, what is your name?',
      textA: 'Hi! What is your name?',
      speakerB: 'Hello! My name is Rina. Nice to meet you!',
      textB: 'Hello! My name is Rina. Nice to meet you!',
    },
    quickPractice: {
      prompt: 'Lengkapi kalimat: "Hello, _____ name is Edo."',
      options: ['my', 'me', 'I', 'mine'],
      correctAnswer: 'my',
      explanation: 'Gunakan "my" di depan kata benda "name" untuk menunjukkan kepemilikan (Nama saya).',
    },
  },
  {
    id: 'origin',
    topic: 'Origin (Asal Daerah/Negara)',
    topicId: 'Asal Daerah',
    icon: '🌍',
    expressions: [
      { en: "I'm from Bandung.", idMeaning: 'Saya berasal dari Bandung.' },
      { en: 'I come from Indonesia.', idMeaning: 'Saya berasal dari Indonesia.' },
    ],
    questions: [
      { en: 'Where are you from?', idMeaning: 'Dari mana kamu berasal?' },
      { en: 'Where do you come from?', idMeaning: 'Dari mana asalmu?' },
    ],
    explanationId:
      'Untuk menyatakan asal tempat tinggal atau daerah asal, gunakan "I am from..." atau "I come from...". Perhatikan: jangan menggabungkan "am" dan "come" menjadi "I am come from" (itu salah).',
    grammarTip: '💡 Benar: "I am from Bandung" atau "I come from Bandung". Salah: "I am come from Bandung".',
    dialogue: {
      speakerA: 'Where are you from, Bayu?',
      textA: 'Where are you from, Bayu?',
      speakerB: "I'm from Surabaya, East Java.",
      textB: "I'm from Surabaya, East Java.",
    },
    quickPractice: {
      prompt: 'Pilihlah kalimat yang BENAR:',
      options: [
        "I'm from Bali.",
        "I am come from Bali.",
        "I from Bali.",
        "I coming Bali."
      ],
      correctAnswer: "I'm from Bali.",
      explanation: 'Gunakan pola "I\'m from [kota/negara]" atau "I come from [kota/negara]".',
    },
  },
  {
    id: 'age',
    topic: 'Age (Usia / Umur)',
    topicId: 'Usia',
    icon: '🎂',
    expressions: [
      { en: "I'm thirteen years old.", idMeaning: 'Saya berumur tiga belas tahun.' },
      { en: 'I am 12 years old.', idMeaning: 'Saya berumur 12 tahun.' },
    ],
    questions: [
      { en: 'How old are you?', idMeaning: 'Berapa usiamu?' },
    ],
    explanationId:
      'Untuk menanyakan umur, kita gunakan kata tanya "How old are you?". Untuk menjawabnya, gunakan pola "I am [angka] years old" atau cukup "I am [angka]".',
    grammarTip: '💡 Jika usia lebih dari 1 tahun, gunakan kata jamak "years" (dengan akhiran -s). Contoh: 13 years old.',
    dialogue: {
      speakerA: 'How old are you, Siti?',
      textA: 'How old are you, Siti?',
      speakerB: "I'm thirteen years old.",
      textB: "I'm thirteen years old.",
    },
    quickPractice: {
      prompt: 'Lengkapi kalimat: "How _____ are you?" - "I am 13 years old."',
      options: ['old', 'age', 'many', 'much'],
      correctAnswer: 'old',
      explanation: '"How old" adalah pertanyaan standar dalam bahasa Inggris untuk menanyakan usia seseorang.',
    },
  },
  {
    id: 'school',
    topic: 'School (Sekolah)',
    topicId: 'Sekolah',
    icon: '🏫',
    expressions: [
      { en: 'I study at SMP Harapan.', idMeaning: 'Saya belajar di SMP Harapan.' },
      { en: "I'm a student at SMP Nusantara.", idMeaning: 'Saya siswa di SMP Nusantara.' },
      { en: "I'm in Grade 7.", idMeaning: 'Saya kelas 7.' },
    ],
    questions: [
      { en: 'Where do you study?', idMeaning: 'Di mana kamu bersekolah?' },
      { en: 'What grade are you in?', idMeaning: 'Kamu kelas berapa?' },
    ],
    explanationId:
      'Gunakan preposisi "at" di depan nama sekolah: "I study at SMP 1". Untuk tingkatan kelas, gunakan "I am in Grade 7" (atau 7th Grade).',
    grammarTip: '💡 Preposisi tempat: "at" digunakan untuk nama institusi/sekolah khusus (at SMP Harapan).',
    dialogue: {
      speakerA: 'Where do you study?',
      textA: 'Where do you study?',
      speakerB: 'I study at SMP Harapan. I am in Grade 7.',
      textB: 'I study at SMP Harapan. I am in Grade 7.',
    },
    quickPractice: {
      prompt: 'Susun kata: "study / at / I / SMP Bintang"',
      options: [
        'I study at SMP Bintang',
        'I at study SMP Bintang',
        'Study I at SMP Bintang',
        'SMP Bintang I study at'
      ],
      correctAnswer: 'I study at SMP Bintang',
      explanation: 'Pola kalimat: Subject (I) + Verb (study) + Preposition (at) + Place (SMP Bintang).',
    },
  },
  {
    id: 'address',
    topic: 'Address (Alamat - Contoh Fiksi)',
    topicId: 'Alamat (Fiktif)',
    icon: '🏡',
    expressions: [
      { en: 'I live in Bandung.', idMeaning: 'Saya tinggal di Bandung (Kota).' },
      { en: 'I live on Jl. Merdeka No. 10.', idMeaning: 'Saya tinggal di Jl. Merdeka No. 10 (Jalan).' },
    ],
    questions: [
      { en: 'Where do you live?', idMeaning: 'Di mana kamu tinggal?' },
    ],
    explanationId:
      'Aturan Privasi: Jangan pernah membagikan alamat rumah aslimu secara online! Dalam latihan ini, gunakan contoh jalan fiksi seperti "Jl. Mawar No. 5". Perhatikan beda "in" (untuk kota/negara) dan "on" (untuk nama jalan).',
    grammarTip: '💡 "in" untuk kota (in Surabaya, in Jakarta) | "on" untuk nama jalan (on Jl. Sudirman).',
    dialogue: {
      speakerA: 'Where do you live?',
      textA: 'Where do you live?',
      speakerB: 'I live in Bandung, on Jl. Melati.',
      textB: 'I live in Bandung, on Jl. Melati.',
    },
    quickPractice: {
      prompt: 'Lengkapi: "I live _____ Jakarta."',
      options: ['in', 'on', 'at', 'to'],
      correctAnswer: 'in',
      explanation: 'Gunakan preposisi "in" sebelum nama kota atau negara besar.',
    },
  },
  {
    id: 'family',
    topic: 'Family (Keluarga)',
    topicId: 'Keluarga',
    icon: '👨‍👩‍👧‍👦',
    expressions: [
      { en: 'There are four people in my family.', idMeaning: 'Ada empat orang di dalam keluarga saya.' },
      { en: 'I have one brother and one sister.', idMeaning: 'Saya punya satu saudara laki-laki dan satu saudara perempuan.' },
      { en: "I'm an only child.", idMeaning: 'Saya anak tunggal.' },
    ],
    questions: [
      { en: 'How many people are there in your family?', idMeaning: 'Berapa banyak orang di keluargamu?' },
      { en: 'Do you have any brothers or sisters?', idMeaning: 'Apakah kamu punya saudara laki-laki atau perempuan?' },
    ],
    explanationId:
      'Gunakan frasa "There is..." untuk 1 orang (singular), dan "There are..." untuk lebih dari 1 orang (plural). Contoh: "There are 4 people in my family".',
    grammarTip: '💡 "People" adalah bentuk jamak dari "person". Jadi gunakan "There are four people", bukan "four persons".',
    dialogue: {
      speakerA: 'How many people are there in your family?',
      textA: 'How many people are there in your family?',
      speakerB: 'There are five people: my father, mother, two sisters, and me.',
      textB: 'There are five people: my father, mother, two sisters, and me.',
    },
    quickPractice: {
      prompt: 'Lengkapi: "There _____ four people in my family."',
      options: ['are', 'is', 'am', 'be'],
      correctAnswer: 'are',
      explanation: 'Karena "four people" adalah jamak (plural/lebih dari satu), gunakan "are".',
    },
  },
  {
    id: 'hobbies',
    topic: 'Hobbies (Kegemaran / Hobi)',
    topicId: 'Hobi',
    icon: '🎨',
    expressions: [
      { en: 'My hobby is playing badminton.', idMeaning: 'Hobi saya adalah bermain bulu tangkis.' },
      { en: 'I like reading books.', idMeaning: 'Saya suka membaca buku.' },
      { en: 'My hobbies are swimming and cycling.', idMeaning: 'Hobi saya adalah berenang dan bersepeda.' },
    ],
    questions: [
      { en: 'What is your hobby?', idMeaning: 'Apa hobimu?' },
      { en: 'What do you like to do in your free time?', idMeaning: 'Apa yang suka kamu lakukan di waktu luang?' },
    ],
    explanationId:
      'Jika hobimu hanya 1, gunakan "My hobby is [Verb-ing]". Jika hobimu lebih dari 1, gunakan "My hobbies are [Verb-ing] and [Verb-ing]". Kamu juga bisa berkata "I like [Verb-ing]".',
    grammarTip: '💡 Setelah kata "like" atau "hobby is", kata kerja biasanya berakhiran -ing (Gerund), contoh: playing, reading, drawing.',
    dialogue: {
      speakerA: 'What is your hobby?',
      textA: 'What is your hobby?',
      speakerB: 'My hobby is playing badminton. I also like drawing!',
      textB: 'My hobby is playing badminton. I also like drawing!',
    },
    quickPractice: {
      prompt: 'Pilihlah kalimat yang BENAR:',
      options: [
        'My hobby is reading books.',
        'My hobby is read books.',
        'My hobbies is reading.',
        'I likes reading books.'
      ],
      correctAnswer: 'My hobby is reading books.',
      explanation: 'Gunakan bentuk Verb-ing setelah "My hobby is" (reading books).',
    },
  },
  {
    id: 'subject',
    topic: 'Favorite Subject (Mata Pelajaran Favorit)',
    topicId: 'Pelajaran Favorit',
    icon: '📚',
    expressions: [
      { en: 'My favorite subject is English.', idMeaning: 'Mata pelajaran favorit saya adalah bahasa Inggris.' },
      { en: 'I really like Science and Math.', idMeaning: 'Saya sangat menyukai IPA dan Matematika.' },
    ],
    questions: [
      { en: 'What is your favorite subject?', idMeaning: 'Apa mata pelajaran favoritmu?' },
    ],
    explanationId:
      'Gunakan pola "My favorite subject is [Nama Pelajaran]". Contoh nama mata pelajaran: English (B. Inggris), Math (Matematika), Science (IPA), Social Studies (IPS), Art (Seni Budaya), Physical Education/PE (PJOK).',
    grammarTip: '💡 Huruf kapital: Nama bahasa dan mata pelajaran tertentu diawali huruf kapital (English, Indonesian, Science).',
    dialogue: {
      speakerA: 'What is your favorite subject in Grade 7?',
      textA: 'What is your favorite subject in Grade 7?',
      speakerB: 'My favorite subject is English because it is very fun!',
      textB: 'My favorite subject is English because it is very fun!',
    },
    quickPractice: {
      prompt: 'Lengkapi: "My favorite _____ is English."',
      options: ['subject', 'hobby', 'age', 'school'],
      correctAnswer: 'subject',
      explanation: '"Subject" artinya mata pelajaran di sekolah.',
    },
  },
];

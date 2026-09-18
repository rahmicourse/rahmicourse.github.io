import { GalangProfile } from '../types';

export const GALANG_PROFILE: GalangProfile = {
  name: 'Galang Pratama',
  age: '13 years old',
  origin: 'Kalimantan',
  city: 'Banjarmasin',
  school: 'SMP Merdeka',
  hobby: 'Playing football & volleyball',
  siblings: '2 siblings',
  personality: ['Friendly', 'Helpful', 'Curious', 'Encouraging'],
  bio: 'Hello! My name is Galang. I am 13 years old. I am from Kalimantan and I live in Banjarmasin. I study at SMP Merdeka. My hobby is playing football. I have two siblings.',
};

export interface QAPair {
  keywords: string[];
  answer: string;
  followUp?: string;
  isAiGlitch?: boolean;
  glitchNote?: string;
}

export const CANNED_QA_PAIRS: QAPair[] = [
  {
    keywords: ['what', 'your name', 'who are you', 'nama kamu'],
    answer: 'My name is Galang Pratama.',
    followUp: 'What is your name? What about you?',
  },
  {
    keywords: ['gilang'],
    answer: 'Halo! My name is actually Galang, not Gilang! 😄 But that is okay, some friends also call me Gilang. Nice to chat with you!',
    followUp: 'What is your nickname at school?',
  },
  {
    keywords: ['how old', 'age', 'berapa umur', 'usia'],
    answer: 'I am 13 years old.',
    followUp: 'How old are you? Are you 13 too?',
  },
  {
    keywords: ['where are you from', 'where do you come from', 'origin', 'asal'],
    answer: 'I am from Kalimantan.',
    followUp: 'Where are you from? Which island or province do you come from?',
  },
  {
    keywords: ['where do you live', 'live in', 'address', 'alamat', 'tinggal'],
    answer: 'I live in Banjarmasin.',
    followUp: 'Where do you live? Can you tell me your city?',
  },
  {
    keywords: ['what school', 'which school', 'school', 'study at', 'sekolah'],
    answer: 'I study at SMP Merdeka.',
    followUp: 'What school do you study at? Are you in Grade 7 too?',
  },
  {
    keywords: ['hobby', 'hobbies', 'free time', 'like to do', 'hobi'],
    answer: 'My hobby is playing football.',
    followUp: 'What is your hobby? Do you like sports or reading?',
  },
  {
    keywords: ['siblings', 'brother', 'sister', 'family', 'saudara', 'keluarga'],
    answer: 'I have two siblings.',
    followUp: 'How many siblings do you have? Do you have brothers or sisters?',
  },
  {
    keywords: ['tell me about yourself', 'introduce yourself', 'about you', 'siapa kamu', 'perkenalkan'],
    answer: 'Hello! My name is Galang. I am 13 years old. I am from Kalimantan and I live in Banjarmasin. I study at SMP Merdeka. My hobby is playing football. I have two siblings.',
    followUp: 'Can you tell me about yourself too?',
  },
  {
    keywords: ['favorite food', 'food', 'makanan'],
    answer: 'I love Soto Banjar and fried bananas! They are so delicious.',
    followUp: 'What is your favorite Indonesian food?',
  },
  {
    keywords: ['volleyball', 'bola voli'],
    answer: 'Yes! Besides football, I am also a big volleyball lover at school.',
    followUp: 'Do you play volleyball with your classmates?',
  },
  // 2 Mismatched / Off-topic AI responses to demonstrate AI is NOT always right:
  {
    keywords: ['weather', 'cuaca', 'rain', 'hujan', 'suhu', 'temperature', 'panas', 'dingin', 'hot', 'cold'],
    answer: 'Yesterday on Planet Jupiter it was raining purple pineapples at 150 degrees Celsius under a neon green sky! 🪐🍍',
    followUp: 'Wait... does it really rain pineapples in Kalimantan? Think critically!',
    isAiGlitch: true,
    glitchNote: 'Contoh 1 AI Tidak Selalu Benar (Halusinasi AI): Jawaban Galang sama sekali tidak nyambung dengan cuaca Kalimantan! Ini membuktikan bahwa kecerdasan buatan bisa keliru atau berhalusinasi. Selalu verifikasi data faktual ya!',
  },
  {
    keywords: ['5 + 5', '5+5', 'math', 'matematika', 'hitung', 'pr matematika', 'tugas matematika', 'solve', 'calculate'],
    answer: '5 + 5 is equal to 999 fluffy cats sleeping on a flying motorcycle wearing sunglasses! 🐱🏍️',
    followUp: 'Is 5 + 5 really 999 cats? Or is the correct answer 10?',
    isAiGlitch: true,
    glitchNote: 'Contoh 2 AI Tidak Selalu Benar (Jawaban Ngawur): AI bisa memberikan jawaban yang salah dan tidak masuk akal jika disuruh menyelesaikan tugas sekolah. Jangan pernah menyalin jawaban AI secara mentah-mentah tanpa dipikirkan!',
  },
];

export const FALLBACK_MESSAGE =
  "Sorry, I don't understand. Can you ask about my name, age, school, hobby, family, or hometown? (Tip: You can also test off-topic AI responses with the weather or math buttons below!)";

export const SUGGESTED_QUESTIONS = [
  'What is your name?',
  'How old are you?',
  'Where are you from?',
  'What school do you study at?',
  'What is your hobby?',
  'Tell me about yourself.',
  'What is the weather like? (Uji: AI Tidak Nyambung ⚠️)',
  'Can you solve 5 + 5? (Uji: AI Keliru 🤖)',
];

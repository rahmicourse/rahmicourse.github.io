import { VocabMatchPair, UnscrambleWord, SentenceBuilderItem } from '../types';

export const VOCAB_PAIRS: VocabMatchPair[] = [
  { id: '1', english: 'Teacher', indonesian: 'Guru', category: 'School' },
  { id: '2', english: 'Student', indonesian: 'Siswa', category: 'School' },
  { id: '3', english: 'Family', indonesian: 'Keluarga', category: 'General' },
  { id: '4', english: 'School', indonesian: 'Sekolah', category: 'School' },
  { id: '5', english: 'Hobby', indonesian: 'Hobi / Kegemaran', category: 'Interests' },
  { id: '6', english: 'Origin', indonesian: 'Asal Daerah', category: 'Identity' },
  { id: '7', english: 'Siblings', indonesian: 'Saudara Kandung', category: 'Family' },
  { id: '8', english: 'Classmate', indonesian: 'Teman Sekelas', category: 'School' },
];

export const UNSCRAMBLE_WORDS: UnscrambleWord[] = [
  {
    id: 'u1',
    scrambled: 'MLYAFI',
    correct: 'FAMILY',
    hint: 'A group of people related by blood (parents, children).',
    indonesianHint: 'Keluarga tercinta',
  },
  {
    id: 'u2',
    scrambled: 'LOBHOY',
    correct: 'HOBBY',
    hint: 'An activity done regularly in one’s leisure time for pleasure.',
    indonesianHint: 'Kegemaran / kesukaan',
  },
  {
    id: 'u3',
    scrambled: 'HCSOOL',
    correct: 'SCHOOL',
    hint: 'An institution for educating children like SMP Merdeka.',
    indonesianHint: 'Tempat belajar siswa',
  },
  {
    id: 'u4',
    scrambled: 'ROIGNI',
    correct: 'ORIGIN',
    hint: 'The point or place where something begins or comes from.',
    indonesianHint: 'Asal usul tempat',
  },
  {
    id: 'u5',
    scrambled: 'ETCAHR',
    correct: 'TEACHER',
    hint: 'A person who teaches in a school or classroom.',
    indonesianHint: 'Bapak atau Ibu guru',
  },
  {
    id: 'u6',
    scrambled: 'TSUDNET',
    correct: 'STUDENT',
    hint: 'A person who is studying at a school.',
    indonesianHint: 'Murid atau pelajar',
  },
];

export const SENTENCE_BUILDER_ITEMS: SentenceBuilderItem[] = [
  {
    id: 's1',
    scrambledTokens: ['am', 'I', '13', 'years', 'old.'],
    correctSentence: 'I am 13 years old.',
    translation: 'Saya berumur 13 tahun.',
  },
  {
    id: 's2',
    scrambledTokens: ['name', 'is', 'My', 'Galang.'],
    correctSentence: 'My name is Galang.',
    translation: 'Nama saya adalah Galang.',
  },
  {
    id: 's3',
    scrambledTokens: ['live', 'in', 'I', 'Banjarmasin.'],
    correctSentence: 'I live in Banjarmasin.',
    translation: 'Saya tinggal di Banjarmasin.',
  },
  {
    id: 's4',
    scrambledTokens: ['study', 'at', 'I', 'SMP', 'Merdeka.'],
    correctSentence: 'I study at SMP Merdeka.',
    translation: 'Saya bersekolah di SMP Merdeka.',
  },
  {
    id: 's5',
    scrambledTokens: ['have', 'two', 'I', 'siblings.'],
    correctSentence: 'I have two siblings.',
    translation: 'Saya mempunyai dua saudara kandung.',
  },
  {
    id: 's6',
    scrambledTokens: ['hobby', 'is', 'My', 'playing', 'football.'],
    correctSentence: 'My hobby is playing football.',
    translation: 'Hobi saya adalah bermain sepak bola.',
  },
];

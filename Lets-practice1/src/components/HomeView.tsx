import React from 'react';
import { BookOpen, MessageCircle, Puzzle, PenTool, Award, Sparkles, ArrowRight, CheckCircle2, User, Globe, GraduationCap, MapPin, Heart, BookHeart, Compass, HelpCircle } from 'lucide-react';
import { AppMode } from '../types';
import { PrivacyBanner } from './PrivacyBanner';

interface HomeViewProps {
  onSelectMode: (mode: AppMode) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectMode }) => {
  const mainButtons = [
    {
      id: 'learn' as AppMode,
      title: 'Learn',
      titleEn: '📚 Learn',
      subtitle: 'Pelajari ungkapan perkenalan, rumus kalimat, & contoh percakapan.',
      badge: 'Materi Lengkap',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100/70 border-blue-200/80 text-blue-900',
      iconBg: 'bg-blue-600 text-white',
      accentColor: 'text-blue-600',
      topicsCount: '8 Topik Penting',
    },
    {
      id: 'conversation' as AppMode,
      title: 'Conversation Practice',
      titleEn: '💬 Conversation Practice',
      subtitle: 'Latihan ngobrol langsung dengan AI Tutor (Alex) siswa baru SMP!',
      badge: 'AI Powered 🤖',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100/70 border-purple-200/80 text-purple-900',
      iconBg: 'bg-purple-600 text-white',
      accentColor: 'text-purple-600',
      topicsCount: 'Interaktif & Umpan Balik',
    },
    {
      id: 'vocabulary' as AppMode,
      title: 'Vocabulary',
      titleEn: '🧩 Vocabulary',
      subtitle: 'Kuasai 10 kosakata penting perkenalan dengan flashcard & mini game.',
      badge: '10 Kosakata & Game',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200/80 text-emerald-900',
      iconBg: 'bg-emerald-600 text-white',
      accentColor: 'text-emerald-600',
      topicsCount: 'Flashcard & Matching',
    },
    {
      id: 'grammar' as AppMode,
      title: 'Grammar Practice',
      titleEn: '✍️ Grammar Practice',
      subtitle: 'Latihan to be (am/is/are), kata ganti milik, & simple present.',
      badge: '10 Soal Interaktif',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/80 text-amber-900',
      iconBg: 'bg-amber-500 text-white',
      accentColor: 'text-amber-600',
      topicsCount: 'Penjelasan Instan',
    },
    {
      id: 'quiz' as AppMode,
      title: 'Quiz',
      titleEn: '🎯 Quiz',
      subtitle: 'Uji pemahamanmu dengan 10 soal komprehensif & dapatkan evaluasi skor!',
      badge: 'Skor & Sertifikat',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 hover:bg-rose-100/70 border-rose-200/80 text-rose-900',
      iconBg: 'bg-rose-600 text-white',
      accentColor: 'text-rose-600',
      topicsCount: 'Hasil & Rekomendasi',
    },
  ];

  const topicsPreview = [
    { icon: '👤', name: 'Name', desc: "My name is... / I'm..." },
    { icon: '🌍', name: 'Origin', desc: "I'm from... / I come from..." },
    { icon: '🎂', name: 'Age', desc: "I'm 13 years old" },
    { icon: '🏫', name: 'School', desc: "I study at SMP..." },
    { icon: '🏡', name: 'Address', desc: "I live in... / on Jl... (Fictional)" },
    { icon: '👨‍👩‍👧‍👦', name: 'Family', desc: "There are 4 people in my family" },
    { icon: '⚽', name: 'Hobbies', desc: "My hobby is... / I like..." },
    { icon: '📚', name: 'Subject', desc: "My favorite subject is English" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Welcome Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 text-white p-6 sm:p-10 shadow-xl shadow-indigo-900/10">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-white/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Indonesian Grade 7 Junior High School • English Learning</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white drop-shadow-xs">
            English Buddy <span className="animate-pulse">👋</span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-indigo-100 mt-2 font-display">
            Introducing & Meeting New People
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-indigo-100/90 leading-relaxed font-medium">
            "Let's practice introducing ourselves and meeting new people in English!"
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              id="btn-hero-learn"
              onClick={() => onSelectMode('learn')}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:scale-102 active:scale-98 transition-all"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-chat"
              onClick={() => onSelectMode('conversation')}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-3 rounded-2xl text-sm sm:text-base backdrop-blur-sm border border-white/30 hover:scale-102 active:scale-98 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>Coba AI Chat Tutor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <PrivacyBanner />

      {/* Main Mode Buttons Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-800 font-display">
              Pilihan Mode Belajar 🚀
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pilih aktivitas yang ingin kamu pelajari hari ini:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainButtons.map((btn) => (
            <button
              key={btn.id}
              id={`btn-mode-${btn.id}`}
              onClick={() => onSelectMode(btn.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${btn.bgColor} flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/80 border border-slate-200/60 shadow-2xs">
                    {btn.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {btn.topicsCount}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display">
                  {btn.titleEn}
                </h4>

                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {btn.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Buka Sekarang <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-lg">✨</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 8 Core Learning Topics Pill Grid */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              8 Topik Materi Perkenalan Diri (Grade 7)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Topik-topik penting yang wajib dikuasai untuk saling berkenalan dalam bahasa Inggris:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topicsPreview.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors"
            >
              <div className="text-2xl mb-1.5">{item.icon}</div>
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                {idx + 1}. {item.name}
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold font-display text-white">
            Cara Penggunaan (How to Use)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 font-black flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="font-bold text-white mb-1">Pelajari Ungkapan</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Buka menu <strong>📚 Learn</strong> untuk melihat rumus kalimat perkenalan dan dengarkan cara pelafalan audionya.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-indigo-400 text-slate-900 font-black flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="font-bold text-white mb-1">Praktik Percakapan AI</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Masuk ke <strong>💬 Conversation</strong> untuk mengobrol dengan Alex. Jawab satu per satu pertanyaan dalam bahasa Inggris.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-900 font-black flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="font-bold text-white mb-1">Uji Pemahaman</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Asah kemampuan di <strong>🧩 Vocabulary</strong>, <strong>✍️ Grammar</strong>, dan ikuti <strong>🎯 Quiz</strong> untuk melihat nilaimu!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

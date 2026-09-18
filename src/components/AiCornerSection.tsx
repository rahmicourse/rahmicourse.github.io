import React, { useState } from 'react';
import {
  Bot,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AI_LITERACY_CARDS } from '../data/aiLiteracyData';
import { playChimeSound } from '../utils/sound';

export const AiCornerSection: React.FC = () => {
  const [pledgeSigned, setPledgeSigned] = useState(false);
  const [studentName, setStudentName] = useState('');

  const handleSignPledge = () => {
    if (!studentName.trim()) return;
    playChimeSound();
    confetti({ particleCount: 70, spread: 60 });
    setPledgeSigned(true);
  };

  return (
    <div id="ai-corner-section" className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span>Literasi Digital • English and Technology for Nusantara</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          AI Corner: Belajar Pintar & Aman di Era Digital
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
          Panduan penting literasi kecerdasan buatan untuk siswa SMP Kelas 7. Pahami apa itu AI,
          manfaat positifnya untuk belajar bahasa Inggris, serta batasan keamanannya.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {AI_LITERACY_CARDS.map((card) => {
          const isBlue = card.color === 'blue';
          const isGreen = card.color === 'green';
          const isOrange = card.color === 'orange';

          return (
            <div
              key={card.id}
              className={`rounded-3xl border-2 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                isBlue
                  ? 'bg-blue-50/40 border-blue-200'
                  : isGreen
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isOrange
                  ? 'bg-amber-50/50 border-amber-300'
                  : 'bg-purple-50/40 border-purple-200'
              }`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      isBlue
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : isGreen
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    {card.badge}
                  </span>
                  <span className="text-3xl select-none">{card.icon}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mb-3">{card.subtitle}</p>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{card.description}</p>

                {/* Bullet Points */}
                <div className="space-y-3 mb-5">
                  {card.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <div
                        className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                          isBlue
                            ? 'bg-blue-200 text-blue-800'
                            : isGreen
                            ? 'bg-emerald-200 text-emerald-800'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        ✓
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                          {pt.title}
                        </strong>
                        <span className="text-xs text-slate-600 leading-snug">{pt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Tip Footer */}
              {card.tips && (
                <div className="pt-3 border-t border-slate-200/60 text-xs font-medium text-slate-700 italic flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{card.tips}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Student Digital Pledge Banner */}
      <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-emerald-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Ikrar Siswa Cerdas Digital SMP</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold mb-2">
            Ikrar Pelajar Pintar & Bijak AI di Nusantara!
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm mb-6 leading-relaxed">
            Saya berjanji akan menggunakan teknologi dan AI untuk membantu proses belajar saya,
            menjaga kerahasiaan data pribadi, tidak asal mencontek, selalu kritis memverifikasi informasi,
            dan senantiasa mengutamakan kejujuran.
          </p>

          {pledgeSigned ? (
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center font-bold">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <p className="font-bold text-sm">Ikrar Telah Ditandatangani oleh {studentName}!</p>
                <p className="text-xs text-blue-100">Pelajar Bijak Berteknologi di Nusantara 🇮🇩</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Tulis nama lengkapmu..."
                className="px-4 py-3 rounded-xl bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              />
              <button
                onClick={handleSignPledge}
                disabled={!studentName.trim()}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 btn-3d-orange cursor-pointer whitespace-nowrap"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Tandatangani Ikrar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

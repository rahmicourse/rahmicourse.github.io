import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, ArrowLeft, ArrowRight, RotateCcw, Award, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRAMMAR_QUESTIONS } from '../data/grammarData';

interface GrammarViewProps {
  onBackToHome: () => void;
  onGoToQuiz: () => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({ onBackToHome, onGoToQuiz }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [id: number]: { answer: string; isCorrect: boolean } }>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = GRAMMAR_QUESTIONS[currentIndex];
  const isCorrect = selectedOption?.toLowerCase() === currentQ.correctAnswer.toLowerCase();

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);
    const correct = selectedOption.toLowerCase() === currentQ.correctAnswer.toLowerCase();
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { answer: selectedOption, isCorrect: correct },
    }));
  };

  const handleNext = () => {
    if (currentIndex < GRAMMAR_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  const totalCorrect = (Object.values(userAnswers) as { answer: string; isCorrect: boolean }[]).filter((a) => a.isCorrect).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header & Back */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          id="btn-grammar-back"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-grammar-goto-quiz"
            onClick={onGoToQuiz}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all"
          >
            <span>🎯 Lanjut ke Quiz Akhir</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Soal {currentIndex + 1} dari {GRAMMAR_QUESTIONS.length}
            </span>
            <span>
              Topik: <strong className="text-slate-800">{currentQ.topic}</strong>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / GRAMMAR_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Instruction & Question */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200/80">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Petunjuk: {currentQ.instruction}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug font-display bg-slate-50 p-4 rounded-2xl border border-slate-100">
              "{currentQ.question}"
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let optStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (isSubmitted) {
                if (opt.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
                  optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  optStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                }
              } else if (isSelected) {
                optStyle = 'bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-200';
              }

              return (
                <button
                  key={i}
                  id={`btn-grammar-opt-${currentIndex}-${i}`}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-between ${optStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && opt.toLowerCase() === currentQ.correctAnswer.toLowerCase() && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  {isSubmitted && isSelected && opt.toLowerCase() !== currentQ.correctAnswer.toLowerCase() && (
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submission and Feedback Area */}
          {!isSubmitted ? (
            <button
              id="btn-grammar-submit"
              disabled={!selectedOption}
              onClick={handleSubmit}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-extrabold text-sm transition-all shadow-xs"
            >
              Periksa Jawaban
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm space-y-1.5 ${
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                    : 'bg-rose-50 text-rose-950 border border-rose-200'
                }`}
              >
                <p className="font-extrabold flex items-center gap-1.5 text-sm">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Jawabanmu Tepat! 👍</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Jawaban yang benar adalah "{currentQ.correctAnswer}"</span>
                    </>
                  )}
                </p>
                <p className="text-xs leading-relaxed font-medium">
                  <strong>Penjelasan:</strong> {currentQ.explanationId}
                </p>
              </div>

              <button
                id="btn-grammar-next"
                onClick={handleNext}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>{currentIndex < GRAMMAR_QUESTIONS.length - 1 ? 'Soal Grammar Selanjutnya' : 'Lihat Hasil Latihan Grammar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Summary Score View */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6 shadow-sm animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 text-4xl flex items-center justify-center mx-auto shadow-xs">
            ✍️
          </div>

          <div>
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
              Grammar Practice Complete
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Hasil Latihan Tata Bahasa (Grammar)
            </h3>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase">Skor Kamu</p>
            <p className="text-5xl font-extrabold text-indigo-600 font-display">
              {totalCorrect} / {GRAMMAR_QUESTIONS.length}
            </p>
            <p className="text-xs font-semibold text-slate-600 pt-1">
              {totalCorrect === 10
                ? 'Sempurna! Kamu memahami to be, possessives, dan simple present dengan sangat baik!'
                : totalCorrect >= 7
                ? 'Bagus sekali! Pemahaman dasar struktur kalimatmu sudah sangat solid.'
                : 'Tetap semangat! Jangan ragu membaca kembali tips grammar pada menu Learn.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="btn-grammar-retry"
              onClick={handleRestart}
              className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Latihan</span>
            </button>

            <button
              id="btn-grammar-finish-to-quiz"
              onClick={onGoToQuiz}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs"
            >
              <span>Uji Kemampuan di 🎯 Quiz (10 Soal)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

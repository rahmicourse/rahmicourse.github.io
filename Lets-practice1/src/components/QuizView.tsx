import React, { useState } from 'react';
import { Award, CheckCircle2, AlertCircle, Sparkles, ArrowLeft, ArrowRight, RotateCcw, HelpCircle, Star, BookOpen, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizResult } from '../types';

interface QuizViewProps {
  onBackToHome: () => void;
  onGoToLearn: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBackToHome, onGoToLearn }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [shortAnswerInput, setShortAnswerInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersRecord, setAnswersRecord] = useState<{
    [id: number]: { userAnswer: string; isCorrect: boolean; question: typeof QUIZ_QUESTIONS[0] };
  }>({});
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeReviewTab, setActiveReviewTab] = useState<'summary' | 'review'>('summary');

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted) return;

    let userAns = '';
    let isCorrect = false;

    if (currentQ.type === 'mcq') {
      if (!selectedOption) return;
      userAns = selectedOption;
      isCorrect = selectedOption.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    } else {
      if (!shortAnswerInput.trim()) return;
      userAns = shortAnswerInput.trim();
      const acceptable = currentQ.acceptableAnswers || [currentQ.correctAnswer];
      isCorrect = acceptable.some((a) => a.trim().toLowerCase() === userAns.toLowerCase());
    }

    setIsAnswerSubmitted(true);
    setAnswersRecord((prev) => ({
      ...prev,
      [currentQ.id]: { userAnswer: userAns, isCorrect, question: currentQ },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption('');
      setShortAnswerInput('');
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption('');
    setShortAnswerInput('');
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setAnswersRecord({});
    setIsFinished(false);
    setActiveReviewTab('summary');
  };

  // Calculate results
  const recordedList = Object.values(answersRecord) as {
    userAnswer: string;
    isCorrect: boolean;
    question: typeof QUIZ_QUESTIONS[0];
  }[];

  const totalScore = recordedList.filter((a) => a.isCorrect).length;
  const percentage = Math.round((totalScore / QUIZ_QUESTIONS.length) * 100);

  const calculateFeedback = (): QuizResult => {
    const excellent: string[] = [];
    const improve: string[] = [];
    const practice: string[] = [];

    // Analyze categories
    const categoryStats: { [cat: string]: { total: number; correct: number } } = {};

    recordedList.forEach((rec) => {
      const cat = rec.question.category;
      if (!categoryStats[cat]) categoryStats[cat] = { total: 0, correct: 0 };
      categoryStats[cat].total += 1;
      if (rec.isCorrect) categoryStats[cat].correct += 1;
    });

    if ((categoryStats['expressions']?.correct || 0) >= 1) {
      excellent.push('Menggunakan ungkapan salam dan perkenalan awal dengan sopan.');
    } else {
      improve.push('Pelajari kembali ungkapan salam perkenalan seperti "Nice to meet you!"');
      practice.push('Latihan mengucapkan salam di menu 📚 Learn.');
    }

    if ((categoryStats['grammar']?.correct || 0) >= 1) {
      excellent.push('Penerapan rumus to be (am/is/are) dan struktur kalimat dasar.');
    } else {
      improve.push('Perhatikan penggunaan to be: I am, She/He is, They/We are.');
      practice.push('Buka menu ✍️ Grammar Practice untuk mengulang to be.');
    }

    if ((categoryStats['vocabulary']?.correct || 0) >= 1) {
      excellent.push('Pemahaman kosakata topik identitas, hobi, dan mata pelajaran sekolah.');
    } else {
      improve.push('Perbanyak hafalan kata seperti subject, hobby, classmate, dan address.');
      practice.push('Mainkan Word Matching Game di menu 🧩 Vocabulary.');
    }

    if ((categoryStats['reading']?.correct || 0) >= 1) {
      excellent.push('Membaca dan memahami profil perkenalan siswa dengan cermat.');
    } else {
      improve.push('Tingkatkan ketelitian saat membaca detail teks perkenalan.');
    }

    if (practice.length === 0) {
      practice.push('Praktikkan percakapan langsung dengan AI Tutor (Alex) di menu 💬 Conversation Practice!');
      practice.push('Coba ajak teman sekelasmu berlatih perkenalan bahasa Inggris di kelas.');
    }

    return {
      score: totalScore,
      total: QUIZ_QUESTIONS.length,
      percentage,
      excellentAreas: excellent.length > 0 ? excellent : ['Semangat belajar dan mencoba menjawab semua soal!'],
      areasToImprove: improve.length > 0 ? improve : ['Sudah sangat baik! Pertahankan konsistensi latihan.'],
      recommendedPractice: practice,
    };
  };

  const results = isFinished ? calculateFeedback() : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header & Back */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          id="btn-quiz-back"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        {isFinished && (
          <button
            id="btn-quiz-restart-top"
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang Kuis</span>
          </button>
        )}
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Progress & Category */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Kuis Soal {currentIdx + 1} dari {QUIZ_QUESTIONS.length}
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
              Kategori: <strong>{currentQ.categoryLabel}</strong>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Context box if dialogue or reading passage exists */}
          {currentQ.context && (
            <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl text-xs sm:text-sm text-indigo-950 font-medium whitespace-pre-line leading-relaxed">
              <span className="text-[11px] font-black uppercase text-indigo-600 block mb-1">
                Teks / Percakapan:
              </span>
              {currentQ.context}
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed font-display">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Controls: MCQ or Short Answer */}
          {currentQ.type === 'mcq' ? (
            <div className="space-y-2.5">
              {currentQ.options?.map((opt, i) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

                let optClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    optClass = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                  }
                } else if (isSelected) {
                  optClass = 'bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-200';
                }

                return (
                  <button
                    key={i}
                    id={`btn-quiz-opt-${currentIdx}-${i}`}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Short Answer Input */
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Ketik jawabanmu di bawah ini:
              </label>
              <input
                id={`input-quiz-short-${currentIdx}`}
                type="text"
                disabled={isAnswerSubmitted}
                value={shortAnswerInput}
                onChange={(e) => setShortAnswerInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isAnswerSubmitted) handleSubmitAnswer();
                }}
                placeholder="Ketik kata yang tepat..."
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 text-sm font-bold text-slate-900"
              />
            </div>
          )}

          {/* Hint Toggle */}
          {!isAnswerSubmitted && (
            <div className="pt-1">
              <button
                id="btn-quiz-hint"
                onClick={() => setShowHint((prev) => !prev)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}</span>
              </button>
              {showHint && (
                <p className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 animate-fadeIn">
                  💡 <strong>Petunjuk:</strong> {currentQ.hint}
                </p>
              )}
            </div>
          )}

          {/* Submission and Next Question buttons */}
          {!isAnswerSubmitted ? (
            <button
              id="btn-quiz-submit"
              disabled={currentQ.type === 'mcq' ? !selectedOption : !shortAnswerInput.trim()}
              onClick={handleSubmitAnswer}
              className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-extrabold text-sm transition-all shadow-xs"
            >
              Kirim Jawaban
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm space-y-1.5 ${
                  answersRecord[currentQ.id]?.isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                    : 'bg-rose-50 text-rose-950 border border-rose-200'
                }`}
              >
                <p className="font-extrabold flex items-center gap-1.5 text-sm">
                  {answersRecord[currentQ.id]?.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Hebat! Jawabanmu Benar! 🎉</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>Jawaban yang benar: "{currentQ.correctAnswer}"</span>
                    </>
                  )}
                </p>
                <p className="text-xs leading-relaxed font-medium">
                  <strong>Penjelasan:</strong> {currentQ.explanation}
                </p>
              </div>

              <button
                id="btn-quiz-next"
                onClick={handleNextQuestion}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Kuis Lengkap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* RESULT REPORT CARD (YOUR RESULT) */
        results && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Score Banner */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quiz Evaluation Result</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
                YOUR RESULT
              </h2>

              <div className="inline-block p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 my-2">
                <p className="text-xs sm:text-sm font-semibold text-indigo-200">Total Score</p>
                <p className="text-5xl sm:text-6xl font-extrabold text-amber-400 font-display">
                  {results.score} / {results.total}
                </p>
                <p className="text-sm font-bold text-white mt-1">
                  Persentase: {results.percentage}%
                </p>
              </div>

              <p className="text-sm sm:text-base text-indigo-100 max-w-lg mx-auto leading-relaxed">
                {results.score >= 9
                  ? '🌟 Luar biasa! Kemampuan perkenalan bahasa Inggrismu sudah sangat matang dan percaya diri!'
                  : results.score >= 7
                  ? '👍 Kerja bagus! Kamu sudah menguasai sebagian besar materi perkenalan Grade 7.'
                  : '💪 Terus semangat belajar! Jangan ragu untuk membaca ulang materi di menu Learn dan mencoba lagi.'}
              </p>
            </div>

            {/* Sub Tabs: Summary vs Review Answers */}
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
              <button
                id="btn-quiz-tab-summary"
                onClick={() => setActiveReviewTab('summary')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeReviewTab === 'summary'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Evaluasi & Rekomendasi
              </button>
              <button
                id="btn-quiz-tab-review"
                onClick={() => setActiveReviewTab('review')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeReviewTab === 'review'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pembahasan 10 Soal ({totalScore}/{QUIZ_QUESTIONS.length})
              </button>
            </div>

            {activeReviewTab === 'summary' ? (
              <div className="space-y-4">
                {/* 3 Feedback Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  {/* Excellent areas */}
                  <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold font-display">
                      <Star className="w-5 h-5 text-emerald-600" />
                      <span>Area Unggulan (Excellent Areas)</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {results.excellentAreas.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas to improve */}
                  <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold font-display">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <span>Perlu Ditingkatkan (Areas to Improve)</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {results.areasToImprove.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">●</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended practice */}
                  <div className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-indigo-900 font-extrabold font-display">
                      <ThumbsUp className="w-5 h-5 text-indigo-600" />
                      <span>Rekomendasi Latihan (Recommended Practice)</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {results.recommendedPractice.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    id="btn-quiz-retry-summary"
                    onClick={handleRestartQuiz}
                    className="flex-1 py-3 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Kuis</span>
                  </button>

                  <button
                    id="btn-quiz-learn-summary"
                    onClick={onGoToLearn}
                    className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Review Materi di 📚 Learn</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Review Breakdown of all 10 questions */
              <div className="space-y-3">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const rec = answersRecord[q.id];
                  const wasCorrect = rec?.isCorrect;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl border ${
                        wasCorrect
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/50 border-rose-200 text-rose-950'
                      } space-y-2`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="flex items-center gap-1.5">
                          {wasCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                          )}
                          <span>Soal #{idx + 1} ({q.categoryLabel})</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded-md font-mono ${wasCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                          {wasCorrect ? 'Benar (+1)' : 'Salah (0)'}
                        </span>
                      </div>

                      <p className="font-bold text-xs sm:text-sm text-slate-900">
                        {q.question}
                      </p>

                      <div className="text-xs space-y-0.5 text-slate-700">
                        <p>Jawabanmu: <strong className={wasCorrect ? 'text-emerald-700' : 'text-rose-700'}>{rec?.userAnswer || '(Tidak dijawab)'}</strong></p>
                        {!wasCorrect && (
                          <p>Kunci Jawaban: <strong className="text-emerald-700">{q.correctAnswer}</strong></p>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 bg-white/70 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                        💡 <strong>Penjelasan:</strong> {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

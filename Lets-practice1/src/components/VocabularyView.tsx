import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowLeft, ArrowRight, BookOpen, Layers, Award, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VOCABULARY_ITEMS, VOCAB_MCQ_QUESTIONS, VocabQuizQuestion } from '../data/vocabularyData';
import { speakEnglish } from '../utils/speech';

interface VocabularyViewProps {
  onBackToHome: () => void;
  onGoToGrammar: () => void;
}

type VocabTab = 'cards' | 'mcq' | 'matching' | 'fill';

export const VocabularyView: React.FC<VocabularyViewProps> = ({ onBackToHome, onGoToGrammar }) => {
  const [activeTab, setActiveTab] = useState<VocabTab>('cards');
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // MCQ State
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqFinished, setMcqFinished] = useState(false);

  // Matching Game State
  const [selectedEnWord, setSelectedEnWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchingError, setMatchingError] = useState<string | null>(null);
  const [matchingAttempts, setMatchingAttempts] = useState(0);

  // Fill in blanks state
  const fillInQuestions = VOCAB_MCQ_QUESTIONS.filter((q) => q.type === 'fill_in');
  const [fillIndex, setFillIndex] = useState(0);
  const [fillAnswer, setFillAnswer] = useState('');
  const [fillSubmitted, setFillSubmitted] = useState(false);
  const [fillScore, setFillScore] = useState(0);

  const handlePlayAudio = (text: string) => {
    setSpeakingWord(text);
    speakEnglish(text, () => setSpeakingWord(null));
  };

  // MCQ Handlers
  const handleMcqOptionSelect = (option: string) => {
    if (mcqSubmitted) return;
    setMcqSelected(option);
  };

  const handleMcqSubmit = () => {
    if (!mcqSelected) return;
    setMcqSubmitted(true);
    if (mcqSelected.toLowerCase() === VOCAB_MCQ_QUESTIONS[mcqIndex].correctAnswer.toLowerCase()) {
      setMcqScore((prev) => prev + 1);
    }
  };

  const handleMcqNext = () => {
    if (mcqIndex < VOCAB_MCQ_QUESTIONS.length - 1) {
      setMcqIndex((prev) => prev + 1);
      setMcqSelected(null);
      setMcqSubmitted(false);
    } else {
      setMcqFinished(true);
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch (e) {}
    }
  };

  const handleResetMcq = () => {
    setMcqIndex(0);
    setMcqSelected(null);
    setMcqSubmitted(false);
    setMcqScore(0);
    setMcqFinished(false);
  };

  // Matching Game Handlers
  const handleMatchingClickEn = (word: string) => {
    if (matchedPairs.includes(word)) return;
    setSelectedEnWord(word);
    setMatchingError(null);
    handlePlayAudio(word);
  };

  const handleMatchingClickId = (idMeaning: string, parentWord: string) => {
    if (!selectedEnWord || matchedPairs.includes(parentWord)) return;

    setMatchingAttempts((prev) => prev + 1);

    if (selectedEnWord === parentWord) {
      // Correct Match!
      const newMatched = [...matchedPairs, parentWord];
      setMatchedPairs(newMatched);
      setSelectedEnWord(null);
      setMatchingError(null);

      if (newMatched.length === VOCABULARY_ITEMS.length) {
        try {
          confetti({ particleCount: 70, spread: 70 });
        } catch (e) {}
      }
    } else {
      // Incorrect Match
      setMatchingError(`"${selectedEnWord}" tidak cocok dengan "${idMeaning}". Coba lagi!`);
      setTimeout(() => setMatchingError(null), 2500);
      setSelectedEnWord(null);
    }
  };

  const handleResetMatching = () => {
    setSelectedEnWord(null);
    setMatchedPairs([]);
    setMatchingError(null);
    setMatchingAttempts(0);
  };

  // Shuffled arrays for matching game (memoized)
  const [shuffledIdList] = useState(() =>
    [...VOCABULARY_ITEMS].sort(() => Math.random() - 0.5)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header & Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          id="btn-vocab-back"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-vocab-goto-grammar"
            onClick={onGoToGrammar}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-2 rounded-xl shadow-xs transition-all"
          >
            <span>✍️ Lanjut ke Grammar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sub-modes Tab Selector */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
        <button
          id="tab-vocab-cards"
          onClick={() => setActiveTab('cards')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'cards'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>10 Flashcards</span>
        </button>

        <button
          id="tab-vocab-mcq"
          onClick={() => setActiveTab('mcq')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'mcq'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Multiple Choice Quiz</span>
        </button>

        <button
          id="tab-vocab-matching"
          onClick={() => setActiveTab('matching')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'matching'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          <span>Word Matching Game</span>
        </button>
      </div>

      {/* TAB 1: 10 FLASHCARDS */}
      {activeTab === 'cards' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <span>🧩 10 Kosakata Kunci Perkenalan Diri (Vocabulary)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Pelajari 10 kata penting ini, dengarkan audionya, dan amati contoh kalimatnya dalam konteks Grade 7:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VOCABULARY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      #{idx + 1} • {item.category}
                    </span>
                    <button
                      id={`btn-audio-vocab-${item.id}`}
                      onClick={() => handlePlayAudio(`${item.word}. ${item.exampleEn}`)}
                      className={`p-2 rounded-xl transition-all ${
                        speakingWord === item.word
                          ? 'bg-amber-400 text-slate-950 scale-105'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                      }`}
                      title="Dengarkan pengucapan kata dan contoh kalimat"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl font-extrabold text-indigo-900 font-display group-hover:text-indigo-600 transition-colors">
                      {item.word}
                    </h4>
                    {item.phonetic && (
                      <span className="text-xs text-slate-400 font-mono">
                        {item.phonetic}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-bold text-amber-700 mt-1">
                    Artinya: {item.indonesian}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                  <p className="text-xs font-bold text-slate-800">
                    "{item.exampleEn}"
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    "{item.exampleId}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MULTIPLE CHOICE QUIZ */}
      {activeTab === 'mcq' && (
        <div className="max-w-2xl mx-auto space-y-4">
          {!mcqFinished ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              {/* Progress Header */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Soal {mcqIndex + 1} dari {VOCAB_MCQ_QUESTIONS.length}</span>
                <span className="text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Skor: {mcqScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((mcqIndex + 1) / VOCAB_MCQ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-amber-600 tracking-wider">
                  Tebak Kosakata #{VOCAB_MCQ_QUESTIONS[mcqIndex].id}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-display">
                  {VOCAB_MCQ_QUESTIONS[mcqIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {VOCAB_MCQ_QUESTIONS[mcqIndex].options?.map((opt, i) => {
                  const isSelected = mcqSelected === opt;
                  const isCorrect = opt.toLowerCase() === VOCAB_MCQ_QUESTIONS[mcqIndex].correctAnswer.toLowerCase();

                  let optClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (mcqSubmitted) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      optClass = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-2 ring-indigo-200';
                  }

                  return (
                    <button
                      key={i}
                      id={`btn-vocab-mcq-opt-${i}`}
                      disabled={mcqSubmitted}
                      onClick={() => handleMcqOptionSelect(opt)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-sm transition-all flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {mcqSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {mcqSubmitted && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Submit or Next Button */}
              {!mcqSubmitted ? (
                <button
                  id="btn-vocab-mcq-submit"
                  disabled={!mcqSelected}
                  onClick={handleMcqSubmit}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-sm transition-all shadow-xs"
                >
                  Periksa Jawaban
                </button>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm space-y-1 ${
                      mcqSelected?.toLowerCase() === VOCAB_MCQ_QUESTIONS[mcqIndex].correctAnswer.toLowerCase()
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      {mcqSelected?.toLowerCase() === VOCAB_MCQ_QUESTIONS[mcqIndex].correctAnswer.toLowerCase()
                        ? '✅ Benar sekali!'
                        : '❌ Kurang tepat!'}
                    </p>
                    <p className="text-xs">{VOCAB_MCQ_QUESTIONS[mcqIndex].indonesianNote}</p>
                  </div>

                  <button
                    id="btn-vocab-mcq-next"
                    onClick={handleMcqNext}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>{mcqIndex < VOCAB_MCQ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Latihan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Finished Result */
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-5 shadow-sm animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 text-3xl flex items-center justify-center mx-auto">
                🎉
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-slate-900 font-display">
                  Latihan Selesai!
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Skor akhir Vocabulary Quiz kamu:
                </p>
              </div>

              <div className="text-4xl font-extrabold text-indigo-600 font-display">
                {mcqScore} / {VOCAB_MCQ_QUESTIONS.length}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {mcqScore >= 8
                  ? 'Luar biasa! Penguasaan kosakata perkenalanmu sangat mantap!'
                  : 'Bagus! Terus berlatih kosakata untuk memperkaya perbendaharaan katamu!'}
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  id="btn-vocab-mcq-restart"
                  onClick={handleResetMcq}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Ulangi Quiz</span>
                </button>
                <button
                  id="btn-vocab-mcq-goto-match"
                  onClick={() => setActiveTab('matching')}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5"
                >
                  <span>Coba Matching Game</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: WORD MATCHING GAME */}
      {activeTab === 'matching' && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-display">
                  🔀 Game Mencocokkan Kata (Matching Game)
                </h3>
                <p className="text-xs text-slate-600">
                  Klik kata bahasa Inggris di kolom kiri, lalu klik artinya di kolom kanan!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  Cocok: {matchedPairs.length} / {VOCABULARY_ITEMS.length}
                </span>
                <button
                  id="btn-reset-matching"
                  onClick={handleResetMatching}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl"
                  title="Reset Game"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {matchingError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-xl flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{matchingError}</span>
              </div>
            )}
          </div>

          {/* Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: English Words */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700 font-display">
                Kolom A (English Word)
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {VOCABULARY_ITEMS.map((item) => {
                  const isMatched = matchedPairs.includes(item.word);
                  const isSelected = selectedEnWord === item.word;

                  return (
                    <button
                      key={item.id}
                      id={`btn-match-en-${item.id}`}
                      disabled={isMatched}
                      onClick={() => handleMatchingClickEn(item.word)}
                      className={`w-full p-3.5 rounded-2xl border text-sm font-bold transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-60 line-through'
                          : isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-4 ring-indigo-100'
                          : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.word}</span>
                        {item.phonetic && <span className="text-xs opacity-60 font-mono">{item.phonetic}</span>}
                      </div>
                      {isMatched ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 opacity-70" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Indonesian Meanings (Shuffled) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 font-display">
                Kolom B (Arti Bahasa Indonesia)
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {shuffledIdList.map((item) => {
                  const isMatched = matchedPairs.includes(item.word);

                  return (
                    <button
                      key={item.id}
                      id={`btn-match-id-${item.id}`}
                      disabled={isMatched}
                      onClick={() => handleMatchingClickId(item.indonesian, item.word)}
                      className={`w-full p-3.5 rounded-2xl border text-sm font-bold transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-60'
                          : selectedEnWord
                          ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950 ring-2 ring-amber-100 cursor-pointer animate-pulse'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span>{item.indonesian}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Celebration when all matched */}
          {matchedPairs.length === VOCABULARY_ITEMS.length && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-3 animate-fadeIn">
              <div className="text-4xl">🌟</div>
              <h4 className="text-lg font-extrabold text-emerald-950 font-display">
                Hebat! Semua 10 Pasangan Kata Berhasil Dicocokkan!
              </h4>
              <p className="text-xs text-emerald-800">
                Kamu menyelesaikan game dalam {matchingAttempts} kali percobaan.
              </p>
              <button
                onClick={onGoToGrammar}
                className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs"
              >
                Lanjut ke Menu ✍️ Grammar Practice →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

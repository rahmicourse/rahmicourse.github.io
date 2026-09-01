import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, MessageSquare, Lightbulb, Play } from 'lucide-react';
import { LEARN_TOPICS } from '../data/learningData';
import { speakEnglish } from '../utils/speech';
import { PrivacyBanner } from './PrivacyBanner';

interface LearnViewProps {
  onBackToHome: () => void;
  onGoToConversation: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onBackToHome, onGoToConversation }) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<string | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const currentTopic = LEARN_TOPICS[activeTopicIndex];

  const handlePlayAudio = (text: string) => {
    setSpeakingText(text);
    speakEnglish(text, () => setSpeakingText(null));
  };

  const handleSelectTopic = (idx: number) => {
    setActiveTopicIndex(idx);
    setSelectedPracticeOption(null);
    setPracticeSubmitted(false);
  };

  const handlePracticeSubmit = () => {
    if (selectedPracticeOption) {
      setPracticeSubmitted(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          id="btn-learn-back"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Topik {activeTopicIndex + 1} dari {LEARN_TOPICS.length}</span>
          <button
            id="btn-learn-goto-chat"
            onClick={onGoToConversation}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all"
          >
            <span>💬 Praktik Percakapan AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Topic Horizontal Selector Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {LEARN_TOPICS.map((topic, idx) => {
          const isActive = idx === activeTopicIndex;
          return (
            <button
              key={topic.id}
              id={`btn-topic-tab-${topic.id}`}
              onClick={() => handleSelectTopic(idx)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span>{topic.icon}</span>
              <span>{topic.topicId}</span>
            </button>
          );
        })}
      </div>

      {/* Topic Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Lesson Content (2 columns on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Title & Indonesian Explanation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                {currentTopic.icon}
              </div>
              <div>
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                  Materi Perkenalan #{activeTopicIndex + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {currentTopic.topic}
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {currentTopic.explanationId}
            </p>

            {/* Expressions Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 font-display">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Cara Menyatakan (Stating / Expressions):</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {currentTopic.expressions.map((expr, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-2xl transition-all group"
                  >
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-indigo-950">
                        "{expr.en}"
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Arti: {expr.idMeaning}
                      </p>
                    </div>

                    <button
                      id={`btn-audio-expr-${activeTopicIndex}-${i}`}
                      onClick={() => handlePlayAudio(expr.en)}
                      title="Dengarkan pengucapan (Audio)"
                      className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                        speakingText === expr.en
                          ? 'bg-amber-400 text-slate-950 border-amber-500 scale-105 animate-pulse'
                          : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white shadow-2xs'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 font-display">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Cara Menanyakan ke Orang Lain (Asking Questions):</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {currentTopic.questions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 bg-amber-50/50 hover:bg-amber-50 border border-amber-200/80 rounded-2xl transition-all group"
                  >
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-amber-950">
                        "{q.en}"
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Arti: {q.idMeaning}
                      </p>
                    </div>

                    <button
                      id={`btn-audio-q-${activeTopicIndex}-${i}`}
                      onClick={() => handlePlayAudio(q.en)}
                      title="Dengarkan pengucapan (Audio)"
                      className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                        speakingText === q.en
                          ? 'bg-amber-400 text-slate-950 border-amber-500 scale-105 animate-pulse'
                          : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-500 hover:text-white shadow-2xs'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Mini Dialogue */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-amber-400 flex items-center gap-2 font-display">
                <MessageSquare className="w-4 h-4" />
                <span>Contoh Percakapan Nyata (Mini Dialogue)</span>
              </h3>
              <button
                id={`btn-dialogue-play-all-${activeTopicIndex}`}
                onClick={() => {
                  handlePlayAudio(`${currentTopic.dialogue.textA} ... ${currentTopic.dialogue.textB}`);
                }}
                className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Dengar Dialog</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Speaker A */}
              <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-xs text-blue-300 font-bold mb-0.5">Student A (Bertanya)</p>
                  <p className="text-sm font-semibold text-white">
                    "{currentTopic.dialogue.textA}"
                  </p>
                </div>
                <button
                  onClick={() => handlePlayAudio(currentTopic.dialogue.textA)}
                  className="p-1.5 text-white/70 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Speaker B */}
              <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  B
                </div>
                <div className="flex-1">
                  <p className="text-xs text-amber-300 font-bold mb-0.5">Student B (Menjawab)</p>
                  <p className="text-sm font-semibold text-white">
                    "{currentTopic.dialogue.textB}"
                  </p>
                </div>
                <button
                  onClick={() => handlePlayAudio(currentTopic.dialogue.textB)}
                  className="p-1.5 text-white/70 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Grammar Tip & Quick Practice (1 col) */}
        <div className="space-y-6">
          {/* Grammar & Indonesian Tip Box */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold font-display">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Tips Tata Bahasa (Grammar Tip)</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              {currentTopic.grammarTip}
            </p>
          </div>

          {/* Privacy Note for Address */}
          {currentTopic.id === 'address' && <PrivacyBanner />}

          {/* Interactive Quick Practice Check */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base">✍️</span>
              <h3 className="font-extrabold text-sm text-slate-900 font-display">
                Cek Pemahaman Cepat (Quick Check)
              </h3>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {currentTopic.quickPractice.prompt}
            </p>

            {/* Options */}
            <div className="space-y-2">
              {currentTopic.quickPractice.options.map((opt, i) => {
                const isSelected = selectedPracticeOption === opt;
                let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (practiceSubmitted) {
                  if (opt === currentTopic.quickPractice.correctAnswer) {
                    optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold ring-2 ring-indigo-200';
                }

                return (
                  <button
                    key={i}
                    id={`btn-quick-opt-${activeTopicIndex}-${i}`}
                    disabled={practiceSubmitted}
                    onClick={() => setSelectedPracticeOption(opt)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {practiceSubmitted && opt === currentTopic.quickPractice.correctAnswer && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {practiceSubmitted && isSelected && opt !== currentTopic.quickPractice.correctAnswer && (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Check Button or Feedback */}
            {!practiceSubmitted ? (
              <button
                id={`btn-quick-submit-${activeTopicIndex}`}
                disabled={!selectedPracticeOption}
                onClick={handlePracticeSubmit}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-xs"
              >
                Periksa Jawaban
              </button>
            ) : (
              <div
                className={`p-3 rounded-xl text-xs space-y-1.5 ${
                  selectedPracticeOption === currentTopic.quickPractice.correctAnswer
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {selectedPracticeOption === currentTopic.quickPractice.correctAnswer ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Hebat! Jawabanmu Benar! 🎉</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Hampir benar! Coba pelajari alasannya:</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {currentTopic.quickPractice.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Navigation to Next Topic */}
          <div className="flex items-center gap-2 pt-2">
            <button
              id="btn-prev-topic"
              disabled={activeTopicIndex === 0}
              onClick={() => handleSelectTopic(activeTopicIndex - 1)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-bold transition-all"
            >
              ← Topik Sebelumnya
            </button>

            {activeTopicIndex < LEARN_TOPICS.length - 1 ? (
              <button
                id="btn-next-topic"
                onClick={() => handleSelectTopic(activeTopicIndex + 1)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all shadow-xs"
              >
                Topik Selanjutnya →
              </button>
            ) : (
              <button
                id="btn-finish-to-chat"
                onClick={onGoToConversation}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-all shadow-xs"
              >
                Lanjut Latihan Chat 💬
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

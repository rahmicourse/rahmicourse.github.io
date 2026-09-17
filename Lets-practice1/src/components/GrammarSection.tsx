import React, { useState } from 'react';
import { BookMarked, Check, X, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { GRAMMAR_ITEMS } from '../data/lessonsData';
import { playChimeSound, playWrongSound, playClickSound } from '../utils/sound';

export const GrammarSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pronouns' | 'tobe' | 'havehas'>('pronouns');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, boolean>>({});

  const activeGrammar = GRAMMAR_ITEMS.find((g) => g.category === activeTab) || GRAMMAR_ITEMS[0];

  const handleSelectOption = (categoryId: string, option: string) => {
    playClickSound();
    setUserAnswers((prev) => ({ ...prev, [categoryId]: option }));

    const isCorrect = option === activeGrammar.practiceSentence.correctAnswer;
    setFeedbacks((prev) => ({ ...prev, [categoryId]: isCorrect }));

    if (isCorrect) {
      playChimeSound();
    } else {
      playWrongSound();
    }
  };

  return (
    <div id="grammar-section" className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Grammar Focus • Grade 7</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Essential Grammar for Introducing Yourself
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Master the 3 building blocks of Grade 7 English: Subject Pronouns, the Verb To Be, and
          Have/Has.
        </p>
      </div>

        {/* 3 Interactive Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            {GRAMMAR_ITEMS.map((item) => {
              const isActive = activeTab === item.category;
              return (
                <button
                  key={item.category}
                  id={`tab-grammar-${item.category}`}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(item.category);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.category === 'pronouns'
                    ? '1. Pronouns'
                    : item.category === 'tobe'
                    ? '2. To Be (am, is, are)'
                    : '3. Have / Has'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="border-b border-slate-200 pb-5 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                {activeGrammar.title}
              </h3>
              {activeGrammar.formula && (
                <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                  Formula: {activeGrammar.formula}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 mt-2">{activeGrammar.explanation}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Rules & Examples Table */}
            <div className="lg:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Rules & Usage Table</span>
              </h4>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Form / Meaning</th>
                      <th className="py-3 px-4">Example Sentence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeGrammar.rules.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-blue-700 whitespace-nowrap">
                          {rule.subject}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {rule.verbOrForm}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span className="font-medium text-slate-900">&ldquo;{rule.example}&rdquo;</span>
                          {rule.note && (
                            <span className="block text-[11px] text-amber-700 mt-0.5">
                              ★ {rule.note}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Practice Sentence Box */}
            <div className="lg:col-span-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                <span>Interactive Practice Check</span>
              </h4>

              <div className="p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  <span>Quick Test</span>
                </div>

                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {activeGrammar.practiceSentence.question}
                </p>

                {/* Multiple choice options */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {activeGrammar.practiceSentence.options.map((opt) => {
                    const isSelected = userAnswers[activeGrammar.category] === opt;
                    const isCorrect = opt === activeGrammar.practiceSentence.correctAnswer;
                    const hasAnswered = !!userAnswers[activeGrammar.category];

                    let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                    if (hasAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(activeGrammar.category, opt)}
                        className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isCorrect && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {userAnswers[activeGrammar.category] && (
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium border flex items-start gap-2.5 ${
                      feedbacks[activeGrammar.category]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    {feedbacks[activeGrammar.category] ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold">
                        {feedbacks[activeGrammar.category]
                          ? 'Correct! Great job!'
                          : 'Not quite! Try again.'}
                      </p>
                      <p className="text-xs mt-0.5 leading-relaxed">
                        {activeGrammar.practiceSentence.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

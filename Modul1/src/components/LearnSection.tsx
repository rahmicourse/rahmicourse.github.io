import React, { useState } from 'react';
import { Volume2, CheckCircle, Sparkles, BookMarked, Lightbulb, ChevronRight } from 'lucide-react';
import { LessonTopic } from '../types';
import { LESSON_TOPICS } from '../data/lessonsData';
import { speakEnglish, playClickSound } from '../utils/sound';

interface LearnSectionProps {
  viewedLessons: string[];
  onMarkLessonViewed: (id: string) => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({
  viewedLessons,
  onMarkLessonViewed,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(LESSON_TOPICS[0].id);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const activeTopic = LESSON_TOPICS.find((t) => t.id === selectedTopicId) || LESSON_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    playClickSound();
    setSelectedTopicId(id);
    onMarkLessonViewed(id);
  };

  const handleSpeak = (text: string) => {
    setSpeakingWord(text);
    speakEnglish(text);
    setTimeout(() => {
      setSpeakingWord(null);
    }, 1400);
  };

  return (
    <div id="learn-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Core Curriculum • Unit 1: About Me</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Interactive Self-Introduction Lessons
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Explore 8 essential elements to introduce yourself clearly and confidently in English.
            </p>
          </div>

          {/* Progress badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500">Progress:</span>
            <span className="text-sm font-bold text-emerald-600">
              {viewedLessons.length} / {LESSON_TOPICS.length} Completed
            </span>
            <div className="w-20 bg-slate-100 h-2.5 rounded-full overflow-hidden ml-1">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(viewedLessons.length / LESSON_TOPICS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 8 Topics Pill Grid for quick mobile & desktop selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
          {LESSON_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            const isViewed = viewedLessons.includes(topic.id);
            return (
              <button
                key={topic.id}
                id={`btn-topic-${topic.id}`}
                onClick={() => handleSelectTopic(topic.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102 ring-2 ring-blue-300'
                    : isViewed
                    ? 'bg-white text-slate-800 border-emerald-300 hover:border-blue-400 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl">{topic.emoji}</span>
                  {isViewed && (
                    <CheckCircle
                      className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`}
                    />
                  )}
                </div>
                <span className="text-xs font-bold truncate w-full text-left">{topic.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Learning Card Detail View */}
        <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-lg p-6 sm:p-8 lg:p-10 transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-3xl shadow-md text-white">
                {activeTopic.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    {activeTopic.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {activeTopic.indonesianTitle}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mt-1">{activeTopic.explanation}</p>
                <p className="text-slate-400 text-xs italic">{activeTopic.indonesianExplanation}</p>
              </div>
            </div>

            {/* Listen All Pronunciation button */}
            <button
              onClick={() => handleSpeak(activeTopic.examples[0].english)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Listen Pronunciation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Example Sentences */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Example Sentences</span>
                </h4>
                <span className="text-xs text-slate-400">Click 🔊 to hear audio</span>
              </div>

              <div className="space-y-3">
                {activeTopic.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all flex items-start justify-between gap-4 group"
                  >
                    <div>
                      <p className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        &ldquo;{ex.english}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{ex.indonesian}</p>
                    </div>
                    <button
                      onClick={() => handleSpeak(ex.english)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        speakingWord === ex.english
                          ? 'bg-blue-600 text-white border-blue-600 scale-110'
                          : 'bg-white text-slate-600 hover:text-blue-600 border-slate-200 shadow-xs'
                      }`}
                      title="Pronounce English"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Pronunciation Tips Box */}
              <div className="mt-6 p-4.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-amber-900">Pronunciation & Grammar Tip</h5>
                  <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                    {activeTopic.pronunciationTips}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Vocabulary List */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span>📖 Vocabulary List</span>
              </h4>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 divide-y divide-slate-200/70">
                {activeTopic.vocabulary.map((vocab, vIdx) => (
                  <div
                    key={vIdx}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{vocab.word}</span>
                        {vocab.partOfSpeech && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-slate-200 text-slate-600 rounded-sm">
                            {vocab.partOfSpeech}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{vocab.meaning}</span>
                    </div>

                    <button
                      onClick={() => handleSpeak(vocab.word)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title={`Listen: ${vocab.word}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Practice Prompt / Action */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  Try it yourself:
                </p>
                <p className="text-xs sm:text-sm text-emerald-900 mt-1">
                  Say aloud your own {activeTopic.title.toLowerCase()} sentence using one of the
                  formulas above!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick bottom pagination through 8 topics */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => {
              const currentIdx = LESSON_TOPICS.findIndex((t) => t.id === selectedTopicId);
              const prevIdx = (currentIdx - 1 + LESSON_TOPICS.length) % LESSON_TOPICS.length;
              handleSelectTopic(LESSON_TOPICS[prevIdx].id);
            }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            ← Previous Topic
          </button>

          <span className="text-xs text-slate-500 font-medium">
            Topic {LESSON_TOPICS.findIndex((t) => t.id === selectedTopicId) + 1} of{' '}
            {LESSON_TOPICS.length}
          </span>

          <button
            onClick={() => {
              const currentIdx = LESSON_TOPICS.findIndex((t) => t.id === selectedTopicId);
              const nextIdx = (currentIdx + 1) % LESSON_TOPICS.length;
              handleSelectTopic(LESSON_TOPICS[nextIdx].id);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-500 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Next Topic</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
    </div>
  );
};

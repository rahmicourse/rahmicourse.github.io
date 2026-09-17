import React from 'react';
import { Trophy, CheckCircle, Lock, Sparkles, Award } from 'lucide-react';
import { UserProgress } from '../types';

interface AchievementSectionProps {
  progress: UserProgress;
}

export const AchievementSection: React.FC<AchievementSectionProps> = ({ progress }) => {
  const badges = [
    {
      id: 'beginner',
      title: 'Beginner',
      tierLabel: '🥉 Bronze Tier',
      icon: '🥉',
      unlocked: progress.achievements.beginner || progress.viewedLessons.length >= 1,
      requirement: 'Explore your first self-introduction lesson or answer a question.',
      description: 'You took your first step into English for Nusantara!',
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-900',
    },
    {
      id: 'communicator',
      title: 'Communicator',
      tierLabel: '🥈 Silver Tier',
      icon: '🥈',
      unlocked: progress.achievements.communicator || progress.completedConversation,
      requirement: 'Complete a conversation or self-intro summary with Galang.',
      description: 'Practiced two-way conversational English like a champ!',
      color: 'from-slate-400 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-300',
      textColor: 'text-slate-900',
    },
    {
      id: 'explorer',
      title: 'English Explorer',
      tierLabel: '🥇 Gold Tier',
      icon: '🥇',
      unlocked:
        progress.achievements.explorer ||
        (progress.gamesCompleted.matchVocab &&
          progress.gamesCompleted.wordUnscramble &&
          progress.gamesCompleted.sentenceBuilder),
      requirement: 'Complete all 3 interactive mini-games in the Games section.',
      description: 'Conquered matching, unscrambling, and sentence builder!',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-950',
    },
    {
      id: 'master',
      title: 'Self Introduction Master',
      tierLabel: '🏆 Diamond Master Tier',
      icon: '🏆',
      unlocked: progress.achievements.master || progress.quizBestScore >= 80,
      requirement: 'Score 80% or higher (12+ correct) on the 15-question quiz.',
      description: 'The highest honor in Grade 7 Unit 1: About Me!',
      color: 'from-blue-600 via-indigo-600 to-emerald-500',
      bgColor: 'bg-linear-to-br from-blue-50 to-emerald-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-950',
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div id="achievements-section" className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Hall of Fame • Progress Saved in Local Storage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
            Achievement Badges
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Unlock all 4 badges as you learn, chat, play, and ace your self-introduction quiz!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {unlockedCount} of {badges.length} Badges Unlocked
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`rounded-3xl border-2 p-6 transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                b.unlocked
                  ? `${b.bgColor} ${b.borderColor} shadow-md hover:-translate-y-1`
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {/* Glow accent when unlocked */}
              {b.unlocked && (
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500">{b.tierLabel}</span>
                  {b.unlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      <CheckCircle className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[11px] font-bold">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                {/* Big Badge Icon */}
                <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-md bg-white border border-slate-200/80">
                  <span className={b.unlocked ? 'filter-none' : 'grayscale opacity-50'}>
                    {b.icon}
                  </span>
                </div>

                <h3 className={`font-display text-lg font-bold text-center mb-1 ${b.textColor}`}>
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 text-center mb-3 leading-snug">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
                <span className="font-bold text-slate-700 block">How to unlock:</span>
                <span>{b.requirement}</span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

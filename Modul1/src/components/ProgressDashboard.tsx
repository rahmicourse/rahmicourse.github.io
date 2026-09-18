import React from 'react';
import {
  BookOpen,
  MessageSquare,
  Gamepad2,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { UserProgress } from '../types';
import { LESSON_TOPICS } from '../data/lessonsData';
import { playClickSound } from '../utils/sound';

interface ProgressDashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onNavigate: (sectionId: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onResetProgress,
  onNavigate,
}) => {
  const lessonPercent = Math.round((progress.viewedLessons.length / LESSON_TOPICS.length) * 100);

  const completedGamesCount = Object.values(progress.gamesCompleted).filter(Boolean).length;
  const gamesPercent = Math.round((completedGamesCount / 3) * 100);

  const totalPoints =
    progress.highScores.matchVocab +
    progress.highScores.wordUnscramble +
    progress.highScores.sentenceBuilder +
    progress.quizBestScore * 2;

  const handleReset = () => {
    playClickSound();
    if (window.confirm('Do you want to reset your learning progress and restart from the beginning?')) {
      onResetProgress();
    }
  };

  return (
    <div id="progress-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-Time Student Tracker</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Your Learning Progress
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              All milestones are saved automatically in your browser&apos;s Local Storage.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Local Progress</span>
          </button>
        </div>

        {/* 4 Cards requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Learning Progress */}
          <div
            onClick={() => onNavigate('learn')}
            className="bg-white rounded-3xl border-2 border-slate-200/90 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {lessonPercent}%
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                📚 Learning Progress
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {progress.viewedLessons.length} of {LESSON_TOPICS.length} self-introduction topics
                reviewed.
              </p>
            </div>
            <div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${lessonPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-blue-600">Click to resume lessons →</span>
            </div>
          </div>

          {/* Card 2: Conversation Progress */}
          <div
            onClick={() => onNavigate('conversation')}
            className="bg-white rounded-3xl border-2 border-slate-200/90 p-6 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    progress.completedConversation
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {progress.completedConversation ? 'Completed' : 'Not Started'}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                🗣 Conversation Progress
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {progress.completedConversation
                  ? 'Self-introduction summary generated with Galang!'
                  : 'Start chatting with Galang to introduce yourself.'}
              </p>
            </div>
            <div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: progress.completedConversation ? '100%' : '15%' }}
                />
              </div>
              <span className="text-[11px] font-bold text-emerald-600">
                {progress.completedConversation ? 'Open Conversation Lab →' : 'Start Speaking →'}
              </span>
            </div>
          </div>

          {/* Card 3: Game Progress */}
          <div
            onClick={() => onNavigate('games')}
            className="bg-white rounded-3xl border-2 border-slate-200/90 p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {completedGamesCount}/3 Games
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                🎮 Game Progress
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Match Vocab: {progress.gamesCompleted.matchVocab ? '✓' : '—'} • Unscramble:{' '}
                {progress.gamesCompleted.wordUnscramble ? '✓' : '—'} • Builder:{' '}
                {progress.gamesCompleted.sentenceBuilder ? '✓' : '—'}
              </p>
            </div>
            <div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${gamesPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-amber-600">Play mini-games →</span>
            </div>
          </div>

          {/* Card 4: Quiz Progress */}
          <div
            onClick={() => onNavigate('quiz')}
            className="bg-white rounded-3xl border-2 border-slate-200/90 p-6 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  {progress.quizBestScore}% Best
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                ✅ Quiz Progress
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {progress.quizCompletedCount > 0
                  ? `Completed ${progress.quizCompletedCount} attempt(s). Target: 80%+ for Master.`
                  : 'Take the 15-question challenge to earn the Master trophy.'}
              </p>
            </div>
            <div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress.quizBestScore}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-indigo-600">Take Assessment Quiz →</span>
            </div>
          </div>
        </div>

        {/* Total XP / Nusantara Points Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <h4 className="font-display font-bold text-lg">Total Nusantara Learning XP</h4>
              <p className="text-xs text-blue-100">
                Calculated from game high scores and quiz results.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="font-display text-3xl font-extrabold">{totalPoints}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-300">XP Points</span>
          </div>
        </div>
    </div>
  );
};

import React from 'react';
import { Menu, Trophy, Flame, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';

interface TopHeaderProps {
  activeSection: string;
  onOpenMobileMenu: () => void;
  progress: UserProgress;
}

const SECTION_TITLES: Record<string, { title: string; subtitle: string; category: string }> = {
  home: {
    title: 'Welcome to ES TEH Nusantara',
    subtitle: 'English and Technology for Grade 7 SMP Students',
    category: 'Home & Overview',
  },
  learn: {
    title: '8 Self-Introduction Topics',
    subtitle: 'Master key introductory topics with audio pronunciation and vocabulary',
    category: 'Core Lessons',
  },
  grammar: {
    title: 'Grammar Essentials',
    subtitle: 'Personal Pronouns, To Be (am/is/are), and Have/Has rules & interactive checks',
    category: 'Language Rules',
  },
  conversation: {
    title: 'Conversation Lab with Galang',
    subtitle: 'Simulated interactive chat in Grade 7 English with auto summary builder',
    category: 'Speaking Practice',
  },
  games: {
    title: 'Vocabulary & Sentence Mini-Games',
    subtitle: 'Match words, unscramble vocabulary, and build introduction sentences',
    category: 'Fun Practice',
  },
  quiz: {
    title: 'Self-Introduction Assessment Quiz',
    subtitle: '15 multiple-choice questions • Score 80%+ to unlock Diamond Master',
    category: 'Evaluation',
  },
  progress: {
    title: 'Student Progress & Achievement Badges',
    subtitle: 'Track your milestones and unlocked badges stored in Local Storage',
    category: 'My Milestones',
  },
  'ai-corner': {
    title: 'AI Corner: Literasi Kecerdasan Buatan',
    subtitle: 'Pelajari cara menggunakan AI secara bijak, aman, dan bertanggung jawab di era digital',
    category: 'Literasi Digital',
  },
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeSection,
  onOpenMobileMenu,
  progress,
}) => {
  const currentMeta = SECTION_TITLES[activeSection] || SECTION_TITLES.home;

  const totalXP =
    progress.highScores.matchVocab +
    progress.highScores.wordUnscramble +
    progress.highScores.sentenceBuilder +
    progress.quizBestScore * 2;

  const unlockedBadgesCount = Object.values(progress.achievements).filter(Boolean).length;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Active Title Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 hidden sm:inline">
              {currentMeta.category}
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-xs font-semibold text-slate-500">Unit 1: About Me</span>
          </div>
          <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {currentMeta.title}
          </h1>
        </div>
      </div>

      {/* Right Stats & Badges */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* XP Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs font-bold text-amber-900 shadow-xs">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="hidden sm:inline">XP:</span>
          <span>{totalXP}</span>
        </div>

        {/* Badge Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-900 shadow-xs">
          <Trophy className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Badges:</span>
          <span>{unlockedBadgesCount}/4</span>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  Gamepad2,
  CheckCircle2,
  Bot,
  Trophy,
  BookMarked,
  X,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { UserProgress } from '../types';
import { playClickSound } from '../utils/sound';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  progress: UserProgress;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  progress,
  mobileOpen,
  onCloseMobile,
}) => {
  const unlockedBadgesCount = Object.values(progress.achievements).filter(Boolean).length;
  const completedGamesCount = Object.values(progress.gamesCompleted).filter(Boolean).length;

  const totalXP =
    progress.highScores.matchVocab +
    progress.highScores.wordUnscramble +
    progress.highScores.sentenceBuilder +
    progress.quizBestScore * 2;

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      sublabel: 'Overview & Galang',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'learn',
      label: 'Learn',
      sublabel: '8 Self-Intro Topics',
      icon: BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      badge: `${progress.viewedLessons.length}/8`,
    },
    {
      id: 'grammar',
      label: 'Grammar',
      sublabel: 'Pronouns, To Be, Have/Has',
      icon: BookMarked,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'conversation',
      label: 'Conversation Lab',
      sublabel: 'Practice with Galang',
      icon: MessageSquare,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      badge: progress.completedConversation ? 'Done ✓' : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'games',
      label: 'Games',
      sublabel: 'Match, Unscramble, Builder',
      icon: Gamepad2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      badge: completedGamesCount > 0 ? `${completedGamesCount}/3` : undefined,
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      sublabel: '15 Questions Assessment',
      icon: CheckCircle2,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      badge: progress.quizBestScore > 0 ? `${progress.quizBestScore}%` : undefined,
      badgeColor: progress.quizBestScore >= 80 ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-800',
    },
    {
      id: 'progress',
      label: 'Progress & Badges',
      sublabel: 'My Stats & Trophies',
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      badge: `${unlockedBadgesCount}/4`,
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'ai-corner',
      label: 'AI Corner',
      sublabel: 'Literasi AI & Ikrar',
      icon: Bot,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  const handleItemClick = (id: string) => {
    playClickSound();
    onSelectSection(id);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-emerald-500 to-amber-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              <span className="text-2xl select-none" role="img" aria-label="tea cup">
                🍵
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  ES TEH
                </span>
                <span className="px-1.5 py-0.2 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                  Grade 7
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">
                English and Technology for Nusantara
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Student Mini Stats */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-slate-800">{totalXP} XP</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-800">{unlockedBadgesCount}/4 Badges</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5" role="navigation">
        <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
          Menu Pembelajaran
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all duration-150 cursor-pointer group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold scale-[1.01]'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : `${item.bgColor} ${item.color} group-hover:scale-105`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-sm block leading-tight truncate">{item.label}</span>
                  <span
                    className={`text-[11px] block leading-tight truncate font-normal ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {item.sublabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : item.badgeColor || 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info at bottom of sidebar */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700">English for Nusantara</span>
        </div>
        <p className="text-[10px] leading-snug text-slate-400">
          Dev by Rahmi Sukmawidianto • © 2026
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 xl:w-80 z-30 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Backdrop & Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

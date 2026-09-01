import React from 'react';
import { ShieldCheck, Sparkles, BookOpen, MessageCircle, Puzzle, PenTool, Award, Home } from 'lucide-react';
import { AppMode } from '../types';

interface NavbarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentMode, onSelectMode }) => {
  const navItems: { id: AppMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'conversation', label: 'Chat Tutor', icon: <MessageCircle className="w-4 h-4" />, badge: 'AI' },
    { id: 'vocabulary', label: 'Vocabulary', icon: <Puzzle className="w-4 h-4" /> },
    { id: 'grammar', label: 'Grammar', icon: <PenTool className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="btn-nav-brand"
          onClick={() => onSelectMode('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            👋
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-800 tracking-tight font-display">
                English Buddy
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded-md">
                Grade 7
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Introducing & Meeting New People
            </p>
          </div>
        </button>

        {/* Navigation Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
          {navItems.map((item) => {
            const isActive = currentMode === item.id;
            return (
              <button
                key={item.id}
                id={`btn-nav-${item.id}`}
                onClick={() => onSelectMode(item.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-xs shadow-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-amber-400 text-slate-900 font-black px-1.5 py-0.2 rounded-full uppercase leading-tight">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Safe Badge Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Safe Learning</span>
            <span className="sm:hidden">Safe</span>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden border-t border-slate-100 bg-white px-2 py-1.5 flex items-center justify-between overflow-x-auto gap-1 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentMode === item.id;
          return (
            <button
              key={item.id}
              id={`btn-mob-nav-${item.id}`}
              onClick={() => onSelectMode(item.id)}
              className={`flex-1 min-w-[62px] py-1.5 px-2 rounded-xl flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200/60'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <div className="text-base">{item.icon}</div>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

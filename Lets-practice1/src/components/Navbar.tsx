import React, { useState } from 'react';
import { Sparkles, Menu, X, BookOpen, MessageSquare, Gamepad2, CheckCircle2, Bot, Trophy } from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  progress: UserProgress;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, progress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate unlocked achievements count
  const unlockedBadgesCount = Object.values(progress.achievements).filter(Boolean).length;

  const menuItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'conversation', label: 'Conversation Lab', icon: MessageSquare },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle2 },
    { id: 'ai-corner', label: 'AI Corner', icon: Bot },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <div
            id="brand-logo"
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-emerald-500 to-amber-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl select-none" role="img" aria-label="tea cup">
                🍵
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  ES TEH Nusantara
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  Grade 7
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 hidden sm:block">
                English and Technology for Nusantara
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Stats Pill (Achievements & Quiz Score) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleItemClick('achievements')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs hover:bg-amber-100 transition-colors cursor-pointer"
              title="View Achievements"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{unlockedBadgesCount}/4 Badges</span>
            </button>

            {progress.quizBestScore > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quiz: {progress.quizBestScore}%</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleItemClick('achievements')}
              className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200"
              aria-label="Achievements"
            >
              <Trophy className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1.5 shadow-lg">
          <p className="text-xs font-semibold uppercase text-slate-400 px-3 py-1">
            English and Technology for Nusantara
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs text-slate-500">
            <span>English for Nusantara - Grade 7</span>
            <span>Made with ❤️ for Indonesia</span>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-emerald-400 to-amber-500 flex items-center justify-center text-xl">
                🍵
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">ES TEH Nusantara | Grade 7</h3>
                <p className="text-xs text-slate-400">English and Technology for Nusantara</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              An educational web application designed for Indonesian Junior High School (SMP)
              Grade 7 students to master English self-introductions in English for Nusantara.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Learning Sections
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  8 Self-Intro Topics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('grammar')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Grammar (Pronouns, To Be, Have/Has)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('conversation')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Conversation Lab with Galang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('games')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  3 Interactive Mini-Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  15-Question Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Credits & Tech info */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Developer</h4>
            <p className="text-xs text-slate-300 font-semibold">Rahmi Sukmawidianto</p>
            <p className="text-xs text-slate-400">
              English and Technology Educational Expert for Nusantara
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-semibold text-emerald-400 border border-slate-700">
                <span>🌱 SMP Grade 7</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 All Rights Reserved</p>
          <p className="flex items-center gap-1">
            <span>Developed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>by Rahmi Sukmawidianto for Indonesian Students</span>
          </p>
          <p className="text-[11px]">Deployable to GitHub Pages • Client-Side SPA</p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, BookOpen, Award, CheckCircle } from 'lucide-react';
import { StudentIllustration } from './StudentIllustration';

interface HeroSectionProps {
  onStartLearning: () => void;
  onMeetGalang: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartLearning, onMeetGalang }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200/90 p-6 sm:p-10 lg:p-12 bg-linear-to-b from-blue-50/80 via-emerald-50/40 to-white shadow-xs">
      {/* Decorative Floating Blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Tag / Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-blue-900 border border-blue-200/70 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>SMP Grade 7 • English for Nusantara</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              👋 Learn English Through{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-emerald-600 to-amber-600">
                Self Introduction
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master self-introduction through lessons, games, conversations, and challenges.
              Practice speaking with your friend Galang from Kalimantan!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-btn-start-learning"
                onClick={onStartLearning}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-150 btn-3d-green cursor-pointer"
              >
                <BookOpen className="w-5 h-5" />
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-btn-meet-galang"
                onClick={onMeetGalang}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-150 btn-3d-blue cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Meet Galang</span>
              </button>
            </div>

            {/* Mini Feature Badges for Grade 7 */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">8 Topics</p>
                  <p className="text-[11px] text-slate-500">Self Intro</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Live Sim</p>
                  <p className="text-[11px] text-slate-500">Talk to Galang</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">15 Quizzes</p>
                  <p className="text-[11px] text-slate-500">Badges & XP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Vector Illustration of Indonesian SMP Students */}
          <div className="lg:col-span-5 flex justify-center">
            <StudentIllustration className="transform hover:scale-[1.02] transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

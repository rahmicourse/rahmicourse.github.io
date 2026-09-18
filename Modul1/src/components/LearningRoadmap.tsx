import React from 'react';
import { BookOpen, MessageSquare, Gamepad2, CheckCircle2, Trophy, ArrowRight, Check } from 'lucide-react';
import { UserProgress } from '../types';

interface LearningRoadmapProps {
  progress: UserProgress;
  onSelectStep: (stepId: string) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ progress, onSelectStep }) => {
  const steps = [
    {
      id: 'learn',
      number: '1',
      title: 'Learn',
      subtitle: '8 Introduction Topics & Grammar',
      icon: BookOpen,
      color: 'blue',
      isCompleted: progress.viewedLessons.length >= 4,
      statusText: `${progress.viewedLessons.length}/8 Topics studied`,
    },
    {
      id: 'conversation',
      number: '2',
      title: 'Practice',
      subtitle: 'Chat & Introduce to Galang',
      icon: MessageSquare,
      color: 'emerald',
      isCompleted: progress.completedConversation,
      statusText: progress.completedConversation ? 'Conversation Completed!' : 'Ready to practice',
    },
    {
      id: 'games',
      number: '3',
      title: 'Play',
      subtitle: 'Match, Unscramble & Sentence Builder',
      icon: Gamepad2,
      color: 'amber',
      isCompleted: Object.values(progress.gamesCompleted).filter(Boolean).length >= 2,
      statusText: `${Object.values(progress.gamesCompleted).filter(Boolean).length}/3 Mini-Games done`,
    },
    {
      id: 'quiz',
      number: '4',
      title: 'Quiz',
      subtitle: '15 Questions Challenge',
      icon: CheckCircle2,
      color: 'indigo',
      isCompleted: progress.quizBestScore >= 80,
      statusText: progress.quizBestScore > 0 ? `Best Score: ${progress.quizBestScore}%` : 'Take Quiz',
    },
    {
      id: 'achievements',
      number: '5',
      title: 'Achievement',
      subtitle: 'Unlock Master Badges',
      icon: Trophy,
      color: 'purple',
      isCompleted: progress.achievements.master,
      statusText: progress.achievements.master ? 'Master Unlocked!' : 'Collect Badges',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <span>🗺️ Visual Learning Journey</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Your 5-Step Roadmap to English Mastery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Follow the path from basic vocabulary to holding conversations and unlocking your master achievement.
          </p>
        </div>

        {/* Desktop & Tablet Roadmap (Horizontal Track) */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1.5 bg-slate-200 -translate-y-6 z-0 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  id={`roadmap-step-${step.id}`}
                  onClick={() => onSelectStep(step.id)}
                  className={`group relative bg-white rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                    step.isCompleted
                      ? 'border-emerald-500 shadow-xs ring-4 ring-emerald-50'
                      : 'border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div>
                    {/* Top row: Badge & Completion check */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 font-display font-bold text-slate-700 flex items-center justify-center text-sm group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                        0{step.number}
                      </span>
                      {step.isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                          <Check className="w-3 h-3 stroke-[3]" /> Done
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">Step {step.number}</span>
                      )}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                          step.color === 'blue'
                            ? 'bg-blue-600'
                            : step.color === 'emerald'
                            ? 'bg-emerald-600'
                            : step.color === 'amber'
                            ? 'bg-amber-500'
                            : step.color === 'indigo'
                            ? 'bg-indigo-600'
                            : 'bg-purple-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 mb-4 leading-snug">{step.subtitle}</p>
                  </div>

                  {/* Bottom Status text */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold ${
                        step.isCompleted ? 'text-emerald-600' : 'text-slate-500'
                      }`}
                    >
                      {step.statusText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

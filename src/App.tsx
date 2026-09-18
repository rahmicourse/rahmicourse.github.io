import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { HeroSection } from './components/HeroSection';
import { LearningRoadmap } from './components/LearningRoadmap';
import { LearnSection } from './components/LearnSection';
import { GrammarSection } from './components/GrammarSection';
import { CharacterSection } from './components/CharacterSection';
import { ConversationLab } from './components/ConversationLab';
import { GamesSection } from './components/GamesSection';
import { QuizSection } from './components/QuizSection';
import { AchievementSection } from './components/AchievementSection';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AiCornerSection } from './components/AiCornerSection';
import { Footer } from './components/Footer';
import { UserProgress } from './types';
import { loadProgress, saveProgress, resetStoredProgress } from './utils/storage';
import { Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationFanfare } from './utils/sound';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toastBadge, setToastBadge] = useState<string | null>(null);

  // Sync progress to Local Storage whenever progress updates
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Scroll to top when active section changes for clean focus
  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Unlock an achievement badge and trigger celebratory toast
  const handleUnlockAchievement = (badgeId: string) => {
    const badgeNames: Record<string, string> = {
      beginner: '🥉 Beginner',
      communicator: '🥈 Communicator',
      explorer: '🥇 English Explorer',
      master: '🏆 Self Introduction Master',
    };

    const name = badgeNames[badgeId] || badgeId;
    setToastBadge(name);
    setTimeout(() => {
      setToastBadge(null);
    }, 4500);
  };

  // Mark lesson topic as viewed in progress
  const handleMarkLessonViewed = (topicId: string) => {
    setProgress((prev) => {
      if (prev.viewedLessons.includes(topicId)) return prev;
      const updated = [...prev.viewedLessons, topicId];
      // If user viewed at least 1 lesson, award Beginner badge
      const updatedAchievements = { ...prev.achievements, beginner: true };
      if (!prev.achievements.beginner) {
        handleUnlockAchievement('beginner');
      }
      return {
        ...prev,
        viewedLessons: updated,
        achievements: updatedAchievements,
      };
    });
  };

  // Reset progress handler
  const handleResetProgress = () => {
    const resetData = resetStoredProgress();
    setProgress(resetData);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex">
      {/* Floating Achievement Unlock Notification */}
      {toastBadge && (
        <div className="fixed top-5 right-5 sm:right-8 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                Badge Unlocked!
              </span>
              <p className="font-display font-bold text-sm">{toastBadge}</p>
            </div>
            <button
              onClick={() => setToastBadge(null)}
              className="ml-2 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LEFT COLUMN: Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        progress={progress}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* RIGHT COLUMN: Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 xl:pl-80">
        {/* Sticky Header with active title & stats */}
        <TopHeader
          activeSection={activeSection}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          progress={progress}
        />

        {/* Dynamic Main View - Only shows the currently clicked menu */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* SECTION 1: HOME */}
          {activeSection === 'home' && (
            <div className="space-y-10 animate-in fade-in duration-200">
              <HeroSection
                onStartLearning={() => handleSelectSection('learn')}
                onMeetGalang={() => handleSelectSection('character')}
              />

              {/* Visual Learning Journey Roadmap with direct links */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xs">
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                    Alur Belajar Mandiri
                  </span>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    5-Step Learning Roadmap
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Click any step below or use the left menu to jump straight into each activity!
                  </p>
                </div>
                <LearningRoadmap
                  progress={progress}
                  onSelectStep={(stepId) => handleSelectSection(stepId)}
                />
              </div>

              {/* Galang Spotlight in Home */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xs">
                <CharacterSection
                  onStartChatWithGalang={() => handleSelectSection('conversation')}
                />
              </div>
            </div>
          )}

          {/* SECTION 2: LEARN */}
          {activeSection === 'learn' && (
            <div className="animate-in fade-in duration-200">
              <LearnSection
                viewedLessons={progress.viewedLessons}
                onMarkLessonViewed={handleMarkLessonViewed}
              />
            </div>
          )}

          {/* SECTION 3: GRAMMAR */}
          {activeSection === 'grammar' && (
            <div className="animate-in fade-in duration-200">
              <GrammarSection />
            </div>
          )}

          {/* SECTION 4: CHARACTER (Galang) */}
          {activeSection === 'character' && (
            <div className="animate-in fade-in duration-200">
              <CharacterSection
                onStartChatWithGalang={() => handleSelectSection('conversation')}
              />
            </div>
          )}

          {/* SECTION 5: CONVERSATION LAB */}
          {activeSection === 'conversation' && (
            <div className="animate-in fade-in duration-200">
              <ConversationLab
                progress={progress}
                onUpdateProgress={setProgress}
                onUnlockAchievement={handleUnlockAchievement}
              />
            </div>
          )}

          {/* SECTION 6: GAMES */}
          {activeSection === 'games' && (
            <div className="animate-in fade-in duration-200">
              <GamesSection
                progress={progress}
                onUpdateProgress={setProgress}
                onUnlockAchievement={handleUnlockAchievement}
              />
            </div>
          )}

          {/* SECTION 7: QUIZ */}
          {activeSection === 'quiz' && (
            <div className="animate-in fade-in duration-200">
              <QuizSection
                progress={progress}
                onUpdateProgress={setProgress}
                onUnlockAchievement={handleUnlockAchievement}
              />
            </div>
          )}

          {/* SECTION 8: PROGRESS & BADGES */}
          {activeSection === 'progress' && (
            <div className="space-y-10 animate-in fade-in duration-200">
              <ProgressDashboard
                progress={progress}
                onResetProgress={handleResetProgress}
                onNavigate={handleSelectSection}
              />
              <AchievementSection progress={progress} />
            </div>
          )}

          {/* SECTION 9: AI CORNER */}
          {activeSection === 'ai-corner' && (
            <div className="animate-in fade-in duration-200">
              <AiCornerSection />
            </div>
          )}
        </main>

        {/* Clean Footer */}
        <Footer onNavigate={handleSelectSection} />
      </div>
    </div>
  );
}

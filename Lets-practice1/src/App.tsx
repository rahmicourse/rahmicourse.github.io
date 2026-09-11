import React, { useState, useEffect } from 'react';
import { AppMode } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { ConversationView } from './components/ConversationView';
import { VocabularyView } from './components/VocabularyView';
import { GrammarView } from './components/GrammarView';
import { QuizView } from './components/QuizView';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('home');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation Bar */}
      <Navbar currentMode={currentMode} onSelectMode={setCurrentMode} />

      {/* Main View Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {currentMode === 'home' && (
          <HomeView onSelectMode={setCurrentMode} />
        )}

        {currentMode === 'learn' && (
          <LearnView
            onBackToHome={() => setCurrentMode('home')}
            onGoToConversation={() => setCurrentMode('conversation')}
          />
        )}

        {currentMode === 'conversation' && (
          <ConversationView
            onBackToHome={() => setCurrentMode('home')}
            onGoToVocabulary={() => setCurrentMode('vocabulary')}
          />
        )}

        {currentMode === 'vocabulary' && (
          <VocabularyView
            onBackToHome={() => setCurrentMode('home')}
            onGoToGrammar={() => setCurrentMode('grammar')}
          />
        )}

        {currentMode === 'grammar' && (
          <GrammarView
            onBackToHome={() => setCurrentMode('home')}
            onGoToQuiz={() => setCurrentMode('quiz')}
          />
        )}

        {currentMode === 'quiz' && (
          <QuizView
            onBackToHome={() => setCurrentMode('home')}
            onGoToLearn={() => setCurrentMode('learn')}
          />
        )}
      </main>

      {/* Simple, Clean Educational Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-slate-700">
            English Buddy 👋 • Introducing & Meeting New People
          </p>
          <p className="text-slate-400">
           Developed by Rahmi Sukmawidianto ❤️ Powered by Google AI Studio Junior
          </p>
        </div>
      </footer>
    </div>
  );
}

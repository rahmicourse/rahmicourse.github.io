import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Award,
  Sparkles,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { UserProgress } from '../types';
import { playChimeSound, playWrongSound, playClickSound, playCelebrationFanfare } from '../utils/sound';

interface QuizSectionProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onUnlockAchievement: (badgeId: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  progress: _progress,
  onUpdateProgress,
  onUnlockAchievement,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Array<{ questionId: number; isCorrect: boolean }>>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + (hasAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  const handleSelectOption = (optIndex: number) => {
    if (hasAnswered) return;
    playClickSound();
    setSelectedOption(optIndex);
    setHasAnswered(true);

    const isCorrect = optIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      playChimeSound();
      setScore((prev) => prev + 1);
    } else {
      playWrongSound();
    }

    setUserAnswers((prev) => [...prev, { questionId: currentQuestion.id, isCorrect }]);
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Quiz finished
      const finalScorePercent = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 0 : 0)) / QUIZ_QUESTIONS.length) * 100);
      setQuizFinished(true);

      const isMaster = finalScorePercent >= 80;
      if (isMaster) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
        playCelebrationFanfare();
        onUnlockAchievement('master');
      }

      onUpdateProgress((prev) => ({
        ...prev,
        quizBestScore: Math.max(prev.quizBestScore, finalScorePercent),
        quizCompletedCount: prev.quizCompletedCount + 1,
        achievements: {
          ...prev.achievements,
          beginner: true, // Beginner badge earned on attempting/finishing quiz or lessons
          ...(isMaster ? { master: true } : {}),
        },
      }));
    }
  };

  const handleRetakeQuiz = () => {
    playClickSound();
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setQuizFinished(false);
  };

  const scorePercentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const isMaster = scorePercentage >= 80;

  return (
    <div id="quiz-section" className="space-y-6 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Trophy className="w-3.5 h-3.5 text-blue-600" />
            <span>Grade 7 Assessment • 15 Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
            Self-Introduction Mastery Quiz
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Test your knowledge across Vocabulary, Pronouns, To Be, and Have/Has. Score 80%+ to earn
            the Master trophy!
          </p>
        </div>

        {quizFinished ? (
          /* Final Results Screen */
          <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-8 sm:p-12 text-center shadow-xl space-y-6">
            <div className="relative inline-block">
              <div
                className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg ${
                  isMaster ? 'bg-amber-100 ring-8 ring-amber-50' : 'bg-blue-100 ring-8 ring-blue-50'
                }`}
              >
                {isMaster ? '🏆' : '👏'}
              </div>
            </div>

            <div>
              {isMaster ? (
                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-sm border border-amber-300 shadow-xs">
                    ACHIEVEMENT UNLOCKED
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                    🏆 Self Introduction Master
                  </h3>
                  <p className="text-emerald-700 font-bold text-base">
                    Incredible mastery! You scored {scorePercentage}% on the Grade 7 English assessment.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    Good Effort! Keep Practicing!
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    You scored {scorePercentage}% ({score} out of 15 questions correct). Review the lessons
                    and try again to reach 80% for the Master badge!
                  </p>
                </div>
              )}
            </div>

            {/* Score Breakdown Pill */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Total Score</span>
                <span className="font-display text-2xl font-bold text-slate-900">{score} / 15</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Percentage</span>
                <span
                  className={`font-display text-2xl font-bold ${
                    isMaster ? 'text-amber-600' : 'text-blue-600'
                  }`}
                >
                  {scorePercentage}%
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button
                id="btn-retake-quiz"
                onClick={handleRetakeQuiz}
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 btn-3d-blue cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Quiz Card */
          <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8">
            {/* Top Bar: Progress & Topic Tag */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Topic: {currentQuestion.topic}</span>
                </span>
                <span>
                  Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;

                let optClass =
                  'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';

                if (hasAnswered) {
                  if (isCorrect) {
                    optClass =
                      'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    optClass =
                      'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                  } else {
                    optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-semibold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl font-display font-bold flex items-center justify-center text-xs ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Box */}
            {hasAnswered && (
              <div
                className={`p-4 rounded-2xl border mb-6 text-sm flex items-start gap-3 animate-in fade-in duration-200 ${
                  selectedOption === currentQuestion.correctIndex
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {selectedOption === currentQuestion.correctIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">
                    {selectedOption === currentQuestion.correctIndex
                      ? 'Correct!'
                      : 'Incorrect!'}
                  </p>
                  <p className="text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Next Question Navigation */}
            <div className="flex justify-end">
              <button
                id="btn-next-question"
                disabled={!hasAnswered}
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-sm flex items-center gap-2 btn-3d-blue cursor-pointer"
              >
                <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'See Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Gamepad2,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Trophy,
  ArrowRight,
  Check,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';
import { VOCAB_PAIRS, UNSCRAMBLE_WORDS, SENTENCE_BUILDER_ITEMS } from '../data/gamesData';
import { playChimeSound, playWrongSound, playClickSound, playCelebrationFanfare } from '../utils/sound';

interface GamesSectionProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onUnlockAchievement: (badgeId: string) => void;
}

type ActiveGameTab = 'match' | 'unscramble' | 'builder';

export const GamesSection: React.FC<GamesSectionProps> = ({
  progress,
  onUpdateProgress,
  onUnlockAchievement,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGameTab>('match');

  // GAME 1: VOCABULARY MATCH
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState<number>(0);
  const [matchWrongTries, setMatchWrongTries] = useState<number>(0);

  // GAME 2: WORD UNSCRAMBLE
  const [unscrambleIndex, setUnscrambleIndex] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [unscrambleScore, setUnscrambleScore] = useState<number>(0);
  const [unscrambleFinished, setUnscrambleFinished] = useState<boolean>(false);
  const [unscrambleFeedback, setUnscrambleFeedback] = useState<'correct' | 'wrong' | null>(null);

  // GAME 3: SENTENCE BUILDER
  const [builderIndex, setBuilderIndex] = useState<number>(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [builderScore, setBuilderScore] = useState<number>(0);
  const [builderFinished, setBuilderFinished] = useState<boolean>(false);
  const [builderFeedback, setBuilderFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Check achievements when games complete
  const checkExplorerAchievement = (updatedCompleted: {
    matchVocab: boolean;
    wordUnscramble: boolean;
    sentenceBuilder: boolean;
  }) => {
    if (
      updatedCompleted.matchVocab &&
      updatedCompleted.wordUnscramble &&
      updatedCompleted.sentenceBuilder
    ) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      playCelebrationFanfare();
      onUpdateProgress((prev) => ({
        ...prev,
        achievements: { ...prev.achievements, explorer: true },
      }));
      onUnlockAchievement('explorer');
    }
  };

  // --- GAME 1 HANDLERS ---
  const handleSelectEnglish = (pairId: string) => {
    playClickSound();
    setSelectedEnglish(pairId);
  };

  const handleSelectIndonesian = (pairId: string) => {
    if (!selectedEnglish) return;
    playClickSound();

    if (selectedEnglish === pairId) {
      // Match!
      playChimeSound();
      const newMatched = [...matchedIds, pairId];
      setMatchedIds(newMatched);
      setSelectedEnglish(null);
      const newScore = matchScore + 10;
      setMatchScore(newScore);

      if (newMatched.length === VOCAB_PAIRS.length) {
        // Complete!
        confetti({ particleCount: 60, spread: 60 });
        playCelebrationFanfare();
        onUpdateProgress((prev) => {
          const updatedGames = { ...prev.gamesCompleted, matchVocab: true };
          const updatedHigh = {
            ...prev.highScores,
            matchVocab: Math.max(prev.highScores.matchVocab, newScore),
          };
          checkExplorerAchievement(updatedGames);
          return { ...prev, gamesCompleted: updatedGames, highScores: updatedHigh };
        });
      }
    } else {
      // Wrong!
      playWrongSound();
      setMatchWrongTries((prev) => prev + 1);
      setSelectedEnglish(null);
    }
  };

  const resetMatchGame = () => {
    playClickSound();
    setMatchedIds([]);
    setSelectedEnglish(null);
    setMatchScore(0);
    setMatchWrongTries(0);
  };

  // --- GAME 2 HANDLERS ---
  const currentUnscramble = UNSCRAMBLE_WORDS[unscrambleIndex];

  const handleAddLetter = (letter: string, indexInScrambled: number) => {
    playClickSound();
    setCurrentGuess((prev) => [...prev, letter]);
  };

  const handleRemoveGuessLetter = (index: number) => {
    playClickSound();
    setCurrentGuess((prev) => prev.filter((_, i) => i !== index));
    setUnscrambleFeedback(null);
  };

  const handleCheckUnscramble = () => {
    const guessWord = currentGuess.join('');
    if (guessWord === currentUnscramble.correct) {
      playChimeSound();
      setUnscrambleFeedback('correct');
      const newScore = unscrambleScore + 15;
      setUnscrambleScore(newScore);

      setTimeout(() => {
        setUnscrambleFeedback(null);
        setCurrentGuess([]);
        if (unscrambleIndex + 1 < UNSCRAMBLE_WORDS.length) {
          setUnscrambleIndex(unscrambleIndex + 1);
        } else {
          setUnscrambleFinished(true);
          confetti({ particleCount: 60, spread: 60 });
          playCelebrationFanfare();
          onUpdateProgress((prev) => {
            const updatedGames = { ...prev.gamesCompleted, wordUnscramble: true };
            const updatedHigh = {
              ...prev.highScores,
              wordUnscramble: Math.max(prev.highScores.wordUnscramble, newScore),
            };
            checkExplorerAchievement(updatedGames);
            return { ...prev, gamesCompleted: updatedGames, highScores: updatedHigh };
          });
        }
      }, 1100);
    } else {
      playWrongSound();
      setUnscrambleFeedback('wrong');
    }
  };

  const resetUnscrambleGame = () => {
    playClickSound();
    setUnscrambleIndex(0);
    setCurrentGuess([]);
    setUnscrambleScore(0);
    setUnscrambleFinished(false);
    setUnscrambleFeedback(null);
  };

  // --- GAME 3 HANDLERS ---
  const currentSentenceItem = SENTENCE_BUILDER_ITEMS[builderIndex];

  const handleAddToken = (token: string) => {
    playClickSound();
    setSelectedTokens((prev) => [...prev, token]);
  };

  const handleRemoveToken = (index: number) => {
    playClickSound();
    setSelectedTokens((prev) => prev.filter((_, i) => i !== index));
    setBuilderFeedback(null);
  };

  const handleCheckSentence = () => {
    const builtSentence = selectedTokens.join(' ');
    if (builtSentence === currentSentenceItem.correctSentence) {
      playChimeSound();
      setBuilderFeedback('correct');
      const newScore = builderScore + 20;
      setBuilderScore(newScore);

      setTimeout(() => {
        setBuilderFeedback(null);
        setSelectedTokens([]);
        if (builderIndex + 1 < SENTENCE_BUILDER_ITEMS.length) {
          setBuilderIndex(builderIndex + 1);
        } else {
          setBuilderFinished(true);
          confetti({ particleCount: 70, spread: 70 });
          playCelebrationFanfare();
          onUpdateProgress((prev) => {
            const updatedGames = { ...prev.gamesCompleted, sentenceBuilder: true };
            const updatedHigh = {
              ...prev.highScores,
              sentenceBuilder: Math.max(prev.highScores.sentenceBuilder, newScore),
            };
            checkExplorerAchievement(updatedGames);
            return { ...prev, gamesCompleted: updatedGames, highScores: updatedHigh };
          });
        }
      }, 1200);
    } else {
      playWrongSound();
      setBuilderFeedback('wrong');
    }
  };

  const resetSentenceBuilder = () => {
    playClickSound();
    setBuilderIndex(0);
    setSelectedTokens([]);
    setBuilderScore(0);
    setBuilderFinished(false);
    setBuilderFeedback(null);
  };

  return (
    <div id="games-section" className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-amber-700" />
          <span>Interactive Learning Games • Play & Learn</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Self-Introduction Mini Games
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Reinforce your vocabulary and sentence patterns through three fun, interactive games!
        </p>
      </div>

        {/* Game Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                playClickSound();
                setActiveGame('match');
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeGame === 'match'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>1. Match Vocabulary</span>
              {progress.gamesCompleted.matchVocab && (
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-200" />
              )}
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveGame('unscramble');
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeGame === 'unscramble'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>2. Word Unscramble</span>
              {progress.gamesCompleted.wordUnscramble && (
                <Check className="w-3.5 h-3.5 stroke-[3] text-blue-200" />
              )}
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveGame('builder');
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeGame === 'builder'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>3. Sentence Builder</span>
              {progress.gamesCompleted.sentenceBuilder && (
                <Check className="w-3.5 h-3.5 stroke-[3] text-amber-200" />
              )}
            </button>
          </div>
        </div>

        {/* GAME 1: MATCH VOCABULARY */}
        {activeGame === 'match' && (
          <div className="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 mb-6 gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>Match English Words with Indonesian Meaning</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Click an English word on the left, then click its corresponding Indonesian meaning on the right.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-emerald-700">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Score: {matchScore} pts</span>
                </div>
                <button
                  onClick={resetMatchGame}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  title="Reset Game"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {matchedIds.length === VOCAB_PAIRS.length ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-md">
                  🏆
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Congratulations! All Matched!
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  You successfully mastered all vocabulary pairs with a score of {matchScore} points!
                </p>
                <button
                  onClick={resetMatchGame}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm btn-3d-green cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: English Words */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    🇬🇧 English Words
                  </h4>
                  {VOCAB_PAIRS.map((pair) => {
                    const isMatched = matchedIds.includes(pair.id);
                    const isSelected = selectedEnglish === pair.id;
                    return (
                      <button
                        key={`en-${pair.id}`}
                        disabled={isMatched}
                        onClick={() => handleSelectEnglish(pair.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 pointer-events-none'
                            : isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-102 ring-2 ring-blue-300'
                            : 'bg-white border-slate-200 hover:border-blue-400 text-slate-800 shadow-xs'
                        }`}
                      >
                        <span className="text-base">{pair.english}</span>
                        {isMatched ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <span className="text-xs font-normal text-slate-400">Tap to select</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Indonesian Meanings (shuffled display order) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    🇮🇩 Indonesian Meanings
                  </h4>
                  {/* Stable shuffle using pair ID modulo offset */}
                  {[...VOCAB_PAIRS]
                    .reverse()
                    .map((pair) => {
                      const isMatched = matchedIds.includes(pair.id);
                      return (
                        <button
                          key={`id-${pair.id}`}
                          disabled={isMatched}
                          onClick={() => handleSelectIndonesian(pair.id)}
                          className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 pointer-events-none'
                              : selectedEnglish
                              ? 'bg-white border-blue-300 hover:bg-blue-50 text-slate-800 hover:scale-101 shadow-xs ring-1 ring-blue-100'
                              : 'bg-white border-slate-200 text-slate-800 opacity-80'
                          }`}
                        >
                          <span className="text-base">{pair.indonesian}</span>
                          {isMatched ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <span className="text-xs font-normal text-slate-400">Tap to match</span>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAME 2: WORD UNSCRAMBLE */}
        {activeGame === 'unscramble' && (
          <div className="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Word {unscrambleIndex + 1} of {UNSCRAMBLE_WORDS.length}
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Word Unscramble Challenge
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-blue-700">
                  Score: {unscrambleScore} pts
                </div>
                <button
                  onClick={resetUnscrambleGame}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  title="Reset Game"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {unscrambleFinished ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center text-4xl shadow-md">
                  🎉
                </div>
                <h4 className="font-display text-2xl font-bold text-slate-900">
                  Word Unscramble Completed!
                </h4>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                  Awesome vocabulary spelling! You earned a total of {unscrambleScore} points.
                </p>
                <button
                  onClick={resetUnscrambleGame}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm btn-3d-blue cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Hints box */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
                  <p className="text-xs font-bold uppercase text-blue-700">Hint:</p>
                  <p className="text-sm font-medium mt-0.5">{currentUnscramble.hint}</p>
                  <p className="text-xs text-blue-600 italic mt-0.5">
                    Petunjuk: {currentUnscramble.indonesianHint}
                  </p>
                </div>

                {/* Scrambled Word Display */}
                <div className="text-center py-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Scrambled:</span>
                  <div className="flex justify-center gap-2 mt-2">
                    {currentUnscramble.scrambled.split('').map((letter, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddLetter(letter, i)}
                        className="w-11 h-12 rounded-xl bg-white border-2 border-slate-300 font-display text-xl font-bold text-slate-800 shadow-xs hover:border-blue-500 hover:scale-105 transition-all cursor-pointer"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Your Guess Area */}
                <div className="p-5 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                  <span className="text-xs text-slate-400 font-semibold uppercase block mb-2">
                    Your Answer (Click a letter to remove):
                  </span>
                  <div className="flex justify-center gap-2 min-h-[48px] items-center">
                    {currentGuess.length === 0 ? (
                      <span className="text-xs text-slate-400 italic">
                        Tap letters above to spell the word...
                      </span>
                    ) : (
                      currentGuess.map((letter, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveGuessLetter(idx)}
                          className="w-10 h-11 rounded-xl bg-blue-600 text-white font-display text-lg font-bold shadow-xs hover:bg-red-500 transition-colors cursor-pointer"
                        >
                          {letter}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Feedback message */}
                {unscrambleFeedback === 'correct' && (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-center text-sm font-bold flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" /> Correct! Moving to next word...
                  </div>
                )}
                {unscrambleFeedback === 'wrong' && (
                  <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-center text-sm font-bold">
                    Oops, not quite! Check the spelling and try again.
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setCurrentGuess([])}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Clear Letters
                  </button>

                  <button
                    onClick={handleCheckUnscramble}
                    disabled={currentGuess.length !== currentUnscramble.correct.length}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-sm btn-3d-blue cursor-pointer"
                  >
                    Check Word
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: SENTENCE BUILDER */}
        {activeGame === 'builder' && (
          <div className="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Sentence {builderIndex + 1} of {SENTENCE_BUILDER_ITEMS.length}
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Sentence Builder Challenge
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-amber-700">
                  Score: {builderScore} pts
                </div>
                <button
                  onClick={resetSentenceBuilder}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  title="Reset Game"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {builderFinished ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-4xl shadow-md">
                  🌟
                </div>
                <h4 className="font-display text-2xl font-bold text-slate-900">
                  Sentence Builder Complete!
                </h4>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                  You arranged all sentences with proper Grade 7 grammar! Final score: {builderScore} points.
                </p>
                <button
                  onClick={resetSentenceBuilder}
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm btn-3d-orange cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                  <p className="text-xs font-bold uppercase text-amber-800">Target Meaning (Arti):</p>
                  <p className="text-base font-bold text-amber-950 mt-0.5">
                    &ldquo;{currentSentenceItem.translation}&rdquo;
                  </p>
                </div>

                {/* Available Word Chips */}
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase block mb-2">
                    Available Words (Tap to place):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentSentenceItem.scrambledTokens.map((token, i) => {
                      const countInScrambled = currentSentenceItem.scrambledTokens.filter(
                        (t) => t === token
                      ).length;
                      const countInSelected = selectedTokens.filter((t) => t === token).length;
                      const isUsed = countInSelected >= countInScrambled;

                      return (
                        <button
                          key={i}
                          disabled={isUsed}
                          onClick={() => handleAddToken(token)}
                          className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                            isUsed
                              ? 'bg-slate-200 border-slate-200 text-slate-400 opacity-50 pointer-events-none'
                              : 'bg-white border-slate-300 text-slate-800 hover:border-amber-500 hover:bg-amber-50/50 shadow-xs'
                          }`}
                        >
                          {token}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Arranged Sentence Box */}
                <div className="p-5 rounded-2xl bg-white border-2 border-dashed border-amber-300 text-left min-h-[70px]">
                  <span className="text-xs text-slate-400 font-semibold uppercase block mb-2">
                    Your Sentence (Tap a word to remove):
                  </span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {selectedTokens.length === 0 ? (
                      <span className="text-xs text-slate-400 italic">
                        Tap words above to construct your sentence...
                      </span>
                    ) : (
                      selectedTokens.map((token, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveToken(idx)}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-red-500 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                        >
                          {token}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Feedback message */}
                {builderFeedback === 'correct' && (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-center text-sm font-bold flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" /> Correct sentence! Well done!
                  </div>
                )}
                {builderFeedback === 'wrong' && (
                  <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-center text-sm font-bold">
                    Grammar check failed. Remember: Subject + Verb + Complement!
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setSelectedTokens([])}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Clear All
                  </button>

                  <button
                    onClick={handleCheckSentence}
                    disabled={selectedTokens.length !== currentSentenceItem.scrambledTokens.length}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-sm btn-3d-orange cursor-pointer"
                  >
                    Check Sentence
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

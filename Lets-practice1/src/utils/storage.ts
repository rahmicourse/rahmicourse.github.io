import { UserProgress } from '../types';

const STORAGE_KEY = 'esteh_nusantara_grade7_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  viewedLessons: [],
  completedConversation: false,
  gamesCompleted: {
    matchVocab: false,
    wordUnscramble: false,
    sentenceBuilder: false,
  },
  highScores: {
    matchVocab: 0,
    wordUnscramble: 0,
    sentenceBuilder: 0,
  },
  quizBestScore: 0,
  quizCompletedCount: 0,
  achievements: {
    beginner: false,
    communicator: false,
    explorer: false,
    master: false,
  },
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      gamesCompleted: { ...DEFAULT_PROGRESS.gamesCompleted, ...(parsed.gamesCompleted || {}) },
      highScores: { ...DEFAULT_PROGRESS.highScores, ...(parsed.highScores || {}) },
      achievements: { ...DEFAULT_PROGRESS.achievements, ...(parsed.achievements || {}) },
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function resetStoredProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return DEFAULT_PROGRESS;
}

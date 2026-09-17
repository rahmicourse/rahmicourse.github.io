export interface LessonTopic {
  id: string;
  emoji: string;
  title: string;
  indonesianTitle: string;
  explanation: string;
  indonesianExplanation: string;
  examples: Array<{
    english: string;
    indonesian: string;
  }>;
  vocabulary: Array<{
    word: string;
    meaning: string;
    partOfSpeech?: string;
  }>;
  pronunciationTips: string;
}

export interface GrammarItem {
  id: string;
  title: string;
  category: 'pronouns' | 'tobe' | 'havehas';
  explanation: string;
  formula?: string;
  rules: Array<{
    subject: string;
    verbOrForm: string;
    example: string;
    note?: string;
  }>;
  practiceSentence: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface GalangProfile {
  name: string;
  age: string;
  origin: string;
  city: string;
  school: string;
  hobby: string;
  siblings: string;
  personality: string[];
  bio: string;
}

export interface ChatMessage {
  id: string;
  sender: 'galang' | 'student';
  text: string;
  timestamp: number;
  followUpPrompt?: string;
  isSummary?: boolean;
  summaryData?: {
    name: string;
    age: string;
    school: string;
    hobby: string;
    family: string;
  };
  isAiGlitch?: boolean;
  glitchNote?: string;
}

export interface VocabMatchPair {
  id: string;
  english: string;
  indonesian: string;
  category: string;
}

export interface UnscrambleWord {
  id: string;
  scrambled: string;
  correct: string;
  hint: string;
  indonesianHint: string;
}

export interface SentenceBuilderItem {
  id: string;
  scrambledTokens: string[];
  correctSentence: string;
  translation: string;
}

export interface QuizQuestion {
  id: number;
  topic: 'Self Introduction' | 'Pronouns' | 'To Be' | 'Have/Has' | 'Vocabulary';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AchievementBadge {
  id: 'beginner' | 'communicator' | 'explorer' | 'master';
  name: string;
  tier: 'bronze' | 'silver' | 'gold' | 'master';
  icon: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  viewedLessons: string[];
  completedConversation: boolean;
  conversationSummary?: {
    name: string;
    age: string;
    school: string;
    hobby: string;
    family: string;
  };
  gamesCompleted: {
    matchVocab: boolean;
    wordUnscramble: boolean;
    sentenceBuilder: boolean;
  };
  highScores: {
    matchVocab: number;
    wordUnscramble: number;
    sentenceBuilder: number;
  };
  quizBestScore: number;
  quizCompletedCount: number;
  achievements: Record<string, boolean>;
}

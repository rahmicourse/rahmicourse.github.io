export type AppMode = 'home' | 'learn' | 'conversation' | 'vocabulary' | 'grammar' | 'quiz';

export interface LearnExpression {
  id: string;
  topic: string;
  topicId: string;
  icon: string;
  expressions: {
    en: string;
    idMeaning: string;
    audioText?: string;
  }[];
  questions: {
    en: string;
    idMeaning: string;
    audioText?: string;
  }[];
  explanationId: string;
  grammarTip: string;
  dialogue: {
    speakerA: string;
    textA: string;
    speakerB: string;
    textB: string;
  };
  quickPractice: {
    prompt: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  correctionNote?: string | null;
  hint?: string | null;
  timestamp: number;
}

export interface ConversationFeedback {
  whatYouDidWell: string;
  vocabularyToImprove: string;
  grammarToImprove: string;
  recommendedSentence: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  indonesian: string;
  category: string;
  exampleEn: string;
  exampleId: string;
  phonetic?: string;
}

export interface GrammarQuestion {
  id: number;
  topic: string;
  question: string;
  instruction: string;
  options: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationId: string;
}

export interface QuizQuestion {
  id: number;
  category: 'vocabulary' | 'grammar' | 'expressions' | 'dialogue' | 'reading';
  categoryLabel: string;
  type: 'mcq' | 'short_answer';
  context?: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  hint: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  excellentAreas: string[];
  areasToImprove: string[];
  recommendedPractice: string[];
}

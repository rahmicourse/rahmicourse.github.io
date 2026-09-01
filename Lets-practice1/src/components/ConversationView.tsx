import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, Sparkles, AlertCircle, CheckCircle2, RotateCcw, HelpCircle, ArrowLeft, ArrowRight, Award, Shield, User, Bot, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChatMessage, ConversationFeedback } from '../types';
import { speakEnglish } from '../utils/speech';
import { PrivacyBanner } from './PrivacyBanner';
import { evaluateRuleBased } from '../utils/localTutor';

interface ConversationViewProps {
  onBackToHome: () => void;
  onGoToVocabulary: () => void;
}

const TOPIC_LABELS = [
  '1. Name',
  '2. Origin',
  '3. Age',
  '4. School',
  '5. Address (Fictional)',
  '6. Family',
  '7. Hobbies',
  '8. Favorite Subject',
];

export const ConversationView: React.FC<ConversationViewProps> = ({ onBackToHome, onGoToVocabulary }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'bot',
      text: "Hi! Nice to meet you! What's your name?",
      timestamp: Date.now(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([
    'My name is ...',
    "I'm ...",
    "Hello! My name is ...",
  ]);
  const [feedbackSummary, setFeedbackSummary] = useState<ConversationFeedback | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState<string | null>(
    'Contoh: My name is [Nama panggilanmu]. Kamu bisa menggunakan nama depan saja!'
  );
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, feedbackSummary]);

  const handleSpeak = (text: string, id: string) => {
    setSpeakingId(id);
    speakEnglish(text, () => setSpeakingId(null));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    // Check if student wants a hint or doesn't know
    const lowerText = text.toLowerCase();
    const isAskingHelp = lowerText.includes("i don't know") || lowerText.includes("help") || lowerText.includes("tidak tahu") || lowerText === "?";

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // API-free mode: evaluate the student's response locally in the browser.
      // This works on GitHub Pages and does not expose or require any API key.
      const data = evaluateRuleBased(text, currentTopicIndex, studentName, retryCount);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        correctionNote: data.correctionNote || null,
        hint: data.hint || null,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.hint) {
        setCurrentHint(data.hint);
      }

      if (data.suggestedReplies && Array.isArray(data.suggestedReplies)) {
        setSuggestedReplies(data.suggestedReplies);
      }

      if (data.advanceTopic) {
        setRetryCount(0);
        const nextIdx = data.nextTopicIndex;
        setCurrentTopicIndex(nextIdx);

        if (currentTopicIndex === 0 && !studentName) {
          // Extract student name if first topic
          const cleanName = text.replace(/my name is|i am|i'm|saya|nama saya/gi, '').trim();
          if (cleanName) setStudentName(cleanName);
        }

        if (data.isConversationFinished || nextIdx >= 8) {
          setIsFinished(true);
          setFeedbackSummary(data.feedbackSummary);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {
            // ignore
          }
        }
      } else {
        setRetryCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Chat error:', err);
      // Friendly fallback
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Good try! 👍 Let's keep practicing. Can you try answering in a simple English sentence?",
        correctionNote: 'Tip: Periksa kembali ejaan atau rumus kalimatmu ya!',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        id: 'init-msg',
        sender: 'bot',
        text: "Hi! Nice to meet you! What's your name?",
        timestamp: Date.now(),
      },
    ]);
    setCurrentTopicIndex(0);
    setRetryCount(0);
    setStudentName('');
    setIsFinished(false);
    setFeedbackSummary(null);
    setSuggestedReplies([
      'My name is ...',
      "I'm ...",
      "Hello! My name is ...",
    ]);
    setCurrentHint('Contoh: My name is [Nama panggilanmu].');
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      {/* Top Header with Back Button & Reset */}
      <div className="flex items-center justify-between gap-3">
        <button
          id="btn-chat-back"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-chat-reset"
            onClick={handleRestart}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-2 rounded-xl shadow-2xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang Percakapan</span>
          </button>
        </div>
      </div>

      {/* Tutor Profile & Progress Header */}
      <div className="bg-gradient-to-r from-violet-700 via-indigo-600 to-indigo-700 text-white rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
                🧑‍🎓
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-indigo-700 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg font-display">
                  Alex (Grade 7 New Student)
                </h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-mono font-bold">
                  AI Tutor
                </span>
              </div>
              <p className="text-xs text-indigo-100/90 font-medium">
                Teman baru yang sedang mengajakmu berkenalan dalam bahasa Inggris
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-amber-300 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
              Topik {Math.min(currentTopicIndex + 1, 8)} / 8
            </span>
          </div>
        </div>

        {/* Topic Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(((currentTopicIndex + (isFinished ? 1 : 0)) / 8) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-indigo-200 font-bold overflow-x-auto pb-1 gap-2">
            <span>Current: {TOPIC_LABELS[Math.min(currentTopicIndex, 7)]}</span>
            <span>{Math.round(Math.min(((currentTopicIndex + (isFinished ? 1 : 0)) / 8) * 100, 100))}% Selesai</span>
          </div>
        </div>
      </div>

      {/* Safety Notice specifically mentioning Address rule */}
      {currentTopicIndex === 4 && <PrivacyBanner />}

      {/* Main Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col min-h-[460px] max-h-[580px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm shrink-0 font-bold ${
                    isBot
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-amber-400 text-slate-950 shadow-xs'
                  }`}
                >
                  {isBot ? '🧑‍🎓' : '👤'}
                </div>

                {/* Bubble */}
                <div className={`max-w-[82%] sm:max-w-[75%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isBot
                        ? 'bg-slate-100/90 text-slate-900 rounded-tl-sm border border-slate-200/70'
                        : 'bg-indigo-600 text-white rounded-tr-sm font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Audio Playback for Bot Messages */}
                    {isBot && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <button
                          id={`btn-chat-tts-${msg.id}`}
                          onClick={() => handleSpeak(msg.text, msg.id)}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                            speakingId === msg.id
                              ? 'bg-amber-300 text-slate-950 animate-pulse'
                              : 'bg-white text-indigo-700 hover:bg-indigo-50 border border-slate-200'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{speakingId === msg.id ? 'Mendengarkan...' : 'Dengar Suara Alex'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Correction Banner if there is polite feedback */}
                  {msg.correctionNote && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Catatan Tutor (Correction Tip):</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed font-medium">
                        {msg.correctionNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs p-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="font-semibold text-slate-500">Alex sedang mengetik jawaban...</span>
            </div>
          )}

          {/* End of Conversation Summary Report */}
          {isFinished && feedbackSummary && (
            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 border-2 border-indigo-200 shadow-md space-y-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 text-2xl flex items-center justify-center shadow-md">
                  🏆
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                    Mission Accomplished!
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                    Laporan Hasil Percakapan (Conversation Feedback)
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                {/* What you did well */}
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <h5 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Hal yang Sudah Sangat Baik (What you did well):</span>
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    {feedbackSummary.whatYouDidWell}
                  </p>
                </div>

                {/* Vocabulary to improve */}
                <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1">
                  <h5 className="font-bold text-amber-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Kosakata yang Bisa Ditingkatkan (Vocabulary):</span>
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    {feedbackSummary.vocabularyToImprove}
                  </p>
                </div>

                {/* Grammar to improve */}
                <div className="bg-white p-4 rounded-2xl border border-blue-200 space-y-1">
                  <h5 className="font-bold text-blue-800 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span>Tata Bahasa yang Perlu Dilatih (Grammar):</span>
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    {feedbackSummary.grammarToImprove}
                  </p>
                </div>

                {/* One recommended sentence */}
                <div className="bg-white p-4 rounded-2xl border border-purple-200 space-y-1">
                  <h5 className="font-bold text-purple-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span>Kalimat Emas untuk Diingat (Practice Sentence):</span>
                  </h5>
                  <p className="font-bold text-purple-950 bg-purple-50 p-2 rounded-xl border border-purple-100">
                    "{feedbackSummary.recommendedSentence}"
                  </p>
                  <button
                    onClick={() => handleSpeak(feedbackSummary.recommendedSentence, 'feedback-sentence')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar Pengucapan</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="btn-feedback-retry"
                  onClick={handleRestart}
                  className="flex-1 py-3 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Coba Percakapan Baru</span>
                </button>

                <button
                  id="btn-feedback-goto-vocab"
                  onClick={onGoToVocabulary}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Lanjut ke 🧩 Vocabulary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Reply Chips */}
        {!isFinished && (
          <div className="px-4 sm:px-6 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              💡 Bantuan:
            </span>
            {suggestedReplies.map((reply, i) => (
              <button
                key={i}
                id={`btn-quick-reply-${i}`}
                onClick={() => handleSendMessage(reply)}
                className="text-xs bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 hover:border-indigo-300 font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all shadow-2xs"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Hint Dropdown / Banner */}
        {showHint && currentHint && !isFinished && (
          <div className="mx-4 sm:mx-6 my-2 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start justify-between gap-2 animate-fadeIn">
            <div>
              <span className="font-bold">💡 Petunjuk Jawaban:</span> {currentHint}
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="text-amber-600 font-bold hover:text-amber-800"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white rounded-b-3xl border-t border-slate-200 flex items-center gap-2">
          {!isFinished ? (
            <>
              <button
                id="btn-chat-toggle-hint"
                onClick={() => setShowHint((prev) => !prev)}
                title="Lihat Petunjuk / Hint"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 border border-slate-200 transition-colors shrink-0"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <input
                id="input-chat-message"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                disabled={isLoading}
                placeholder="Ketik jawabanmu dalam bahasa Inggris (Contoh: My name is...)..."
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 transition-all"
              />

              <button
                id="btn-chat-send"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs shrink-0"
              >
                <span className="hidden sm:inline">Kirim</span>
                <Send className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full text-center py-1 text-xs text-slate-500 font-semibold">
              Percakapan selesai! Kamu dapat menekan tombol di atas untuk mencoba lagi atau lanjut ke menu berikutnya.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

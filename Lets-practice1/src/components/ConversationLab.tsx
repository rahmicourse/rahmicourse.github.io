import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  RotateCcw,
  Volume2,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Award,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { ChatMessage, UserProgress } from '../types';
import { CANNED_QA_PAIRS, FALLBACK_MESSAGE, SUGGESTED_QUESTIONS, GALANG_PROFILE } from '../data/conversationData';
import { speakEnglish, playChimeSound, playClickSound } from '../utils/sound';

interface ConversationLabProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onUnlockAchievement: (badgeId: string) => void;
}

type ChatMode = 'guided' | 'qa';

export const ConversationLab: React.FC<ConversationLabProps> = ({
  progress: _progress,
  onUpdateProgress,
  onUnlockAchievement,
}) => {
  const [mode, setMode] = useState<ChatMode>('guided');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Guided flow state
  // Step 0: Name, Step 1: Age, Step 2: School, Step 3: Hobby, Step 4: Family, Step 5: Summary done
  const [guidedStep, setGuidedStep] = useState<number>(0);
  const [studentData, setStudentData] = useState({
    name: '',
    age: '',
    school: '',
    hobby: '',
    family: '',
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize greeting on mode change or first load
  useEffect(() => {
    resetChat(mode);
  }, [mode]);

  const resetChat = (selectedMode: ChatMode) => {
    playClickSound();
    setInputText('');
    setIsTyping(false);
    setCopiedSummary(false);

    if (selectedMode === 'guided') {
      setGuidedStep(0);
      setStudentData({ name: '', age: '', school: '', hobby: '', family: '' });
      setMessages([
        {
          id: 'm-init-1',
          sender: 'galang',
          text: 'Hello! Welcome to the Conversation Lab. What is your name?',
          timestamp: Date.now(),
        },
      ]);
    } else {
      setMessages([
        {
          id: 'm-init-qa',
          sender: 'galang',
          text: "Hi there! I'm Galang from Kalimantan. Ask me any question in English about my name, age, origin, school, hobbies, or family!",
          timestamp: Date.now(),
        },
      ]);
    }
  };

  // Process sending message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    playClickSound();
    const studentMsg: ChatMessage = {
      id: `msg-${Date.now()}-s`,
      sender: 'student',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, studentMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      if (mode === 'guided') {
        handleGuidedResponse(text);
      } else {
        handleQaResponse(text);
      }
      setIsTyping(false);
    }, 900);
  };

  // Guided Conversation Flow logic
  const handleGuidedResponse = (answer: string) => {
    let nextStep = guidedStep + 1;
    let galangReply = '';
    const updatedData = { ...studentData };

    if (guidedStep === 0) {
      // Name
      // Extract clean name if they said "My name is X" or just "X"
      const cleaned = answer.replace(/my name is|i am|i'm/gi, '').trim() || answer;
      updatedData.name = cleaned;
      galangReply = `Nice to meet you, ${cleaned}! How old are you?`;
    } else if (guidedStep === 1) {
      // Age
      const cleaned = answer.replace(/i am|i'm|years old/gi, '').trim() || answer;
      updatedData.age = cleaned.includes('1') ? `${cleaned}` : `${cleaned} years old`;
      galangReply = 'Great! What school do you study at?';
    } else if (guidedStep === 2) {
      // School
      const cleaned = answer.replace(/i study at|i go to/gi, '').trim() || answer;
      updatedData.school = cleaned;
      galangReply = 'Awesome school! What is your hobby?';
    } else if (guidedStep === 3) {
      // Hobby
      const cleaned = answer.replace(/my hobby is|i like/gi, '').trim() || answer;
      updatedData.hobby = cleaned;
      galangReply = 'That sounds like so much fun! Tell me about your family.';
    } else if (guidedStep === 4) {
      // Family
      updatedData.family = answer;
      galangReply =
        'Excellent! You did a fantastic job introducing yourself. Here is your self-introduction summary:';
      nextStep = 5;

      // Mark conversation completed in storage & unlock communicator achievement!
      playChimeSound();
      onUpdateProgress((prev) => ({
        ...prev,
        completedConversation: true,
        conversationSummary: updatedData,
        achievements: { ...prev.achievements, communicator: true },
      }));
      onUnlockAchievement('communicator');
    }

    setStudentData(updatedData);
    setGuidedStep(nextStep);

    const newMessages: ChatMessage[] = [
      {
        id: `msg-${Date.now()}-g`,
        sender: 'galang',
        text: galangReply,
        timestamp: Date.now(),
      },
    ];

    if (nextStep === 5) {
      newMessages.push({
        id: `msg-${Date.now()}-sum`,
        sender: 'galang',
        text: 'Self-Introduction Summary Card',
        timestamp: Date.now() + 100,
        isSummary: true,
        summaryData: updatedData,
      });
    }

    setMessages((prev) => [...prev, ...newMessages]);
  };

  // Two-Way Free Q&A Logic with Galang
  const handleQaResponse = (question: string) => {
    const qLower = question.toLowerCase().trim();

    // Check against canned QA keywords
    let matchedPair: (typeof CANNED_QA_PAIRS)[0] | null = null;

    for (const pair of CANNED_QA_PAIRS) {
      const isMatch = pair.keywords.some((kw) => qLower.includes(kw.toLowerCase()));
      if (isMatch) {
        matchedPair = pair;
        break;
      }
    }

    const replyText = matchedPair ? matchedPair.answer : FALLBACK_MESSAGE;

    // Follow-ups from requirements:
    const followUps = [
      'What about you?',
      'Can you tell me about yourself?',
      'How old are you?',
      'What is your hobby?',
      'Where do you live?',
    ];
    const randomFollowUp = matchedPair?.followUp || followUps[Math.floor(Math.random() * followUps.length)];

    const responseMsg: ChatMessage = {
      id: `msg-${Date.now()}-g`,
      sender: 'galang',
      text: replyText,
      timestamp: Date.now(),
      followUpPrompt: matchedPair ? randomFollowUp : undefined,
      isAiGlitch: matchedPair?.isAiGlitch,
      glitchNote: matchedPair?.glitchNote,
    };

    setMessages((prev) => [...prev, responseMsg]);

    // Student practiced with Galang, unlock communicator badge
    onUpdateProgress((prev) => ({
      ...prev,
      completedConversation: true,
      achievements: { ...prev.achievements, communicator: true },
    }));
    onUnlockAchievement('communicator');
  };

  const handleCopySummary = (data: typeof studentData) => {
    const summaryText = `English Self Introduction (ES TEH Nusantara - Grade 7)\nName: ${data.name || 'My Name'}\nAge: ${data.age || '13 years old'}\nSchool: ${data.school || 'SMP Merdeka'}\nHobby: ${data.hobby || 'Reading & Playing'}\nFamily: ${data.family || 'Four people in my family'}`;
    navigator.clipboard.writeText(summaryText).catch(() => {});
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div id="conversation-section" className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Simulation • No API Required</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
            Conversation Lab with Galang
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Practice two-way English self-introduction dialogue in real-time. Choose a guided
            interview or freely ask Galang questions!
          </p>

          {/* Mode Switcher */}
          <div className="mt-5 inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setMode('guided')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'guided'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎯 Guided Self-Introduction
            </button>
            <button
              onClick={() => setMode('qa')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'qa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💬 Ask Galang Anything
            </button>
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden flex flex-col min-h-[500px] h-[75vh]">
          {/* Chat Window Top Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-xl select-none">
                  👦
                </div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white absolute bottom-0 right-0" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-sm">{GALANG_PROFILE.name}</span>
                  <span className="text-[11px] px-2 py-0.2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    Kalimantan
                  </span>
                </div>
                <p className="text-xs text-slate-500">Online • Grade 7 English Companion</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => resetChat(mode)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isGalang = msg.sender === 'galang';

              // If this is the generated summary card
              if (msg.isSummary && msg.summaryData) {
                const s = msg.summaryData;
                return (
                  <div
                    key={msg.id}
                    className="my-4 p-5 sm:p-6 rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-emerald-600 text-white shadow-lg max-w-md mx-auto"
                  >
                    <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-300" />
                        <h4 className="font-display font-bold text-base sm:text-lg">
                          Self-Introduction Summary
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySummary(s)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm font-medium">
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-blue-200">Name:</span>
                        <span className="font-bold">{s.name || 'Student'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-blue-200">Age:</span>
                        <span className="font-bold">{s.age || '13 years old'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-blue-200">School:</span>
                        <span className="font-bold">{s.school || 'SMP Merdeka'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-blue-200">Hobby:</span>
                        <span className="font-bold">{s.hobby || 'Playing football'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-blue-200">Family:</span>
                        <span className="font-bold">{s.family || 'Two siblings'}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/20 text-center">
                      <p className="text-xs text-amber-200 font-semibold">
                        🎉 Great job! You unlocked the &ldquo;Communicator&rdquo; badge!
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-end ${isGalang ? 'justify-start' : 'justify-end'}`}
                >
                  {isGalang && (
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-base shrink-0 mb-1">
                      👦
                    </div>
                  )}

                  <div className="max-w-[85%] sm:max-w-[75%] space-y-1.5">
                    <div
                      className={`p-4 rounded-2xl shadow-xs text-sm sm:text-base leading-relaxed ${
                        isGalang
                          ? 'bg-white text-slate-800 rounded-bl-xs border border-slate-200'
                          : 'bg-blue-600 text-white rounded-br-xs'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Educational Callout if Galang provides an intentional off-topic / mismatched answer */}
                      {msg.isAiGlitch && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="space-y-1 text-left">
                            <span className="font-bold text-amber-900 block">
                              ⚠️ Contoh Nyata: AI Tidak Selalu Benar! (Halusinasi AI)
                            </span>
                            <p className="text-amber-800 leading-snug">
                              {msg.glitchNote ||
                                'Jawaban di atas sengaja dibuat tidak nyambung sebagai contoh nyata bahwa kecerdasan buatan bisa membuat kesalahan atau berhalusinasi. Siswa harus selalu kritis dan memverifikasi jawaban AI ya!'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Follow-up question if present */}
                      {msg.followUpPrompt && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Galang asks: &ldquo;{msg.followUpPrompt}&rdquo;</span>
                        </div>
                      )}
                    </div>

                    {/* Pronunciation button for Galang's messages */}
                    {isGalang && (
                      <button
                        onClick={() => speakEnglish(msg.text)}
                        className="text-[11px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 pl-1 cursor-pointer transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen speech</span>
                      </button>
                    )}
                  </div>

                  {!isGalang && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 shrink-0 mb-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Animation Effect */}
            {isTyping && (
              <div className="flex gap-3 items-end justify-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-base shrink-0 mb-1">
                  👦
                </div>
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-xs shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Prompts for Q&A mode */}
          {mode === 'qa' && (
            <div className="p-2.5 bg-slate-100 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-bold px-1 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>Suggested:</span>
              </span>
              {SUGGESTED_QUESTIONS.map((q, i) => {
                const isGlitchTest = q.includes('Uji:');
                return (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className={`px-2.5 py-1 rounded-lg font-medium border transition-colors shrink-0 cursor-pointer flex items-center gap-1 ${
                      isGlitchTest
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 font-bold'
                        : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200'
                    }`}
                  >
                    {isGlitchTest && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                    <span>{q}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Guided Mode Prompt Helper */}
          {mode === 'guided' && guidedStep < 5 && (
            <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 text-xs text-blue-800 flex items-center justify-between">
              <span>
                Step {guidedStep + 1} of 5:{' '}
                <strong>
                  {guidedStep === 0 && 'Tell Galang your name (e.g., My name is Andre)'}
                  {guidedStep === 1 && 'Tell Galang your age (e.g., I am 13 years old)'}
                  {guidedStep === 2 && 'Tell Galang your school (e.g., I study at SMP 1)'}
                  {guidedStep === 3 && 'Tell Galang your hobby (e.g., My hobby is reading)'}
                  {guidedStep === 4 && 'Tell Galang your family (e.g., I have one brother)'}
                </strong>
              </span>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              id="chat-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={
                mode === 'guided'
                  ? 'Type your answer in English...'
                  : 'Ask Galang (e.g., What is your hobby?)...'
              }
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
              disabled={isTyping}
            />
            <button
              id="chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
    </div>
  );
};

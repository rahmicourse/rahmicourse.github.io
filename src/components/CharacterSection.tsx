import React from 'react';
import { MapPin, Calendar, School, Heart, Users, MessageSquare, Volume2, Sparkles } from 'lucide-react';
import { GALANG_PROFILE } from '../data/conversationData';
import { speakEnglish, playClickSound } from '../utils/sound';

interface CharacterSectionProps {
  onStartChatWithGalang: () => void;
}

export const CharacterSection: React.FC<CharacterSectionProps> = ({ onStartChatWithGalang }) => {
  const handleListenBio = () => {
    playClickSound();
    speakEnglish(GALANG_PROFILE.bio);
  };

  return (
    <div id="character-section" className="w-full">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-600 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Decorative Pattern Circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Companion Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-amber-100 border-4 border-white shadow-2xl flex items-center justify-center text-7xl sm:text-8xl select-none transform hover:scale-105 transition-transform duration-300">
                  <span role="img" aria-label="Galang avatar">
                    👦
                  </span>
                </div>
                {/* Kalimantan Pill */}
                <div className="absolute bottom-1 bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-bold shadow-md border border-slate-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>Kalimantan</span>
                </div>
              </div>

              <h3 className="font-display text-3xl font-extrabold mt-4">Galang Pratama</h3>
              <p className="text-blue-100 text-sm font-medium">Your Friendly English Study Guide</p>

              {/* Personality Pills */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {GALANG_PROFILE.personality.map((trait) => (
                  <span
                    key={trait}
                    className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs text-white"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Companion Profile Details & Bio */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Self Introduction Bio</span>
                  </span>
                  <button
                    onClick={handleListenBio}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear Galang Speak</span>
                  </button>
                </div>
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed italic">
                  &ldquo;{GALANG_PROFILE.bio}&rdquo;
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/15 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Age</span>
                  </div>
                  <p className="font-bold text-sm sm:text-base">{GALANG_PROFILE.age}</p>
                </div>

                <div className="bg-white/15 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                    <School className="w-3.5 h-3.5" />
                    <span>School</span>
                  </div>
                  <p className="font-bold text-sm sm:text-base">{GALANG_PROFILE.school}</p>
                </div>

                <div className="bg-white/15 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Hobby</span>
                  </div>
                  <p className="font-bold text-sm sm:text-base">Football & Volleyball 🏐</p>
                </div>

                <div className="bg-white/15 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Siblings</span>
                  </div>
                  <p className="font-bold text-sm sm:text-base">{GALANG_PROFILE.siblings}</p>
                </div>
              </div>

              {/* Action button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  id="btn-chat-companion"
                  onClick={onStartChatWithGalang}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all btn-3d-orange cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Start Live Conversation with Galang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

import React from 'react';

export const StudentIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-lg mx-auto select-none ${className}`}>
      {/* Decorative background glow rings in Theme colors: Blue, Green, Orange */}
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl -z-10" />
      <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-orange-200/50 rounded-full blur-2xl -z-10" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl -z-10" />

      {/* Floating Greeting Speech Bubbles */}
      <div className="absolute -top-3 left-4 sm:left-6 z-20 animate-bounce">
        <div className="bg-white px-3.5 py-1.5 rounded-2xl rounded-bl-none shadow-md border-2 border-blue-400 text-xs sm:text-sm font-bold text-blue-800 flex items-center gap-1.5">
          <span>👋 Hello! I&apos;m Galang.</span>
        </div>
      </div>

      <div className="absolute -top-3 right-4 sm:right-6 z-20 animate-bounce" style={{ animationDelay: '0.4s' }}>
        <div className="bg-white px-3.5 py-1.5 rounded-2xl rounded-br-none shadow-md border-2 border-emerald-400 text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1.5">
          <span>✨ Hi! I&apos;m Monita.</span>
        </div>
      </div>

      {/* Main SVG Vector Graphic */}
      <svg
        viewBox="0 0 540 380"
        className="w-full h-auto drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Background Card/Stage */}
        <rect x="20" y="20" width="500" height="340" rx="28" fill="#F0FDF4" />
        <circle cx="270" cy="180" r="140" fill="#E0F2FE" />
        <circle cx="270" cy="180" r="110" fill="#FEF3C7" />

        {/* Small Nusantara decorative elements: Batik inspired pattern dots */}
        <circle cx="60" cy="60" r="5" fill="#3B82F6" opacity="0.4" />
        <circle cx="80" cy="70" r="3" fill="#10B981" opacity="0.5" />
        <circle cx="470" cy="80" r="4" fill="#F97316" opacity="0.5" />
        <circle cx="490" cy="60" r="6" fill="#3B82F6" opacity="0.3" />

        {/* Classroom & nature background hint */}
        <path d="M 40 330 Q 140 300 270 330 T 500 330 L 500 360 L 40 360 Z" fill="#BBF7D0" opacity="0.6" />

        {/* STUDENT 1: GALANG (Indonesian SMP Boy - Left) */}
        <g id="galang-character">
          {/* Shadow */}
          <ellipse cx="180" cy="345" rx="55" ry="12" fill="#0F172A" opacity="0.12" />

          {/* Navy Blue SMP Shorts (Celana Biru Tua SMP) */}
          <path d="M 152 260 L 145 325 L 172 325 L 178 285 L 184 325 L 211 325 L 204 260 Z" fill="#1E3A8A" />
          {/* Belt */}
          <rect x="150" y="255" width="56" height="8" rx="2" fill="#0F172A" />
          <rect x="174" y="254" width="8" height="10" rx="1" fill="#F59E0B" />

          {/* Legs */}
          <rect x="148" y="325" width="20" height="16" rx="4" fill="#FBBF24" />
          <rect x="187" y="325" width="20" height="16" rx="4" fill="#FBBF24" />
          {/* White socks & black shoes */}
          <rect x="148" y="333" width="20" height="8" fill="#FFFFFF" />
          <rect x="187" y="333" width="20" height="8" fill="#FFFFFF" />
          <ellipse cx="157" cy="343" rx="14" ry="7" fill="#0F172A" />
          <ellipse cx="198" cy="343" rx="14" ry="7" fill="#0F172A" />

          {/* White SMP Shirt (Kemeja Putih SMP) */}
          <path d="M 140 185 L 150 260 L 206 260 L 216 185 L 195 180 L 161 180 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Collar */}
          <path d="M 163 180 L 178 198 L 193 180 Z" fill="#E2E8F0" />
          <path d="M 156 180 L 178 202 L 170 180 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 200 180 L 178 202 L 186 180 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* SMP Pocket & OSIS Logo Badge (left chest) */}
          <rect x="187" y="202" width="16" height="18" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M 191 206 L 199 206 L 195 214 Z" fill="#818CF8" />

          {/* Backpack straps */}
          <path d="M 148 184 L 144 235" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
          <path d="M 208 184 L 212 235" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />

          {/* Right Arm: Waving Hello! */}
          <path d="M 142 195 Q 112 180 115 145" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
          <circle cx="115" cy="140" r="12" fill="#FBBF24" />
          {/* Left Arm: Relaxed at side holding an English textbook */}
          <path d="M 215 195 Q 225 230 220 250" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          {/* English Book */}
          <rect x="212" y="235" width="22" height="28" rx="3" fill="#10B981" transform="rotate(10 212 235)" />
          <rect x="216" y="238" width="14" height="22" rx="1" fill="#ECFDF5" transform="rotate(10 216 238)" />
          <line x1="219" y1="244" x2="228" y2="246" stroke="#059669" strokeWidth="2" />
          <circle cx="218" cy="256" r="8" fill="#FBBF24" />

          {/* Neck & Head */}
          <rect x="170" y="165" width="16" height="18" rx="3" fill="#F59E0B" />
          <circle cx="178" cy="138" r="32" fill="#FBBF24" />

          {/* Face features: Friendly Galang */}
          {/* Eyes with cheerful shine */}
          <ellipse cx="168" cy="136" rx="4" ry="5" fill="#0F172A" />
          <circle cx="166" cy="134" r="1.5" fill="#FFFFFF" />
          <ellipse cx="188" cy="136" rx="4" ry="5" fill="#0F172A" />
          <circle cx="186" cy="134" r="1.5" fill="#FFFFFF" />
          {/* Eyebrows */}
          <path d="M 163 128 Q 168 126 173 129" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 183 129 Q 188 126 193 128" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Big Warm Smile */}
          <path d="M 168 147 Q 178 158 188 147" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="#EF4444" />
          {/* Cheeks */}
          <circle cx="162" cy="144" r="5" fill="#F87171" opacity="0.4" />
          <circle cx="194" cy="144" r="5" fill="#F87171" opacity="0.4" />

          {/* Short Neat Black Indonesian Hair */}
          <path d="M 146 132 C 146 100 170 95 186 98 C 205 97 215 110 214 135 C 208 120 196 112 178 114 C 160 114 150 123 146 132 Z" fill="#1E293B" />
          <path d="M 174 98 Q 180 92 188 98" fill="#1E293B" />
        </g>

        {/* STUDENT 2: MONITA (Indonesian SMP Girl - Right) */}
        <g id="monita-character">
          {/* Shadow */}
          <ellipse cx="360" cy="345" rx="55" ry="12" fill="#0F172A" opacity="0.12" />

          {/* Navy Blue SMP Skirt (Rok Biru SMP Lipit) */}
          <path d="M 336 260 L 320 325 L 400 325 L 384 260 Z" fill="#1E3A8A" />
          {/* Pleats detail */}
          <line x1="344" y1="262" x2="338" y2="325" stroke="#172554" strokeWidth="1.5" />
          <line x1="360" y1="262" x2="360" y2="325" stroke="#172554" strokeWidth="1.5" />
          <line x1="376" y1="262" x2="382" y2="325" stroke="#172554" strokeWidth="1.5" />
          {/* Belt */}
          <rect x="334" y="255" width="52" height="8" rx="2" fill="#0F172A" />
          <rect x="356" y="254" width="8" height="10" rx="1" fill="#F59E0B" />

          {/* Legs & Shoes */}
          <rect x="342" y="325" width="16" height="16" rx="4" fill="#FBBF24" />
          <rect x="362" y="325" width="16" height="16" rx="4" fill="#FBBF24" />
          {/* White socks & black shoes */}
          <rect x="342" y="333" width="16" height="8" fill="#FFFFFF" />
          <rect x="362" y="333" width="16" height="8" fill="#FFFFFF" />
          <ellipse cx="349" cy="343" rx="13" ry="7" fill="#0F172A" />
          <ellipse cx="371" cy="343" rx="13" ry="7" fill="#0F172A" />

          {/* White SMP Shirt */}
          <path d="M 326 185 L 334 260 L 386 260 L 394 185 L 375 180 L 345 180 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Collar */}
          <path d="M 348 180 L 360 200 L 372 180 Z" fill="#E2E8F0" />
          <path d="M 342 180 L 360 202 L 354 180 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 378 180 L 360 202 L 366 180 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Tie or SMP Badge */}
          <rect x="338" y="202" width="15" height="18" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M 342 206 L 350 206 L 346 214 Z" fill="#818CF8" />

          {/* Backpack straps (Blue) */}
          <path d="M 332 184 L 328 235" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
          <path d="M 388 184 L 392 235" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />

          {/* Left Arm: Waving with thumbs up */}
          <path d="M 400 195 Q 425 175 422 145" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
          <circle cx="422" cy="140" r="12" fill="#FBBF24" />

          {/* Right Arm: Holding a pencil & notepad */}
          <path d="M 326 195 Q 305 220 315 245" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
          <rect x="300" y="235" width="20" height="26" rx="3" fill="#F59E0B" transform="rotate(-15 300 235)" />
          <circle cx="316" cy="250" r="8" fill="#FBBF24" />

          {/* Neck & Head */}
          <rect x="352" y="165" width="16" height="18" rx="3" fill="#F59E0B" />
          <circle cx="360" cy="138" r="32" fill="#FBBF24" />

          {/* Hair: Cute Ponytail with Blue Ribbon */}
          <path d="M 390 135 C 410 130 425 150 415 175 C 405 165 400 150 390 145 Z" fill="#1E293B" />
          <circle cx="390" cy="140" r="6" fill="#3B82F6" />
          <path d="M 328 132 C 328 100 350 95 366 98 C 385 97 395 110 395 135 C 388 120 376 112 360 114 C 342 114 332 123 328 132 Z" fill="#1E293B" />

          {/* Face features: Monita */}
          <ellipse cx="350" cy="136" rx="4" ry="5" fill="#0F172A" />
          <circle cx="348" cy="134" r="1.5" fill="#FFFFFF" />
          <ellipse cx="370" cy="136" rx="4" ry="5" fill="#0F172A" />
          <circle cx="368" cy="134" r="1.5" fill="#FFFFFF" />
          <path d="M 345 128 Q 350 126 355 129" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 365 129 Q 370 126 375 128" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 350 147 Q 360 158 370 147" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="#EF4444" />
          <circle cx="344" cy="144" r="5" fill="#F87171" opacity="0.4" />
          <circle cx="376" cy="144" r="5" fill="#F87171" opacity="0.4" />
        </g>

        {/* Center Badge: ES TEH Nusantara Tag */}
        <g transform="translate(205, 290)">
          <rect x="0" y="0" width="130" height="36" rx="18" fill="#1E40AF" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
          <text x="65" y="23" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="'Fredoka', sans-serif">
            🇮🇩 SMP Grade 7
          </text>
        </g>
      </svg>
    </div>
  );
};

import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
      <div className="p-1.5 bg-amber-100 text-amber-700 rounded-xl mt-0.5 shrink-0">
        <Shield className="w-4 h-4" />
      </div>
      <div>
        <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
          <span>Pemberitahuan Keamanan & Privasi Siswa</span>
          <span className="bg-amber-200 text-amber-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">
            Privacy Rule
          </span>
        </h4>
        <p className="mt-1 text-amber-800 leading-relaxed">
         Anak-anak, silakan gunakan AI sebagai teman diskusi atau alat bantu belajar untuk mencari ide. Tapi ingat, jangan biarkan AI yang berpikir untuk kalian. Tulisan dan ide aslinya tetap harus dari kepala kalian sendiri, karena kemampuan berpikir kritis kalianlah yang sedang kita bangun di sekolah 🌟
        </p>
      </div>
    </div>
  );
};

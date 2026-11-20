import React from 'react'
import { BookOpen, GraduationCap, History, Home } from 'lucide-react'

export function Navbar({ currentView, onNavigate, activeSessionCount = 0 }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-[0_2px_8px_rgba(15,23,42,0.03)] w-full">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-15 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 sm:gap-3 text-left group rounded-xl p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] shrink-0"
          aria-label="Kembali ke Beranda"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center text-[#1D4ED8] group-hover:bg-[#3B82F6] group-hover:text-white transition-colors duration-200 shadow-xs">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-[#0F172A]">
                Skylearn
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                ARSI
              </span>
            </div>
            <p className="text-[11px] text-[#475569] font-medium hidden md:block">
              Bank Soal Arsitektur Sistem Informasi (450 Soal)
            </p>
          </div>
        </button>

        {/* Navigation Buttons */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0" aria-label="Navigasi Utama">
          <button
            onClick={() => onNavigate('home')}
            className={`min-h-[40px] sm:min-h-[46px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-150 ${
              currentView === 'home'
                ? 'bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]'
                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            <Home className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">Beranda</span>
          </button>

          <button
            onClick={() => onNavigate('study')}
            className={`min-h-[40px] sm:min-h-[46px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-150 ${
              currentView === 'study'
                ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            <GraduationCap className="w-4 h-4 stroke-[2.2]" />
            <span>Belajar</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className={`min-h-[40px] sm:min-h-[46px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-150 ${
              currentView === 'history' || currentView === 'review'
                ? 'bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]'
                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            <History className="w-4 h-4 stroke-[2]" />
            <span>Riwayat</span>
            {activeSessionCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-[#FBBF24] text-[#78350F]">
                {activeSessionCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

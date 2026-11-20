import React, { useState } from 'react'
import {
  Play,
  Zap,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  BookOpen
} from 'lucide-react'

export function HomeView({ onStartQuiz, onNavigate, stats, recentSession }) {
  const [selectedTimerDuration, setSelectedTimerDuration] = useState(6)

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-10">
      {/* Hero Welcome */}
      <section className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8] text-xs sm:text-sm font-semibold border border-[#BFDBFE]">
          <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>450 Soal Terkurasi • 25 Soal Acak per Sesi</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Latihan UTS Arsitektur Sistem Informasi
        </h1>
        <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
          Kuasai materi ujian terlebih dahulu melalui modul rangkuman konsep dan flashcard, lalu uji kesiapan Anda lewat simulasi kuis santai maupun kilat.
        </p>
      </section>

      {/* Study Material Feature Highlight Banner */}
      <section className="bg-linear-to-r from-[#F0FDF4] via-[#DCFCE7]/60 to-[#DBEAFE]/50 border-2 border-[#86EFAC] rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xs">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-xs">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
              Baru: Fitur Belajar
            </span>
            <h2 className="font-display font-bold text-lg sm:text-2xl text-[#0F172A]">
              Pelajari Rangkuman Materi & Flashcard
            </h2>
            <p className="text-xs sm:text-base text-[#475569] leading-relaxed max-w-2xl">
              Pahami 6 topik arsitektur sistem informasi (SDLC, klasifikasi SIM/SPK/TPS, manajemen proyek & CPM, desain antarmuka, hingga ERD). Uji daya ingat dengan kartu kilat sebelum memulai ujian.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('study')}
          className="btn-tactile w-full md:w-auto min-h-[48px] sm:min-h-[54px] px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shrink-0 border-b-2 border-[#166534] shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
        >
          <BookOpen className="w-4 h-4 stroke-[2]" />
          <span>Mulai Belajar Materi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Mode Selection Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
        {/* Mode 1: Tanpa Timer */}
        <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] hover:border-[#93C5FD] rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-0.5">
          <div className="space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] shadow-xs">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] mb-1.5">
                Mode Santai
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A]">
                Latihan Tanpa Timer
              </h2>
              <p className="text-[#475569] text-xs sm:text-base mt-1.5 leading-relaxed">
                Jawab 25 soal acak dengan kecepatan Anda sendiri tanpa tekanan waktu. Ideal untuk membaca soal dengan seksama dan mengasah pemahaman konsep.
              </p>
            </div>

            <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-[#475569]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22C55E] shrink-0" />
                <span>Bebas berpikir tanpa batas waktu</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22C55E] shrink-0" />
                <span>Umpan balik jawaban langsung terlihat</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22C55E] shrink-0" />
                <span>Skor & pembahasan tersimpan otomatis</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-3 border-t border-[#E2E8F0]">
            <button
              onClick={() => onStartQuiz('no-timer')}
              className="btn-tactile w-full min-h-[52px] sm:min-h-[58px] px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(59,130,246,0.25)] border-b-2 border-[#1D4ED8]"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>Mulai Latihan Santai</span>
            </button>
          </div>
        </div>

        {/* Mode 2: Dengan Countdown */}
        <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] hover:border-[#FCD34D] rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-0.5">
          <div className="space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-xs">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] fill-[#FBBF24]" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706] mb-1.5">
                Tantangan Kilat
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A]">
                Latihan dengan Timer
              </h2>
              <p className="text-[#475569] text-xs sm:text-base mt-1.5 leading-relaxed">
                Uji refleks dan ketajaman ingatan Anda. Teks soal dan pilihan muncul berurutan dengan animasi cepat, diikuti hitung mundur waktu.
              </p>
            </div>

            {/* Timer Duration Selector */}
            <div className="pt-1">
              <label className="block text-[11px] sm:text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                Pilih Durasi Hitung Mundur:
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2" role="group" aria-label="Pilihan durasi waktu">
                {[5, 6, 10].map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setSelectedTimerDuration(seconds)}
                    className={`min-h-[44px] rounded-xl font-mono font-bold text-xs sm:text-sm transition-all border flex items-center justify-center gap-1 ${
                      selectedTimerDuration === seconds
                        ? 'bg-[#FBBF24] text-[#78350F] border-[#D97706] shadow-xs ring-2 ring-[#FBBF24]/30'
                        : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span>{seconds}s</span>
                    {seconds === 6 && (
                      <span className="text-[10px] font-sans font-bold text-[#B45309]">★</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-[#475569]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706] shrink-0" />
                <span>Animasi huruf & opsi muncul bertahap</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706] shrink-0" />
                <span>Waktu {selectedTimerDuration} detik per soal</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706] shrink-0" />
                <span>Dapat klik langsung untuk lewati animasi</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-3 border-t border-[#E2E8F0]">
            <button
              onClick={() => onStartQuiz('timer', selectedTimerDuration)}
              className="btn-tactile w-full min-h-[52px] sm:min-h-[58px] px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-display font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(217,119,6,0.25)] border-b-2 border-[#92400E]"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>Mulai Tantangan ({selectedTimerDuration}s)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats or Recent History Section */}
      <section className="bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#E2E8F0]">
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#0F172A] flex items-center gap-2">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FBBF24]" />
              <span>Ringkasan Aktivitas Belajar</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
              Pantau progres belajar dan hasil latihan Anda
            </p>
          </div>

          <button
            onClick={() => onNavigate('history')}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#1D4ED8] bg-[#DBEAFE] hover:bg-[#BFDBFE] border border-[#BFDBFE] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Buka Semua Riwayat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <span className="text-[10px] sm:text-xs font-semibold text-[#475569] uppercase tracking-wider block">
              Total Sesi
            </span>
            <span className="font-mono font-bold text-xl sm:text-3xl text-[#0F172A] mt-0.5 block">
              {stats.totalSessions}
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <span className="text-[10px] sm:text-xs font-semibold text-[#475569] uppercase tracking-wider block">
              Rata-rata Skor
            </span>
            <span className="font-mono font-bold text-xl sm:text-3xl text-[#1D4ED8] mt-0.5 block">
              {stats.averageScore}
              <span className="text-xs text-[#475569] font-normal">/100</span>
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <span className="text-[10px] sm:text-xs font-semibold text-[#475569] uppercase tracking-wider block">
              Skor Tertinggi
            </span>
            <span className="font-mono font-bold text-xl sm:text-3xl text-[#16A34A] mt-0.5 block">
              {stats.highestScore}
              <span className="text-xs text-[#475569] font-normal">/100</span>
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <span className="text-[10px] sm:text-xs font-semibold text-[#475569] uppercase tracking-wider block">
              Soal Terjawab
            </span>
            <span className="font-mono font-bold text-xl sm:text-3xl text-[#0F172A] mt-0.5 block">
              {stats.totalQuestionsAnswered}
            </span>
          </div>
        </div>

        {recentSession && (
          <div className="mt-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center font-mono font-bold text-base sm:text-lg text-[#1D4ED8] shadow-2xs shrink-0">
                {recentSession.score}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#0F172A]">
                  Latihan Terakhir ({recentSession.mode === 'timer' ? `Timer ${recentSession.timerSeconds}s` : 'Tanpa Timer'})
                </p>
                <p className="text-[11px] sm:text-xs text-[#475569]">
                  {recentSession.dateFormatted} • {recentSession.correctCount} benar dari {recentSession.totalQuestions} soal
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('review', recentSession.id)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#0F172A] bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] flex items-center gap-1.5 transition-colors self-end sm:self-auto"
            >
              <span>Lihat Pembahasan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

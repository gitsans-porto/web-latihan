import React, { useEffect } from 'react'
import {
  Award,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Home
} from 'lucide-react'
import { triggerCompletionConfetti } from '../utils/confetti'
import { getStarRating, getFeedbackMessage } from '../utils/quizHelper'

export function ScoreView({ sessionData, onReviewSession, onRetryQuiz, onNavigate }) {
  const {
    score = 0,
    correctCount = 0,
    incorrectCount = 0,
    unansweredCount = 0,
    totalQuestions = 25,
    durationSeconds = 0,
    mode,
    timerSeconds
  } = sessionData

  useEffect(() => {
    // 1.6-second burst of confetti on completion per Skylearn
    triggerCompletionConfetti()
  }, [])

  const stars = getStarRating(score)
  const feedback = getFeedbackMessage(score)

  const formatDuration = (totalSec) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    if (mins === 0) return `${secs} detik`
    return `${mins} menit ${secs} detik`
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Score Card Header */}
      <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-center space-y-5 sm:space-y-6 shadow-xs">
        {/* Star Rating Row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                starIndex <= stars
                  ? 'bg-[#FEF3C7] text-[#D97706] scale-105 border border-[#FDE68A] shadow-[0_0_16px_rgba(251,191,36,0.3)]'
                  : 'bg-[#F8FAFC] text-[#CBD5E1] border border-[#E2E8F0]'
              }`}
            >
              <Star
                className={`w-5 h-5 sm:w-7 sm:h-7 ${
                  starIndex <= stars ? 'fill-[#FBBF24] stroke-[#D97706]' : 'stroke-current'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Score Number Display */}
        <div className="space-y-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Skor Akhir Latihan
          </span>
          <div className="flex items-baseline justify-center gap-1.5 sm:gap-2">
            <span className="font-display font-black text-5xl sm:text-7xl text-[#0F172A] tracking-tight">
              {score}
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-[#94A3B8]">
              / 100
            </span>
          </div>
        </div>

        {/* Feedback Title & Subtitle */}
        <div className="space-y-1.5 max-w-lg mx-auto">
          <div className="inline-block px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#DBEAFE] text-[#1D4ED8] mb-1">
            {feedback.tag} • {mode === 'timer' ? `Timer (${timerSeconds}s)` : 'Santai'}
          </div>
          <h2 className="font-display font-bold text-xl sm:text-3xl text-[#0F172A]">
            {feedback.title}
          </h2>
          <p className="text-[#475569] text-xs sm:text-base leading-relaxed">
            {feedback.subtitle}
          </p>
        </div>

        {/* Breakdown Badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3.5 sm:pt-4 border-t border-[#E2E8F0] max-w-md mx-auto">
          <div className="bg-[#DCFCE7] border border-[#BBF7D0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[#16A34A] mb-0.5 sm:mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs font-bold uppercase">Benar</span>
            </div>
            <span className="font-mono font-bold text-xl sm:text-2xl text-[#14532D]">
              {correctCount}
            </span>
          </div>

          <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[#B91C1C] mb-0.5 sm:mb-1">
              <XCircle className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs font-bold uppercase">Salah</span>
            </div>
            <span className="font-mono font-bold text-xl sm:text-2xl text-[#991B1B]">
              {incorrectCount + unansweredCount}
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[#475569] mb-0.5 sm:mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs font-bold uppercase">Durasi</span>
            </div>
            <span className="font-mono font-bold text-xs sm:text-base text-[#0F172A] block mt-0.5 sm:mt-1 leading-tight">
              {formatDuration(durationSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Primary CTA: Pembahasan */}
        <button
          onClick={() => onReviewSession(sessionData.id)}
          className="btn-tactile w-full min-h-[56px] sm:min-h-[64px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-display font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 sm:gap-3 shadow-[0_4px_16px_rgba(22,163,74,0.25)] border-b-2 border-[#166534]"
        >
          <BookOpen className="w-5 h-5 stroke-[2.2]" />
          <span>Lihat Pembahasan & Kunci</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Secondary Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <button
            onClick={() => onRetryQuiz(mode, timerSeconds)}
            className="btn-tactile min-h-[50px] sm:min-h-[54px] px-4 py-3 rounded-xl sm:rounded-2xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-b-2 border-[#1D4ED8]"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.2]" />
            <span>Ulangi ({mode === 'timer' ? `${timerSeconds}s` : 'Santai'})</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="btn-tactile min-h-[50px] sm:min-h-[54px] px-4 py-3 rounded-xl sm:rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-display font-bold text-sm sm:text-base border-2 border-[#E2E8F0] flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-[#D97706]" />
            <span>Semua Riwayat Latihan</span>
          </button>
        </div>

        <div className="text-center pt-1 sm:pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] inline-flex items-center gap-1.5 py-2 px-3 rounded-xl hover:bg-[#F1F5F9]"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

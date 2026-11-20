import React, { useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Award,
  Filter
} from 'lucide-react'
import { formatDate } from '../utils/quizHelper'

export function ReviewView({ session, onBack, onRetryWithSameMode }) {
  const [filterType, setFilterType] = useState('all') // 'all', 'wrong', 'correct'

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-[#475569]">Data sesi latihan tidak ditemukan.</p>
        <button
          onClick={onBack}
          className="btn-tactile px-6 py-2.5 rounded-xl bg-[#3B82F6] text-white font-bold"
        >
          Kembali ke Riwayat
        </button>
      </div>
    )
  }

  const {
    score = 0,
    dateFormatted,
    timestamp,
    mode,
    timerSeconds,
    correctCount = 0,
    incorrectCount = 0,
    unansweredCount = 0,
    totalQuestions = 25,
    answers = []
  } = session

  // Filter items
  const filteredAnswers = answers.filter((item) => {
    if (filterType === 'wrong') return !item.isCorrect
    if (filterType === 'correct') return item.isCorrect
    return true
  })

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation & Session Header */}
      <div className="space-y-3 sm:space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D4ED8] hover:text-[#1E40AF] px-2.5 py-1.5 rounded-xl hover:bg-[#DBEAFE] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Riwayat Latihan</span>
        </button>

        {/* Session Summary Card */}
        <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xs">
          <div className="flex items-center gap-3.5 sm:gap-5">
            {/* Score Pill */}
            <div
              className={`w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center border-2 shrink-0 ${
                score >= 80
                  ? 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D]'
                  : score >= 60
                  ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F]'
                  : 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
              }`}
            >
              <span className="font-mono font-black text-2xl sm:text-4xl leading-none">
                {score}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mt-0.5 sm:mt-1 opacity-80">
                Skor
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold ${
                    mode === 'timer'
                      ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                      : 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
                  }`}
                >
                  {mode === 'timer' ? `Timer (${timerSeconds}s)` : 'Santai'}
                </span>
                <span className="text-[11px] sm:text-xs text-[#94A3B8]">
                  {dateFormatted || formatDate(timestamp)}
                </span>
              </div>

              <h1 className="font-display font-black text-lg sm:text-2xl text-[#0F172A]">
                Pembahasan 25 Soal
              </h1>

              <div className="flex items-center gap-3 text-xs font-semibold pt-0.5">
                <span className="text-[#16A34A] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{correctCount} Benar</span>
                </span>
                <span className="text-[#F87171] flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{incorrectCount + unansweredCount} Salah</span>
                </span>
              </div>
            </div>
          </div>

          {onRetryWithSameMode && (
            <button
              onClick={() => onRetryWithSameMode(mode, timerSeconds)}
              className="btn-tactile w-full md:w-auto min-h-[46px] sm:min-h-[48px] px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 border-b-2 border-[#1D4ED8]"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.2]" />
              <span>Coba Latihan Lagi</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Navigation Numbers Grid */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 sm:p-4 rounded-2xl space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-bold text-[#475569] uppercase tracking-wider">
          <span>Peta Soal (Klik nomor untuk lompat):</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#16A34A]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Benar
            </span>
            <span className="flex items-center gap-1 text-[#F87171]">
              <span className="w-2 h-2 rounded-full bg-[#F87171]" /> Salah / Habis
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-25 gap-1.5 pt-1">
          {answers.map((item, index) => {
            const isCorrect = item.isCorrect
            return (
              <a
                key={index}
                href={`#question-${index + 1}`}
                className={`h-8 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all border ${
                  isCorrect
                    ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC] hover:bg-[#BBF7D0]'
                    : 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5] hover:bg-[#FECACA]'
                }`}
                title={`Soal ${index + 1}: ${isCorrect ? 'Benar' : 'Salah'}`}
              >
                {index + 1}
              </a>
            )
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`min-h-[42px] sm:min-h-[44px] flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
            filterType === 'all'
              ? 'bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]'
              : 'text-[#475569] hover:bg-[#F8FAFC]'
          }`}
        >
          Semua ({answers.length})
        </button>
        <button
          onClick={() => setFilterType('wrong')}
          className={`min-h-[42px] sm:min-h-[44px] flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
            filterType === 'wrong'
              ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]'
              : 'text-[#475569] hover:bg-[#F8FAFC]'
          }`}
        >
          Salah ({answers.filter((a) => !a.isCorrect).length})
        </button>
        <button
          onClick={() => setFilterType('correct')}
          className={`min-h-[42px] sm:min-h-[44px] flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
            filterType === 'correct'
              ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]'
              : 'text-[#475569] hover:bg-[#F8FAFC]'
          }`}
        >
          Benar ({answers.filter((a) => a.isCorrect).length})
        </button>
      </div>

      {/* Questions Breakdown List */}
      <div className="space-y-4 sm:space-y-6">
        {filteredAnswers.map((item, index) => {
          const originalIndex = answers.findIndex((a) => a.id === item.id) + 1
          const isCorrect = item.isCorrect
          const isTimedOut = item.isTimedOut || item.userAnswer === null

          return (
            <div
              key={item.id}
              id={`question-${originalIndex}`}
              className={`bg-white border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-3.5 sm:space-y-5 transition-shadow scroll-mt-20 sm:scroll-mt-24 shadow-2xs ${
                isCorrect ? 'border-[#E2E8F0]' : 'border-[#FECACA]'
              }`}
            >
              {/* Question Header & Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-mono font-bold text-sm sm:text-lg text-[#0F172A]">
                    Soal #{originalIndex}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#94A3B8] font-medium">
                    (ID {item.id})
                  </span>
                </div>

                {/* Status Indicator */}
                <div
                  className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 ${
                    isCorrect
                      ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
                      : isTimedOut
                      ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]'
                      : 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                      <span>Jawaban Tepat</span>
                    </>
                  ) : isTimedOut ? (
                    <>
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                      <span>Waktu Habis</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                      <span>Jawaban Keliru</span>
                    </>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <h3 className="font-display font-bold text-base sm:text-xl text-[#0F172A] leading-relaxed">
                {item.text}
              </h3>

              {/* Options Breakdown */}
              <div className="space-y-2 sm:space-y-2.5 pt-1">
                {Object.entries(item.options).map(([optKey, optText]) => {
                  const isThisCorrect = optKey === item.correctAnswer
                  const isThisUserAnswer = optKey === item.userAnswer

                  let tileStyle =
                    'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                  let badgeStyle =
                    'bg-white text-[#475569] border-[#E2E8F0]'
                  let labelPill = null

                  if (isThisCorrect) {
                    // Correct answer style
                    tileStyle =
                      'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] font-semibold ring-1 ring-[#16A34A]/20'
                    badgeStyle = 'bg-[#16A34A] text-white border-[#16A34A]'
                    labelPill = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#16A34A] text-white shrink-0">
                        {isThisUserAnswer ? 'Jawaban Anda ✓' : 'Kunci Jawaban ★'}
                      </span>
                    )
                  } else if (isThisUserAnswer && !isThisCorrect) {
                    // User's wrong selection
                    tileStyle =
                      'bg-[#FEE2E2] border-[#F87171] text-[#991B1B] font-semibold'
                    badgeStyle = 'bg-[#F87171] text-white border-[#F87171]'
                    labelPill = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#F87171] text-white shrink-0">
                        Pilihan Anda ✗
                      </span>
                    )
                  }

                  return (
                    <div
                      key={optKey}
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 ${tileStyle}`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5">
                        <span
                          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center font-mono font-bold text-xs sm:text-sm shrink-0 ${badgeStyle}`}
                        >
                          {optKey}
                        </span>
                        <span className="text-xs sm:text-base leading-relaxed">
                          {optText}
                        </span>
                      </div>

                      {labelPill && <div className="self-end sm:self-center">{labelPill}</div>}
                    </div>
                  )
                })}
              </div>

              {/* Correct Answer Explanation Box */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#475569] block">
                  Kunci Jawaban & Pembahasan:
                </span>
                <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed">
                  Jawaban yang benar adalah{' '}
                  <strong className="text-[#16A34A] font-bold">
                    [{item.correctAnswer}] {item.correctText}
                  </strong>
                  .
                  {!isCorrect && (
                    <span className="text-[#475569] block mt-1">
                      {isTimedOut
                        ? 'Waktu pengerjaan soal ini terlewati sebelum Anda sempat memilih jawaban.'
                        : `Anda memilih opsi [${item.userAnswer}], yang bukan merupakan jawaban yang tepat.`}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Back Button */}
      <div className="pt-2 sm:pt-4 text-center">
        <button
          onClick={onBack}
          className="btn-tactile w-full sm:w-auto min-h-[48px] sm:min-h-[50px] px-6 sm:px-8 py-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-display font-bold text-sm sm:text-base border-2 border-[#E2E8F0] inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Riwayat</span>
        </button>
      </div>
    </div>
  )
}

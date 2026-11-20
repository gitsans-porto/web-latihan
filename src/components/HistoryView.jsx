import React, { useState } from 'react'
import {
  History,
  Star,
  Clock,
  Zap,
  ArrowRight,
  Trash2,
  Filter,
  CheckCircle2,
  XCircle,
  Play
} from 'lucide-react'
import { getStarRating, formatDate } from '../utils/quizHelper'

export function HistoryView({ history = [], onSelectSession, onClearHistory, onDeleteSession, onNavigate }) {
  const [filterMode, setFilterMode] = useState('all') // 'all', 'timer', 'no-timer'
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'highest', 'lowest'
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Filter sessions
  const filtered = history.filter((item) => {
    if (filterMode === 'timer') return item.mode === 'timer'
    if (filterMode === 'no-timer') return item.mode === 'no-timer'
    return true
  })

  // Sort sessions
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'highest') return (b.score || 0) - (a.score || 0)
    if (sortBy === 'lowest') return (a.score || 0) - (b.score || 0)
    return (b.timestamp || 0) - (a.timestamp || 0) // newest
  })

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-xl sm:text-3xl text-[#0F172A]">
              Riwayat Latihan
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#DBEAFE] text-[#1D4ED8]">
              {history.length} Sesi
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5 sm:mt-1">
            Pilih sesi untuk melihat kembali seluruh soal, jawaban Anda, dan kunci jawaban.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full sm:w-auto min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#F87171] hover:text-[#EF4444] hover:bg-[#FEE2E2] border border-[#FECACA] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua Riwayat</span>
          </button>
        )}
      </div>

      {/* Filter and Sort Toolbar */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 sm:p-3 rounded-2xl">
          {/* Mode Tabs */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-[#1D4ED8] shadow-2xs border border-[#BFDBFE]'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Semua ({history.length})
            </button>
            <button
              onClick={() => setFilterMode('timer')}
              className={`px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
                filterMode === 'timer'
                  ? 'bg-white text-[#D97706] shadow-2xs border border-[#FDE68A]'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Timer ({history.filter((h) => h.mode === 'timer').length})
            </button>
            <button
              onClick={() => setFilterMode('no-timer')}
              className={`px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
                filterMode === 'no-timer'
                  ? 'bg-white text-[#16A34A] shadow-2xs border border-[#BBF7D0]'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Santai ({history.filter((h) => h.mode === 'no-timer').length})
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
            <span className="text-[#94A3B8] font-medium">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <option value="newest">Waktu Terkini</option>
              <option value="highest">Skor Tertinggi</option>
              <option value="lowest">Skor Terendah</option>
            </select>
          </div>
        </div>
      )}

      {/* History Cards List */}
      {sorted.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {sorted.map((item) => {
            const stars = getStarRating(item.score)
            return (
              <div
                key={item.id}
                onClick={() => onSelectSession(item.id)}
                className="btn-tactile bg-white border-2 border-[#E2E8F0] hover:border-[#93C5FD] rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-5 group"
              >
                {/* Left: Score Badge + Metadata */}
                <div className="flex items-center gap-3.5 sm:gap-6">
                  {/* Big Clickable Score Badge */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border-2 shrink-0 transition-transform group-hover:scale-105 ${
                      item.score >= 80
                        ? 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D]'
                        : item.score >= 60
                        ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F]'
                        : 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                    }`}
                  >
                    <span className="font-mono font-black text-2xl sm:text-3xl leading-none">
                      {item.score}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mt-0.5 sm:mt-1 opacity-80">
                      Skor
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold ${
                          item.mode === 'timer'
                            ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                            : 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
                        }`}
                      >
                        {item.mode === 'timer'
                          ? `Timer ${item.timerSeconds || 6}s`
                          : 'Santai'}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#94A3B8] font-medium">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors">
                      {item.totalQuestions || 25} Soal Latihan
                    </h3>

                    {/* Stats pills */}
                    <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold">
                      <span className="flex items-center gap-1 text-[#16A34A]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.correctCount} Benar</span>
                      </span>
                      <span className="flex items-center gap-1 text-[#F87171]">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{(item.incorrectCount || 0) + (item.unansweredCount || 0)} Salah</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectSession(item.id)
                    }}
                    className="btn-tactile flex-1 sm:flex-initial min-h-[44px] sm:min-h-[46px] px-4 sm:px-5 py-2 rounded-xl bg-[#DBEAFE] hover:bg-[#3B82F6] hover:text-white text-[#1D4ED8] font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-[#BFDBFE]"
                  >
                    <span>Lihat Pembahasan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteSession(item.id)
                    }}
                    className="p-2 sm:p-2.5 rounded-xl text-[#94A3B8] hover:text-[#F87171] hover:bg-[#FEE2E2] transition-colors shrink-0"
                    title="Hapus sesi ini"
                    aria-label="Hapus sesi latihan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#DBEAFE] text-[#1D4ED8] mx-auto flex items-center justify-center">
            <History className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="max-w-sm mx-auto space-y-1">
            <h3 className="font-display font-bold text-xl text-[#0F172A]">
              Belum Ada Riwayat Latihan
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Hasil kuis akan otomatis tersimpan di sini sehingga Anda bisa meninjau kembali setiap pertanyaan dan kunci jawabannya.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="btn-tactile min-h-[50px] px-6 py-3 rounded-2xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-base inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Mulai Latihan Sekarang</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal to Clear All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-5 animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center">
              <Trash2 className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#0F172A]">
                Hapus Semua Riwayat?
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Tindakan ini akan menghapus seluruh catatan skor dan pembahasan latihan sebelumnya dari browser ini. Data yang dihapus tidak dapat dipulihkan.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#475569] font-bold text-sm hover:bg-[#F8FAFC]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearHistory()
                  setShowClearConfirm(false)
                }}
                className="min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F87171] hover:bg-[#EF4444] text-white font-bold text-sm"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

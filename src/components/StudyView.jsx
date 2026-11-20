import React, { useState, useEffect, useMemo } from 'react'
import {
  BookOpen,
  Layers,
  Cpu,
  Calendar,
  Layout,
  Database,
  Network,
  Search,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shuffle,
  ChevronRight,
  Play
} from 'lucide-react'
import { STUDY_TOPICS, getQuestionTopicId, getQuestionsByTopic } from '../data/studyData'
import allQuestions from '../data/questions.json'

export function StudyView({ onStartQuizWithTopic, onNavigate }) {
  const [activeTab, setActiveTab] = useState('modules') // 'modules', 'flashcards', 'directory'
  const [selectedTopicId, setSelectedTopicId] = useState('sdlc-methodology')

  // Search state for directory
  const [searchQuery, setSearchQuery] = useState('')
  const [directoryTopicFilter, setDirectoryTopicFilter] = useState('all')

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [flashcardTopic, setFlashcardTopic] = useState('all')

  // Topic icon mapping
  const getTopicIcon = (id, className = 'w-5 h-5') => {
    switch (id) {
      case 'sdlc-methodology':
        return <Layers className={className} />
      case 'is-types':
        return <Cpu className={className} />
      case 'project-management':
        return <Calendar className={className} />
      case 'ui-ux':
        return <Layout className={className} />
      case 'data-modeling':
        return <Database className={className} />
      case 'process-architecture':
        return <Network className={className} />
      default:
        return <BookOpen className={className} />
    }
  }

  // Active topic object for modules
  const activeTopic = useMemo(() => {
    return STUDY_TOPICS.find((t) => t.id === selectedTopicId) || STUDY_TOPICS[0]
  }, [selectedTopicId])

  // Questions for active topic in modules view
  const topicQuestions = useMemo(() => {
    return getQuestionsByTopic(selectedTopicId)
  }, [selectedTopicId])

  // Questions for flashcards
  const flashcardQuestions = useMemo(() => {
    return getQuestionsByTopic(flashcardTopic)
  }, [flashcardTopic])

  const currentFlashcard = flashcardQuestions[flashcardIndex] || flashcardQuestions[0]

  // Reset flashcard index when topic changes
  useEffect(() => {
    setFlashcardIndex(0)
    setIsFlipped(false)
  }, [flashcardTopic])

  // Filtered questions for directory
  const filteredDirectoryQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return allQuestions.filter((q) => {
      const matchesTopic =
        directoryTopicFilter === 'all' || getQuestionTopicId(q) === directoryTopicFilter

      if (!matchesTopic) return false
      if (!query) return true

      const fullText = (
        q.text +
        ' ' +
        q.correct_text +
        ' ' +
        Object.values(q.options).join(' ') +
        ' ' +
        q.id
      ).toLowerCase()

      return fullText.includes(query)
    })
  }, [searchQuery, directoryTopicFilter])

  // Keyboard navigation for Flashcards (Space to flip, Left/Right arrows)
  useEffect(() => {
    if (activeTab !== 'flashcards') return

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsFlipped((prev) => !prev)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNextFlashcard()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevFlashcard()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab, flashcardIndex, flashcardQuestions.length])

  const handleNextFlashcard = () => {
    setIsFlipped(false)
    setFlashcardIndex((prev) => (prev + 1) % flashcardQuestions.length)
  }

  const handlePrevFlashcard = () => {
    setIsFlipped(false)
    setFlashcardIndex((prev) => (prev - 1 + flashcardQuestions.length) % flashcardQuestions.length)
  }

  const handleShuffleFlashcards = () => {
    setIsFlipped(false)
    const randomIndex = Math.floor(Math.random() * flashcardQuestions.length)
    setFlashcardIndex(randomIndex)
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs sm:text-sm font-semibold border border-[#BBF7D0]">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Modul Persiapan Ujian Tengah Semester</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0F172A] tracking-tight">
          Pusat Materi & Rangkuman Belajar
        </h1>
        <p className="text-[#475569] text-xs sm:text-base leading-relaxed">
          Kuasai konsep inti arsitektur sistem informasi, uji daya ingat melalui flashcard interaktif, atau cari istilah spesifik dari 450 bank soal.
        </p>
      </div>

      {/* Main Tab Controls: Grid 3 cols to fit perfectly on mobile */}
      <div className="w-full max-w-md mx-auto">
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] gap-1">
          <button
            onClick={() => setActiveTab('modules')}
            className={`min-h-[44px] px-2 py-2 rounded-xl font-display font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center transition-all ${
              activeTab === 'modules'
                ? 'bg-white text-[#1D4ED8] shadow-xs border border-[#BFDBFE]'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate">Rangkuman</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`min-h-[44px] px-2 py-2 rounded-xl font-display font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white text-[#D97706] shadow-xs border border-[#FDE68A]'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span className="truncate">Flashcard</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`min-h-[44px] px-2 py-2 rounded-xl font-display font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center transition-all ${
              activeTab === 'directory'
                ? 'bg-white text-[#16A34A] shadow-xs border border-[#BBF7D0]'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="truncate">450 Soal</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: RANGKUMAN MATERI PER TOPIK                          */}
      {/* ========================================================= */}
      {activeTab === 'modules' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
          {/* Topic Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {STUDY_TOPICS.map((topic) => {
              const isSelected = selectedTopicId === topic.id
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`min-h-[60px] p-2.5 sm:p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-[#DBEAFE] border-[#3B82F6] text-[#1D4ED8] shadow-xs'
                      : 'bg-white border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {getTopicIcon(topic.id, isSelected ? 'w-4 h-4 sm:w-5 sm:h-5 text-[#1D4ED8]' : 'w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8]')}
                    <span className="text-[10px] font-mono font-bold opacity-75">
                      {topic.badge.split(' ')[0]} Q
                    </span>
                  </div>
                  <span className="font-display font-bold text-xs leading-tight mt-1 line-clamp-2">
                    {topic.shortTitle}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Topic Detail Box */}
          <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
            {/* Header with Title & CTA */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-[#E2E8F0]">
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#DBEAFE] text-[#1D4ED8]">
                  {activeTopic.badge}
                </span>
                <h2 className="font-display font-bold text-xl sm:text-3xl text-[#0F172A]">
                  {activeTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl">
                  {activeTopic.summary}
                </p>
              </div>

              <button
                onClick={() => onStartQuizWithTopic(selectedTopicId)}
                className="btn-tactile w-full md:w-auto min-h-[48px] sm:min-h-[50px] px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-sm flex items-center justify-center gap-2 shrink-0 border-b-2 border-[#1D4ED8]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Uji Materi Ini di Kuis</span>
              </button>
            </div>

            {/* Key Concepts Grid */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBBF24]" />
                <span>Poin Kunci & Istilah Penting yang Sering Diujikan</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {activeTopic.keyPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 hover:border-[#93C5FD] transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[#1D4ED8] font-bold text-sm sm:text-base font-display">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span>{item.term}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-6">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Questions Accordion / List */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
                  <span>Contoh Soal & Kunci Jawaban Topik Ini ({topicQuestions.length} Soal)</span>
                </h3>
              </div>

              <div className="space-y-2.5 sm:space-y-3 max-h-[460px] overflow-y-auto pr-1 sm:pr-2">
                {topicQuestions.slice(0, 10).map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] space-y-1.5 sm:space-y-2 hover:border-[#BFDBFE] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-[#94A3B8]">
                        #{idx + 1} • ID {q.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                        Kunci: {q.correct_answer}
                      </span>
                    </div>

                    <p className="font-display font-bold text-sm sm:text-base text-[#0F172A]">
                      {q.text}
                    </p>

                    <div className="text-xs sm:text-sm font-semibold text-[#16A34A] bg-[#F0FDF4] p-2 sm:p-2.5 rounded-xl border border-[#DCFCE7]">
                      ✓ Jawaban Benar: [{q.correct_answer}] {q.correct_text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: FLASHCARD INTERAKTIF                                */}
      {/* ========================================================= */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150 max-w-2xl mx-auto">
          {/* Topic Filter for Flashcards */}
          <div className="flex items-center justify-between gap-2 bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 sm:p-3 rounded-2xl">
            <span className="text-[11px] sm:text-xs font-bold text-[#475569] uppercase tracking-wider">
              Topik Flashcard:
            </span>
            <select
              value={flashcardTopic}
              onChange={(e) => setFlashcardTopic(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] max-w-[200px] truncate"
            >
              <option value="all">Semua Topik (450 Kartu)</option>
              {STUDY_TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Flashcard Component */}
          {currentFlashcard && (
            <div className="space-y-4">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs font-bold text-[#475569]">
                <span>
                  Kartu <strong className="font-mono text-[#0F172A]">{flashcardIndex + 1}</strong> dari{' '}
                  <strong className="font-mono text-[#0F172A]">{flashcardQuestions.length}</strong>
                </span>
                <span className="text-[#94A3B8] hidden sm:inline">Tekan Spasi untuk membalik</span>
              </div>

              {/* The Flippable Card */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className={`btn-tactile min-h-[260px] sm:min-h-[340px] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs relative select-none ${
                  isFlipped
                    ? 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#3B82F6] text-[#0F172A]'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold ${
                      isFlipped
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-[#DBEAFE] text-[#1D4ED8]'
                    }`}
                  >
                    {isFlipped ? 'KUNCI JAWABAN BENAR' : 'PERTANYAAN SOAL'}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-bold opacity-60">
                    ID #{currentFlashcard.id}
                  </span>
                </div>

                {/* Card Main Content */}
                <div className="py-4 sm:py-6 text-center space-y-2 sm:space-y-3">
                  {!isFlipped ? (
                    <h3 className="font-display font-bold text-lg sm:text-2xl leading-snug">
                      {currentFlashcard.text}
                    </h3>
                  ) : (
                    <div className="space-y-1.5 sm:space-y-2">
                      <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#16A34A] block">
                        Pilihan Kunci [{currentFlashcard.correct_answer}]
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-3xl text-[#14532D] leading-snug">
                        {currentFlashcard.correct_text}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Bottom Flip Hint */}
                <div className="text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full ${
                      isFlipped
                        ? 'bg-white text-[#16A34A] border border-[#BBF7D0]'
                        : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]'
                    }`}
                  >
                    <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Klik kartu untuk membalik ({isFlipped ? 'Lihat Soal' : 'Lihat Kunci'})</span>
                  </span>
                </div>
              </div>

              {/* Controls: Prev, Next, Shuffle */}
              <div className="flex items-center justify-between gap-2.5 pt-1">
                <button
                  onClick={handlePrevFlashcard}
                  className="btn-tactile min-h-[48px] px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl bg-white border-2 border-[#E2E8F0] hover:bg-[#F8FAFC] font-display font-bold text-xs sm:text-sm text-[#0F172A] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={handleShuffleFlashcards}
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                  title="Acak Kartu"
                  aria-label="Acak Kartu"
                >
                  <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="btn-tactile min-h-[48px] px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-2xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-xs sm:text-sm flex items-center gap-1.5 border-b-2 border-[#1D4ED8]"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: DIREKTORI 450 SOAL & PENCARIAN KATA KUNCI          */}
      {/* ========================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
          {/* Search Bar & Topic Filter */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 sm:p-4 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik kata kunci (contoh: RUP, RAD, SPK)..."
                  className="w-full min-h-[48px] sm:min-h-[52px] pl-10 sm:pl-12 pr-4 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] text-xs sm:text-base font-body text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                />
              </div>

              {/* Topic Select */}
              <select
                value={directoryTopicFilter}
                onChange={(e) => setDirectoryTopicFilter(e.target.value)}
                className="min-h-[48px] sm:min-h-[52px] px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] text-xs sm:text-sm font-bold text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <option value="all">Semua Kategori (450 Soal)</option>
                {STUDY_TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#475569]">
              <span>
                Menampilkan{' '}
                <strong className="text-[#0F172A] font-bold">
                  {filteredDirectoryQuestions.length}
                </strong>{' '}
                soal dari 450
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#1D4ED8] hover:underline"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          </div>

          {/* Questions Grid / List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredDirectoryQuestions.length > 0 ? (
              filteredDirectoryQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-white border-2 border-[#E2E8F0] hover:border-[#93C5FD] rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-2xs transition-all"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#94A3B8]">
                      #{idx + 1} • ID #{q.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                      Kunci: [{q.correct_answer}]
                    </span>
                  </div>

                  {/* Question Text */}
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A]">
                    {q.text}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {Object.entries(q.options).map(([optKey, optText]) => {
                      const isCorrect = optKey === q.correct_answer
                      return (
                        <div
                          key={optKey}
                          className={`p-2.5 sm:p-3 rounded-xl border flex items-center gap-2 text-xs sm:text-sm ${
                            isCorrect
                              ? 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] font-bold shadow-2xs'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] sm:text-xs shrink-0 ${
                              isCorrect
                                ? 'bg-[#16A34A] text-white'
                                : 'bg-white text-[#475569] border border-[#E2E8F0]'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="line-clamp-2">{optText}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Answer Summary Box */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2 text-xs font-bold text-[#16A34A]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Kunci Jawaban:{' '}
                      <strong className="underline">
                        [{q.correct_answer}] {q.correct_text}
                      </strong>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 rounded-3xl bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] text-center space-y-2">
                <Search className="w-8 h-8 text-[#94A3B8] mx-auto" />
                <p className="font-display font-bold text-base text-[#0F172A]">
                  Tidak ada soal yang cocok dengan "{searchQuery}"
                </p>
                <p className="text-xs text-[#475569]">
                  Coba kata kunci lain atau pilih kategori topik yang berbeda.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

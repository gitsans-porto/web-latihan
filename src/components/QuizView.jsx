import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  LogOut,
  FastForward,
  Award
} from 'lucide-react'

export function QuizView({
  questions,
  mode = 'timer',
  timerSeconds = 6,
  onFinishQuiz,
  onCancelQuiz
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isTimedOut, setIsTimedOut] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  // Typewriter & Option Stagger Animation state
  const [displayedText, setDisplayedText] = useState('')
  const [visibleOptions, setVisibleOptions] = useState([])
  const [animationFinished, setAnimationFinished] = useState(false)

  // Timer countdown state
  const [timeLeft, setTimeLeft] = useState(timerSeconds)
  const timerRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const questionStartTimeRef = useRef(Date.now())
  const sessionStartTimeRef = useRef(Date.now())

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  // Skip animation function (instant reveal)
  const skipAnimation = useCallback(() => {
    if (!currentQuestion) return
    setDisplayedText(currentQuestion.text)
    setVisibleOptions(Object.keys(currentQuestion.options))
    setAnimationFinished(true)
  }, [currentQuestion])

  // Initialize and run typewriter animation when currentIndex changes
  useEffect(() => {
    if (!currentQuestion) return

    setSelectedOption(null)
    setIsAnswered(false)
    setIsTimedOut(false)
    questionStartTimeRef.current = Date.now()

    const optionsKeys = Object.keys(currentQuestion.options)

    if (mode === 'timer') {
      // Typewriter effect for question text: 10ms per char
      setDisplayedText('')
      setVisibleOptions([])
      setAnimationFinished(false)

      let charIndex = 0
      const fullText = currentQuestion.text
      const textInterval = setInterval(() => {
        charIndex += 1
        setDisplayedText(fullText.slice(0, charIndex))
        if (charIndex >= fullText.length) {
          clearInterval(textInterval)
          setAnimationFinished(true)
        }
      }, 10)

      // Stagger options reveal: A at 250ms, B at 450ms, C at 650ms
      const optionTimeouts = []
      optionsKeys.forEach((key, idx) => {
        const timeout = setTimeout(() => {
          setVisibleOptions((prev) => (prev.includes(key) ? prev : [...prev, key]))
        }, 220 + idx * 160)
        optionTimeouts.push(timeout)
      })

      return () => {
        clearInterval(textInterval)
        optionTimeouts.forEach(clearTimeout)
      }
    } else {
      // In relaxed no-timer mode, show question immediately
      setDisplayedText(currentQuestion.text)
      setVisibleOptions(optionsKeys)
      setAnimationFinished(true)
    }
  }, [currentIndex, currentQuestion, mode])

  // Timer countdown logic
  useEffect(() => {
    if (mode !== 'timer' || isAnswered || isTimedOut) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    setTimeLeft(timerSeconds)
    startTimeRef.current = Date.now()
    const targetDurationMs = timerSeconds * 1000

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const remainingMs = Math.max(0, targetDurationMs - elapsed)
      const remainingSec = remainingMs / 1000

      setTimeLeft(remainingSec)

      if (remainingMs <= 0) {
        clearInterval(timerRef.current)
        handleTimeout()
      }
    }, 40)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIndex, mode, isAnswered, isTimedOut, timerSeconds])

  // Handle timeout (time ran out)
  const handleTimeout = () => {
    setIsTimedOut(true)
    setIsAnswered(true)
    skipAnimation()

    const answerRecord = {
      id: currentQuestion.id,
      text: currentQuestion.text,
      options: currentQuestion.options,
      userAnswer: null,
      correctAnswer: currentQuestion.correct_answer,
      correctText: currentQuestion.correct_text,
      isCorrect: false,
      isTimedOut: true,
      timeSpent: timerSeconds
    }

    setUserAnswers((prev) => [...prev, answerRecord])
  }

  // Handle user selecting an option
  const handleSelectOption = (optionKey) => {
    if (isAnswered || isTimedOut) return

    if (timerRef.current) clearInterval(timerRef.current)
    skipAnimation()

    const timeSpent = Math.max(0.1, (Date.now() - questionStartTimeRef.current) / 1000)
    const isCorrect = optionKey === currentQuestion.correct_answer

    setSelectedOption(optionKey)
    setIsAnswered(true)

    const answerRecord = {
      id: currentQuestion.id,
      text: currentQuestion.text,
      options: currentQuestion.options,
      userAnswer: optionKey,
      correctAnswer: currentQuestion.correct_answer,
      correctText: currentQuestion.correct_text,
      isCorrect: isCorrect,
      isTimedOut: false,
      timeSpent: Number(timeSpent.toFixed(1))
    }

    setUserAnswers((prev) => [...prev, answerRecord])
  }

  // Advance to next question or complete quiz
  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Quiz completed!
      const totalSessionTime = Math.round((Date.now() - sessionStartTimeRef.current) / 1000)
      const correctCount = userAnswers.filter((a) => a.isCorrect).length
      const incorrectCount = userAnswers.filter((a) => !a.isCorrect && !a.isTimedOut).length
      const unansweredCount = userAnswers.filter((a) => a.isTimedOut || a.userAnswer === null).length
      const score = Math.round((correctCount / totalQuestions) * 100)

      onFinishQuiz({
        id: `quiz-${Date.now()}`,
        timestamp: Date.now(),
        mode,
        timerSeconds: mode === 'timer' ? timerSeconds : null,
        score,
        correctCount,
        incorrectCount,
        unansweredCount,
        totalQuestions,
        durationSeconds: totalSessionTime,
        answers: userAnswers
      })
    }
  }

  // Keyboard navigation listener (A, B, C / 1, 2, 3 to choose, Enter for Next, Space to skip anim)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showExitModal) return

      const key = e.key.toUpperCase()

      // When answered, Enter moves to next question
      if (isAnswered || isTimedOut) {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleNext()
        }
        return
      }

      // Space skips animation
      if (e.code === 'Space' && !animationFinished) {
        e.preventDefault()
        skipAnimation()
        return
      }

      // Map options
      let chosenKey = null
      if (key === 'A' || key === '1') chosenKey = 'A'
      else if (key === 'B' || key === '2') chosenKey = 'B'
      else if (key === 'C' || key === '3') chosenKey = 'C'

      if (chosenKey && currentQuestion.options[chosenKey]) {
        e.preventDefault()
        handleSelectOption(chosenKey)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isAnswered,
    isTimedOut,
    animationFinished,
    currentQuestion,
    showExitModal,
    handleNext,
    skipAnimation
  ])

  // Timer visual calculations
  const progressRatio = Math.max(0, Math.min(1, timeLeft / timerSeconds))
  const timerColor =
    progressRatio > 0.5 ? '#22C55E' : progressRatio > 0.25 ? '#FBBF24' : '#F87171'

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Top Header Bar: Progress, Question Index & Timer */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 sm:p-5 shadow-xs space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-display font-black text-base sm:text-xl text-[#0F172A]">
              Soal {currentIndex + 1}
            </span>
            <span className="text-[#475569] font-medium text-xs sm:text-sm">
              /{totalQuestions}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold ${
                mode === 'timer'
                  ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                  : 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
              }`}
            >
              {mode === 'timer' ? `Timer ${timerSeconds}s` : 'Santai'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Countdown Badge for Timer Mode */}
            {mode === 'timer' && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl border font-mono font-bold text-sm sm:text-base transition-colors ${
                  isTimedOut
                    ? 'bg-[#FEE2E2] text-[#B91C1C] border-[#F87171]'
                    : timeLeft <= 2
                    ? 'bg-[#FEE2E2] text-[#B91C1C] border-[#F87171] animate-pulse'
                    : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0]'
                }`}
                aria-live="polite"
              >
                <Clock
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]"
                  style={{ color: timerColor }}
                />
                <span>{timeLeft.toFixed(1)}s</span>
              </div>
            )}

            {/* Exit Quiz Button */}
            <button
              onClick={() => setShowExitModal(true)}
              className="p-1.5 sm:p-2 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              title="Keluar dari sesi latihan"
              aria-label="Keluar latihan"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="w-full bg-[#DBEAFE] h-2 sm:h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#22C55E] h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Timer Countdown Line (if mode === 'timer') */}
        {mode === 'timer' && !isAnswered && !isTimedOut && (
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-75 rounded-full"
              style={{
                width: `${progressRatio * 100}%`,
                backgroundColor: timerColor
              }}
            />
          </div>
        )}
      </div>

      {/* Main Question Card */}
      <div
        onClick={() => {
          if (!animationFinished) skipAnimation()
        }}
        className="bg-white border-2 border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xs relative cursor-default"
      >
        {/* Skip Animation pill indicator if still typing */}
        {mode === 'timer' && !animationFinished && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              skipAnimation()
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[11px] sm:text-xs font-semibold text-[#1D4ED8] bg-[#DBEAFE] hover:bg-[#BFDBFE] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
          >
            <FastForward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Tampilkan Penuh</span>
          </button>
        )}

        {/* Question Text */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Pertanyaan ID #{currentQuestion.id}
          </span>
          <h2 className="font-display font-bold text-lg sm:text-2xl text-[#0F172A] leading-snug min-h-[48px]">
            {displayedText}
            {mode === 'timer' && !animationFinished && (
              <span className="inline-block w-2 h-5 sm:h-6 bg-[#3B82F6] ml-1 animate-pulse align-middle" />
            )}
          </h2>
        </div>

        {/* Options Grid (A, B, C) */}
        <div
          className="space-y-2.5 sm:space-y-3 pt-1"
          role="radiogroup"
          aria-label="Pilihan jawaban"
        >
          {Object.entries(currentQuestion.options).map(([key, text]) => {
            const isVisible = visibleOptions.includes(key)
            const isSelected = selectedOption === key
            const isCorrect = key === currentQuestion.correct_answer

            let optionStyle =
              'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] hover:border-[#93C5FD]'
            let badgeStyle =
              'bg-white text-[#475569] border-[#E2E8F0]'

            if (isAnswered || isTimedOut) {
              if (isCorrect) {
                // Correct answer is always highlighted in Leaf
                optionStyle =
                  'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] shadow-2xs font-semibold'
                badgeStyle = 'bg-[#16A34A] text-white border-[#16A34A]'
              } else if (isSelected && !isCorrect) {
                // User's wrong answer highlighted in Coral
                optionStyle =
                  'bg-[#FEE2E2] border-[#F87171] text-[#991B1B] shadow-2xs'
                badgeStyle = 'bg-[#F87171] text-white border-[#F87171]'
              } else {
                // Other options muted
                optionStyle = 'bg-white border-[#E2E8F0] text-[#94A3B8] opacity-60'
                badgeStyle = 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]'
              }
            }

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectOption(key)}
                disabled={isAnswered || isTimedOut}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 180ms ease, transform 180ms ease'
                }}
                className={`btn-tactile w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 flex items-center justify-between gap-3 min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${optionStyle}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm sm:text-base shrink-0 ${badgeStyle}`}
                  >
                    {key}
                  </span>
                  <span className="text-sm sm:text-lg leading-relaxed font-body">
                    {text}
                  </span>
                </div>

                {/* State Icons */}
                {(isAnswered || isTimedOut) && (
                  <div className="shrink-0 pl-1">
                    {isCorrect && (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#16A34A] stroke-[2.4]" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F87171] stroke-[2.4]" />
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Immediate Feedback Banner */}
        {(isAnswered || isTimedOut) && (
          <div
            className={`p-3.5 sm:p-5 rounded-2xl border-2 flex items-start gap-3 transition-all duration-200 ${
              isTimedOut
                ? 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                : selectedOption === currentQuestion.correct_answer
                ? 'bg-[#DCFCE7] border-[#22C55E] text-[#14532D]'
                : 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
            }`}
          >
            {isTimedOut ? (
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F87171] shrink-0 mt-0.5" />
            ) : selectedOption === currentQuestion.correct_answer ? (
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#16A34A] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F87171] shrink-0 mt-0.5" />
            )}

            <div className="space-y-0.5 sm:space-y-1">
              <p className="font-display font-bold text-sm sm:text-lg">
                {isTimedOut
                  ? 'Waktu Habis!'
                  : selectedOption === currentQuestion.correct_answer
                  ? 'Tepat sekali!'
                  : 'Kurang tepat'}
              </p>
              <p className="text-xs sm:text-base leading-relaxed opacity-95">
                Kunci Jawaban:{' '}
                <strong className="font-bold underline">
                  {currentQuestion.correct_answer}. {currentQuestion.correct_text}
                </strong>
              </p>
            </div>
          </div>
        )}

        {/* Footer Next Button */}
        {(isAnswered || isTimedOut) && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              autoFocus
              className="btn-tactile w-full sm:w-auto min-h-[54px] sm:min-h-[58px] px-6 sm:px-8 py-3.5 rounded-2xl bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-display font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(59,130,246,0.25)] border-b-2 border-[#1D4ED8]"
            >
              <span>
                {currentIndex + 1 < totalQuestions
                  ? 'Lanjut Soal Berikutnya'
                  : 'Lihat Hasil Latihan'}
              </span>
              <ArrowRight className="w-5 h-5" />
              <span className="text-xs font-mono font-normal opacity-80 ml-1 hidden sm:inline">
                (Enter ↵)
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center">
              <LogOut className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#0F172A]">
                Keluar dari Latihan?
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Progres pengerjaan sesi ini belum selesai dan tidak akan tersimpan ke riwayat. Anda yakin ingin kembali ke beranda?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#475569] font-bold text-sm hover:bg-[#F8FAFC]"
              >
                Tetap Lanjut
              </button>
              <button
                type="button"
                onClick={onCancelQuiz}
                className="min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F87171] hover:bg-[#EF4444] text-white font-bold text-sm"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

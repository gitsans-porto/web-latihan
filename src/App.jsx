import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HomeView } from './components/HomeView'
import { QuizView } from './components/QuizView'
import { ScoreView } from './components/ScoreView'
import { HistoryView } from './components/HistoryView'
import { ReviewView } from './components/ReviewView'
import { StudyView } from './components/StudyView'

import { getRandomQuestions, getRandomQuestionsFromPool } from './utils/quizHelper'
import { getQuestionsByTopic } from './data/studyData'
import {
  getQuizHistory,
  saveQuizResult,
  deleteQuizSession,
  clearAllQuizHistory,
  getQuizStats,
  getQuizSessionById
} from './utils/storage'

export default function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'study', 'quiz', 'score', 'history', 'review'
  const [historyList, setHistoryList] = useState([])
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    highestScore: 0,
    totalQuestionsAnswered: 0
  })

  // Quiz active state
  const [activeQuestions, setActiveQuestions] = useState([])
  const [quizMode, setQuizMode] = useState('no-timer') // 'no-timer', 'timer'
  const [quizTimerSeconds, setQuizTimerSeconds] = useState(6)
  const [latestSessionData, setLatestSessionData] = useState(null)
  const [selectedReviewSession, setSelectedReviewSession] = useState(null)

  // Load history & stats on mount
  useEffect(() => {
    refreshHistoryData()
  }, [])

  const refreshHistoryData = () => {
    const list = getQuizHistory()
    setHistoryList(list)
    setStats(getQuizStats())
  }

  // Start new quiz session (all random questions)
  const handleStartQuiz = (mode = 'no-timer', timerSeconds = 6) => {
    const questions = getRandomQuestions(25)
    setActiveQuestions(questions)
    setQuizMode(mode)
    setQuizTimerSeconds(timerSeconds)
    setCurrentView('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Start quiz with questions specifically from a study topic
  const handleStartQuizWithTopic = (topicId) => {
    const topicPool = getQuestionsByTopic(topicId)
    const questions = getRandomQuestionsFromPool(topicPool, Math.min(25, topicPool.length))
    setActiveQuestions(questions)
    setQuizMode('no-timer')
    setQuizTimerSeconds(6)
    setCurrentView('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Quiz completed
  const handleFinishQuiz = (result) => {
    saveQuizResult(result)
    refreshHistoryData()
    setLatestSessionData(result)
    setCurrentView('score')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cancel/Exit quiz
  const handleCancelQuiz = () => {
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Review a specific session
  const handleSelectReviewSession = (sessionId) => {
    const session = getQuizSessionById(sessionId)
    if (session) {
      setSelectedReviewSession(session)
      setCurrentView('review')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Delete a specific session
  const handleDeleteSession = (sessionId) => {
    deleteQuizSession(sessionId)
    refreshHistoryData()
    if (selectedReviewSession && selectedReviewSession.id === sessionId) {
      setCurrentView('history')
    }
  }

  // Clear all history
  const handleClearHistory = () => {
    clearAllQuizHistory()
    refreshHistoryData()
    setSelectedReviewSession(null)
  }

  // Navigation router
  const handleNavigate = (view, targetId = null) => {
    if (view === 'review' && targetId) {
      handleSelectReviewSession(targetId)
      return
    }
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-body selection:bg-[#DBEAFE] selection:text-[#1D4ED8] w-full max-w-full overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeSessionCount={historyList.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentView === 'home' && (
          <HomeView
            onStartQuiz={handleStartQuiz}
            onNavigate={handleNavigate}
            stats={stats}
            recentSession={historyList[0] || null}
          />
        )}

        {currentView === 'study' && (
          <StudyView
            onStartQuizWithTopic={handleStartQuizWithTopic}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            questions={activeQuestions}
            mode={quizMode}
            timerSeconds={quizTimerSeconds}
            onFinishQuiz={handleFinishQuiz}
            onCancelQuiz={handleCancelQuiz}
          />
        )}

        {currentView === 'score' && latestSessionData && (
          <ScoreView
            sessionData={latestSessionData}
            onReviewSession={handleSelectReviewSession}
            onRetryQuiz={handleStartQuiz}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            history={historyList}
            onSelectSession={handleSelectReviewSession}
            onClearHistory={handleClearHistory}
            onDeleteSession={handleDeleteSession}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'review' && (
          <ReviewView
            session={selectedReviewSession}
            onBack={() => handleNavigate('history')}
            onRetryWithSameMode={handleStartQuiz}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E2E8F0] bg-[#F8FAFC] py-4 sm:py-8 w-full max-w-full overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs text-[#475569] text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span className="font-bold text-[#0F172A]">Skylearn ARSI</span>
            <span>•</span>
            <span>450 Bank Soal UTS</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-[#64748B]">
            <span>Modul & Flashcard</span>
            <span>•</span>
            <span>25 Soal Acak</span>
            <span>•</span>
            <span>LocalStorage</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

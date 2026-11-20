const STORAGE_KEY = 'skylearn_arsi_quiz_history_v1'

export function getQuizHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to load quiz history from localStorage:', error)
    return []
  }
}

export function saveQuizResult(sessionData) {
  try {
    const history = getQuizHistory()
    const updated = [sessionData, ...history]
    // Keep max 100 recent sessions to prevent unbounded storage growth
    const trimmed = updated.slice(0, 100)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    return true
  } catch (error) {
    console.error('Failed to save quiz result to localStorage:', error)
    return false
  }
}

export function getQuizSessionById(id) {
  const history = getQuizHistory()
  return history.find(item => item.id === id) || null
}

export function deleteQuizSession(id) {
  try {
    const history = getQuizHistory()
    const updated = history.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch (error) {
    console.error('Failed to delete quiz session:', error)
    return false
  }
}

export function clearAllQuizHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Failed to clear quiz history:', error)
    return false
  }
}

export function getQuizStats() {
  const history = getQuizHistory()
  if (history.length === 0) {
    return {
      totalSessions: 0,
      averageScore: 0,
      highestScore: 0,
      totalQuestionsAnswered: 0
    }
  }

  const totalScore = history.reduce((sum, item) => sum + (item.score || 0), 0)
  const averageScore = Math.round(totalScore / history.length)
  const highestScore = Math.max(...history.map(item => item.score || 0))
  const totalQuestionsAnswered = history.reduce((sum, item) => sum + (item.totalQuestions || 25), 0)

  return {
    totalSessions: history.length,
    averageScore,
    highestScore,
    totalQuestionsAnswered
  }
}

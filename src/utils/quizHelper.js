import rawQuestions from '../data/questions.json'

export function getRandomQuestions(count = 25) {
  return getRandomQuestionsFromPool(rawQuestions, count)
}

export function getRandomQuestionsFromPool(sourcePool, count = 25) {
  const pool = [...sourcePool]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(count, pool.length))
}

export function calculateScore(correctCount, totalQuestions = 25) {
  if (totalQuestions === 0) return 0
  return Math.round((correctCount / totalQuestions) * 100)
}

export function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getStarRating(score) {
  if (score >= 85) return 3
  if (score >= 60) return 2
  return 1
}

export function getFeedbackMessage(score) {
  if (score === 100) {
    return {
      title: 'Luar Biasa!',
      subtitle: 'Semua 25 soal berhasil dijawab dengan tepat tanpa kesalahan.',
      tag: 'Sempurna'
    }
  }
  if (score >= 80) {
    return {
      title: 'Pemahaman Sangat Baik!',
      subtitle: 'Sebagian besar konsep arsitektur sistem informasi sudah Anda kuasai dengan baik.',
      tag: 'Hebat'
    }
  }
  if (score >= 60) {
    return {
      title: 'Hasil yang Cukup Bagus!',
      subtitle: 'Tingkatkan latihan pada soal-soal yang keliru agar pemahaman semakin matang.',
      tag: 'Bagus'
    }
  }
  return {
    title: 'Ayo Terus Berlatih!',
    subtitle: 'Periksa pembahasan soal di bawah ini untuk mempelajari konsep yang belum dipahami.',
    tag: 'Tetap Semangat'
  }
}

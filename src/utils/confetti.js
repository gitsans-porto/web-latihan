import confetti from 'canvas-confetti'

export function triggerCompletionConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const end = Date.now() + 1600
  const colors = ['#3B82F6', '#FBBF24', '#22C55E', '#A855F7']

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.2 },
      colors
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.2 },
      colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

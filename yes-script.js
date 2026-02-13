let musicPlaying = false
let music = null

window.addEventListener('load', () => {
    launchConfetti()

    music = document.getElementById('bg-music')
    music.volume = 0
    music.play().then(() => {
        fadeInMusic()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }).catch(() => {})
})

/* ---------- Smooth Music Fade In ---------- */
function fadeInMusic() {
    const targetVolume = 0.3
    const step = 0.02
    const interval = setInterval(() => {
        if (music.volume < targetVolume) {
            music.volume = Math.min(music.volume + step, targetVolume)
        } else {
            clearInterval(interval)
        }
    }, 100)
}

/* ---------- Elegant Confetti ---------- */
function launchConfetti() {
    const colors = [
        '#d4af37', // gold
        '#f5deb3', // soft wheat
        '#ffffff', // white
        '#e6c79c', // champagne
        '#c0c0c0'  // silver
    ]

    const duration = 5000
    const end = Date.now() + duration

    // Soft center burst
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.5, y: 0.4 },
        colors,
        scalar: 1.1
    })

    // Subtle side drift
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 25,
            angle: 60,
            spread: 50,
            origin: { x: 0, y: 0.7 },
            colors,
            scalar: 0.9
        })

        confetti({
            particleCount: 25,
            angle: 120,
            spread: 50,
            origin: { x: 1, y: 0.7 },
            colors,
            scalar: 0.9
        })
    }, 400)
}

/* ---------- Music Toggle ---------- */
function toggleMusic() {
    if (!music) return

    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

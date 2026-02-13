const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif"
]

const noMessages = [
    "No",
    "Are you sure?",
    "Hmm… okay 🥲",
    "I’ll still choose you though.",
    "Take your time."
]

const softResponses = [
    "No pressure. I just wanted to ask properly.",
    "Even if you say no, I still think you're wonderful.",
    "I’ll be right here."
]

let noClickCount = 0
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

/* ---------- Smooth Audio Handling ---------- */
music.volume = 0.3
music.muted = true

document.addEventListener('click', () => {
    if (music.paused) {
        music.muted = false
        music.play().catch(() => {})
    }
}, { once: true })

function toggleMusic() {
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

/* ---------- YES Click ---------- */
function handleYesClick() {
    showTeaseMessage("That made me smile. 😊")
    setTimeout(() => {
        window.location.href = 'yes.html'
    }, 1000)
}

/* ---------- NO Click ---------- */
function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 3) {
        const softMsg = softResponses[Math.min(noClickCount - 3, softResponses.length - 1)]
        showTeaseMessage(softMsg)
    }
}

/* ---------- GIF Swap ---------- */
function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 250)
}

/* ---------- Toast Message ---------- */
function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000)
}

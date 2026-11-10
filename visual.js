const AUDIO_URL = "https://raw.githubusercontent.com/AMIA322002/visual-test/main/songs%20of%20disstress%20(short%20ver).wav"
const IMAGE_URL = "https://raw.githubusercontent.com/AMIA322002/visual-test/main/pleasurekiller.png"
const TONE_URL = "https://unpkg.com/tone@14.7.77"

const NUM_BINS = 8
const SMOOTHING = 0.5
const DB_MIN = -90
const DB_MAX = -25

const fft = new Array(NUM_BINS).fill(0)

if (window.__distress) {
  cancelAnimationFrame(window.__distress.raf)
  window.__distress.player.dispose()
  window.__distress.analyser.dispose()
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (window.Tone) return resolve()
    const script = document.createElement("script")
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

async function initAudio() {
  await loadScript(TONE_URL)

  const player = new Tone.Player({ url: AUDIO_URL, loop: true }).toDestination()
  const analyser = new Tone.Analyser("fft", 256)
  player.connect(analyser)

  await Tone.loaded()
  player.start()
  window.__distress = { player, analyser, raf: 0 }

  const edges = [0, 2, 4, 8, 16, 32, 64, 128, 256]

  const tick = () => {
    const values = analyser.getValue()
    for (let i = 0; i < NUM_BINS; i++) {
      let sum = 0
      for (let j = edges[i]; j < edges[i + 1]; j++) sum += values[j]
      const db = sum / (edges[i + 1] - edges[i])
      const norm = Math.min(1, Math.max(0, (db - DB_MIN) / (DB_MAX - DB_MIN)))
      fft[i] = fft[i] * SMOOTHING + norm * (1 - SMOOTHING)
    }
    window.__distress.raf = requestAnimationFrame(tick)
  }
  tick()

  window.addEventListener("click", async () => {
    await Tone.start()
    if (player.state !== "started") player.start()
  }, { once: true })
}

initAudio()

s0.initImage(IMAGE_URL)

noise(3, () => 0.1 + fft[5] * 2.0)
  .kaleid(() => 4 + Math.floor(fft[7] * 20))
  .luma(() => 0.1 + fft[4] * 0.3, 0.2)
  .posterize(() => 2 + Math.floor(fft[5] * 10), 0.5)
  .pixelate(() => 100 - fft[6] * 80, () => 100 - fft[6] * 80)
  .saturate(() => 1 + fft[3] * 3)
  .layer(
    src(s0)
      .mask(shape(4, 1, 0.001))
      .scale(
        () => 0.45 + fft[1] * 1.2,
        () => window.innerWidth / window.innerHeight,
        0.5
      )
  )
  .out()

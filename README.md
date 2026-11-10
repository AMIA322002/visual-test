# VISUAL-TEST

A live-coded, audio-reactive visual built with [Hydra](https://hydra.ojack.xyz) and [Tone.js](https://tonejs.github.io/). A looping track plays while its frequency data drives a glitchy kaleidoscope with a central logo that pulses to the music.

## Demo

Watch the visual in action on Instagram: [View demo](https://www.instagram.com/p/DfRvvBYE_K2/?img_index=4)

## How it works

- **Audio:** Tone.js loads a `.wav` file from this repo and loops it.
- **Analysis:** A Tone.js FFT analyser reads the track directly. Its output is grouped into 8 log-spaced frequency bands, normalized to 0–1 and smoothed. These live in an `fft` array that the visuals read from.
- **Visuals:** A noise generator is stacked with kaleidoscope, luma, posterize, pixelate and saturate effects, with a square-masked image layered on top as the logo.

> Hydra's built-in `a` audio object only listens to the microphone and can't take another audio source, so this project bypasses it and does its own analysis. The visual reacts to the track itself, not to sound in the room.

### Band mapping

| Band | Roughly | Controls |
|------|---------|----------|
| `fft[1]` | 170–340 Hz | Logo scale |
| `fft[3]` | 700 Hz–1.4 kHz | Saturation |
| `fft[4]` | 1.4–2.8 kHz | Luma threshold |
| `fft[5]` | 2.8–5.5 kHz | Noise offset + posterize levels |
| `fft[6]` | 5.5–11 kHz | Pixelation |
| `fft[7]` | 11 kHz and up | Kaleidoscope segments |

Frequency ranges are approximate and assume a 44.1 kHz sample rate.

## Usage

1. Open the [Hydra editor](https://hydra.ojack.xyz).
2. Paste the contents of `visual.js` into the editor.
3. Press `Ctrl + Shift + Enter` to run it.
4. **Click anywhere on the page.** Browsers block autoplay, so audio only starts after a user interaction.

Hydra may ask for microphone access when it loads. You can deny it, since this visual doesn't use the mic.

## Customizing

Settings are at the top of `visual.js`:

| Setting | What it does |
|---------|--------------|
| `AUDIO_URL` | Direct link to any audio file |
| `IMAGE_URL` | Logo image |
| `SMOOTHING` | `0` = instant response, closer to `1` = calmer |
| `DB_MIN` / `DB_MAX` | Volume range mapped to 0–1. Narrow it for more sensitivity, widen it for less |

To remap effects, change which `fft[n]` each effect reads from in the visual chain.

## Dependencies

Both load at runtime, so there's nothing to install:

- Hydra (provided by the editor)
- Tone.js 14.7.77 (loaded from unpkg)

## Credits
- Kak Andra who's given me the opportunity to have this presented at a 97Kobolab.
- Friends who have watched me cringe out at my own creation while also holding out a really big laugh at it.
- Moxa, who sparked this entire project by keeping jokingly encouraging me to actually make it happen in the first place.
- Built with [Hydra](https://github.com/hydra-synth/hydra) by Olivia Jack and [Tone.js](https://github.com/Tonejs/Tone.js)

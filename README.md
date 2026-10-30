# Faraidun Avatar Explainer Reel

A high-production 1080×1920 vertical explainer reel built with [HyperFrames](https://hyperframes.studio), GSAP, and custom procedural audio pipelines.

## Project Overview

* **Format**: 1080×1920 (9:16 vertical)
* **Duration**: 37.50 seconds (1,125 frames at 30 fps)
* **Topic**: Gemini Flash 4 Rumors
* **Style**: Warm cream paper texture (`#EBE7E1`), Ink (`#1E1C1A`), Red (`#D7372C`), 3px ink borders with halftone dot shadows.
* **Presenter Rig**: Cartoon character avatar with glasses, hoodie, flat colours, 6px outlines, speaking continuously with real-time loudness lip-sync (shapes 0–9), stochastic blinking, nods, and gestures.
* **Audio**: Kokoro `am_adam` neural TTS (1.1x speed, silent pauses trimmed to ≤0.24s), word-level alignment via `faster-whisper`, warm Rhodes beat, and 19 frame-locked SFX cues.

## Specifications & Prompt

See [PROMPT.md](file:///home/faraidun/Projects/videos/faraidun-avatar/PROMPT.md) for the complete original master prompt, design direction, structure, and constraints.

## Project Structure

```
faraidun-avatar/
├── index.html                  # Master timeline & composition tracks
├── PROMPT.md                   # Full original design & prompt specification
├── package.json                # Dependencies & CLI commands
├── hyperframes.json            # HyperFrames project configuration
├── out.mp4                     # Final rendered 1080x1920 30fps video
└── src/
    ├── audio/                  # Synthesized voice, beats, SFX, and word timings
    │   ├── timings.json        # 102 word timestamps, 1,120 frame mouth shapes
    │   ├── voice.wav           # Primary processed voice stem
    │   └── music.wav           # Lo-fi background track
    ├── audio-tracks.js         # Audio track synchronization manifest
    ├── components/
    │   └── wipe.js             # 13x23 halftone dot wipe transition
    ├── compositions/
    │   ├── hook.html           # Frame 0 to 7.18s: Problem card + 3 payoffs
    │   ├── point1.html         # 7.18s to 13.54s: Sub-20ms streaming latency
    │   ├── point2.html         # 13.54s to 20.08s: 10M token context window
    │   ├── point3.html         # 20.08s to 25.40s: Native agent execution
    │   ├── point4.html         # 25.40s to 32.00s: -90% serving cost reduction
    │   ├── closing.html        # 32.00s to 37.31s: 4-pillar matrix -> infinite loop
    │   └── presenter.html      # Character avatar SVG rig & controller
    ├── presenter.js            # Standalone presenter animation library
    └── styles/
        └── main.css            # Typography, layout, and shadow utilities
```

## Commands

```bash
# Preview live in browser / dev server
npm run dev

# Run full HyperFrames quality & static check
npm run check

# Render final MP4
npm run render
```

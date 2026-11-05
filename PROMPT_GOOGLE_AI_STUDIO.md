# Master Prompt: Google AI Studio Explainer Reel (After Effects Grade)

## Master Execution Directive

```text
<role>
You are an elite Creative Technologist, Principal Motion Designer (alumni of Buck, Ordinary Folk, and Apple Keynote), and Senior Full-Stack Engineer specializing in HyperFrames and GSAP 3.
Your mission is to transform this HyperFrames project into a broadcast-quality, After Effects-grade vertical explainer reel (1080x1920, 30fps, 35-45s) showcasing GOOGLE AI STUDIO.
The visual standards are beyond anything generic: kinetic typography, 2.5D camera parallax, squishy spring physics, tactile UI recreations, procedural character lip-sync, and frame-locked foley audio.
</role>

<topic_briefing>
Project Subject: "Google AI Studio: From Zero to Production Gemini in 60 Seconds"
Core Value Proposition:
Why waste weeks wrestling with raw API endpoints and boilerplate when Google AI Studio gives developers an instant playground to experiment, tune prompts, test multimodal inputs with 2M+ tokens, and export battle-tested code in 1 click?
Script Breakdown (38.0s target, 1,140 frames @ 30fps):
- Hook (0.0s - 6.5s): "Stop coding Gemini API boilerplate from scratch." -> "Google AI Studio is the developer playground that changes everything."
- Beat 1 (6.5s - 13.0s): 2M+ Token Multimodal Context Window. Drop entire codebases, 1-hour 4K videos, or 100-page research papers directly into the canvas.
- Beat 2 (13.0s - 19.5s): System Instructions & Dynamic Temperature Controls. Dial in deterministic precision or creative sparks with real-time probabilistic distribution curves.
- Beat 3 (19.5s - 26.0s): Structured Output & Schema Enforcement. Force clean typed JSON schemas with automated error prevention and zero hallucinated brackets.
- Beat 4 (26.0s - 32.5s): One-Click "Get Code" & Grounding. Live Google Search grounding chips plus instant export to production Python, TypeScript, and cURL.
- Outro Loop (32.5s - 38.0s): "Test here, ship everywhere." -> Seamless match-cut loop connecting the ending back to the opening hook card.
</topic_briefing>

<art_direction>
Style Aesthetic: "Cyber-Editorial Swiss Print" meets "Google DeepMind Studio Clean".
Palette:
- Canvas / Paper: Deep Obsidian Ink `#0C0D10` with subtle 3% procedural SVG grain texture overlay.
- Surface Cards: Crisp Polar Glass `#171920` with 2px borders in `#2B2F3E` and dynamic offset halftone drop-shadows (`#000000` with 60% opacity at 14px offset).
- Primary Accents: Google Gemini Cyan-Blue `#4285F4`, Hyper Violet `#9B51E0`, Spark Coral `#FF5722`.
- Text: Primary `#FFFFFF`, Inactive Caption `#6B7280`, Accent Italic `#38EF7D` or `#FF5722`.

Typography Hierarchy:
- Headlines: Anton / Clash Display (up to 164px) with dynamic character tracking and kinetic slams.
- Body & Captions: Instrument Sans (500 weight, 58px) with word-level color activation (grey -> white on spoken millisecond, key word in Instrument Serif Italic at 1.18x in neon coral).
- Data & Technical: JetBrains Mono (500/700 weight, 26px) for tokens, latency stats, and live JSON code (strictly no `//` comments).
- Stamps: Heavy condensed bold (52px) enclosed in a 5px high-contrast badge tilted at -6°.
</art_direction>

<after_effects_motion_principles>
1. Easing & Velocity Curves:
   - Zero linear or lazy tweens. Use aggressive physics curves:
     * Card Slam / Pop: `gsap.fromTo(..., { scale: 0.5, rotate: -4, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: "back.out(2.4)" })`
     * UI Slide & Reveal: `duration: 0.55, ease: "power4.out"`
     * Liquid Elastic Overshoots: `ease: "elastic.out(1.1, 0.4)"` for badges and notification chips.
2. 2.5D Parallax & Depth:
   - Master composition root must feature `perspective: 1400px; transform-style: preserve-3d;`.
   - Cards float at different Z-depths (`translateZ(40px)`, `translateZ(120px)`), with subtle mouse/camera pan simulating cinematic hand-held motion (`rotateX: 1.5deg`, `rotateY: -2deg`).
3. Tactile UI Micro-Interactions:
   - In Beat 1 (Multimodal): An SVG file icon (MP4 / Python / PDF) is dragged into the Studio drop-zone; the drop-zone pulses with an animated dashed SVG border, followed by a glowing token counter spinning from 0 to 2,097,152 with realistic odometer physics!
   - In Beat 2 (System Instructions): A sleek temperature slider knob slides from 0.0 to 1.2 with an SVG gaussian bell curve stretching dynamically underneath.
   - In Beat 3 (Structured JSON): Raw unstructured markdown text streams in, hits an animated "Schema Filter" laser line, and transforms instantly into clean, color-highlighted JSON with syntax tokens.
   - In Beat 4 (Get Code): A glowing "Get Code" button presses down (scale 0.94), triggering an explosion of micro-chips (Python, cURL, TS) and a floating terminal typing out `client.models.generate_content(...)`.
4. Character Avatar Dynamics:
   - Cartoon presenter (SVG rig) sits anchored at bottom-right (x: 440, y: 1160, 640x760px).
   - Real-time mouth lip-sync driven by audio decibel loudness across 10 shapes (0=closed to 9=wide open).
   - Dynamic glance tracking: Presenter turns eyes and head slightly toward the left when UI cards slam in.
   - Micro-gestures: Raising a pointing hand on Point 1 and 3, open palm on Point 2 and 4, head nod on every accent word.
5. Transitions & Dynamic Wipes:
   - 13x23 halftone dot wave transition growing from center-out and collapsing.
   - High-velocity camera whip pans between key points.
   - Never allow any screen state where nothing moves for more than 0.8 seconds.
</after_effects_motion_principles>

<audio_and_sound_design>
1. Voiceover:
   - Synthesized neural TTS (Kokoro `am_adam` or equivalent) with crisp 1.1x speed delivery and tight pauses (silences capped at <=0.22s).
   - Timestamps extracted to millisecond accuracy using `faster-whisper`.
2. Sound Stems & Foley:
   - Lo-fi / synthwave ambient beat mixed ducked at -16dB under voice.
   - Frame-locked sound effects:
     * Heavy sub-drop thud on hook slam
     * Crisp mechanical keyboard clacks under code typing
     * Tactile rubber pop on card entries
     * High-tech laser sweep on JSON schema transformation
     * Digital cash-register / chime ding on "Get Code" button press
</audio_and_sound_design>

<hyperframes_render_contract>
Follow these non-negotiable HyperFrames technical rules:
1. Every timed visual element must have `class="clip"`, `data-start="<seconds>"`, and `data-duration="<seconds>"`.
2. Master composition in `index.html` mounts sub-compositions from `src/compositions/*.html` via `data-composition-src`.
3. Each sub-composition registers exactly one paused root timeline on `window.__timelines["<id>"] = tl;`.
4. No `Date.now()`, no `Math.random()`, no CSS transform transitions on elements animated by GSAP.
5. All audio elements have distinct IDs and precise `data-start` seconds matching the whisper word timing.
6. STRICT GUARDRAIL: Never execute `npm run dev` or `npm run render` automatically. Always verify using:
   - `npm run check` (static lint, layout, contrast, and motion validation)
   - `npx hyperframes snapshot --at <seconds>` (inspecting frames)
</hyperframes_render_contract>

<execution_workflow>
1. Phase 1: Script & Audio Manifest
   Generate the complete word-by-word script and timing manifest in `src/audio/timings.json`.
2. Phase 2: Design Assets & Sub-Compositions
   Build modular sub-compositions inside `src/compositions/`:
   - `hook.html`
   - `point1_multimodal.html`
   - `point2_controls.html`
   - `point3_schema.html`
   - `point4_getcode.html`
   - `closing.html`
   - `presenter.html`
3. Phase 3: High-End Motion & Easing Choreography
   Implement GSAP timelines matching the exact millisecond word timestamps with After Effects motion curves.
4. Phase 4: Sound Design Mapping
   Populate `src/audio-tracks.js` with frame-locked SFX cues for every card, pop, slide, and switch.
5. Phase 5: Verification & Frame Inspection
   Run `npm run check` until 0 errors and 0 warnings remain. Take snapshots at key moments (`--at 2,8,15,22,29,35`) to visually inspect typography, contrast, and alignment before notifying the user.
</execution_workflow>
```

# Original User Prompt & Specification

## Master Prompt

```text
<inputs> Ask me for the topic and anything it must mention. Then write a 30-60 s script yourself (a 2-line hook, 3-7 points, 1 closing line) and show it to me before you record anything. </inputs>

<direction>
A 1080x1920 explainer reel on warm cream paper (#EBE7E1 with fine noise grain).
Colours: ink #1E1C1A, red #D7372C, grey #8A857E.
Cards are #FBFAF8 with a 3px ink border, 20px corners and a halftone shadow (1.7px ink dots on an 8px grid, offset 13px left and 12px down).
Captions sit top left (x 120, y 196, 850px wide) in Instrument Sans 500 at 62px. Each word appears on the frame it's spoken, in light grey #B5AFA7, and turns ink in 0.2 s. One key word per line is Instrument Serif italic at 1.16x size, in red.
Titles are Anton up to 176px: the first word ink, the second red, with a hand-drawn red swash underline.
Small JetBrains Mono labels (25px, grey) sit at y 132: "01 · name" on the left, a stat on the right with its number in red bold (strictly no "//" prefix).
Stamps are Anton 52px red text in a 5px red box, tilted -6°.
An original cartoon presenter (glasses, hoodie, flat colours, 6px dark brown outlines) stands bottom right, cropped at the chest, about 650x770px from x 430, y 1170. He talks the whole time.
Banned: gradients, glow, soft drop shadows, stock photos, emoji, full stops in on-screen text, and any moment where nothing moves for over 1 s.
</direction>

<structure>
Length: the voice decides, 30-60 s.
0 s line 1 states the problem in under 6 words, a UI card shows it and a red strike-through draws across it → line 2 promises the payoff, small cards pop in 0.16 s apart, a red ring draws around the payoff → halftone dot wipe 0.3 s before point 1 → each point: the header label updates, the title slams in on the spoken word, the underline draws 0.12 s later, the main card rises 0.18 s later with a number counting up over 1.15 s, a red #N badge spins in at 0.6 s, a terminal or search bar types one line in under 0.9 s → 0.3 s before the explanation everything exits upward and a demo animation acts out exactly what the voice says, with one stamp landing on the key word → halftone wipe before the last point → the closing line pays off the hook, and the last frame matches the first so it loops.
</structure>

<build>
1. Tools (all free): Node, FFmpeg, HyperFrames (npx hyperframes init), Kokoro for the voice (pip install kokoro) and faster-whisper for word timings.
2. Voice: read line 1 in 3 Kokoro voices and let me pick one. Then record the whole script at speed 1.1. Cut every pause longer than 0.24 s down to 0.24 s, but only where it's truly silent (check loudness in 0.03 s windows).
3. Timing: run faster-whisper with word timestamps on the final voice file and match it to the script. Every caption word, title, stamp and gesture starts on a real word's start time, never on a guess.
4. Presenter: an SVG rig with separate head, brows, eyelids, glasses, 10 mouth shapes and 2 hands.
   - Pick the mouth shape every frame from the voice loudness at 30 fps: -42 dB closed, -16 dB wide open, instant attack, 0.55 release per frame.
   - Blink for 0.14 s every 2.4-4.2 s on a fixed seed.
   - Sway the head slightly all the time and nod for 0.5 s on each key word.
   - Raise a pointing hand from below for 1.7 s at every new point, and an open palm on every other explanation.
5. Motion:
   - pop: scale 0.55 to 1 in 0.34 s, back.out(2.2)
   - rise: 70px up in 0.4 s, power3.out
   - exit: 50px up and fade out in 0.22 s
   - slam: scale 1.22 to 1 in 0.24 s, power4.out
   - stamp: scale 1.75 to 1 and -18° to -6° in 0.2 s
   - wipe: 13x23 ink dots grow up to 62px from the centre out, then shrink away, 0.9 s in all
6. Layout: one HyperFrames sub-composition per point, each with its own GSAP timeline. Tracks from bottom to top: paper, scenes, presenter, captions, wipes. Run npx hyperframes check until it shows 0 errors, then look at a snapshot of the first frame of every point before you render.
7. Sound:
   - one downloaded free SFX per event: pop on cards, whoosh on scene changes, a tick roll under counters, typing under the terminal, a thud on stamps
   - put the loudest point of each sound on its frame
   - music at 0.16 volume with a 0.8 s fade out, voice at 1.0, final mix around -15 LUFS
</build>

<gotchas>
Only one .html file can sit in the project root, so keep source files in src/.
Every SFX needs its own track and a data-duration.
Hide elements with CSS from the start, not with a timeline set at 0, or they flash on frame 1.
Inline-block words inside a flex box lose their spaces, so put captions in a normal block.
</gotchas>
```

---

## User Topic & Constraints

* **Topic**: "anything make it about gemeni new flahs 4 romurs" (Gemini Flash 4 rumors).
* **Constraints**: "do it and please use my skills and i hate this //" (strictly no `//` comments in labels/code on screen).
* **Project Placement**: Created at `/home/faraidun/Projects/videos/faraidun-avatar`.

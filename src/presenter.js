import defaultTimings from './audio/timings.json' with { type: 'json' };

/**
 * Key timestamps for head nod animations corresponding to key spoken words.
 */
export const PRESENTER_NOD_TIMESTAMPS = [
  { time: 0.72, word: 'too' },
  { time: 5.36, word: 'rules' },
  { time: 12.40, word: 'instant' },
  { time: 15.46, word: 'ten-million' },
  { time: 23.40, word: 'neural' },
  { time: 30.18, word: 'ninety' },
  { time: 36.34, word: 'too' }
];

/**
 * Hand gesture intervals for pointing and open-palm explanations.
 */
export const PRESENTER_GESTURES = [
  { target: '#hand-pointing', start: 7.18, end: 8.88, type: 'point', label: 'Point 1' },
  { target: '#hand-palm', start: 13.54, end: 15.24, type: 'explain', label: 'Point 2' },
  { target: '#hand-palm', start: 20.08, end: 21.78, type: 'explain', label: 'Point 3' },
  { target: '#hand-pointing', start: 25.40, end: 27.10, type: 'point', label: 'Point 4' }
];

/**
 * Sets up 30fps mouth shape transitions on the timeline matching mouthShapes array.
 * Toggles display between 'block' and 'none' for #mouth-0 through #mouth-9.
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<number>} mouthShapes - Array of shape indices (0-9) per frame
 * @param {number} fps - Framerate (default 30)
 * @param {Function} sel - Selector resolver
 */
export function setupMouthTimeline(tl, mouthShapes, fps = 30, sel = s => s) {
  if (!mouthShapes || mouthShapes.length === 0) return;

  const initialShape = mouthShapes[0];

  // Set explicit initial display state at t=0 for deterministic forward/backward seek
  for (let m = 0; m < 10; m++) {
    tl.set(sel(`#mouth-${m}`), { display: m === initialShape ? 'block' : 'none' }, 0);
  }

  // Record transitions between mouth shapes
  let currentShape = initialShape;
  for (let i = 1; i < mouthShapes.length; i++) {
    const nextShape = mouthShapes[i];
    if (nextShape !== currentShape) {
      const time = i / fps;
      tl.set(sel(`#mouth-${currentShape}`), { display: 'none' }, time);
      tl.set(sel(`#mouth-${nextShape}`), { display: 'block' }, time);
      currentShape = nextShape;
    }
  }
}

/**
 * Sets up eye blinking animations on the timeline matching blinkFrames array.
 * Swaps #presenter-eyes-open (none) and #presenter-eyes-closed (block) during blinks (~0.14s).
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<boolean>} blinkFrames - Array of booleans per frame
 * @param {number} fps - Framerate (default 30)
 * @param {Function} sel - Selector resolver
 */
export function setupBlinkTimeline(tl, blinkFrames, fps = 30, sel = s => s) {
  if (!blinkFrames || blinkFrames.length === 0) return;

  // Set initial state at t=0: open eyes visible, closed eyes hidden
  tl.set(sel('#presenter-eyes-open'), { display: 'block' }, 0);
  tl.set(sel('#presenter-eyes-closed'), { display: 'none' }, 0);

  // Find all contiguous blink spans
  let inBlink = false;
  let blinkStartFrame = 0;

  for (let i = 0; i < blinkFrames.length; i++) {
    if (blinkFrames[i] && !inBlink) {
      inBlink = true;
      blinkStartFrame = i;
    } else if (!blinkFrames[i] && inBlink) {
      inBlink = false;
      const startTime = blinkStartFrame / fps;
      const endTime = i / fps;
      tl.set(sel('#presenter-eyes-open'), { display: 'none' }, startTime);
      tl.set(sel('#presenter-eyes-closed'), { display: 'block' }, startTime);
      tl.set(sel('#presenter-eyes-open'), { display: 'block' }, endTime);
      tl.set(sel('#presenter-eyes-closed'), { display: 'none' }, endTime);
    }
  }

  // Handle trailing blink if audio cut while blinking
  if (inBlink) {
    const startTime = blinkStartFrame / fps;
    const endTime = blinkFrames.length / fps;
    tl.set(sel('#presenter-eyes-open'), { display: 'none' }, startTime);
    tl.set(sel('#presenter-eyes-closed'), { display: 'block' }, startTime);
    tl.set(sel('#presenter-eyes-open'), { display: 'block' }, endTime);
    tl.set(sel('#presenter-eyes-closed'), { display: 'none' }, endTime);
  }
}

/**
 * Sets up continuous head sway and synchronized head nods on #presenter-head.
 *
 * Continuous sway:
 * - Rotation: -1.8deg to +1.8deg, duration 1.8s, yoyo: true, repeat: -1, ease: sine.inOut.
 *
 * Head nods on key words:
 * - 0.5s duration (y: "+=12px", rotation: 3deg, yoyo: true, repeat: 1).
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<Object>} nodTimestamps - Timestamps for head nods
 * @param {Function} sel - Selector resolver
 */
export function setupHeadTimeline(tl, nodTimestamps = PRESENTER_NOD_TIMESTAMPS, sel = s => s) {
  const headSelector = sel('#presenter-head');

  // Initialize head transform origin at neck base pivot (325px, 480px)
  tl.set(headSelector, {
    transformOrigin: '325px 480px',
    y: 0,
    rotation: -1.8
  }, 0);

  // 1. Continuous head sway (-1.8deg to +1.8deg, 1.8s, yoyo: true, repeat: -1, ease: sine.inOut)
  tl.to(headSelector, {
    rotation: 1.8,
    duration: 1.8,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  }, 0);

  // 2. Head nods on key words (0.5s duration: 0.25s down + 0.25s up, y: "+=12px", rotation: 3deg)
  const nodHalfDuration = 0.25;
  for (const item of nodTimestamps) {
    tl.to(headSelector, {
      y: '+=12px',
      rotation: 3,
      duration: nodHalfDuration,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, item.time);
  }
}

/**
 * Sets up hand gesture animations (#hand-pointing and #hand-palm).
 *
 * - Pointing hand raises from below (y: 220 to 0, opacity: 0 to 1 in 0.3s back.out) for 1.7s
 *   at Point 1 (7.18s - 8.88s) and Point 4 (25.40s - 27.10s).
 * - Palm hand raises from below (y: 220 to 0, opacity: 0 to 1 in 0.3s back.out) for 1.7s
 *   at Point 2 (13.54s - 15.24s) and Point 3 (20.08s - 21.78s).
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<Object>} gestures - Gesture configurations
 * @param {Function} sel - Selector resolver
 */
export function setupGesturesTimeline(tl, gestures = PRESENTER_GESTURES, sel = s => s) {
  const pointingSelector = sel('#hand-pointing');
  const palmSelector = sel('#hand-palm');

  // Explicit rest states at t=0
  tl.set(pointingSelector, { y: 220, opacity: 0, transformOrigin: '180px 770px' }, 0);
  tl.set(palmSelector, { y: 220, opacity: 0, transformOrigin: '470px 770px' }, 0);

  const enterDuration = 0.3;
  const exitDuration = 0.3;

  for (const g of gestures) {
    const targetSel = sel(g.target);
    const holdDuration = (g.end - g.start) - enterDuration - exitDuration;
    const exitStartTime = g.end - exitDuration;

    // Raise from below (y: 220 to 0, opacity: 0 to 1 in 0.3s back.out)
    tl.fromTo(targetSel,
      { y: 220, opacity: 0 },
      { y: 0, opacity: 1, duration: enterDuration, ease: 'back.out(1.4)' },
      g.start
    );

    // Lower back down to resting position at end of 1.7s gesture window
    tl.to(targetSel,
      { y: 220, opacity: 0, duration: exitDuration, ease: 'power2.in' },
      exitStartTime
    );
  }
}

/**
 * Builds the complete Presenter Animation Controller timeline.
 * Attaches mouth shapes, blinking, head sway, head nods, and hand gestures directly
 * to the provided GSAP timeline for deterministic HyperFrames seeking.
 *
 * @param {Object} masterTimeline - Paused GSAP timeline to attach animations to
 * @param {Object} [options] - Configuration options
 * @param {Object} [options.timings] - Optional override for timings.json
 * @param {string} [options.prefix] - Optional CSS selector prefix (e.g. '#presenter-svg ')
 * @returns {Object} The modified masterTimeline
 */
export function setupPresenterTimeline(masterTimeline, options = {}) {
  if (!masterTimeline) {
    throw new Error('setupPresenterTimeline requires a GSAP masterTimeline parameter');
  }

  const timings = options.timings || defaultTimings;
  const fps = timings.fps || 30;
  const prefix = options.prefix || '';
  const sel = options.selector || ((selector) => (prefix ? `${prefix} ${selector}` : selector));

  // 1. Mouth shapes matching timings.mouthShapes (30fps)
  setupMouthTimeline(masterTimeline, timings.mouthShapes, fps, sel);

  // 2. Blinking matching timings.blinkFrames (0.14s duration)
  setupBlinkTimeline(masterTimeline, timings.blinkFrames, fps, sel);

  // 3 & 4. Continuous head sway & synchronized head nods
  const nodTimestamps = options.nodTimestamps || PRESENTER_NOD_TIMESTAMPS;
  setupHeadTimeline(masterTimeline, nodTimestamps, sel);

  // 5. Hand gestures (Point 1-4)
  const gestures = options.gestures || PRESENTER_GESTURES;
  setupGesturesTimeline(masterTimeline, gestures, sel);

  return masterTimeline;
}

export default setupPresenterTimeline;

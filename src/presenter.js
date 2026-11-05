import defaultTimings from './audio/timings.json' with { type: 'json' };

/**
 * Key timestamps for head nod animations corresponding to key accent words
 * in the 38.0s Google AI Studio explainer reel.
 */
export const PRESENTER_NOD_TIMESTAMPS = [
  { time: 1.80, word: 'Studio' },
  { time: 4.40, word: 'everything' },
  { time: 8.20, word: 'multimodal' },
  { time: 15.80, word: 'controls' },
  { time: 22.60, word: 'schema' },
  { time: 28.20, word: 'production' },
  { time: 34.60, word: 'everywhere' }
];

/**
 * Hand gesture intervals for pointing and open-palm explanations.
 * - Point 1 (6.8s - 8.6s): Pointing hand (#hand-pointing)
 * - Point 2 (13.8s - 15.6s): Open palm (#hand-palm)
 * - Point 3 (20.2s - 22.0s): Pointing hand (#hand-pointing)
 * - Point 4 (26.8s - 28.6s): Open palm (#hand-palm)
 */
export const PRESENTER_GESTURES = [
  { target: '#hand-pointing', start: 6.80, end: 8.60, type: 'point', label: 'Point 1: Multimodal' },
  { target: '#hand-palm', start: 13.80, end: 15.60, type: 'palm', label: 'Point 2: Controls' },
  { target: '#hand-pointing', start: 20.20, end: 22.00, type: 'point', label: 'Point 3: Schema' },
  { target: '#hand-palm', start: 26.80, end: 28.60, type: 'palm', label: 'Point 4: Get Code' }
];

/**
 * Glance intervals where the character turns eyes and head leftward
 * to watch new UI cards slam/pop into view on the canvas.
 */
export const PRESENTER_GLANCES = [
  { start: 1.85, holdUntil: 2.80, end: 3.20, label: 'Hook Payoff Cards Slam' },
  { start: 7.25, holdUntil: 8.40, end: 8.80, label: 'Point 1 Multimodal Card Slam' },
  { start: 13.70, holdUntil: 14.80, end: 15.20, label: 'Point 2 Controls Card Slam' },
  { start: 20.15, holdUntil: 21.30, end: 21.70, label: 'Point 3 Schema Card Slam' },
  { start: 25.55, holdUntil: 26.60, end: 27.00, label: 'Point 4 Get Code Card Slam' },
  { start: 32.10, holdUntil: 33.20, end: 33.60, label: 'Closing Summary Card Slam' }
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

  // Set explicit initial display state at t=0 for deterministic seek
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

  // After voice speech completes (~37.3s), ensure neutral closed mouth through 38.0s
  const endSpeechTime = mouthShapes.length / fps;
  if (endSpeechTime < 38.0 && currentShape !== 0) {
    tl.set(sel(`#mouth-${currentShape}`), { display: 'none' }, endSpeechTime);
    tl.set(sel('#mouth-0'), { display: 'block' }, endSpeechTime);
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
 * Sets up continuous head sway, facial depth parallax, breathing,
 * and synchronized head nods on accent words.
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<Object>} nodTimestamps - Timestamps for head nods
 * @param {Function} sel - Selector resolver
 */
export function setupHeadTimeline(tl, nodTimestamps = PRESENTER_NOD_TIMESTAMPS, sel = s => s) {
  const headSelector = sel('#presenter-head');
  const nodSelector = sel('#presenter-head-nod');
  const browsSelector = sel('#presenter-brows');
  const bodySelector = sel('#presenter-body');
  const parallaxSelector = sel('#presenter-face-parallax');

  // 1. Subtle torso breathing across 38.0s
  tl.to(bodySelector, {
    scaleY: 1.015,
    transformOrigin: '320px 760px',
    duration: 2.1,
    yoyo: true,
    repeat: 18,
    ease: 'sine.inOut'
  }, 0);

  // 2. Continual organic head sway (-1.8deg to +1.8deg, 1.9s period)
  tl.set(headSelector, {
    transformOrigin: '320px 480px',
    rotation: -1.8
  }, 0);

  tl.to(headSelector, {
    rotation: 1.8,
    duration: 1.9,
    yoyo: true,
    repeat: 20,
    ease: 'sine.inOut'
  }, 0);

  // 3. 2.5D Facial Parallax counter-movement for lifelike depth
  tl.fromTo(parallaxSelector,
    { x: -4 },
    { x: 4, duration: 1.9, yoyo: true, repeat: 20, ease: 'sine.inOut' },
    0
  );

  // 4. Head nods and expressive eyebrow lifts on key accent words
  const nodHalfDuration = 0.12;
  for (const item of nodTimestamps) {
    tl.to(nodSelector, {
      y: 12,
      rotation: 2.8,
      duration: nodHalfDuration,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, item.time);

    tl.to(browsSelector, {
      y: -5,
      duration: nodHalfDuration,
      yoyo: true,
      repeat: 1,
      ease: 'sine.out'
    }, item.time);
  }
}

/**
 * Sets up dynamic glance tracking towards active UI cards.
 * Turns head and shifts irises leftward whenever new cards slam or pop into view.
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<Object>} glances - Glance interval configurations
 * @param {Function} sel - Selector resolver
 */
export function setupGlanceTimeline(tl, glances = PRESENTER_GLANCES, sel = s => s) {
  const glanceHeadSelector = sel('#presenter-head-glance');
  const gazeSelector = sel('#presenter-eyes-gaze');

  // Explicit rest state at t=0
  tl.set(glanceHeadSelector, { x: 0, rotation: 0, transformOrigin: '320px 480px' }, 0);
  tl.set(gazeSelector, { x: 0, y: 0 }, 0);

  const turnDuration = 0.25;
  const returnDuration = 0.35;

  for (const g of glances) {
    // 1. Head turns leftwards towards UI cards
    tl.to(glanceHeadSelector, {
      x: -7,
      rotation: -3.2,
      duration: turnDuration,
      ease: 'power2.out'
    }, g.start);

    // 2. Eyes dart leftwards towards UI cards
    tl.to(gazeSelector, {
      x: -8.5,
      y: -1.5,
      duration: turnDuration * 0.8,
      ease: 'power3.out'
    }, g.start);

    // 3. Head returns to camera center
    tl.to(glanceHeadSelector, {
      x: 0,
      rotation: 0,
      duration: returnDuration,
      ease: 'power2.inOut'
    }, g.holdUntil);

    // 4. Eyes return to camera center
    tl.to(gazeSelector, {
      x: 0,
      y: 0,
      duration: returnDuration * 0.9,
      ease: 'power2.inOut'
    }, g.holdUntil);
  }
}

/**
 * Sets up hand gesture animations (#hand-pointing and #hand-palm).
 *
 * - Pointing hand raises from below (y: 220 to 0, opacity: 0 to 1 in 0.32s back.out)
 *   on Point 1 (6.8s - 8.6s) and Point 3 (20.2s - 22.0s).
 * - Palm hand raises from below (y: 220 to 0, opacity: 0 to 1 in 0.32s back.out)
 *   on Point 2 (13.8s - 15.6s) and Point 4 (26.8s - 28.6s).
 *
 * @param {Object} tl - GSAP timeline
 * @param {Array<Object>} gestures - Gesture configurations
 * @param {Function} sel - Selector resolver
 */
export function setupGesturesTimeline(tl, gestures = PRESENTER_GESTURES, sel = s => s) {
  const pointingSelector = sel('#hand-pointing');
  const palmSelector = sel('#hand-palm');

  // Explicit rest states at t=0
  tl.set(pointingSelector, { y: 220, opacity: 0, transformOrigin: '175px 760px' }, 0);
  tl.set(palmSelector, { y: 220, opacity: 0, transformOrigin: '470px 760px' }, 0);

  const enterDuration = 0.32;
  const exitDuration = 0.32;

  for (const g of gestures) {
    const targetSel = sel(g.target);
    const exitStartTime = g.end - exitDuration;

    // Raise from below
    tl.fromTo(targetSel,
      { y: 220, opacity: 0 },
      { y: 0, opacity: 1, duration: enterDuration, ease: 'back.out(1.5)' },
      g.start
    );

    // Subtle natural holding float while active
    const holdDuration = exitStartTime - (g.start + enterDuration);
    if (holdDuration > 0.4) {
      tl.to(targetSel, {
        y: -6,
        duration: holdDuration * 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
      }, g.start + enterDuration);
    }

    // Lower back down to resting position
    tl.to(targetSel,
      { y: 220, opacity: 0, duration: exitDuration, ease: 'power2.in' },
      exitStartTime
    );
  }
}

/**
 * Builds the complete Presenter Animation Controller timeline.
 * Attaches mouth shapes, blinking, head sway, head nods, glance tracking,
 * and hand gestures directly to the provided GSAP timeline for deterministic HyperFrames seeking.
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

  // 1. Mouth shapes matching timings.mouthShapes (10 distinct shapes)
  setupMouthTimeline(masterTimeline, timings.mouthShapes, fps, sel);

  // 2. Blinking matching timings.blinkFrames (~0.14s duration)
  setupBlinkTimeline(masterTimeline, timings.blinkFrames, fps, sel);

  // 3. Continuous head sway, depth parallax, breathing, and accent word nods
  const nodTimestamps = options.nodTimestamps || PRESENTER_NOD_TIMESTAMPS;
  setupHeadTimeline(masterTimeline, nodTimestamps, sel);

  // 4. Dynamic glance tracking (head & eyes turn left towards active UI cards)
  const glances = options.glances || PRESENTER_GLANCES;
  setupGlanceTimeline(masterTimeline, glances, sel);

  // 5. Hand gestures (Points 1 to 4)
  const gestures = options.gestures || PRESENTER_GESTURES;
  setupGesturesTimeline(masterTimeline, gestures, sel);

  return masterTimeline;
}

export default setupPresenterTimeline;

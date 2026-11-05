/**
 * Halftone Dot Wave Wipe Transition
 *
 * Broadcast-grade screen transition component creating an organic halftone iris wave
 * using a 13x23 grid of dots on a 1080x1920 canvas. Dots expand outward from the center
 * (cx: 6, cy: 11) with vibrant Google Gemini Cyan and Hyper Violet neon accents,
 * merging into solid Deep Obsidian Ink (#0C0D10) to completely blanket the frame.
 * Dots then shrink away in a controlled wave, revealing the subsequent scene.
 *
 * Designed for HyperFrames compositions and vertical video reels (9:16).
 * Fully deterministic, seek-safe forward and backward in GSAP 3.
 */

/* global gsap */

export const HALFTONE_DEFAULTS = Object.freeze({
  cols: 13,
  rows: 23,
  width: 1080,
  height: 1920,
  centerX: 6,
  centerY: 11,
  radius: 64, // px: base SVG circle radius (diagonal cell coverage = sqrt(41.54^2 + 41.74^2) = 58.89px < 64px)
  fill: "#0C0D10", // Deep Obsidian Ink
  accentCyan: "#4285F4", // Google Gemini Cyan-Blue
  accentViolet: "#9B51E0", // Google Gemini Hyper Violet
  accentElectric: "#00E5FF", // Spark Cyan Accent
  strokeWidth: 2, // px: subtle accent rim on expanding/contracting dots
  duration: 0.9,
  halfDuration: 0.44,
  dotDuration: 0.22,
  holdDuration: 0.04, // Brief plateau at peak coverage ensuring rock-solid blackout during scene swaps
  easeIn: "power2.out",
  easeOut: "power2.in",
  trackIndex: 5,
  mode: "center", // "center" (iris wave), "sweep" (directional sweep), or "reverse"
  // Standard wipe trigger points in the reel (around 6.3s - 6.8s for Wipe 1, and 25.8s - 26.3s for Wipe 2)
  reelWipe1Start: 6.6,
  reelWipe2Start: 25.8
});

/**
 * Computes deterministic grid positions, Euclidean distances, and chromatic accent colors for all dots.
 *
 * @param {Partial<typeof HALFTONE_DEFAULTS>} [config]
 * @returns {Array<{ col: number, row: number, x: number, y: number, dist: number, normDist: number, accent: string }>}
 */
export function computeDotGrid(config = {}) {
  const cfg = { ...HALFTONE_DEFAULTS, ...config };
  const stepX = cfg.width / cfg.cols;
  const stepY = cfg.height / cfg.rows;
  const maxDist = Math.hypot(
    Math.max(cfg.centerX, cfg.cols - 1 - cfg.centerX),
    Math.max(cfg.centerY, cfg.rows - 1 - cfg.centerY)
  );

  const dots = [];
  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      const x = (c + 0.5) * stepX;
      const y = (r + 0.5) * stepY;
      const dist = Math.hypot(c - cfg.centerX, r - cfg.centerY);
      const normDist = maxDist > 0 ? dist / maxDist : 0;

      // Deterministic chromatic accent distribution:
      // Combines angular swirl, radial wave, and alternating lattice
      const angle = Math.atan2(r - cfg.centerY, c - cfg.centerX);
      const wave = Math.sin(angle * 2 + normDist * Math.PI * 2.5);
      const isChecker = (c + r) % 2 === 0;

      let accent = cfg.accentCyan;
      if (wave > 0.25) {
        accent = cfg.accentCyan;
      } else if (wave < -0.25) {
        accent = cfg.accentViolet;
      } else if (isChecker) {
        accent = cfg.accentElectric;
      } else {
        accent = cfg.accentViolet;
      }

      dots.push({
        col: c,
        row: r,
        x,
        y,
        dist,
        normDist,
        accent
      });
    }
  }
  return dots;
}

/**
 * Creates or populates the halftone dot grid in the target SVG element.
 *
 * @param {SVGSVGElement|string} targetSvg - SVG element or CSS selector
 * @param {Partial<typeof HALFTONE_DEFAULTS>} [options]
 * @returns {SVGCircleElement[]} Array of created or existing circle elements
 */
export function createHalftoneDots(targetSvg, options = {}) {
  const cfg = { ...HALFTONE_DEFAULTS, ...options };
  const svg = typeof targetSvg === "string" ? document.querySelector(targetSvg) : targetSvg;

  if (!svg) {
    throw new Error(`[wipe.js] Target SVG element not found: ${targetSvg}`);
  }

  // Ensure root SVG attributes
  svg.setAttribute("viewBox", `0 0 ${cfg.width} ${cfg.height}`);
  if (!svg.getAttribute("width")) svg.setAttribute("width", `${cfg.width}`);
  if (!svg.getAttribute("height")) svg.setAttribute("height", `${cfg.height}`);

  // Return existing dots if already populated with the exact required count
  const existingDots = Array.from(svg.querySelectorAll(".halftone-dot"));
  if (existingDots.length === cfg.cols * cfg.rows) {
    return existingDots;
  }

  // Remove stale dots or placeholder contents
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  // Inject SVG defs for subtle gradient or glow filters if needed
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <linearGradient id="halftone-cyan-violet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${cfg.accentCyan}" />
      <stop offset="100%" stop-color="${cfg.accentViolet}" />
    </linearGradient>
  `;
  svg.appendChild(defs);

  const gridData = computeDotGrid(cfg);
  const frag = document.createDocumentFragment();
  const createdCircles = [];

  for (let i = 0; i < gridData.length; i++) {
    const d = gridData[i];
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", d.x.toFixed(3));
    circle.setAttribute("cy", d.y.toFixed(3));
    circle.setAttribute("r", `${cfg.radius}`);
    circle.setAttribute("fill", cfg.fill);
    circle.setAttribute("stroke", d.accent);
    circle.setAttribute("stroke-width", `${cfg.strokeWidth || 2}`);
    circle.setAttribute("stroke-opacity", "0");
    circle.setAttribute("class", "halftone-dot");
    circle.setAttribute("data-col", `${d.col}`);
    circle.setAttribute("data-row", `${d.row}`);
    circle.setAttribute("data-dist", d.dist.toFixed(4));
    circle.setAttribute("data-norm-dist", d.normDist.toFixed(4));
    circle.setAttribute("data-accent", d.accent);

    // Explicit CSS transform origin and will-change for crisp scaling
    circle.style.transformOrigin = `${d.x.toFixed(3)}px ${d.y.toFixed(3)}px`;
    circle.style.willChange = "transform, fill, stroke-opacity";
    circle.style.transform = "scale(0)";

    frag.appendChild(circle);
    createdCircles.push(circle);
  }

  svg.appendChild(frag);

  // Initialize scale to 0 via GSAP if available
  if (typeof gsap !== "undefined") {
    gsap.set(createdCircles, { scale: 0, transformOrigin: "center center" });
  }

  return createdCircles;
}

/**
 * Animates a halftone dot wave wipe transition on a GSAP timeline.
 *
 * @param {gsap.core.Timeline} timeline - GSAP timeline to append to
 * @param {SVGSVGElement|string|Element[]} target - SVG element, selector, or dot array
 * @param {number} [startTime=0] - Time offset on the timeline (in seconds)
 * @param {Partial<typeof HALFTONE_DEFAULTS>} [options]
 * @returns {gsap.core.Timeline} The timeline
 */
export function animateHalftoneWipe(timeline, target, startTime = 0, options = {}) {
  if (!timeline) {
    throw new Error("[wipe.js] GSAP timeline instance is required");
  }

  const cfg = { ...HALFTONE_DEFAULTS, ...options };
  let dots;

  if (Array.isArray(target) || (typeof target !== "string" && typeof target?.length === "number" && !target.nodeType)) {
    dots = Array.from(target);
  } else {
    dots = createHalftoneDots(target, cfg);
  }

  const halfDuration = cfg.halfDuration;
  const dotDuration = cfg.dotDuration;
  const holdDuration = cfg.holdDuration ?? 0.04;
  const maxStagger = Math.max(0, halfDuration - dotDuration);
  const centerCol = cfg.centerX;
  const centerRow = cfg.centerY;
  const maxDist = Math.hypot(
    Math.max(centerCol, cfg.cols - 1 - centerCol),
    Math.max(centerRow, cfg.rows - 1 - centerRow)
  );
  const mode = cfg.mode || "center";

  // Choreograph each dot's expansion and contraction
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    const col = parseFloat(dot.getAttribute("data-col") ?? "0");
    const row = parseFloat(dot.getAttribute("data-row") ?? "0");
    const accent = dot.getAttribute("data-accent") || cfg.accentCyan;

    const dist = Math.hypot(col - centerCol, row - centerRow);
    const normDist = maxDist > 0 ? dist / maxDist : 0;

    // Expansion wave from center outward
    const delayIn = normDist * maxStagger;

    // Receding wave timing based on configured mode
    let delayOut;
    if (mode === "sweep") {
      // Directional diagonal sweep: top-left to bottom-right
      const normCoord = (col + row) / ((cfg.cols - 1) + (cfg.rows - 1));
      delayOut = halfDuration + holdDuration + normCoord * maxStagger;
    } else if (mode === "reverse") {
      // Outside in
      delayOut = halfDuration + holdDuration + (1 - normDist) * maxStagger;
    } else {
      // Default: "center" (iris out: center dissolves first)
      delayOut = halfDuration + holdDuration + normDist * maxStagger;
    }

    // Half-wipe in: dots expand from 0 to 1
    // Starts as glowing Gemini Cyan / Violet accents, merging into Deep Obsidian Ink #0C0D10
    timeline.fromTo(
      dot,
      {
        scale: 0,
        fill: accent,
        strokeOpacity: 0.85
      },
      {
        scale: 1,
        fill: cfg.fill, // #0C0D10
        strokeOpacity: 0,
        duration: dotDuration,
        ease: cfg.easeIn,
        immediateRender: false,
        transformOrigin: "center center"
      },
      startTime + delayIn
    );

    // Half-wipe out: dots shrink back down to 0
    // Receding dots illuminate with Gemini accents as they contract and disappear
    timeline.to(
      dot,
      {
        scale: 0,
        fill: accent,
        strokeOpacity: 0.85,
        duration: dotDuration,
        ease: cfg.easeOut,
        immediateRender: false,
        transformOrigin: "center center"
      },
      startTime + delayOut
    );
  }

  return timeline;
}

/**
 * Creates a standalone paused GSAP timeline for the halftone wipe.
 *
 * @param {SVGSVGElement|string} target - SVG element or selector
 * @param {Partial<typeof HALFTONE_DEFAULTS>} [options]
 * @returns {gsap.core.Timeline} Paused GSAP timeline of duration ~0.9s
 */
export function createHalftoneWipeTimeline(target, options = {}) {
  if (typeof gsap === "undefined") {
    throw new Error("[wipe.js] GSAP library must be loaded before creating timeline");
  }
  const tl = gsap.timeline({ paused: true });
  animateHalftoneWipe(tl, target, 0, options);
  return tl;
}

/**
 * Helper to setup both wipes for the reel on a main timeline.
 * Triggered:
 * 1. Wipe 1: before Point 1 (defaults to ~6.6s, peak coverage ~7.04s - 7.18s)
 * 2. Wipe 2: before Point 4 / Outro (defaults to ~25.8s, peak coverage ~26.24s)
 *
 * @param {gsap.core.Timeline} mainTimeline
 * @param {SVGSVGElement|string} target
 * @param {Partial<typeof HALFTONE_DEFAULTS> & { wipe1Start?: number, wipe2Start?: number }} [options]
 * @returns {gsap.core.Timeline}
 */
export function setupReelWipes(mainTimeline, target, options = {}) {
  const cfg = { ...HALFTONE_DEFAULTS, ...options };
  const wipe1 = options?.wipe1Start ?? options?.reelWipe1Start ?? cfg.reelWipe1Start;
  const wipe2 = options?.wipe2Start ?? options?.reelWipe2Start ?? cfg.reelWipe2Start;

  animateHalftoneWipe(mainTimeline, target, wipe1, cfg);
  animateHalftoneWipe(mainTimeline, target, wipe2, cfg);
  return mainTimeline;
}

// Global window registration for standalone script tag usage
if (typeof window !== "undefined") {
  window.HalftoneWipe = {
    HALFTONE_DEFAULTS,
    computeDotGrid,
    createHalftoneDots,
    animateHalftoneWipe,
    createHalftoneWipeTimeline,
    setupReelWipes
  };
}

export default {
  HALFTONE_DEFAULTS,
  computeDotGrid,
  createHalftoneDots,
  animateHalftoneWipe,
  createHalftoneWipeTimeline,
  setupReelWipes
};

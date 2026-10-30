/**
 * Halftone Dot Wipe Transition
 *
 * Screen transition component creating an organic halftone iris wipe using a 13x23 grid
 * of ink dots (#1E1C1A) expanding from center (cx: 6, cy: 11) to completely cover the screen,
 * then shrinking away from the center to reveal the underlying scene.
 *
 * Designed for HyperFrames compositions and 1080x1920 vertical video reels.
 */

/* global gsap */

export const HALFTONE_DEFAULTS = Object.freeze({
  cols: 13,
  rows: 23,
  width: 1080,
  height: 1920,
  centerX: 6,
  centerY: 11,
  radius: 62, // px: base SVG circle radius (diagonal cell coverage = sqrt(41.5^2 + 41.7^2) = 58.9px < 62px)
  fill: "#1E1C1A",
  duration: 0.9,
  halfDuration: 0.45,
  dotDuration: 0.22,
  easeIn: "power2.out",
  easeOut: "power2.in",
  trackIndex: 5,
  // Standard wipe trigger points in the reel (0.3s before points 1 and 4)
  reelWipe1Start: 6.88,
  reelWipe2Start: 25.10
});

/**
 * Computes deterministic grid positions and Euclidean distances for all dots.
 *
 * @param {typeof HALFTONE_DEFAULTS} [config]
 * @returns {Array<{ col: number, row: number, x: number, y: number, dist: number, normDist: number }>}
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
      dots.push({
        col: c,
        row: r,
        x,
        y,
        dist,
        normDist: maxDist > 0 ? dist / maxDist : 0
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

  // Return existing dots if already populated
  const existingDots = Array.from(svg.querySelectorAll(".halftone-dot"));
  if (existingDots.length === cfg.cols * cfg.rows) {
    return existingDots;
  }

  // Remove stale dots or placeholder contents
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

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
    circle.setAttribute("class", "halftone-dot");
    circle.setAttribute("data-col", `${d.col}`);
    circle.setAttribute("data-row", `${d.row}`);
    circle.setAttribute("data-dist", d.dist.toFixed(4));
    circle.setAttribute("data-norm-dist", d.normDist.toFixed(4));

    // CSS transform origin for crisp scaling
    circle.style.transformOrigin = `${d.x.toFixed(3)}px ${d.y.toFixed(3)}px`;
    circle.style.willChange = "transform";

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
 * Animates a 0.9s halftone wipe transition on a GSAP timeline.
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
  const maxStagger = Math.max(0, halfDuration - dotDuration);
  const centerCol = cfg.centerX;
  const centerRow = cfg.centerY;
  const maxDist = Math.hypot(
    Math.max(centerCol, cfg.cols - 1 - centerCol),
    Math.max(centerRow, cfg.rows - 1 - centerRow)
  );

  // Animate each dot with stagger based on Euclidean distance
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    const col = parseFloat(dot.getAttribute("data-col") ?? "0");
    const row = parseFloat(dot.getAttribute("data-row") ?? "0");
    const dist = Math.hypot(col - centerCol, row - centerRow);
    const normDist = maxDist > 0 ? dist / maxDist : 0;

    const delayIn = normDist * maxStagger;
    const delayOut = halfDuration + normDist * maxStagger;

    // Half-wipe in (expand dots from center out to 1.0 to overlap and cover screen)
    timeline.fromTo(
      dot,
      { scale: 0 },
      {
        scale: 1,
        duration: dotDuration,
        ease: cfg.easeIn,
        immediateRender: false,
        transformOrigin: "center center"
      },
      startTime + delayIn
    );

    // Half-wipe out (shrink dots away from center back down to 0)
    timeline.to(
      dot,
      {
        scale: 0,
        duration: dotDuration,
        ease: cfg.easeOut,
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
 * @returns {gsap.core.Timeline} Paused GSAP timeline of duration 0.9s
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
 * 1. 0.3s before Point 1 (~6.88s)
 * 2. 0.3s before Point 4 (~25.10s)
 *
 * @param {gsap.core.Timeline} mainTimeline
 * @param {SVGSVGElement|string} target
 * @param {Partial<typeof HALFTONE_DEFAULTS>} [options]
 * @returns {gsap.core.Timeline}
 */
export function setupReelWipes(mainTimeline, target, options = {}) {
  const cfg = { ...HALFTONE_DEFAULTS, ...options };
  animateHalftoneWipe(mainTimeline, target, cfg.reelWipe1Start, cfg);
  animateHalftoneWipe(mainTimeline, target, cfg.reelWipe2Start, cfg);
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

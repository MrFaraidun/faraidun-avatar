/**
 * Master Audio Track Integration for HyperFrames
 * 
 * Defines all 21 synchronized audio tracks:
 * - Track 1: Voiceover narrative
 * - Track 2: Background music with 0.8s fade out
 * - Tracks 3–21: 19 discrete SFX event cues mapped to animation keyframes
 *
 * Each audio element contains data-start, data-duration, data-volume,
 * and individual data-track-index as required by the HyperFrames audio pipeline.
 */

export const AUDIO_TRACKS = [
  {
    id: "audio-voice",
    trackIndex: 1,
    type: "voiceover",
    event: "Voiceover",
    file: "voice.wav",
    src: "src/audio/voice.wav",
    start: "0.0",
    duration: "37.31",
    volume: "1.0",
    description: "Voiceover: Complete spoken narrative for Gemini Flash 4 reel"
  },
  {
    id: "audio-music",
    trackIndex: 2,
    type: "music",
    event: "Background Music",
    file: "music.wav",
    src: "src/audio/music.wav",
    start: "0.0",
    duration: "37.5",
    volume: "0.16",
    fadeOut: "0.8",
    description: "Background Music: Warm Rhodes lo-fi beat matching cream paper aesthetic, 0.8s fade out"
  },
  {
    id: "sfx-1-hook-pop",
    trackIndex: 3,
    type: "sfx",
    event: "Hook Pop 1",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "0.0",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 1: Hook Pop 1 on problem card entry at 0.0s"
  },
  {
    id: "sfx-2-hook-payoff-a",
    trackIndex: 4,
    type: "sfx",
    event: "Hook Payoff Pop A",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "1.90",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 2: Hook Payoff Pop A on first card reveal at 1.90s"
  },
  {
    id: "sfx-3-hook-payoff-b",
    trackIndex: 5,
    type: "sfx",
    event: "Hook Payoff Pop B",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "2.06",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 3: Hook Payoff Pop B on second card reveal at 2.06s"
  },
  {
    id: "sfx-4-hook-payoff-c",
    trackIndex: 6,
    type: "sfx",
    event: "Hook Payoff Pop C",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "2.22",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 4: Hook Payoff Pop C on third card reveal at 2.22s"
  },
  {
    id: "sfx-5-wipe-1-whoosh",
    trackIndex: 7,
    type: "sfx",
    event: "Wipe 1 Whoosh",
    file: "sfx_whoosh.wav",
    src: "src/audio/sfx_whoosh.wav",
    start: "6.88",
    duration: "0.5",
    volume: "0.75",
    description: "SFX 5: Wipe 1 Whoosh under halftone dot transition into Point 1 at 6.88s"
  },
  {
    id: "sfx-6-point-1-tick",
    trackIndex: 8,
    type: "sfx",
    event: "Point 1 Tick Roll",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "7.36",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 6: Point 1 Tick Roll under 18ms latency counter countdown at 7.36s"
  },
  {
    id: "sfx-7-point-1-type",
    trackIndex: 9,
    type: "sfx",
    event: "Point 1 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "8.50",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 7: Point 1 Terminal Type on live prompt typing at 8.50s"
  },
  {
    id: "sfx-8-point-1-thud",
    trackIndex: 10,
    type: "sfx",
    event: "Point 1 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "12.40",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 8: Point 1 Stamp Thud on REALTIME badge slam at 12.40s"
  },
  {
    id: "sfx-9-point-2-tick",
    trackIndex: 11,
    type: "sfx",
    event: "Point 2 Tick Roll",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "13.72",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 9: Point 2 Tick Roll under 10M token counter count-up at 13.72s"
  },
  {
    id: "sfx-10-point-2-type",
    trackIndex: 12,
    type: "sfx",
    event: "Point 2 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "14.80",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 10: Point 2 Terminal Type under stack card burst at 14.80s"
  },
  {
    id: "sfx-11-point-2-thud",
    trackIndex: 13,
    type: "sfx",
    event: "Point 2 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "15.46",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 11: Point 2 Stamp Thud on MASSIVE badge slam at 15.46s"
  },
  {
    id: "sfx-12-point-3-tick",
    trackIndex: 14,
    type: "sfx",
    event: "Point 3 Tick Roll",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "20.26",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 12: Point 3 Tick Roll under runtime ops counter at 20.26s"
  },
  {
    id: "sfx-13-point-3-type",
    trackIndex: 15,
    type: "sfx",
    event: "Point 3 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "21.40",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 13: Point 3 Terminal Type under tool execution node clicks at 21.40s"
  },
  {
    id: "sfx-14-point-3-thud",
    trackIndex: 16,
    type: "sfx",
    event: "Point 3 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "23.40",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 14: Point 3 Stamp Thud on AUTONOMOUS badge slam at 23.40s"
  },
  {
    id: "sfx-15-wipe-2-whoosh",
    trackIndex: 17,
    type: "sfx",
    event: "Wipe 2 Whoosh",
    file: "sfx_whoosh.wav",
    src: "src/audio/sfx_whoosh.wav",
    start: "25.10",
    duration: "0.5",
    volume: "0.75",
    description: "SFX 15: Wipe 2 Whoosh under halftone dot transition into Point 4 at 25.10s"
  },
  {
    id: "sfx-16-point-4-tick",
    trackIndex: 18,
    type: "sfx",
    event: "Point 4 Tick Roll",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "25.58",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 16: Point 4 Tick Roll under price percentage drop counter (-90%) at 25.58s"
  },
  {
    id: "sfx-17-point-4-type",
    trackIndex: 19,
    type: "sfx",
    event: "Point 4 Graph Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "26.70",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 17: Point 4 Graph Type on cost curve collapse at 26.70s"
  },
  {
    id: "sfx-18-point-4-thud",
    trackIndex: 20,
    type: "sfx",
    event: "Point 4 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "30.18",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 18: Point 4 Stamp Thud on EFFICIENCY badge slam at 30.18s"
  },
  {
    id: "sfx-19-closing-pop",
    trackIndex: 21,
    type: "sfx",
    event: "Closing Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "32.00",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 19: Closing Pop on final seamless loop restart at 32.00s"
  }
];

/**
 * Generate a single <audio> tag HTML string for a track
 * @param {object} track - Track metadata object
 * @param {string} [baseDir="src/audio"] - Directory prefix for audio sources
 * @returns {string} HTML string
 */
export function generateAudioTag(track, baseDir = "src/audio") {
  const src = `${baseDir}/${track.file}`;
  const fadeOutAttr = track.fadeOut ? ` data-fade-out="${track.fadeOut}"` : "";
  const fadeInAttr = track.fadeIn ? ` data-fade-in="${track.fadeIn}"` : "";

  return `    <audio id="${track.id}" src="${src}" data-start="${track.start}" data-duration="${track.duration}" data-volume="${track.volume}"${fadeInAttr}${fadeOutAttr} data-track-index="${track.trackIndex}" preload="auto"></audio>`;
}

/**
 * Generate all <audio> tags as a unified HTML block ready for index.html embedding
 * @param {string} [baseDir="src/audio"] - Directory prefix for audio sources
 * @returns {string} Multiline HTML snippet
 */
export function generateAudioTracksHtml(baseDir = "src/audio") {
  return [
    "    <!-- HyperFrames Master Audio Tracks (Voiceover, Music, and 19 SFX event triggers) -->",
    ...AUDIO_TRACKS.map(track => generateAudioTag(track, baseDir))
  ].join("\n");
}

/**
 * Clean pre-rendered HTML string ready to be embedded directly into index.html
 */
export const AUDIO_TRACKS_HTML = generateAudioTracksHtml();

/**
 * Client-side DOM helper: Injects all configured <audio> tags into the target container.
 * @param {HTMLElement} [container=document.body] - Target DOM container element
 * @param {string} [baseDir="src/audio"] - Audio files directory
 * @returns {HTMLAudioElement[]} Array of created HTMLAudioElement instances
 */
export function injectAudioTracks(container = document.body, baseDir = "src/audio") {
  if (typeof document === "undefined" || !container) {
    return [];
  }

  const fragment = document.createDocumentFragment();
  const elements = AUDIO_TRACKS.map(track => {
    const audio = document.createElement("audio");
    audio.id = track.id;
    audio.src = `${baseDir}/${track.file}`;
    audio.setAttribute("data-start", track.start);
    audio.setAttribute("data-duration", track.duration);
    audio.setAttribute("data-volume", track.volume);
    if (track.fadeOut) {
      audio.setAttribute("data-fade-out", track.fadeOut);
    }
    if (track.fadeIn) {
      audio.setAttribute("data-fade-in", track.fadeIn);
    }
    audio.setAttribute("data-track-index", String(track.trackIndex));
    audio.preload = "auto";
    fragment.appendChild(audio);
    return audio;
  });

  container.appendChild(fragment);
  return elements;
}

export default {
  AUDIO_TRACKS,
  AUDIO_TRACKS_HTML,
  generateAudioTag,
  generateAudioTracksHtml,
  injectAudioTracks
};

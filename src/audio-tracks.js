/**
 * Master Audio Track Integration for HyperFrames
 *
 * Defines all 31 synchronized audio tracks:
 * - Track 1: Voiceover narrative
 * - Track 2: Background music with 0.8s fade out
 * - Tracks 3–31: 29 discrete SFX event cues mapped to animation keyframes
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
    start: "0.00",
    duration: "38.00",
    volume: "1.00",
    description: "Voiceover: Complete spoken narrative for Google AI Studio reel"
  },
  {
    id: "audio-music",
    trackIndex: 2,
    type: "music",
    event: "Background Music",
    file: "music.wav",
    src: "src/audio/music.wav",
    start: "0.00",
    duration: "38.00",
    volume: "0.16",
    fadeOut: "0.8",
    description: "Background Music: Warm Rhodes lo-fi beat matching cream paper aesthetic, 0.8s fade out"
  },
  {
    id: "sfx-1-hook-pop",
    trackIndex: 3,
    type: "sfx",
    event: "Hook Problem Card Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "0.00",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 1: Hook Pop on problem card entry at 0.00s"
  },
  {
    id: "sfx-2-hook-thud",
    trackIndex: 4,
    type: "sfx",
    event: "Hook Problem Strike Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "1.70",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 2: Hook Thud on boilerplate strikethrough stamp at 1.70s"
  },
  {
    id: "sfx-3-hook-payoff-a",
    trackIndex: 5,
    type: "sfx",
    event: "Hook Cockpit Card Pop A",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "2.80",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 3: Hook Payoff Pop A on developer cockpit card reveal at 2.80s"
  },
  {
    id: "sfx-4-hook-payoff-b",
    trackIndex: 6,
    type: "sfx",
    event: "Hook Cockpit Card Pop B",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "2.96",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 4: Hook Payoff Pop B on model parameter card reveal at 2.96s"
  },
  {
    id: "sfx-5-hook-payoff-c",
    trackIndex: 7,
    type: "sfx",
    event: "Hook Cockpit Card Pop C",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "3.12",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 5: Hook Payoff Pop C on live playground card reveal at 3.12s"
  },
  {
    id: "sfx-6-wipe-1-whoosh",
    trackIndex: 8,
    type: "sfx",
    event: "Wipe 1 Halftone Whoosh",
    file: "sfx_whoosh.wav",
    src: "src/audio/sfx_whoosh.wav",
    start: "6.20",
    duration: "0.50",
    volume: "0.75",
    description: "SFX 6: Wipe 1 Whoosh under halftone dot transition into Point 1 at 6.20s"
  },
  {
    id: "sfx-7-point-1-pop",
    trackIndex: 9,
    type: "sfx",
    event: "Point 1 Title Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "6.50",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 7: Point 1 Pop on title entry at 6.50s"
  },
  {
    id: "sfx-8-point-1-tick",
    trackIndex: 10,
    type: "sfx",
    event: "Point 1 2M Counter Tick",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "7.40",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 8: Point 1 Tick Roll under 2M token context counter count-up at 7.40s"
  },
  {
    id: "sfx-9-point-1-type",
    trackIndex: 11,
    type: "sfx",
    event: "Point 1 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "9.35",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 9: Point 1 Terminal Type on multimodal file ingest at 9.35s"
  },
  {
    id: "sfx-10-point-1-thud",
    trackIndex: 12,
    type: "sfx",
    event: "Point 1 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "12.00",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 10: Point 1 Stamp Thud on MULTIMODAL badge slam at 12.00s"
  },
  {
    id: "sfx-11-point-2-pop",
    trackIndex: 13,
    type: "sfx",
    event: "Point 2 Title Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "13.00",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 11: Point 2 Pop on system instructions title entry at 13.00s"
  },
  {
    id: "sfx-12-point-2-tick",
    trackIndex: 14,
    type: "sfx",
    event: "Point 2 Physics Dial Tick",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "13.70",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 12: Point 2 Tick Roll under dynamic temperature slider dial at 13.70s"
  },
  {
    id: "sfx-13-point-2-type",
    trackIndex: 15,
    type: "sfx",
    event: "Point 2 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "14.85",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 13: Point 2 Terminal Type on system instructions prompt at 14.85s"
  },
  {
    id: "sfx-14-point-2-thud",
    trackIndex: 16,
    type: "sfx",
    event: "Point 2 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "18.50",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 14: Point 2 Stamp Thud on DYNAMIC PHYSICS badge slam at 18.50s"
  },
  {
    id: "sfx-15-point-3-pop",
    trackIndex: 17,
    type: "sfx",
    event: "Point 3 Title Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "19.50",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 15: Point 3 Pop on structured output title entry at 19.50s"
  },
  {
    id: "sfx-16-point-3-tick",
    trackIndex: 18,
    type: "sfx",
    event: "Point 3 Schema Parser Tick",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "20.25",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 16: Point 3 Tick Roll under JSON schema parser validation at 20.25s"
  },
  {
    id: "sfx-17-point-3-type",
    trackIndex: 19,
    type: "sfx",
    event: "Point 3 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "22.60",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 17: Point 3 Terminal Type on JSON schema code generation at 22.60s"
  },
  {
    id: "sfx-18-point-3-chime",
    trackIndex: 20,
    type: "sfx",
    event: "Point 3 Schema Enforcement Chime",
    file: "sfx_chime.wav",
    src: "src/audio/sfx_chime.wav",
    start: "23.40",
    duration: "0.50",
    volume: "0.75",
    description: "SFX 18: Point 3 Schema Chime on strict schema validation lock at 23.40s"
  },
  {
    id: "sfx-19-point-3-thud",
    trackIndex: 21,
    type: "sfx",
    event: "Point 3 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "24.80",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 19: Point 3 Stamp Thud on ZERO HALLUCINATIONS badge slam at 24.80s"
  },
  {
    id: "sfx-20-wipe-2-whoosh",
    trackIndex: 22,
    type: "sfx",
    event: "Wipe 2 Halftone Whoosh",
    file: "sfx_whoosh.wav",
    src: "src/audio/sfx_whoosh.wav",
    start: "25.70",
    duration: "0.50",
    volume: "0.75",
    description: "SFX 20: Wipe 2 Whoosh under halftone dot transition into Point 4 at 25.70s"
  },
  {
    id: "sfx-21-point-4-pop",
    trackIndex: 23,
    type: "sfx",
    event: "Point 4 Title Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "26.00",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 21: Point 4 Pop on Get Code title entry at 26.00s"
  },
  {
    id: "sfx-22-point-4-tick",
    trackIndex: 24,
    type: "sfx",
    event: "Point 4 Grounding Tick",
    file: "sfx_tick.wav",
    src: "src/audio/sfx_tick.wav",
    start: "26.70",
    duration: "1.15",
    volume: "0.75",
    description: "SFX 22: Point 4 Tick Roll under search grounding live data sync at 26.70s"
  },
  {
    id: "sfx-23-point-4-ding",
    trackIndex: 25,
    type: "sfx",
    event: "Point 4 Get Code Ding",
    file: "sfx_ding.wav",
    src: "src/audio/sfx_ding.wav",
    start: "27.42",
    duration: "0.45",
    volume: "0.75",
    description: "SFX 23: Point 4 Get Code Ding on one-click export button click at 27.42s"
  },
  {
    id: "sfx-24-point-4-type",
    trackIndex: 26,
    type: "sfx",
    event: "Point 4 Terminal Type",
    file: "sfx_type.wav",
    src: "src/audio/sfx_type.wav",
    start: "29.00",
    duration: "0.85",
    volume: "0.75",
    description: "SFX 24: Point 4 Terminal Type on Python, TypeScript, and cURL export at 29.00s"
  },
  {
    id: "sfx-25-point-4-thud",
    trackIndex: 27,
    type: "sfx",
    event: "Point 4 Stamp Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "31.00",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 25: Point 4 Stamp Thud on PRODUCTION READY badge slam at 31.00s"
  },
  {
    id: "sfx-26-outro-pop-1",
    trackIndex: 28,
    type: "sfx",
    event: "Outro Pop 1",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "32.50",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 26: Outro Pop on Prototype Here card at 32.50s"
  },
  {
    id: "sfx-27-outro-pop-2",
    trackIndex: 29,
    type: "sfx",
    event: "Outro Pop 2",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "33.70",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 27: Outro Pop on Ship Everywhere card at 33.70s"
  },
  {
    id: "sfx-28-outro-thud",
    trackIndex: 30,
    type: "sfx",
    event: "Outro Velocity Thud",
    file: "sfx_thud.wav",
    src: "src/audio/sfx_thud.wav",
    start: "36.70",
    duration: "0.25",
    volume: "0.75",
    description: "SFX 28: Outro Thud on PURE VELOCITY badge slam at 36.70s"
  },
  {
    id: "sfx-29-closing-pop",
    trackIndex: 31,
    type: "sfx",
    event: "Closing Seamless Loop Pop",
    file: "sfx_pop.wav",
    src: "src/audio/sfx_pop.wav",
    start: "37.80",
    duration: "0.14",
    volume: "0.75",
    description: "SFX 29: Closing Pop on final seamless loop restart at 37.80s"
  }
];

/**
 * Generate an HTML <audio> tag string for a given track specification
 * @param {Object} track - Audio track object from AUDIO_TRACKS
 * @param {string} [baseDir="src/audio"] - Directory prefix for audio sources
 * @returns {string} Formatted HTML audio tag
 */
export function generateAudioTag(track, baseDir = "src/audio") {
  const src = track.src || `${baseDir}/${track.file}`;
  const fadeInAttr = track.fadeIn ? ` data-fade-in="${track.fadeIn}"` : "";
  const fadeOutAttr = track.fadeOut ? ` data-fade-out="${track.fadeOut}"` : "";
  return `    <audio id="${track.id}" src="${src}" data-start="${track.start}" data-duration="${track.duration}" data-volume="${track.volume}"${fadeInAttr}${fadeOutAttr} data-track-index="${track.trackIndex}" preload="auto"></audio>`;
}

/**
 * Generate all <audio> tags as a unified HTML block ready for index.html embedding
 * @param {string} [baseDir="src/audio"] - Directory prefix for audio sources
 * @returns {string} Multiline HTML snippet
 */
export function generateAudioTracksHtml(baseDir = "src/audio") {
  return [
    "    <!-- HyperFrames Master Audio Tracks (Voiceover, Music, and 29 SFX event triggers) -->",
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

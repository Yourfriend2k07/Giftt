/**
 * Web Audio API synthesizer for ambient garden serenity and celebratory birthday chimes.
 * Requires no external audio files, completely reliable and self-contained.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlayingAmbience = false;
  private ambienceTimer: number | null = null;
  private volume = 0.25;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft acoustic guitar / bell note
  playPluck(freq: number, duration = 1.6, decay = 0.4) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm acoustic-like harmonic blend
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + duration);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio context may require initial user gesture
    }
  }

  // Gentle sparkle chime for button interactions
  playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((f, idx) => {
      setTimeout(() => this.playPluck(f, 0.8, 0.2), idx * 60);
    });
  }

  // Cute boing/bubble pop sound effect
  playCutePop() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // ignore
    }
  }

  // Funny party horn / cheer sound
  playPartyHorn() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const now = this.ctx.currentTime;
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.22);
        }, idx * 70);
      });
    } catch {
      // ignore
    }
  }

  // Celebratory birthday melody fanfare for candle blowout
  playBirthdayFanfare() {
    // Happy Birthday first phrase: G4 G4 A4 G4 C5 B4
    const melody = [
      { f: 392.0, d: 260 },
      { f: 392.0, d: 260 },
      { f: 440.0, d: 480 },
      { f: 392.0, d: 480 },
      { f: 523.25, d: 480 },
      { f: 493.88, d: 900 },
      // Second phrase: G4 G4 A4 G4 D5 C5
      { f: 392.0, d: 260 },
      { f: 392.0, d: 260 },
      { f: 440.0, d: 480 },
      { f: 392.0, d: 480 },
      { f: 587.33, d: 480 },
      { f: 523.25, d: 1000 },
    ];

    let delay = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playPluck(note.f, (note.d / 1000) * 1.5);
      }, delay);
      delay += note.d;
    });
  }

  toggleGardenAmbiance(forceState?: boolean): boolean {
    const target = forceState !== undefined ? forceState : !this.isPlayingAmbience;
    if (target) {
      this.initContext();
      this.isPlayingAmbience = true;
      this.startGardenPattern();
    } else {
      this.isPlayingAmbience = false;
      if (this.ambienceTimer) {
        window.clearTimeout(this.ambienceTimer);
        this.ambienceTimer = null;
      }
    }
    return this.isPlayingAmbience;
  }

  private startGardenPattern() {
    if (!this.isPlayingAmbience) return;

    // Gentle sunlit arpeggios in G Major / C Major (peaceful, warm)
    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C maj
      [293.66, 369.99, 440.0, 587.33], // D maj / G tone
      [329.63, 392.0, 493.88, 659.25], // Em7
      [261.63, 329.63, 392.0, 440.0],  // F/C maj
    ];

    const currentChord = chords[Math.floor(Math.random() * chords.length)];
    const note = currentChord[Math.floor(Math.random() * currentChord.length)];

    this.playPluck(note, 2.8);

    // Random interval between 1.2s and 2.5s
    const nextInterval = 1200 + Math.random() * 1300;
    this.ambienceTimer = window.setTimeout(() => {
      this.startGardenPattern();
    }, nextInterval);
  }

  isAmbienceActive(): boolean {
    return this.isPlayingAmbience;
  }
}

export const soundSynth = new SoundSynthesizer();

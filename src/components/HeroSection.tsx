import { Sparkles, Cake, Compass, Heart, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

interface HeroSectionProps {
  auntName: string;
  senderName: string;
  milestone: string;
  onOpenPersonalize: () => void;
  onOpenCardModal: () => void;
}

export function HeroSection({
  auntName,
  senderName,
  milestone,
  onOpenPersonalize,
  onOpenCardModal,
}: HeroSectionProps) {
  const handleCelebrateClick = () => {
    soundSynth.playSparkle();

    // 2-wave warm sunflower petal confetti
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706', '#ca8a04', '#16a34a'],
    });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-16 md:py-20">
      {/* Decorative Warm Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-200/40 via-yellow-100/20 to-transparent blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heartfelt Typographic Tribute */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Meta indicator with unboxed typography (Anti-Slop rule compliant) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-800 uppercase">
              <span>Golden Celebration</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>{milestone || 'Forever Radiant'}</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <button
                onClick={onOpenPersonalize}
                className="inline-flex items-center gap-1 text-stone-500 hover:text-amber-700 underline underline-offset-2 transition-colors lowercase font-normal"
              >
                <Edit3 className="h-3 w-3" />
                <span>edit name</span>
              </button>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Happy Birthday,{' '}
              <span className="relative inline-block font-medium italic text-amber-900">
                {auntName}
                <svg
                  className="absolute -bottom-2 left-0 w-full text-amber-400"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,0 100,5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              !
            </h1>

            <p className="font-sans-body text-lg sm:text-xl text-stone-700 leading-relaxed max-w-2xl">
              "Like sunflowers turn their faces toward the sun, our family naturally turns toward your warmth, your kindness, and the unconditional love you radiate everywhere you go."
            </p>

            <div className="font-handwriting text-2xl text-amber-800/90 tracking-wide">
              — Crafted with endless love by {senderName}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCelebrateClick}
                className="group flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all"
              >
                <Sparkles className="h-4 w-4 text-stone-900 transition-transform group-hover:rotate-12" />
                <span>Shower with Joy 🎉</span>
              </button>

              <a
                href="#funny"
                className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-900 hover:bg-rose-100 active:scale-95 transition-all"
              >
                <span role="img" aria-label="Trophy">🏆</span>
                <span>Hall of Fame & Roasts</span>
              </a>

              <a
                href="#cake"
                className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-sm font-medium text-stone-800 hover:border-amber-400 hover:bg-white active:scale-95 transition-all"
              >
                <Cake className="h-4 w-4 text-amber-600" />
                <span>Blow Candles</span>
              </a>

              <button
                onClick={onOpenCardModal}
                className="flex items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-sm font-medium text-amber-900 hover:bg-amber-100/80 active:scale-95 transition-all"
              >
                <Heart className="h-4 w-4 text-amber-700" />
                <span>Card 💌</span>
              </button>
            </div>

            {/* Quick Proof Quotes / Warm Metrics (Human & editorial) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-900/10 w-full max-w-lg">
              <div>
                <p className="font-serif-display text-2xl font-bold text-amber-900 tabular-nums">100%</p>
                <p className="text-xs text-stone-500">Cool Aunt Energy</p>
              </div>
              <div>
                <p className="font-serif-display text-2xl font-bold text-amber-900 tabular-nums">0%</p>
                <p className="text-xs text-stone-500">Boring Lectures</p>
              </div>
              <div>
                <p className="font-serif-display text-2xl font-bold text-amber-900 tabular-nums">#1</p>
                <p className="text-xs text-stone-500">Unmatched Legend</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative sun-kissed ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-300/40 via-yellow-200/20 to-amber-500/30 blur-lg" />

              <div className="relative overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-xl shadow-amber-900/10">
                <img
                  src="/src/assets/images/sunflower_hero_1791483243953.jpg"
                  alt={`Golden sunflowers in sunset honoring ${auntName}`}
                  referrerPolicy="no-referrer"
                  className="h-[360px] sm:h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Scrim overlay with heartfelt badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="font-handwriting text-2xl text-amber-200">
                    Always blooming with grace
                  </span>
                  <p className="text-xs text-stone-200 mt-1">
                    "Where flowers bloom, so does hope and joy."
                  </p>
                </div>
              </div>

              {/* Floating aesthetic stamp / polaroid corner */}
              <div className="absolute -bottom-5 -left-4 rounded-xl border border-amber-200 bg-white/95 p-3 shadow-lg backdrop-blur-md hidden sm:flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label="Sunflower">🌻</span>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Bloom & Shine</p>
                  <p className="text-[11px] text-stone-500">Auntie's Special Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

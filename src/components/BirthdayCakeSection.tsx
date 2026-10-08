import { useState } from 'react';
import { Flame, Sparkles, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

interface BirthdayCakeSectionProps {
  auntName: string;
}

export function BirthdayCakeSection({ auntName }: BirthdayCakeSectionProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [wishText, setWishText] = useState('');
  const [submittedWish, setSubmittedWish] = useState('');

  const candleCount = 5; // Representative lucky golden candles

  const blowOutCandles = () => {
    if (!candlesLit) return;
    
    // Extinguish
    setCandlesLit(false);
    setWishMade(true);
    if (wishText.trim()) {
      setSubmittedWish(wishText.trim());
    }

    // Play fanfare
    soundSynth.playBirthdayFanfare();

    // Celebration burst
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#fbbf24', '#fef08a', '#e11d48', '#38bdf8', '#4ade80'],
    });

    // Second delayed burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ffaa00', '#ffffff'],
      });
    }, 450);
  };

  const relightCandles = () => {
    soundSynth.playSparkle();
    setCandlesLit(true);
  };

  return (
    <section id="cake" className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFAF6] via-amber-50/40 to-[#FCFAF6] border-y border-amber-900/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Section kicker */}
        <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
          Make A Wish · Blow The Candles
        </p>

        <h2 className="font-serif-display mt-2 text-3xl sm:text-4xl font-normal text-stone-900">
          The Sunflower Birthday Cake
        </h2>

        <p className="mt-3 text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
          Close your eyes, think of the happiest wish for the year ahead, and tap the button to blow out your birthday candles!
        </p>

        {/* Wish Input Box (Optional prompt before blowing) */}
        <div className="mt-6 mx-auto max-w-md">
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white/90 p-1.5 shadow-xs focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200">
            <input
              type="text"
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Whisper a secret birthday wish here (optional)..."
              className="w-full bg-transparent px-3 py-1.5 text-sm text-stone-800 placeholder-stone-400 outline-none"
            />
          </div>
        </div>

        {/* Interactive Cake Illustration Container */}
        <div className="relative mt-12 mx-auto max-w-md flex flex-col items-center">
          {/* Candle Flames & Wicks */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 z-10 -mb-2">
            {Array.from({ length: candleCount }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame or Smoke */}
                <div className="h-9 flex items-center justify-center">
                  {candlesLit ? (
                    <div
                      className="relative animate-flicker"
                      style={{ animationDelay: `${idx * 0.22}s` }}
                    >
                      {/* Outer golden halo */}
                      <div className="absolute -inset-1.5 rounded-full bg-amber-400/40 blur-xs" />
                      {/* Inner teardrop flame */}
                      <div className="h-6 w-3.5 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-md shadow-amber-300" />
                      {/* Core hot blue spark */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-blue-300/80" />
                    </div>
                  ) : (
                    // Smoke wisps when blown out
                    <div className="flex flex-col items-center opacity-70 animate-pulse">
                      <div className="h-3 w-1.5 rounded-full bg-stone-300 blur-xs -translate-y-1" />
                      <div className="h-1.5 w-1 bg-stone-400 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Candle Wick */}
                <div className="h-2 w-0.5 bg-stone-700" />

                {/* Candle Stick (Golden spiral patterned candle) */}
                <div
                  className="h-14 sm:h-16 w-3.5 sm:w-4 rounded-t-sm shadow-inner relative overflow-hidden"
                  style={{
                    background:
                      idx % 2 === 0
                        ? 'repeating-linear-gradient(45deg, #fef08a, #fef08a 4px, #f59e0b 4px, #f59e0b 8px)'
                        : 'repeating-linear-gradient(-45deg, #fef3c7, #fef3c7 4px, #d97706 4px, #d97706 8px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="relative w-56 sm:w-64 h-16 rounded-t-2xl bg-gradient-to-b from-[#FFFDF7] to-[#FBEBC6] border-t-4 border-amber-200 shadow-md flex items-center justify-around px-4">
            {/* Sunflower sugar toppers */}
            <span className="text-xl transform -rotate-12 select-none">🌻</span>
            <div className="h-1 w-20 bg-amber-200/60 rounded-full" />
            <span className="text-xl transform rotate-12 select-none">🌻</span>
            {/* Frosting dripping scallops */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-2 text-amber-200/90 text-sm">
              <span>◡</span><span>◡</span><span>◡</span><span>◡</span><span>◡</span><span>◡</span><span>◡</span><span>◡</span>
            </div>
          </div>

          {/* Cake Middle Tier */}
          <div className="relative w-72 sm:w-80 h-20 bg-gradient-to-b from-[#FDF8EA] to-[#F7E1AB] border-t-2 border-amber-300/60 shadow-md flex items-center justify-center">
            {/* Golden piped inscription */}
            <div className="font-handwriting text-2xl sm:text-3xl font-bold text-amber-900 tracking-wider">
              Happy Birthday {auntName}
            </div>
            {/* Miniature Sunflower decor */}
            <div className="absolute right-4 text-lg">🌻</div>
            <div className="absolute left-4 text-lg">🌻</div>
          </div>

          {/* Cake Base Tier */}
          <div className="relative w-84 sm:w-96 h-22 bg-gradient-to-b from-[#F8ECD0] to-[#E8C67E] rounded-b-xl border-t-2 border-amber-400/40 shadow-xl flex items-center justify-center">
            {/* Honey swirl decorative band */}
            <div className="flex items-center gap-3 text-amber-800 text-xs font-medium tracking-widest uppercase">
              <span>✦</span>
              <span>Forever Golden</span>
              <span>✦</span>
              <span>Full of Joy</span>
              <span>✦</span>
            </div>
          </div>

          {/* Golden Cake Pedestal / Plate */}
          <div className="w-[380px] sm:w-[440px] h-4 rounded-full bg-gradient-to-r from-stone-200 via-amber-200 to-stone-200 shadow-md -mt-1" />
          <div className="w-48 h-3 bg-amber-300/40 rounded-b-lg shadow-sm" />

          {/* Interactive Controls below cake */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {candlesLit ? (
              <button
                onClick={blowOutCandles}
                className="group flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 px-6 py-3.5 text-base font-semibold text-stone-950 shadow-lg shadow-amber-500/25 transition-all"
              >
                <Flame className="h-5 w-5 text-amber-950 transition-transform group-hover:scale-110" />
                <span>Make a Wish & Blow Out Candles! 🎂</span>
              </button>
            ) : (
              <button
                onClick={relightCandles}
                className="flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-5 py-3 text-sm font-semibold text-amber-900 shadow-xs hover:bg-amber-50 active:scale-95 transition-all"
              >
                <RotateCcw className="h-4 w-4 text-amber-600" />
                <span>Relight Candles 🕯️</span>
              </button>
            )}
          </div>

          {/* Wish Fulfilled Revelation Card */}
          {wishMade && !candlesLit && (
            <div className="mt-8 w-full max-w-lg rounded-2xl border border-amber-300 bg-white/95 p-6 shadow-xl backdrop-blur-md transition-all animate-float-slow text-left">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
                <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>Auntie's Birthday Blessing</span>
              </div>

              <h4 className="font-serif-display mt-2 text-xl font-medium text-stone-900">
                Your wish has soared to the heavens! ✨
              </h4>

              {submittedWish && (
                <div className="mt-3 rounded-lg bg-amber-50/80 p-3 text-sm italic text-stone-800 border border-amber-200/70 font-handwriting text-lg">
                  "{submittedWish}"
                </div>
              )}

              <p className="mt-3 text-sm text-stone-600 leading-relaxed font-sans-body">
                May your upcoming year be blessed with sunlit afternoons, the sweet scent of fresh flowers, peace in your spirit, and boundless laughter with the ones who cherish you most.
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-amber-100">
                <span>The candles are blown with pure love</span>
                <span className="font-handwriting text-base text-amber-800 font-semibold">Happy Birthday, {auntName}!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

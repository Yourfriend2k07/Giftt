import { useState } from 'react';
import { Quote, Sparkles, Copy, Check, Heart, Feather, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

interface GoodLinesSectionProps {
  auntName: string;
}

interface CuratedLine {
  id: string;
  category: 'poetic' | 'loving' | 'cheerful' | 'wisdom' | 'funny';
  verse: string;
  subtext: string;
  tag: string;
}

const CURATED_LINES: CuratedLine[] = [
  {
    id: '1',
    category: 'poetic',
    verse: 'Keep your face always toward the sunshine, and shadows will fall behind you. Just like you do for everyone around you, Addii.',
    subtext: 'Inspired by Walt Whitman · Adapted for our brightest light',
    tag: 'Poetic Sunshine',
  },
  {
    id: '2',
    category: 'loving',
    verse: 'An aunt is someone who is half mother, half best friend, and entirely wrapped in golden unconditional love.',
    subtext: 'From the deepest corners of our grateful hearts',
    tag: 'Family Love',
  },
  {
    id: '3',
    category: 'funny',
    verse: 'I smile because you’re my aunt. I laugh because there is absolutely nothing my parents can do about it!',
    subtext: 'The best family loophole in history',
    tag: 'Cute & Sassy',
  },
  {
    id: '4',
    category: 'cheerful',
    verse: 'May your birthday bloom with as much laughter, sweet cake, and golden warmth as a field of sunflowers in mid-August!',
    subtext: 'Wishing you the happiest celebration today',
    tag: 'Birthday Cheer',
  },
  {
    id: '5',
    category: 'funny',
    verse: 'They say wisdom comes with age... but in Addii’s case, it came with killer outfits, gorgeous looks, and zero tolerance for boring people!',
    subtext: 'Forever the most stylish aunt in the room',
    tag: 'Iconic Energy',
  },
  {
    id: '6',
    category: 'wisdom',
    verse: 'The most beautiful people wear their years like sunbeams—brightening every life they touch and making the world feel softer.',
    subtext: 'In honor of your timeless elegance',
    tag: 'Timeless Beauty',
  },
  {
    id: '7',
    category: 'funny',
    verse: 'Behind every happy niece and nephew is an aunt who whispered: "Don’t tell your parents, but eat the cake!"',
    subtext: 'Certified partner in crime',
    tag: 'Secret Treat Supplier',
  },
  {
    id: '8',
    category: 'loving',
    verse: 'God knew our family needed extra sweetness, extra laughter, and a lot more fun, so He blessed us with Addii!',
    subtext: 'Blessed beyond measure to have you',
    tag: 'Pure Blessing',
  },
  {
    id: '9',
    category: 'cheerful',
    verse: 'To the woman who knows all the family secrets, makes the best treats, and gives the best advice: Happy Birthday, our golden Queen!',
    subtext: 'Forever our favorite person',
    tag: 'Queen of the Family',
  },
  {
    id: '10',
    category: 'wisdom',
    verse: 'Like a sunflower standing tall in the summer soil, you have taught us that rooted love and reaching upward can overcome any season.',
    subtext: 'Lessons of strength and resilience',
    tag: 'Rooted Strength',
  },
];

const SURPRISE_BLESSINGS = [
  'May every morning greet you with honey-sweet peace, gentle breeze, and the scent of blossoms.',
  'May your heart stay as radiant, fun, and warm as a sunflower turning its golden crown toward dawn.',
  'May unexpected joys, good health, unlimited shopping energy, and abundant laughter arrive on your doorstep every single week this year.',
  'May you always know just how profoundly cherished, respected, and treasured you are by everyone in your orbit.',
  'May the seeds of love you have planted in all of our lives return to you a hundredfold in blessings and cake!',
];

export function GoodLinesSection({ auntName }: GoodLinesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'poetic' | 'loving' | 'cheerful' | 'wisdom' | 'funny'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const filteredLines =
    activeCategory === 'all'
      ? CURATED_LINES
      : CURATED_LINES.filter((line) => line.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundSynth.playSparkle();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDrawBlessing = () => {
    soundSynth.playSparkle();
    const nextIdx = (surpriseIndex + 1) % SURPRISE_BLESSINGS.length;
    setSurpriseIndex(nextIdx);
    setIsRevealed(true);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#fbbf24', '#d97706'],
    });
  };

  return (
    <section id="lines" className="py-16 md:py-24 bg-[#FCFAF6] border-t border-amber-900/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
            Words of Warmth & Elegance
          </p>
          <h2 className="font-serif-display mt-2 text-3xl sm:text-4xl font-normal text-stone-900">
            Sunlit Lines for {auntName}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Beautifully crafted quotes, poetic verses, and sincere birthday blessings to remind her of her golden presence.
          </p>
        </div>

        {/* Interactive Segmented Filter (Anti-Slop rule: functional buttons with clean segmented styles) */}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-xl bg-stone-100/90 p-1.5 border border-stone-200/60">
            {(
              [
                { id: 'all', label: 'All Lines' },
                { id: 'funny', label: 'Cute & Sassy 😂' },
                { id: 'poetic', label: 'Poetic & Floral 🌻' },
                { id: 'loving', label: 'From the Heart 💖' },
                { id: 'cheerful', label: 'Sunny & Cheerful ✨' },
                { id: 'wisdom', label: 'Grace & Wisdom 👑' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLines.map((line) => (
            <div
              key={line.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-amber-200/70 bg-white p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-300"
            >
              <div>
                {/* Quiet unboxed metadata indicator */}
                <div className="flex items-center justify-between text-xs text-amber-800/80 mb-3">
                  <span className="font-medium tracking-wide uppercase">{line.tag}</span>
                  <Feather className="h-3.5 w-3.5 text-amber-500" />
                </div>

                {/* Primary Verse */}
                <blockquote className="font-serif-display text-lg sm:text-xl font-normal text-stone-900 leading-relaxed italic">
                  "{line.verse}"
                </blockquote>

                {/* Editorial Subtext */}
                <p className="mt-3 text-xs text-stone-500 font-sans-body">
                  {line.subtext}
                </p>
              </div>

              {/* Bottom Card Controls */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100">
                <span className="font-handwriting text-base text-amber-900">
                  With love for {auntName}
                </span>

                <button
                  onClick={() => handleCopy(line.id, line.verse)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-stone-600 hover:text-amber-800 hover:bg-amber-50 transition-colors"
                  title="Copy quote to share"
                >
                  {copiedId === line.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive "Surprise Golden Blessing" Wax Seal Envelope */}
        <div className="mt-16 mx-auto max-w-2xl rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40 p-8 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-3 right-4 text-3xl opacity-20">🌻</div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Interactive Birthday Fortune</span>
          </div>

          <h3 className="font-serif-display mt-2 text-2xl font-normal text-stone-900">
            Open Today’s Golden Birthday Blessing
          </h3>

          <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
            Tap the button to unlock a personalized celestial blessing dedicated to {auntName}’s upcoming year.
          </p>

          <div className="mt-6 flex flex-col items-center">
            {isRevealed ? (
              <div className="w-full rounded-2xl bg-white border border-amber-200 p-6 shadow-sm transition-all animate-float-slow text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 mb-3">
                  <Heart className="h-5 w-5 fill-amber-500 text-amber-500" />
                </div>
                <p className="font-serif-display text-lg sm:text-xl text-amber-950 italic leading-relaxed">
                  "{SURPRISE_BLESSINGS[surpriseIndex]}"
                </p>
                <p className="mt-3 font-handwriting text-xl text-amber-800">
                  May this blossom in your days ahead ✨
                </p>

                <div className="mt-5">
                  <button
                    onClick={handleDrawBlessing}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 px-4 py-2 text-xs font-semibold text-stone-950 transition-all"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Draw Another Golden Blessing</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleDrawBlessing}
                className="group flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 px-6 py-3.5 text-sm font-semibold text-stone-950 shadow-md shadow-amber-500/20 transition-all"
              >
                <Sparkles className="h-4 w-4 text-stone-900 transition-transform group-hover:rotate-12" />
                <span>Break the Wax Seal & Reveal 💌</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

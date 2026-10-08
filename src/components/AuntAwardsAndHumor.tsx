import { useState } from 'react';
import { Trophy, Laugh, Sparkles, Coffee, Heart, Glasses, ShoppingBag, Flame, ThumbsUp, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

interface AuntAwardsAndHumorProps {
  auntName: string;
}

interface Award {
  id: string;
  badge: string;
  title: string;
  funnyDescription: string;
  votes: number;
  perk: string;
}

const INITIAL_AWARDS: Award[] = [
  {
    id: 'a1',
    badge: '🕶️',
    title: 'The Cool Aunt Pass',
    funnyDescription: 'Officially certified for never snitching to our parents, letting us stay up late, and pretending not to see anything.',
    perk: 'Lifetime immunity from family drama',
    votes: 42,
  },
  {
    id: 'a2',
    badge: '☕',
    title: 'Chief Chai & Gossip Officer',
    funnyDescription: 'Knows all family tea 48 hours before anyone else. Possesses FBI-grade investigative skills disguised as casual conversation.',
    perk: 'Always serves the hottest tea with extra sugar',
    votes: 38,
  },
  {
    id: 'a3',
    badge: '🍫',
    title: 'Secret Midnight Snack Dealer',
    funnyDescription: 'Expert at smuggling pastries, candy, and fast food when parents declare the kitchen officially closed for the night.',
    perk: 'Infinite treat supply unlocked',
    votes: 55,
  },
  {
    id: 'a4',
    badge: '👑',
    title: 'Forever 21 (With Bonus Experience)',
    funnyDescription: 'Age is just a number, and in Addii’s case, that number is classified under national family security laws.',
    perk: 'Immune to aging, forever stylish',
    votes: 61,
  },
  {
    id: 'a5',
    badge: '🚗',
    title: 'Emergency Getaway Driver',
    funnyDescription: 'Can invent a 100% believable emergency excuse to rescue us from any boring reunion in under 90 seconds.',
    perk: 'Fastest escape plan in the business',
    votes: 29,
  },
  {
    id: 'a6',
    badge: '🎤',
    title: 'World-Class Hype Woman',
    funnyDescription: 'Celebrates our smallest life accomplishments like we just won an Olympic gold medal and a Nobel Prize combined.',
    perk: 'Guaranteed 200% self-esteem boost',
    votes: 47,
  },
];

const FUNNY_ROASTS = [
  "I smile because you’re my aunt. I laugh because there’s nothing my parents can do about it!",
  "They say wisdom comes with age... but in Addii's case, it came with killer outfits, great taste, and zero tolerance for boring stories!",
  "Happy Birthday to the woman who proves that being responsible is completely optional when you're the favorite aunt.",
  "Behind every happy kid is an aunt who whispered: 'Don't tell your mom, but take the money.' Thank you, Addii!",
  "Addii isn't just an aunt—she's an entire aesthetic, a personal therapist, and an emergency snack supplier.",
  "Don't worry about another year older, Addii. You're still way younger than you will be next year!",
  "Scientists have confirmed: Addii's birthday cake is 100% zero-calorie because birthdays are exempt from the laws of physics.",
  "Thank you for being the adult we can always confide in without getting a 45-minute lecture!",
];

const ADDI_ENERGIES = [
  {
    label: 'Sassy Chai & Gossip Mode',
    icon: '☕',
    desc: 'Spilling family tea, giving iconic advice, and sipping warm beverages with sunglasses indoors.',
  },
  {
    label: 'Sweet Angel & Snack Supplier',
    icon: '🍰',
    desc: 'Baking delicious treats, giving bear hugs, and feeding everyone until they cannot walk.',
  },
  {
    label: 'Glamour Queen on the Runway',
    icon: '✨',
    desc: 'Serving high-fashion looks, smelling like expensive perfume, and stealing the spotlight effortlessly.',
  },
  {
    label: 'The Partner-in-Crime',
    icon: '🕶️',
    desc: 'Ready for spontaneous late-night adventures and covering for all questionable life choices.',
  },
];

export function AuntAwardsAndHumor({ auntName }: AuntAwardsAndHumorProps) {
  const [awards, setAwards] = useState<Award[]>(INITIAL_AWARDS);
  const [roastIndex, setRoastIndex] = useState(0);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);

  const handleVote = (id: string) => {
    soundSynth.playCutePop();
    setAwards((prev) =>
      prev.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a))
    );
  };

  const handleNextRoast = () => {
    soundSynth.playPartyHorn();
    setRoastIndex((prev) => (prev + 1) % FUNNY_ROASTS.length);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#ec4899', '#f59e0b', '#3b82f6', '#10b981'],
    });
  };

  const handleSelectEnergy = (idx: number) => {
    soundSynth.playCutePop();
    setSelectedEnergy(idx);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#fb7185', '#f59e0b', '#a855f7'],
    });
  };

  return (
    <section id="funny" className="py-16 md:py-24 bg-gradient-to-b from-[#FCFAF6] via-rose-50/20 to-[#FCFAF6] border-t border-amber-900/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/80 px-3.5 py-1 text-xs font-semibold text-rose-800 border border-rose-200">
            <span>🎉 Cute, Funny & Iconic Vibe</span>
          </div>
          <h2 className="font-serif-display mt-3 text-3xl sm:text-4xl font-normal text-stone-900">
            The Official {auntName} Hall of Fame
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Sunflowers are lovely, but let's be honest: {auntName}'s sense of humor, spicy wit, and legendary fun energy deserve their own golden trophies!
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl select-none" role="img" aria-label={award.title}>
                    {award.badge}
                  </span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900 border border-amber-200/60">
                    Official Honor
                  </span>
                </div>

                <h3 className="font-serif-display mt-3 text-lg font-medium text-stone-900 group-hover:text-amber-800 transition-colors">
                  {award.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-body">
                  "{award.funnyDescription}"
                </p>

                <div className="mt-3 rounded-lg bg-stone-50 p-2 text-[11px] text-stone-500 italic border border-stone-100">
                  ⚡ Perk: {award.perk}
                </div>
              </div>

              {/* Vote / Cheer button */}
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-stone-100">
                <span className="text-xs text-stone-400 tabular-nums">
                  {award.votes} Family Endorsements
                </span>
                <button
                  onClick={() => handleVote(award.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 px-3 py-1 text-xs font-semibold text-amber-900 transition-all"
                  title="Vote for this superpower"
                >
                  <PartyPopper className="h-3 w-3 text-amber-700" />
                  <span>Cheer! 👏</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Funny Roast-O-Matic Box */}
        <div className="mt-16 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/90 via-white to-rose-50/50 p-8 shadow-sm text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Laugh className="h-4 w-4 text-amber-600" />
            <span>The Auntie Truth & Roast Machine 😂</span>
          </div>

          <h3 className="font-serif-display mt-2 text-2xl font-normal text-stone-900">
            Certified Facts About {auntName}
          </h3>

          <div className="mt-6 rounded-2xl bg-white border border-amber-100 p-6 shadow-xs">
            <blockquote className="font-serif-display text-xl sm:text-2xl text-stone-900 italic leading-relaxed">
              "{FUNNY_ROASTS[roastIndex]}"
            </blockquote>
            <p className="mt-3 font-handwriting text-xl text-rose-700">
              — Verified by the entire family with 100% accuracy 💅
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleNextRoast}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-all shadow-xs"
            >
              <Sparkles className="h-4 w-4" />
              <span>Hit Me With Another One! 🤣</span>
            </button>
          </div>
        </div>

        {/* Interactive "Which Addii Energy Are You Channeling?" */}
        <div className="mt-14 max-w-3xl mx-auto text-center">
          <h3 className="font-serif-display text-xl font-normal text-stone-900">
            Which {auntName} Vibe Are You Running Today?
          </h3>
          <p className="text-xs text-stone-500 mt-1">Tap a card to claim your mood for the birthday party!</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ADDI_ENERGIES.map((energy, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectEnergy(idx)}
                className={`flex flex-col items-center rounded-2xl p-4 text-center border transition-all ${
                  selectedEnergy === idx
                    ? 'border-amber-500 bg-amber-100/80 shadow-md scale-105'
                    : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                <span className="text-3xl select-none">{energy.icon}</span>
                <span className="mt-2 text-xs font-semibold text-stone-900 leading-snug">
                  {energy.label}
                </span>
              </button>
            ))}
          </div>

          {selectedEnergy !== null && (
            <div className="mt-4 rounded-xl bg-amber-100/70 border border-amber-300 p-3 text-xs text-amber-950 max-w-md mx-auto animate-fade-in font-medium">
              ✨ <strong>Mood Activated:</strong> {ADDI_ENERGIES[selectedEnergy].desc}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

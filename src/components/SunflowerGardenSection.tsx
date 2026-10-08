import { useState } from 'react';
import { Sun, Heart, Plus, Sparkles, Smile, Compass, Coffee, Shield, Check } from 'lucide-react';
import { Reason } from '../types';
import { soundSynth } from '../utils/audio';

const INITIAL_REASONS: Reason[] = [
  {
    id: '1',
    title: 'Radiant Warmth',
    description: 'Walking into your presence feels like stepping into a sunlit meadow. You never fail to make everyone feel welcomed and loved.',
    iconName: 'sun',
    bloomed: true,
  },
  {
    id: '2',
    title: 'The Gentlest Heart',
    description: 'You listen without judgment, offering warm reassurance, gentle wisdom, and hugs that heal the longest days.',
    iconName: 'heart',
    bloomed: true,
  },
  {
    id: '3',
    title: 'Infectious Laughter',
    description: 'Your joy is genuine and infectious! Every gathering turns into a treasured memory whenever your laugh rings through the room.',
    iconName: 'smile',
    bloomed: false,
  },
  {
    id: '4',
    title: 'Quiet Resilience',
    description: 'Like a sunflower that turns faithfully toward the light through rain and wind, your strength and grace inspire our entire family.',
    iconName: 'shield',
    bloomed: false,
  },
  {
    id: '5',
    title: 'Comfort & Cozy Moments',
    description: 'You make the simplest moments feel special—a cup of tea, a good story, a warm blanket, and thoughtful little surprises.',
    iconName: 'coffee',
    bloomed: false,
  },
  {
    id: '6',
    title: 'Our Greatest Cheerleader',
    description: 'You celebrate our small wins as if they were giant milestones. Knowing you are proud of us gives us courage every day.',
    iconName: 'sparkles',
    bloomed: false,
  },
];

interface SunflowerGardenSectionProps {
  auntName: string;
}

export function SunflowerGardenSection({ auntName }: SunflowerGardenSectionProps) {
  const [reasons, setReasons] = useState<Reason[]>(INITIAL_REASONS);
  const [selectedReason, setSelectedReason] = useState<Reason | null>(INITIAL_REASONS[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const toggleBloom = (reason: Reason) => {
    soundSynth.playSparkle();
    setReasons((prev) =>
      prev.map((r) => (r.id === reason.id ? { ...r, bloomed: true } : r))
    );
    setSelectedReason(reason);
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    soundSynth.playSparkle();
    const newFlower: Reason = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      iconName: 'heart',
      bloomed: true,
    };

    setReasons((prev) => [...prev, newFlower]);
    setSelectedReason(newFlower);
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const bloomedCount = reasons.filter((r) => r.bloomed).length;

  return (
    <section id="garden" className="relative py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
          Interactive Garden of Love
        </p>
        <h2 className="font-serif-display mt-2 text-3xl sm:text-4xl font-normal text-stone-900">
          Blooms of Gratitude for {auntName}
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Each sunflower in this field holds a special reason why you are so deeply cherished.
          Tap a sunflower to watch it blossom and reveal its heartfelt message.
        </p>

        {/* Garden progress metric */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-stone-500">
          <span className="font-semibold text-amber-800 tabular-nums">
            {bloomedCount} of {reasons.length}
          </span>
          <span>sunflowers in full bloom</span>
        </div>
      </div>

      {/* Grid of Sunflowers */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {reasons.map((reason, index) => {
          const isSelected = selectedReason?.id === reason.id;
          return (
            <button
              key={reason.id}
              onClick={() => toggleBloom(reason)}
              className={`group relative flex flex-col items-center rounded-2xl p-4 text-center transition-all duration-300 focus:outline-hidden ${
                isSelected
                  ? 'bg-amber-100/90 ring-2 ring-amber-500 shadow-md scale-105'
                  : reason.bloomed
                  ? 'bg-white/80 hover:bg-amber-50/70 border border-amber-200/60 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 border border-dashed border-amber-300/60'
              }`}
            >
              {/* Sunflower Graphic */}
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center">
                {/* Petals Ring */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${
                    reason.bloomed
                      ? 'scale-100 rotate-0 group-hover:rotate-45'
                      : 'scale-75 opacity-60 rotate-12'
                  }`}
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    {/* 12 Petals around center */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <ellipse
                        key={i}
                        cx="50"
                        cy="16"
                        rx="7"
                        ry="16"
                        transform={`rotate(${i * 30} 50 50)`}
                        className={
                          reason.bloomed
                            ? 'fill-amber-400 group-hover:fill-amber-300 transition-colors'
                            : 'fill-amber-200/80'
                        }
                      />
                    ))}
                    {/* Flower Core Seed Head */}
                    <circle
                      cx="50"
                      cy="50"
                      r="19"
                      className={reason.bloomed ? 'fill-amber-900' : 'fill-stone-600'}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="14"
                      className={reason.bloomed ? 'fill-[#45220a]' : 'fill-stone-700'}
                    />
                  </svg>
                </div>

                {/* Inner Icon or Check */}
                <div className="relative z-10 text-amber-100">
                  {reason.bloomed ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-mono text-amber-200">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Title & State */}
              <h3 className="mt-3 font-serif-display text-sm font-medium text-stone-900 leading-snug line-clamp-1">
                {reason.title}
              </h3>
              <span className="mt-1 text-[11px] text-stone-500">
                {reason.bloomed ? 'Bloomed 🌻' : 'Tap to Bloom'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Flower Card Showcase */}
      {selectedReason && (
        <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-amber-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-amber-800">
                  Reason We Adore You
                </p>
                <h4 className="font-serif-display text-xl sm:text-2xl font-medium text-stone-900">
                  {selectedReason.title}
                </h4>
              </div>
            </div>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 border border-amber-200/80">
              Golden Petal
            </span>
          </div>

          <p className="mt-4 text-stone-700 text-base leading-relaxed font-sans-body">
            "{selectedReason.description}"
          </p>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-amber-100 text-xs text-stone-500">
            <span>Always in our hearts</span>
            <span className="font-handwriting text-lg text-amber-800">For {auntName}</span>
          </div>
        </div>
      )}

      {/* "Plant a New Flower" CTA */}
      <div className="mt-8 text-center">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100 px-4 py-2.5 text-xs font-semibold text-amber-900 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Plant Another Reason for Auntie</span>
          </button>
        ) : (
          <form
            onSubmit={handleAddReason}
            className="mx-auto max-w-md rounded-2xl border border-amber-300 bg-white p-5 shadow-sm text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <h4 className="text-sm font-semibold text-stone-900">Plant a New Sunflower Bloom</h4>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700">Trait or Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Queen of Homemade Pies / Warmest Hugs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">What makes this special?</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. You always remember what everyone loves and make us feel like royalty..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-amber-500 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400 transition-colors"
              >
                Bloom in Garden 🌻
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

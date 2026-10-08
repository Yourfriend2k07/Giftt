import { useState } from 'react';
import { Camera, Plus, ZoomIn, X, Heart, Calendar } from 'lucide-react';
import { MemoryItem } from '../types';
import { soundSynth } from '../utils/audio';

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: '1',
    title: 'A Fresh Bloom for You',
    date: 'Special Edition',
    caption: 'Gathered with tender thoughts, like a freshly cut field of bright blooms on a crisp sunny morning.',
    imageUrl: '/src/assets/images/sunflower_bouquet_1791483260566.jpg',
    rotation: -2,
  },
  {
    id: '2',
    title: 'Fields of Endless Light',
    date: 'Golden Horizons',
    caption: 'Just as thousands of golden petals follow the evening sunset, our thoughts always carry warmth toward you.',
    imageUrl: '/src/assets/images/sunflower_field_sunset_1791483278004.jpg',
    rotation: 3,
  },
  {
    id: '3',
    title: 'Sweet Honey & Vintage Notes',
    date: 'Cherished Moments',
    caption: 'A cup of tea, a jar of honey, and handwritten wishes full of gratitude for everything you have taught us.',
    imageUrl: '/src/assets/images/sunflower_gift_card_1791483289921.jpg',
    rotation: -1.5,
  },
];

interface MemoryWallSectionProps {
  auntName: string;
}

export function MemoryWallSection({ auntName }: MemoryWallSectionProps) {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [activeModalMemory, setActiveModalMemory] = useState<MemoryItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleOpenPhoto = (item: MemoryItem) => {
    soundSynth.playSparkle();
    setActiveModalMemory(item);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    soundSynth.playSparkle();
    const item: MemoryItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      date: 'Today',
      caption: newCaption.trim(),
      imageUrl: newImage.trim() || '/src/assets/images/sunflower_bouquet_1791483260566.jpg',
      rotation: (Math.random() - 0.5) * 4,
    };

    setMemories([item, ...memories]);
    setNewTitle('');
    setNewCaption('');
    setNewImage('');
    setIsAdding(false);
  };

  return (
    <section id="memories" className="py-16 md:py-24 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-amber-900/10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
              Visual Keepsake Wall
            </p>
            <h2 className="font-serif-display mt-2 text-3xl sm:text-4xl font-normal text-stone-900">
              Golden Moments & Keepsakes
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Polaroids and snapshot memories celebrating the brightness {auntName} sprinkles everywhere.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 px-4 py-2.5 text-xs font-semibold text-stone-950 transition-colors shadow-xs"
          >
            <Camera className="h-4 w-4" />
            <span>{isAdding ? 'Close Form' : 'Pin a Memory'}</span>
          </button>
        </div>

        {/* Add Memory Drawer */}
        {isAdding && (
          <form
            onSubmit={handleAddMemory}
            className="mt-6 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm max-w-lg mx-auto text-left"
          >
            <h3 className="text-sm font-semibold text-stone-900">Pin a Snapshot to Auntie's Board</h3>
            <p className="text-xs text-stone-500 mt-0.5">Add a title, caption, and optional image link.</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700">Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Garden Laughs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">Caption / Heartfelt Line</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. That afternoon when we couldn't stop laughing at the kitchen table..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="Leave empty to use warm sunflower still life"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-amber-500 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400"
                >
                  Pin to Board 📌
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-lg border border-stone-200 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Polaroid Scrapbook Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {memories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(item)}
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="group cursor-pointer relative rounded-xl border border-stone-200/80 bg-white p-3.5 pb-6 shadow-md hover:shadow-xl hover:scale-105 hover:rotate-0 transition-all duration-300"
            >
              {/* Aesthetic masking tape at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 bg-amber-100/80 border-t border-b border-amber-300/40 opacity-80 rotate-1 shadow-xs pointer-events-none" />

              {/* Photo Area */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="h-6 w-6" />
                </div>
              </div>

              {/* Handwritten style caption area */}
              <div className="mt-4 px-1">
                <h4 className="font-serif-display text-base font-medium text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1.5 font-handwriting text-lg text-stone-700 leading-snug">
                  "{item.caption}"
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 font-sans-body">
                  <span>{item.date}</span>
                  <span className="text-amber-600">🌻 keepsake</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalMemory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalMemory(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalMemory(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors"
              aria-label="Close photo"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-xl bg-stone-100 max-h-[60vh]">
              <img
                src={activeModalMemory.imageUrl}
                alt={activeModalMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            <div className="mt-4">
              <h3 className="font-serif-display text-2xl font-medium text-stone-900">
                {activeModalMemory.title}
              </h3>
              <p className="mt-2 font-handwriting text-2xl text-amber-900">
                "{activeModalMemory.caption}"
              </p>
              <p className="mt-2 text-xs text-stone-500">
                A cherished snapshot dedicated to {auntName}.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

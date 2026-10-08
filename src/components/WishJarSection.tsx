import { useState, useEffect } from 'react';
import { Send, Heart, Sparkles, MessageCircle, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Wish } from '../types';
import { soundSynth } from '../utils/audio';

const STORAGE_KEY = 'sunflower_aunt_wishes_v2';

const INITIAL_WISHES: Wish[] = [
  {
    id: 'w1',
    author: 'Alex',
    relation: 'Favorite Niece/Nephew',
    message: 'Happy Birthday Addii! Thank you for always listening to my drama, secretly ordering late-night snacks with me, and making every family gathering 100x more fun. You are gold!',
    date: 'Today',
    likes: 14,
  },
  {
    id: 'w2',
    author: 'Eleanor',
    relation: 'Sister / Partner-in-Crime',
    message: 'To Addii: The woman, the myth, the aunt who never aged past 21! May your days be filled with flowers, zero stress, iced coffee, and all the pampering you deserve!',
    date: 'Today',
    likes: 18,
  },
  {
    id: 'w3',
    author: 'Maya & Sam',
    relation: 'Family Crew',
    message: 'Wishing the brightest, sweetest, and most hilarious birthday to Addii! Thank you for always being our favorite hype-woman and cheerleader!',
    date: 'Yesterday',
    likes: 9,
  },
];

interface WishJarSectionProps {
  auntName: string;
  senderName: string;
}

export function WishJarSection({ auntName, senderName }: WishJarSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_WISHES;
  });

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // storage full or disabled
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    soundSynth.playSparkle();

    const newWish: Wish = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Family',
      message: message.trim(),
      date: 'Just now',
      likes: 1,
    };

    setWishes([newWish, ...wishes]);
    setAuthor('');
    setRelation('');
    setMessage('');
    setIsSubmitting(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#fbbf24', '#fef08a'],
    });

    setTimeout(() => setIsSubmitting(false), 2500);
  };

  const handleLike = (id: string) => {
    soundSynth.playSparkle();
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <section id="wishes" className="py-16 md:py-24 bg-[#FCFAF6] border-t border-amber-900/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form & The Golden Jar Visual */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
                The Golden Wish Jar
              </p>
              <h2 className="font-serif-display mt-2 text-3xl font-normal text-stone-900">
                Drop a Birthday Wish for {auntName}
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Add your sweet notes, funny memories, and blessings into the glass jar. She can revisit these whenever she needs a reminder of our love.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-amber-200/80 bg-white p-6 shadow-sm space-y-4"
            >
              <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-amber-600" />
                <span>Write into the Jar</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700">Relation (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Niece / Sister"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">Your Birthday Wish</label>
                <textarea
                  required
                  rows={3}
                  placeholder={`Dear ${auntName}, wishing you a year full of sunshine, sweet health, and laughter...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 py-2.5 text-xs font-semibold text-stone-950 transition-all shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Drop into the Jar 🍯</span>
              </button>

              {isSubmitting && (
                <div className="rounded-lg bg-amber-50 p-2.5 text-center text-xs font-medium text-amber-900 border border-amber-200">
                  ✨ Your wish has been safely tucked inside the jar!
                </div>
              )}
            </form>
          </div>

          {/* Right Column: List of Heartfelt Wishes */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Messages in the Jar ({wishes.length})
              </span>
              <span className="text-xs text-amber-700 font-medium">Always saved with love</span>
            </div>

            <div className="mt-6 space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:border-amber-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                        {wish.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{wish.author}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-400">
                          <span>{wish.relation}</span>
                          <span aria-hidden="true">·</span>
                          <span>{wish.date}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(wish.id)}
                      className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-200 px-2.5 py-1 text-xs text-stone-600 transition-colors"
                      title="Send love"
                    >
                      <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
                      <span className="tabular-nums text-xs">{wish.likes}</span>
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-stone-700 leading-relaxed font-sans-body">
                    "{wish.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

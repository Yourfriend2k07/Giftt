import { X, Printer, Heart, Sparkles, Share2 } from 'lucide-react';
import { soundSynth } from '../utils/audio';

interface KeepsakeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  auntName: string;
  senderName: string;
  milestone: string;
}

export function KeepsakeCardModal({
  isOpen,
  onClose,
  auntName,
  senderName,
  milestone,
}: KeepsakeCardModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundSynth.playSparkle();
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full rounded-3xl bg-[#FFFDF9] p-6 sm:p-10 shadow-2xl border-4 border-amber-200/90 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          aria-label="Close card"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Card Header & Sunflower Stamp */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
            <span>🌻 Birthday Keepsake 🌻</span>
          </div>

          <h3 className="font-serif-display mt-3 text-3xl sm:text-4xl font-normal text-stone-900 leading-tight">
            Happy Birthday, Dearest {auntName}
          </h3>

          <p className="mt-1 text-xs text-amber-700 font-medium">
            {milestone || 'Forever Radiant & Cherished'}
          </p>
        </div>

        {/* Vintage Illustration Inset */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-amber-200 shadow-inner max-h-48">
          <img
            src="/src/assets/images/sunflower_gift_card_1791483289921.jpg"
            alt="Sunflower Birthday Greeting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Prose */}
        <div className="mt-6 space-y-3 px-2">
          <p className="font-serif-display text-base sm:text-lg text-stone-800 italic leading-relaxed">
            "May your days ahead be filled with gentle sunlight, fragrant blossoms, good health, and the warmth of family who love you beyond measure."
          </p>

          <p className="text-xs text-stone-600 font-sans-body leading-normal">
            Thank you for being our steady comfort, our biggest joy, and the brightest sunflower in our family garden.
          </p>

          <div className="pt-4 font-handwriting text-2xl text-amber-900 font-semibold">
            With all our love, {senderName}
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-8 flex items-center justify-center gap-3 pt-4 border-t border-amber-100">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-all shadow-xs"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save Keepsake</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

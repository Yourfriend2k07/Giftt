import { ArrowUp, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  auntName: string;
  senderName: string;
}

export function Footer({ auntName, senderName }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-900/10 bg-[#FAF7F0] py-12 text-stone-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Tribute */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl" role="img" aria-label="Sunflower">🌻</span>
              <span className="font-serif-display text-lg font-semibold text-stone-900">
                Sunflower Serenade
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500 max-w-sm">
              A bespoke digital celebration crafted with endless love for {auntName}. May this day bring you the joy you give the world.
            </p>
          </div>

          {/* Center blessing note */}
          <div className="font-handwriting text-2xl text-amber-800">
            Keep turning toward the light ✨
          </div>

          {/* Jump to top */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:border-amber-400 hover:text-amber-800 transition-colors shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <span>Handcrafted by {senderName} for {auntName}'s Birthday</span>
          <div className="flex items-center gap-1 text-stone-500">
            <span>May every day bloom bright</span>
            <span>·</span>
            <span>Happy Birthday!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

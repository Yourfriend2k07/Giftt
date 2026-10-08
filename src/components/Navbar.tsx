import { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Settings, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';
import { ThemeMode } from '../types';

interface NavbarProps {
  auntName: string;
  theme: ThemeMode;
  onSelectTheme: (t: ThemeMode) => void;
  onOpenPersonalize: () => void;
  onOpenCardModal: () => void;
}

const THEME_OPTIONS: { id: ThemeMode; label: string; icon: string }[] = [
  { id: 'sunflower', label: 'Sunflower', icon: '🌻' },
  { id: 'honeybee', label: 'Honey & Bee', icon: '🍯' },
  { id: 'blossom', label: 'Cute Blossom', icon: '🌸' },
  { id: 'cool_aunt', label: 'Cool Auntie', icon: '☕' },
];

export function Navbar({
  auntName,
  theme,
  onSelectTheme,
  onOpenPersonalize,
  onOpenCardModal,
}: NavbarProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const toggleSound = () => {
    const active = soundSynth.toggleGardenAmbiance();
    setIsPlayingAudio(active);
  };

  const triggerSunflowerBurst = () => {
    soundSynth.playSparkle();

    const colors =
      theme === 'blossom'
        ? ['#f472b6', '#fb7185', '#fbcfe8', '#f59e0b']
        : theme === 'honeybee'
        ? ['#f59e0b', '#fbbf24', '#fef08a', '#854d0e']
        : ['#f59e0b', '#fbbf24', '#d97706', '#fef08a', '#15803d', '#f43f5e'];

    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-amber-900/10 bg-[#FCFAF6]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#top"
          className="font-serif-display text-lg sm:text-xl font-semibold tracking-tight text-stone-900 hover:text-amber-700 transition-colors whitespace-nowrap"
        >
          Sunflower & Smiles
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#funny" className="hover:text-amber-700 transition-colors whitespace-nowrap text-amber-900 font-semibold flex items-center gap-1">
            <span>🏆 Hall of Fame</span>
          </a>
          <a href="#cake" className="hover:text-amber-700 transition-colors whitespace-nowrap">
            Birthday Cake
          </a>
          <a href="#garden" className="hover:text-amber-700 transition-colors whitespace-nowrap">
            Sunlit Garden
          </a>
          <a href="#lines" className="hover:text-amber-700 transition-colors whitespace-nowrap">
            Golden Lines
          </a>
          <a href="#memories" className="hover:text-amber-700 transition-colors whitespace-nowrap">
            Scrapbook
          </a>
          <a href="#wishes" className="hover:text-amber-700 transition-colors whitespace-nowrap">
            Wish Jar
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-xs hover:bg-amber-50 transition-colors"
              title="Switch website theme vibe"
            >
              <Palette className="h-3.5 w-3.5 text-amber-600" />
              <span className="hidden sm:inline">Theme:</span>
              <span>{THEME_OPTIONS.find((t) => t.id === theme)?.icon}</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl z-50 text-xs">
                <div className="px-2 py-1 text-[11px] font-semibold text-stone-400 uppercase">
                  Select Theme Vibe
                </div>
                {THEME_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTheme(item.id);
                      setShowThemeMenu(false);
                      soundSynth.playCutePop();
                    }}
                    className={`w-full flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-left transition-colors ${
                      theme === item.id
                        ? 'bg-amber-100 font-semibold text-amber-950'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggleSound}
            aria-label={isPlayingAudio ? 'Mute serene melody' : 'Play serene garden melody'}
            title={isPlayingAudio ? 'Mute melody' : 'Play acoustic garden serenade'}
            className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all ${
              isPlayingAudio
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
                <span className="hidden md:inline">Melody</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-stone-400" />
                <span className="hidden md:inline">Music</span>
              </>
            )}
          </button>

          <button
            onClick={triggerSunflowerBurst}
            className="flex items-center gap-1.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 px-3 sm:px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            title="Launch celebration confetti"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-950" />
            <span>Celebrate! 🌻</span>
          </button>

          <button
            onClick={onOpenPersonalize}
            className="rounded-full p-1.5 text-stone-500 hover:bg-amber-100/60 hover:text-amber-900 transition-colors"
            title={`Customize details for ${auntName}`}
            aria-label="Customize birthday name and details"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

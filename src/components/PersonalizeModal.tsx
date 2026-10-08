import { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { AuntProfile } from '../types';
import { soundSynth } from '../utils/audio';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AuntProfile;
  onSave: (updated: AuntProfile) => void;
}

export function PersonalizeModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: PersonalizeModalProps) {
  const [name, setName] = useState(profile.name);
  const [nickname, setNickname] = useState(profile.nickname);
  const [senderName, setSenderName] = useState(profile.senderName);
  const [milestone, setMilestone] = useState(profile.milestone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundSynth.playSparkle();

    onSave({
      name: name.trim() || 'Addii',
      nickname: nickname.trim(),
      senderName: senderName.trim() || 'Your Family',
      customNote: profile.customNote,
      milestone: milestone.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Personalize Celebration</span>
        </div>

        <h3 className="font-serif-display mt-2 text-2xl font-normal text-stone-900">
          Tailor for Your Aunt
        </h3>

        <p className="mt-1 text-xs text-stone-500">
          Update her name, your sign-off, or special milestone to make this website uniquely hers!
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700">
              Aunt's Name / Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aunt Sarah / Auntie Maria / Chachi ji"
              className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">
              From (Sender / Family)
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Alex & Maya / Your Favorite Niece"
              className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">
              Milestone / Tagline (Optional)
            </label>
            <input
              type="text"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              placeholder="e.g. Fabulous 50th / Forever Radiant"
              className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 py-2.5 text-xs font-semibold text-stone-950 transition-all shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4 text-stone-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Update Website ✨</span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs text-stone-600 hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

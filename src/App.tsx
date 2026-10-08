/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AuntAwardsAndHumor } from './components/AuntAwardsAndHumor';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { SunflowerGardenSection } from './components/SunflowerGardenSection';
import { GoodLinesSection } from './components/GoodLinesSection';
import { MemoryWallSection } from './components/MemoryWallSection';
import { WishJarSection } from './components/WishJarSection';
import { Footer } from './components/Footer';
import { PersonalizeModal } from './components/PersonalizeModal';
import { KeepsakeCardModal } from './components/KeepsakeCardModal';
import { AuntProfile, ThemeMode } from './types';

const PROFILE_STORAGE_KEY = 'sunflower_aunt_profile_v2';
const THEME_STORAGE_KEY = 'sunflower_aunt_theme_v1';

const DEFAULT_PROFILE: AuntProfile = {
  name: 'Addii',
  nickname: 'Queen Addii',
  senderName: 'Your Loving Family & Niece/Nephew',
  customNote: 'To Addii: the brightest, funniest, and most irreplaceable aunt in the whole world!',
  milestone: 'Forever 21 & Fabulous',
};

export default function App() {
  const [profile, setProfile] = useState<AuntProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['sunflower', 'honeybee', 'blossom', 'cool_aunt'].includes(savedTheme)) {
        return savedTheme as ThemeMode;
      }
    } catch {
      // ignore
    }
    return 'sunflower';
  });

  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleSaveProfile = (updated: AuntProfile) => {
    setProfile(updated);
  };

  // Background tint based on active theme
  const getThemeBgClass = () => {
    switch (theme) {
      case 'blossom':
        return 'bg-[#FFF9FA] selection:bg-pink-200 selection:text-pink-950';
      case 'honeybee':
        return 'bg-[#FFFDF5] selection:bg-amber-200 selection:text-amber-950';
      case 'cool_aunt':
        return 'bg-[#FCF9F6] selection:bg-rose-200 selection:text-rose-950';
      default:
        return 'bg-[#FCFAF6] selection:bg-amber-200 selection:text-amber-950';
    }
  };

  return (
    <div className={`relative min-h-screen text-[#292524] transition-colors duration-500 ${getThemeBgClass()}`}>
      {/* Interactive floating particles matching the active theme */}
      <PetalCanvas theme={theme} />

      {/* Top Navigation */}
      <Navbar
        auntName={profile.name}
        theme={theme}
        onSelectTheme={setTheme}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        onOpenCardModal={() => setIsCardModalOpen(true)}
      />

      {/* Main Experience */}
      <main>
        {/* Hero Section */}
        <HeroSection
          auntName={profile.name}
          senderName={profile.senderName}
          milestone={profile.milestone}
          onOpenPersonalize={() => setIsPersonalizeOpen(true)}
          onOpenCardModal={() => setIsCardModalOpen(true)}
        />

        {/* Cute & Funny Awards, Truth Machine & Mood Selector */}
        <AuntAwardsAndHumor auntName={profile.name} />

        {/* Interactive Cake with Candle Blowing and Confetti */}
        <BirthdayCakeSection auntName={profile.name} />

        {/* Interactive Blooming Garden of Reasons */}
        <SunflowerGardenSection auntName={profile.name} />

        {/* Good Lines & Poetic Quotes Section (now with Cute & Sassy filter!) */}
        <GoodLinesSection auntName={profile.name} />

        {/* Polaroid Scrapbook Memory Wall */}
        <MemoryWallSection auntName={profile.name} />

        {/* Wish Jar for Family Messages */}
        <WishJarSection
          auntName={profile.name}
          senderName={profile.senderName}
        />
      </main>

      {/* Footer */}
      <Footer auntName={profile.name} senderName={profile.senderName} />

      {/* Modals */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <KeepsakeCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        auntName={profile.name}
        senderName={profile.senderName}
        milestone={profile.milestone}
      />
    </div>
  );
}

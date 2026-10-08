export type ThemeMode = 'sunflower' | 'honeybee' | 'blossom' | 'cool_aunt';

export interface AuntAward {
  id: string;
  badge: string;
  title: string;
  funnyDescription: string;
  votes: number;
}

export interface Wish {
  id: string;
  author: string;
  relation: string;
  message: string;
  date: string;
  flowerColor?: string;
  likes: number;
}

export interface Reason {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bloomed: boolean;
}

export interface Quote {
  id: string;
  quote: string;
  author: string;
  theme: 'poetic' | 'loving' | 'joyful' | 'wisdom';
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  rotation: number;
}

export interface AuntProfile {
  name: string;
  nickname: string;
  senderName: string;
  customNote: string;
  milestone: string;
}

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  // Global primary colors
  primary: '#E8732A',
  primaryLight: '#FBD9C3', // For soft badges or highlights
  primaryDark: '#B8551B',  // For pressed states or high-contrast headers

  light: {
    text: '#1A1C1E',          // Deep charcoal for better readability than pure black
    background: '#FFFFFF',
    backgroundElement: '#F9F6F4', // A slight warmth to match the orange
    backgroundSelected: '#FDEEE5', // A very pale tint of the primary orange
    textSecondary: '#625D59',    // Muted warm grey
    border: '#E6E1DE',
    accent: '#4A6670',           // A muted slate blue/green as a complementary accent
  },
  dark: {
    text: '#F5F5F5',
    background: '#121110',       // "Off-black" with a hint of warmth
    backgroundElement: '#1E1C1B', // Slightly lifted surface
    backgroundSelected: '#332821', // Dark brownish-orange for selections
    textSecondary: '#A39E99',    // Warm silver
    border: '#2E2B29',
    accent: '#8AA3AD',           // Softer version of the slate accent
  },
} as const;

// export const Colors = {
//   light: {
//     text: '#000000',
//     background: '#ffffff',
//     backgroundElement: '#F0F0F3',
//     backgroundSelected: '#E0E1E6',
//     textSecondary: '#60646C',
//   },
//   dark: {
//     text: '#ffffff',
//     background: '#000000',
//     backgroundElement: '#212225',
//     backgroundSelected: '#2E3135',
//     textSecondary: '#B0B4BA',
//   },
// } as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

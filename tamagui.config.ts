import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { radius, size, space, themes, zIndex } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

const tokens = createTokens({
  color: {
    primaryDark: '#151718',
    primaryLight: '#242526',
    secondary: '#FFFFFF',
    accentMain: '#8A4BF9',
    accentDark: '#6D30DC',
    accentDarker: '#4B0EB7',
    accentWashedOut: '#9F6EF4',
    textMain: '#FFFFFF',
    textWashedOut: '#5E5E60',
    buttonTextActive: '#0C0C0C',
    buttonTextDisabled: '#929597',
    buttonActive: '#F8FBFC',
    buttonInactive: '#1D1F20',
    buttonBorder: '#212627',
    background: '#151718',
    orange: '#F36E1D',
    buttonAccent: '#A372F8',
  },
  space,
  size,
  radius,
  zIndex,
});

const headingFont = createInterFont();

const bodyFont = createInterFont();

const config = createTamagui({
  light: {
    color: {
      background: 'gray',
      text: 'black',
    },
  },
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont as any,
    heading: headingFont as any,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;

import { StyleSheet } from 'react-native';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type PossibleStyles = ViewStyle | TextStyle | ImageStyle;

export type Breakpoints = 'sm' | 'md' | 'lg';

type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'web';

export type PossibleQuery = {
  breakpoint?: Breakpoints;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  minAspectRatio?: number;
  maxAspectRatio?: number;
  minPixelRatio?: number;
  maxPixelRatio?: number;
  minFontScale?: number;
  maxFontScale?: number;
  orientation?: 'landscape' | 'portrait';
  platform?: Platform | Platform[];
};

export type PossibleQueryStyles = Breakpoints | PossibleQuery;

export type ExtendedPossibleStyles = PossibleStyles & {
  mediaQueries?: (PossibleStyles & { query: PossibleQueryStyles })[];
};

export type ExtendedNamedStyles<T> = {
  [P in keyof T]: ExtendedPossibleStyles;
};

export default {
  ...StyleSheet,
  create<T extends ExtendedNamedStyles<T> | ExtendedNamedStyles<any>>(
    obj: T & ExtendedNamedStyles<any>
  ) {
    return StyleSheet.create(obj);
  },
};

import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type PossibleStyles = ViewStyle | TextStyle | ImageStyle;

export type Breakpoints = "sm" | "md" | "lg";

export type PossibleQuery =
  | Breakpoints
  | {
      breakpoint?: Breakpoints;
      minWidth?: number;
      maxWidth?: number;
      minHeight?: number;
      maxHeight?: number;
      minAspectRatio?: number;
      maxAspectRatio?: number;
      minPixelRatio?: number;
      maxPixelRatio?: number;
      orientation?: "landscape" | "portrait";
      platform?: "ios" | "android" | "macos" | "windows" | "web";
    };

export type ExtendedPossibleStyles = PossibleStyles & {
  mediaQueries?: (PossibleStyles & { query: PossibleQuery })[];
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

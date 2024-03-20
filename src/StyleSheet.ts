import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type PossibleStyles = ViewStyle | TextStyle | ImageStyle;

type Breakpoints = "sm" | "md" | "lg";

export type PossibleQuery =
  | Breakpoints
  | {
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
      otherCondition?: boolean;
    };

export type ExtendedPossibleStyles = PossibleStyles & {
  mediaQueries?: (PossibleStyles & { query: PossibleQuery })[];
};

export type ExtendedNamedStyles<T> = {
  [P in keyof T]: ExtendedPossibleStyles;
};

export default {
  create<T extends ExtendedNamedStyles<T>>(obj: T) {
    return StyleSheet.create(obj);
  },
};

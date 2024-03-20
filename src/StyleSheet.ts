import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type PossibleStyles = ViewStyle | TextStyle | ImageStyle;

type PossibleQueries = string;

type NamedStyles<T> = {
  [P in keyof T]: PossibleStyles & {
    mediaQueries: (PossibleStyles & { query: PossibleQueries })[];
  };
};

export default {
  create<T extends NamedStyles<T>>(obj: T) {
    return StyleSheet.create(obj);
  },
};

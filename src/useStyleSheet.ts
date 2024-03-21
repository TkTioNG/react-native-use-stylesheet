import { useContext, useMemo } from "react";
import { PixelRatio, Platform, useWindowDimensions } from "react-native";
import { Breakpoints, ExtendedNamedStyles, PossibleQuery } from "./StyleSheet";
import MediaQueryContext, {
  MediaQueryConfig,
  defaultMediaQueryConfig,
} from "./MediaQueryContext";

const isInInterval = (value: number, min?: number, max?: number) =>
  (min === undefined || value >= min) && (max === undefined || value <= max);

const checkBreakpoint = (
  width: number,
  query?: Breakpoints,
  mediaQueryContext?: Readonly<MediaQueryConfig>
) => {
  if (query === undefined) {
    return true;
  }
  const { breakpoint }: MediaQueryConfig = {
    ...defaultMediaQueryConfig,
    ...mediaQueryContext,
  };
  if (query === "sm" && width >= breakpoint.sm) {
    return true;
  } else if (query === "md" && width >= breakpoint.md) {
    return true;
  } else if (query === "lg" && width >= breakpoint.lg) {
    return true;
  }
  return false;
};

const matchMediaQuery = (
  query: PossibleQuery,
  width: number,
  height: number,
  mediaQueryContext?: Readonly<MediaQueryConfig>
) => {
  if (!query) {
    return false;
  }

  if (typeof query === "string") {
    return checkBreakpoint(width, query, mediaQueryContext);
  }

  const {
    breakpoint,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    minAspectRatio,
    maxAspectRatio,
    minPixelRatio,
    maxPixelRatio,
    orientation,
    platform,
  } = query;
  const currentOrientation = width > height ? "landscape" : "portrait";

  return (
    checkBreakpoint(width, breakpoint, mediaQueryContext) &&
    isInInterval(width, minWidth, maxWidth) &&
    isInInterval(height, minHeight, maxHeight) &&
    isInInterval(width / height, minAspectRatio, maxAspectRatio) &&
    isInInterval(PixelRatio.get(), minPixelRatio, maxPixelRatio) &&
    (orientation === undefined || orientation === currentOrientation) &&
    (platform === undefined || platform === Platform.OS)
  );
};

const getStylesheet = <
  T extends ExtendedNamedStyles<T> | ExtendedNamedStyles<any>
>(
  styles: T,
  { width, height }: { width: number; height: number },
  mediaQueryContext?: Readonly<MediaQueryConfig>
): T => {
  return Object.fromEntries(
    Object.entries(styles).map(([styleKey, styleValue]) => {
      const { mediaQueries, ...style } = styleValue;
      const mergedStyle = [style];

      if (mediaQueries?.length) {
        mediaQueries.forEach((mediaQuery) => {
          const { query, ...queryStyle } = mediaQuery;
          if (matchMediaQuery(query, width, height, mediaQueryContext)) {
            mergedStyle.push(queryStyle);
          }
        });
      }
      return [
        styleKey,
        mergedStyle.reduce((acc, cur) => Object.assign(acc, cur), {}),
      ];
    })
  ) as T;
};

export default function useStylesheet<T>(
  styles: ExtendedNamedStyles<T> | ExtendedNamedStyles<any>
) {
  const dimensions = useWindowDimensions();
  const mediaQueryContext = useContext(MediaQueryContext);

  return useMemo(
    () => getStylesheet(styles, dimensions, mediaQueryContext),
    [dimensions, styles]
  );
}

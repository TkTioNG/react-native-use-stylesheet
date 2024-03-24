import { useContext, useMemo } from 'react';
import { Platform, useWindowDimensions, type ScaledSize } from 'react-native';
import type {
  Breakpoints,
  ExtendedNamedStyles,
  PossibleQueryStyles,
} from './StyleSheet';
import MediaQueryContext, {
  defaultMediaQueryConfig,
  type MediaQueryConfig,
} from './MediaQueryContext';

const isInInterval = (value: number, min?: number, max?: number) =>
  (min === undefined || value >= min) && (max === undefined || value <= max);

const checkBreakpoint = (
  width: number,
  query?: Breakpoints,
  mediaQueryContext?: Partial<Readonly<MediaQueryConfig>>
) => {
  if (query === undefined) {
    return true;
  }
  const { breakpoint } = {
    ...defaultMediaQueryConfig,
    ...mediaQueryContext,
  };
  if (query === 'sm' && width >= breakpoint.sm) {
    return true;
  } else if (query === 'md' && width >= breakpoint.md) {
    return true;
  } else if (query === 'lg' && width >= breakpoint.lg) {
    return true;
  }
  return false;
};

export const matchMediaQuery = (
  query: PossibleQueryStyles,
  dimensions: ScaledSize,
  mediaQueryContext?: Partial<Readonly<MediaQueryConfig>>
) => {
  if (!query) {
    return false;
  }

  const { width, height, scale, fontScale } = dimensions;

  if (typeof query === 'string') {
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
    minFontScale,
    maxFontScale,
    orientation,
    platform,
  } = query;
  const currentOrientation = width > height ? 'landscape' : 'portrait';

  return (
    checkBreakpoint(width, breakpoint, mediaQueryContext) &&
    isInInterval(width, minWidth, maxWidth) &&
    isInInterval(height, minHeight, maxHeight) &&
    isInInterval(width / height, minAspectRatio, maxAspectRatio) &&
    isInInterval(scale, minPixelRatio, maxPixelRatio) &&
    isInInterval(fontScale, minFontScale, maxFontScale) &&
    (orientation === undefined || orientation === currentOrientation) &&
    (platform === undefined || platform === Platform.OS)
  );
};

const getStylesheet = <
  T extends ExtendedNamedStyles<T> | ExtendedNamedStyles<any>,
>(
  styles: T,
  dimensions: ScaledSize,
  mediaQueryContext?: Partial<Readonly<MediaQueryConfig>>
): T => {
  return Object.fromEntries(
    Object.entries(styles).map(([styleKey, styleValue]) => {
      const { mediaQueries, ...style } = styleValue;
      const mergedStyle = [style];

      if (mediaQueries?.length) {
        mediaQueries.forEach((mediaQuery) => {
          const { query, ...queryStyle } = mediaQuery;
          if (matchMediaQuery(query, dimensions, mediaQueryContext)) {
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

export default function useStyleSheet<T>(
  styles: ExtendedNamedStyles<T> | ExtendedNamedStyles<any>
) {
  const dimensions = useWindowDimensions();
  const mediaQueryContext = useContext(MediaQueryContext);

  return useMemo(
    () => getStylesheet(styles, dimensions, mediaQueryContext),
    [dimensions, styles, mediaQueryContext]
  );
}

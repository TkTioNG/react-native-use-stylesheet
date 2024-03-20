import { useContext, useMemo } from "react";
import { PixelRatio, Platform, useWindowDimensions } from "react-native";
import { MediaQueryContext } from "../contexts";

export const isInInterval = (value, min, max) =>
  (min === undefined || value >= min) && (max === undefined || value <= max);

export const matchMediaQuery = (query, width, height) => {
  if (!query) {
    return false;
  }

  if (typeof query === "string") {
    if (query === "sm" && width > 400) {
      return true;
    } else if (query === "md" && width > 600) {
      return true;
    } else if (query === "lg" && width > 800) {
      return true;
    }
    return false;
  }

  const {
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
    otherCondition,
  } = query;
  const currentOrientation = width > height ? "landscape" : "portrait";

  return (
    isInInterval(width, minWidth, maxWidth) &&
    isInInterval(height, minHeight, maxHeight) &&
    isInInterval(width / height, minAspectRatio, maxAspectRatio) &&
    isInInterval(PixelRatio.get(), minPixelRatio, maxPixelRatio) &&
    (orientation === undefined || orientation === currentOrientation) &&
    (platform === undefined || platform === Platform.OS) &&
    (otherCondition === undefined || otherCondition)
  );
};

export const getStylesheet = ({ width, height }, styles) => {
  const allStyles = {};
  Object.keys(styles).forEach((styleKey) => {
    const { mediaQueries, ...style } = styles[styleKey];
    const mergedStyle = [style];

    if (mediaQueries?.length) {
      mediaQueries.forEach((mediaQuery) => {
        const { query, ...queryStyle } = mediaQuery;
        if (matchMediaQuery(query, width, height)) {
          mergedStyle.push(queryStyle);
        }
      });
    }
    allStyles[styleKey] = mergedStyle.reduce(
      (acc, cur) => Object.assign(acc, cur),
      {}
    );
  });

  return allStyles;
};

export default function useStylesheet(styles) {
  const dimensions = useWindowDimensions();
  const mediaQueryContext = useContext(MediaQueryContext);
  console.log(mediaQueryContext);

  return useMemo(() => getStylesheet(dimensions, styles), [dimensions, styles]);
}

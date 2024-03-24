import type React from 'react';
import { memo, useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import type { PossibleQuery } from './StyleSheet';
import MediaQueryContext from './MediaQueryContext';
import { matchMediaQuery } from './useStyleSheet';

const MediaQueryComponent: React.FC<
  PossibleQuery & { children: React.ReactNode; fallback?: React.ReactNode }
> = ({ children, fallback, ...props }) => {
  const dimensions = useWindowDimensions();
  const mediaQueryContext = useContext(MediaQueryContext);

  if (matchMediaQuery(props, dimensions, mediaQueryContext)) {
    return children;
  }

  return fallback;
};

export default memo(MediaQueryComponent);

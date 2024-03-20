import { createContext } from "react";

export type MediaQueryConfig = {
  breakpoint: {
    sm: number;
    md: number;
    lg: number;
  };
};

export const defaultMediaQueryConfig: Readonly<MediaQueryConfig> =
  Object.freeze({
    breakpoint: {
      sm: 400,
      md: 600,
      lg: 800,
    },
  });

const MediaQueryContext = createContext(defaultMediaQueryConfig);

export default MediaQueryContext;

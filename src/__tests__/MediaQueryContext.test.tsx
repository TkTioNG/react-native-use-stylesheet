import type { ReactNode } from 'react';
import { MediaQueryContext, StyleSheet, useStyleSheet } from '..';
import {
  type MediaQueryConfig,
  defaultMediaQueryConfig,
} from '../MediaQueryContext';
import { renderHook } from '@testing-library/react-native';
import ReactNative from 'react-native';

describe('MediaQueryContext', () => {
  it('should be configured properly', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MediaQueryContext.Provider value={defaultMediaQueryConfig}>
        {children}
      </MediaQueryContext.Provider>
    );

    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: 'sm', color: 'red' },
          { query: 'md', color: 'blue' },
          { query: 'lg', color: 'green' },
        ],
      },
    });

    // default
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 300,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles), { wrapper });
    expect(result.current).toStrictEqual(expected);

    // sm - 400
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 400,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles), { wrapper }));
    expect(result.current).toStrictEqual(expected);

    // md - 600
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 600,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles), { wrapper }));
    expect(result.current).toStrictEqual(expected);

    // lg - 800
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 800,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'green',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles), { wrapper }));
    expect(result.current).toStrictEqual(expected);
  });

  it('should allow override', () => {
    const newMediaQueryConfig: MediaQueryConfig = {
      breakpoint: {
        sm: 300,
        md: 400,
        lg: 600,
      },
    };
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MediaQueryContext.Provider value={newMediaQueryConfig}>
        {children}
      </MediaQueryContext.Provider>
    );

    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: 'sm', color: 'red' },
          { query: 'md', color: 'blue' },
          { query: 'lg', color: 'green' },
        ],
      },
    });

    // default
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 200,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles), { wrapper });
    expect(result.current).toStrictEqual(expected);

    // new sm - 300
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 300,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles), { wrapper }));
    expect(result.current).toStrictEqual(expected);

    // new md - 400
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 400,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles), { wrapper }));
    expect(result.current).toStrictEqual(expected);

    // new lg - 600
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 600,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'green',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles), { wrapper }));
    expect(result.current).toStrictEqual(expected);
  });
});

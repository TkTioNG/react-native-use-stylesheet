import { renderHook } from '@testing-library/react-native';
import { useStyleSheet } from '..';
import StyleSheet from '../StyleSheet';
import ReactNative, { Platform } from 'react-native';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useStyleSheet', () => {
  it('should return correct styles', () => {
    const styles = StyleSheet.create({
      style1: { flexDirection: 'column' },
    });
    const { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(styles);
  });

  it('should merge media query style', () => {
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 2,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    const styles = StyleSheet.create({
      style1: {
        flexDirection: 'column',
        mediaQueries: [{ query: 'md', flexDirection: 'row' }],
      },
      style2: {
        color: '#000000',
        mediaQueries: [{ query: { minAspectRatio: 2 }, color: '#ffffff' }],
      },
    });
    const expected = {
      style1: {
        flexDirection: 'column',
      },
      style2: {
        color: '#ffffff',
      },
    };
    const { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept breakpoint shorthand query correctly', () => {
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

    // xs
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 100,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept breakpoint 'longhand' query", () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { breakpoint: 'sm' }, color: 'red' },
          { query: { breakpoint: 'md' }, color: 'blue' },
          { query: { breakpoint: 'lg' }, color: 'green' },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 100,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept min max width query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { minWidth: 400 }, color: 'red' },
          { query: { minWidth: 500, maxWidth: 600 }, color: 'blue' },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 100,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
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
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 800,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept min max height query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { minHeight: 400 }, color: 'red' },
          { query: { minHeight: 500, maxHeight: 600 }, color: 'blue' },
        ],
      },
    });

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 100,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 400,
      height: 400,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 600,
      height: 600,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 800,
      height: 800,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept min max aspect ratio query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { minAspectRatio: 1 }, color: 'red' },
          { query: { minAspectRatio: 1.5, maxAspectRatio: 2 }, color: 'blue' },
        ],
      },
    });

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 100,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 150,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 201,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept min max pixel ratio query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { minPixelRatio: 1.5 }, color: 'red' },
          { query: { minPixelRatio: 2, maxPixelRatio: 2.5 }, color: 'blue' },
        ],
      },
    });

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1.5,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 2,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 3,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept min max font scale query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { minFontScale: 1.5 }, color: 'red' },
          { query: { minFontScale: 2, maxFontScale: 2.5 }, color: 'blue' },
        ],
      },
    });

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'white',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 100,
      height: 100,
      scale: 1,
      fontScale: 1.5,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 150,
      height: 100,
      scale: 1,
      fontScale: 2,
    }));
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 201,
      height: 100,
      scale: 1,
      fontScale: 3,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept orientation query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { orientation: 'landscape' }, color: 'red' },
          { query: { orientation: 'portrait' }, color: 'blue' },
        ],
      },
    });

    // portrait
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: 'blue',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // landscape
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 200,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: 'red',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept platform query correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { platform: 'ios' }, color: 'red' },
          { query: { platform: 'android' }, color: 'blue' },
          { query: { platform: 'web' }, color: 'green' },
        ],
      },
    });

    // ios
    Platform.OS = 'ios';
    let expected = {
      style1: {
        color: 'red',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // android
    Platform.OS = 'android';
    expected = {
      style1: {
        color: 'blue',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // web
    Platform.OS = 'web';
    expected = {
      style1: {
        color: 'green',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should accept platform query as an array correctly', () => {
    const styles = StyleSheet.create({
      style1: {
        color: 'white',
        mediaQueries: [
          { query: { platform: ['ios', 'android'] }, color: 'red' },
        ],
      },
    });

    // ios
    Platform.OS = 'ios';
    let expected = {
      style1: {
        color: 'red',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // android
    Platform.OS = 'android';
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // web
    Platform.OS = 'web';
    expected = {
      style1: {
        color: 'white',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it('should chain all queries together', () => {
    const styles = StyleSheet.create({
      style1: {
        flexDirection: 'column',
        mediaQueries: [
          {
            query: {
              breakpoint: 'md',
              minHeight: 300,
              orientation: 'landscape',
              minPixelRatio: 2,
            },
            flexDirection: 'row',
          },
        ],
      },
    });

    // Not match
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 600,
      height: 600,
      scale: 1.5,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        flexDirection: 'column',
      },
    };
    let { result } = renderHook(() => useStyleSheet(styles));
    expect(result.current).toStrictEqual(expected);

    // Fully match
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 600,
      height: 300,
      scale: 2,
      fontScale: 1,
    }));
    expected = {
      style1: {
        flexDirection: 'row',
      },
    };
    ({ result } = renderHook(() => useStyleSheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });
});

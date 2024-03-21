import { renderHook } from "@testing-library/react-native";
import useStylesheet from "../useStyleSheet";
import StyleSheet from "../StyleSheet";
// import { Dimensions } from "react-native";
import ReactNative, { Platform } from "react-native";

describe("useStyleSheet", () => {
  it("should return correct styles", () => {
    const styles = StyleSheet.create({
      style1: { flexDirection: "column" },
    });
    const { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(styles);
  });

  it("should merge media query style", () => {
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 2,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    const styles = StyleSheet.create({
      style1: {
        flexDirection: "column",
        mediaQueries: [{ query: "md", flexDirection: "row" }],
      },
      style2: {
        color: "#000000",
        mediaQueries: [{ query: { minAspectRatio: 2 }, color: "#ffffff" }],
      },
    });
    const expected = {
      style1: {
        flexDirection: "column",
      },
      style2: {
        color: "#ffffff",
      },
    };
    const { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept breakpoint shorthand query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: "sm", color: "red" },
          { query: "md", color: "blue" },
          { query: "lg", color: "green" },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 100,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: "white",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 400,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 600,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 800,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "green",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept breakpoint 'longhand' query", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { breakpoint: "sm" }, color: "red" },
          { query: { breakpoint: "md" }, color: "blue" },
          { query: { breakpoint: "lg" }, color: "green" },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 100,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: "white",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 400,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 600,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 800,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "green",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept min max width query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { minWidth: 400 }, color: "red" },
          { query: { minWidth: 500, maxWidth: 600 }, color: "blue" },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 100,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: "white",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 400,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 600,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 800,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept min max height query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { minHeight: 400 }, color: "red" },
          { query: { minHeight: 500, maxHeight: 600 }, color: "blue" },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 100,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: "white",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 400,
      height: 400,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 600,
      height: 600,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 800,
      height: 800,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept min max aspect ratio query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { minAspectRatio: 1 }, color: "red" },
          { query: { minAspectRatio: 1.5, maxAspectRatio: 2 }, color: "blue" },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: "white",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 100,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 150,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 201,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept min max pixel ratio query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { minPixelRatio: 1 }, color: "red" },
          { query: { minPixelRatio: 1.5, maxPixelRatio: 2 }, color: "blue" },
        ],
      },
    });

    // xs
    jest.spyOn(ReactNative.PixelRatio, "get").mockImplementation(() => 0.5);
    let expected = {
      style1: {
        color: "white",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // sm
    jest.spyOn(ReactNative.PixelRatio, "get").mockImplementation(() => 1);
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // md
    jest.spyOn(ReactNative.PixelRatio, "get").mockImplementation(() => 1.5);
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // lg
    jest.spyOn(ReactNative.PixelRatio, "get").mockImplementation(() => 2.5);
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept orientation query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { orientation: "landscape" }, color: "red" },
          { query: { orientation: "portrait" }, color: "blue" },
        ],
      },
    });

    // portrait
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 50,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    let expected = {
      style1: {
        color: "blue",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // landscape
    jest.spyOn(ReactNative, "useWindowDimensions").mockImplementation(() => ({
      width: 200,
      height: 100,
      scale: 1,
      fontScale: 1,
    }));
    expected = {
      style1: {
        color: "red",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });

  it("should accept platform query correctly", () => {
    const styles = StyleSheet.create({
      style1: {
        color: "white",
        mediaQueries: [
          { query: { platform: "ios" }, color: "red" },
          { query: { platform: "android" }, color: "blue" },
          { query: { platform: "web" }, color: "green" },
        ],
      },
    });

    // ios
    Platform.OS = "ios";
    let expected = {
      style1: {
        color: "red",
      },
    };
    let { result } = renderHook(() => useStylesheet(styles));
    expect(result.current).toStrictEqual(expected);

    // android
    Platform.OS = "android";
    expected = {
      style1: {
        color: "blue",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);

    // web
    Platform.OS = "web";
    expected = {
      style1: {
        color: "green",
      },
    };
    ({ result } = renderHook(() => useStylesheet(styles)));
    expect(result.current).toStrictEqual(expected);
  });
});

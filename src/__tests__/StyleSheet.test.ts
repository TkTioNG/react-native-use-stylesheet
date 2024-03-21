import { StyleSheet as RNStyleSheet } from "react-native";
import { StyleSheet } from "..";
import { ExtendedNamedStyles } from "../StyleSheet";

describe("StyleSheet", () => {
  it("should generate proper style sheet", () => {
    const original = {
      style1: {
        margin: 1,
        padding: 1,
        backgroundColor: "#ffffff",
      },
      style2: {
        fontSize: 1,
        color: "#000000",
        flexDirection: "column" as const,
      },
    };
    const created = StyleSheet.create(original);
    expect(created).toStrictEqual(original);
  });

  it("should generate same style sheet as react-native own's StyleSheet", () => {
    const original = {
      style1: {
        margin: 1,
        padding: 1,
        backgroundColor: "#ffffff",
      },
      style2: {
        fontSize: 1,
        color: "#000000",
        flexDirection: "column" as const,
      },
    };
    const rnCreated = RNStyleSheet.create(original);
    const created = StyleSheet.create(original);
    expect(created).toStrictEqual(rnCreated);
  });

  it("should preserve mediaQueries from ExtendedNamedStyles<T>", () => {
    const original: ExtendedNamedStyles<any> = {
      style1: {
        margin: 1,
        padding: 1,
        backgroundColor: "#ffffff",
        mediaQueries: [
          {
            query: { breakpoint: "md" },
            backgroundColor: "#000000",
          },
          {
            query: { breakpoint: "lg" },
            padding: 20,
          },
        ],
      },
      style2: {
        fontSize: 1,
        color: "#000000",
        flexDirection: "column",
        mediaQueries: [
          {
            query: { breakpoint: "md" },
            color: "#ffffff",
          },
        ],
      },
    };
    const rnCreated = RNStyleSheet.create(original);
    const created = StyleSheet.create(original);
    expect(rnCreated).toStrictEqual(original);
    expect(created).toStrictEqual(rnCreated);
  });
});

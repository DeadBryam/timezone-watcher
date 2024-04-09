import { classNames } from "@/utils/index";

describe("Test if classNames function works", () => {
  test("With correct input", () => {
    expect(classNames("a", "b", "c")).toBe("a b c");
  });

  test("With empty strings", () => {
    expect(classNames("", "", "")).toBe("");
  });

  test("With non-string values", () => {
    expect(classNames("a", null, undefined)).toBe("a");
  });

  test("With empty strings", () => {
    expect(classNames("", "a", "", "b", "c")).toBe("a b c");
  });

  test("With no arguments", () => {
    expect(classNames()).toBe("");
  });
});

import { act, renderHook } from "@testing-library/react";

import { usePersistState } from "@/hooks/index";

describe("Test usePersistState", () => {
  test("should set initial state to undefined", () => {
    const { result } = renderHook(() =>
      usePersistState({ storageKey: "test" }),
    );
    expect(result.current[0]).toBeUndefined();
  });

  test("should set initial state to 'test'", () => {
    const { result } = renderHook(() =>
      usePersistState({ storageKey: "test", initialState: "test" }),
    );
    expect(result.current[0]).toBe("test");
  });

  test("should set initial state to 'test' and update to 'new test'", () => {
    const { result } = renderHook(() =>
      usePersistState({ storageKey: "test", initialState: "test" }),
    );
    act(() => {
      result.current[1]("new test");
    });
    expect(result.current[0]).toBe("new test");
  });
});

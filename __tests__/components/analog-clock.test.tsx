import { act, render } from "@testing-library/react";

import { AnalogClock } from "@/components/index";

describe("Test AnalogClock component", () => {
  test("renders component", () => {
    const { getByTestId } = render(
      <AnalogClock time={new Date()} size={200} />,
    );
    const clock = getByTestId("analog-clock");
    expect(clock).toHaveStyle("width: 200px");
    expect(clock).toHaveStyle("height: 200px");
  });

  test("renders component with default size", () => {
    const { getByTestId } = render(<AnalogClock time={new Date()} />);
    const clock = getByTestId("analog-clock");
    expect(clock).toHaveStyle("width: 150px");
    expect(clock).toHaveStyle("height: 150px");
  });

  test("clock hands rotate", async () => {
    const date = new Date();
    date.setHours(21, 0, 0);

    const { getByTestId } = render(<AnalogClock time={date} />);

    const clock = getByTestId("analog-clock-second-hand");

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const secondHand = clock.style.transform;
    expect(secondHand).not.toEqual("rotate(0deg)");
  });
});

import { render } from "@testing-library/react";

import { ClockCard } from "@/components/index";

describe("Test ClockCard component", () => {
  test("renders ClockCard component", () => {
    const { getByTestId } = render(<ClockCard offset={7200000} title="Test" />);

    const card = getByTestId("card");
    expect(card).toBeInTheDocument();

    const title = getByTestId("title");
    expect(title).toBeInTheDocument();

    const analogClock = getByTestId("analog-clock");
    expect(analogClock).toBeInTheDocument();
  });
});

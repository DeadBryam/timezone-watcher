import { render } from "@testing-library/react";
import { LocalTimeZone } from "@types";

import { ClockCard } from "@/components/index";

describe("Test ClockCard component", () => {
  test("renders ClockCard component", () => {
    const timezone: LocalTimeZone = {
      offset: 7200000,
      region: "Test",
      diff: 2,
      timezone: "CEST",
    };

    const { getByTestId } = render(<ClockCard timeZone={timezone} />);

    const card = getByTestId("card");
    expect(card).toBeInTheDocument();

    const title = getByTestId("title");
    expect(title).toBeInTheDocument();

    const analogClock = getByTestId("analog-clock");
    expect(analogClock).toBeInTheDocument();
  });
});

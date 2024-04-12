import { render } from "@testing-library/react";
import { LocalTimeZone } from "@types";

import { ClockList } from "@/components/index";

describe("ClockList", () => {
  const zones: LocalTimeZone[] = [
    { region: "America/New_York", offset: -14400, diff: -4, timezone: "EDT" },
    { region: "Europe/London", offset: 3600.0, diff: 1, timezone: "BST" },
  ];

  test("renders without crashing", () => {
    render(<ClockList zones={zones} onClick={() => {}} />);
  });

  test("renders correct number of clock cards", () => {
    const { getAllByTestId } = render(
      <ClockList zones={zones} onClick={() => {}} />,
    );
    const clockCards = getAllByTestId("card");
    expect(clockCards).toHaveLength(zones.length);
  });

  test("displays correct time zones", () => {
    const { getByText } = render(
      <ClockList zones={zones} onClick={() => {}} />,
    );
    zones.forEach((zone) => {
      expect(getByText(zone.region)).toBeInTheDocument();
    });
  });
});

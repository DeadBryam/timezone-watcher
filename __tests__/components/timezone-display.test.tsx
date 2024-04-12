import { fireEvent, render } from "@testing-library/react";
import { LocalTimeZone } from "@types";
import React from "react";

import { TimeZoneDisplay } from "@/components/timezone-display";

describe("TimeZoneDisplay", () => {
  const timeZone: LocalTimeZone = {
    region: "America/New_York",
    diff: -5,
    saved: true,
    timezone: "EDT",
    offset: -14400,
  };

  test("renders without crashing", () => {
    render(
      <TimeZoneDisplay
        timeZone={timeZone}
        onViewTimeZone={() => {}}
        saveTimeZone={() => {}}
        removeSelectedZone={() => {}}
        clearTimeZoneInfo={() => {}}
      />,
    );
  });

  test("displays timezone info when timezone is defined", () => {
    const { getByText } = render(
      <TimeZoneDisplay
        timeZone={timeZone}
        onViewTimeZone={() => {}}
        saveTimeZone={() => {}}
        removeSelectedZone={() => {}}
        clearTimeZoneInfo={() => {}}
      />,
    );
    expect(getByText("Informacion de la zona horaria")).toBeInTheDocument();
    expect(getByText(`${timeZone.diff} horas`)).toBeInTheDocument();
    expect(getByText("Ver mas informacion")).toBeInTheDocument();
  });

  test("displays empty card when timezone is undefined", () => {
    const { getByText } = render(
      <TimeZoneDisplay
        timeZone={undefined}
        onViewTimeZone={() => {}}
        saveTimeZone={() => {}}
        removeSelectedZone={() => {}}
        clearTimeZoneInfo={() => {}}
      />,
    );
    expect(
      getByText("No hay informacion de la zona horaria"),
    ).toBeInTheDocument();
    expect(
      getByText("Por favor, busca o selecciona una zona horaria"),
    ).toBeInTheDocument();
  });

  test('calls onViewTimeZone when "Ver mas informacion" button is clicked', () => {
    const onViewTimeZoneMock = jest.fn();
    const { getByText } = render(
      <TimeZoneDisplay
        timeZone={timeZone}
        onViewTimeZone={onViewTimeZoneMock}
        saveTimeZone={() => {}}
        removeSelectedZone={() => {}}
        clearTimeZoneInfo={() => {}}
      />,
    );
    fireEvent.click(getByText("Ver mas informacion"));
    expect(onViewTimeZoneMock).toHaveBeenCalledTimes(1);
  });
});

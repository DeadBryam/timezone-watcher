import { render } from "@testing-library/react";

import { CustomButton } from "@/components/index";

describe("Test CustomButton component", () => {
  test("render component", () => {
    const { getByText } = render(<CustomButton>Button</CustomButton>);
    const button = getByText("Button");
    expect(button).toBeInTheDocument();
  });

  test("render component with custom class", () => {
    const { getByText } = render(
      <CustomButton className="custom-class">Button</CustomButton>,
    );
    const button = getByText("Button");
    expect(button).toHaveClass("custom-class");
  });

  test("button is disabled", () => {
    const { getByText } = render(
      <CustomButton isDisabled>Button</CustomButton>,
    );
    const button = getByText("Button");
    expect(button).toBeDisabled();
  });

  test("button is loading", () => {
    const { getByText } = render(<CustomButton isLoading>Button</CustomButton>);
    const button = getByText("Loading...");
    expect(button).toBeInTheDocument();
  });

  test("onClick event", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <CustomButton onClick={onClick}>Button</CustomButton>,
    );
    const button = getByText("Button");
    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});

import { render } from "@testing-library/react";

import { Card, CustomButton } from "@/components/index";

describe("Test Card component", () => {
  test("renders component", () => {
    const { getByTestId } = render(
      <Card>
        <CustomButton isDisabled>Search</CustomButton>
        <CustomButton isLoading>Search</CustomButton>
      </Card>,
    );
    const card = getByTestId("card");
    expect(card).toBeInTheDocument();

    const buttons = card.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
  });
});

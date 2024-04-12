import { render } from "@testing-library/react";

import { EmptyCard } from "@/components/empty-card";

describe("Test EmptyCard component", () => {
  test("renders EmptyCard with title", () => {
    const { getByText } = render(<EmptyCard title="Test Title" />);
    const titleElement = getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders EmptyCard with title and description", () => {
    const { getByText } = render(
      <EmptyCard title="Test Title" description="Test Description" />,
    );
    const titleElement = getByText("Test Title");
    const descriptionElement = getByText("Test Description");
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});

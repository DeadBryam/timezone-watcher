import { fireEvent, render, waitFor } from "@testing-library/react";

import { SuggestionsInput } from "@/components/index";

describe("Test SuggestionsInput component", () => {
  test("renders input with placeholder", () => {
    const { getByPlaceholderText } = render(
      <SuggestionsInput placeholder="Test Placeholder" />,
    );
    const inputElement = getByPlaceholderText("Test Placeholder");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders input with autoCompleteItems", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <SuggestionsInput
        placeholder="Test Placeholder"
        autoCompleteItems={["apple", "banana", "orange"]}
      />,
    );
    const inputElement = getByPlaceholderText("Test Placeholder");
    inputElement.focus();

    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(queryByText("apple")).toBeInTheDocument();
      expect(queryByText("banana")).toBeInTheDocument();
      expect(queryByText("orange")).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: "b" } });
    await waitFor(() => {
      expect(queryByText("apple")).toBeNull();
      expect(queryByText("banana")).toBeInTheDocument();
      expect(queryByText("orange")).toBeNull();
    });

    fireEvent.change(inputElement, { target: { value: "manzana" } });
    await waitFor(() => {
      expect(queryByText("apple")).toBeNull();
      expect(queryByText("banana")).toBeNull();
      expect(queryByText("orange")).toBeNull();
    });
  });
});

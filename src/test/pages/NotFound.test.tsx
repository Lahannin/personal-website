import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import NotFound from "@/pages/NotFound";

describe("NotFound page", () => {
  it("renders 404 text", () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders humorous messaging", () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText(/no positioning, no messaging/)).toBeInTheDocument();
  });

  it("renders Back to home link", () => {
    renderWithProviders(<NotFound />);
    const link = screen.getByRole("link", { name: /Back to home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});

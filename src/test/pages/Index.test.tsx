import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Index from "@/pages/Index";

vi.mock("embla-carousel-react", () => import("../__mocks__/embla-carousel-react"));

describe("Index page", () => {
  it("renders skip-to-content link", () => {
    renderWithProviders(<Index />);
    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });

  it("renders main element with id", () => {
    renderWithProviders(<Index />);
    expect(document.getElementById("main-content")).toBeInTheDocument();
  });

  it("renders Navigation", () => {
    renderWithProviders(<Index />);
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });

  it("renders Hero heading", () => {
    renderWithProviders(<Index />);
    expect(screen.getByText(/Lauri/)).toBeInTheDocument();
  });

  it("lazy sections load", async () => {
    renderWithProviders(<Index />);
    // About section loads via Suspense
    await waitFor(() => {
      expect(screen.getByText(/that are hard to describe/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});

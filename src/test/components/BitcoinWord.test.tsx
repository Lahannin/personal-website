import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import BitcoinWord from "@/components/BitcoinWord";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("BitcoinWord", () => {
  beforeEach(() => mockNavigate.mockClear());

  it("renders 'Bitcoin' by default", () => {
    renderWithProviders(<BitcoinWord />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  it("renders custom children", () => {
    renderWithProviders(<BitcoinWord>Satoshi</BitcoinWord>);
    expect(screen.getByText("Satoshi")).toBeInTheDocument();
  });

  it("has role='button' and tabIndex=0", () => {
    renderWithProviders(<BitcoinWord />);
    const el = screen.getByRole("button", { name: "Bitcoin" });
    expect(el).toHaveAttribute("tabindex", "0");
  });

  it("navigates to /secret on click", () => {
    renderWithProviders(<BitcoinWord />);
    fireEvent.click(screen.getByRole("button", { name: "Bitcoin" }));
    expect(mockNavigate).toHaveBeenCalledWith("/secret");
  });

  it("navigates on Enter key", () => {
    renderWithProviders(<BitcoinWord />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Bitcoin" }), { key: "Enter" });
    expect(mockNavigate).toHaveBeenCalledWith("/secret");
  });

  it("navigates on Space key", () => {
    renderWithProviders(<BitcoinWord />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Bitcoin" }), { key: " " });
    expect(mockNavigate).toHaveBeenCalledWith("/secret");
  });

  it("stores section id in sessionStorage when inside a section", () => {
    renderWithProviders(
      <section id="about">
        <BitcoinWord />
      </section>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Bitcoin" }));
    expect(sessionStorage.setItem).toHaveBeenCalledWith("secretReturnSection", "about");
  });
});

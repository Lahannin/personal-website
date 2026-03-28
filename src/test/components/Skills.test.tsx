import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Skills from "@/components/Skills";

describe("Skills", () => {
  it("renders section with correct id", () => {
    renderWithProviders(<Skills />);
    expect(document.getElementById("skills")).toBeInTheDocument();
  });

  it("renders heading", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText(/Expertise/)).toBeInTheDocument();
    expect(screen.getByText(/Education/)).toBeInTheDocument();
  });

  it("renders CERTIFICATIONS subheading", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("CERTIFICATIONS")).toBeInTheDocument();
  });

  it("renders EDUCATION subheading", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("EDUCATION")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../components/Header/Header";

// Mock the hooks
vi.mock("../hooks", () => ({
  useIntersectionObserver: vi.fn(() => ({ hasIntersected: true })),
  useAnimation: vi.fn(() => ({ shouldAnimate: true })),
}));

describe("Header Component", () => {
  it("renders without crashing", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("displays the WANTED title", () => {
    render(<Header />);
    expect(screen.getByText("WANTED")).toBeInTheDocument();
  });

  it("displays the profile name", () => {
    render(<Header />);
    expect(screen.getByText("Abdur Rozaq")).toBeInTheDocument();
  });

  it("displays the subtitle", () => {
    render(<Header />);
    expect(screen.getByText("Curious Mind")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("header");

    const profileImage = screen.getByAltText(
      "Abdur Rozaq - Developer and Data Integration Specialist"
    );
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("loading", "eager");
  });

  it("applies animation classes when conditions are met", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("header--animated");
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Contact from "../components/Contact/Contact";

// Mock the hooks module
vi.mock("../hooks", () => ({
  useForm: vi.fn(() => ({
    values: { name: "", email: "", message: "" },
    errors: { name: "", email: "", message: "" },
    isSubmitting: false,
    isValid: false,
    setIsSubmitting: vi.fn(),
    handleChange: vi.fn(),
    validate: vi.fn(() => true),
    reset: vi.fn(),
  })),
  useIntersectionObserver: vi.fn(() => ({
    isIntersecting: false,
    hasIntersected: true,
  })),
}));

// Mock the utils module
vi.mock("../utils", () => ({
  validateFormData: vi.fn(() => ({
    isValid: true,
    errors: { name: "", email: "", message: "" },
  })),
  copyToClipboard: vi.fn(() => Promise.resolve(true)),
}));

describe("Contact Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Contact />);
    expect(screen.getByText("Want to Catch him?")).toBeInTheDocument();
  });

  it("displays the heading", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /want to catch him/i })
    ).toBeInTheDocument();
  });

  it("displays all form fields", () => {
    render(<Contact />);

    expect(
      screen.getByPlaceholderText(/name \(3-30 characters\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/email \(6-50 characters\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/message \(5-500 characters\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    // Mock useForm to return validation errors
    const mockUseForm = await import("../hooks");
    vi.mocked(mockUseForm.useForm).mockReturnValue({
      values: { name: "", email: "", message: "" },
      errors: {
        name: "Name must be between 3 and 30 characters",
        email: "Please enter a valid email address",
        message: "Message must be between 5 and 500 characters",
      },
      isSubmitting: false,
      isValid: false,
      setIsSubmitting: vi.fn(),
      handleChange: vi.fn(),
      validate: vi.fn(() => false),
      reset: vi.fn(),
    });

    render(<Contact />);

    // Check if error messages are displayed
    await waitFor(() => {
      expect(
        screen.getByText("Name must be between 3 and 30 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Message must be between 5 and 500 characters")
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    const mockUseForm = await import("../hooks");
    vi.mocked(mockUseForm.useForm).mockReturnValue({
      values: { name: "John", email: "invalid-email", message: "Hello" },
      errors: {
        name: "",
        email: "Please enter a valid email address",
        message: "",
      },
      isSubmitting: false,
      isValid: false,
      setIsSubmitting: vi.fn(),
      handleChange: vi.fn(),
      validate: vi.fn(() => false),
      reset: vi.fn(),
    });

    render(<Contact />);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const mockReset = vi.fn();
    const mockSetIsSubmitting = vi.fn();

    const mockUseForm = await import("../hooks");
    vi.mocked(mockUseForm.useForm).mockReturnValue({
      values: {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello World",
      },
      errors: { name: "", email: "", message: "" },
      isSubmitting: false,
      isValid: true,
      setIsSubmitting: mockSetIsSubmitting,
      handleChange: vi.fn(),
      validate: vi.fn(() => true),
      reset: mockReset,
    });

    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    expect(mockSetIsSubmitting).toHaveBeenCalledWith(true);
  });

  it("displays contact information", () => {
    render(<Contact />);

    expect(screen.getByText("dev@rozaq.id")).toBeInTheDocument();
    expect(screen.getByText("+62 823 1398 2216")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Contact />);

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "contact-heading");

    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("aria-labelledby", "message-form-heading");
    expect(form).toHaveAttribute("novalidate");

    // Check for proper labeling
    const nameInput = screen.getByPlaceholderText(/name \(3-30 characters\)/i);
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("required");
  });
});

import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useIntersectionObserver, useAnimation } from "../hooks";

describe("Custom Hooks", () => {
  describe("useIntersectionObserver", () => {
    it("should return hasIntersected as false initially", () => {
      const ref = { current: document.createElement("div") };
      const { result } = renderHook(() =>
        useIntersectionObserver(ref, { threshold: 0.5 })
      );

      expect(result.current.hasIntersected).toBe(false);
    });

    it("should handle null ref gracefully", () => {
      const ref = { current: null };
      const { result } = renderHook(() =>
        useIntersectionObserver(ref, { threshold: 0.5 })
      );

      expect(result.current.hasIntersected).toBe(false);
    });
  });

  describe("useAnimation", () => {
    it("should return shouldAnimate as true when prefers-reduced-motion is not set", () => {
      // Mock matchMedia to return false for prefers-reduced-motion
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === "(prefers-reduced-motion: reduce)" ? false : true,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { result } = renderHook(() => useAnimation());
      expect(result.current.shouldAnimate).toBe(true);
    });

    it("should return shouldAnimate as false when prefers-reduced-motion is set", () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === "(prefers-reduced-motion: reduce)" ? true : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { result } = renderHook(() => useAnimation());
      expect(result.current.shouldAnimate).toBe(false);
    });
  });
});

// Utility functions for the portfolio project
import type { ContactFormData } from '../types';

/**
 * Debounce function to limit how often a function can be called
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to limit how often a function can be called
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Check if user prefers reduced motion for accessibility
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Generate a unique ID for components
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate form data
 */
export const validateFormData = (data: ContactFormData): { isValid: boolean; errors: Record<'name' | 'email' | 'message', string> } => {
  const errors: Record<'name' | 'email' | 'message', string> = {
    name: '',
    email: '',
    message: '',
  };

  if (!data.name || data.name.length < 3 || data.name.length > 30) {
    errors.name = 'Name must be between 3 and 30 characters';
  }

  if (!data.email || !isValidEmail(data.email) || data.email.length > 50) {
    errors.email = 'Please enter a valid email address (max 50 characters)';
  }

  if (!data.message || data.message.length < 5 || data.message.length > 500) {
    errors.message = 'Message must be between 5 and 500 characters';
  }

  const hasErrors = Object.values(errors).some(error => error !== '');

  return {
    isValid: !hasErrors,
    errors,
  };
};

/**
 * Scroll to element with smooth behavior
 */
export const scrollToElement = (
  elementId: string,
  offset: number = 0
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const yPosition = element.offsetTop - offset;
    window.scrollTo({
      top: yPosition,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Lazy load image with intersection observer
 */
export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            img.onload = () => {
              observer.unobserve(img);
              resolve();
            };
            img.onerror = () => {
              observer.unobserve(img);
              reject(new Error('Failed to load image'));
            };
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(img);
  });
};

/**
 * Performance monitoring
 */
export const measurePerformance = (name: string) => {
  const start = performance.now();
  return {
    end: () => {
      const duration = performance.now() - start;
      // eslint-disable-next-line no-console
      console.log(`${name} took ${duration.toFixed(2)}ms`);
      return duration;
    },
  };
};

/**
 * Get browser info for analytics
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  return {
    browser: ua.includes('Chrome') ? 'Chrome' :
      ua.includes('Firefox') ? 'Firefox' :
        ua.includes('Safari') ? 'Safari' : 'Other',
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
    language: navigator.language,
    platform: navigator.platform,
  };
};

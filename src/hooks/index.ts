import React, { useState, useEffect, useCallback, useRef } from 'react';
import { debounce, prefersReducedMotion } from '../utils';

/**
 * Custom hook for managing form state with validation
 */
export const useForm = <T extends Record<string, unknown>>(
  initialValues: T,
  validator?: (values: T) => { isValid: boolean; errors: Record<keyof T, string> }
) => {
  const [values, setValues] = useState<T>(initialValues); // restored, needed for hook logic
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true); // Start as true since no validation has run yet

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validate = useCallback((showAllErrors: boolean = false) => {
    if (validator) {
      const validation = validator(values);

      // Only show errors for touched fields unless showAllErrors is true
      const filteredErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
      Object.keys(validation.errors).forEach(key => {
        const field = key as keyof T;
        if (showAllErrors || touched[field]) {
          filteredErrors[field] = validation.errors[field];
        } else {
          filteredErrors[field] = '';
        }
      });

      setErrors(filteredErrors);
      setIsValid(validation.isValid);
      return validation.isValid;
    }
    return true;
  }, [values, validator, touched]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
    setIsValid(true);
  }, [initialValues]);

  useEffect(() => {
    validate();
  }, [validate]);

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    setIsSubmitting,
    handleChange,
    validate,
    reset,
  };
};

/**
 * Custom hook for handling intersection observer
 */
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element | null>,
  options: Partial<IntersectionObserverInit> = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
};

/**
 * Custom hook for managing scroll position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollPosition = debounce(() => {
      const scrollY = window.pageYOffset;
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setScrollPosition(scrollY);
      lastScrollY = scrollY;
    }, 16); // 60fps

    window.addEventListener('scroll', updateScrollPosition);
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return { scrollPosition, scrollDirection };
};

/**
 * Custom hook for window size
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Custom hook for managing animation state
 */
export const useAnimation = (initialState = false) => {
  const [isAnimating, setIsAnimating] = useState(initialState);
  const [shouldAnimate, setShouldAnimate] = useState(!prefersReducedMotion());

  const startAnimation = useCallback(() => {
    if (shouldAnimate) {
      setIsAnimating(true);
    }
  }, [shouldAnimate]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion());
  }, []);

  return {
    isAnimating,
    shouldAnimate,
    startAnimation,
    stopAnimation,
  };
};

/**
 * Custom hook for managing focus trap
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return containerRef;
};

/**
 * Custom hook for managing local storage
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

/**
 * Custom hook for performance monitoring
 */
export const usePerformanceMonitor = (componentName: string) => {
  const mountTime = useRef<number>(performance.now());
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, []); // Add empty dependency array to fix exhaustive-deps warning

  useEffect(() => {
    const currentMountTime = mountTime.current; // Copy to variable to fix hook dependency warning
    const loadTime = performance.now() - currentMountTime;
    // eslint-disable-next-line no-console
    console.log(`${componentName} mounted in ${loadTime.toFixed(2)}ms`);

    return () => {
      const totalTime = performance.now() - currentMountTime;
      // eslint-disable-next-line no-console
      console.log(`${componentName} unmounted after ${totalTime.toFixed(2)}ms, rendered ${renderCount} times`);
    };
  }, [componentName, renderCount]);

  return { renderCount };
};

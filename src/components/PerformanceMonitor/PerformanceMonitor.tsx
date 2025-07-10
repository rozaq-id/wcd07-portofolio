import React, { useState, useEffect, useCallback } from "react";
import { measurePerformance, getBrowserInfo } from "../../utils";

interface PerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

interface PerformanceMonitorProps {
  onMetricsReady?: (metrics: PerformanceMetrics) => void;
  logToConsole?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsReady,
  logToConsole = import.meta.env.DEV,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  const logMetrics = useCallback(
    (metrics: Partial<PerformanceMetrics>) => {
      if (logToConsole) {
        // eslint-disable-next-line no-console
        console.group("🚀 Performance Metrics");
        // eslint-disable-next-line no-console
        console.log("Browser Info:", getBrowserInfo());
        // eslint-disable-next-line no-console
        console.table({
          "Load Time (ms)": metrics.loadTime?.toFixed(2) || "N/A",
          "First Paint (ms)": metrics.firstPaint?.toFixed(2) || "N/A",
          "First Contentful Paint (ms)":
            metrics.firstContentfulPaint?.toFixed(2) || "N/A",
          "Largest Contentful Paint (ms)":
            metrics.largestContentfulPaint?.toFixed(2) || "N/A",
          "First Input Delay (ms)":
            metrics.firstInputDelay?.toFixed(2) || "N/A",
          "Cumulative Layout Shift":
            metrics.cumulativeLayoutShift?.toFixed(4) || "N/A",
        });

        // Performance scoring
        const scores = {
          LCP: metrics.largestContentfulPaint
            ? metrics.largestContentfulPaint <= 2500
              ? "Good"
              : metrics.largestContentfulPaint <= 4000
              ? "Needs Improvement"
              : "Poor"
            : "N/A",
          FID: metrics.firstInputDelay
            ? metrics.firstInputDelay <= 100
              ? "Good"
              : metrics.firstInputDelay <= 300
              ? "Needs Improvement"
              : "Poor"
            : "N/A",
          CLS: metrics.cumulativeLayoutShift
            ? metrics.cumulativeLayoutShift <= 0.1
              ? "Good"
              : metrics.cumulativeLayoutShift <= 0.25
              ? "Needs Improvement"
              : "Poor"
            : "N/A",
        };

        // eslint-disable-next-line no-console
        console.table(scores);
        // eslint-disable-next-line no-console
        console.groupEnd();
      }
    },
    [logToConsole]
  );

  const measureWebVitals = useCallback(() => {
    const perf = measurePerformance("Web Vitals");

    // Get navigation timing
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    const newMetrics: Partial<PerformanceMetrics> = {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
    };

    // Get paint timing
    const paintEntries = performance.getEntriesByType("paint");
    paintEntries.forEach((entry) => {
      if (entry.name === "first-paint") {
        newMetrics.firstPaint = entry.startTime;
      } else if (entry.name === "first-contentful-paint") {
        newMetrics.firstContentfulPaint = entry.startTime;
      }
    });

    // Observer for LCP
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          newMetrics.largestContentfulPaint = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // Observer for FID
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // PerformanceEventTiming is not fully typed in some browsers
            const fidEntry = entry as PerformanceEventTiming;
            newMetrics.firstInputDelay =
              fidEntry.processingStart - fidEntry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });

        // Observer for CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: PerformanceEntry) => {
            // Layout shift entries have specific properties
            const layoutShiftEntry = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value: number;
            };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          });
          newMetrics.cumulativeLayoutShift = clsValue;
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn("Performance observation not supported:", error);
      }
    }

    setMetrics(newMetrics);

    // Log metrics to console
    if (logToConsole) {
      // eslint-disable-next-line no-console
      console.group("🚀 Performance Metrics");
      // eslint-disable-next-line no-console
      console.log("Browser Info:", getBrowserInfo());
      // eslint-disable-next-line no-console
      console.table({
        "Load Time (ms)": newMetrics.loadTime?.toFixed(2) || "N/A",
        "First Paint (ms)": newMetrics.firstPaint?.toFixed(2) || "N/A",
        "First Contentful Paint (ms)":
          newMetrics.firstContentfulPaint?.toFixed(2) || "N/A",
        "Largest Contentful Paint (ms)":
          newMetrics.largestContentfulPaint?.toFixed(2) || "N/A",
        "First Input Delay (ms)":
          newMetrics.firstInputDelay?.toFixed(2) || "N/A",
        "Cumulative Layout Shift":
          newMetrics.cumulativeLayoutShift?.toFixed(4) || "N/A",
      });

      // Performance scoring
      const scores = {
        LCP: newMetrics.largestContentfulPaint
          ? newMetrics.largestContentfulPaint <= 2500
            ? "Good"
            : newMetrics.largestContentfulPaint <= 4000
            ? "Needs Improvement"
            : "Poor"
          : "N/A",
        FID: newMetrics.firstInputDelay
          ? newMetrics.firstInputDelay <= 100
            ? "Good"
            : newMetrics.firstInputDelay <= 300
            ? "Needs Improvement"
            : "Poor"
          : "N/A",
        CLS: newMetrics.cumulativeLayoutShift
          ? newMetrics.cumulativeLayoutShift <= 0.1
            ? "Good"
            : newMetrics.cumulativeLayoutShift <= 0.25
            ? "Needs Improvement"
            : "Poor"
          : "N/A",
      };

      // eslint-disable-next-line no-console
      console.table(scores);
      // eslint-disable-next-line no-console
      console.groupEnd();
    }

    perf.end();
  }, [logToConsole]);

  useEffect(() => {
    if (document.readyState === "complete") {
      measureWebVitals();
      setIsLoaded(true);
    } else {
      window.addEventListener("load", () => {
        measureWebVitals();
        setIsLoaded(true);
      });
    }
  }, [measureWebVitals]);

  useEffect(() => {
    if (isLoaded && Object.keys(metrics).length > 0) {
      logMetrics(metrics);
      if (onMetricsReady && metrics.loadTime !== undefined) {
        onMetricsReady(metrics as PerformanceMetrics);
      }
    }
  }, [metrics, isLoaded, logMetrics, onMetricsReady]);

  // This component doesn't render anything visible
  return null;
};

export default PerformanceMonitor;

// Global type definitions for the portfolio project
import React from 'react';

export interface Equipment {
  name: string;
  percentage: number;
  icon: React.ReactNode;
  category?: 'language' | 'framework' | 'tool' | 'platform';
}

export interface Capability {
  id: string;
  title: string;
  description?: string;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'social';
  value: string;
  icon: React.ReactNode;
  href?: string;
  label?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  [key: string]: unknown;
}

export interface NoiseProps {
  opacity?: number;
  backgroundSize?: number;
  className?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Theme related types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textMuted: string;
    border: string;
    surface: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontPrimary: string;
    fontMono: string;
  };
}

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

// SEO metadata types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  canonical?: string;
}

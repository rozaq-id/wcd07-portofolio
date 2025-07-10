import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  return (
    <div
      className={`loading-spinner loading-spinner--${size} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="loading-spinner__circle">
        <div className="loading-spinner__dot loading-spinner__dot--1"></div>
        <div className="loading-spinner__dot loading-spinner__dot--2"></div>
        <div className="loading-spinner__dot loading-spinner__dot--3"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;

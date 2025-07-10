import React, { useRef } from "react";
import "./Capability.css";
import { useIntersectionObserver } from "../../hooks";

const Capability: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
  });

  const capabilities = [
    "Web Application",
    "Web Scrapper",
    "Data Integration",
    "Creative Consultation",
  ];
  return (
    <section
      ref={sectionRef}
      className={`capability section ${hasIntersected ? "animate-in" : ""}`}
    >
      <div className="capability-container">
        <div className="capability-title">
          <h2>Capability</h2>
        </div>
        <div className="capability-content">
          <ol className="capability-list">
            {capabilities.map((capability, index) => (
              <li
                key={index}
                className={`capability-item ${
                  hasIntersected ? "animate-in" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {capability}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Capability;

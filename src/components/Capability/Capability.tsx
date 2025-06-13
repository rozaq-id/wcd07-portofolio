import React from 'react';
import './Capability.css';

const Capability: React.FC = () => {
  const capabilities = [
    "Web Application",
    "Web Scrapper",
    "Data Integration",
    "Creative Consultation"
  ];
  return (
    <section className="capability section">
      <div className="capability-container">
        <div className="capability-title">
          <h2>Capability</h2>
        </div>
        <div className="capability-content">
          <ol className="capability-list">
            {capabilities.map((capability, index) => (
              <li key={index}>{capability}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Capability;

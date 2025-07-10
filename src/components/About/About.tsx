import React, { useRef } from "react";
import "./About.css";
import { useIntersectionObserver } from "../../hooks";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className={`section about-section ${hasIntersected ? "animate-in" : ""}`}
      style={{ position: "relative" }}
    >
      <div className="container">
        <h2>About</h2>
        <p>
          Abdur, a skilled Developer and Data Integration specialist, is
          renowned for his ability to create comprehensive web applications and
          innovative data collection tools, seamlessly transforming complex
          requirements into user-friendly solutions while exhibiting a strong
          command of both front-end and back-end technologies.
        </p>
        <p>
          Known as a passionate explorer of technologies, he excels at learning
          and adapting to new development stacks with ease, showcasing precision
          and dedication to continuous improvement, making him not only a quick
          learner but also a reliable and innovative problem solver.
        </p>
      </div>
    </section>
  );
};

export default About;

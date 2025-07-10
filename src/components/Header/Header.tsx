import React, { useRef } from "react";
import { useIntersectionObserver, useAnimation } from "../../hooks";
import "./Header.css";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(headerRef, {
    threshold: 0.2,
  });
  const { shouldAnimate } = useAnimation();

  return (
    <header
      ref={headerRef}
      className={`header ${
        hasIntersected && shouldAnimate ? "header--animated" : ""
      }`}
      role="banner"
    >
      <h1 className="header__title" aria-label="Wanted poster style heading">
        WANTED
      </h1>
      <section className="section" aria-labelledby="profile-heading">
        <div className="profile-container">
          <div className="profile-image-container">
            <img
              src="/images/profile-image.png"
              alt="Abdur Rozaq - Developer and Data Integration Specialist"
              className="profile-image"
              loading="eager"
              width="300"
              height="300"
            />
          </div>
          <div className="profile-name" id="profile-heading">
            <h2>Abdur Rozaq</h2>
            <p className="subtitle">Curious Mind</p>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;

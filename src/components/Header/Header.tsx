import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>WANTED</h1>
      <section className="section">        <div className="profile-container">
          <div className="profile-image-container">
            <img
              src="/images/profile-image.png"
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-name">
            <h2>Abdur Rozaq</h2>
            <p className="subtitle">Curious Mind</p>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;

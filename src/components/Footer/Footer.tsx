import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="section" style={{ margin: 0, paddingBottom: 0 }}>
      <footer className="footer">
        <div className="copyright">
          <p>&copy; Copyright {currentYear}</p>
        </div>
        <div className="powered-by">
          <p>
            Powered by <span className="highlight">React</span>
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;

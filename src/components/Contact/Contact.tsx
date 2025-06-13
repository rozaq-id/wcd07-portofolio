import React, { useState } from 'react';
import './Contact.css';
import {
  EmailIcon,
  PhoneIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon
} from './icons';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your message, ${name}! I will get back to you soon.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="contact section">
      <h2>Want to Catch him?</h2>
      <p className="contact-intro">
        After investigations, we gathered more clues. You can connect or send him a message. Check below.
      </p>

      <div className="contact-info-wrapper">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon"><EmailIcon /></span>
            <span>dev@rozaq.id</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon"><PhoneIcon /></span>
            <span>+62 823 1398 2216</span>
          </div>
        </div>
        
        <div className="social-links">
          <a href="https://twitter.com" className="social-link">
            <span className="social-icon"><TwitterIcon /></span>
            <span>Twitter</span>
          </a>
          <a href="https://linkedin.com" className="social-link">
            <span className="social-icon"><LinkedInIcon /></span>
            <span>LinkedIn</span>
          </a>
          <a href="https://instagram.com" className="social-link">
            <span className="social-icon"><InstagramIcon /></span>
            <span>Instagram</span>
          </a>
          <a href="https://facebook.com" className="social-link">
            <span className="social-icon"><FacebookIcon /></span>
            <span>Facebook</span>
          </a>
        </div>
      </div>

      <div className="message-form-container">
        <h3>Send a Message</h3>
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Name (3-30)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email (6-50)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <textarea
              id="message"
              placeholder="Message (5-500)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

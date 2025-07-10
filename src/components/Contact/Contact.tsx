import React, { useRef, useState } from "react";
import { useForm, useIntersectionObserver } from "../../hooks";
import { validateFormData, copyToClipboard } from "../../utils";
import type { ContactFormData } from "../../types";
import "./Contact.css";
import {
  EmailIcon,
  PhoneIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
} from "./icons";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    reset,
  } = useForm<ContactFormData>(
    { name: "", email: "", message: "" },
    validateFormData
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with all errors showing
    const isFormValid = validate(true);
    if (!isFormValid) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowSuccessMessage(true);
    reset();
    setIsSubmitting(false);

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleCopyToClipboard = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopyFeedback(`${type} copied to clipboard!`);
      setTimeout(() => setCopyFeedback(""), 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`contact section ${hasIntersected ? "contact--animated" : ""}`}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading">Want to Catch him?</h2>
      <p className="contact-intro">
        After investigations, we gathered more clues. You can connect or send
        him a message. Check below.
      </p>

      {copyFeedback && (
        <div className="copy-feedback" role="status" aria-live="polite">
          {copyFeedback}
        </div>
      )}

      <div className="contact-info-wrapper">
        <div className="contact-info">
          <div className="contact-item">
            <button
              type="button"
              className="contact-icon-button"
              onClick={() => handleCopyToClipboard("dev@rozaq.id", "Email")}
              aria-label="Copy email address"
            >
              <EmailIcon />
            </button>
            <span>dev@rozaq.id</span>
          </div>
          <div className="contact-item">
            <button
              type="button"
              className="contact-icon-button"
              onClick={() =>
                handleCopyToClipboard("+62 823 1398 2216", "Phone number")
              }
              aria-label="Copy phone number"
            >
              <PhoneIcon />
            </button>
            <span>+62 823 1398 2216</span>
          </div>
        </div>

        <nav className="social-links" aria-label="Social media links">
          <a
            href="https://twitter.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Twitter profile"
          >
            <span className="social-icon">
              <TwitterIcon />
            </span>
            <span>Twitter</span>
          </a>
          <a
            href="https://linkedin.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            <span className="social-icon">
              <LinkedInIcon />
            </span>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://instagram.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Instagram profile"
          >
            <span className="social-icon">
              <InstagramIcon />
            </span>
            <span>Instagram</span>
          </a>
          <a
            href="https://facebook.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Facebook profile"
          >
            <span className="social-icon">
              <FacebookIcon />
            </span>
            <span>Facebook</span>
          </a>
        </nav>
      </div>

      <div className="message-form-container">
        <h3 id="message-form-heading">Send a Message</h3>

        {showSuccessMessage && (
          <div className="success-message" role="status" aria-live="polite">
            <strong>Thank you!</strong> Your message has been sent successfully.
            I&apos;ll get back to you soon.
          </div>
        )}

        <form
          className="message-form"
          onSubmit={handleSubmit}
          aria-labelledby="message-form-heading"
          noValidate
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name (3-30 characters)"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                maxLength={30}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email (6-50 characters)"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                maxLength={50}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Message (5-500 characters)"
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              required
              maxLength={500}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="error-message" role="alert">
                {errors.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            aria-describedby="submit-status"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          <div id="submit-status" className="sr-only" aria-live="polite">
            {isSubmitting ? "Sending your message..." : ""}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

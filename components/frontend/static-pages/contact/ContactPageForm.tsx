"use client";

import { useActionState } from "react";
import { sendContactForm, type ContactFormState } from "@/services/contact-lead";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const ContactPageForm = () => {
  const [state, formAction, isPending] = useActionState(
    sendContactForm,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="row">
        <div className="col-md-6 mb20">
          <label htmlFor="name" className="form-label fw-semibold">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control contact-input"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="col-md-6 mb20">
          <label htmlFor="phone" className="form-label fw-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control contact-input"
            placeholder="10-digit mobile number"
            required
          />
        </div>

        <div className="col-12 mb20">
          <label htmlFor="email" className="form-label fw-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control contact-input"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="col-12 mb20">
          <label htmlFor="message" className="form-label fw-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="form-control contact-input"
            placeholder="Tell us what you're looking for..."
          />
        </div>

        {/* Success/error feedback — state directly service se aata hai */}
        {state.message && (
          <div className="col-12 mb20">
            <div
              className={`alert ${
                state.success ? "alert-success" : "alert-danger"
              } py-2 mb-0`}
              role="alert"
            >
              {state.message}
            </div>
          </div>
        )}

        <div className="col-12">
          <button
            type="submit"
            className="btn contact-submit-btn px-5 py-3"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>

      {/* Brand color theme — scoped styling isi form tak */}
      <style jsx>{`
        .contact-input {
          border: 1px solid #e0d3d2;
          border-radius: 8px;
          padding: 12px 16px;
        }
        .contact-input:focus {
          border-color: #da251c;
          box-shadow: 0 0 0 0.2rem rgba(218, 37, 28, 0.15);
        }
        .contact-submit-btn {
          background-color: #da251c;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        .contact-submit-btn:hover:not(:disabled) {
          background-color: #b81f18;
          color: #fff;
        }
        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
};

export default ContactPageForm;
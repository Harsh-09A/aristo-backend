"use client";
import "./contact-modal.css"
import { useActionState, useRef, useEffect } from "react";
import { sendContactForm } from "@/services/contact-lead";

const initialState = { success: false, message: "" };

export default function ContactModal() {
  const [state, formAction, isPending] = useActionState(sendContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="modal fade" id="contactModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Get Best Price Offer
              <span className="modal-subtitle">Our team will contact you within 24 hours</span>
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <form ref={formRef} action={formAction}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-control" required placeholder="Enter your name" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-control" required placeholder="Enter your email" />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  required
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  placeholder="10-digit mobile number"
                />
              </div>

              {state.message && (
                <p className={state.success ? "text-success small" : "text-danger small"}>
                  {state.message}
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? "Sending..." : "Get Price"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
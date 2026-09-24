// app/terms-and-conditions/page.tsx
// URL: /terms-and-conditions

import type { Metadata } from "next";
import LegalPage from "@/components/frontend/legal/LegalPage";
import { COMPANY } from "@/lib/legal-info";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${COMPANY.name}`,
  description: `Terms and conditions for using the ${COMPANY.name} website.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastUpdated={COMPANY.lastUpdated}>
      <p>
        Welcome to {COMPANY.name} ({COMPANY.website}). By visiting or using this
        website, you agree to these Terms & Conditions. If you do not agree,
        please do not use the website.
      </p>

      <h2 className="h4 mt-4">1. About Us</h2>
      <p>
        {COMPANY.name} (we, us, our) is a real estate consultancy. We help
        buyers and investors discover residential and commercial properties from
        various developers. We are not the developer or owner of the projects
        listed here unless we clearly say so.
      </p>
      <p>MahaRERA Registration No.: {COMPANY.mahaReraNo}</p>

      <h2 className="h4 mt-4">2. Property Information Disclaimer</h2>
      <ul>
        <li>
          Project details (price, size, configuration, amenities, possession
          date, images, layouts) are provided by developers or collected from
          public sources and may change without notice.
        </li>
        <li>
          Images, videos and 3D renders are for illustration only and may not
          match the final project.
        </li>
        <li>
          Prices shown are indicative. Final price, taxes, stamp duty,
          registration, parking and other charges are confirmed only by the
          developer in the official documents.
        </li>
        <li>
          Nothing on this website is an offer, invitation or contract to sell.
          Please verify project registration and approvals on the official
          MahaRERA website before making any decision or payment.
        </li>
      </ul>

      <h2 className="h4 mt-4">3. Enquiries and Contact</h2>
      <p>
        When you submit an enquiry or contact form, you allow us and the
        relevant developer or partner to contact you by phone call, SMS,
        WhatsApp or email about your enquiry. Please give correct and complete
        details.
      </p>

      <h2 className="h4 mt-4">4. Our Services and Fees</h2>
      <p>
        Browsing this website is free. If we assist you with a purchase, any
        brokerage or service fee will be agreed with you separately in writing.
        We never ask for booking amounts or payments through this website.
        Please pay only through official developer channels and obtain proper
        receipts.
      </p>

      <h2 className="h4 mt-4">5. EMI Calculator and Other Tools</h2>
      <p>
        Results from the EMI calculator or similar tools are estimates only.
        Actual loan amount, interest rate and EMI depend on your bank or
        financial institution. Please confirm with your lender before taking any
        decision.
      </p>

      <h2 className="h4 mt-4">6. Blog and General Content</h2>
      <p>
        Blog posts and market information are for general knowledge only. They
        are not legal, financial, tax or investment advice. Please consult a
        qualified professional before making major decisions.
      </p>

      <h2 className="h4 mt-4">7. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the website for any unlawful or fraudulent purpose.</li>
        <li>
          Submit false, misleading or someone else&apos;s personal details.
        </li>
        <li>
          Copy, scrape or collect data from the website using bots or automated
          tools without our written permission.
        </li>
        <li>
          Try to hack, disturb or overload the website, or upload harmful code.
        </li>
      </ul>

      <h2 className="h4 mt-4">8. Intellectual Property</h2>
      <p>
        The website design, logo, text, graphics and other content belong to{" "}
        {COMPANY.name} or the respective developers and partners. You may not
        copy, reproduce or reuse them for commercial purposes without prior
        written permission.
      </p>

      <h2 className="h4 mt-4">9. Third-Party Services and Links</h2>
      <p>
        Our website may show content from third parties, such as Google Reviews,
        maps, or links to developer websites. We do not control these services
        and are not responsible for their content, accuracy or privacy
        practices.
      </p>

      <h2 className="h4 mt-4">10. Limitation of Liability</h2>
      <p>
        We try to keep the website accurate and available, but we do not
        guarantee that it is always error-free or uninterrupted. To the maximum
        extent allowed by law, {COMPANY.name} is not liable for any loss or
        damage arising from your use of the website or your reliance on the
        information on it, including decisions taken about any property
        transaction.
      </p>

      <h2 className="h4 mt-4">11. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The latest version will
        always be on this page with the updated date. Continuing to use the
        website means you accept the changes.
      </p>

      <h2 className="h4 mt-4">12. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. Any dispute will be
        subject to the exclusive jurisdiction of the courts at{" "}
        {COMPANY.jurisdiction}.
      </p>

      <h2 className="h4 mt-4">13. Contact Us</h2>
      <p>
        {COMPANY.name}
        <br />
        {COMPANY.address}
        <br />
        Email: {COMPANY.email}
        <br />
        Phone: {COMPANY.phone}
      </p>
    </LegalPage>
  );
}

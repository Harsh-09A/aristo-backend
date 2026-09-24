// app/privacy-policy/page.tsx
// URL: /privacy-policy

import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/frontend/legal/LegalPage";
import { COMPANY } from "@/lib/legal-info";

export const metadata: Metadata = {
  title: `Privacy Policy | ${COMPANY.name}`,
  description: `How ${COMPANY.name} collects, uses and protects your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={COMPANY.lastUpdated}>
      <p>
        {COMPANY.name} (we, us, our) respects your privacy. This policy explains
        what personal information we collect through {COMPANY.website}, why we
        collect it, and how we protect it. We follow the Information Technology
        Act, 2000 and the Digital Personal Data Protection Act, 2023 of India.
      </p>

      <h2 className="h4 mt-4">1. Information We Collect</h2>
      <p>
        <strong>Information you give us</strong> - when you fill a contact or
        enquiry form, request a callback or send us an email:
      </p>
      <ul>
        <li>Name, phone number and email address</li>
        <li>Property or location you are interested in</li>
        <li>Any message or details you write to us</li>
      </ul>
      <p>
        <strong>Information collected automatically</strong> - when you browse
        the website:
      </p>
      <ul>
        <li>IP address, browser type, device type and operating system</li>
        <li>Pages you visit, time spent and the website you came from</li>
        <li>Cookies and similar technologies (see section 6)</li>
      </ul>

      <h2 className="h4 mt-4">2. How We Use Your Information</h2>
      <ul>
        <li>
          To reply to your enquiries and share property details you asked for
        </li>
        <li>To connect you with the relevant developer or partner</li>
        <li>To call, message, WhatsApp or email you about your enquiry</li>
        <li>To improve the website, its content and our services</li>
        <li>To keep the website secure and prevent misuse or fraud</li>
        <li>To meet legal and regulatory requirements</li>
      </ul>

      <h2 className="h4 mt-4">3. Your Consent</h2>
      <p>
        By submitting a form or using this website, you consent to us collecting
        and using your information as described in this policy. You can withdraw
        your consent at any time by contacting us (see section 10). Withdrawing
        consent does not affect what we did before you withdrew it.
      </p>

      <h2 className="h4 mt-4">4. Who We Share Your Information With</h2>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul>
        <li>
          <strong>Developers and channel partners</strong> of the project you
          enquired about, so they can assist you.
        </li>
        <li>
          <strong>Service providers</strong> who help us run the website, such
          as hosting, database, file storage and email delivery services. They
          may only use your data to provide their service to us.
        </li>
        <li>
          <strong>Authorities</strong> when required by law, court order or
          government request.
        </li>
      </ul>

      <h2 className="h4 mt-4">5. Third-Party Services</h2>
      <p>
        Our website uses third-party services, for example Google (for reviews
        and maps) and OpenStreetMap (for map tiles). These services may receive
        technical data such as your IP address when the content loads. Their use
        of data is covered by their own privacy policies.
      </p>

      <h2 className="h4 mt-4">6. Cookies</h2>
      <p>
        Cookies are small files stored on your device. We use them to keep the
        website working properly and to understand how visitors use it. You can
        block or delete cookies in your browser settings, but some parts of the
        website may not work correctly.
      </p>

      <h2 className="h4 mt-4">7. How Long We Keep Your Data</h2>
      <p>
        We keep your information only as long as needed for the purpose it was
        collected, or as required by law. After that, we delete it or make it
        anonymous.
      </p>

      <h2 className="h4 mt-4">8. Data Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your
        information, such as secure connections (HTTPS) and restricted access to
        our systems. However, no method of transmission over the internet is
        100% secure, so we cannot guarantee absolute security.
      </p>

      <h2 className="h4 mt-4">9. Children</h2>
      <p>
        This website is not meant for people under 18 years of age. We do not
        knowingly collect personal information from children.
      </p>

      <h2 className="h4 mt-4">10. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Ask what personal information we hold about you</li>
        <li>Ask us to correct wrong or incomplete information</li>
        <li>Ask us to delete your information</li>
        <li>Withdraw your consent or stop calls/messages from us</li>
        <li>Make a complaint about how we handle your data</li>
      </ul>
      <p>
        To use any of these rights, email us at {COMPANY.email}. We will reply
        within a reasonable time.
      </p>

      {/* <h2 className="h4 mt-4">11. Grievance Officer</h2>
      <p>
        Name: {COMPANY.grievanceOfficer}
        <br />
        Email: {COMPANY.email}
        <br />
        Phone: {COMPANY.phone}
      </p> */}

      <h2 className="h4 mt-4">11. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The latest version will
        always be on this page with the updated date. Please also read our{" "}
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>

      <h2 className="h4 mt-4">12. Contact Us</h2>
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

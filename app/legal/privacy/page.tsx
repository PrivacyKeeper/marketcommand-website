import type { Metadata } from 'next'
import { LegalLayout } from '../legal-layout'

export const metadata: Metadata = {
  title: 'Privacy Policy — MarketCommand',
  description: 'MarketCommand Privacy Policy.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 4, 2026">
      <p>
        MarketCommand (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), operated by Apps 1 LLC, respects your
        privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        <strong>Information you provide:</strong> name, email, phone number, business or market name, billing
        details, vendor or organizer profile information, uploaded documents (insurance, permits, licenses), and any
        content you submit through the Service.
      </p>
      <p>
        <strong>Usage data:</strong> log data, device information, IP address, browser type, pages viewed,
        application interactions, and approximate location (when permitted).
      </p>
      <p>
        <strong>Cookies &amp; similar technologies:</strong> we use cookies and similar technologies to keep you
        signed in, remember preferences, and measure performance.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your information to: (a) provide, operate, and improve the Service; (b) process subscriptions and
        per-event fees; (c) facilitate communication between organizers and vendors; (d) send transactional and
        product notifications; (e) prevent fraud and abuse; (f) comply with legal obligations.
      </p>
      <p>We do not sell your personal information.</p>

      <h2>3. Sharing of Information</h2>
      <p>
        We share information only with: (a) service providers acting on our behalf (hosting, payments, email,
        analytics); (b) other users where you have chosen to share it (e.g. organizers can see vendor applications
        submitted to their market); (c) authorities, where required by law or to protect rights, safety, or
        property; (d) successors in connection with a merger, acquisition, or sale of assets, subject to equivalent
        privacy protections.
      </p>

      <h2>4. Data Storage &amp; Security</h2>
      <p>
        Data is stored on secure cloud infrastructure with industry-standard encryption in transit and at rest.
        While we use reasonable safeguards, no method of transmission or storage is completely secure. You are
        responsible for keeping your account credentials confidential.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain your information for as long as your account is active or as needed to provide the Service. You
        may request deletion of your account at any time. We will delete personal data within 30 days of an
        account-deletion request, except where retention is required by law (e.g. tax records) or for the
        establishment, exercise, or defense of legal claims.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on where you live, you may have the right to: access the personal information we hold about you,
        correct inaccurate data, request deletion, object to or restrict processing, withdraw consent, and request
        portability of your data. To exercise any of these rights, contact us at{' '}
        <a href="mailto:support@marketcommand.pro">support@marketcommand.pro</a>.
      </p>

      <h2>7. EU/UK Users (GDPR)</h2>
      <p>
        If you are in the European Economic Area or the United Kingdom, you have the rights described above and
        the right to lodge a complaint with your local data protection authority. Our legal bases for processing
        are: performance of a contract (to provide the Service), legitimate interests (to operate and improve the
        Service and prevent abuse), consent (where required), and compliance with legal obligations.
      </p>

      <h2>8. California Users (CCPA/CPRA)</h2>
      <p>
        California residents may request to know what personal information we have collected, delete it, or
        correct it, and may opt out of any &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. We
        do not sell personal information.
      </p>

      <h2>9. Canadian Users (PIPEDA)</h2>
      <p>
        Canadian residents may access, correct, or withdraw consent (subject to legal restrictions) for the
        processing of their personal information, and may file a complaint with the Office of the Privacy
        Commissioner of Canada.
      </p>

      <h2>10. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in the United States or other countries where we or our
        service providers operate. By using the Service you consent to such transfers. Where required, we put
        appropriate safeguards in place.
      </p>

      <h2>11. Children&rsquo;s Privacy</h2>
      <p>
        MarketCommand is not intended for children under 18. We do not knowingly collect personal information from
        children. If we discover that we have collected such data, we will delete it promptly.
      </p>

      <h2>12. Third-Party Links</h2>
      <p>
        The Service may contain links to third-party websites or services. Their privacy practices are governed by
        their own policies, which we do not control or endorse.
      </p>

      <h2>13. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be communicated through the
        Service or by email. Continued use of the Service after changes take effect constitutes acceptance of the
        updated policy.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        For privacy-related questions or requests:{' '}
        <a href="mailto:support@marketcommand.pro">support@marketcommand.pro</a>
      </p>
    </LegalLayout>
  )
}

import type { Metadata } from 'next'
import { LegalLayout } from '../legal-layout'

export const metadata: Metadata = {
  title: 'Terms of Service — MarketCommand',
  description: 'MarketCommand Terms of Service.',
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 4, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using MarketCommand (the &ldquo;Service&rdquo;), operated by Apps 1 LLC, you agree to be bound
        by these Terms of Service. If you do not agree, do not use the Service.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old to create an account, subscribe to a plan, or list a market or booth on
        MarketCommand. By using the Service, you represent and warrant that you meet this requirement and have the
        legal authority to bind any organization on whose behalf you act.
      </p>

      <h2>3. Account Responsibility</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for all activity that
        occurs under your account. Notify us immediately of any unauthorized access or security breach.
      </p>

      <h2>4. The Service</h2>
      <p>
        MarketCommand provides software tools for market organizers and vendors, including booth mapping, vendor
        applications, document collection, payment coordination, and event management. We are a software provider
        only — we do not operate, sponsor, or guarantee any market, event, or transaction listed on the platform.
      </p>

      <h2>5. Plans &amp; Fees</h2>
      <p>
        <strong>Vendors:</strong> Use of the Service is free for vendors. Standard payment processor fees may apply
        to any transactions you process through third-party payment providers.
      </p>
      <p>
        <strong>Organizers:</strong> Organizers pay a flat monthly subscription of $59 USD plus a per-vendor,
        per-event-day fee of $2.50 USD. The per-vendor fee is collected by the organizer from each participating
        vendor and remitted to MarketCommand. Subscriptions auto-renew until cancelled. Pricing may change with 30
        days&rsquo; notice.
      </p>

      <h2>6. User Content</h2>
      <p>
        You retain ownership of any content you upload (logos, photos, listings, vendor documents, market details).
        By submitting content you grant MarketCommand a worldwide, non-exclusive, royalty-free license to host,
        display, and process that content for the sole purpose of operating the Service. You agree not to upload
        content that is illegal, infringing, defamatory, harmful, or misleading.
      </p>

      <h2>7. Vendor &amp; Organizer Responsibilities</h2>
      <p>
        Organizers are solely responsible for the operation, safety, permitting, and legal compliance of their
        markets and events. Vendors are solely responsible for their products, services, licenses, insurance, and
        compliance with applicable health, tax, and business laws. MarketCommand is not a party to any agreement
        between organizers and vendors.
      </p>

      <h2>8. Documents &amp; Compliance</h2>
      <p>
        MarketCommand provides tools to collect and store documents (insurance certificates, permits, licenses,
        food handler cards, etc.). We do not verify, validate, or endorse the authenticity, accuracy, or current
        status of any document uploaded to the platform. Users are responsible for confirming the validity of any
        document they rely upon.
      </p>

      <h2>9. Disputes Between Users</h2>
      <p>
        MarketCommand is not responsible for disputes between organizers, vendors, customers, or any other users,
        including but not limited to booth assignments, refunds, no-shows, product quality, or in-person
        interactions. Users agree to resolve such disputes directly.
      </p>

      <h2>10. Prohibited Conduct</h2>
      <p>
        You agree not to: (a) violate any law or regulation; (b) harass, threaten, or defraud any user; (c)
        misrepresent your identity, products, or services; (d) interfere with the Service or attempt to access it by
        unauthorized means; (e) scrape, copy, or resell data from the Service. Violations may result in immediate
        suspension or termination.
      </p>

      <h2>11. Third-Party Services</h2>
      <p>
        The Service integrates with third-party providers (including payment processors, mapping services, and
        email providers). Their services are governed by their own terms and privacy policies. We are not
        responsible for the availability or performance of any third-party service.
      </p>

      <h2>12. Intellectual Property</h2>
      <p>
        MarketCommand, including its name, logo, design, software, and content (excluding User Content), is the
        property of Apps 1 LLC and is protected by intellectual property laws. You may not copy, modify, distribute,
        reverse engineer, or create derivative works without our prior written consent.
      </p>

      <h2>13. Disclaimer of Warranties</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
        express or implied. We do not warrant that the Service will be uninterrupted, error-free, secure, or meet
        your specific requirements.
      </p>

      <h2>14. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, MarketCommand and Apps 1 LLC shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or
        goodwill, arising from your use of the Service. Our total liability for any claim shall not exceed the
        amount you paid us in the twelve (12) months preceding the claim.
      </p>

      <h2>15. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Apps 1 LLC, MarketCommand, and their officers, employees, and
        affiliates from any claims, damages, losses, or expenses (including reasonable attorneys&rsquo; fees)
        arising from your use of the Service, your User Content, or your violation of these Terms.
      </p>

      <h2>16. Termination</h2>
      <p>
        We may suspend or terminate your account at any time for violation of these Terms or for any other reason
        at our sole discretion. You may cancel your account at any time through your account settings or by
        contacting support. Upon termination, your right to use the Service ceases immediately.
      </p>

      <h2>17. Modifications</h2>
      <p>
        We may update these Terms from time to time. Material changes will be communicated through the Service or
        by email. Continued use of the Service after changes take effect constitutes acceptance of the updated
        Terms.
      </p>

      <h2>18. Governing Law &amp; Dispute Resolution</h2>
      <p>
        These Terms are governed by the laws of the State of Wyoming, USA, without regard to its conflict of laws
        principles. Any dispute arising from these Terms or the Service shall be resolved through binding
        individual arbitration. You waive any right to participate in a class action or class-wide arbitration.
      </p>

      <h2>19. Severability</h2>
      <p>
        If any provision of these Terms is held to be unenforceable, the remaining provisions will continue in full
        force and effect.
      </p>

      <h2>20. Entire Agreement</h2>
      <p>
        These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between
        you and MarketCommand regarding the Service.
      </p>

      <h2>21. Contact</h2>
      <p>
        Questions about these Terms?{' '}
        <a href="mailto:support@marketcommand.pro">support@marketcommand.pro</a>
      </p>
    </LegalLayout>
  )
}

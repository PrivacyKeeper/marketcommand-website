import type { Metadata } from 'next'
import { LegalLayout } from '../legal-layout'

export const metadata: Metadata = {
  title: 'Refund Policy — MarketCommand',
  description: 'MarketCommand Refund Policy.',
}

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="May 4, 2026">
      <p>
        This Refund Policy describes when and how refunds may be issued for MarketCommand subscription fees and
        per-event vendor fees. By subscribing to or using MarketCommand, operated by Apps 1 LLC, you agree to this
        policy.
      </p>

      <h2>1. Vendor Accounts</h2>
      <p>
        Vendor accounts on MarketCommand are free. There are no subscription fees to refund. Any per-event vendor
        fees collected by an organizer are subject to the organizer&rsquo;s own policy — contact the organizer
        directly for any refund related to event participation.
      </p>

      <h2>2. Organizer Subscriptions</h2>
      <p>
        Organizer subscriptions are billed monthly at $59 USD per organizer account. Subscriptions auto-renew at
        the end of each billing cycle until cancelled.
      </p>
      <p>
        <strong>14-day money-back guarantee:</strong> First-time organizer subscribers may request a full refund
        of their first month&rsquo;s subscription fee within 14 days of the initial charge, provided no live
        market has been hosted using the account during that period.
      </p>
      <p>
        <strong>After 14 days:</strong> Monthly subscription fees are non-refundable. You may cancel at any time;
        cancellation stops future renewals but does not retroactively refund the current billing cycle. Your
        organizer account will remain active until the end of the paid period.
      </p>

      <h2>3. Per-Vendor Event Fees</h2>
      <p>
        MarketCommand charges organizers a $2.50 USD per-vendor, per-event-day fee. This fee is collected by the
        organizer from each participating vendor and remitted to MarketCommand for each confirmed vendor day.
      </p>
      <p>
        Per-vendor fees are non-refundable once the corresponding event day has been processed in the platform.
        If a vendor cancels before the event day is processed, the corresponding fee will not be charged. Refunds
        of any vendor-side payment are the responsibility of the organizer, not MarketCommand.
      </p>

      <h2>4. Service Issues &amp; Goodwill Refunds</h2>
      <p>
        If a confirmed billing error, duplicate charge, or substantial Service outage prevents you from using
        MarketCommand, contact us within 30 days of the charge. We will review the situation in good faith and may
        issue a prorated or full refund at our discretion.
      </p>

      <h2>5. Cancellation</h2>
      <p>
        You may cancel your organizer subscription at any time through your account settings or by contacting
        support. Cancellation takes effect at the end of the current billing cycle. No partial-month refunds are
        provided for unused time except as set out above.
      </p>

      <h2>6. How to Request a Refund</h2>
      <p>
        To request a refund, email{' '}
        <a href="mailto:support@marketcommand.pro">support@marketcommand.pro</a> from the email address associated
        with your MarketCommand account, including your account name, the charge date, and a brief reason for the
        request. We aim to respond within 5 business days.
      </p>

      <h2>7. Payment Method</h2>
      <p>
        Approved refunds are issued to the original payment method. Processing time depends on your bank or card
        issuer (typically 5&ndash;10 business days). Refunds are issued in the original currency of the charge;
        exchange-rate differences are not refundable.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Refund Policy from time to time. Material changes will be communicated through the
        Service or by email. Continued use of the Service after changes take effect constitutes acceptance of the
        updated policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about a charge or refund?{' '}
        <a href="mailto:support@marketcommand.pro">support@marketcommand.pro</a>
      </p>
    </LegalLayout>
  )
}

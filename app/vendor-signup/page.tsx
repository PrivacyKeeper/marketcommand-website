import type { Metadata } from 'next'
import SignupForm from '@/components/signup/signup-form'

export const metadata: Metadata = {
  title: 'Vendor Early Access | MarketCommand',
  description:
    'Join the MarketCommand early-access list for vendors. 100% free for vendors — manage applications, documents, and event bookings all in one place.',
}

export default function VendorSignupPage() {
  return <SignupForm type="vendor" />
}

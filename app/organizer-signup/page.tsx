import type { Metadata } from 'next'
import SignupForm from '@/components/signup/signup-form'

export const metadata: Metadata = {
  title: 'Organizer Early Access | MarketCommand',
  description:
    'Request early access to MarketCommand for event and market organizers. $59/month flat fee, intelligent booth mapping, automated vendor management.',
}

export default function OrganizerSignupPage() {
  return <SignupForm type="organizer" />
}

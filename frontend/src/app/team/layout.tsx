import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'

export const metadata: Metadata = {
  title: 'Meet the Team',
}

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  await requireAuth()

  return (
    <div className="min-h-screen bg-[#f7f4ea]">
      {children}
    </div>
  )
}
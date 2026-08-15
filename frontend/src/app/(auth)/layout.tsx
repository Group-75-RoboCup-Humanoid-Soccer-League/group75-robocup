import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f4ea] px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  )
}
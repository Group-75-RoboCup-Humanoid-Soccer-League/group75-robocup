'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const handleForgotPassword = () => {
    toast.info('Password reset isn’t set up yet — contact an admin for help.')
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="font-serif text-3xl text-[#8b3a3d]">Welcome back</h1>
        <p className="text-sm text-[#b56d6d]">Sign in to view team dashboard.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-[#8b3a3d]/40 focus:outline-none aria-invalid:border-red-500"
            placeholder="name@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="pl-4 text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-zinc-900">
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-zinc-500 hover:text-zinc-800 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 pr-11 text-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-[#8b3a3d]/40 focus:outline-none aria-invalid:border-red-500"
              placeholder="example123"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-[#c1524c] hover:text-[#8b3a3d]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="pl-4 text-xs text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full border border-black bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
          <div className="mx-auto h-px w-20 bg-[#c1524c]" />
        </div>
      </form>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full rounded-full border border-black bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-50"
      >
        Continue with Google
      </button>

      <p className="text-center text-sm">
        <Link href="/auth/signup" className="font-medium text-black underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  )
}
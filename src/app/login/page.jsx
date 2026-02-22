"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseclient"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handlePasswordSignIn(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)
    if (error) {
      setMessage(error.message)
      return
    }

    // If sign-in returned a session, navigate to admin
    if (data?.session) {
      router.push('/admin')
    } else {
      setMessage('Signed in — redirecting...')
      router.push('/admin')
    }
  }

  // Magic link removed; password reset handled via separate page

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>

      <form onSubmit={handlePasswordSignIn} className="space-y-4">
        <label className="block">
          <span className="text-sm text-white/80">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded bg-white/5 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/80">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded bg-white/5 px-3 py-2"
          />
        </label>

        <div className="flex gap-2 items-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#FFD700] text-black rounded"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <a href="/reset-password" className="ml-3 text-sm text-white/80 hover:underline">Forgot password?</a>
        </div>
      </form>

      {message && <p className="mt-4 text-sm text-white/80">{message}</p>}
    </div>
  )
}

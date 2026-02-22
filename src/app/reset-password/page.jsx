"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseclient"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleReset(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const redirectTo = `${window.location.origin}/reset-password/confirmed`
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      setLoading(false)
      if (error) {
        setMessage(error.message)
        return
      }
      setMessage('Reset email sent — check your inbox.')
    } catch (err) {
      setLoading(false)
      setMessage('Unexpected error')
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>

      <form onSubmit={handleReset} className="space-y-4">
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

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#FFD700] text-black rounded"
          >
            {loading ? 'Sending...' : 'Send reset email'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-sm text-white/80">{message}</p>}
    </div>
  )
}

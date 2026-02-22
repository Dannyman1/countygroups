"use client"

import Link from "next/link"

export default function ResetPasswordConfirmed() {
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Password Reset Requested</h1>
      <p className="mb-4 text-white/80">If an account with that email exists, you should receive a password reset email shortly. Follow the instructions in the message to complete the reset.</p>
      <Link href="/login" className="px-4 py-2 bg-[#FFD700] text-black rounded">Back to login</Link>
    </div>
  )
}

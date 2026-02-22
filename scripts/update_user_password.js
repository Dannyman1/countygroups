#!/usr/bin/env node
/*
 * Usage:
 * 1) Set env vars or pass arguments:
 *    SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be available.
 *
 * Examples:
 * SUPABASE_URL=https://hffudbcsefbryogmhcnh.supabase.co SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" node scripts/update_user_password.js d9be2704-505f-48a1-b90d-d3eb97e6972a DANNY2026
 *
 * Or with npm script:
 * NODE_ENV=production SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/update_user_password.js <userId> <newPassword>
 */

import { createClient } from '@supabase/supabase-js'

const [,, userIdArg, newPasswordArg] = process.argv

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

const userId = userIdArg
const newPassword = newPasswordArg

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment')
  process.exit(1)
}

if (!userId || !newPassword) {
  console.error('Usage: node scripts/update_user_password.js <userId> <newPassword>')
  process.exit(1)
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

  console.log(`Updating password for user: ${userId}`)
  const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(userId, { password: newPassword })
  if (updateError) {
    console.error('Failed to update password:', updateError)
    process.exit(2)
  }
  console.log('Password updated successfully')

  console.log('Revoking user sessions...')
  // Fallback: delete sessions directly from auth.sessions using service role key
  const { data: revokeData, error: revokeError } = await supabase.from('auth.sessions').delete().eq('user_id', userId)
  if (revokeError) {
    console.error('Failed to revoke sessions via auth.sessions delete:', revokeError)
    process.exit(3)
  }
  console.log('User sessions revoked')
  console.log('Done.')
}

main().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(99)
})

#!/usr/bin/env node
import bcrypt from 'bcryptjs'

const [,, password, roundsArg] = process.argv
const rounds = parseInt(roundsArg, 10) || 10

if (!password) {
  console.error('Usage: node scripts/hash_password.js <password> [saltRounds]')
  process.exit(1)
}

try {
  const hash = bcrypt.hashSync(password, rounds)
  console.log(hash)
} catch (err) {
  console.error('Hashing failed:', err)
  process.exit(2)
}

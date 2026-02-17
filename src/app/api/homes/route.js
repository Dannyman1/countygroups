import { NextResponse } from 'next/server'
import homes from '../../../data/homes'

export function GET(req) {
  try {
    const url = new URL(req.url)
    const state = url.searchParams.get('state')
    const category = url.searchParams.get('category')
    const countParam = url.searchParams.get('count')
    const count = countParam ? parseInt(countParam, 10) : (category === 'top' ? 5 : 8)

    let results = homes
    if (state) {
      results = results.filter(h => h.state.toLowerCase() === state.toLowerCase())
    }
    if (category) {
      results = results.filter(h => h.category === category)
    }

    return NextResponse.json(results.slice(0, count))
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

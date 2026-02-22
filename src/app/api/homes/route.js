import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseclient'

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const state = url.searchParams.get('state')
    const category = url.searchParams.get('category')
    const countParam = url.searchParams.get('count')
    const search = url.searchParams.get('search')
    const count = countParam ? parseInt(countParam, 10) : (category === 'top' ? 5 : 8)

    let sb = supabase.from('homes').select('*')

    if (state) sb = sb.ilike('state', state)
    if (category) sb = sb.eq('category', category)
    if (search) {
      const term = `%${search}%`
      sb = sb.or(`name.ilike.${term},address.ilike.${term},state.ilike.${term}`)
    }

    const { data, error } = await sb
    if (error) throw error

    const results = (data || []).slice(0, count)
    return NextResponse.json(results)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

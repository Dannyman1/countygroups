import { supabase } from '@/lib/supabaseclient'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}

	const { full_name, email, phone, message, property_id, amount } = req.body || {}

	if (!full_name || !email || !property_id) {
		return res.status(400).json({ error: 'Missing required fields: full_name, email, property_id' })
	}

	try {
		const { data, error } = await supabase
			.from('orders')
			.insert([
				{ full_name, email, phone: phone || null, message: message || null, property_id, amount: amount || null },
			])
			.select()
			.single()

		if (error) return res.status(400).json({ error: error.message })

		return res.status(201).json({ order: data })
	} catch (err) {
		return res.status(500).json({ error: err.message || 'Internal server error' })
	}
}
"use client"

import { useState } from "react";

export default function ContactModal({ open, onClose, home, action }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!open || !home) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    // Build payload expected by the Supabase Edge Function
    const propertyId = home.id ?? home._id ?? null;
    const rawPrice = typeof home.price === 'string' ? home.price.replace(/[^0-9.]/g, '') : String(home.price || '0');
    const amount = Number(rawPrice) || 0;

    const payload = {
      full_name: name || null,
      email: email || null,
      phone: phone || null,
      message: `User selected ${action} for ${home.title || home.name}`,
      property_id: propertyId,
      amount: amount,
      items: [
        { property_id: propertyId, title: home.title || home.name }
      ],
    };

    try {
      const fnUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-order`;
      const res = await fetch(fnUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage(data?.error || 'Failed to submit order');
        setSubmitting(false);
        return;
      }

      setMessage('Order submitted — we will contact you shortly');
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      setMessage('Unexpected error submitting order');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <form onSubmit={handleSubmit} className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-semibold mb-2">{action} — {home.title || home.name}</h3>
        <p className="text-sm text-stone-600 mb-4">Enter contact details and submit an order for this property.</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full border rounded-md p-2 mb-3"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          className="w-full border rounded-md p-2 mb-3"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          className="w-full border rounded-md p-2 mb-3"
        />

        {message && <div className="mb-3 text-sm text-stone-700">{message}</div>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
          <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-green-600 text-white">
            {submitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
      </form>
    </div>
  );
}

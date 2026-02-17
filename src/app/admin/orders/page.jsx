'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseclient'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    supabase
      .from('orders')
      .select('*, properties(title)')
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders(data || []))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Customer Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="border p-4 rounded mb-3">
          <p><b>Name:</b> {order.full_name}</p>
          <p><b>Email:</b> {order.email}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Product:</b> {order.properties?.title}</p>
          <p><b>Message:</b> {order.message}</p>
        </div>
      ))}
    </div>
  )
}

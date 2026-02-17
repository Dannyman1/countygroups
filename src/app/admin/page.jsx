'use client'
import Link from 'next/link'

export default function AdminIndex() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="p-6 bg-white/5 rounded hover:shadow-lg transition block">
          <h3 className="font-medium mb-2">Manage Products</h3>
          <p className="text-sm text-white/80">Add / delete products and images</p>
        </Link>

        <Link href="/admin/orders" className="p-6 bg-white/5 rounded hover:shadow-lg transition block">
          <h3 className="font-medium mb-2">View Orders</h3>
          <p className="text-sm text-white/80">See customer orders</p>
        </Link>
      </div>
    </div>
  )
}

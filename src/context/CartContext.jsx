"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setCart(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      // ignore
    }
  }, [cart])

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) {
        return prev.map(i => (i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

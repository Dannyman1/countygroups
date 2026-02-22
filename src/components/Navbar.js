"use client"

import { useState } from "react"
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, User, Instagram, Facebook, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function Navbar() {
  const pathname = usePathname()
  if (pathname && pathname.startsWith('/admin')) return null
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Desktop / Mobile Bar */}
      <div className="backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-lg md:text-2xl font-extrabold tracking-wide text-[#FFD700]">
            COUNTYGROUPS
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm md:text-base">
            <Link href="/" className="text-white/90 hover:text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Home</Link>
            <Link href="/homes" className="text-white/90 hover:text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Listings</Link>
            <Link href="/about" className="text-white/90 hover:text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">About</Link>
            <Link href="/login" className="text-white/90 hover:text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Login</Link>

            <button className="p-2 rounded-md text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-md text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">
              <User className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <button className="p-2.5 rounded-md text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30" aria-label="Favorites">
              <Heart className="w-5 h-5" />
            </button>
            <button
              className="p-2.5 rounded-md text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30"
              onClick={() => setOpen(true)}
              aria-label="Open Menu"
              aria-expanded={open}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full w-full sm:w-[85%] max-w-sm bg-black text-white z-50 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-[#FFD700]">COUNTYGROUPS</span>
                <button onClick={() => setOpen(false)} className="icon-btn">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-lg">
                <Link onClick={() => setOpen(false)} href="/" className="py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Home</Link>
                <Link onClick={() => setOpen(false)} href="/homes" className="py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Listings</Link>
                <Link onClick={() => setOpen(false)} href="/about" className="py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">About</Link>
                <Link onClick={() => setOpen(false)} href="/login" className="py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Login</Link>
                <Link onClick={() => setOpen(false)} href="#" className="py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30">Contact</Link>
              </nav>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-4">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  <SocialIcon icon={Instagram} />
                  <SocialIcon icon={Facebook} />
                  <SocialIcon icon={Linkedin} />
                </div>
              </div>
            </motion.aside>

            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function SocialIcon({ icon: Icon }) {
  return (
    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FFD700] hover:text-[#FFD700] transition">
      <Icon className="w-5 h-5" />
    </button>
  )
}

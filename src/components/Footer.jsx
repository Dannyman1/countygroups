import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="bg-[#06070a] text-white/90 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="text-2xl font-semibold tracking-tight">Orange County Groups</div>
            <p className="mt-3 text-sm text-white/80 max-w-sm">A boutique real estate firm delivering thoughtful listings, white-glove service, and lasting relationships across premier U.S. markets.</p>
            <p className="mt-4 text-xs text-white/60">Trusted by 1,200+ homeowners</p>
          </div>

          <nav className="md:col-span-2">
            <h4 className="text-sm font-medium mb-3">Contact</h4>
            <address className="not-italic text-sm text-white/80 space-y-2">
              <div>Phone: <a href="tel:+1234567890" className="text-white/90 hover:text-amber-300 transition-colors">(123) 456-7890</a></div>
              <div>Email: <a href="mailto:hello@countygroups.com" className="text-white/90 hover:text-amber-300 transition-colors">hello@countygroups.com</a></div>
              <div>Hours: Mon–Fri, 9am–6pm</div>
            </address>
          </nav>

          <div className="md:col-span-3">
            <h4 className="text-sm font-medium mb-3">Locations</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Los Angeles, CA</li>
              <li>Austin, TX</li>
              <li>New York, NY</li>
              <li>Miami, FL</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-medium mb-3">Follow</h4>
            <div className="flex items-center gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded hover:bg-white/6 transition-all">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
                  <path d="M349.33 69.33H162.67C103.3 69.33 56 116.63 56 175.99v186.69c0 59.37 47.3 106.66 106.67 106.66h186.66c59.37 0 106.67-47.29 106.67-106.66V175.99c0-59.36-47.3-106.66-106.67-106.66zM256 346.67c-49.38 0-89.33-39.95-89.33-89.33S206.62 168 256 168s89.33 39.95 89.33 89.33S305.38 346.67 256 346.67zM370.67 154.67a20 20 0 1 1 0-40 20 20 0 0 1 0 40z" />
                </svg>
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded hover:bg-white/6 transition-all">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8.4v-2.9h2.1V9.4c0-2.1 1.3-3.2 3.1-3.2.9 0 1.8.1 2 .1v2.3h-1.2c-1 0-1.3.6-1.3 1.2v1.6h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 rounded hover:bg-white/6 transition-all">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 3v10.4A4.6 4.6 0 1 0 16.6 18V8h3V5h-3V3h-4z" />
                </svg>
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded hover:bg-white/6 transition-all">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.9h4v12H3v-12zM9 8.9h3.7v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.6v6.6H19v-5.8c0-1.4 0-3.2-2-3.2-2 0-2.3 1.5-2.3 3v6h-4v-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/6 pt-6 text-sm text-white/60 flex flex-col md:flex-row md:justify-between gap-4">
          <div>© {new Date().getFullYear()} Orange County Groups. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/90">Privacy</Link>
            <Link href="#" className="hover:text-white/90">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

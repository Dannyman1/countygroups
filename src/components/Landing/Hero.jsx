import React from 'react'
import SearchBar from './SearchBar'

export default function Hero() {
  const bgUrl = "https://res.cloudinary.com/duovgx8fv/image/upload/w_2400,q_auto,f_auto,dpr_auto/v1770369612/download_16_sb9uk6.jpg"
  return (
    <section
      className="relative w-full flex items-center min-h-[60vh] sm:min-h-[72vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(6,8,12,0.45), rgba(6,8,12,0.42)), url('${bgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0" aria-hidden />
      <div className="container mx-auto relative z-10 px-6">
        <div className="glass-container max-w-4xl mx-auto text-white text-center">
          <h1 className="luxury-h1 text-2xl sm:text-3xl md:text-4xl mb-4">Welcome To Orange County</h1>
          <p className="luxury-lead text-lg sm:text-xl max-w-3xl mx-auto mb-6">An elevated real estate experience helping you discover exceptional properties with confidence, discretion, and premium service.</p>

          <div className="rounded-lg p-4 sm:p-6 mt-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from 'framer-motion'

export default function AboutPage(){
  return (
    <div className="hero-bg">
      <div className="hero-overlay" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-container max-w-4xl mx-6 sm:mx-8 lg:mx-0"
        style={{ margin: '3.5rem auto' }}
      >
        <div className="text-center">
          <h1 className="luxury-h1 text-2xl sm:text-3xl md:text-4xl text-white mb-4">Orange County Groups</h1>
          <p className="luxury-lead text-lg sm:text-xl max-w-3xl mx-auto mb-6">Trusted luxury real estate guidance — nationwide listings, bespoke service, and an unyielding commitment to excellence.</p>
        </div>

        <div className="prose prose-invert text-white/90 dark:prose-invert space-y-4">
          <p>
            Orange County Groups is a distinguished real estate platform designed for those who value quality, clarity, and confidence when searching for homes across the United States. We curate and present homes for sale across multiple regions, offering a refined digital experience that brings property discovery and decision-making into one seamless space.
          </p>

          <p>
            Our platform is built around the belief that real estate is more than transactions, it is about lifestyle, aspiration and long-term value. Every listing showcased through Orange County Groups is thoughtfully presented to highlight its unique character, location and potential, allowing visitors to explore properties with depth, transparency and ease.
          </p>

          <p>
            By unifying home listings from various regions of the United States, Orange County Groups serves as a trusted gateway for buyers, investors, and explorers seeking exceptional homes without unnecessary complexity. From emerging neighborhoods to established residential areas, our platform is structured to help users navigate opportunities with confidence and clarity.
          </p>

          <p>
            We focus on delivering an experience that feels both modern and reassuring, where intuitive design meets accurate information and where every detail supports informed decision-making. Whether you are searching for your next home, expanding your investment portfolio or simply exploring what different regions have to offer, Orange County Groups provides a polished and dependable environment tailored to your journey.
          </p>

          <p>
            At Orange County Groups, our commitment is simple: to present real estate with integrity, elegance and purpose, helping you move closer to the place you are proud to call home.
          </p>

          {/* UI / UX Guidelines section removed per request */}
        </div>
      </motion.div>
    </div>
  )
}

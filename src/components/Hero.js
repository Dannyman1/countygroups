"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white overflow-hidden">
      
      {/* Background Accent with Zoom Effect */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%)]"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl w-full px-6"
      >
        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-semibold leading-tight text-center">
          Find the <span className="text-orange-500">best homes</span><br />
          across top locations
        </h1>

        <p className="mt-4 text-center text-neutral-300 max-w-2xl mx-auto">
          Search thousands of verified listings with our advanced IDX search. Get instant access to market insights and connect with top agents.
        </p>

        {/* IDX Search Card with Zoom Effect */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by address, city, state, or ZIP code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 text-neutral-900 bg-transparent border-0 focus:outline-none text-base sm:text-lg placeholder:text-neutral-400"
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 hover:bg-orange-700 transition-all rounded-xl text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl"
            >
              Search
            </motion.button>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-2 px-2">
            <button
              type="button"
              onClick={() => setSearchQuery("New York")}
              className="px-4 py-1.5 text-sm bg-neutral-100 hover:bg-orange-100 text-neutral-700 hover:text-orange-600 rounded-full transition-colors"
            >
              New York
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery("Los Angeles")}
              className="px-4 py-1.5 text-sm bg-neutral-100 hover:bg-orange-100 text-neutral-700 hover:text-orange-600 rounded-full transition-colors"
            >
              Los Angeles
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery("Miami")}
              className="px-4 py-1.5 text-sm bg-neutral-100 hover:bg-orange-100 text-neutral-700 hover:text-orange-600 rounded-full transition-colors"
            >
              Miami
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery("Chicago")}
              className="px-4 py-1.5 text-sm bg-neutral-100 hover:bg-orange-100 text-neutral-700 hover:text-orange-600 rounded-full transition-colors"
            >
              Chicago
            </button>
          </div>
        </motion.form>

        {/* Trust Indicators with Animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-neutral-400"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            2,500+ Active Listings
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            Real-Time Market Data
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            Instant Agent Connect
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

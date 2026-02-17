import Hero from '@/components/Landing/Hero'
import FeaturedListings from '@/components/Landing/FeaturedListings'
import Categories from '@/components/Landing/Categories'
import Benefits from '@/components/Landing/Benefits'
import Testimonials from '@/components/Landing/Testimonials'
import LeadForm from '@/components/Landing/LeadForm'
import Agents from '@/components/Landing/Agents'

export default function Home(){
  return (
    <main className="bg-[#0b1220] text-white min-h-screen">
      <Hero />
      <FeaturedListings />
      <Categories />
      <Benefits />
      <Testimonials />
      <Agents />
      <LeadForm />
    </main>
  )
}

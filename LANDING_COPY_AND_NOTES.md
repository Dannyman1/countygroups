COUNTYGROUPS — Landing Page Content Outline & UX Notes

1. Header & Navigation
- Logo placeholder: COUNTYGROUPS (uppercase, bold, #FFD700)
- Menu links: Home | Listings | About Us | Contact
- CTA button: Get Property Alerts (bright gold, #FFD700) placed top-right on desktop

2. Hero Section
- Headline: 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐓𝐨 𝐎𝐫𝐚𝐧𝐠𝐞 𝐂𝐨𝐮𝐧𝐭𝐲
- Subheading: Discover curated luxury homes with virtual tours, expert agents, and market insight.
- Background: Cloudinary image (cover, center) with dark overlay (40%) for contrast.
- CTA: Primary — View Listings; Secondary — Request a Tour
- UX notes: Center-aligned content; large headline; search card visible and accessible; hero height: 540px (desktop), 360px (mobile)

3. Problem / Value Proposition
- Short paragraph: "Finding the perfect home in Orange County is competitive. COUNTYGROUPS simplifies your search with expert agents, exclusive listings, and a guided buying process." 
- Value bullets: Local expertise, curated listings, virtual tours, transparent process.

4. Featured Properties
- Show 4–6 curated properties (video carousel in place if available). Each card: image/video, title, location, price, short bullets (beds, baths, sqft), and CTA "View Details".
- Accessibility: alt text for images; play/pause controls for video.

5. Benefits & Features
- 6 benefit tiles with a short icon and 1-line descriptions (Local Expertise, Virtual Tours, Fast Response, Trusted Process, Pro Marketing, Full Support)
- Layout: responsive grid; concise copy to scan quickly.

6. Social Proof / Testimonials
- 3 quotes with client names; optionally star rating and city.
- Add trust badges (MLS, local association, awards).

7. Lead Capture / Conversion
- Title: "Get Property Alerts & Free Buying Guide"
- Form: Name, Email, Phone; CTA: "Get Alerts" (gold)
- Offer: free buying guide PDF via email + curated alerts.
- UX: simple, single-step form; show success message and next steps.

8. Community Spotlight
- Short blocks for neighborhoods: Why people love it, commute, schools, top streets.
- CTA to explore neighborhood pages.

9. Agents / Team
- 2–4 agent bios with photo, title, and one-line specialty.
- CTA: "Meet the Team" or "Book a Viewing"

10. Footer
- Contact: address, phone, email
- Links: Home, Listings, About, Contact, Privacy, Terms
- Social icons, newsletter signup

SEO Metadata
- Title tag: COUNTYGROUPS — Orange County Luxury Homes & Curated Listings
- Meta description: COUNTYGROUPS helps you find luxury homes in Orange County. Browse curated listings, virtual tours, and work with experienced local agents.
- H1 (Hero): 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐓𝐨 𝐎𝐫𝐚𝐧𝐠𝐞 𝐂𝐨𝐮𝐧𝐭𝐲
- Key headings: Featured Listings, Why Choose Us, Testimonials, Get Property Alerts
- Suggested keywords: Orange County homes, luxury homes Orange County, Orange County real estate, virtual home tours

UI/UX Implementation Notes
- Color palette: Cozy ash background (#2b2b2b), Bright gold accents (#FFD700), white typography.
- Use large CTAs with high contrast; primary buttons gold with black text.
- Mobile: collapse nav to hamburger; hero height reduce; search card stacked.
- Performance: use optimized images and video formats (MP4, WebM), lazy-load offscreen media.
- Accessibility: high contrast, aria-labels for controls, keyboard focus states.

How I modified the codebase (implemented):
- Added components: Benefits, Testimonials, LeadForm, Agents
- Hero background set to provided Cloudinary image
- Video carousel added to FeaturedListings (shows `video` property if present)
- Navbar color and brand updated to bright gold and uppercase
- Site metadata updated in `src/app/layout.js`

Next steps I can run for you:
- Add real video/image assets into `/public/videos` and `/public/images` and wire them
- Add Google Fonts and adjust typography
- Run `npm run dev` to preview live and iterate

Copy snippets ready to paste into templates are in this file. Replace placeholders and assets as needed.

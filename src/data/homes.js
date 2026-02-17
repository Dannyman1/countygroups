const homes = [
  {
    id: 1,
    state: "California",
    name: "Sunset Ridge Estate",
    address: "2458 Ocean View Dr, Los Angeles, CA",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    images: [
      "https://res.cloudinary.com/duovgx8fv/image/upload/v1770307296/2-Bedroom_Transitional_House_Plan_with_a_2-Car_Garage_and_RV_Bay_ev4haa.jpg",
      "/images/ca/ca1-1.jpg",
      "/images/ca/ca1-2.jpg",
      "/images/ca/ca1-3.jpg"
    ],
    video: "/videos/ca1.mp4",
    tag: "Luxury"
  },

  {
    id: 2,
    state: "California",
    name: "Pacific Modern Villa",
    address: "9821 Palm Crest Ave, San Diego, CA",
    price: "$980,000",
    beds: 3,
    baths: 2,
    images: [
      "https://res.cloudinary.com/duovgx8fv/image/upload/v1770307294/Color_Harmony_Palettes___Curated_Whole_House_Paint_Palettes_for_Timeless_Trendy_Homes___Perfect_mtxchs.jpg",
      "/images/ca/ca2-1.jpg",
      "/images/ca/ca2-2.jpg",
      "/images/ca/ca2-3.jpg"
    ],
    video: "/videos/ca2.mp4",
    tag: "Featured"
  },

  {
    id: 3,
    state: "California",
    name: "Hollywood Hills Home",
    address: "4112 Summit Way, Hollywood, CA",
    price: "$1,480,000",
    beds: 5,
    baths: 4,
    images: [
      "https://res.cloudinary.com/duovgx8fv/image/upload/v1770307290/download_3_tltbmy.jpg",
      "/images/ca/ca3-1.jpg",
      "/images/ca/ca3-2.jpg",
      "/images/ca/ca3-3.jpg"
    ],
    video: "/videos/ca3.mp4",
    tag: "Hot Deal"
  },

  {
    id: 4,
    state: "Texas",
    name: "Lone Star Family Home",
    address: "732 Ranch Valley Rd, Austin, TX",
    price: "$620,000",
    beds: 4,
    baths: 3,
    images: [
      "https://res.cloudinary.com/duovgx8fv/image/upload/v1770305939/luxuryhouses_luxurymansions_mia8fj.jpg",
      "/images/tx/tx1-1.jpg",
      "/images/tx/tx1-2.jpg",
      "/images/tx/tx1-3.jpg"
    ],
    video: "/videos/tx1.mp4",
    tag: "Best Value"
  },

  {
    id: 5,
    state: "Texas",
    name: "Austin Heights Modern",
    address: "1190 Cedar Park Ln, Austin, TX",
    price: "$710,000",
    beds: 3,
    baths: 2,
    images: [
      "https://res.cloudinary.com/duovgx8fv/image/upload/v1770305927/download_odk8qz.jpg",
      "/images/tx/tx2-1.jpg",
      "/images/tx/tx2-2.jpg",
      "/images/tx/tx2-3.jpg"
    ],
    tag: "New Listing"
  },

  {
    id: 6,
    state: "Texas",
    name: "Dallas Executive Estate",
    address: "5401 Preston Hollow Rd, Dallas, TX",
    price: "$1,150,000",
    beds: 5,
    baths: 4,
    images: [
      "/images/tx/tx3-1.jpg",
      "/images/tx/tx3-2.jpg",
      "/images/tx/tx3-3.jpg"
    ],
    tag: "Luxury"
  },

  {
    id: 7,
    state: "New York",
    name: "Manhattan Skyline Condo",
    address: "88 Hudson St, New York, NY",
    price: "$1,850,000",
    beds: 3,
    baths: 2,
    images: [
      "/images/ny/ny1-1.jpg",
      "/images/ny/ny1-2.jpg",
      "/images/ny/ny1-3.jpg"
    ],
    tag: "Featured"
  },

  {
    id: 8,
    state: "New York",
    name: "Brooklyn Townhouse",
    address: "214 Maple St, Brooklyn, NY",
    price: "$1,120,000",
    beds: 4,
    baths: 3,
    images: [
      "/images/ny/ny2-1.jpg",
      "/images/ny/ny2-2.jpg",
      "/images/ny/ny2-3.jpg"
    ],
    tag: "Hot Deal"
  },

  {
    id: 9,
    state: "New York",
    name: "Queens Garden Home",
    address: "67-12 Rose Ave, Queens, NY",
    price: "$890,000",
    beds: 3,
    baths: 2,
    images: [
      "/images/ny/ny3-1.jpg",
      "/images/ny/ny3-2.jpg",
      "/images/ny/ny3-3.jpg"
    ],
    tag: "Affordable"
  },

  {
    id: 10,
    state: "Florida",
    name: "Miami Beachfront Villa",
    address: "3901 Collins Ave, Miami Beach, FL",
    price: "$1,320,000",
    beds: 4,
    baths: 3,
    images: [
      "/images/fl/fl1-1.jpg",
      "/images/fl/fl1-2.jpg",
      "/images/fl/fl1-3.jpg"
    ],
    tag: "Luxury"
  },

  {
    id: 11,
    state: "Florida",
    name: "Orlando Family Retreat",
    address: "812 Lake Cypress Dr, Orlando, FL",
    price: "$540,000",
    beds: 3,
    baths: 2,
    images: [
      "/images/fl/fl2-1.jpg",
      "/images/fl/fl2-2.jpg",
      "/images/fl/fl2-3.jpg"
    ],
    tag: "Best Value"
  },

  {
    id: 12,
    state: "Florida",
    name: "Tampa Bay Modern",
    address: "227 Harbor View Ln, Tampa, FL",
    price: "$690,000",
    beds: 4,
    baths: 3,
    images: [
      "/images/fl/fl3-1.jpg",
      "/images/fl/fl3-2.jpg",
      "/images/fl/fl3-3.jpg"
    ],
    tag: "Featured"
  },

  {
    id: 13,
    state: "Arizona",
    name: "Desert Peak Residence",
    address: "411 Red Rock Dr, Scottsdale, AZ",
    price: "$830,000",
    beds: 4,
    baths: 3,
    images: [
      "/images/az/az1-1.jpg",
      "/images/az/az1-2.jpg",
      "/images/az/az1-3.jpg"
    ],
    tag: "Luxury"
  },

  {
    id: 14,
    state: "Arizona",
    name: "Phoenix Urban Home",
    address: "920 Camelback Rd, Phoenix, AZ",
    price: "$560,000",
    beds: 3,
    baths: 2,
    images: [
      "/images/az/az2-1.jpg",
      "/images/az/az2-2.jpg",
      "/images/az/az2-3.jpg"
    ],
    tag: "New Listing"
  },

  {
    id: 15,
    state: "Arizona",
    name: "Mesa Family Estate",
    address: "1742 Sunrise Ave, Mesa, AZ",
    price: "$490,000",
    beds: 4,
    baths: 3,
    images: [
      "/images/az/az3-1.jpg",
      "/images/az/az3-2.jpg",
      "/images/az/az3-3.jpg"
    ],
    tag: "Affordable"
  }
];

export default homes;
export { homes };

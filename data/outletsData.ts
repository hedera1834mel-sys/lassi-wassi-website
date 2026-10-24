export interface Outlet {
  id: string;
  name: string;
  area: string;
  landmark: string;
  addressNote: string;
  timingNote: string;
  popularFor: string[];
  googleMapsQuery: string;
  swiggyUrl: string;
  zomatoUrl: string;
  phone: string;
  badge?: string;
}

export const OUTLETS: Outlet[] = [
  {
    id: "kothrud",
    name: "Lassi Wassi — Kothrud",
    area: "Kothrud, Pune",
    landmark: "Near MIT College / Rambaug Colony",
    addressNote: "Kothrud Branch, Pune, Maharashtra (Verify exact street address on Google Maps)",
    timingNote: "Open Daily: 11:00 AM – 11:30 PM (Typical store hours, confirm on holiday schedules)",
    popularFor: ["Chicken Shawarma Rolls", "Mud Coffee", "Sweet Lassi", "Zinger Burgers"],
    googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Lassi+Wassi+Kothrud+Pune",
    swiggyUrl: "https://www.swiggy.com/restaurants/lassi-wassi-kothrud-pune-102941",
    zomatoUrl: "https://www.zomato.com/pune/lassi-wassi-kothrud",
    phone: "+91 98602 52911",
    badge: "Flagship Hotspot",
  },
  {
    id: "sinhgad-road",
    name: "Lassi Wassi — Sinhgad Road",
    area: "Sinhgad Road, Pune",
    landmark: "Sinhgad Road Food Strip",
    addressNote: "Sinhgad Road Outlet, Pune, Maharashtra (Verify exact street address on Google Maps)",
    timingNote: "Open Daily: 11:30 AM – 11:30 PM (Typical store hours, confirm on holiday schedules)",
    popularFor: ["Special Shawarma Plate", "Dry Fruit Lassi", "Thick Shakes", "Peri Peri Fries"],
    googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Lassi+Wassi+Sinhgad+Road+Pune",
    swiggyUrl: "https://www.swiggy.com/restaurants/lassi-wassi-sinhgad-road-pune",
    zomatoUrl: "https://www.zomato.com/pune/lassi-wassi-sinhgad-road",
    phone: "+91 98602 52911",
  },
  {
    id: "katraj",
    name: "Lassi Wassi — Katraj",
    area: "Katraj, Pune",
    landmark: "Near Bharati Vidyapeeth Campus Area",
    addressNote: "Katraj Outlet, Pune, Maharashtra (Verify exact street address on Google Maps)",
    timingNote: "Open Daily: 11:00 AM – 11:30 PM (Typical store hours, confirm on holiday schedules)",
    popularFor: ["Paneer Cheese Shawarma", "Virgin Mojito", "Double Chicken Burger", "Mango Lassi"],
    googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Lassi+Wassi+Katraj+Pune",
    swiggyUrl: "https://www.swiggy.com/restaurants/lassi-wassi-katraj-pune",
    zomatoUrl: "https://www.zomato.com/pune/lassi-wassi-katraj",
    phone: "+91 98602 52911",
    badge: "Student Favourite",
  },
  {
    id: "bavdhan",
    name: "Lassi Wassi — Bavdhan",
    area: "Bavdhan, Pune",
    landmark: "Bavdhan Main Road",
    addressNote: "Bavdhan Outlet, Pune, Maharashtra (Verify exact street address on Google Maps)",
    timingNote: "Open Daily: 11:30 AM – 11:00 PM (Typical store hours, confirm on holiday schedules)",
    popularFor: ["Afghani Shawarma Burger", "Chocolate Brownie Coffee", "Sweet Lassi", "Chicken Popcorn"],
    googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Lassi+Wassi+Bavdhan+Pune",
    swiggyUrl: "https://www.swiggy.com/restaurants/lassi-wassi-bavdhan-pune",
    zomatoUrl: "https://www.zomato.com/pune/lassi-wassi-bavdhan",
    phone: "+91 98602 52911",
  },
];

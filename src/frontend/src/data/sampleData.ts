export const sampleNews = [
  {
    id: 1n,
    title: "Munger Bridge Project Gets ₹450 Crore Funding Boost",
    content:
      "The Bihar government has approved a major funding boost of ₹450 crore for the long-awaited bridge project connecting Munger to Khagaria district across the Ganga.",
    author: "Rajesh Kumar",
    publishedAt: BigInt(Date.now() - 2 * 60 * 60 * 1000),
    category: "local" as const,
    isFeatured: true,
    images: [],
    emoji: "🏗️",
  },
  {
    id: 2n,
    title: "Munger University Launches New Engineering Course",
    content:
      "Munger University has announced the launch of a new B.Tech program in Artificial Intelligence and Machine Learning from the upcoming academic session.",
    author: "Priya Singh",
    publishedAt: BigInt(Date.now() - 5 * 60 * 60 * 1000),
    category: "local" as const,
    isFeatured: false,
    images: [],
    emoji: "🎓",
  },
  {
    id: 3n,
    title: "Yoga Festival at Bihar Yoga Bharati Draws 5,000 Attendees",
    content:
      "The annual yoga festival at Bihar Yoga Bharati in Munger attracted over five thousand participants from across India and 18 foreign countries.",
    author: "Anita Devi",
    publishedAt: BigInt(Date.now() - 24 * 60 * 60 * 1000),
    category: "culture" as const,
    isFeatured: true,
    images: [],
    emoji: "🧘",
  },
  {
    id: 4n,
    title: "New IT Park Proposed Near Munger Industrial Area",
    content:
      "District Collector has submitted a proposal to state government for setting up an IT park near the existing industrial zone to boost employment.",
    author: "Sanjay Prasad",
    publishedAt: BigInt(Date.now() - 48 * 60 * 60 * 1000),
    category: "local" as const,
    isFeatured: false,
    images: [],
    emoji: "💻",
  },
  {
    id: 5n,
    title: "Munger FC Wins Bihar State Football Championship",
    content:
      "Local football club Munger FC clinched the Bihar State Football Championship trophy for the third consecutive year, defeating Patna United 2-1.",
    author: "Vikram Singh",
    publishedAt: BigInt(Date.now() - 72 * 60 * 60 * 1000),
    category: "sports" as const,
    isFeatured: false,
    images: [],
    emoji: "⚽",
  },
  {
    id: 6n,
    title: "District Hospital Gets New ICU Wing and Equipment",
    content:
      "Sadar Hospital Munger inaugurated its new 20-bed ICU wing equipped with modern ventilators and monitoring systems, improving critical care facilities.",
    author: "Dr. Meena Kumari",
    publishedAt: BigInt(Date.now() - 96 * 60 * 60 * 1000),
    category: "local" as const,
    isFeatured: false,
    images: [],
    emoji: "🏥",
  },
];

export const sampleJobs = [
  {
    id: 1n,
    title: "Software Developer (React/Node.js)",
    company: "TechBridge Solutions Pvt Ltd",
    location: "Munger, Bihar",
    salary: 35000n,
    description:
      "Looking for an experienced React developer with 2+ years of experience. Work from Munger office. Must know TypeScript, REST APIs.",
    postedAt: BigInt(Date.now() - 1 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "HR Team",
      email: "hr@techbridge.in",
      phone: "+91-9876543210",
    },
    isActive: true,
    isFeatured: true,
  },
  {
    id: 2n,
    title: "School Teacher – Mathematics (Class 6-10)",
    company: "Delhi Public School Munger",
    location: "Munger, Bihar",
    salary: 22000n,
    description:
      "Experienced mathematics teacher required for classes 6 to 10. B.Ed preferred. Immediate joining.",
    postedAt: BigInt(Date.now() - 12 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Principal Office",
      email: "principal@dpsmunger.edu",
      phone: "+91-9988776655",
    },
    isActive: true,
    isFeatured: false,
  },
  {
    id: 3n,
    title: "Sales Executive – FMCG Distribution",
    company: "Agarwal Traders & Co.",
    location: "Munger / Jamalpur",
    salary: 18000n,
    description:
      "Field sales executive for FMCG product distribution in Munger district. Own two-wheeler required.",
    postedAt: BigInt(Date.now() - 24 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Ramesh Agarwal",
      email: "agarwaltraders@gmail.com",
      phone: "+91-9123456780",
    },
    isActive: true,
    isFeatured: false,
  },
  {
    id: 4n,
    title: "Civil Engineer – Road Construction Project",
    company: "Bihar State Road Development Corp.",
    location: "Munger District",
    salary: 45000n,
    description:
      "B.Tech Civil engineer required for road construction supervision. 3+ years experience in highway projects preferred.",
    postedAt: BigInt(Date.now() - 48 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Project Office",
      email: "bsrdc.munger@bihar.gov.in",
      phone: "+91-9012345678",
    },
    isActive: true,
    isFeatured: true,
  },
];

export const sampleListings = [
  {
    id: 1n,
    title: "Honda Activa 6G – 2022 Model, Excellent Condition",
    category: "Vehicles",
    price: 68000n,
    description:
      "Single owner, 12,000 km driven, all documents clear. Recently serviced. Color: Pearl Sparkling White.",
    postedAt: BigInt(Date.now() - 2 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Deepak Verma",
      email: "deepak.verma@gmail.com",
      phone: "+91-9876501234",
    },
    isActive: true,
    isFeatured: true,
    images: [],
  },
  {
    id: 2n,
    title: "3 BHK Flat for Rent – Near Munger Railway Station",
    category: "Real Estate",
    price: 8500n,
    description:
      "Spacious 3BHK flat, 2nd floor, well-ventilated. All amenities. 5 minutes walk from Munger railway station.",
    postedAt: BigInt(Date.now() - 8 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Suresh Pandey",
      email: "suresh.pandey@yahoo.com",
      phone: "+91-9823456789",
    },
    isActive: true,
    isFeatured: false,
    images: [],
  },
  {
    id: 3n,
    title: "Samsung Galaxy S23 – Like New (4 months old)",
    category: "Electronics",
    price: 52000n,
    description:
      "Samsung Galaxy S23, 8GB/256GB, Phantom Black. Bought 4 months ago. Box and all accessories included.",
    postedAt: BigInt(Date.now() - 18 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Kavita Singh",
      email: "kavita.s@gmail.com",
      phone: "+91-9712345678",
    },
    isActive: true,
    isFeatured: true,
    images: [],
  },
  {
    id: 4n,
    title: "Teak Wood Double Bed with Storage",
    category: "Furniture",
    price: 18000n,
    description:
      "Solid teak wood double bed with hydraulic storage, mattress included. 2 years old, very good condition.",
    postedAt: BigInt(Date.now() - 36 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Mohan Lal",
      email: "mohanlal@gmail.com",
      phone: "+91-9634567890",
    },
    isActive: true,
    isFeatured: false,
    images: [],
  },
  {
    id: 5n,
    title: "Commercial Shop Space for Rent – Main Market",
    category: "Real Estate",
    price: 15000n,
    description:
      "300 sq ft shop on ground floor in busy Munger main market area. Ideal for retail or office.",
    postedAt: BigInt(Date.now() - 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Anil Kumar",
      email: "anil.prop@gmail.com",
      phone: "+91-9534567891",
    },
    isActive: true,
    isFeatured: false,
    images: [],
  },
  {
    id: 6n,
    title: "Used Books – UPSC & BPSC Exam Preparation Set",
    category: "Books",
    price: 2500n,
    description:
      "Complete set of UPSC/BPSC preparation books, slightly used, great condition. 15 books total.",
    postedAt: BigInt(Date.now() - 72 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Rohit Sharma",
      email: "rohit.sharma@gmail.com",
      phone: "+91-9456789012",
    },
    isActive: true,
    isFeatured: false,
    images: [],
  },
];

export const sampleServices = [
  {
    id: 1n,
    title: "Home Electrical Repair & Installation",
    category: "Electrician",
    priceRange: "₹200 – ₹2000",
    description:
      "Licensed electrician for all home electrical work: wiring, fan installation, short-circuit repair, inverter setup.",
    postedAt: BigInt(Date.now() - 3 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Ramesh Electricals",
      email: "ramesh.electric@gmail.com",
      phone: "+91-9876543200",
    },
    isActive: true,
    isFeatured: true,
  },
  {
    id: 2n,
    title: "Tiffin Service – Home-cooked Meals Daily",
    category: "Food",
    priceRange: "₹80 – ₹150 per meal",
    description:
      "Hygienic home-cooked lunch and dinner tiffin service. Monthly packages available. Pure veg and non-veg options.",
    postedAt: BigInt(Date.now() - 8 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Sunita Tiffin Centre",
      email: "sunita.tiffin@gmail.com",
      phone: "+91-9812345670",
    },
    isActive: true,
    isFeatured: false,
  },
  {
    id: 3n,
    title: "Plumbing & Bathroom Fitting Services",
    category: "Plumber",
    priceRange: "₹300 – ₹3000",
    description:
      "All plumbing work: pipe fitting, tap repair, bathroom renovation, water tank installation. 24/7 emergency.",
    postedAt: BigInt(Date.now() - 24 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Ajay Plumbers",
      email: "ajay.plumb@gmail.com",
      phone: "+91-9712345670",
    },
    isActive: true,
    isFeatured: false,
  },
  {
    id: 4n,
    title: "Private Tuition – Class 8-12 (Science & Math)",
    category: "Education",
    priceRange: "₹500 – ₹1500/month",
    description:
      "Experienced teacher offering home tuition for Physics, Chemistry, Mathematics for classes 8 to 12.",
    postedAt: BigInt(Date.now() - 48 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Prof. Amit Verma",
      email: "amitverma.tutor@gmail.com",
      phone: "+91-9612345670",
    },
    isActive: true,
    isFeatured: true,
  },
];

export const sampleEvents = [
  {
    id: 1n,
    title: "Chhath Puja Community Celebration 2025",
    organizer: "Munger Nagar Palika",
    location: "Ganga Ghat, Munger",
    date: BigInt(Date.now() + 5 * 24 * 60 * 60 * 1000),
    time: BigInt(4 * 60 * 60 * 1000),
    description:
      "Grand celebration of Chhath Puja with community gatherings, cultural programs and devotional songs at the Ganga Ghat.",
    postedAt: BigInt(Date.now() - 48 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Nagar Palika Office",
      email: "nagar.palika.munger@bihar.gov.in",
      phone: "+91-6344220001",
    },
    isFeatured: true,
  },
  {
    id: 2n,
    title: "Munger Youth Entrepreneurship Summit",
    organizer: "Bihar Startup Ecosystem",
    location: "Jawahar Lal Nehru Hall, Munger",
    date: BigInt(Date.now() + 12 * 24 * 60 * 60 * 1000),
    time: BigInt(10 * 60 * 60 * 1000),
    description:
      "Two-day summit for young entrepreneurs with workshops, mentorship sessions and startup pitching competition. Free registration.",
    postedAt: BigInt(Date.now() - 24 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Summit Team",
      email: "summit@biharstartup.in",
      phone: "+91-9876500001",
    },
    isFeatured: false,
  },
  {
    id: 3n,
    title: "International Yoga Day – Free Workshop",
    organizer: "Bihar Yoga Bharati",
    location: "Bihar Yoga Bharati Campus, Munger",
    date: BigInt(Date.now() + 20 * 24 * 60 * 60 * 1000),
    time: BigInt(6 * 60 * 60 * 1000),
    description:
      "Free yoga workshop open to all. Learn from expert yoga teachers. Beginners and advanced practitioners welcome.",
    postedAt: BigInt(Date.now() - 72 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "BYB Events",
      email: "events@biharyoga.net",
      phone: "+91-6344222222",
    },
    isFeatured: true,
  },
  {
    id: 4n,
    title: "Munger Food & Craft Mela",
    organizer: "District Tourism Office",
    location: "Town Hall Ground, Munger",
    date: BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000),
    time: BigInt(11 * 60 * 60 * 1000),
    description:
      "Three-day food and handicraft fair showcasing local cuisine, traditional art and crafts from across Munger district.",
    postedAt: BigInt(Date.now() - 96 * 60 * 60 * 1000),
    postedBy: "" as unknown as import("@icp-sdk/core/principal").Principal,
    contactInfo: {
      name: "Tourism Office",
      email: "tourism.munger@bihar.gov.in",
      phone: "+91-6344221111",
    },
    isFeatured: false,
  },
];

export function timeAgo(timestamp: bigint): string {
  const diff = Date.now() - Number(timestamp);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

export function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

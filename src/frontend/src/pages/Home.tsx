import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  Bus,
  CalendarDays,
  ChevronRight,
  Newspaper,
  Phone,
  Search,
  ShoppingBag,
  Star,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Page } from "../context/AppContext";
import { formatPrice, timeAgo } from "../data/sampleData";
import { useAllJobs, useAllListings, useAllNews } from "../hooks/useQueries";

const categories = [
  {
    label: "Local News",
    hindi: "समाचार",
    icon: Newspaper,
    color: "bg-[oklch(0.53_0.10_196)]",
    page: "news" as Page,
  },
  {
    label: "Jobs",
    hindi: "नौकरी",
    icon: Briefcase,
    color: "bg-[oklch(0.73_0.16_65)]",
    page: "jobs" as Page,
  },
  {
    label: "Buy & Sell",
    hindi: "खरीदो-बेचो",
    icon: ShoppingBag,
    color: "bg-[oklch(0.30_0.08_255)]",
    page: "marketplace" as Page,
  },
  {
    label: "Services",
    hindi: "सेवाएँ",
    icon: Wrench,
    color: "bg-[oklch(0.65_0.19_47)]",
    page: "services" as Page,
  },
  {
    label: "Events",
    hindi: "कार्यक्रम",
    icon: CalendarDays,
    color: "bg-[oklch(0.55_0.12_310)]",
    page: "events" as Page,
  },
  {
    label: "Business",
    hindi: "व्यापार",
    icon: Building2,
    color: "bg-[oklch(0.30_0.08_255)]",
    page: "business-register" as Page,
  },
  {
    label: "Food",
    hindi: "खाना-पीना",
    icon: UtensilsCrossed,
    color: "bg-[oklch(0.55_0.12_150)]",
    page: "services" as Page,
  },
  {
    label: "Transport",
    hindi: "यातायात",
    icon: Bus,
    color: "bg-[oklch(0.45_0.05_220)]",
    page: "services" as Page,
  },
];

export function Home() {
  const { navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const { data: news = [] } = useAllNews();
  const { data: jobs = [] } = useAllJobs();
  const { data: listings = [] } = useAllListings();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCategory === "jobs") navigate("jobs");
    else if (searchCategory === "marketplace") navigate("marketplace");
    else if (searchCategory === "services") navigate("services");
    else navigate("news");
  };

  return (
    <div className="bg-page-aqua min-h-screen">
      {/* Hero */}
      <section
        className="relative bg-munger-dark overflow-hidden"
        style={{ minHeight: 360 }}
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-munger.dim_1400x500.jpg"
          alt="Munger city"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl"
          >
            Connecting Munger: News, Jobs, Marketplace &amp; More!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl md:text-2xl font-bold text-white/90 mt-2"
          >
            मुंगेर को जोड़ने वाला सबसे बड़ा डिजिटल मंच!
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-white/80 mt-2"
          >
            Your Local City App — All about Munger &nbsp;| आपका शहरी अप्प
          </motion.p>

          {/* Hero search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            onSubmit={handleSearch}
            className="mt-8 flex flex-col sm:flex-row gap-2 w-full max-w-2xl"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, jobs, market… | खोजें"
              className="flex-1 px-4 py-3 rounded-lg text-sm text-munger-dark outline-none"
              data-ocid="hero.search_input"
            />
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-3 py-3 rounded-lg text-sm text-munger-dark outline-none"
              data-ocid="hero.select"
            >
              <option value="all">All Categories</option>
              <option value="news">News</option>
              <option value="jobs">Jobs</option>
              <option value="marketplace">Marketplace</option>
              <option value="services">Services</option>
              <option value="events">Events</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-munger-orange hover:bg-orange-dark text-white font-bold rounded-lg text-sm transition-colors"
              data-ocid="hero.primary_button"
            >
              SEARCH
            </button>
          </motion.form>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Explore Munger Tiles */}
            <section data-ocid="explore.section">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-munger-dark">
                    Explore Munger
                  </h2>
                  <p className="text-xs text-muted-foreground">मुंगेर अन्वेषण करें</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.label}
                      type="button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => navigate(cat.page)}
                      data-ocid={`explore.${cat.page}.button`}
                      className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow-card hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-munger-dark text-center leading-tight">
                        {cat.label}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        {cat.hindi}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Latest News */}
            <section data-ocid="news.section">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-munger-dark">
                    Latest from Munger
                  </h2>
                  <p className="text-xs text-muted-foreground">नवीनतम समाचार</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("news")}
                  className="text-xs text-munger-teal font-semibold flex items-center gap-1 hover:underline"
                  data-ocid="news.link"
                >
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {news.slice(0, 4).map((item, i) => (
                  <motion.div
                    key={String(item.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-md transition-shadow"
                    data-ocid={`news.item.${i + 1}`}
                  >
                    <div className="h-1.5 bg-[oklch(0.53_0.10_196)]" />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="text-[10px] capitalize"
                        >
                          {String(item.category)}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {timeAgo(item.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm text-munger-dark line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.content}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">
                          By {item.author}
                        </span>
                        <button
                          type="button"
                          className="text-xs text-munger-orange font-semibold hover:underline"
                          data-ocid={`news.read.button.${i + 1}`}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Latest Jobs */}
            <section data-ocid="jobs.section">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-munger-dark">
                    Recent Job Openings
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    नवीनतम नौकरी अवसर
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("jobs")}
                  className="text-xs text-munger-teal font-semibold flex items-center gap-1 hover:underline"
                  data-ocid="jobs.link"
                >
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {jobs.slice(0, 3).map((job, i) => (
                  <motion.div
                    key={String(job.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl shadow-card p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                    data-ocid={`jobs.item.${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[oklch(0.73_0.16_65)] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-munger-dark truncate">
                        {job.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {job.company} &bull; {job.location}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-munger-teal">
                        {formatPrice(job.salary)}/mo
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {timeAgo(job.postedAt)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6" data-ocid="sidebar.panel">
            {/* Featured Ad 1 */}
            <div className="rounded-xl overflow-hidden shadow-card">
              <div className="bg-munger-orange p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Featured Business
                  </span>
                </div>
                <h3 className="font-bold text-sm">
                  Munger Sweets &amp; Snacks
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  Best traditional sweets since 1985. Home delivery available!
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-xs text-muted-foreground mb-3">
                  Daily fresh pedas, laddoos, namkeens. Special orders for
                  events.
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-3 h-3 text-munger-teal" />
                  <span className="text-xs font-medium">+91-6344-221234</span>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-munger-orange hover:bg-orange-dark text-white text-xs"
                  data-ocid="sidebar.primary_button"
                >
                  Contact Now
                </Button>
              </div>
            </div>

            {/* Featured Ad 2 */}
            <div className="rounded-xl overflow-hidden shadow-card">
              <div className="bg-munger-teal p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Featured Ad
                  </span>
                </div>
                <h3 className="font-bold text-sm">Shree Ram Coaching Centre</h3>
                <p className="text-xs text-white/80 mt-1">
                  Top coaching for BPSC, UPSC &amp; SSC in Munger
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-xs text-muted-foreground mb-3">
                  Expert faculty, study material, test series. Batches starting
                  soon!
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-3 h-3 text-munger-teal" />
                  <span className="text-xs font-medium">+91-9876543001</span>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-munger-teal hover:opacity-90 text-white text-xs"
                  data-ocid="sidebar.secondary_button"
                >
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Advertise CTA */}
            <div className="rounded-xl border-2 border-dashed border-munger-orange p-5 text-center">
              <Building2 className="w-8 h-8 text-munger-orange mx-auto mb-2" />
              <h4 className="font-bold text-sm text-munger-dark mb-1">
                Advertise Your Business
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Starting at just <strong>₹199/month</strong>
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-munger-orange text-munger-orange hover:bg-munger-orange hover:text-white text-xs"
                onClick={() => navigate("business-register")}
                data-ocid="sidebar.open_modal_button"
              >
                Get Listed Today
              </Button>
            </div>

            {/* Recent Listings */}
            <div className="bg-white rounded-xl shadow-card p-4">
              <h4 className="font-bold text-sm text-munger-dark mb-3">
                हालिया लिस्टिंग्स | Recent Listings
              </h4>
              <div className="space-y-3">
                {listings.slice(0, 3).map((item, i) => (
                  <div
                    key={String(item.id)}
                    className="flex items-center gap-3"
                    data-ocid={`sidebar.item.${i + 1}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[oklch(0.30_0.08_255)] flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-munger-dark truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-munger-orange font-bold">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => navigate("marketplace")}
                className="mt-3 text-xs text-munger-teal font-semibold hover:underline w-full text-center"
                data-ocid="sidebar.link"
              >
                View All Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

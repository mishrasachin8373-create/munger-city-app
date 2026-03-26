import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, Phone, Search, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { timeAgo } from "../data/sampleData";
import { useAllServices } from "../hooks/useQueries";

const serviceCategories = [
  "All",
  "Electrician",
  "Plumber",
  "Education",
  "Food",
  "Transport",
  "Other",
];

export function Services() {
  const { navigate } = useApp();
  const { data: services = [], isLoading } = useAllServices();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = services.filter((s) => {
    const matchCat = category === "All" || s.category === category;
    const matchSearch =
      !search || s.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-munger-orange text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Local Services</h1>
              </div>
              <p className="text-white/80 text-sm">
                स्थानीय सेवाएँ • Munger, Bihar
              </p>
            </div>
            <Button
              className="bg-white text-munger-orange hover:bg-white/90 text-xs font-bold"
              onClick={() => navigate("post-ad")}
              data-ocid="services.primary_button"
            >
              + List Service
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services…"
              className="pl-8 text-xs"
              data-ocid="services.search_input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                data-ocid={`services.${cat.toLowerCase()}.tab`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  category === cat
                    ? "bg-munger-orange text-white"
                    : "bg-white text-munger-dark border border-border hover:border-munger-orange"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div
            className="flex justify-center py-16"
            data-ocid="services.loading_state"
          >
            <div className="w-8 h-8 border-4 border-munger-orange border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service, i) => (
            <motion.div
              key={String(service.id)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-md transition-shadow"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="h-1.5 bg-munger-orange" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="text-[10px] border-munger-orange text-munger-orange capitalize"
                  >
                    {service.category}
                  </Badge>
                  {service.isFeatured && (
                    <Badge className="text-[10px] bg-munger-orange text-white">
                      ★ Featured
                    </Badge>
                  )}
                </div>
                <div className="w-10 h-10 rounded-xl bg-munger-orange flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-bold text-sm text-munger-dark mb-1">
                  {service.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-munger-teal mb-3">
                  <IndianRupee className="w-3 h-3" />
                  {service.priceRange}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {service.contactInfo.phone}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground mb-3">
                  {timeAgo(service.postedAt)}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-munger-orange hover:bg-orange-dark text-white text-xs"
                  data-ocid={`services.contact.button.${i + 1}`}
                >
                  Contact Provider
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="services.empty_state">
            <Wrench className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No services found</p>
          </div>
        )}
      </div>
    </div>
  );
}

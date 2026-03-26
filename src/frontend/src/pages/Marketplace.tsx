import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Search, ShoppingBag, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatPrice, timeAgo } from "../data/sampleData";
import { useAllListings } from "../hooks/useQueries";

const categoryOptions = [
  "All",
  "Vehicles",
  "Real Estate",
  "Electronics",
  "Furniture",
  "Books",
  "Other",
];

export function Marketplace() {
  const { navigate } = useApp();
  const { data: listings = [], isLoading } = useAllListings();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = listings.filter((l) => {
    const matchCat = category === "All" || l.category === category;
    const matchSearch =
      !search || l.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-[oklch(0.30_0.08_255)] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Marketplace</h1>
              </div>
              <p className="text-white/80 text-sm">
                खरीदो और बेचो • Munger, Bihar
              </p>
            </div>
            <Button
              className="bg-munger-orange hover:bg-orange-dark text-white text-xs font-bold"
              onClick={() => navigate("post-ad")}
              data-ocid="marketplace.primary_button"
            >
              + Post Ad
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
              placeholder="Search listings…"
              className="pl-8 text-xs"
              data-ocid="marketplace.search_input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                data-ocid={`marketplace.${cat.toLowerCase()}.tab`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  category === cat
                    ? "bg-[oklch(0.30_0.08_255)] text-white"
                    : "bg-white text-munger-dark border border-border hover:border-[oklch(0.30_0.08_255)]"
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
            data-ocid="marketplace.loading_state"
          >
            <div className="w-8 h-8 border-4 border-[oklch(0.30_0.08_255)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={String(item.id)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-md transition-shadow"
              data-ocid={`marketplace.item.${i + 1}`}
            >
              <div className="h-1.5 bg-[oklch(0.30_0.08_255)]" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] border-[oklch(0.30_0.08_255)] text-[oklch(0.30_0.08_255)]"
                  >
                    <Tag className="w-2.5 h-2.5 mr-1" />
                    {item.category}
                  </Badge>
                  {item.isFeatured && (
                    <Badge className="text-[10px] bg-munger-orange text-white">
                      ★
                    </Badge>
                  )}
                </div>
                <h2 className="font-bold text-sm text-munger-dark mb-1 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-munger-orange">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {timeAgo(item.postedAt)}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Phone className="w-3 h-3 text-munger-teal" />
                  <span className="text-xs text-muted-foreground">
                    {item.contactInfo.phone}
                  </span>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 bg-[oklch(0.30_0.08_255)] hover:opacity-90 text-white text-xs"
                  data-ocid={`marketplace.contact.button.${i + 1}`}
                >
                  Contact Seller
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div
            className="text-center py-16"
            data-ocid="marketplace.empty_state"
          >
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No listings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

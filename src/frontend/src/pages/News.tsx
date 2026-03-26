import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Newspaper, Search, Tag, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { timeAgo } from "../data/sampleData";
import { useAllNews } from "../hooks/useQueries";

const categories = [
  "all",
  "local",
  "national",
  "politics",
  "culture",
  "sports",
];

export function News() {
  const { data: news = [], isLoading } = useAllNews();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = news.filter((n) => {
    const matchCat = filter === "all" || String(n.category) === filter;
    const matchSearch =
      !search || n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-[oklch(0.53_0.10_196)] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Local News</h1>
          </div>
          <p className="text-white/80 text-sm">स्थानीय समाचार • Munger, Bihar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div
          className="flex flex-col sm:flex-row gap-3 mb-6"
          data-ocid="news.filter.tab"
        >
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                data-ocid={`news.${cat}.tab`}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                  filter === cat
                    ? "bg-munger-teal text-white"
                    : "bg-white text-munger-dark border border-border hover:border-munger-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news…"
              className="pl-8 text-xs h-8"
              data-ocid="news.search_input"
            />
          </div>
        </div>

        {isLoading && (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="news.loading_state"
          >
            <div className="w-8 h-8 border-4 border-munger-teal border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.article
                key={String(item.id)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-md transition-shadow"
                data-ocid={`news.item.${i + 1}`}
              >
                <div className="h-1.5 bg-[oklch(0.53_0.10_196)]" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="text-[10px] capitalize"
                    >
                      <Tag className="w-2.5 h-2.5 mr-1" />
                      {String(item.category)}
                    </Badge>
                    {item.isFeatured && (
                      <Badge className="text-[10px] bg-munger-orange text-white">
                        ★ Featured
                      </Badge>
                    )}
                  </div>
                  <h2 className="font-bold text-sm text-munger-dark mb-2 line-clamp-3">
                    {item.title}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                    {item.content}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {item.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(item.publishedAt)}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="news.empty_state">
            <Newspaper className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No news found</p>
          </div>
        )}
      </div>
    </div>
  );
}

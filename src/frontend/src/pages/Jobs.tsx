import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Building2,
  Clock,
  IndianRupee,
  MapPin,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatPrice, timeAgo } from "../data/sampleData";
import { useAllJobs } from "../hooks/useQueries";

export function Jobs() {
  const { navigate } = useApp();
  const { data: jobs = [], isLoading } = useAllJobs();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filtered = jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchLoc =
      !locationFilter ||
      j.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchSearch && matchLoc;
  });

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-[oklch(0.73_0.16_65)] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Jobs in Munger</h1>
              </div>
              <p className="text-white/80 text-sm">नौकरी के अवसर • मुंगेर, बिहार</p>
            </div>
            <Button
              className="bg-white text-[oklch(0.73_0.16_65)] hover:bg-white/90 text-xs font-bold"
              onClick={() => navigate("post-ad")}
              data-ocid="jobs.primary_button"
            >
              + Post a Job
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title or company…"
              className="pl-8 text-xs"
              data-ocid="jobs.search_input"
            />
          </div>
          <div className="relative sm:w-56">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Filter by location…"
              className="pl-8 text-xs"
              data-ocid="jobs.input"
            />
          </div>
        </div>

        {isLoading && (
          <div
            className="flex justify-center py-16"
            data-ocid="jobs.loading_state"
          >
            <div className="w-8 h-8 border-4 border-[oklch(0.73_0.16_65)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((job, i) => (
            <motion.div
              key={String(job.id)}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl shadow-card p-5 hover:shadow-md transition-shadow"
              data-ocid={`jobs.item.${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.73_0.16_65)] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-sm text-munger-dark">
                        {job.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    {job.isFeatured && (
                      <Badge className="text-[10px] bg-munger-orange text-white flex-shrink-0">
                        ★ Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-munger-teal font-semibold">
                      <IndianRupee className="w-3 h-3" />
                      {formatPrice(job.salary)}/month
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {timeAgo(job.postedAt)}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="flex-shrink-0 bg-munger-orange hover:bg-orange-dark text-white text-xs"
                  data-ocid={`jobs.apply.button.${i + 1}`}
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="jobs.empty_state">
            <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
}

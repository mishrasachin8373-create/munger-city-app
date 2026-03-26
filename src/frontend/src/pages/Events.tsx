import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, MapPin, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatDate } from "../data/sampleData";
import { useAllEvents } from "../hooks/useQueries";

export function Events() {
  const { navigate } = useApp();
  const { data: events = [], isLoading } = useAllEvents();
  const [search, setSearch] = useState("");

  const filtered = events.filter(
    (e) =>
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()),
  );

  const upcomingEvents = filtered.filter((e) => Number(e.date) > Date.now());
  const pastEvents = filtered.filter((e) => Number(e.date) <= Date.now());

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-[oklch(0.55_0.12_310)] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CalendarDays className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Events in Munger</h1>
              </div>
              <p className="text-white/80 text-sm">
                आगामी कार्यक्रम • Munger, Bihar
              </p>
            </div>
            <Button
              className="bg-white text-[oklch(0.55_0.12_310)] hover:bg-white/90 text-xs font-bold"
              onClick={() => navigate("post-ad")}
              data-ocid="events.primary_button"
            >
              + Post Event
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events…"
            className="pl-8 text-xs"
            data-ocid="events.search_input"
          />
        </div>

        {isLoading && (
          <div
            className="flex justify-center py-16"
            data-ocid="events.loading_state"
          >
            <div className="w-8 h-8 border-4 border-[oklch(0.55_0.12_310)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {upcomingEvents.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-munger-dark mb-4">
              आगामी कार्यक्रम | Upcoming Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event, i) => (
                <EventCard key={String(event.id)} event={event} index={i} />
              ))}
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-munger-dark mb-4">
              Past Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-70">
              {pastEvents.map((event, i) => (
                <EventCard key={String(event.id)} event={event} index={i} />
              ))}
            </div>
          </section>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="events.empty_state">
            <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event, index }: { event: any; index: number }) {
  const isUpcoming = Number(event.date) > Date.now();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-md transition-shadow"
      data-ocid={`events.item.${index + 1}`}
    >
      <div className="h-1.5 bg-[oklch(0.55_0.12_310)]" />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge
            className={`text-[10px] ${isUpcoming ? "bg-green-500" : "bg-gray-400"} text-white`}
          >
            {isUpcoming ? "Upcoming" : "Past"}
          </Badge>
          {event.isFeatured && (
            <Badge className="text-[10px] bg-munger-orange text-white">
              ★ Featured
            </Badge>
          )}
        </div>
        <h2 className="font-bold text-sm text-munger-dark mb-2 line-clamp-2">
          {event.title}
        </h2>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {event.description}
        </p>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5 text-[oklch(0.55_0.12_310)]" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-munger-orange" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-munger-teal" />
            <span>{event.organizer}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

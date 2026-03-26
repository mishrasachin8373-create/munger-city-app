import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, PlusCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Event, Job, Listing, Service } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateEvent,
  useCreateJob,
  useCreateListing,
  useCreateService,
} from "../hooks/useQueries";

export function PostAd() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { actor } = useActor();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const createJob = useCreateJob();
  const createListing = useCreateListing();
  const createService = useCreateService();
  const createEvent = useCreateEvent();

  const [activeTab, setActiveTab] = useState("job");
  const [submitted, setSubmitted] = useState(false);

  // Job form
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "Munger, Bihar",
    salary: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  // Listing form
  const [listingForm, setListingForm] = useState({
    title: "",
    category: "Electronics",
    price: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  // Service form
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "Electrician",
    priceRange: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  // Event form
  const [eventForm, setEventForm] = useState({
    title: "",
    organizer: "",
    location: "",
    date: "",
    time: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-page-aqua min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center">
          <PlusCircle className="w-12 h-12 text-munger-orange mx-auto mb-4" />
          <h2 className="text-xl font-bold text-munger-dark mb-2">
            Post Your Ad
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to post jobs, sell items, or offer services in Munger
          </p>
          <Button
            className="bg-munger-orange hover:bg-orange-dark text-white font-semibold w-full"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            data-ocid="post_ad.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In…
              </>
            ) : (
              "Sign In to Post"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-page-aqua min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center"
          data-ocid="post_ad.success_state"
        >
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-munger-dark mb-2">
            Ad Posted Successfully!
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your ad has been submitted and will be live shortly.
          </p>
          <Button
            className="bg-munger-orange text-white w-full"
            onClick={() => setSubmitted(false)}
            data-ocid="post_ad.secondary_button"
          >
            Post Another Ad
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity) return;
    const job: Job = {
      id: 0n,
      title: jobForm.title,
      company: jobForm.company,
      location: jobForm.location,
      salary: BigInt(Number(jobForm.salary) || 0),
      description: jobForm.description,
      postedAt: BigInt(Date.now()),
      postedBy: identity.getPrincipal(),
      contactInfo: {
        name: jobForm.contactName,
        email: jobForm.contactEmail,
        phone: jobForm.contactPhone,
      },
      isActive: true,
      isFeatured: false,
    };
    try {
      await createJob.mutateAsync(job);
      setSubmitted(true);
      toast.success("Job posted successfully!");
    } catch {
      toast.error("Failed to post. Please try again.");
    }
  };

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity) return;
    const listing: Listing = {
      id: 0n,
      title: listingForm.title,
      category: listingForm.category,
      price: BigInt(Number(listingForm.price) || 0),
      description: listingForm.description,
      postedAt: BigInt(Date.now()),
      postedBy: identity.getPrincipal(),
      contactInfo: {
        name: listingForm.contactName,
        email: listingForm.contactEmail,
        phone: listingForm.contactPhone,
      },
      isActive: true,
      isFeatured: false,
      images: [],
    };
    try {
      await createListing.mutateAsync(listing);
      setSubmitted(true);
      toast.success("Listing posted!");
    } catch {
      toast.error("Failed to post.");
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity) return;
    const service: Service = {
      id: 0n,
      title: serviceForm.title,
      category: serviceForm.category,
      priceRange: serviceForm.priceRange,
      description: serviceForm.description,
      postedAt: BigInt(Date.now()),
      postedBy: identity.getPrincipal(),
      contactInfo: {
        name: serviceForm.contactName,
        email: serviceForm.contactEmail,
        phone: serviceForm.contactPhone,
      },
      isActive: true,
      isFeatured: false,
    };
    try {
      await createService.mutateAsync(service);
      setSubmitted(true);
      toast.success("Service listed!");
    } catch {
      toast.error("Failed to post.");
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity) return;
    const event: Event = {
      id: 0n,
      title: eventForm.title,
      organizer: eventForm.organizer,
      location: eventForm.location,
      date: BigInt(new Date(eventForm.date).getTime()),
      time: BigInt(0),
      description: eventForm.description,
      postedAt: BigInt(Date.now()),
      postedBy: identity.getPrincipal(),
      contactInfo: {
        name: eventForm.contactName,
        email: eventForm.contactEmail,
        phone: eventForm.contactPhone,
      },
      isFeatured: false,
    };
    try {
      await createEvent.mutateAsync(event);
      setSubmitted(true);
      toast.success("Event posted!");
    } catch {
      toast.error("Failed to post.");
    }
  };

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-munger-orange text-white py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Post an Ad</h1>
          </div>
          <p className="text-white/80 text-sm mt-1">
            अपना विज्ञापन डालें • Jobs, Listings, Services, Events
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8" data-ocid="post_ad.panel">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6" data-ocid="post_ad.tab">
            <TabsTrigger value="job" data-ocid="post_ad.job.tab">
              Job
            </TabsTrigger>
            <TabsTrigger value="listing" data-ocid="post_ad.listing.tab">
              Buy/Sell
            </TabsTrigger>
            <TabsTrigger value="service" data-ocid="post_ad.service.tab">
              Service
            </TabsTrigger>
            <TabsTrigger value="event" data-ocid="post_ad.event.tab">
              Event
            </TabsTrigger>
          </TabsList>

          {/* Job Form */}
          <TabsContent value="job">
            <form
              onSubmit={handleJobSubmit}
              className="bg-white rounded-2xl shadow-card p-6 space-y-4"
            >
              <h2 className="font-bold text-munger-dark">Post a Job</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Job Title *</Label>
                  <Input
                    required
                    value={jobForm.title}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, title: e.target.value })
                    }
                    placeholder="e.g. Software Developer"
                    className="text-xs"
                    data-ocid="post_ad.job.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Company Name *</Label>
                  <Input
                    required
                    value={jobForm.company}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, company: e.target.value })
                    }
                    placeholder="Company name"
                    className="text-xs"
                    data-ocid="post_ad.job.company.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Location</Label>
                  <Input
                    value={jobForm.location}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, location: e.target.value })
                    }
                    placeholder="Location"
                    className="text-xs"
                    data-ocid="post_ad.job.location.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Monthly Salary (₹)</Label>
                  <Input
                    type="number"
                    value={jobForm.salary}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, salary: e.target.value })
                    }
                    placeholder="e.g. 25000"
                    className="text-xs"
                    data-ocid="post_ad.job.salary.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Job Description *</Label>
                <Textarea
                  required
                  value={jobForm.description}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, description: e.target.value })
                  }
                  placeholder="Describe the role, requirements, and benefits…"
                  rows={4}
                  className="text-xs"
                  data-ocid="post_ad.job.description.textarea"
                />
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-xs font-semibold text-munger-dark mb-3">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={jobForm.contactName}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, contactName: e.target.value })
                      }
                      placeholder="Contact name"
                      className="text-xs"
                      data-ocid="post_ad.contact.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input
                      type="email"
                      value={jobForm.contactEmail}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, contactEmail: e.target.value })
                      }
                      placeholder="Email"
                      className="text-xs"
                      data-ocid="post_ad.contact.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phone</Label>
                    <Input
                      value={jobForm.contactPhone}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, contactPhone: e.target.value })
                      }
                      placeholder="Phone"
                      className="text-xs"
                      data-ocid="post_ad.contact.phone.input"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={createJob.isPending}
                className="w-full bg-munger-orange hover:bg-orange-dark text-white"
                data-ocid="post_ad.job.submit_button"
              >
                {createJob.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting…
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Listing Form */}
          <TabsContent value="listing">
            <form
              onSubmit={handleListingSubmit}
              className="bg-white rounded-2xl shadow-card p-6 space-y-4"
            >
              <h2 className="font-bold text-munger-dark">
                Post a Buy/Sell Listing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Title *</Label>
                  <Input
                    required
                    value={listingForm.title}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, title: e.target.value })
                    }
                    placeholder="Item title"
                    className="text-xs"
                    data-ocid="post_ad.listing.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Category</Label>
                  <Select
                    value={listingForm.category}
                    onValueChange={(v) =>
                      setListingForm({ ...listingForm, category: v })
                    }
                  >
                    <SelectTrigger
                      className="text-xs"
                      data-ocid="post_ad.listing.category.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Electronics",
                        "Vehicles",
                        "Real Estate",
                        "Furniture",
                        "Books",
                        "Other",
                      ].map((c) => (
                        <SelectItem key={c} value={c} className="text-xs">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Price (₹) *</Label>
                  <Input
                    required
                    type="number"
                    value={listingForm.price}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, price: e.target.value })
                    }
                    placeholder="e.g. 5000"
                    className="text-xs"
                    data-ocid="post_ad.listing.price.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Description *</Label>
                <Textarea
                  required
                  value={listingForm.description}
                  onChange={(e) =>
                    setListingForm({
                      ...listingForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your item…"
                  rows={4}
                  className="text-xs"
                  data-ocid="post_ad.listing.description.textarea"
                />
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-xs font-semibold text-munger-dark mb-3">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={listingForm.contactName}
                      onChange={(e) =>
                        setListingForm({
                          ...listingForm,
                          contactName: e.target.value,
                        })
                      }
                      placeholder="Name"
                      className="text-xs"
                      data-ocid="post_ad.listing.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input
                      type="email"
                      value={listingForm.contactEmail}
                      onChange={(e) =>
                        setListingForm({
                          ...listingForm,
                          contactEmail: e.target.value,
                        })
                      }
                      placeholder="Email"
                      className="text-xs"
                      data-ocid="post_ad.listing.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phone</Label>
                    <Input
                      value={listingForm.contactPhone}
                      onChange={(e) =>
                        setListingForm({
                          ...listingForm,
                          contactPhone: e.target.value,
                        })
                      }
                      placeholder="Phone"
                      className="text-xs"
                      data-ocid="post_ad.listing.phone.input"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={createListing.isPending}
                className="w-full bg-[oklch(0.30_0.08_255)] hover:opacity-90 text-white"
                data-ocid="post_ad.listing.submit_button"
              >
                {createListing.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting…
                  </>
                ) : (
                  "Post Listing"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Service Form */}
          <TabsContent value="service">
            <form
              onSubmit={handleServiceSubmit}
              className="bg-white rounded-2xl shadow-card p-6 space-y-4"
            >
              <h2 className="font-bold text-munger-dark">List Your Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Service Title *</Label>
                  <Input
                    required
                    value={serviceForm.title}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, title: e.target.value })
                    }
                    placeholder="e.g. Home Electrical Repair"
                    className="text-xs"
                    data-ocid="post_ad.service.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Category</Label>
                  <Select
                    value={serviceForm.category}
                    onValueChange={(v) =>
                      setServiceForm({ ...serviceForm, category: v })
                    }
                  >
                    <SelectTrigger
                      className="text-xs"
                      data-ocid="post_ad.service.category.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Electrician",
                        "Plumber",
                        "Education",
                        "Food",
                        "Transport",
                        "Other",
                      ].map((c) => (
                        <SelectItem key={c} value={c} className="text-xs">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs">Price Range</Label>
                  <Input
                    value={serviceForm.priceRange}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        priceRange: e.target.value,
                      })
                    }
                    placeholder="e.g. ₹200 – ₹2000"
                    className="text-xs"
                    data-ocid="post_ad.service.price.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Description *</Label>
                <Textarea
                  required
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your service…"
                  rows={4}
                  className="text-xs"
                  data-ocid="post_ad.service.description.textarea"
                />
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-xs font-semibold text-munger-dark mb-3">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={serviceForm.contactName}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          contactName: e.target.value,
                        })
                      }
                      placeholder="Name"
                      className="text-xs"
                      data-ocid="post_ad.service.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input
                      type="email"
                      value={serviceForm.contactEmail}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          contactEmail: e.target.value,
                        })
                      }
                      placeholder="Email"
                      className="text-xs"
                      data-ocid="post_ad.service.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phone</Label>
                    <Input
                      value={serviceForm.contactPhone}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          contactPhone: e.target.value,
                        })
                      }
                      placeholder="Phone"
                      className="text-xs"
                      data-ocid="post_ad.service.phone.input"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={createService.isPending}
                className="w-full bg-munger-orange hover:bg-orange-dark text-white"
                data-ocid="post_ad.service.submit_button"
              >
                {createService.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting…
                  </>
                ) : (
                  "List Service"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Event Form */}
          <TabsContent value="event">
            <form
              onSubmit={handleEventSubmit}
              className="bg-white rounded-2xl shadow-card p-6 space-y-4"
            >
              <h2 className="font-bold text-munger-dark">Post an Event</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Event Title *</Label>
                  <Input
                    required
                    value={eventForm.title}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, title: e.target.value })
                    }
                    placeholder="Event name"
                    className="text-xs"
                    data-ocid="post_ad.event.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Organizer *</Label>
                  <Input
                    required
                    value={eventForm.organizer}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, organizer: e.target.value })
                    }
                    placeholder="Organizer name"
                    className="text-xs"
                    data-ocid="post_ad.event.organizer.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Location *</Label>
                  <Input
                    required
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, location: e.target.value })
                    }
                    placeholder="Event venue"
                    className="text-xs"
                    data-ocid="post_ad.event.location.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Date *</Label>
                  <Input
                    required
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    className="text-xs"
                    data-ocid="post_ad.event.date.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Description *</Label>
                <Textarea
                  required
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  placeholder="Describe your event…"
                  rows={4}
                  className="text-xs"
                  data-ocid="post_ad.event.description.textarea"
                />
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-xs font-semibold text-munger-dark mb-3">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={eventForm.contactName}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          contactName: e.target.value,
                        })
                      }
                      placeholder="Name"
                      className="text-xs"
                      data-ocid="post_ad.event.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input
                      type="email"
                      value={eventForm.contactEmail}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          contactEmail: e.target.value,
                        })
                      }
                      placeholder="Email"
                      className="text-xs"
                      data-ocid="post_ad.event.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phone</Label>
                    <Input
                      value={eventForm.contactPhone}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          contactPhone: e.target.value,
                        })
                      }
                      placeholder="Phone"
                      className="text-xs"
                      data-ocid="post_ad.event.phone.input"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={createEvent.isPending}
                className="w-full bg-[oklch(0.55_0.12_310)] hover:opacity-90 text-white"
                data-ocid="post_ad.event.submit_button"
              >
                {createEvent.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting…
                  </>
                ) : (
                  "Post Event"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

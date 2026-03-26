import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { Building2, CheckCircle, Loader2, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { BusinessProfile, BusinessTier } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateBusiness } from "../hooks/useQueries";

const plans = [
  {
    tier: "basic" as BusinessTier,
    name: "Basic",
    price: 199,
    features: [
      "Business listing",
      "Contact details visible",
      "1 category",
      "Standard placement",
    ],
    color: "border-muted-foreground",
    badge: "",
  },
  {
    tier: "standard" as BusinessTier,
    name: "Standard",
    price: 499,
    features: [
      "Everything in Basic",
      "Featured badge",
      "3 categories",
      "Priority placement",
      "WhatsApp button",
    ],
    color: "border-munger-teal",
    badge: "Popular",
  },
  {
    tier: "premium" as BusinessTier,
    name: "Premium",
    price: 999,
    features: [
      "Everything in Standard",
      "Homepage spotlight",
      "Unlimited categories",
      "Top placement",
      "Social media links",
      "Analytics dashboard",
    ],
    color: "border-munger-orange",
    badge: "Best Value",
  },
];

export function BusinessRegister() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { actor } = useActor();
  const createBusiness = useCreateBusiness();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const [selectedPlan, setSelectedPlan] = useState<BusinessTier>(
    "standard" as BusinessTier,
  );
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    description: "",
    category: "",
    address: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-page-aqua min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center">
          <Building2 className="w-12 h-12 text-munger-teal mx-auto mb-4" />
          <h2 className="text-xl font-bold text-munger-dark mb-2">
            Register Your Business
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to list your business on Munger Connect
          </p>
          <Button
            className="bg-munger-teal hover:opacity-90 text-white font-semibold w-full"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            data-ocid="business.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In…
              </>
            ) : (
              "Sign In to Register"
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
          data-ocid="business.success_state"
        >
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-munger-dark mb-2">
            Application Submitted!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your business profile is pending admin approval. We’ll notify you
            once approved.
          </p>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity) return;
    const profile: BusinessProfile = {
      id: 0n,
      businessName: form.businessName,
      description: form.description,
      category: form.category,
      address: form.address,
      tier: selectedPlan,
      contactInfo: {
        name: form.contactName,
        email: form.contactEmail,
        phone: form.contactPhone,
      },
      ownerPrincipal: identity.getPrincipal(),
      createdAt: BigInt(Date.now()),
      isApproved: false,
      isFeatured: false,
    };
    try {
      await createBusiness.mutateAsync(profile);
      setSubmitted(true);
      toast.success("Business profile submitted for review!");
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-munger-teal text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Register Your Business</h1>
          </div>
          <p className="text-white/80 text-sm mt-1">
            अपना व्यापार दर्ज करें • Starting at ₹199/month
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Plan Selection */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-munger-dark mb-4">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <button
                key={plan.tier}
                type="button"
                onClick={() => setSelectedPlan(plan.tier)}
                data-ocid={`business.${plan.tier}.toggle`}
                className={`text-left rounded-2xl border-2 p-5 transition-all hover:shadow-md ${
                  selectedPlan === plan.tier
                    ? `${plan.color} shadow-md bg-white`
                    : "border-border bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-munger-dark">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <Badge
                      className={`text-[10px] ${plan.tier === "premium" ? "bg-munger-orange" : "bg-munger-teal"} text-white`}
                    >
                      {plan.tier === "standard" && (
                        <Star className="w-2.5 h-2.5 mr-1" />
                      )}
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-munger-orange mb-3">
                  ₹{plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /mo
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-card p-6 space-y-4"
          data-ocid="business.panel"
        >
          <h2 className="font-bold text-munger-dark">Business Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Business Name *</Label>
              <Input
                required
                value={form.businessName}
                onChange={(e) =>
                  setForm({ ...form, businessName: e.target.value })
                }
                placeholder="Your business name"
                className="text-xs"
                data-ocid="business.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger
                  className="text-xs"
                  data-ocid="business.category.select"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Restaurant",
                    "Retail Shop",
                    "Education",
                    "Healthcare",
                    "Electronics",
                    "Real Estate",
                    "Services",
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
              <Label className="text-xs">Business Address *</Label>
              <Input
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Full address in Munger"
                className="text-xs"
                data-ocid="business.address.input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Business Description *</Label>
            <Textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe your business, products or services…"
              rows={4}
              className="text-xs"
              data-ocid="business.description.textarea"
            />
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="text-xs font-semibold text-munger-dark mb-3">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Contact Name</Label>
                <Input
                  value={form.contactName}
                  onChange={(e) =>
                    setForm({ ...form, contactName: e.target.value })
                  }
                  placeholder="Name"
                  className="text-xs"
                  data-ocid="business.contact.name.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm({ ...form, contactEmail: e.target.value })
                  }
                  placeholder="Email"
                  className="text-xs"
                  data-ocid="business.contact.email.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone *</Label>
                <Input
                  required
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm({ ...form, contactPhone: e.target.value })
                  }
                  placeholder="+91-XXXXXXXXXX"
                  className="text-xs"
                  data-ocid="business.contact.phone.input"
                />
              </div>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-xs text-muted-foreground">
            Selected Plan:{" "}
            <strong className="text-munger-dark">
              {plans.find((p) => p.tier === selectedPlan)?.name}
            </strong>{" "}
            &mdash; ₹{plans.find((p) => p.tier === selectedPlan)?.price}/month
          </div>
          <Button
            type="submit"
            disabled={createBusiness.isPending}
            className="w-full bg-munger-teal hover:opacity-90 text-white font-semibold"
            data-ocid="business.submit_button"
          >
            {createBusiness.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit for Review"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

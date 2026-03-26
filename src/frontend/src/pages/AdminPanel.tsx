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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Loader2,
  Newspaper,
  Shield,
  Star,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { News, NewsCategory } from "../backend.d";
import { timeAgo } from "../data/sampleData";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllNews,
  useApproveBusiness,
  useCreateNews,
  useIsAdmin,
  usePendingBusinesses,
  useToggleNewsFeatured,
} from "../hooks/useQueries";

export function AdminPanel() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { actor } = useActor();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: pendingBusinesses = [] } = usePendingBusinesses();
  const { data: news = [] } = useAllNews();
  const createNews = useCreateNews();
  const approveBusiness = useApproveBusiness();
  const toggleFeatured = useToggleNewsFeatured();

  const isLoggedIn = loginStatus === "success" && !!identity;

  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    author: "",
    category: "local" as NewsCategory,
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-page-aqua min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center">
          <Shield className="w-12 h-12 text-munger-teal mx-auto mb-4" />
          <h2 className="text-xl font-bold text-munger-dark mb-2">
            Admin Panel
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with an admin account to access the control panel
          </p>
          <Button
            className="bg-munger-teal hover:opacity-90 text-white w-full"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In…
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (checkingAdmin) {
    return (
      <div
        className="bg-page-aqua min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="w-8 h-8 border-4 border-munger-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="bg-page-aqua min-h-screen flex items-center justify-center px-4">
        <div
          className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center"
          data-ocid="admin.error_state"
        >
          <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-munger-dark mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-muted-foreground">
            You do not have admin privileges to access this panel.
          </p>
        </div>
      </div>
    );
  }

  const handlePostNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity) return;
    const newsItem: News = {
      id: 0n,
      title: newsForm.title,
      content: newsForm.content,
      author: newsForm.author,
      category: newsForm.category,
      publishedAt: BigInt(Date.now()),
      isFeatured: false,
      images: [],
    };
    try {
      await createNews.mutateAsync(newsItem);
      setNewsForm({
        title: "",
        content: "",
        author: "",
        category: "local" as NewsCategory,
      });
      toast.success("News article published!");
    } catch {
      toast.error("Failed to post news.");
    }
  };

  return (
    <div className="bg-page-aqua min-h-screen">
      <div className="bg-munger-dark text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-munger-orange" />
            <h1 className="text-2xl font-bold">Admin Control Panel</h1>
          </div>
          <p className="text-white/70 text-sm mt-1">
            Munger Connect • Administration Dashboard
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8" data-ocid="admin.panel">
        <Tabs defaultValue="news">
          <TabsList className="mb-6" data-ocid="admin.tab">
            <TabsTrigger value="news" data-ocid="admin.news.tab">
              Post News
            </TabsTrigger>
            <TabsTrigger value="businesses" data-ocid="admin.businesses.tab">
              Pending Businesses
              {pendingBusinesses.length > 0 && (
                <Badge className="ml-2 text-[10px] bg-munger-orange text-white">
                  {pendingBusinesses.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="featured" data-ocid="admin.featured.tab">
              Manage Featured
            </TabsTrigger>
          </TabsList>

          {/* Post News */}
          <TabsContent value="news">
            <form
              onSubmit={handlePostNews}
              className="bg-white rounded-2xl shadow-card p-6 space-y-4"
              data-ocid="admin.news.panel"
            >
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="w-5 h-5 text-munger-teal" />
                <h2 className="font-bold text-munger-dark">
                  Publish News Article
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs">Headline *</Label>
                  <Input
                    required
                    value={newsForm.title}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, title: e.target.value })
                    }
                    placeholder="News headline"
                    className="text-xs"
                    data-ocid="admin.news.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Author</Label>
                  <Input
                    value={newsForm.author}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, author: e.target.value })
                    }
                    placeholder="Reporter name"
                    className="text-xs"
                    data-ocid="admin.news.author.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Category</Label>
                  <Select
                    value={newsForm.category}
                    onValueChange={(v) =>
                      setNewsForm({ ...newsForm, category: v as NewsCategory })
                    }
                  >
                    <SelectTrigger
                      className="text-xs"
                      data-ocid="admin.news.category.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "local",
                        "national",
                        "politics",
                        "culture",
                        "sports",
                      ].map((c) => (
                        <SelectItem
                          key={c}
                          value={c}
                          className="text-xs capitalize"
                        >
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Content *</Label>
                <Textarea
                  required
                  value={newsForm.content}
                  onChange={(e) =>
                    setNewsForm({ ...newsForm, content: e.target.value })
                  }
                  placeholder="Full news article content…"
                  rows={6}
                  className="text-xs"
                  data-ocid="admin.news.content.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={createNews.isPending}
                className="bg-munger-teal hover:opacity-90 text-white"
                data-ocid="admin.news.submit_button"
              >
                {createNews.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  "Publish Article"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Pending Businesses */}
          <TabsContent value="businesses">
            <div className="space-y-4" data-ocid="admin.businesses.list">
              {pendingBusinesses.length === 0 ? (
                <div
                  className="bg-white rounded-2xl shadow-card p-8 text-center"
                  data-ocid="admin.businesses.empty_state"
                >
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    No pending business approvals
                  </p>
                </div>
              ) : (
                pendingBusinesses.map((biz, i) => (
                  <motion.div
                    key={String(biz.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl shadow-card p-5 flex items-start gap-4"
                    data-ocid={`admin.businesses.item.${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-munger-teal flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-munger-dark">
                        {biz.businessName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {biz.category} &bull; {biz.address}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {biz.description}
                      </p>
                      <Badge className="mt-2 text-[10px] bg-munger-orange text-white capitalize">
                        {String(biz.tier)} Plan
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white text-xs flex-shrink-0"
                      onClick={() => {
                        approveBusiness.mutate(biz.id);
                        toast.success(`${biz.businessName} approved!`);
                      }}
                      disabled={approveBusiness.isPending}
                      data-ocid={`admin.businesses.approve.button.${i + 1}`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Manage Featured */}
          <TabsContent value="featured">
            <div className="space-y-3" data-ocid="admin.featured.list">
              <h3 className="font-bold text-munger-dark mb-2">
                Toggle News Featured Status
              </h3>
              {news.slice(0, 8).map((item, i) => (
                <div
                  key={String(item.id)}
                  className="bg-white rounded-xl shadow-card p-4 flex items-center gap-4"
                  data-ocid={`admin.featured.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-munger-dark truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(item.publishedAt)} &bull; {String(item.category)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={item.isFeatured ? "default" : "outline"}
                    className={
                      item.isFeatured
                        ? "bg-munger-orange text-white text-xs"
                        : "border-munger-orange text-munger-orange text-xs"
                    }
                    onClick={() => {
                      toggleFeatured.mutate(item.id);
                      toast.success(
                        item.isFeatured
                          ? "Removed from featured"
                          : "Added to featured",
                      );
                    }}
                    data-ocid={`admin.featured.toggle.${i + 1}`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    {item.isFeatured ? "Unfeature" : "Feature"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

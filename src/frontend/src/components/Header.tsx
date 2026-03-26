import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, MapPin, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Header() {
  const { navigate } = useApp();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = loginStatus === "success" && !!identity;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      data-ocid="header.panel"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => navigate("home")}
            data-ocid="header.link"
          >
            <div className="w-10 h-10 rounded-full bg-munger-orange flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-base text-munger-dark leading-tight tracking-wide uppercase">
                Munger Connect
              </div>
              <div className="text-[10px] text-munger-teal font-medium">
                मुंगेर कनेक्ट
              </div>
            </div>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Local News, Jobs, Market…"
                className="pl-9 pr-4 py-2 text-sm bg-muted border-0 focus:ring-1"
                data-ocid="header.search_input"
              />
            </div>
          </form>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-munger-teal transition-colors"
            >
              English <ChevronDown className="w-3 h-3" />
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden lg:block">
                  {identity.getPrincipal().toString().slice(0, 8)}&hellip;
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clear()}
                  className="text-xs border-munger-teal text-munger-teal hover:bg-munger-teal hover:text-white"
                  data-ocid="header.button"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => login()}
                disabled={loginStatus === "logging-in"}
                className="text-xs border-munger-teal text-munger-teal hover:bg-munger-teal hover:text-white"
                data-ocid="header.button"
              >
                {loginStatus === "logging-in"
                  ? "Signing In…"
                  : "Sign In / Register"}
              </Button>
            )}
            <Button
              size="sm"
              className="text-xs bg-munger-orange hover:bg-orange-dark text-white font-semibold"
              onClick={() => navigate("post-ad")}
              data-ocid="header.primary_button"
            >
              + Post AD
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="header.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <div className="flex gap-2">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => {
                    clear();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => {
                    login();
                    setMobileMenuOpen(false);
                  }}
                  data-ocid="header.button"
                >
                  Sign In / Register
                </Button>
              )}
              <Button
                size="sm"
                className="flex-1 text-xs bg-munger-orange text-white"
                onClick={() => {
                  navigate("post-ad");
                  setMobileMenuOpen(false);
                }}
                data-ocid="header.primary_button"
              >
                + Post AD
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

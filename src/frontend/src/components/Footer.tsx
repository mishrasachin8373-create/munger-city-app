import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { useApp } from "../context/AppContext";

export function Footer() {
  const { navigate } = useApp();
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-munger-teal text-white" data-ocid="footer.panel">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5" />
              <span className="font-bold text-base uppercase tracking-wide">
                Munger Connect
              </span>
            </div>
            <p className="text-xs text-white/80 mb-3 leading-relaxed">
              Your one-stop local city app for Munger, Bihar. News, Jobs,
              Marketplace, Services and Events — all in one place.
            </p>
            <p className="text-xs text-white/70">
              मुंगेर शहर का सबसे भरोसेमंद डिजिटल मंच
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {[
                { label: "Local News", page: "news" as const },
                { label: "Jobs", page: "jobs" as const },
                { label: "Marketplace", page: "marketplace" as const },
                { label: "Services", page: "services" as const },
                { label: "Events", page: "events" as const },
                {
                  label: "Business Register",
                  page: "business-register" as const,
                },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    onClick={() => navigate(link.page)}
                    className="hover:text-white transition-colors"
                    data-ocid={`footer.${link.page}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                Munger, Bihar – 811201
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 flex-shrink-0" />
                hello@mungerconnect.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 flex-shrink-0" />
                +91-6344-220000
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-xs font-semibold mb-2">Advertise With Us</h5>
              <p className="text-xs text-white/70">
                ₹199 – ₹999/month for business listings
              </p>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">
              Stay Updated
            </h4>
            <p className="text-xs text-white/80 mb-3">
              स्थानीय खबरें सीधे अपने इनबॉक्स में पाएं
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-1.5 text-xs rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/50 outline-none"
              />
              <button
                type="button"
                className="px-3 py-1.5 bg-munger-orange text-white text-xs rounded-md font-semibold hover:bg-orange-dark transition-colors"
              >
                Subscribe
              </button>
            </div>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {year} Munger Connect. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

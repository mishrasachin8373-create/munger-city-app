import { type Page, useApp } from "../context/AppContext";

const navLinks: { label: string; hindi: string; page: Page }[] = [
  { label: "Home", hindi: "घर", page: "home" },
  { label: "News", hindi: "समाचार", page: "news" },
  { label: "Jobs", hindi: "नौकरी", page: "jobs" },
  { label: "Marketplace", hindi: "बाज़ार", page: "marketplace" },
  { label: "Services", hindi: "सेवाएँ", page: "services" },
  { label: "Events", hindi: "कार्यक्रम", page: "events" },
];

export function NavBar() {
  const { currentPage, navigate } = useApp();

  return (
    <nav
      className="bg-nav-mint border-b border-border sticky top-[73px] z-40"
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => navigate(link.page)}
              data-ocid={`nav.${link.page}.link`}
              className={`flex flex-col items-center px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                currentPage === link.page
                  ? "border-munger-orange text-munger-orange"
                  : "border-transparent text-munger-dark hover:text-munger-teal hover:border-munger-teal"
              }`}
            >
              <span>{link.label}</span>
              <span className="text-[9px] font-normal opacity-70">
                {link.hindi}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

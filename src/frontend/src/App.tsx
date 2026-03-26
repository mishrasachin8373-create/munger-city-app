import { Toaster } from "@/components/ui/sonner";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { AppProvider, useApp } from "./context/AppContext";
import { AdminPanel } from "./pages/AdminPanel";
import { BusinessRegister } from "./pages/BusinessRegister";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";
import { Marketplace } from "./pages/Marketplace";
import { News } from "./pages/News";
import { PostAd } from "./pages/PostAd";
import { Services } from "./pages/Services";

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "news":
        return <News />;
      case "jobs":
        return <Jobs />;
      case "marketplace":
        return <Marketplace />;
      case "services":
        return <Services />;
      case "events":
        return <Events />;
      case "post-ad":
        return <PostAd />;
      case "business-register":
        return <BusinessRegister />;
      case "admin":
        return <AdminPanel />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Header />
      <NavBar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

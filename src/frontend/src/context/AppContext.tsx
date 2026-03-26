import type React from "react";
import { createContext, useContext, useState } from "react";

export type Page =
  | "home"
  | "news"
  | "jobs"
  | "marketplace"
  | "services"
  | "events"
  | "post-ad"
  | "business-register"
  | "admin";

interface AppContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const AppContext = createContext<AppContextType>({
  currentPage: "home",
  navigate: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  return (
    <AppContext.Provider value={{ currentPage, navigate: setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

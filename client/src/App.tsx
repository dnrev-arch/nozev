import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";

import LoginPage from "@/pages/login";
import LivesPage from "@/pages/lives";
import PlayerPage from "@/pages/player";
import MessagesPage from "@/pages/messages";
import ProfilePage from "@/pages/profile";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("nozev_logged_in") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn && location !== "/") {
      setLocation("/");
    }
  }, [location, setLocation]);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}

function Router() {
  const [location] = useLocation();
  const showBottomNav = !["/", "/player"].some((path) => 
    location === path || location.startsWith("/player/")
  );

  return (
    <>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/lives">
          <ProtectedRoute>
            <LivesPage />
          </ProtectedRoute>
        </Route>
        <Route path="/player/:id">
          <ProtectedRoute>
            <PlayerPage />
          </ProtectedRoute>
        </Route>
        <Route path="/messages">
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        </Route>
        <Route path="/profile">
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      {showBottomNav && <BottomNav />}
    </>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

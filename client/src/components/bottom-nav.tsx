import { useLocation } from "wouter";
import { Video, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/lives", icon: Video, label: "Lives", testId: "nav-lives" },
  { path: "/messages", icon: MessageSquare, label: "Mensagens", testId: "nav-messages" },
  { path: "/profile", icon: User, label: "Perfil", testId: "nav-profile" },
];

export function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-card-border">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors hover-elevate active-elevate-2",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              data-testid={item.testId}
            >
              <Icon
                className={cn("transition-transform", isActive ? "scale-110" : "scale-100")}
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn("text-xs", isActive && "font-semibold")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

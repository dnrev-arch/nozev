import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emailDomains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email.includes("@")) {
        const [, domain] = email.split("@");
        if (domain && domain.length > 2) {
          const matchedDomain = emailDomains.find(
            (d) => d.startsWith(domain.toLowerCase()) && d !== domain
          );
          if (matchedDomain) {
            const [username] = email.split("@");
            setSuggestion(`${username}@${matchedDomain}`);
          } else {
            setSuggestion("");
          }
        } else {
          setSuggestion("");
        }
      } else {
        setSuggestion("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [email]);

  const handleLogin = () => {
    if (email && email.includes("@")) {
      const profile = JSON.parse(localStorage.getItem("nozev_profile") || "{}");
      profile.email = email;
      localStorage.setItem("nozev_profile", JSON.stringify(profile));
      localStorage.setItem("nozev_logged_in", "true");
      setLocation("/lives");
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      setEmail(suggestion);
      setSuggestion("");
    }
  };

  const isValidEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/20 animate-fade-in">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-primary tracking-tight" data-testid="text-app-logo">
            NOZEV
          </h1>
          <p className="text-sm text-muted-foreground">
            Plataforma de Lives Simuladas
          </p>
        </div>

        <div className="space-y-6 animate-slide-up">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isValidEmail) {
                  handleLogin();
                }
              }}
              className="h-14 text-base"
              data-testid="input-email"
              autoFocus
            />
            {suggestion && (
              <button
                onClick={applySuggestion}
                className="text-xs text-muted-foreground italic hover:text-foreground transition-colors"
                data-testid="button-email-suggestion"
              >
                Você quis dizer: <span className="text-primary">{suggestion}</span>?
              </button>
            )}
          </div>

          <Button
            onClick={handleLogin}
            disabled={!isValidEmail}
            className="w-full h-12 text-base font-semibold"
            data-testid="button-login"
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Loader2 } from "lucide-react";
import { UserProfile } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ProfilePage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lastSavedProfile, setLastSavedProfile] = useState<string>("");
  
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    name: "",
    photoUrl: "",
    preferences: {
      womanType: undefined,
      interest: undefined,
      acceptsContact: [],
    },
  });

  // Get email from localStorage for profile query
  const getStoredEmail = () => {
    const saved = localStorage.getItem("nozev_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.email;
      } catch {
        return "";
      }
    }
    return "";
  };

  const storedEmail = getStoredEmail();

  // Initialize profile from localStorage first
  useEffect(() => {
    const saved = localStorage.getItem("nozev_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const initialProfile = {
          email: parsed.email || "",
          name: parsed.name || "",
          photoUrl: parsed.photoUrl || "",
          preferences: {
            womanType: parsed.preferences?.womanType,
            interest: parsed.preferences?.interest,
            acceptsContact: parsed.preferences?.acceptsContact || [],
          },
        };
        setProfile(initialProfile);
        setLastSavedProfile(JSON.stringify(initialProfile));
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  }, []);

  // Load profile from backend (if email is available)
  // This runs after the initial localStorage load
  const { data: backendProfile } = useQuery<UserProfile>({
    queryKey: [`/api/profile/${storedEmail}`],
    enabled: !!storedEmail,
    retry: false,
    staleTime: Infinity, // Don't refetch automatically
  });

  // Merge backend profile if available (takes priority over localStorage)
  useEffect(() => {
    if (backendProfile && backendProfile.email) {
      setProfile(backendProfile);
      setLastSavedProfile(JSON.stringify(backendProfile));
      // Update localStorage with backend data
      localStorage.setItem("nozev_profile", JSON.stringify(backendProfile));
    }
  }, [backendProfile]);

  // Mutation to save profile (explicit save only, no auto-save toast)
  const saveProfileMutation = useMutation({
    mutationFn: async (data: { profileData: UserProfile; showToast?: boolean }) => {
      // Save to localStorage first
      localStorage.setItem("nozev_profile", JSON.stringify(data.profileData));
      // Then save to backend (for demo purposes)
      return apiRequest("POST", "/api/profile", data.profileData);
    },
    onSuccess: (_, variables) => {
      if (variables.showToast) {
        toast({
          title: "Perfil salvo!",
          description: "Suas preferências foram atualizadas com sucesso.",
        });
      }
    },
    onError: (error, variables) => {
      // Still save to localStorage even if backend fails
      localStorage.setItem("nozev_profile", JSON.stringify(variables.profileData));
      if (variables.showToast) {
        toast({
          title: "Perfil salvo localmente",
          description: "Suas alterações foram salvas no dispositivo.",
        });
      }
    },
  });

  // Silent auto-save only when profile actually changes (no toast interruption)
  useEffect(() => {
    const currentProfileStr = JSON.stringify(profile);
    
    // Only save if profile changed and has required data
    if (
      profile.email &&
      currentProfileStr !== lastSavedProfile &&
      (profile.name || profile.photoUrl || profile.preferences?.womanType)
    ) {
      const timer = setTimeout(() => {
        // Silent save - no toast
        saveProfileMutation.mutate({ profileData: profile, showToast: false });
        setLastSavedProfile(currentProfileStr);
      }, 1500); // 1.5 second debounce for smoother UX
      
      return () => clearTimeout(timer);
    }
  }, [profile, lastSavedProfile]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleContactPreference = (value: string) => {
    const current = profile.preferences?.acceptsContact || [];
    
    if (value === "todas") {
      if (current.includes("todas")) {
        setProfile({
          ...profile,
          preferences: { ...profile.preferences, acceptsContact: [] },
        });
      } else {
        setProfile({
          ...profile,
          preferences: {
            ...profile.preferences,
            acceptsContact: ["todas"],
          },
        });
      }
    } else {
      const newAccepts = current.includes(value)
        ? current.filter((v) => v !== value && v !== "todas")
        : [...current.filter((v) => v !== "todas"), value];
      
      setProfile({
        ...profile,
        preferences: { ...profile.preferences, acceptsContact: newAccepts },
      });
    }
  };

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen p-6 pb-24 animate-fade-in">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" data-testid="text-page-title">
            Perfil
          </h1>
          <p className="text-sm text-muted-foreground">
            Personalize suas informações
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24" data-testid="avatar-profile">
              {profile.photoUrl ? (
                <AvatarImage src={profile.photoUrl} alt={profile.name || "User"} />
              ) : (
                <AvatarFallback className="bg-muted text-2xl">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover-elevate active-elevate-2 shadow-lg"
              data-testid="button-upload-photo"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              data-testid="input-name"
            />
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Tipo de Mulher</Label>
            <RadioGroup
              value={profile.preferences?.womanType || ""}
              onValueChange={(value) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    womanType: value as "casada" | "solteira" | "safada",
                  },
                })
              }
            >
              {["casada", "solteira", "safada"].map((type) => (
                <div
                  key={type}
                  className="flex items-center space-x-3 py-2"
                  data-testid={`radio-woman-type-${type}`}
                >
                  <RadioGroupItem value={type} id={`woman-${type}`} />
                  <Label
                    htmlFor={`woman-${type}`}
                    className="capitalize font-normal cursor-pointer flex-1"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Interesse</Label>
            <RadioGroup
              value={profile.preferences?.interest || ""}
              onValueChange={(value) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    interest: value as "namoro" | "amizade" | "sexo-casual",
                  },
                })
              }
            >
              {[
                { value: "namoro", label: "Namoro" },
                { value: "amizade", label: "Amizade" },
                { value: "sexo-casual", label: "Sexo Casual" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 py-2"
                  data-testid={`radio-interest-${option.value}`}
                >
                  <RadioGroupItem value={option.value} id={`interest-${option.value}`} />
                  <Label
                    htmlFor={`interest-${option.value}`}
                    className="font-normal cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Aceita Receber</Label>
            <div className="space-y-2">
              {[
                { value: "mensagens", label: "Mensagens" },
                { value: "video", label: "Ligação por vídeo" },
                { value: "voz", label: "Ligação por voz" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "todas", label: "Todas" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 py-2"
                  data-testid={`checkbox-contact-${option.value}`}
                >
                  <Checkbox
                    id={`contact-${option.value}`}
                    checked={profile.preferences?.acceptsContact?.includes(option.value as any)}
                    onCheckedChange={() => toggleContactPreference(option.value)}
                  />
                  <Label
                    htmlFor={`contact-${option.value}`}
                    className="font-normal cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={() => saveProfileMutation.mutate({ profileData: profile, showToast: true })}
          disabled={saveProfileMutation.isPending}
          className="w-full"
          data-testid="button-save-profile"
        >
          {saveProfileMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Salvar Perfil
        </Button>
      </div>
    </div>
  );
}

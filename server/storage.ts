import { LiveStream, UserProfile } from "@shared/schema";

export interface IStorage {
  getLives(): Promise<LiveStream[]>;
  getLiveById(id: string): Promise<LiveStream | undefined>;
  getUserProfile(email: string): Promise<UserProfile | undefined>;
  saveUserProfile(profile: UserProfile): Promise<UserProfile>;
}

export class MemStorage implements IStorage {
  private lives: Map<string, LiveStream>;
  private profiles: Map<string, UserProfile>;

  constructor() {
    this.lives = new Map();
    this.profiles = new Map();
    this.initializeDemoLives();
  }

  private initializeDemoLives() {
    const demoLives: LiveStream[] = [
      {
        id: "1",
        title: "Live Especial - Conexões Autênticas",
        thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        baseViewerCount: 87,
        category: "Relacionamentos",
      },
      {
        id: "2",
        title: "Noite de Conversas Íntimas",
        thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=450&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        baseViewerCount: 124,
        category: "Lifestyle",
      },
      {
        id: "3",
        title: "Encontros Sinceros ao Vivo",
        thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=450&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        baseViewerCount: 95,
        category: "Social",
      },
      {
        id: "4",
        title: "Conexão Real - Sem Filtros",
        thumbnailUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=450&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        baseViewerCount: 78,
        category: "Entretenimento",
      },
      {
        id: "5",
        title: "Bate-papo Descontraído",
        thumbnailUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=450&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        baseViewerCount: 112,
        category: "Conversas",
      },
      {
        id: "6",
        title: "Momento de Verdade",
        thumbnailUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=450&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        baseViewerCount: 89,
        category: "Lifestyle",
      },
    ];

    demoLives.forEach((live) => {
      this.lives.set(live.id, live);
    });
  }

  async getLives(): Promise<LiveStream[]> {
    return Array.from(this.lives.values());
  }

  async getLiveById(id: string): Promise<LiveStream | undefined> {
    return this.lives.get(id);
  }

  async getUserProfile(email: string): Promise<UserProfile | undefined> {
    return this.profiles.get(email);
  }

  async saveUserProfile(profile: UserProfile): Promise<UserProfile> {
    this.profiles.set(profile.email, profile);
    return profile;
  }
}

export const storage = new MemStorage();

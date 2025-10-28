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
        title: "Amandinha 🔥 - Hoje é até de Madrugada...",
        thumbnailUrl: "https://e-volutionn.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-06-at-23.39.56-2.jpeg",
        videoUrl: "https://files.catbox.moe/tfabci.mp4",
        baseViewerCount: 87,
        category: "Sexo",
      },
      {
        id: "2",
        title: "Alguem me tira do tédio??",
        thumbnailUrl: "https://e-volutionn.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-20-at-22.17.14-1.jpeg",
        videoUrl: "https://files.catbox.moe/hoyuba.mp4",
        baseViewerCount: 124,
        category: "Relacionamento",
      },
      {
        id: "3",
        title: "Bucetinha ROSADINHA! Cadê os homens?",
        thumbnailUrl: "https://e-volutionn.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-18-at-20.40.34.jpeg",
        videoUrl: "https://files.catbox.moe/8vedh5.mp4",
        baseViewerCount: 95,
        category: "Sexo",
      },
      {
        id: "4",
        title: "Juliana, amizades e bate papo",
        thumbnailUrl: "https://e-volutionn.com/wp-content/uploads/2024/12/Sara-Martins.jpg",
        videoUrl: "https://files.catbox.moe/folcjh.mp4",
        baseViewerCount: 78,
        category: "Bate Papo",
      },
      {
        id: "5",
        title: "Vamos conversar? desrespeito = BAN",
        thumbnailUrl: "https://e-volutionn.com/wp-content/uploads/2024/12/Simone-Furtado.jpg",
        videoUrl: "https://files.catbox.moe/vd6hsh.mp4",
        baseViewerCount: 112,
        category: "Conversas",
      },
      {
        id: "6",
        title: "Caroline - Quero fuder a noite toda...",
        thumbnailUrl: "https://e-volutionn.com/wp-content/uploads/2024/12/Rebeca-Sales.jpg",
        videoUrl: "https://files.catbox.moe/gf79lz.mp4",
        baseViewerCount: 89,
        category: "Sexo",
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

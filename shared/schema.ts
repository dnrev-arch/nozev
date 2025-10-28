import { z } from "zod";

// Live Stream Schema
export const liveStreamSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  videoUrl: z.string(),
  baseViewerCount: z.number().min(50).max(150),
  category: z.string().optional(),
});

export type LiveStream = z.infer<typeof liveStreamSchema>;

// User Profile Schema
export const userProfileSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  photoUrl: z.string().optional(),
  preferences: z.object({
    womanType: z.enum(["casada", "solteira", "safada"]).optional(),
    interest: z.enum(["namoro", "amizade", "sexo-casual"]).optional(),
    acceptsContact: z.array(z.enum(["mensagens", "video", "voz", "whatsapp", "todas"])).optional(),
  }).optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// Configuration for demo content
export const livesConfigSchema = z.object({
  lives: z.array(liveStreamSchema),
});

export type LivesConfig = z.infer<typeof livesConfigSchema>;

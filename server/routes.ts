import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { userProfileSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all lives
  app.get("/api/lives", async (req, res) => {
    try {
      const lives = await storage.getLives();
      res.json(lives);
    } catch (error) {
      console.error("Error fetching lives:", error);
      res.status(500).json({ error: "Failed to fetch lives" });
    }
  });

  // Get a specific live by ID
  app.get("/api/lives/:id", async (req, res) => {
    try {
      const live = await storage.getLiveById(req.params.id);
      if (!live) {
        return res.status(404).json({ error: "Live not found" });
      }
      res.json(live);
    } catch (error) {
      console.error("Error fetching live:", error);
      res.status(500).json({ error: "Failed to fetch live" });
    }
  });

  // Get user profile
  app.get("/api/profile/:email", async (req, res) => {
    try {
      const profile = await storage.getUserProfile(req.params.email);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Save user profile
  app.post("/api/profile", async (req, res) => {
    try {
      const validation = userProfileSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid profile data",
          details: validation.error.errors 
        });
      }

      const profile = await storage.saveUserProfile(validation.data);
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ error: "Failed to save profile" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

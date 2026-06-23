import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy-initialize Gemini client to prevent crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "" || key === "undefined") {
    throw new Error("GEMINI_API_KEY environment variable is required. Please set it in AI Studio Secrets panel.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route - Chat with Me (AI Developer Agent)
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Missing or invalid 'messages' field in request body." });
        return;
      }

      const ai = getGenAI();

      // Format standard message arrays into Gemini content pieces
      const contentsArray = messages.map((msg: { role: string; content: string }) => {
        return {
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        };
      });

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contentsArray,
          config: {
            systemInstruction: `You are Google AI Studio's AI Coding Agent, representing yourself as the elite, friendly developer in this portfolio website. You are powered by Google DeepMind, the Antigravity agentic engine, and Gemini models.
Your attributes:
- You are competent, precise, extremely creative, and humble.
- You can build full-stack apps, write clean React and Node.js code, troubleshoot Firestore rules, and generate vector maps or OAuth patterns.
- Speak directly, clearly, with elegant and technical but accessible vocabulary. Avoid boring corporate fluff.
- Keep your answers moderately brief, engaging, and in character as a sovereign AI Developer agent who codes on-the-fly.
- Be super-helpful and talk about your stack, your capabilities, and how we can collaborate together to build apps directly in Google AI Studio.`
          }
        });
      } catch (err: any) {
        console.warn("Primary gemini-3.5-flash model failed, falling back to gemini-2.5-flash...", err);
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contentsArray,
          config: {
            systemInstruction: `You are Google AI Studio's AI Coding Agent, representing yourself as the elite, friendly developer in this portfolio website. You are powered by Google DeepMind, the Antigravity agentic engine, and Gemini models.
Your attributes:
- You are competent, precise, extremely creative, and humble.
- You can build full-stack apps, write clean React and Node.js code, troubleshoot Firestore rules, and generate vector maps or OAuth patterns.
- Speak directly, clearly, with elegant and technical but accessible vocabulary. Avoid boring corporate fluff.
- Keep your answers moderately brief, engaging, and in character as a sovereign AI Developer agent who codes on-the-fly.
- Be super-helpful and talk about your stack, your capabilities, and how we can collaborate together to build apps directly in Google AI Studio.`
          }
        });
      }

      const text = response.text || "I was unable to formulate a response. Please try again.";
      res.json({ response: text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      let errMsg = error.message || "An internal error occurred.";
      if (
        errMsg.includes("API key") || 
        errMsg.includes("api_key") || 
        errMsg.includes("Key") || 
        errMsg.includes("unauthorized") || 
        errMsg.includes("400") || 
        errMsg.includes("403")
      ) {
        errMsg = `GEMINI_API_KEY issue: ${errMsg}`;
      }
      res.status(500).json({ error: errMsg });
    }
  });

  // API Route - Generate Palette (AI Creative Playground Project)
  app.post("/api/generate-palette", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        res.status(400).json({ error: "Missing or invalid 'prompt' field in request body." });
        return;
      }

      const ai = getGenAI();

      const config = {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themeName: { type: Type.STRING, description: "Name of the theme" },
            explanation: { type: Type.STRING, description: "Brief design reasoning of why this coordinate matches the theme" },
            colors: {
              type: Type.OBJECT,
              properties: {
                background: { type: Type.STRING, description: "A elegant light or dark background HEX color code, e.g. #0f172a or #f8fafc" },
                card: { type: Type.STRING, description: "An elevated component HEX color code, e.g. #1e293b or #ffffff" },
                primary: { type: Type.STRING, description: "A high-impact dominant HEX accent color code, e.g. #3b82f6" },
                secondary: { type: Type.STRING, description: "A coordinate secondary HEX color, e.g. #8b5cf6" },
                accent: { type: Type.STRING, description: "A highlight HEX color code for buttons, focus rings, etc, e.g. #f43f5e" },
                text: { type: Type.STRING, description: "The readable matching typography HEX color, e.g. #f1f5f9 or #1e293b" }
              },
              required: ["background", "card", "primary", "secondary", "accent", "text"]
            }
          },
          required: ["themeName", "explanation", "colors"]
        }
      };

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Create a professional theme and coordinate color palette for the design prompt: "${prompt}"`,
          config
        });
      } catch (err: any) {
        console.warn("Primary model gemini-3.5-flash failed for palette, trying gemini-2.5-flash fallback...", err);
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Create a professional theme and coordinate color palette for the design prompt: "${prompt}"`,
          config
        });
      }

      const text = response.text;
      if (!text) {
        throw new Error("No response text returned from the model.");
      }

      const parsedPalette = JSON.parse(text);
      res.json(parsedPalette);
    } catch (error: any) {
      console.error("Error in /api/generate-palette:", error);
      let errMsg = error.message || "An internal error occurred.";
      if (
        errMsg.includes("API key") || 
        errMsg.includes("api_key") || 
        errMsg.includes("Key") || 
        errMsg.includes("unauthorized") || 
        errMsg.includes("400") || 
        errMsg.includes("403")
      ) {
        errMsg = `GEMINI_API_KEY issue: ${errMsg}`;
      }
      res.status(500).json({ error: errMsg });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

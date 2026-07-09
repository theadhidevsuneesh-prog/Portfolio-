import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

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
      const systemInstruction = `You are Adhi's AI Assistant, representing yourself as a friendly, helpful portfolio companion. You were developed by Adhidev Suneesh.
Your guidelines:
- Be brief, simple, clear, and extremely polite. Avoid complicated developer jargon.
- Proudly explain that you were developed by Adhidev Suneesh.
- Share details about Adhidev's projects (such as Solo Leveling Web App, Safar AI, Aura AI, Gusto AI, Leo AI Financing, Zyntax AI, Velvet Letters, Popcorn AI, and Zenith Focus).
- Discuss Adhidev's skills (React, TypeScript, Next.js, Express, Tailwind CSS, generative AI) and how users can contact him.`;

      try {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contentsArray,
          config: { systemInstruction }
        });
      } catch (err: any) {
        console.warn("Primary gemini-3.5-flash model failed, falling back to gemini-flash-latest...", err);
        try {
          response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: contentsArray,
            config: { systemInstruction }
          });
        } catch (fallbackErr: any) {
          console.warn("Fallback gemini-flash-latest failed, trying gemini-3.1-flash-lite...", fallbackErr);
          response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: contentsArray,
            config: { systemInstruction }
          });
        }
      }

      const text = response.text || "I was unable to formulate a response. Please try again.";
      res.json({ response: text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      const errMsg = error.message || String(error);
      
      let reason = "API_ERROR";
      let status = 500;

      // Check if the key is missing or is placeholder
      const key = process.env.GEMINI_API_KEY;
      if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "" || key === "undefined") {
        reason = "KEY_MISSING";
        status = 400;
      } else if (
        errMsg.toLowerCase().includes("quota") ||
        errMsg.toLowerCase().includes("429") ||
        errMsg.toLowerCase().includes("resource_exhausted") ||
        errMsg.toLowerCase().includes("limit exceeded")
      ) {
        reason = "QUOTA_EXHAUSTED";
        status = 429;
      } else if (
        errMsg.toLowerCase().includes("503") ||
        errMsg.toLowerCase().includes("unavailable") ||
        errMsg.toLowerCase().includes("overloaded")
      ) {
        reason = "SERVICE_UNAVAILABLE";
        status = 503;
      } else if (
        errMsg.toLowerCase().includes("api key") ||
        errMsg.toLowerCase().includes("api_key") ||
        errMsg.toLowerCase().includes("unauthorized") ||
        errMsg.toLowerCase().includes("invalid key") ||
        errMsg.toLowerCase().includes("403") ||
        errMsg.toLowerCase().includes("400")
      ) {
        reason = "KEY_INVALID";
        status = 401;
      }

      res.status(status).json({ 
        error: errMsg,
        reason 
      });
    }
  });

  // API Route - Coordinated Contact Dispatcher
  app.post("/api/contact", async (req, res) => {
    try {
      const { clientName, clientEmail, projectType, description } = req.body;

      if (!clientName || !clientEmail || !description) {
        res.status(400).json({ error: "Client Name, Coordinated Email, and technical prompt description are required." });
        return;
      }

      const receiverEmail = process.env.RECEIVER_EMAIL || "theadhidevsuneesh@gmail.com";
      const resendKey = process.env.RESEND_API_KEY;

      // Option A: Try Resend API if API Key is configured
      if (resendKey && resendKey !== "MY_RESEND_API_KEY" && resendKey.trim() !== "") {
        try {
          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${resendKey}`
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: receiverEmail,
              reply_to: clientEmail,
              subject: `[Portfolio Dispatch] ${projectType} from ${clientName}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
                  <h2 style="color: #4f46e5; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">New Portfolio Dispatch Request</h2>
                  <p style="margin: 10px 0;"><strong>Client Name / ID:</strong> ${clientName}</p>
                  <p style="margin: 10px 0;"><strong>Coordinated Email:</strong> <a href="mailto:${clientEmail}" style="color: #4f46e5; text-decoration: none;">${clientEmail}</a></p>
                  <p style="margin: 10px 0;"><strong>Target Architecture:</strong> <span style="background-color: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${projectType}</span></p>
                  <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #f1f5f9; margin-top: 15px;">
                    <p style="margin-top: 0; font-weight: bold; color: #64748b; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 0.05em;">Technical Prompt Blueprint</p>
                    <p style="margin-bottom: 0; white-space: pre-wrap; font-size: 13px; color: #334155; line-height: 1.5;">${description}</p>
                  </div>
                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
                  <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 0;">Sent via your Portfolio's Resend integration.</p>
                </div>
              `
            })
          });

          if (resendResponse.ok) {
            res.json({ 
              success: true, 
              simulated: false, 
              provider: "resend",
              message: "Handshake payload successfully dispatched to Resend." 
            });
            return;
          } else {
            const errText = await resendResponse.text();
            console.warn("Resend API failed, continuing with SMTP check...", errText);
          }
        } catch (resendErr) {
          console.warn("Error calling Resend API, checking SMTP configuration...", resendErr);
        }
      }

      // Option B: Try SMTP Server (Nodemailer)
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpUser && smtpPass && smtpUser.trim() !== "" && smtpPass.trim() !== "") {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"${clientName}" <${smtpUser}>`,
          replyTo: clientEmail,
          to: receiverEmail,
          subject: `[Portfolio SMTP Dispatch] ${projectType} from ${clientName}`,
          text: `New request from your portfolio website:
          
Name: ${clientName}
Email: ${clientEmail}
Project Type: ${projectType}

Description/Blueprint:
${description}
          `,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
              <h2 style="color: #4f46e5; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">New Portfolio SMTP Request</h2>
              <p style="margin: 10px 0;"><strong>Client Name / ID:</strong> ${clientName}</p>
              <p style="margin: 10px 0;"><strong>Coordinated Email:</strong> <a href="mailto:${clientEmail}" style="color: #4f46e5; text-decoration: none;">${clientEmail}</a></p>
              <p style="margin: 10px 0;"><strong>Target Architecture:</strong> <span style="background-color: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${projectType}</span></p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #f1f5f9; margin-top: 15px;">
                <p style="margin-top: 0; font-weight: bold; color: #64748b; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 0.05em;">Technical Prompt Blueprint</p>
                <p style="margin-bottom: 0; white-space: pre-wrap; font-size: 13px; color: #334155; line-height: 1.5;">${description}</p>
              </div>
              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
              <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 0;">Sent via your Portfolio's Nodemailer SMTP integration.</p>
            </div>
          `
        });

        res.json({ 
          success: true, 
          simulated: false, 
          provider: "smtp",
          message: "Handshake payload successfully dispatched via SMTP." 
        });
        return;
      }

      // Option C: Return Simulated Success with guidance because credentials are not configured yet
      res.json({
        success: true,
        simulated: true,
        message: "Handshake processed! Real email receipt requires SMTP or Resend API registration.",
        instructions: "To receive actual emails to your inbox, register your SMTP credentials (SMTP_USER & SMTP_PASS) or RESEND_API_KEY under Settings > Secrets in AI Studio!"
      });
    } catch (err: any) {
      console.error("Error dispatching contact request:", err);
      res.status(500).json({ error: err.message || "Failed to dispatch coordinated request." });
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

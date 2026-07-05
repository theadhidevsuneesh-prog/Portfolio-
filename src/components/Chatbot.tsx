import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Terminal, ShieldAlert, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { useTheme } from "../ThemeContext";

export default function Chatbot() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>( [
    {
      id: "initial",
      role: "assistant",
      content: "Hello! I am Adhi's AI Assistant, developed by Adhidev Suneesh. I'm here to help you learn more about Adhidev's background, professional projects, and technology stack. Ask me anything! ⚡",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyError, setKeyError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Tell me about Adhidev.",
    "What are his latest projects?",
    "What is Adhidev's tech stack?",
    "How can I contact him?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setKeyError(false);
    let isApiKeyError = false;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Collect history context to send to API
      const historyContext = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyContext })
      });

      if (!res.ok) {
        const errObj = await res.json().catch(() => ({}));
        const errStr = errObj.error || "";
        const reason = errObj.reason || "API_ERROR";
        
        const error = new Error(errStr || "Network response was not ok");
        (error as any).reason = reason;
        throw error;
      }

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chatbot API Error:", err);
      
      const reason = err?.reason || "API_ERROR";
      const isKeyErr = (reason === "KEY_MISSING" || reason === "KEY_INVALID");
      const isQuotaErr = (reason === "QUOTA_EXHAUSTED");

      if (isKeyErr) {
        setKeyError(true);
      }
      
      // Intelligent Local Fallback Mode (Triggered on ANY error to keep the user experience seamless)
      const lowerText = textToSend.toLowerCase();
      let localResponse = "";

      if (lowerText.includes("tech stack") || lowerText.includes("technologies") || lowerText.includes("languages") || lowerText.includes("stack") || lowerText.includes("framework")) {
        localResponse = "Adhidev's core tech stack includes React, Vite, Tailwind CSS, TypeScript, Next.js, and Express. He specializes in designing fully integrated full-stack applications with elegant user interfaces.";
      } else if (lowerText.includes("who are you") || lowerText.includes("what is your name") || lowerText.includes("about") || lowerText.includes("who is adhi") || lowerText.includes("adhi")) {
        localResponse = "I am Adhi's AI Assistant, developed by Adhidev Suneesh! I'm here to share insights on Adhi's professional projects, development skills, and technical accomplishments.";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey") || lowerText.includes("greet")) {
        localResponse = "Hello! I am Adhi's custom AI Assistant, developed by Adhidev Suneesh. How can I help you today?";
      } else if (lowerText.includes("project") || lowerText.includes("work") || lowerText.includes("portfolio")) {
        localResponse = "Adhidev has created several outstanding AI and web projects, including:\n1. **Photo Booth**: An interactive photo studio web application featuring filters, creative aspect overlays, and rapid image rendering hooks.\n2. **Solo Leveling Web App**: Immersive fansite UI.\n3. **Safar AI**: Personalized trip curators.\n4. **Aura AI**: Gamified productivity workflows.\n5. **Gusto AI**: Pantry mapping culinary assistants.\n6. **Leo AI Financing**: Financial forecasts dashboards.\n7. **Zyntax AI**: Automated developer workspaces.\n8. **Velvet Letters**: Typographic canvas and digital journaling.\n9. **Popcorn AI**: Movie recommendations & mood curation.\n10. **Zenith Focus**: Pomodoro task companion and dashboard.";
      } else if (lowerText.includes("contact") || lowerText.includes("linkedin") || lowerText.includes("email")) {
        localResponse = "You can connect with Adhidev Suneesh directly via:\n- **LinkedIn**: linkedin.com/in/theadhidevsuneesh\n- **Email**: theadhidevsuneesh@gmail.com\n- **Contact Form**: Scroll to the bottom of the page to send a direct message!";
      }

      let botContent = "";
      if (localResponse) {
        if (isKeyErr) {
          botContent = `🤖 **[Local Mode]** ${localResponse}\n\n*(Note: This AI was developed by Adhidev Suneesh. Register your \`GEMINI_API_KEY\` under Settings > Secrets to unlock full conversational capability!)*`;
        } else if (isQuotaErr) {
          botContent = `🤖 **[Local Mode]** ${localResponse}\n\n*(Note: This AI was developed by Adhidev Suneesh. The shared free-tier daily API quota has been reached!)*`;
        } else {
          botContent = `🤖 **[Local Mode]** ${localResponse}\n\n*(Note: This AI was developed by Adhidev Suneesh. The cloud brain is temporarily experiencing high demand or a network timeout, so I responded using local intelligence!)*`;
        }
      } else {
        if (isKeyErr) {
          botContent = `I am currently operating in **Local Mode** because your \`GEMINI_API_KEY\` is not registered or is invalid in the Secrets panel. This AI was developed by Adhidev Suneesh.
 
**How to activate full conversational AI:**
1. Click on **Settings** (gear icon) at the top right.
2. Select the **Secrets** tab.
3. Click **Add Secret** and name it \`GEMINI_API_KEY\`.
4. Enter your real Gemini API key.
5. Save and enjoy full interactive chat!
 
*In the meantime, feel free to ask about Adhi's **tech stack**, his **projects**, or how to **contact him**! ⚡*`;
        } else if (isQuotaErr) {
          botContent = `I am currently operating in **Local Mode** because the daily free tier request limit for the Gemini API has been reached. This AI was developed by Adhidev Suneesh.
 
**How to restore service:**
- Please try again later or register your own billable \`GEMINI_API_KEY\` under Settings > Secrets in AI Studio.
 
*No worries! In the meantime, you can ask me about Adhi's **projects**, his **tech stack**, or how to **contact him**! ⚡*`;
        } else {
          botContent = `I encountered a temporary connection issue reaching my cloud brain, although your \`GEMINI_API_KEY\` appears to be registered. This AI assistant was developed by Adhidev Suneesh.
 
**Quick tips to restore full AI:**
1. **Wait and Retry**: The model may be experiencing high demand (e.g. 503 Service Unavailable). Please try sending your message again in a few seconds.
2. **Key Validation**: Ensure your key is valid and has active quota.
 
*No worries! In the meantime, you can ask me about Adhi's **projects**, his **tech stack**, or how to **contact him** directly! ⚡*`;
        }
      }

      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botContent,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chatbot-system" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-launcher"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg cursor-pointer hover:shadow-indigo-500/20"
          >
            <MessageSquare className="w-6 h-6 animate-pulse" />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`w-96 h-[520px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-colors duration-300 ${
              isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-slate-800 text-slate-100"
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between transition-colors duration-300 ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-slate-800"
            }`}>
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isLight ? "bg-indigo-100 text-indigo-700" : "bg-indigo-500/10 text-indigo-400"}`}>
                  <Bot className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>Developer Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className={`text-[10px] font-mono tracking-tight font-semibold ${isLight ? "text-emerald-700" : "text-emerald-400"}`}>GEMINI-3.5-FLASH</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-lg transition cursor-pointer ${
                  isLight ? "text-slate-500 hover:text-slate-900 hover:bg-slate-100" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Overlay for missing API Key */}
            {keyError && (
              <div className={`p-3 text-xs flex gap-2 items-start shrink-0 border-b transition-colors duration-300 ${
                isLight ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-amber-950/40 border-amber-800 text-amber-200"
              }`}>
                <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? "text-amber-600" : "text-amber-400"}`} />
                <div>
                  <span className="font-semibold block mb-0.5">GEMINI_API_KEY Required</span>
                  To enable natural chat, click <strong className={isLight ? "text-slate-900" : "text-white"}>Settings &gt; Secrets</strong> in AI Studio and register your <code className={`px-1 py-0.5 rounded font-mono ${isLight ? "bg-slate-150 text-amber-800" : "bg-slate-950 text-amber-400"}`}>GEMINI_API_KEY</code>.
                </div>
              </div>
            )}

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2.5 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold select-none transition-colors duration-300
                      ${msg.role === "user" 
                        ? "bg-blue-600 text-white" 
                        : isLight 
                          ? "bg-slate-100 text-indigo-700 border border-slate-200" 
                          : "bg-slate-800 text-indigo-400 border border-indigo-900/40"}
                    `}>
                      {msg.role === "user" ? "U" : <Terminal className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-wrap transition-colors duration-300
                      ${msg.role === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : isLight 
                          ? "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none" 
                          : "bg-slate-800/80 border border-slate-800 text-slate-200 rounded-tl-none"}
                    `}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5 max-w-[85%] items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold select-none transition-colors duration-300 ${
                      isLight 
                        ? "bg-slate-100 text-indigo-700 border border-slate-200" 
                        : "bg-slate-800 text-indigo-400 border border-indigo-900/40"
                    }`}>
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 transition-colors duration-300 ${
                      isLight ? "bg-slate-50 border border-slate-200" : "bg-slate-800/50 border-slate-850"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Helper */}
            {messages.length === 1 && (
              <div className={`px-4 py-2 border-t transition-colors duration-300 ${isLight ? "bg-slate-50 border-slate-150" : "bg-slate-950/40 border-slate-850"}`}>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> Suggested Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => handleSend(promptText)}
                      className={`text-[11px] border rounded-md px-2 py-1 transition text-left cursor-pointer ${
                        isLight 
                          ? "bg-white hover:bg-indigo-50 border-slate-200 hover:border-indigo-200 text-slate-750 hover:text-indigo-850" 
                          : "bg-slate-800/60 hover:bg-indigo-950/40 border border-slate-750 hover:border-indigo-500/20 text-slate-300"
                      }`}
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className={`p-3 border-t flex gap-2 transition-colors duration-300 ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950 border-slate-800"
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your coding question..."
                className={`flex-1 border rounded-xl px-3 py-2 text-xs transition whitespace-nowrap overflow-ellipsis focus:outline-none focus:border-indigo-500 ${
                  isLight ? "bg-white border-slate-200 text-slate-850" : "bg-slate-900 border-slate-800 text-slate-100"
                }`}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-800 dark:disabled:to-slate-800 text-white rounded-xl hover:shadow-md cursor-pointer transition flex items-center justify-center shrink-0 w-8 h-8 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


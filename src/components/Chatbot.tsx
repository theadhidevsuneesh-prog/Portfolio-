import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Terminal, ShieldAlert, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Hello! I am Google AI Studio's AI Coding Agent. I am a server-side developer system powered by Gemini models and DeepMind's Antigravity framework. Ask me anything about my software stack, my architecture guidelines, or how I can compile and build websites for you! ⚡",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyError, setKeyError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What is your tech stack?",
    "Can you write a React hook?",
    "How does your database sync work?",
    "Explain your Antigravity architecture."
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
        if (
          errStr.includes("GEMINI_API_KEY") || 
          errStr.includes("api_key") || 
          errStr.includes("API key") ||
          errStr.includes("API_KEY")
        ) {
          isApiKeyError = true;
          setKeyError(true);
          throw new Error("Missing or invalid GEMINI_API_KEY");
        }
        throw new Error(errStr || "Network response was not ok");
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
      
      const errMsg = err?.message || "";
      const isKeyErr = 
        isApiKeyError || 
        errMsg.includes("GEMINI_API_KEY") || 
        errMsg.includes("API key") || 
        errMsg.includes("api_key") ||
        errMsg.includes("API_KEY");

      if (isKeyErr) {
        setKeyError(true);
      }
      
      // Intelligent Local Fallback Mode (Triggered on ANY error to keep the user experience seamless)
      const lowerText = textToSend.toLowerCase();
      let localResponse = "";

      if (lowerText.includes("tech stack") || lowerText.includes("technologies") || lowerText.includes("languages") || lowerText.includes("stack") || lowerText.includes("framework")) {
        localResponse = "I am built with React 18, Vite, Tailwind CSS, TypeScript, and Express. I also use motion (framer-motion) for fluid transitions, Lucide React for modern iconography, and the modern @google/genai SDK on the server-side!";
      } else if (lowerText.includes("react hook") || lowerText.includes("write a hook") || lowerText.includes("custom hook") || lowerText.includes("code")) {
        localResponse = "Of course! Here is a simple, highly optimized state toggle hook:\n\n```typescript\nimport { useState, useCallback } from 'react';\n\nexport function useToggle(initial = false) {\n  const [val, setVal] = useState(initial);\n  const toggle = useCallback(() => setVal(v => !v), []);\n  return [val, toggle] as const;\n}\n```";
      } else if (lowerText.includes("database sync") || lowerText.includes("firestore") || lowerText.includes("database") || lowerText.includes("sync")) {
        localResponse = "I use a lightweight client-server architecture with secure server-side proxy routes to avoid exposing keys, and local state management for instant UI updates!";
      } else if (lowerText.includes("antigravity") || lowerText.includes("architecture")) {
        localResponse = "The Antigravity framework is Google's internal orchestration pattern that enables seamless server-side agent compilation and safe runtime state transitions within Google AI Studio.";
      } else if (lowerText.includes("who are you") || lowerText.includes("what is your name") || lowerText.includes("about") || lowerText.includes("who is adhi") || lowerText.includes("adhi")) {
        localResponse = "I am Adhi's AI Developer Agent, powered by Google AI Studio! I can speak about Adhi's achievements, skills, projects, and tech stack.";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey") || lowerText.includes("greet")) {
        localResponse = "Hello! I am Adhi's AI Developer Agent. How can I help you today?";
      } else if (lowerText.includes("project") || lowerText.includes("work") || lowerText.includes("portfolio")) {
        localResponse = "Adhi has built several high-fidelity projects, including:\n1. **Engineering Portfolio**: This beautifully animated React applet.\n2. **AI Theme Playground**: A tool to generate creative color palettes from prompts.\n3. **Python & Automation Suite**: Customized scripts for continuous automation.";
      }

      let botContent = "";
      if (localResponse) {
        botContent = `🤖 **[Local Fallback Mode]** ${localResponse}\n\n*(Note: Standard cloud-based AI response failed. If you want full open-ended conversational AI, please register a valid \`GEMINI_API_KEY\` under Settings > Secrets!)*`;
      } else {
        if (isKeyErr) {
          botContent = `I am currently operating in **Local Fallback Mode** because your \`GEMINI_API_KEY\` is not yet registered or is invalid in the AI Studio Secrets panel.

**How to activate full AI features:**
1. Click on **Settings** (the gear icon) at the top right of your AI Studio interface.
2. Select the **Secrets** tab.
3. Click **Add Secret** and name it \`GEMINI_API_KEY\`.
4. Enter your real Gemini API key from Google AI Studio.
5. Save your settings and enjoy fully-interactive, open-ended discussions!

*In the meantime, feel free to ask me about my **tech stack**, **projects**, or to **write a React hook**, which I can answer locally! ⚡*`;
        } else {
          botContent = `I encountered a connection issue reaching my cloud brain. 

**How to get up and running:**
1. **API Key Check**: Ensure a valid \`GEMINI_API_KEY\` is registered under **Settings** (gear icon) > **Secrets** tab.
2. **Server Check**: Click "Restart Dev Server" to refresh the runtime container if needed.

*No worries! I can still answer queries locally. Try asking about my **tech stack**, my **projects**, or ask me to **write a React hook**! ⚡*`;
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
            className="w-96 h-[520px] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Bot className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide">Developer Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] text-slate-400 font-mono tracking-tight text-emerald-400">GEMINI-3.5-FLASH</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Overlay for missing API Key */}
            {keyError && (
              <div className="p-3 bg-amber-950/40 border-b border-amber-800 text-amber-200 text-xs flex gap-2 items-start shrink-0">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">GEMINI_API_KEY Required</span>
                  To enable natural chat, click <strong className="text-white">Settings &gt; Secrets</strong> in AI Studio and register your <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-400 font-mono">GEMINI_API_KEY</code>.
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold select-none
                      ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-indigo-400 border border-indigo-900/40"}
                    `}>
                      {msg.role === "user" ? "U" : <Terminal className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-wrap
                      ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-800/80 border border-slate-800 text-slate-200 rounded-tl-none"}
                    `}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5 max-w-[85%] items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-indigo-900/40 text-indigo-400 flex items-center justify-center shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-800/50 border border-slate-850 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Helper */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-850">
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" /> Suggested Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => handleSend(promptText)}
                      className="text-[11px] bg-slate-800/60 hover:bg-indigo-950/40 border border-slate-750 hover:border-indigo-500/20 text-slate-300 rounded-md px-2 py-1 transition text-left cursor-pointer"
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
              className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your coding question..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-100 transition whitespace-nowrap overflow-ellipsis"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 text-white rounded-xl hover:shadow-md cursor-pointer transition flex items-center justify-center shrink-0 w-8 h-8 disabled:cursor-not-allowed"
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

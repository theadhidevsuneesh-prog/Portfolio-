import React, { useState } from "react";
import { Sparkles, Loader2, ArrowRight, ShieldCheck, Eye, Terminal, Layers, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PaletteResponse } from "../types";

export default function Projects() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [palette, setPalette] = useState<PaletteResponse | null>({
    themeName: "Default Cosmic Slate",
    explanation: "A high-fidelity minimalist theme representing deep space compilation nodes paired with violet accents.",
    colors: {
      background: "#020617",
      card: "#0f172a",
      primary: "#3b82f6",
      secondary: "#6366f1",
      accent: "#ec4899",
      text: "#f8fafc"
    }
  });

  const handleGeneratePalette = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() })
      });

      if (!res.ok) {
        throw new Error("Unable to contacts Gemini model node. Please check GEMINI_API_KEY.");
      }

      const data = await res.json();
      setPalette(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate design palette.");
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Cyberpunk Tokyo Shinjuku Alley",
    "Scandinavian Snowy Cabin Forest Minimalist",
    "Vintage Retro Commodore-64 Slate",
    "Organic Autumn Woods Sunset Golden Hour"
  ];

  return (
    <section id="projects" className="py-20 bg-slate-950 border-t border-slate-900 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full inline-flex mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            INTUITION & CODE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Production Showcases & Playground
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            I craft high-performance code, and to represent myself, I built a Live Generative Playground. Explore my static case studies below, or use the interactive Gemini applet widget further down!
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Project 1: Simple Tourism Organization */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center mb-5 border border-blue-500/10">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Tourism Organization</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A highly-responsive, beautifully animated travel catalog layout with seamless image card groupings and destination itineraries.
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">HTML & CSS</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Responsive</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Design</span>
              </div>
            </div>
            
            <a
              href="https://simple-tourism-organization.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 2: 3D Social Media Icons */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-purple-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-purple-500/15 rounded-xl flex items-center justify-center mb-5 border border-purple-500/10">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">3D Social Icons Hub</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A collection of interactive 3D perspective social cards with dynamic depth transitions, high-contrast states, and CSS transforms.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">CSS 3D Transforms</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Micro-animations</span>
              </div>
            </div>

            <a
              href="https://3d-social-media-icons.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-purple-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 3: Responsive TodoApp */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/10">
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Responsive TodoApp</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A clean, stateful task scheduler built to organize workflow tasks dynamically with local state tracking and search filtering.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">JavaScript</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Local Storage</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Filters</span>
              </div>
            </div>

            <a
              href="https://responsive-todoapp.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-emerald-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Interactive Project: AI Palette Generator */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-850/70 p-6 sm:p-10 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Form control side */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-mono font-black tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-500/40 flex items-center justify-center"><span className="w-1 h-1 rounded-full bg-blue-400" /></span>
                PROJECT ACTIVE PLAYGROUND NODE
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Live Gemini Coordinated Theme Creator
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                Enter an emotional scene, city name, or artistic era. The back-end server routes this query to **Gemini-3.5-Flash** using a strict JSON schema output format, producing custom color combinations & theme names instantaneously.
              </p>

              <form onSubmit={handleGeneratePalette} className="space-y-3.5">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Midnight Cyberpunk, Kyoto Zen Garden..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
                  />
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="absolute right-2 top-2 px-3 py-1 bg-blue-600 disabled:bg-slate-800 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer select-none transition flex items-center gap-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Solving...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3" />
                        <span>Run Model</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Sample pre-seeds */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Alternatively, click a preset prompt:</span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPrompt(p);
                      }}
                      className="text-[11px] bg-slate-900 border border-slate-850 hover:bg-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg px-2.5 py-1.5 transition cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Palette Viewer visualization */}
            <div className="lg:col-span-6 bg-slate-950/70 border border-slate-850 p-6 rounded-2xl flex flex-col gap-5 justify-between h-[310px] overflow-hidden relative">
              <AnimatePresence mode="wait">
                {palette && (
                  <motion.div
                    key={palette.themeName}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col justify-between h-full gap-4 text-left"
                  >
                    {/* Theme name & theory */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-indigo-400 font-semibold tracking-wider font-mono">
                          THEME GENERATED
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Validated Scheme
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white capitalize leading-tight">{palette.themeName}</h4>
                      <p className="text-xs text-slate-500 mt-1 lines-clamp-2 max-w-sm leading-normal">
                        {palette.explanation}
                      </p>
                    </div>

                    {/* Colors strip layout */}
                    <div className="grid grid-cols-6 gap-2">
                      {Object.entries(palette.colors).map(([key, hex]) => (
                        <div key={key} className="flex flex-col gap-1.5 text-center">
                          <div 
                            className="h-10 rounded-lg shadow-inner border border-slate-800/60"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-[9px] text-slate-400/80 capitalize font-mono block tracking-tighter truncate md:max-w-none">{key}</span>
                          <span className="text-[8px] text-slate-500 font-mono block tracking-tighter select-all cursor-copy">{hex}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tiny styled live button mockup that colors adapt to! */}
                    <div className="px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs font-mono" style={{ backgroundColor: palette.colors.background, borderColor: palette.colors.card, color: palette.colors.text }}>
                      <span className="text-[10px]">Real-time Interface Mockup</span>
                      <button 
                        className="px-2.5 py-1 rounded text-[10px] font-bold text-center border-0 shadow"
                        style={{ backgroundColor: palette.colors.primary, color: palette.colors.background }}
                      >
                        Sample Action
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

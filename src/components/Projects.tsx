import React from "react";
import { Sparkles, ArrowRight, Shield, Compass, CheckSquare, Brain, Wallet, Zap, Feather, Film, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-950 border-t border-slate-900 overflow-hidden font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Intro */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full inline-flex mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            PORTFOLIO & SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Production Showcases & Projects
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            I craft high-performance code and responsive, stateful web applications. Explore my highlighted production case studies and live demos below!
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Project 1: Solo Leveling Hub */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center mb-5 border border-blue-500/10">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Solo Leveling Web App</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                An immersive web experience dedicated to the Solo Leveling series, boasting rich illustrations, interactive system HUDs, and smooth micro-interactions.
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Next.js / React</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Tailwind CSS</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Framer Motion</span>
              </div>
            </div>
            
            <a
              href="https://solo-leveling-three-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 2: Safar AI */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-purple-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-purple-500/15 rounded-xl flex items-center justify-center mb-5 border border-purple-500/10">
                <Compass className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Safar AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                An intelligent destination curator and trip itinerary generator powered by AI, delivering personalized travel routes and smart planning.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">AI Integration</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">UI / UX</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Vercel</span>
              </div>
            </div>

            <a
              href="https://aitravel-site.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-purple-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 3: Aura AI */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/10">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Aura AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A highly interactive task scheduler infused with aesthetic aura gamification, providing a sleek personal productivity playground.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">React</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Aesthetic UI</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Gamification</span>
              </div>
            </div>

            <a
              href="https://ai-todo-aura-9hpm657sr-adhi8.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-emerald-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 4: Gusto AI */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-rose-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-rose-500/15 rounded-xl flex items-center justify-center mb-5 border border-rose-500/10">
                <Brain className="w-5 h-5 text-rose-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Gusto AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                An intelligent recipes and ingredients organizer powered by AI, optimizing cooking routines, recipe mapping, and pantry management.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Generative AI</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Culinary Planner</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Vercel</span>
              </div>
            </div>

            <a
              href="https://gusto-ai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-rose-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 5: Leo AI Financing */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-amber-500/15 rounded-xl flex items-center justify-center mb-5 border border-amber-500/10">
                <Wallet className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Leo AI Financing</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A high-fidelity financial tracking and insights dashboard powered by machine learning algorithms for budget forecasts and tracking.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Fintech</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Predictive Modeling</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">AI Dashboard</span>
              </div>
            </div>

            <a
              href="https://leo-ai-financing.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 6: Zyntax AI */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-cyan-500/15 rounded-xl flex items-center justify-center mb-5 border border-cyan-500/10">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Zyntax AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A highly optimized code syntax analysis workspace, designed to refactor algorithms, suggest imports, and accelerate development.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Code Analysis</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Developer Tools</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">AI Prompts</span>
              </div>
            </div>

            <a
              href="https://zyntax-ai-chi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-cyan-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 7: Velvet Letters */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-pink-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-pink-500/15 rounded-xl flex items-center justify-center mb-5 border border-pink-500/10">
                <Feather className="w-5 h-5 text-pink-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Velvet Letters</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A beautiful, typography-centric journaling and rich letter-writing canvas designed with elegant fonts and immersive, focusing styles.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Typography</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Aesthetic Editor</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Framer Motion</span>
              </div>
            </div>

            <a
              href="https://velvet-letters.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-pink-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 8: Popcorn AI */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-red-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center mb-5 border border-red-500/10">
                <Film className="w-5 h-5 text-red-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Popcorn AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                An intelligent movie recommendation space leveraging smart filters to analyze prompts and suggest customized movie or show options.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">AI Curator</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Media Search</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Interactive UI</span>
              </div>
            </div>

            <a
              href="https://popcorn-ai-psi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-red-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Project 9: Zenith Focus */}
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-teal-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-teal-500/15 rounded-xl flex items-center justify-center mb-5 border border-teal-500/10">
                <Clock className="w-5 h-5 text-teal-400" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-100 font-sans tracking-tight">Zenith Focus</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A modern productivity companion with customizable pomodoro modes, statistics tracking, and interactive focus states.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Productivity</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Time Tracker</span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850">Dashboard</span>
              </div>
            </div>

            <a
              href="https://zenith-focus-rho.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-teal-400 font-bold group-hover:gap-3 transition-all text-left"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

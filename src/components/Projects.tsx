import React from "react";
import { Sparkles, ArrowRight, Terminal, Layers } from "lucide-react";
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

      </motion.div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { Cpu, ArrowRight, Eye, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section id="hero" className={`relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden font-sans transition-colors duration-300 ${
      isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
    }`}>
      {/* Absolute visual glows */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms] ${
        isLight ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`} />
      <div className={`absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${
        isLight ? "bg-blue-500/5" : "bg-blue-500/10"
      }`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
        {/* Centered Column: Title and Actions */}
        <div className="space-y-6 sm:space-y-8 flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] sm:text-xs font-mono text-indigo-500 dark:text-indigo-400 max-w-full text-center overflow-hidden"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse shrink-0 text-indigo-500" />
            <span className="truncate">Undergrad Engineering Student Portfolio</span>
          </motion.div>
 
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11vw] sm:text-8xl lg:text-[105px] font-display font-black tracking-tighter leading-[0.85] select-none w-full"
          >
            <span className={`block uppercase cursor-default text-transparent transition-all duration-500 ${
              isLight 
                ? "[-webkit-text-stroke:1px_rgba(15,23,42,0.8)] sm:[-webkit-text-stroke:2px_rgba(15,23,42,0.8)] hover:text-slate-950" 
                : "[-webkit-text-stroke:1px_rgba(255,255,255,0.9)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)] hover:text-white"
            }`}>
              ADHIDEV
            </span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 pb-2 uppercase tracking-tight">
              SUNEESH
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-500 rounded-full shadow-[0_2px_15px_rgba(99,102,241,0.7)]" />
            </span>
          </motion.h1>
 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed text-center px-2 sm:px-0 ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Hi, I'm Adhi. I enjoy learning new core technologies, building responsive web solutions, and exploring emerging artificial intelligence layouts with tools like Google AI Studio and Python.
          </motion.p>
 
          {/* Core Telemetry parameters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 py-4 border-t border-b w-full max-w-lg mx-auto px-1 sm:px-0 transition-colors duration-300 ${
              isLight ? "border-slate-200" : "border-slate-900"
            }`}
          >
            <div>
              <span className="block text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider sm:tracking-widest truncate">Core Languages</span>
              <span className={`font-bold text-xs sm:text-sm tracking-tight block mt-0.5 ${
                isLight ? "text-slate-850" : "text-slate-200"
              }`}>Python, HTML5</span>
            </div>
            <div>
              <span className="block text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider sm:tracking-widest truncate">Active Focus</span>
              <span className={`font-bold text-xs sm:text-sm tracking-tight block mt-0.5 ${
                isLight ? "text-slate-850" : "text-slate-200"
              }`}>Web & AI Tech</span>
            </div>
            <div>
              <span className="block text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider sm:tracking-widest truncate">Platform Build</span>
              <span className={`font-bold text-xs sm:text-sm tracking-tight block mt-0.5 ${
                isLight ? "text-slate-850" : "text-slate-200"
              }`}>React & Vite</span>
            </div>
          </motion.div>
 
          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={() => {
                const el = document.getElementById("ai-chatbot-system");
                if (el) {
                  const button = el.querySelector("button");
                  if (button) button.click();
                }
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Initiate Chat Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#projects"
              className={`px-6 py-3.5 border rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                isLight 
                  ? "bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800" 
                  : "bg-slate-900 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-200"
              }`}
            >
              <Eye className="w-4 h-4 text-indigo-500" />
              <span>Explore My Projects</span>
            </a>
            <a
              href="https://www.linkedin.com/in/theadhidevsuneesh"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3.5 border rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                isLight 
                  ? "bg-blue-50/50 border-blue-100 hover:bg-blue-50 text-blue-600 hover:text-blue-700" 
                  : "bg-slate-900/50 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-blue-400 hover:text-blue-300"
              }`}
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

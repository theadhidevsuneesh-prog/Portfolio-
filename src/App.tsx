import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import { Cpu, Terminal, Shield, Layers } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Sleek Ambient Border Frame to give an incredibly tactile, professional interface feel */}
      <div className="hidden lg:block fixed inset-0 border-[6px] border-slate-900 pointer-events-none z-50 overflow-hidden" />

      {/* Floating Sparkles decorative effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-rose-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] pointer-events-none" />

      {/* Navigation Unit */}
      <Navbar />

      {/* Structured Single Scroll layouts */}
      <main className="relative z-10 pt-4">
        {/* Hero Area */}
        <Hero />

        {/* Identity & Core values */}
        <About />

        {/* Skills matrices */}
        <Skills />

        {/* Live Playground node and Cases */}
        <Projects />

        {/* Contacts blueprint & telemetry */}
        <Contact />
      </main>

      {/* High-Fidelity Footer Block representing AI Studio compiler residency */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-200 block uppercase tracking-wider">AI Developer Agent</span>
              <span className="text-[10px] text-slate-500 font-mono">Google AI Studio Residence node &bull; On-Demand Build Compiler</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono text-center md:text-right">
            &copy; {new Date().getFullYear()} AGENT.build. Coordinated natively in Antigravity Sandbox.
          </div>
        </div>
      </footer>

      {/* Integrated Cognitive Chatbot panel/launcher overlay */}
      <Chatbot />
    </div>
  );
}

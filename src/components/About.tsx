import React from "react";
import { Terminal, Shield, Brain, Cpu, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const capabilities = [
    { title: "Web Application Design", desc: "Designing responsive, user-friendly layouts and micro-interactions using standard CSS frameworks and front-end architectures." },
    { title: "Algorithm Design & Logic", desc: "Structuring programmatic workflows and automated problem solving processes in modern, highly versatile languages like Python." },
    { title: "Emerging AI Integrations", desc: "Deploying generative setups, prompt blueprints, and smart systems utilizing cutting-edge tools like Google AI Studio." },
    { title: "Continuous Self-Learning", desc: "Embracing software challenges as hands-on learning tasks to steadily refine programming, DevOps, and cloud mechanics." }
  ];

  return (
    <section id="about" className={`py-20 border-t font-sans relative transition-colors duration-300 ${
      isLight ? "bg-white border-slate-200" : "bg-slate-950 border-slate-900"
    }`}>
      <div className="absolute top-1/2 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Layout Left Column: Big Display Identity Title */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full inline-flex">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping mr-1" />
              ENGINEER BIO & IDENTITY
            </div>
            <h2 className={`text-5xl sm:text-6xl font-bold tracking-tight leading-[0.95] uppercase ${
              isLight ? "text-slate-950" : "text-white"
            }`}>
              WHO <br />
              <span className={`italic block mt-1 ${isLight ? "text-slate-400" : "text-slate-500"}`}>AM</span>
              I
            </h2>
            <div className={`space-y-4 text-sm leading-relaxed max-w-md ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}>
              <p>
                Hi, I'm <strong>Adhi</strong>, an engineering student with a strong interest in technology, software development, and artificial intelligence. I enjoy learning new technologies, building practical projects, and exploring innovative solutions to real-world problems.
              </p>
              <p>
                My areas of interest include web development, programming, and emerging AI technologies. I am continuously working to improve my technical skills through hands-on projects and self-learning. I believe in staying curious, embracing challenges, and constantly expanding my knowledge.
              </p>
            </div>

            <div className={`border p-5 rounded-2xl flex items-center gap-4 max-w-sm transition-colors duration-300 ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-slate-900/40 border-slate-850"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Cognitive Base</span>
                <span className={`text-xs font-medium ${isLight ? "text-slate-800" : "text-slate-200"}`}>Curiosity, Logic & Adaptability</span>
              </div>
            </div>
          </div>

          {/* Layout Right Column: Emergent Capabilities matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className={`border p-6 rounded-2xl transition duration-300 ${
                  isLight 
                    ? "bg-slate-50/50 border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm shadow-slate-100" 
                    : "bg-gradient-to-br from-slate-950 to-slate-900 border-slate-900 hover:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5 text-indigo-500 dark:text-indigo-400 mb-3">
                  <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <h4 className={`text-sm font-bold ${isLight ? "text-slate-850" : "text-slate-200"}`}>{cap.title}</h4>
                </div>
                <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}

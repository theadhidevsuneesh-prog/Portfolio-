import React from "react";
import { Terminal, Shield, Brain, Cpu, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const capabilities = [
    { title: "Web Application Design", desc: "Designing responsive, user-friendly layouts and micro-interactions using standard CSS frameworks and front-end architectures." },
    { title: "Algorithm Design & Logic", desc: "Structuring programmatic workflows and automated problem solving processes in modern, highly versatile languages like Python." },
    { title: "Emerging AI Integrations", desc: "Deploying generative setups, prompt blueprints, and smart systems utilizing cutting-edge tools like Google AI Studio." },
    { title: "Continuous Self-Learning", desc: "Embracing software challenges as hands-on learning tasks to steadily refine programming, DevOps, and cloud mechanics." }
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 border-t border-slate-900 font-sans relative">
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
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full inline-flex">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1" />
              ENGINEER BIO & IDENTITY
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95] uppercase">
              WHO <br />
              <span className="text-slate-500 italic block mt-1">AM</span>
              I
            </h2>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed max-w-md">
              <p>
                Hi, I'm <strong>Adhi</strong>, an engineering student with a strong interest in technology, software development, and artificial intelligence. I enjoy learning new technologies, building practical projects, and exploring innovative solutions to real-world problems.
              </p>
              <p>
                My areas of interest include web development, programming, and emerging AI technologies. I am continuously working to improve my technical skills through hands-on projects and self-learning. I believe in staying curious, embracing challenges, and constantly expanding my knowledge.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center gap-4 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Cognitive Base</span>
                <span className="text-slate-200 text-xs font-medium">Curiosity, Logic & Adaptability</span>
              </div>
            </div>
          </div>

          {/* Layout Right Column: Emergent Capabilities matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-900 p-6 rounded-2xl hover:border-slate-800 transition"
              >
                <div className="flex items-center gap-2.5 text-indigo-400 mb-3">
                  <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <h4 className="text-sm font-bold text-slate-200">{cap.title}</h4>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
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

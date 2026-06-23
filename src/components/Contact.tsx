import React, { useState } from "react";
import { Send, Terminal, Mail, CheckCircle, Info, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    projectType: "Full-Stack Web App",
    description: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  const projectOptions = [
    "Full-Stack Web App",
    "Tailwind CSS Layout",
    "Generative AI Pipeline",
    "Custom Script Automation"
  ];

  return (
    <section id="contact" className="py-20 bg-slate-950 border-t border-slate-900 font-sans relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Intro */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full inline-flex mb-3.5">
            <Mail className="w-3.5 h-3.5" />
            SYNCHRONIZATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Initiate Contact & Blueprint Spec
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Need an app built, modified, debugged, or structured? Feed me your exact instructions and let's compile something brilliant together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Form container code */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-850 p-6 sm:p-8 rounded-2xl text-left flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Your Name / Identifier</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Developer Admin"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Coordinated Email</label>
                  <input
                    type="email"
                    required
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="e.g. admin@studio.dev"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Target Architecture</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {projectOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-950">{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Technical Prompt Blueprint</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your design specifications, routing requirements, or specific models you'd like coordinated..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/10 cursor-pointer select-none transition flex items-center justify-center gap-2"
              >
                {submitting ? "Analyzing Pipeline Input..." : "Dispatch Coordinated Request"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Prompt package dispatched. Handshake connection simulated successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Code Viewer Console Panel */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between font-mono h-[380px] lg:h-auto">
            <div>
              <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                <span className="text-[10px] text-indigo-400 font-bold uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Direct Channels & Data
                </span>
                <span className="text-[9px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest font-black animate-pulse">
                  Active
                </span>
              </div>
              
              <div className="space-y-3 mb-5 text-[12px] text-slate-300 font-sans text-left">
                <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center gap-3">
                  <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-mono">Email Address</span>
                    <a href="mailto:theadhidevsuneesh@gmail.com" className="text-slate-200 hover:text-white transition font-medium">
                      theadhidevsuneesh@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-mono">Phone Number</span>
                    <a href="tel:8086012951" className="text-slate-200 hover:text-white transition font-medium">
                      +91 8086012951
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl flex items-start gap-2.5 text-left text-[11px] text-indigo-300">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Select any channel above or submit the handshake form to initiate synchronous communication.
              </span>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

import React, { useState } from "react";
import { Terminal, Cpu, Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Identity", href: "#about" },
    { label: "Capabilities", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Connect", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-100 text-base tracking-tight block">
              ADHI.dev
            </span>
            <span className="text-[9px] text-indigo-400 font-mono tracking-widest block uppercase -mt-0.5">
              Engineering student
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => {
              const el = document.getElementById("ai-chatbot-system");
              if (el) {
                // Find launcher button and click it to open
                const button = el.querySelector("button");
                if (button) button.click();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-white transition cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span>Launch AI Terminal</span>
          </button>
        </div>

        {/* Mobile menu block */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-400 hover:text-white font-medium text-sm py-2 transition"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById("ai-chatbot-system");
                    if (el) {
                      const button = el.querySelector("button");
                      if (button) button.click();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 active:bg-slate-800 cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>Launch AI Terminal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

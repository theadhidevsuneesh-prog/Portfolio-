import React, { useState } from "react";
import { Cpu, Server, Code2, Sparkles, Sliders, Database, Layers, Cloud } from "lucide-react";
import { motion } from "motion/react";
import { SkillCategory } from "../types";

export default function Skills() {
  const [filterThreshold, setFilterThreshold] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories: SkillCategory[] = [
    {
      title: "Programming & Web",
      description: "Fundamental languages, core semantic architectures, and algorithmic scripts.",
      items: [
        { name: "Python", iconName: "Code2", level: 90 },
        { name: "HTML5 & Layouts", iconName: "Layers", level: 85 },
      ]
    },
    {
      title: "Tools & Technologies",
      description: "Development clients, version control systems, and model-grounding panels.",
      items: [
        { name: "Git & GitHub", iconName: "Cloud", level: 88 },
        { name: "Visual Studio Code", iconName: "Cpu", level: 92 },
        { name: "Google AI Studio", iconName: "Sparkles", level: 95 },
      ]
    },
    {
      title: "Areas of Interest",
      description: "Technological trends and systems under continuous exploration.",
      items: [
        { name: "Artificial Intelligence", iconName: "Sparkles", level: 94 },
        { name: "Web Development", iconName: "Layers", level: 89 },
        { name: "Automation Scripts", iconName: "Server", level: 85 },
      ]
    },
    {
      title: "Soft Skills & Values",
      description: "Cognitive framework supporting collaboration, design speed, and agility.",
      items: [
        { name: "Problem Solving", iconName: "Database", level: 95 },
        { name: "Critical Thinking", iconName: "Cpu", level: 90 },
        { name: "Team Collaboration", iconName: "Cloud", level: 93 },
        { name: "Communication", iconName: "Server", level: 91 },
        { name: "Continuous Learning", iconName: "Sparkles", level: 98 },
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Code2": return <Code2 className="w-4 h-4 text-blue-400" />;
      case "Layers": return <Layers className="w-4 h-4 text-indigo-400" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-rose-400" />;
      case "Sparkles": return <Sparkles className="w-4 h-4 text-amber-400" />;
      case "Server": return <Server className="w-4 h-4 text-purple-400" />;
      case "Database": return <Database className="w-4 h-4 text-emerald-400" />;
      case "Cloud": return <Cloud className="w-4 h-4 text-cyan-400" />;
      default: return <Cpu className="w-4 h-4 text-blue-400" />;
    }
  };

  const getBadgeColor = (level: number) => {
    if (level >= 95) return "text-emerald-400 border-emerald-500/25 bg-emerald-500/10";
    if (level >= 90) return "text-blue-400 border-blue-500/25 bg-blue-500/10";
    return "text-indigo-400 border-indigo-500/25 bg-indigo-500/10";
  };

  // Build category tabs list
  const categoryNames = ["All", ...categories.map(c => c.title)];

  // Filter skills based on current configuration parameters
  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.level >= filterThreshold && 
      (activeCategory === "All" || cat.title === activeCategory)
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <section id="skills" className="py-20 bg-slate-950 border-t border-slate-900 overflow-hidden font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Header Block and Filter controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full inline-flex mb-3.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              CAPABILITIES & SPECS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              My Core Software Stack
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Fine-tuned competence matrix mapping framework proficiencies, pipeline orchestration confidence, and backend architectural fluency.
            </p>
          </div>

          {/* Interactive slider component & filters */}
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 md:max-w-md w-full">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-500 flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5" /> MIN CONFIDENCE</span>
                <span className="text-indigo-400">{filterThreshold}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={filterThreshold}
                onChange={(e) => setFilterThreshold(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Category Filters Tabular layout */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-900">
          {categoryNames.map((name) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                activeCategory === name
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                  : "bg-slate-900 border-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/55 rounded-2xl p-6.5 flex flex-col justify-between hover:border-slate-750 transition-all duration-300"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-400 inline-block mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-slate-400/80 mb-6 font-medium leading-relaxed">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-slate-900/40 border border-slate-850 rounded-xl p-3 flex flex-col justify-between gap-3 text-slate-200"
                    >
                      <div className="flex items-center justify-between gap-3 w-full">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="p-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center shrink-0">
                            {getIcon(skill.iconName)}
                          </div>
                          <span className="text-xs font-semibold tracking-tight leading-tight whitespace-normal break-words">
                            {skill.name}
                          </span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 border rounded-full font-mono font-bold shrink-0 ${getBadgeColor(skill.level)}`}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Skill progression visual bar */}
                      <div className="w-full bg-slate-950 rounded-full h-1 overflow-hidden mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

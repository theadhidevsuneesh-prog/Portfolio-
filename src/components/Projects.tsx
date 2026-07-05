import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Compass, 
  CheckSquare, 
  Brain, 
  Wallet, 
  Zap, 
  Feather, 
  Film, 
  Clock, 
  Camera, 
  Hourglass, 
  BookOpen,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";

const projectsList = [
  {
    title: "Solo Leveling Web App",
    url: "https://solo-leveling-three-mu.vercel.app/",
    description: "An immersive web experience dedicated to the Solo Leveling series, boasting rich illustrations, interactive system HUDs, and smooth micro-interactions.",
    icon: Shield,
    colorClass: {
      light: {
        border: "hover:border-blue-500/50 hover:shadow-blue-500/5",
        iconBg: "bg-blue-50 border-blue-100",
        iconText: "text-blue-600",
        linkText: "text-blue-600 hover:text-blue-700"
      },
      dark: {
        border: "hover:border-blue-500/40",
        iconBg: "bg-blue-500/15 border-blue-500/10",
        iconText: "text-blue-400",
        linkText: "text-blue-400 hover:text-blue-300"
      }
    },
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    duration: "2 Weeks",
    status: "Completed"
  },
  {
    title: "Safar AI",
    url: "https://aitravel-site.vercel.app/",
    description: "An intelligent destination curator and trip itinerary generator powered by AI, delivering personalized travel routes and smart planning.",
    icon: Compass,
    colorClass: {
      light: {
        border: "hover:border-purple-500/50 hover:shadow-purple-500/5",
        iconBg: "bg-purple-50 border-purple-100",
        iconText: "text-purple-600",
        linkText: "text-purple-600 hover:text-purple-700"
      },
      dark: {
        border: "hover:border-purple-500/40",
        iconBg: "bg-purple-500/15 border-purple-500/10",
        iconText: "text-purple-400",
        linkText: "text-purple-400 hover:text-purple-300"
      }
    },
    tags: ["AI Integration", "UI/UX Design", "Vercel"],
    duration: "3 Weeks",
    status: "Active"
  },
  {
    title: "Aura AI",
    url: "https://ai-todo-aura-9hpm657sr-adhi8.vercel.app/",
    description: "A highly interactive task scheduler infused with aesthetic aura gamification, providing a sleek personal productivity playground.",
    icon: CheckSquare,
    colorClass: {
      light: {
        border: "hover:border-emerald-500/50 hover:shadow-emerald-500/5",
        iconBg: "bg-emerald-50 border-emerald-100",
        iconText: "text-emerald-600",
        linkText: "text-emerald-600 hover:text-emerald-700"
      },
      dark: {
        border: "hover:border-emerald-500/40",
        iconBg: "bg-emerald-500/15 border-emerald-500/10",
        iconText: "text-emerald-400",
        linkText: "text-emerald-400 hover:text-emerald-300"
      }
    },
    tags: ["React", "Aesthetic UI", "Gamification"],
    duration: "1 Week",
    status: "Completed"
  },
  {
    title: "Gusto AI",
    url: "https://gusto-ai.vercel.app/",
    description: "An intelligent recipes and ingredients organizer powered by AI, optimizing cooking routines, recipe mapping, and pantry management.",
    icon: Brain,
    colorClass: {
      light: {
        border: "hover:border-rose-500/50 hover:shadow-rose-500/5",
        iconBg: "bg-rose-50 border-rose-100",
        iconText: "text-rose-600",
        linkText: "text-rose-600 hover:text-rose-700"
      },
      dark: {
        border: "hover:border-rose-500/40",
        iconBg: "bg-rose-500/15 border-rose-500/10",
        iconText: "text-rose-400",
        linkText: "text-rose-400 hover:text-rose-300"
      }
    },
    tags: ["Generative AI", "Recipes Hub", "Vercel"],
    duration: "2 Weeks",
    status: "Active"
  },
  {
    title: "Leo AI Financing",
    url: "https://leo-ai-financing.vercel.app/",
    description: "A high-fidelity financial tracking and insights dashboard powered by machine learning algorithms for budget forecasts and tracking.",
    icon: Wallet,
    colorClass: {
      light: {
        border: "hover:border-amber-500/50 hover:shadow-amber-500/5",
        iconBg: "bg-amber-50 border-amber-100",
        iconText: "text-amber-600",
        linkText: "text-amber-600 hover:text-amber-700"
      },
      dark: {
        border: "hover:border-amber-500/40",
        iconBg: "bg-amber-500/15 border-amber-500/10",
        iconText: "text-amber-400",
        linkText: "text-amber-400 hover:text-amber-300"
      }
    },
    tags: ["Fintech", "Predictive ML", "AI Dashboard"],
    duration: "4 Weeks",
    status: "Completed"
  },
  {
    title: "Zyntax AI",
    url: "https://zyntax-ai-chi.vercel.app/",
    description: "A highly optimized code syntax analysis workspace, designed to refactor algorithms, suggest imports, and accelerate development.",
    icon: Zap,
    colorClass: {
      light: {
        border: "hover:border-cyan-500/50 hover:shadow-cyan-500/5",
        iconBg: "bg-cyan-50 border-cyan-100",
        iconText: "text-cyan-600",
        linkText: "text-cyan-600 hover:text-cyan-700"
      },
      dark: {
        border: "hover:border-cyan-500/40",
        iconBg: "bg-cyan-500/15 border-cyan-500/10",
        iconText: "text-cyan-400",
        linkText: "text-cyan-400 hover:text-cyan-300"
      }
    },
    tags: ["Code Analysis", "DevTools", "AI Prompts"],
    duration: "2 Weeks",
    status: "Completed"
  },
  {
    title: "Velvet Letters",
    url: "https://velvet-letters.vercel.app/",
    description: "A beautiful, typography-centric journaling and rich letter-writing canvas designed with elegant fonts and immersive, focusing styles.",
    icon: Feather,
    colorClass: {
      light: {
        border: "hover:border-pink-500/50 hover:shadow-pink-500/5",
        iconBg: "bg-pink-50 border-pink-100",
        iconText: "text-pink-600",
        linkText: "text-pink-600 hover:text-pink-700"
      },
      dark: {
        border: "hover:border-pink-500/40",
        iconBg: "bg-pink-500/15 border-pink-500/10",
        iconText: "text-pink-400",
        linkText: "text-pink-400 hover:text-pink-300"
      }
    },
    tags: ["Typography", "Editor", "Framer Motion"],
    duration: "1 Week",
    status: "Completed"
  },
  {
    title: "Popcorn AI",
    url: "https://popcorn-ai-psi.vercel.app/",
    description: "An intelligent movie recommendation space leveraging smart filters to analyze prompts and suggest customized movie or show options.",
    icon: Film,
    colorClass: {
      light: {
        border: "hover:border-red-500/50 hover:shadow-red-500/5",
        iconBg: "bg-red-50 border-red-100",
        iconText: "text-red-600",
        linkText: "text-red-600 hover:text-red-700"
      },
      dark: {
        border: "hover:border-red-500/40",
        iconBg: "bg-red-500/15 border-red-500/10",
        iconText: "text-red-400",
        linkText: "text-red-400 hover:text-red-300"
      }
    },
    tags: ["AI Curator", "Media Search", "Interactive UI"],
    duration: "2 Weeks",
    status: "Active"
  },
  {
    title: "Zenith Focus",
    url: "https://zenith-focus-rho.vercel.app/",
    description: "A modern productivity companion with customizable pomodoro modes, statistics tracking, and interactive focus states.",
    icon: Clock,
    colorClass: {
      light: {
        border: "hover:border-teal-500/50 hover:shadow-teal-500/5",
        iconBg: "bg-teal-50 border-teal-100",
        iconText: "text-teal-600",
        linkText: "text-teal-600 hover:text-teal-700"
      },
      dark: {
        border: "hover:border-teal-500/40",
        iconBg: "bg-teal-500/15 border-teal-500/10",
        iconText: "text-teal-400",
        linkText: "text-teal-400 hover:text-teal-300"
      }
    },
    tags: ["Productivity", "Pomodoro", "Dashboard"],
    duration: "3 Weeks",
    status: "Completed"
  },
  {
    title: "Photo Booth",
    url: "https://photo-booth-nine-flax.vercel.app/",
    description: "An interactive photo studio web application featuring filters, creative aspect overlays, and rapid image rendering hooks.",
    icon: Camera,
    colorClass: {
      light: {
        border: "hover:border-indigo-500/50 hover:shadow-indigo-500/5",
        iconBg: "bg-indigo-50 border-indigo-100",
        iconText: "text-indigo-600",
        linkText: "text-indigo-600 hover:text-indigo-700"
      },
      dark: {
        border: "hover:border-indigo-500/40",
        iconBg: "bg-indigo-500/15 border-indigo-500/10",
        iconText: "text-indigo-400",
        linkText: "text-indigo-400 hover:text-indigo-300"
      }
    },
    tags: ["React", "Vite UI", "Filters"],
    duration: "2 Weeks",
    status: "Active"
  },
  {
    title: "AI Time Capsule",
    url: "https://time-capsule-amber.vercel.app/",
    description: "A modern web vault designed to lock records, journals, and notes to be unsealed at a pre-configured future timestamp.",
    icon: Hourglass,
    colorClass: {
      light: {
        border: "hover:border-orange-500/50 hover:shadow-orange-500/5",
        iconBg: "bg-orange-50 border-orange-100",
        iconText: "text-orange-600",
        linkText: "text-orange-600 hover:text-orange-700"
      },
      dark: {
        border: "hover:border-orange-500/40",
        iconBg: "bg-orange-500/15 border-orange-500/10",
        iconText: "text-orange-400",
        linkText: "text-orange-400 hover:text-orange-300"
      }
    },
    tags: ["Future Vault", "Secure Keys", "Local Cache"],
    duration: "1 Week",
    status: "Completed"
  },
  {
    title: "MythOS",
    url: "https://myth-os-ashen.vercel.app/",
    description: "An immersive, terminal-themed roleplaying OS providing deep world building, character stat sheets, and interactive mythology lore.",
    icon: BookOpen,
    colorClass: {
      light: {
        border: "hover:border-violet-500/50 hover:shadow-violet-500/5",
        iconBg: "bg-violet-50 border-violet-100",
        iconText: "text-violet-600",
        linkText: "text-violet-600 hover:text-violet-700"
      },
      dark: {
        border: "hover:border-violet-500/40",
        iconBg: "bg-violet-500/15 border-violet-500/10",
        iconText: "text-violet-400",
        linkText: "text-violet-400 hover:text-violet-300"
      }
    },
    tags: ["Mythology", "Retro OS", "Interactions"],
    duration: "3 Weeks",
    status: "Completed"
  }
];

export default function Projects() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section id="projects" className={`py-20 border-t overflow-hidden font-sans transition-colors duration-300 ${
      isLight ? "bg-white border-slate-200" : "bg-slate-950 border-slate-900"
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Intro */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 px-3 py-1.5 rounded-full inline-flex mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            PORTFOLIO & SHOWCASE
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isLight ? "text-slate-950" : "text-white"}`}>
            Production Showcases & Projects
          </h2>
          <p className={`text-sm mt-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            I craft high-performance code and responsive, stateful web applications. Explore my highlighted production case studies and live demos below!
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsList.map((project, idx) => {
            const cc = isLight ? project.colorClass.light : project.colorClass.dark;
            return (
              <div 
                key={idx}
                className={`transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group border ${
                  isLight 
                    ? `bg-slate-50/50 border-slate-200 hover:bg-white shadow-sm shadow-slate-100 ${cc.border}` 
                    : `bg-gradient-to-br from-slate-900 to-black border-slate-800 hover:from-slate-850 hover:to-slate-900 ${cc.border}`
                }`}
              >
                <div>
                  {/* Top bar with Icon and Status/Timeline badges */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${cc.iconBg}`}>
                      <project.icon className={`w-5 h-5 ${cc.iconText}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                        isLight 
                          ? "bg-slate-100 border-slate-200 text-slate-600" 
                          : "bg-slate-950 border-slate-850 text-slate-400"
                      }`}>
                        <Calendar className="w-3 h-3 text-indigo-500" />
                        {project.duration}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        project.status === "Active" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:text-emerald-400" 
                          : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <h4 className={`text-xl font-bold mb-2 font-sans tracking-tight ${isLight ? "text-slate-950" : "text-slate-100"}`}>
                    {project.title}
                  </h4>
                  <p className={`text-xs leading-relaxed mb-6 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-md border ${
                          isLight 
                            ? "bg-slate-100 text-slate-600 border-slate-200" 
                            : "bg-slate-950 text-slate-400 border-slate-850"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-xs font-bold group-hover:gap-3 transition-all text-left ${cc.linkText}`}
                >
                  <span>LAUNCH LIVE DEMO</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

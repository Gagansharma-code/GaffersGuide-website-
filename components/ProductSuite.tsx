"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Code, Monitor, Package, Terminal } from "lucide-react";

export function ProductSuite() {
  const [activeTab, setActiveTab] = useState<"desktop" | "pypi">("desktop");

  const desktopSteps = [
    { id: 1, title: "Download the App", description: "Grab the latest release for your operating system from our GitHub." },
    { id: 2, title: "Zero Configuration", description: "Just open the app. Our smart Electron bridge automatically detects if you need the core AI engine and safely installs it in the background." },
    { id: 3, title: "Choose Your Match", description: "Upload your broadcast footage and select a Quality Profile (Fast, Balanced, High-Res, or SAHI)." },
    { id: 4, title: "Gain Tactical Dominance", description: "Watch the live terminal feed as the AI tracks players, maps the pitch, and generates your interactive tactical report." }
  ];

  const pypiSteps = [
    { id: 1, title: "Decoupled Architecture", description: "Only install what you need. Use `gaffers-guide[vision]` for spatial AI, or drop the vision module for lightweight inference." },
    { id: 2, title: "Lazy-Loaded Dependencies", description: "PyTorch, Ultralytics, and Supervision are only imported when called. Zero boot-time penalty." },
    { id: 3, title: "JSON-First API", description: "Integrate seamlessly with any frontend. All analysis outputs are structured, clean, and highly portable." }
  ];

  // Typing animation for terminal
  const [displayedCode, setDisplayedCode] = useState("");
  const codeSnippet = `# pip install "gaffers-guide[vision]"
from gaffers_guide import GafferEngine, Profile

engine = GafferEngine(quality=Profile.HIGH_RES)
report = engine.analyze("match.mp4")

print(report.get_tactical_vulnerabilities())`;

  useEffect(() => {
    if (activeTab === "pypi") {
      setDisplayedCode("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedCode(codeSnippet.slice(0, i));
        i++;
        if (i > codeSnippet.length) clearInterval(interval);
      }, 20); // 20ms per character
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  return (
    <section id="suite" className="py-32 bg-pitch border-t border-slate-dark text-chalk relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-neon/5 blur-[120px] pointer-events-none rounded-full transform -translate-x-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-6">
            Your Gaffers <span className="text-neon">Suite</span>
          </h2>
          <p className="text-lg md:text-xl text-chalk/80 font-sans font-light max-w-2xl mx-auto">
            Whether you want a zero-config desktop app or a modular Python backend, we have you covered.
          </p>
        </div>

        {/* Tab Bar (Superhuman style) */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-slate-dark/30 backdrop-blur-md p-1.5 rounded-lg border border-slate-light/30 shadow-xl">
            <button
              onClick={() => setActiveTab("desktop")}
              className={`flex items-center justify-center space-x-2 px-6 sm:px-10 py-3 rounded-md text-sm font-mono font-bold transition-all ${
                activeTab === "desktop" 
                  ? "bg-neon text-pitch shadow-[0_0_15px_rgba(0,230,118,0.3)]" 
                  : "text-chalk/60 hover:text-chalk hover:bg-slate-light/20"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop Workspace</span>
            </button>
            <button
              onClick={() => setActiveTab("pypi")}
              className={`flex items-center justify-center space-x-2 px-6 sm:px-10 py-3 rounded-md text-sm font-mono font-bold transition-all ${
                activeTab === "pypi" 
                  ? "bg-neon text-pitch shadow-[0_0_15px_rgba(0,230,118,0.3)]" 
                  : "text-chalk/60 hover:text-chalk hover:bg-slate-light/20"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>PyPI Library</span>
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[600px] relative">
          <AnimatePresence mode="wait">
            
            {/* DESKTOP WORKSPACE VIEW */}
            {activeTab === "desktop" && (
              <motion.div
                key="desktop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start absolute inset-0"
              >
                {/* Left Column: Animated Visuals & CTAs */}
                <div className="flex flex-col space-y-10">
                  {/* Dynamic App Screenshot */}
                  <div className="relative aspect-video rounded-xl border border-slate-light/50 bg-gradient-to-br from-slate-dark/40 to-black overflow-hidden shadow-[0_0_50px_rgba(0,230,118,0.05)] group">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 space-x-2 z-10">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      
                      <div className="flex-1 relative overflow-hidden bg-pitch">
                        <video 
                          src="/demo.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col xl:flex-row gap-4">
                    <a 
                      href="https://github.com/Gagansharma-code/GaffersGuide-to-a-good-game/releases"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-neon text-pitch font-mono font-bold text-sm rounded shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-all"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      DOWNLOAD APP
                    </a>
                  </div>
                </div>

                {/* Right Column: Steps with Staggered Entrance */}
                <div className="flex flex-col space-y-2 lg:pl-10">
                  {desktopSteps.map((step, index) => (
                    <motion.div 
                      key={step.id} 
                      className="flex group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                    >
                      <div className="flex flex-col items-center mr-6">
                        <div className="w-12 h-12 rounded-full border border-neon/30 bg-neon/10 flex items-center justify-center text-neon font-mono font-bold text-lg shadow-[0_0_15px_rgba(0,230,118,0.1)] group-hover:bg-neon group-hover:text-pitch transition-all duration-300 z-10">
                          {step.id}
                        </div>
                        {step.id !== desktopSteps.length && (
                          <div className="flex-1 w-px bg-slate-dark my-4 group-hover:bg-neon/30 transition-colors duration-300" />
                        )}
                      </div>
                      <div className="pb-8 pt-1">
                        <h3 className="text-xl font-bold font-sans text-chalk mb-3 group-hover:text-neon transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-chalk/70 font-sans font-light leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PYPI LIBRARY VIEW */}
            {activeTab === "pypi" && (
              <motion.div
                key="pypi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start absolute inset-0 w-full"
              >
                {/* Left Column: Value Prop */}
                <div className="flex flex-col space-y-12 lg:pr-10">
                  <div className="space-y-12">
                    {pypiSteps.map((step, index) => (
                      <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                      >
                        <h3 className="text-xl font-bold font-sans text-chalk mb-3">
                          {step.title}
                        </h3>
                        <p className="text-chalk/70 font-sans font-light leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <a 
                      href="https://pypi.org/project/gaffers-guide/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-slate-light text-chalk font-mono font-bold text-sm rounded hover:border-neon hover:text-neon transition-all"
                    >
                      <Terminal className="w-5 h-5 mr-3" />
                      VIEW ON PYPI
                    </a>
                  </motion.div>
                </div>

                {/* Right Column: Animated IDE */}
                <div className="w-full">
                  <div className="rounded-xl overflow-hidden border border-slate-light bg-[#0d1117] shadow-2xl relative group">
                    <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-slate-light/50">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="flex-1 text-center font-mono text-xs text-slate-400">
                        main.py
                      </div>
                    </div>
                    
                    <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto relative h-[300px]">
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <pre>
                        <code className="text-chalk/80">
                          {displayedCode}
                          <motion.span 
                            animate={{ opacity: [1, 0] }} 
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-2 h-4 bg-neon ml-1 align-middle"
                          />
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

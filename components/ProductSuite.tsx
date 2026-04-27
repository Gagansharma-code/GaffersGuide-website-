"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Code, Monitor, Package, Terminal } from "lucide-react";

export function ProductSuite() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"desktop" | "pypi">("desktop");

  const desktopRef = useRef<HTMLDivElement>(null);
  const pypiRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to update active tab based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "desktop-view") setActiveTab("desktop");
            if (entry.target.id === "pypi-view") setActiveTab("pypi");
          }
        });
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    if (desktopRef.current) observer.observe(desktopRef.current);
    if (pypiRef.current) observer.observe(pypiRef.current);

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab: "desktop" | "pypi") => {
    const target = tab === "desktop" ? desktopRef.current : pypiRef.current;
    if (target) {
      // Scroll to element with offset for the sticky header
      const y = target.getBoundingClientRect().top + window.scrollY - 260;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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

  // Typing animation for terminal with VS Code colors
  const [charCount, setCharCount] = useState(0);

  const codeTokens = [
    { text: '# pip install "gaffers-guide[vision]"\n', color: 'text-[#6a9955]' },
    { text: 'from ', color: 'text-[#c586c0]' },
    { text: 'gaffers_guide.pipeline ', color: 'text-[#d4d4d4]' },
    { text: 'import ', color: 'text-[#c586c0]' },
    { text: 'MatchAnalysisPipeline\n', color: 'text-[#4ec9b0]' },
    { text: 'from ', color: 'text-[#c586c0]' },
    { text: 'gaffers_guide.pipeline.config ', color: 'text-[#d4d4d4]' },
    { text: 'import ', color: 'text-[#c586c0]' },
    { text: 'PipelineConfig\n', color: 'text-[#4ec9b0]' },
    { text: 'from ', color: 'text-[#c586c0]' },
    { text: 'pathlib ', color: 'text-[#d4d4d4]' },
    { text: 'import ', color: 'text-[#c586c0]' },
    { text: 'Path\n\n', color: 'text-[#4ec9b0]' },
    
    { text: '# 1. Configure the lazy-loaded engine\n', color: 'text-[#6a9955]' },
    { text: 'config', color: 'text-[#9cdcfe]' },
    { text: ' = ', color: 'text-[#d4d4d4]' },
    { text: 'PipelineConfig', color: 'text-[#4ec9b0]' },
    { text: '(\n    ', color: 'text-[#d4d4d4]' },
    { text: 'video', color: 'text-[#9cdcfe]' },
    { text: '=', color: 'text-[#d4d4d4]' },
    { text: 'Path', color: 'text-[#4ec9b0]' },
    { text: '(', color: 'text-[#d4d4d4]' },
    { text: '"match.mp4"', color: 'text-[#ce9178]' },
    { text: '),\n    ', color: 'text-[#d4d4d4]' },
    { text: 'output_dir', color: 'text-[#9cdcfe]' },
    { text: '=', color: 'text-[#d4d4d4]' },
    { text: 'Path', color: 'text-[#4ec9b0]' },
    { text: '(', color: 'text-[#d4d4d4]' },
    { text: '"output"', color: 'text-[#ce9178]' },
    { text: '),\n    ', color: 'text-[#d4d4d4]' },
    { text: 'quality_profile', color: 'text-[#9cdcfe]' },
    { text: '=', color: 'text-[#d4d4d4]' },
    { text: '"balanced"', color: 'text-[#ce9178]' },
    { text: '\n)\n\n', color: 'text-[#d4d4d4]' },
    
    { text: '# 2. Run the end-to-end analysis\n', color: 'text-[#6a9955]' },
    { text: 'pipeline', color: 'text-[#9cdcfe]' },
    { text: ' = ', color: 'text-[#d4d4d4]' },
    { text: 'MatchAnalysisPipeline', color: 'text-[#4ec9b0]' },
    { text: '.', color: 'text-[#d4d4d4]' },
    { text: 'from_profile', color: 'text-[#dcdcaa]' },
    { text: '(', color: 'text-[#d4d4d4]' },
    { text: '"balanced"', color: 'text-[#ce9178]' },
    { text: ')\n', color: 'text-[#d4d4d4]' },
    
    { text: 'report_path', color: 'text-[#9cdcfe]' },
    { text: ' = ', color: 'text-[#d4d4d4]' },
    { text: 'pipeline', color: 'text-[#9cdcfe]' },
    { text: '.', color: 'text-[#d4d4d4]' },
    { text: 'process_video', color: 'text-[#dcdcaa]' },
    { text: '(', color: 'text-[#d4d4d4]' },
    { text: 'config', color: 'text-[#9cdcfe]' },
    { text: ')\n\n', color: 'text-[#d4d4d4]' },
    
    { text: 'print', color: 'text-[#dcdcaa]' },
    { text: '(f', color: 'text-[#d4d4d4]' },
    { text: '"Analysis saved to: {', color: 'text-[#ce9178]' },
    { text: 'report_path', color: 'text-[#9cdcfe]' },
    { text: '}"', color: 'text-[#ce9178]' },
    { text: ')', color: 'text-[#d4d4d4]' }
  ];

  const totalChars = codeTokens.reduce((acc, t) => acc + t.text.length, 0);

  useEffect(() => {
    if (activeTab === "pypi") {
      setCharCount(0);
      const interval = setInterval(() => {
        setCharCount(prev => {
          if (prev >= totalChars) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 5); // Typing speed
      return () => clearInterval(interval);
    }
  }, [activeTab, totalChars]);

  const renderTypedCode = () => {
    let remaining = charCount;
    return codeTokens.map((token, i) => {
      if (remaining <= 0) return null;
      const charsToTake = Math.min(remaining, token.text.length);
      remaining -= charsToTake;
      return (
        <span key={i} className={token.color}>
          {token.text.slice(0, charsToTake)}
        </span>
      );
    });
  };

  return (
    <section 
      id="suite" 
      className="relative bg-pitch border-t border-slate-dark text-chalk pt-20 pb-32"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-neon/5 blur-[120px] pointer-events-none rounded-full transform -translate-x-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col">
        
        {/* Sticky Header containing Title and Tabs */}
        <div className="sticky top-16 z-40 bg-pitch/95 backdrop-blur-md pt-8 pb-6 mb-16 -mx-6 px-6 border-b border-slate-dark/50 shadow-xl">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wide mb-4">
                Your Gaffers <span className="text-neon">Suite</span>
              </h2>
              <p className="text-base md:text-lg text-chalk/80 font-sans font-light max-w-2xl mx-auto hidden md:block">
                Whether you want a zero-config desktop app or a modular Python backend, we have you covered.
              </p>
            </div>

            {/* Tab Bar (Superhuman style) */}
            <div className="flex justify-center">
              <div className="inline-flex bg-slate-dark/30 backdrop-blur-md p-1.5 rounded-lg border border-slate-light/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <button
                  onClick={() => handleTabClick("desktop")}
                  className={`flex items-center justify-center space-x-2 px-4 sm:px-8 py-2.5 rounded-md text-xs sm:text-sm font-mono font-bold transition-all ${
                    activeTab === "desktop" 
                      ? "bg-neon text-pitch shadow-[0_0_15px_rgba(0,230,118,0.3)]" 
                      : "text-chalk/60 hover:text-chalk hover:bg-slate-light/20"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Desktop Workspace</span>
                </button>
                <button
                  onClick={() => handleTabClick("pypi")}
                  className={`flex items-center justify-center space-x-2 px-4 sm:px-8 py-2.5 rounded-md text-xs sm:text-sm font-mono font-bold transition-all ${
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
          </div>
        </div>

        {/* Content Area - Stacked vertically for native scroll */}
        <div className="space-y-32 lg:space-y-48">
          
          {/* DESKTOP WORKSPACE VIEW */}
          <div id="desktop-view" ref={desktopRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-start w-full">
            {/* Left Column: Animated Visuals & CTAs */}
            <div className="flex flex-col space-y-4 lg:space-y-6">
              {/* Video Player */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video rounded-xl border border-slate-light/50 bg-gradient-to-br from-slate-dark/40 to-black overflow-hidden shadow-[0_0_50px_rgba(0,230,118,0.05)] group"
              >
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
              </motion.div>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col xl:flex-row gap-4"
              >
                <a 
                  href="https://github.com/Gagansharma-code/GaffersGuide-to-a-good-game/releases"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-neon text-pitch font-mono font-bold text-sm rounded shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-all"
                >
                  <Download className="w-5 h-5 mr-3" />
                  DOWNLOAD APP
                </a>
              </motion.div>
            </div>

            {/* Right Column: Steps with Staggered Entrance */}
            <div className="flex flex-col space-y-2 lg:pl-8">
              {desktopSteps.map((step, index) => (
                <motion.div 
                  key={step.id} 
                  className="flex group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-neon/30 bg-neon/10 flex items-center justify-center text-neon font-mono font-bold text-sm lg:text-base shadow-[0_0_15px_rgba(0,230,118,0.1)] group-hover:bg-neon group-hover:text-pitch transition-all duration-300 z-10 shrink-0">
                      {step.id}
                    </div>
                    {step.id !== desktopSteps.length && (
                      <div className="flex-1 w-px bg-slate-dark my-1 lg:my-2 group-hover:bg-neon/30 transition-colors duration-300" />
                    )}
                  </div>
                  <div className="pb-3 lg:pb-4 pt-1">
                    <h3 className="text-base lg:text-lg font-bold font-sans text-chalk mb-1 group-hover:text-neon transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-chalk/70 font-sans font-light leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PYPI LIBRARY VIEW */}
          <div id="pypi-view" ref={pypiRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-start w-full">
            {/* Left Column: Value Prop */}
            <div className="flex flex-col space-y-6 lg:space-y-8 lg:pr-8">
              <div className="space-y-6 lg:space-y-8">
                {pypiSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                  >
                    <h3 className="text-base lg:text-lg font-bold font-sans text-chalk mb-1 lg:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-chalk/70 font-sans font-light leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <a 
                  href="https://pypi.org/project/gaffers-guide/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-slate-light text-chalk font-mono font-bold text-sm rounded hover:border-neon hover:text-neon transition-all"
                >
                  <Terminal className="w-5 h-5 mr-3" />
                  VIEW ON PYPI
                </a>
              </motion.div>
            </div>

            {/* Right Column: Animated IDE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="rounded-xl overflow-hidden border border-slate-light bg-[#0d1117] shadow-2xl relative group h-full">
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
                
                <div className="p-4 lg:p-6 font-mono text-xs lg:text-sm leading-relaxed overflow-y-auto relative h-[350px] lg:h-[450px] scrollbar-thin scrollbar-thumb-slate-dark scrollbar-track-transparent">
                  {/* Glow overlay */}
                  <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <pre className="whitespace-pre-wrap break-all md:break-normal">
                    <code className="text-chalk/80">
                      {renderTypedCode()}
                      <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-2 h-4 bg-neon ml-1 align-middle"
                      />
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands = {
  pip: {
    title: "1. Install Core CV Package",
    command: "pip install gaffers-guide",
    description: "Install the high-performance computer vision engine via PyPI."
  },
  npm: {
    title: "2. Install Frontend Wrapper",
    command: "npm install @gaffers-guide/ui",
    description: "Drop the interactive tactical viewer into your React/Next.js application."
  },
  run: {
    title: "3. Run Analysis",
    command: "gaffers-guide run --video match.mp4 --output ./data --quality-profile balanced",
    description: "Process raw footage locally with configurable quality profiles."
  }
};

const profiles = [
  { name: "fast", desc: "Prioritizes speed/latency for rapid tactical overview." },
  { name: "balanced", desc: "The optimal middle ground for most analysis workflows." },
  { name: "high_res", desc: "Higher fidelity coordinate mapping at a lower frame rate." },
  { name: "sahi", desc: "Maximum quality with context-aware slicing for maximum ball recall." },
];

export function HowToUse() {
  const [activeTab, setActiveTab] = useState<"pip" | "npm" | "run">("pip");

  return (
    <section className="relative bg-pitch z-20 py-24 px-6 border-t border-slate-dark/50" id="how-to-use">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-chalk mb-4">
            HOW TO <span className="text-neon">USE</span>
          </h2>
          <p className="text-chalk/60 max-w-2xl mx-auto text-lg">
            Gaffer's Guide is now available as a modular pip library and frontend package. 
            Integrate world-class tactical analysis directly into your own stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Installation Steps */}
          <div className="space-y-6">
            {(Object.keys(commands) as Array<keyof typeof commands>).map((key) => (
              <motion.div 
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-6 border rounded-xl cursor-pointer transition-all ${
                  activeTab === key 
                    ? "border-neon bg-neon/5" 
                    : "border-slate-dark bg-slate-dark/20 hover:border-chalk/30"
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${activeTab === key ? "text-neon" : "text-chalk"}`}>
                  {commands[key].title}
                </h3>
                <p className="text-chalk/70 text-sm mb-4">
                  {commands[key].description}
                </p>
                <div className="bg-black/50 p-3 rounded-md font-mono text-sm text-chalk/90 flex justify-between items-center border border-white/5">
                  <code>{commands[key].command}</code>
                  {activeTab === key && (
                    <span className="text-neon text-xs uppercase tracking-widest">Active</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Dynamic Content & Quality Profiles */}
          <div className="relative h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "run" ? (
                <motion.div
                  key="profiles"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-dark/30 border border-slate-dark rounded-xl p-8 h-full"
                >
                  <h3 className="text-2xl font-bold text-chalk mb-6 border-b border-white/10 pb-4">
                    Execution Profiles
                  </h3>
                  <p className="text-chalk/70 mb-6 text-sm">
                    Users can explicitly choose tradeoffs between output quality and runtime speed using the <code className="text-neon">--quality-profile</code> flag.
                  </p>
                  
                  <div className="space-y-4">
                    {profiles.map(p => (
                      <div key={p.name} className="flex gap-4 items-start group">
                        <div className="bg-neon/10 border border-neon/30 text-neon px-3 py-1 rounded font-mono text-sm min-w-[100px] text-center group-hover:bg-neon group-hover:text-pitch transition-colors">
                          {p.name}
                        </div>
                        <p className="text-chalk/80 text-sm py-1">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-black/40 rounded-lg border border-white/5">
                    <p className="text-xs text-chalk/50 font-mono">
                      // Example mapping complex spatial relationships
                      <br/>
                      $ gaffers-guide run --video anfield.mp4 --quality-profile sahi
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#0D1117] border border-slate-dark rounded-xl overflow-hidden shadow-2xl h-full flex flex-col"
                >
                  {/* Fake Terminal Header */}
                  <div className="bg-[#161B22] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-4 text-xs font-mono text-chalk/40">developer@gaffers-guide: ~</span>
                  </div>
                  
                  {/* Fake Terminal Content */}
                  <div className="p-6 font-mono text-sm text-chalk/80 flex-1">
                    <div className="mb-2">
                      <span className="text-neon">❯</span> <span className="text-white">{commands[activeTab].command}</span>
                    </div>
                    {activeTab === "pip" && (
                      <div className="text-chalk/50 space-y-1">
                        <p>Collecting gaffers-guide...</p>
                        <p>Downloading gaffers_guide-1.0.0-py3-none-any.whl (42 MB)</p>
                        <p>Installing collected packages: gaffers-guide</p>
                        <p className="text-green-400 mt-2">Successfully installed gaffers-guide-1.0.0</p>
                      </div>
                    )}
                    {activeTab === "npm" && (
                      <div className="text-chalk/50 space-y-1">
                        <p>fetchMetadata: sill resolveWithNewModule @gaffers-guide/ui@latest</p>
                        <p>added 1 package, and audited 254 packages in 2s</p>
                        <p className="text-green-400 mt-2">found 0 vulnerabilities</p>
                        <br/>
                        <p className="text-chalk/30">// Ready to import in your React project:</p>
                        <p className="text-chalk/70">import &#123; TacticalViewer &#125; from "@gaffers-guide/ui";</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

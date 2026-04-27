import React from "react";
import { Terminal, Package } from "lucide-react";

export function ForDevelopers() {
  return (
    <section className="py-32 bg-pitch border-t border-slate-dark text-chalk relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neon/5 blur-[120px] pointer-events-none rounded-full transform translate-x-1/2" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight">
            Built for Developers. <br className="hidden md:block"/>
            <span className="text-neon">Powered by Gaffers Guide.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Value Prop */}
          <div className="space-y-8">
            <p className="text-lg text-chalk/80 leading-relaxed font-sans font-light">
              We just released V2 of our backend AI engine as a highly modular, lazy-loaded Python SDK on PyPI. 
              Gaffer&apos;s Guide is now decoupled into distinct vision, spatial, and IO modules, allowing you to 
              load only what you need, when you need it.
            </p>

            <ul className="space-y-4 font-mono text-sm">
              <li className="flex items-start">
                <span className="text-neon mr-3 mt-1">▹</span>
                <span className="text-chalk/70">Lazy-loaded dependencies for fast initialization</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon mr-3 mt-1">▹</span>
                <span className="text-chalk/70">Decoupled Vision, Spatial, and IO modules</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon mr-3 mt-1">▹</span>
                <span className="text-chalk/70">Configurable pipeline execution profiles</span>
              </li>
            </ul>

            <div className="pt-6">
              <a 
                href="https://pypi.org/project/gaffers-guide" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-neon text-pitch font-mono font-bold text-sm rounded shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] transition-all"
              >
                <Package className="w-5 h-5 mr-3" />
                VIEW ON PYPI
              </a>
            </div>
          </div>

          {/* Right Side: Mock IDE */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon/20 to-cyan-500/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-gray-950 rounded-xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
              {/* IDE Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center text-xs text-gray-400 font-mono">
                  <Terminal className="w-3 h-3 mr-2" />
                  pipeline_demo.py
                </div>
                <div className="w-10"></div> {/* Spacer for symmetry */}
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                <pre className="text-gray-300">
<span className="text-gray-500"># pip install &quot;gaffers-guide[vision]&quot;</span>
{"\n"}
<span className="text-purple-400">from</span> gaffers_guide.pipeline <span className="text-purple-400">import</span> MatchAnalysisPipeline
{"\n"}
<span className="text-purple-400">from</span> gaffers_guide.pipeline.config <span className="text-purple-400">import</span> PipelineConfig
{"\n"}
<span className="text-purple-400">from</span> pathlib <span className="text-purple-400">import</span> Path
{"\n\n"}
<span className="text-gray-500"># 1. Configure the lazy-loaded engine</span>
{"\n"}
config = PipelineConfig(
{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;video=Path(<span className="text-green-400">&quot;match.mp4&quot;</span>),
{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;output_dir=Path(<span className="text-green-400">&quot;output&quot;</span>),
{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;quality_profile=<span className="text-green-400">&quot;balanced&quot;</span>
{"\n"}
)
{"\n\n"}
<span className="text-gray-500"># 2. Run the end-to-end analysis</span>
{"\n"}
pipeline = MatchAnalysisPipeline.from_profile(<span className="text-green-400">&quot;balanced&quot;</span>)
{"\n"}
report_path = pipeline.process_video(config)
{"\n\n"}
<span className="text-blue-400">print</span>(<span className="text-green-400">f&quot;Analysis saved to: </span><span className="text-orange-300">{"{"}</span><span className="text-gray-300">report_path</span><span className="text-orange-300">{"}"}</span><span className="text-green-400">&quot;</span>)
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

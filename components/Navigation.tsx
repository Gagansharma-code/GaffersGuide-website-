"use client";

import React from "react";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-pitch/80 border-b border-slate-dark text-chalk font-mono">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-chalk">
            Gaffer's Guide <span className="mx-1 sm:mx-2 text-chalk/50 font-light">-</span> <span className="text-neon whitespace-nowrap">See more, Win more</span>
          </span>
        </div>


      </div>
    </nav>
  );
}

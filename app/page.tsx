"use client"

import Link from "next/link"
import { ArrowRight, Activity, Network, Zap } from "lucide-react"
import { useAudio } from "@/hooks/useAudio"

export default function LandingPage() {
  const { playHover, playClick } = useAudio()

  return (
    <main className="min-h-screen relative overflow-hidden bg-background text-foreground flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>

        {/* Animated Data Nodes (Mockup) */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-pulse-glow shadow-[0_0_15px_#0ff]"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 rounded-full bg-secondary animate-pulse-glow shadow-[0_0_15px_#f0f] delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 rounded-full bg-accent animate-pulse-glow shadow-[0_0_15px_#bd00ff] delay-1000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-2 border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur-sm animate-fade-in-up">
          <Activity className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary tracking-wider uppercase">System Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight leading-tight neon-text animate-fade-in-up delay-100">
          Algorithms <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Racing</span><br />
          Across the Same Graph
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-inter leading-relaxed animate-fade-in-up delay-200">
          Visualize real-time pathfinding efficiency. Compare Dijkstra vs A* on interactive dark-mode maps.
          Witness the traversal trees expand in cyberpunk neon data streams.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Link
            href="/comparison"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative px-8 py-4 bg-primary/10 border border-primary text-primary font-bold tracking-widest uppercase rounded-sm hover:bg-primary hover:text-black transition-all duration-300 neon-border"
          >
            <span className="flex items-center gap-2">
              Launch Explorer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></div>
          </Link>

          <Link
            href="/docs"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group px-8 py-4 bg-secondary/5 border border-secondary/50 text-secondary font-bold tracking-widest uppercase rounded-sm hover:bg-secondary/10 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View Data Docs <Network className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Decorative Footer Elements */}
      <div className="absolute bottom-10 inset-x-0 flex justify-between px-10 opacity-30 text-xs font-orbitron tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-yellow-400" /> Latency: 4ms
        </div>
        <div className="flex items-center gap-2">
          Status: Optimized
        </div>
      </div>
    </main>
  )
}

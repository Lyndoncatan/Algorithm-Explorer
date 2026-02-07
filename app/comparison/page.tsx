"use client"

import dynamic from 'next/dynamic'
import { useState } from 'react'
import SearchTreeVisualization from '@/components/search-tree-visualization'
import { Play, RotateCcw } from 'lucide-react'
import { useAudio } from '@/hooks/useAudio'

// Dynamically import MapClient to avoid SSR issues with Leaflet
const MapClient = dynamic(() => import('@/components/Map/MapClient'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted/20 animate-pulse flex items-center justify-center text-muted-foreground">Loading Map System...</div>
})

export default function ComparisonPage() {
  const [isRunning, setIsRunning] = useState(false)
  const { playClick, playStart, playHover } = useAudio()

  const handleStart = () => {
    playStart()
    setIsRunning(true)
  }

  const handleReset = () => {
    playClick()
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-4 flex flex-col gap-4">
      {/* Controls */}
      <div className="flex items-center justify-between bg-card/50 p-4 rounded-lg border border-border backdrop-blur-sm">
        <h1 className="text-2xl font-orbitron font-bold text-primary neon-text">Algorithm Comparison Protocol</h1>
        <div className="flex gap-4">
          <button
            onClick={handleStart}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-black font-bold rounded hover:bg-primary/80 transition-colors"
          >
            <Play className="w-4 h-4" /> EXECUTE
          </button>
          <button
            onClick={handleReset}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-6 py-2 bg-secondary/20 text-secondary border border-secondary font-bold rounded hover:bg-secondary/40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> RESET
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

        {/* Maps Section (Left - 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dijkstra Map */}
          <div className="h-[400px] relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-primary/50 rounded-lg"></div>
            <MapClient algorithm="dijkstra" active={isRunning} />
          </div>

          {/* A* Map */}
          <div className="h-[400px] relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-secondary/50 rounded-lg"></div>
            <MapClient algorithm="astar" active={isRunning} />
          </div>
        </div>

        {/* Search Tree Stack (Right - 1 Column) */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4 h-full overflow-y-auto backdrop-blur-md">
          <SearchTreeVisualization />
        </div>

      </div>
    </div>
  )
}

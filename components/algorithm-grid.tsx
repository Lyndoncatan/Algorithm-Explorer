'use client'

import { useState, useEffect } from 'react'
import MapVisualization from './map-visualization'

const algorithms = [
  {
    name: 'Dijkstra Algorithm',
    description: 'Finds shortest path using greedy approach with priority queue',
    color: 'primary',
    icon: '◆',
  },
  {
    name: 'A* Search (Haversine)',
    description: 'Optimized pathfinding using heuristic distance estimation',
    color: 'secondary',
    icon: '★',
  },
]

export default function AlgorithmGrid() {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 bg-accent text-accent-foreground font-semibold rounded text-sm hover:shadow-lg hover:shadow-accent/50 transition-all"
        >
          {isRunning ? '⏸ Pause' : '▶ Run'}
        </button>
        <button className="px-6 py-2 border border-muted text-muted-foreground font-semibold rounded text-sm hover:border-foreground transition-colors">
          ↻ Reset
        </button>
      </div>

      {/* Algorithm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {algorithms.map((algo, idx) => (
          <div key={idx} className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-lg ${idx === 0 ? 'glow-primary' : 'glow-secondary'}`}>{algo.icon}</span>
                  <h3 className="text-lg font-bold">{algo.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{algo.description}</p>
              </div>
            </div>

            {/* Map Visualization */}
            <div className="rounded-lg overflow-hidden border border-border">
              <MapVisualization algorithmName={algo.name} isRunning={isRunning} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div className="border border-muted rounded p-3">
                <div className="text-muted-foreground text-xs mb-1">Nodes Explored</div>
                <div className={`font-bold ${idx === 0 ? 'text-primary' : 'text-secondary'}`}>248</div>
              </div>
              <div className="border border-muted rounded p-3">
                <div className="text-muted-foreground text-xs mb-1">Path Distance</div>
                <div className="font-bold text-accent">45.2km</div>
              </div>
              <div className="border border-muted rounded p-3">
                <div className="text-muted-foreground text-xs mb-1">Time (ms)</div>
                <div className="font-bold text-secondary">{idx === 0 ? '342' : '189'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

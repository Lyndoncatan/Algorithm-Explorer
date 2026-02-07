'use client'

import { useState } from 'react'

interface TreeNode {
  name: string
  color: 'primary' | 'secondary' | 'accent'
  description: string
  nodes: number
  complexity: string
}

const trees: TreeNode[] = [
  {
    name: 'Dijkstra',
    color: 'primary',
    description: 'Priority-based exploration',
    nodes: 248,
    complexity: 'O(E log V)',
  },
  {
    name: "Prim's MST",
    color: 'secondary',
    description: 'Minimum spanning tree',
    nodes: 156,
    complexity: 'O(E log V)',
  },
  {
    name: 'Depth-First',
    color: 'accent',
    description: 'Stack-based traversal',
    nodes: 312,
    complexity: 'O(V + E)',
  },
  {
    name: 'Breadth-First',
    color: 'secondary',
    description: 'Queue-based traversal',
    nodes: 289,
    complexity: 'O(V + E)',
  },
  {
    name: 'Greedy Best',
    color: 'primary',
    description: 'Heuristic-guided search',
    nodes: 164,
    complexity: 'O(E log V)',
  },
]

const colorClasses = {
  primary: 'border-primary text-primary glow-primary',
  secondary: 'border-secondary text-secondary glow-secondary',
  accent: 'border-accent text-accent glow-accent',
}

export default function SearchTreeVisualization() {
  const [expandedTree, setExpandedTree] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold glow-primary">Search Trees</h2>
        <p className="text-sm text-muted-foreground">Algorithm complexity analysis</p>
      </div>

      <div className="space-y-3">
        {trees.map((tree) => (
          <div
            key={tree.name}
            className="border border-border rounded-lg p-4 hover:border-primary/50 cursor-pointer transition-colors"
            onClick={() => setExpandedTree(expandedTree === tree.name ? null : tree.name)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className={`font-bold ${colorClasses[tree.color]}`}>{tree.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{tree.description}</div>
              </div>
              <div className="text-xl text-muted-foreground">{expandedTree === tree.name ? '−' : '+'}</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="border border-muted rounded p-2">
                <div className="text-muted-foreground mb-1">Nodes</div>
                <div className={`font-bold ${colorClasses[tree.color]}`}>{tree.nodes}</div>
              </div>
              <div className="border border-muted rounded p-2">
                <div className="text-muted-foreground mb-1">Time Complexity</div>
                <div className="font-mono font-bold text-accent">{tree.complexity}</div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedTree === tree.name && (
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs">
                <div>
                  <div className="text-muted-foreground mb-1">Tree Structure</div>
                  <div className="bg-background/50 rounded p-3 font-mono text-xs opacity-70">
                    <div>├─ Root</div>
                    <div>│  ├─ Branch A ({Math.floor(tree.nodes * 0.4)} nodes)</div>
                    <div>│  │  ├─ Leaf 1</div>
                    <div>│  │  └─ Leaf 2</div>
                    <div>│  └─ Branch B ({Math.floor(tree.nodes * 0.6)} nodes)</div>
                    <div>│     ├─ Leaf 3</div>
                    <div>│     └─ Leaf 4</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

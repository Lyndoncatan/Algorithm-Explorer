export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12 pb-20">

      {/* Header */}
      <section className="space-y-4 animate-fade-in-up">
        <h1 className="text-4xl font-orbitron font-bold text-primary neon-text">System Documentation</h1>
        <p className="text-xl text-muted-foreground font-inter border-l-2 border-primary pl-4">
          Algorithm Explorer is a specialized visualization tool for comparative analysis of graph traversal algorithms in geospatial contexts.
        </p>
      </section>

      {/* Stack Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
        <div className="bg-card/40 p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-secondary">●</span> Data Sources</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="font-bold text-foreground">OpenStreetMap (OSM)</span>
              <span>- Raw geospatial node/edge data</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-foreground">CartoDB DarkMatter</span>
              <span>- Basemap tiles</span>
            </li>
          </ul>
        </div>

        <div className="bg-card/40 p-6 rounded-lg border border-border hover:border-secondary/50 transition-colors">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-accent">●</span> Core Libraries</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="font-bold text-foreground">Next.js 14</span> - App Router & SSR</li>
            <li><span className="font-bold text-foreground">Leaflet / React-Leaflet</span> - Interactive Maps</li>
            <li><span className="font-bold text-foreground">NetworkX (Python)</span> - Graph Logic Reference</li>
            <li><span className="font-bold text-foreground">Tailwind CSS</span> - Styling Engine</li>
          </ul>
        </div>
      </section>

      {/* Algorithms Detail */}
      <section className="space-y-6 animate-fade-in-up delay-200">
        <h2 className="text-3xl font-orbitron font-bold text-foreground">Implemented Algorithms</h2>
        <div className="glass-panel p-6 rounded-lg space-y-4">
          <div className="border-b border-border pb-4">
            <h3 className="text-lg font-bold text-primary">Dijkstra's Algorithm</h3>
            <p className="text-sm text-muted-foreground mt-1">Guarantees the shortest path. Explores in all directions uniformly (breadth-first on weighted graphs). Can be slow on large grids.</p>
          </div>
          <div className="border-b border-border pb-4">
            <h3 className="text-lg font-bold text-secondary">A* Search (Haversine Heuristic)</h3>
            <p className="text-sm text-muted-foreground mt-1">Uses a heuristic (distance to goal) to guide exploration. Much faster than Dijkstra for point-to-point pathfinding while still guaranteeing the shortest path if the heuristic is admissible.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent">Greedy Best-First Search</h3>
            <p className="text-sm text-muted-foreground mt-1">Explores only the most promising nodes. Very fast but does not guarantee the shortest path.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 text-center text-xs text-muted-foreground opacity-50 font-mono">
        <p>SYSTEM ID: ALGO-EX-2025 // SECURE CONNECTION ESTABLISHED</p>
        <p className="mt-2">Developed by Antigravity Agent</p>
      </footer>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

interface MapVisualizationProps {
  algorithmName: string
  isRunning: boolean
}

export default function MapVisualization({ algorithmName, isRunning }: MapVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Array<{ x: number; y: number }>>([])
  const [pathProgress, setPathProgress] = useState(0)

  // Initialize nodes
  useEffect(() => {
    const generatedNodes = Array.from({ length: 12 }).map(() => ({
      x: Math.random() * 380 + 10,
      y: Math.random() * 220 + 10,
    }))
    setNodes(generatedNodes)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setPathProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)

    return () => clearInterval(timer)
  }, [isRunning])

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = 'hsl(240, 10%, 5%)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (nodes.length === 0) return

    // Draw grid
    ctx.strokeStyle = 'hsl(280, 100%, 50%, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw connections
    const isDijkstra = algorithmName.includes('Dijkstra')
    const primary = isDijkstra ? 'hsl(280, 100%, 50%)' : 'hsl(180, 100%, 50%)'
    const secondary = isDijkstra ? 'hsl(280, 100%, 30%)' : 'hsl(180, 100%, 30%)'

    ctx.strokeStyle = secondary
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.3
    for (let i = 0; i < nodes.length - 1; i++) {
      ctx.beginPath()
      ctx.moveTo(nodes[i].x, nodes[i].y)
      ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y)
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // Draw explored nodes
    ctx.fillStyle = secondary
    ctx.globalAlpha = 0.5
    const exploredCount = Math.floor((nodes.length * pathProgress) / 100)
    for (let i = 0; i < exploredCount; i++) {
      ctx.beginPath()
      ctx.arc(nodes[i].x, nodes[i].y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // Draw active path
    ctx.strokeStyle = primary
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.8
    if (exploredCount > 1) {
      ctx.beginPath()
      ctx.moveTo(nodes[0].x, nodes[0].y)
      for (let i = 1; i < Math.min(exploredCount, nodes.length); i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y)
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // Draw node circles with glow
    nodes.forEach((node, idx) => {
      const isStart = idx === 0
      const isEnd = idx === nodes.length - 1
      const isExplored = idx < exploredCount

      // Glow effect with transparent edges
      const gradient = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, 8)
      const glowColor = isStart || isEnd ? primary : secondary
      const glowColorTransparent = glowColor.replace(')', ', 0)')
      gradient.addColorStop(0, glowColor.replace(')', ', 1)'))
      gradient.addColorStop(1, glowColorTransparent)
      ctx.fillStyle = gradient
      ctx.fillRect(node.x - 8, node.y - 8, 16, 16)

      // Node circle
      ctx.fillStyle = isStart || isEnd ? primary : isExplored ? secondary : 'hsl(240, 10%, 20%)'
      ctx.globalAlpha = isStart || isEnd ? 1 : isExplored ? 0.8 : 0.6
      ctx.beginPath()
      ctx.arc(node.x, node.y, isStart || isEnd ? 5 : 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      // Border
      ctx.strokeStyle = isStart || isEnd ? primary : secondary
      ctx.lineWidth = 2
      ctx.globalAlpha = isStart || isEnd ? 1 : 0.5
      ctx.beginPath()
      ctx.arc(node.x, node.y, isStart || isEnd ? 5 : 3, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    })
  }, [nodes, pathProgress, algorithmName])

  return (
    <div className="bg-background/50">
      <canvas ref={canvasRef} width={400} height={240} className="w-full" />
      <div className="p-3 border-t border-border text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Start: Green | End: Red</span>
          <span>{Math.floor(pathProgress)}%</span>
        </div>
      </div>
    </div>
  )
}

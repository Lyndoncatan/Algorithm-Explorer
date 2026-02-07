"use client"

import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapClientProps {
    algorithm: 'dijkstra' | 'astar'
    active: boolean
}

// Mock Data for a path in Los Angeles (Cyberpunk style)
const startNode: [number, number] = [34.0522, -118.2437] // LA
const endNode: [number, number] = [34.0622, -118.2537]

const generateGrid = (center: [number, number], rows: number, cols: number) => {
    const nodes = []
    const latStep = 0.002
    const lngStep = 0.002

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            nodes.push([center[0] + (i - rows / 2) * latStep, center[1] + (j - cols / 2) * lngStep])
        }
    }
    return nodes
}

const gridNodes = generateGrid(startNode, 10, 10)

export default function MapClient({ algorithm, active }: MapClientProps) {
    const [visitedNodes, setVisitedNodes] = useState<number[]>([])
    const [path, setPath] = useState<[number, number][]>([])

    const visitedRef = useRef<Set<number>>(new Set())

    useEffect(() => {
        if (!active) return

        // Simulate algorithm expansion
        const interval = setInterval(() => {
            if (visitedRef.current.size >= gridNodes.length) {
                clearInterval(interval)
                // Draw path after exploration
                setPath([startNode, [34.0542, -118.2457], [34.0562, -118.2477], [34.0582, -118.2497], endNode])
                return
            }

            // Random exploration or heuristic guided
            const nextNodeIndices: number[] = []
            const batchSize = algorithm === 'dijkstra' ? 5 : 2 // Dijkstra expands more broadly

            for (let i = 0; i < batchSize; i++) {
                const idx = Math.floor(Math.random() * gridNodes.length)
                if (!visitedRef.current.has(idx)) {
                    visitedRef.current.add(idx)
                    nextNodeIndices.push(idx)
                }
            }

            if (nextNodeIndices.length > 0) {
                setVisitedNodes(prev => [...prev, ...nextNodeIndices])
            }
        }, 100)

        return () => {
            clearInterval(interval)
            visitedRef.current.clear()
            setVisitedNodes([])
            setPath([])
        }
    }, [active, algorithm])

    return (
        <div className="h-full w-full rounded-lg overflow-hidden border border-border relative">
            <MapContainer center={startNode} zoom={14} scrollWheelZoom={false} className="h-full w-full" style={{ background: '#050510' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Grid Nodes (Exploration) */}
                {visitedNodes.map((idx) => (
                    <CircleMarker
                        key={idx}
                        center={gridNodes[idx] as [number, number]}
                        radius={2}
                        pathOptions={{
                            color: algorithm === 'dijkstra' ? '#0ff' : '#f0f',
                            fillColor: algorithm === 'dijkstra' ? '#0ff' : '#f0f',
                            fillOpacity: 0.5,
                            weight: 0
                        }}
                    />
                ))}

                {/* Start/End */}
                <Marker position={startNode} />
                <Marker position={endNode} />

                {/* Final Path */}
                {path.length > 0 && (
                    <Polyline positions={path} pathOptions={{ color: '#bd00ff', weight: 4, opacity: 0.8 }} />
                )}

            </MapContainer>

            {/* HUD Overlay */}
            <div className="absolute top-4 left-4 z-[1000] bg-black/80 p-2 rounded border border-primary/50 text-xs font-mono">
                <div className="text-primary font-bold uppercase">{algorithm} Search</div>
                <div>Nodes Visited: {visitedNodes.length}</div>
                <div>Status: {path.length > 0 ? 'COMPLETE' : 'SEARCHING...'}</div>
            </div>
        </div>
    )
}

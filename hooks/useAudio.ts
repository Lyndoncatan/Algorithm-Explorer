"use client"

import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

// Fallback Synth if files missing
const createSynth = () => {
    if (typeof window === 'undefined') return null
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return null
    return new AudioContext()
}

export function useAudio() {
    const ctxRef = useRef<AudioContext | null>(null)

    useEffect(() => {
        ctxRef.current = createSynth()
        return () => {
            ctxRef.current?.close()
        }
    }, [])

    const playOscillator = (freq: number, type: OscillatorType, duration: number) => {
        if (!ctxRef.current) return
        const ctx = ctxRef.current
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration)
        osc.stop(ctx.currentTime + duration)
    }

    const playHover = () => {
        // Cyberpunk high-pitch chirp
        playOscillator(2000, 'sine', 0.1)
        playOscillator(1000, 'square', 0.05)
    }

    const playClick = () => {
        // Deeper confirmation 'thud'
        playOscillator(200, 'sawtooth', 0.2)
    }

    const playStart = () => {
        // Power up sound
        playOscillator(100, 'square', 0.5)
        setTimeout(() => playOscillator(300, 'square', 0.5), 100)
        setTimeout(() => playOscillator(600, 'sawtooth', 0.8), 200)
    }

    return { playHover, playClick, playStart }
}

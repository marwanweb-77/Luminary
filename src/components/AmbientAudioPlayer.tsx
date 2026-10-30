"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Chord frequencies: D minor 9th (D3, A3, F4, C5, E5)
      const freqs = [146.83, 220.0, 349.23, 523.25, 659.25];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle frequency drift
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + i * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.15 / freqs.length, ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((i / (freqs.length - 1)) * 1.6 - 0.8, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(oscGain);
          oscGain.connect(masterGain);
        }

        osc.start();
      });

      setIsPlaying(true);
    } catch {
      // Audio context block handling
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtxRef.current.currentTime + 1.5
      );
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Zen Soundscape" : "Play Ambient Focus Soundscape"}
      className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-2 transition-all ${
        isPlaying
          ? "border-violet-500/50 bg-violet-600/20 text-violet-300 shadow-md shadow-violet-900/30"
          : "border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? "bg-violet-400" : "bg-white/30"
          }`}
        />
      </span>
      <span>{isPlaying ? "Focus Drone On" : "Zen Audio"}</span>
    </button>
  );
}


"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggle: () => void;
  frequency: React.MutableRefObject<number>;
}

const AudioCtx = createContext<AudioContextType>({
  isPlaying: false,
  toggle: () => {},
  frequency: { current: 0 },
});

export const useAudio = () => useContext(AudioCtx);

export const audioFrequency: { current: number } = { current: 0 };

export default function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const rafRef = useRef<number>(0);
  const frequency = useRef(0);

  const updateFrequency = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) {
      audioFrequency.current = 0;
      rafRef.current = requestAnimationFrame(updateFrequency);
      return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i];
    const avg = sum / data.length / 255;
    frequency.current = avg;
    audioFrequency.current = avg;
    rafRef.current = requestAnimationFrame(updateFrequency);
  }, []);

  const startAudio = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    masterGain.connect(analyser);
    analyserRef.current = analyser;

    const freqs = [55, 82.41, 110, 130.81, 164.81];
    const oscillators = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.015;
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      return osc;
    });
    oscillatorsRef.current = oscillators;

    masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
    setIsPlaying(true);
    rafRef.current = requestAnimationFrame(updateFrequency);
  }, [updateFrequency]);

  const stopAudio = useCallback(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    }
    cancelAnimationFrame(rafRef.current);
    audioFrequency.current = 0;
    setTimeout(() => {
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
      oscillatorsRef.current = [];
      audioContextRef.current?.close();
      audioContextRef.current = null;
      gainNodeRef.current = null;
      analyserRef.current = null;
      setIsPlaying(false);
    }, 600);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ isPlaying, toggle, frequency }}>
      {children}
    </AudioCtx.Provider>
  );
}

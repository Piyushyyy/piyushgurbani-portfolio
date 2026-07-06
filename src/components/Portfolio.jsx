import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Focus } from 'lucide-react';

const colorMap = {
  red: '#991b1b',      // Deep red
  yellow: '#f4c400',   // Vibrant yellow (default)
  green: '#064e3b',    // Deep forest green
  purple: '#4c1d95',   // Royal purple
  rose: '#881337',     // Luxurious rose
  orange: '#7c2d12'    // Rust orange
};

const Portfolio = () => {
  const [activeColor, setActiveColor] = useState('yellow');
  const containerRef = useRef(null);
  const sharpLayerRef = useRef(null);
  const bgTextRef = useRef(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const animatedCoords = useRef({ x: 0, y: 0 });

  // GSAP quickTo for smooth cursor reveal movement
  useGSAP(() => {
    if (!sharpLayerRef.current) return;

    // Set initial custom properties in center
    const rect = containerRef.current.getBoundingClientRect();
    const initialX = rect.width / 2;
    const initialY = rect.height / 2;
    animatedCoords.current = { x: initialX, y: initialY };
    
    sharpLayerRef.current.style.setProperty('--cursor-x', `${initialX}px`);
    sharpLayerRef.current.style.setProperty('--cursor-y', `${initialY}px`);

    const updateClipPath = () => {
      // Linear interpolation (lerp) for buttery smooth lag
      animatedCoords.current.x += (mouseCoords.current.x - animatedCoords.current.x) * 0.08;
      animatedCoords.current.y += (mouseCoords.current.y - animatedCoords.current.y) * 0.08;

      if (sharpLayerRef.current) {
        sharpLayerRef.current.style.setProperty('--cursor-x', `${animatedCoords.current.x}px`);
        sharpLayerRef.current.style.setProperty('--cursor-y', `${animatedCoords.current.y}px`);
      }
      
      requestAnimationFrame(updateClipPath);
    };

    const animFrame = requestAnimationFrame(updateClipPath);
    
    // Intro animation: scale and fade in watermark text
    gsap.fromTo(bgTextRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 0.08, duration: 1.5, ease: 'power3.out' }
    );

    return () => cancelAnimationFrame(animFrame);
  }, { scope: containerRef });

  // Handle mouse move to track relative position
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseCoords.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Smooth background color transitions
  useGSAP(() => {
    gsap.to(containerRef.current, {
      backgroundColor: colorMap[activeColor],
      duration: 0.8,
      ease: 'power2.out'
    });
  }, [activeColor]);

  // Content shared by both sharp and blurred layers
  const renderContent = (isSharp = false) => {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden">
        {/* Massive 18vw Watermark text */}
        <h1 
          ref={!isSharp ? bgTextRef : null}
          className="absolute text-[18vw] font-black uppercase tracking-tighter leading-none opacity-8 md:opacity-10 text-center select-none pointer-events-none select-none"
        >
          P
          <span className="text-outline-white">O</span>
          RTF
          <span className="text-outline-white">O</span>
          LIO
        </h1>

        {/* Center Showcase Showcase Image Box */}
        <div className="relative w-[320px] h-[400px] md:w-[420px] md:h-[520px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-105">
          {/* Crop Frame SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <rect 
              x="12" 
              y="12" 
              width="calc(100% - 24)" 
              height="calc(100% - 24)" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2" 
              className="marching-ants-border"
            />
            {/* Crop Corner Handles */}
            <rect x="8" y="8" width="12" height="12" fill="#3b82f6" className="shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <rect x="calc(100% - 20)" y="8" width="12" height="12" fill="#3b82f6" />
            <rect x="8" y="calc(100% - 20)" width="12" height="12" fill="#3b82f6" />
            <rect x="calc(100% - 20)" y="calc(100% - 20)" width="12" height="12" fill="#3b82f6" />
          </svg>

          {/* Luxury Showcase Card Graphic / Visual */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-white/10 z-10 flex flex-col justify-end p-8 text-left">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Interactive Showcase</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight leading-none mb-1">PIYUSH GURBANI</h2>
            <p className="text-xs text-zinc-300 font-mono">PORTFOLIO.SCANNER_v1.0</p>
          </div>

          {/* Abstract Premium Visual inside the card */}
          <div className={`w-full h-full bg-zinc-900 flex items-center justify-center transition-all duration-500 ${isSharp ? 'brightness-110' : 'brightness-75'}`}>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-yellow-400 via-blue-500 to-rose-600 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute inset-4 bg-zinc-950 rounded-full flex items-center justify-center">
                <Focus className="w-12 h-12 text-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="fixed inset-0 w-full h-full z-0 select-none overflow-hidden cursor-crosshair bg-zinc-950 transition-colors duration-1000"
    >
      {/* LAYER 1: Blurred Background Layer */}
      <div className="absolute inset-0 filter blur-[8px] brightness-75 scale-[1.02]">
        {renderContent(false)}
      </div>

      {/* LAYER 2: Sharp Reveal Masked Layer */}
      <div 
        ref={sharpLayerRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          clipPath: `circle(140px at var(--cursor-x) var(--cursor-y))`,
          WebkitClipPath: `circle(140px at var(--cursor-x) var(--cursor-y))`
        }}
      >
        {renderContent(true)}
      </div>

      {/* Color Selector Controls (Bottom Center) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4 px-6 py-3 bg-zinc-950/80 border border-white/10 rounded-full backdrop-blur-md">
        {Object.keys(colorMap).map((color) => (
          <button
            key={color}
            onClick={() => setActiveColor(color)}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${activeColor === color ? 'border-white scale-125' : 'border-transparent scale-100 hover:scale-110'} cursor-pointer`}
            style={{ backgroundColor: colorMap[color] }}
            title={`Switch to ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

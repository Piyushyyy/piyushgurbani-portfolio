import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photoshoots = {
  jewellers: {
    brandName: "Geeta Shyam Jewellers",
    desc: "Luxury product photoshoot highlighting artisanal gold, emeralds, and fine diamonds.",
    images: [
      "/photoshoot_jewelry_1.jpg",
      "/photoshoot_jewelry_2.jpg",
      "/photoshoot_jewelry_3.jpg",
      "/photoshoot_jewelry_4.jpg",
      "/photoshoot_jewelry_5.jpg"
    ]
  },
  pills: {
    brandName: "For You Daily",
    desc: "Minimalist, wellness-focused photoshoot for a premium daily supplement brand.",
    images: [
      "/photoshoot_pill_5.jpg", // Water splash picture first
      "/photoshoot_pill_2.jpg",
      "/photoshoot_pill_3.jpg",
      "/photoshoot_pill_4.jpg",
      "/photoshoot_pill_1.jpg"  // Pill dropping picture fifth
    ]
  }
};

const ProductPhotoshoots = () => {
  const [activeTab, setActiveTab] = useState('jewellers');
  const [lightboxImage, setLightboxImage] = useState(null);

  const currentShoot = photoshoots[activeTab];

  // Refresh ScrollTrigger to solve height reflow and snapping alignment glitches
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-transparent text-zinc-900 min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950">
            Product Photoshoots
          </h2>
          <p className="text-sm text-zinc-500 font-medium font-sans mt-2 max-w-md mx-auto">
            Cinematic commercial photoshoots highlighting premium branding, detail lighting, and aesthetics.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center items-center gap-4 mb-16 relative z-10">
          <button
            onClick={() => setActiveTab('jewellers')}
            className={`px-5 py-2.5 rounded-full border text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
              activeTab === 'jewellers'
                ? 'bg-zinc-950 text-white border-zinc-950 scale-105'
                : 'bg-white/80 text-zinc-600 border-zinc-200 hover:text-zinc-950 hover:border-zinc-950 hover:bg-white'
            }`}
          >
            Geeta Shyam Jewellers
          </button>
          <button
            onClick={() => setActiveTab('pills')}
            className={`px-5 py-2.5 rounded-full border text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
              activeTab === 'pills'
                ? 'bg-zinc-950 text-white border-zinc-950 scale-105'
                : 'bg-white/80 text-zinc-600 border-zinc-200 hover:text-zinc-950 hover:border-zinc-950 hover:bg-white'
            }`}
          >
            For You Daily
          </button>
        </div>

        {/* Premium Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {/* Card 1: Large Focal Image (Col span 2, Row span 2) */}
          <div 
            onClick={() => setLightboxImage(currentShoot.images[0])}
            className="sm:col-span-2 sm:row-span-2 relative overflow-hidden rounded-3xl group shadow-lg cursor-pointer border border-zinc-200/50 bg-white"
          >
            <img 
              src={currentShoot.images[0]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
              alt={`${currentShoot.brandName} - Commercial luxury photoshoot by Piyush Gurbani`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-4 py-2 bg-white/90 text-zinc-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">View Fullscreen</span>
            </div>
          </div>

          {/* Card 2: Top Mid (Col span 1, Row span 1) */}
          <div 
            onClick={() => setLightboxImage(currentShoot.images[1])}
            className="relative overflow-hidden rounded-3xl group shadow-md cursor-pointer border border-zinc-200/50 bg-white"
          >
            <img 
              src={currentShoot.images[1]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
              alt={`${currentShoot.brandName} - Detailed product styling and lighting by Piyush Gurbani`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-3 py-1.5 bg-white/90 text-zinc-950 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md">View</span>
            </div>
          </div>

          {/* Card 3: Top Right (Col span 1, Row span 1) */}
          <div 
            onClick={() => setLightboxImage(currentShoot.images[2])}
            className="relative overflow-hidden rounded-3xl group shadow-md cursor-pointer border border-zinc-200/50 bg-white"
          >
            <img 
              src={currentShoot.images[2]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
              alt={`${currentShoot.brandName} - Studio lighting detail photograph by Piyush Gurbani`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-3 py-1.5 bg-white/90 text-zinc-950 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md">View</span>
            </div>
          </div>

          {/* Card 4: Bottom Mid (Col span 1, Row span 1) */}
          <div 
            onClick={() => setLightboxImage(currentShoot.images[3])}
            className="relative overflow-hidden rounded-3xl group shadow-md cursor-pointer border border-zinc-200/50 bg-white"
          >
            <img 
              src={currentShoot.images[3]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
              alt={`${currentShoot.brandName} - Angle close-up shot by Piyush Gurbani`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-3 py-1.5 bg-white/90 text-zinc-950 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md">View</span>
            </div>
          </div>

          {/* Card 5: Bottom Right (Col span 1, Row span 1) */}
          <div 
            onClick={() => setLightboxImage(currentShoot.images[4])}
            className="relative overflow-hidden rounded-3xl group shadow-md cursor-pointer border border-zinc-200/50 bg-white"
          >
            <img 
              src={currentShoot.images[4]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
              alt={`${currentShoot.brandName} - High resolution product showcase shot by Piyush Gurbani`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-3 py-1.5 bg-white/90 text-zinc-950 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md">View</span>
            </div>
          </div>
        </div>

        {/* Brand Meta Description */}
        <div className="text-center mt-12 bg-white/50 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-5 max-w-xl mx-auto">
          <h4 className="font-black uppercase text-sm text-zinc-900 tracking-tight mb-1">{currentShoot.brandName}</h4>
          <p className="text-xs text-zinc-500 font-sans font-medium">{currentShoot.desc}</p>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={lightboxImage} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none" 
            alt="Photoshoot Fullscreen"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};

export default ProductPhotoshoots;

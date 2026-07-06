import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reelsData = [
  {
    title: "aesthetic home promo",
    videoUrl: "https://res.cloudinary.com/djdbcvg6w/video/upload/v1783111157/Sample_Flat_Reel_l1nwwa.mp4"
  },
  {
    title: "luxury real estate tour",
    videoUrl: "https://res.cloudinary.com/djdbcvg6w/video/upload/v1783109158/real_estate_add_loo0k8.mp4"
  },
  {
    title: "artisanal jewelry shimmer",
    videoUrl: "https://res.cloudinary.com/djdbcvg6w/video/upload/v1783109142/jewllery_reel_sloggv.mp4"
  },
  {
    title: "personal brand lifestyle",
    videoUrl: "https://res.cloudinary.com/djdbcvg6w/video/upload/v1783109139/personal_1_dpshcd.mp4"
  },
  {
    title: "creative storytelling",
    videoUrl: "https://res.cloudinary.com/djdbcvg6w/video/upload/v1783111330/final_casandra_yvgotz.mp4"
  }
];

const PhoneVideoCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play checks on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="flex flex-col items-center select-none snap-center py-4">
      {/* iPhone Mockup Frame - Proportions sized to fit 5 side-by-side on desktop */}
      <div 
        className="relative w-[180px] h-[360px] sm:w-[200px] sm:h-[400px] md:w-[225px] md:h-[450px] rounded-[36px] bg-zinc-950 border-[5px] border-zinc-900 shadow-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:border-zinc-800"
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-zinc-900 rounded-full z-30 flex items-center justify-around px-1.5 shadow-inner">
          <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
          <div className="w-4 h-0.5 bg-zinc-950 rounded-full" />
        </div>

        {/* Video Element (object-cover to fill frame like standard phone reels) */}
        <video 
          ref={videoRef}
          src={reel.videoUrl}
          className="w-full h-full object-cover z-10"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />

        {/* Bottom Details Overlay - Top-aligned inside fixed height box to align texts across cards */}
        <div className="absolute bottom-0 left-0 w-full p-4 pb-6 pt-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-25 text-left flex flex-col justify-start h-[75px] md:h-[80px] pointer-events-none">
          <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight leading-tight line-clamp-2 h-[32px] md:h-[36px]">
            {reel.title}
          </h4>
        </div>

        {/* Sound Toggle Controller */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-30 w-7 h-7 rounded-full bg-zinc-900/70 backdrop-blur-md border border-white/10 hover:bg-zinc-800 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
        >
          {isMuted ? (
            <span className="text-[9px]">🔇</span>
          ) : (
            <span className="text-[9px]">🔊</span>
          )}
        </button>
      </div>
    </div>
  );
};

const VideoProjects = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-transparent text-zinc-900 min-h-screen flex flex-col justify-center pt-36 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Simplified Centered Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950">
            My Editing Work
          </h2>
          <p className="text-sm text-zinc-500 font-medium font-sans mt-2 max-w-xl mx-auto">
            Cinematic edits and vertical video content produced and edited for premium real estate, product showcases, and digital creators.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full group">
          
          {/* Left Arrow Button (Visible only on mobile/tablet when scrolling is needed) */}
          <button 
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-zinc-200 bg-white/90 hover:bg-white text-zinc-900 flex lg:hidden items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-950" />
          </button>

          {/* Right Arrow Button (Visible only on mobile/tablet when scrolling is needed) */}
          <button 
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-zinc-200 bg-white/90 hover:bg-white text-zinc-900 flex lg:hidden items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5 text-zinc-950" />
          </button>

          {/* Carousel Wrapper - Flex-scroll on mobile, Flex-wrap center on desktop */}
          <div 
            ref={scrollRef}
            className="flex w-full overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none scrollbar-none gap-4 lg:gap-6 pb-4 scroll-smooth px-6 lg:px-0 lg:flex-nowrap lg:justify-center z-10"
          >
            {reelsData.map((reel, idx) => (
              <PhoneVideoCard key={idx} reel={reel} />
            ))}
          </div>

        </div>

        {/* Scroll Helper Hint (Visible only on mobile/tablet) */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 text-zinc-400 text-[10px] font-mono uppercase tracking-widest mt-6 pointer-events-none">
          <span>← Swipe or use arrows to browse →</span>
        </div>

      </div>
    </section>
  );
};

export default VideoProjects;

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink } from 'lucide-react';

const reelsData = [
  {
    title: "aesthetic home tour",
    videoSrc: "/videos/reel_home_tour.mp4",
    youtubeUrl: "https://youtube.com/shorts/J4fSlQm23zI?feature=share"
  },
  {
    title: "luxury real estate tour",
    videoSrc: "/videos/reel_real_estate.mp4",
    youtubeUrl: "https://youtube.com/shorts/e27kuaUFwgQ?feature=share"
  },
  {
    title: "artisanal jewelry shimmer",
    videoSrc: "/videos/reel_jewelry.mp4",
    youtubeUrl: "https://youtube.com/shorts/H_-eT5XBOEA?feature=share"
  },
  {
    title: "personal brand lifestyle",
    videoSrc: "/videos/reel_personal_brand.mp4",
    youtubeUrl: "https://youtube.com/shorts/jyXnvgRoReg?feature=share"
  },
  {
    title: "event montages",
    videoSrc: "/videos/reel_event_montages.mp4",
    youtubeUrl: "https://youtube.com/shorts/oqEWmdjswFA?feature=share"
  }
];

const PhoneVideoCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play automatically on mount and keep playing in loop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback if browser policies restrict immediate autoplay
      });
    }
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="flex flex-col items-center select-none snap-center py-4">
      {/* iPhone Mockup Frame */}
      <div 
        className="relative w-[180px] h-[360px] sm:w-[200px] sm:h-[400px] md:w-[225px] md:h-[450px] rounded-[36px] bg-zinc-950 border-[5px] border-zinc-900 shadow-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:border-zinc-800"
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-zinc-900 rounded-full z-30 flex items-center justify-around px-1.5 shadow-inner pointer-events-none">
          <div className="w-0.5 h-0.5 rounded-full bg-zinc-800" />
          <div className="w-4 h-0.5 bg-zinc-950 rounded-full" />
        </div>

        {/* Native 9:16 Video Player with Pure Edge-to-Edge Fill (Zero YouTube logos/watermarks) */}
        <video 
          ref={videoRef}
          src={reel.videoSrc}
          className="w-full h-full object-cover z-10"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
        />

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 pb-6 pt-10 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-25 text-left flex flex-col justify-start h-[75px] md:h-[80px] pointer-events-none">
          <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight leading-tight line-clamp-2">
            {reel.title}
          </h4>
        </div>

        {/* Mute / Unmute Audio Toggle Controller */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? `Unmute audio for ${reel.title}` : `Mute audio for ${reel.title}`}
          title={isMuted ? "Tap to unmute" : "Tap to mute"}
          className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/15 hover:bg-zinc-800 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-zinc-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-yellow-400 animate-pulse" />
          )}
        </button>

        {/* Watch on YouTube direct link */}
        <a 
          href={reel.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${reel.title} on YouTube`}
          title="Watch original on YouTube"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/15 hover:bg-red-600 hover:border-red-500 text-white flex items-center justify-center transition-all shadow-md group/yt cursor-pointer hover:scale-105 active:scale-95"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
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

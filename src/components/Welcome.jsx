import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(ScrollTrigger);

const Welcome = ({ testimonials }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const introOverlayRef = useRef(null);

  useGSAP(() => {
    // ScrollTrigger timeline that spans the 200vh height
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1
      }
    });

    // 1. Text reveal & scaling in Screen 1
    tl.fromTo(titleRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 0.9, duration: 1.5, ease: 'power2.out' }
    );

    tl.fromTo(subtitleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 0.8, duration: 1, ease: 'power2.out' },
      '-=1'
    );

    // 2. Seamless transition to Screen 2 (Testimonials marquee)
    tl.to(introOverlayRef.current, {
      opacity: 0,
      y: -100,
      duration: 1.5,
      ease: 'power3.inOut'
    });

    // Fade in testimonial header and cards
    tl.fromTo('.testimonial-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    tl.fromTo('.marquee-container',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      '-=0.5'
    );
  }, { scope: containerRef });

  // Helper to split testimonials into two rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, midPoint);
  const secondRow = testimonials.slice(midPoint);

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const renderCard = (card, idx) => (
    <div 
      key={idx}
      className="flex-shrink-0 w-80 md:w-96 p-6 mx-4 rounded-3xl bg-white/70 border border-zinc-200/50 shadow-lg shadow-zinc-100/10 hover:shadow-xl hover:shadow-zinc-200/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md select-none text-left"
    >
      <div className="flex items-center gap-3 mb-4">
        {/* Circular badge with initials */}
        <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center font-black text-xs uppercase tracking-wider border-2 border-yellow-500 flex-shrink-0">
          {getInitials(card.name)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-black text-sm text-zinc-950 uppercase tracking-tight whitespace-normal">{card.name}</h4>
          </div>
          <p className="text-xs text-zinc-500 font-medium whitespace-normal">{card.role}</p>
        </div>
      </div>
      <p className="text-xs md:text-sm text-zinc-700 leading-relaxed font-sans font-medium whitespace-normal">
        "{card.message}"
      </p>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[200vh] bg-gradient-to-b from-zinc-950 via-zinc-100 to-zinc-200 text-zinc-950 overflow-hidden"
    >
      {/* Subtle Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />

      {/* Decorative Background Blobs for Screen 2 to fill empty corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[60%] -right-48 w-[400px] h-[400px] rounded-full bg-orange-400/10 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-48 w-[400px] h-[400px] rounded-full bg-yellow-400/10 blur-[120px]" />
      </div>

      {/* Screen 1: Welcome Reveal (Centered inside first viewport) */}
      <div 
        ref={introOverlayRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center px-6 pointer-events-none z-10"
      >
        <h2 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-[10vw] font-black uppercase tracking-tight leading-none text-zinc-950 select-none"
        >
          WELCOME
        </h2>
        <p 
          ref={subtitleRef}
          className="text-sm md:text-xl font-bold uppercase tracking-[0.4em] text-zinc-600 mt-4"
        >
          To my creative space
        </p>
      </div>

      {/* Screen 2: Testimonials Showcase (Appears as screen 1 fades out) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center py-16 z-10">
        
        {/* Header */}
        <div className="testimonial-header text-center mb-12 px-6">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-2 block">
            Client Love
          </span>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-zinc-950">
            What people are saying
          </h3>
        </div>

        {/* Marquee Rows Container - Edge-to-Edge full width */}
        <div className="marquee-container w-full flex flex-col gap-6 overflow-hidden py-4">
          
          {/* Row 1: Left movement */}
          <div className="relative w-full overflow-hidden flex py-2">
            <div className="flex animate-marquee-left whitespace-nowrap">
              {firstRow.map((card, idx) => renderCard(card, `r1-${idx}`))}
              {/* Duplicate for infinite loop */}
              {firstRow.map((card, idx) => renderCard(card, `r1-dup-${idx}`))}
            </div>
            {/* Fade overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-100 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-100 to-transparent pointer-events-none z-10" />
          </div>

          {/* Row 2: Right movement */}
          <div className="relative w-full overflow-hidden flex py-2">
            <div className="flex animate-marquee-right whitespace-nowrap">
              {secondRow.map((card, idx) => renderCard(card, `r2-${idx}`))}
              {/* Duplicate for infinite loop */}
              {secondRow.map((card, idx) => renderCard(card, `r2-dup-${idx}`))}
            </div>
            {/* Fade overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-100 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-100 to-transparent pointer-events-none z-10" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Welcome;

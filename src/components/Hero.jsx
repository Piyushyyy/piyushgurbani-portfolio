import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, StarHalf, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const roles = ["Creative Developer", "Freelancer", "Video Editor", "AI Specialist"];

const Hero = ({ onHireMeClick }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  
  const heroRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);
  const photoRef = useRef(null);
  const roleTextRef = useRef(null);

  // Roles switcher logic with GSAP slide-and-fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(roleTextRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.35,
        onComplete: () => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          gsap.set(roleTextRef.current, { y: 15 });
          gsap.to(roleTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // 1. Scroll-triggered Parallax movements
    gsap.to(leftColRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: -60,
      opacity: 0.2,
      ease: 'none'
    });

    gsap.to(centerColRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 50,
      ease: 'none'
    });

    gsap.to(rightColRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: -60,
      opacity: 0.2,
      ease: 'none'
    });

    // 2. Buttery Smooth Idle Floating Animation for the Portrait Photo Cutout
    gsap.to(photoRef.current, {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

  }, { scope: heroRef });

  const handleScrollTo = (id) => {
    const targetElement = document.getElementById(id.toLowerCase());
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home"
      className="relative h-screen min-h-[780px] w-full bg-white text-zinc-950 flex items-center justify-center px-6 md:px-16 pt-24 pb-20 overflow-hidden z-10"
    >
      {/* Background soft grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 h-full">
        
        {/* LEFT COLUMN: Premium Minimalist Quote (No Box/Borders - Aligned higher) */}
        <div ref={leftColRef} className="hidden lg:flex lg:col-span-3 flex-col text-left items-start gap-4 self-center lg:-translate-y-6 lg:pl-4 z-20">
          <span className="text-4xl font-serif text-[#f97316] select-none">“</span>
          <p className="text-sm text-zinc-700 leading-relaxed font-sans font-semibold max-w-xs -mt-2">
            Piyush's exceptional development ensures our website's success. Highly Recommended.
          </p>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Collaboration Partner</span>
        </div>

        {/* CENTER COLUMN: Centered Title, Hello Badge & Animated Capsule Photo */}
        <div ref={centerColRef} className="lg:col-span-6 flex flex-col items-center justify-center text-center relative self-center">
          
          {/* Centered Title & Hello Badge container (Positioned normally with tiny overlap -mb-4) */}
          <div className="relative z-0 -mb-4 w-full flex flex-col items-center">
            
            {/* Centered Hello Badge */}
            <div className="inline-flex items-center gap-1 px-4 py-1 border border-zinc-300 rounded-full mb-4 bg-stone-50 select-none shadow-sm relative">
              <span className="text-xs font-bold text-zinc-800">Hello!</span>
              {/* Orange hand-drawn squiggle effect ornament */}
              <span className="absolute -top-2 -right-3 text-sm text-[#f97316] font-bold rotate-12">🗲</span>
            </div>

            {/* Symmetrical Heading with Doodles */}
            <div className="relative w-full max-w-2xl flex justify-center">
              {/* Left Doodle SVG */}
              <svg 
                className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-12 h-12 text-[#f97316]/85 hidden lg:block select-none pointer-events-none" 
                viewBox="0 0 50 50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              >
                <path d="M10,40 C15,25 25,15 40,10" />
                <path d="M5,25 C10,15 20,10 30,5" />
                <path d="M20,45 C25,35 35,30 45,25" />
              </svg>

              <h1 className="text-4xl md:text-6xl lg:text-[3.2vw] font-black uppercase tracking-tight text-zinc-900 leading-[0.9] text-center w-full px-4">
                <span className="block text-zinc-400 text-xs font-bold tracking-widest mb-1">FREELANCE STRATEGIST &amp; DEVELOPER</span>
                <span className="text-zinc-950">I'm </span>
                <span className="text-[#f97316]">Piyush Gurbani,</span>
                {/* Swapping Role Container */}
                <span className="block h-10 md:h-12 overflow-hidden relative mt-1 select-none">
                  <span ref={roleTextRef} className="block text-zinc-950 text-3xl md:text-5xl lg:text-[2.6vw] font-black uppercase tracking-tight">
                    {roles[roleIndex]}
                  </span>
                </span>
              </h1>

              {/* Right Doodle SVG */}
              <svg 
                className="absolute -right-12 top-1/3 w-12 h-12 text-[#f97316]/85 hidden lg:block select-none pointer-events-none" 
                viewBox="0 0 50 50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              >
                <path d="M10,10 C25,15 35,25 40,40" />
                <path d="M25,5 C35,10 40,20 45,30" />
                <path d="M5,20 C15,25 20,35 25,45" />
              </svg>
            </div>

          </div>

          {/* Symmetrical Portrait & Wide Orange Backdrop Arch (z-10 to overlay name slightly) */}
          <div className="relative flex items-center justify-center select-none z-10 w-full">
            
            {/* 1. Large Orange Backdrop Arch (Giant circle shifted down for wide circular curve, custom brand orange) */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] md:w-[460px] md:h-[460px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#ff8637] z-0 shadow-lg shadow-[#ff8637]/25" />

            {/* 2. Floating Transparent Portrait (No card container, no background capsule borders!) */}
            <div 
              ref={photoRef}
              className="relative w-[280px] h-[300px] sm:w-[320px] sm:h-[340px] md:w-[420px] md:h-[440px] lg:w-[460px] lg:h-[480px] z-10 flex items-end justify-center pointer-events-none"
            >
              <img 
                src="/piyush_portrait.png" 
                alt="Piyush Gurbani - Creative Developer, Marketing Strategist and Video Editor" 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.3)] scale-[1.1] origin-bottom"
              />
            </div>

            {/* 3. Bottom Glass Pill Button Overlay (Portfolio / Hire me - Shifted up to bottom-2 to prevent cropping) */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex items-center p-1 bg-white/10 border border-white/20 rounded-full shadow-2xl backdrop-blur-md">
              <button
                onClick={() => handleScrollTo('Portfolio')}
                aria-label="Scroll to Portfolio section"
                className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-md shadow-[#f97316]/20 transition-all duration-300 active:scale-[0.96] cursor-pointer whitespace-nowrap"
              >
                Portfolio ↗
              </button>
              <button
                onClick={onHireMeClick}
                aria-label="Hire Piyush Gurbani"
                className="px-6 py-3 text-white font-black text-xs uppercase tracking-widest hover:text-[#f97316] transition-all duration-300 active:scale-[0.96] cursor-pointer whitespace-nowrap"
              >
                Hire me
              </button>
            </div>

          </div>

          {/* Mobile-Only Stats & Rating Row */}
          <div className="flex lg:hidden items-center justify-center gap-6 mt-8 border-t border-zinc-200 pt-6 w-full px-4 select-none">
            {/* Rating */}
            <div className="flex flex-col items-center text-center">
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f97316] text-[#f97316]" />
                ))}
                <StarHalf className="w-3.5 h-3.5 fill-[#f97316] text-[#f97316]" />
              </div>
              <h4 className="text-[10px] font-black uppercase text-zinc-900 tracking-tight leading-none mb-0.5">4.7 Star Rating</h4>
              <p className="text-[9px] text-zinc-400 font-medium font-sans">Highly optimized web engineering</p>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-10 bg-zinc-200" />

            {/* Experience */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-5 h-5 rounded bg-[#f97316]/10 text-[#f97316] flex items-center justify-center border border-[#f97316]/20">
                  <Briefcase className="w-3 h-3" />
                </div>
                <h4 className="text-sm font-black text-zinc-900 tracking-tight leading-none">3+ Years</h4>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">Experience</p>
              <p className="text-[9px] text-zinc-400 font-medium font-sans">Immersive frontend frameworks</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 4.7 Rating & 3+ Years Stats (Aligned higher) */}
        <div ref={rightColRef} className="hidden lg:flex lg:col-span-3 flex-col items-start lg:items-end justify-center gap-8 text-left lg:text-right self-center lg:-translate-y-6 lg:pr-4 z-20">
          
          {/* Rating Badge */}
          <div className="flex flex-col items-start lg:items-end">
            {/* 4.7 Stars */}
            <div className="flex gap-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#f97316] text-[#f97316]" />
              ))}
              <StarHalf className="w-5 h-5 fill-[#f97316] text-[#f97316]" />
            </div>
            <h4 className="text-lg font-black uppercase text-zinc-900 tracking-tight leading-none mb-1">4.7 Star Rating</h4>
            <p className="text-xs text-zinc-400 font-medium font-sans">Delivering highly optimized web engineering</p>
          </div>

          {/* Stats Card */}
          <div className="flex flex-col items-start lg:items-end border-t border-zinc-200 pt-6 w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-2 lg:flex-row-reverse">
              <div className="w-8 h-8 rounded-xl bg-[#f97316]/10 text-[#f97316] flex items-center justify-center border border-[#f97316]/20">
                <Briefcase className="w-4 h-4" />
              </div>
              <h4 className="text-2xl font-black text-zinc-900 tracking-tight leading-none">3+ Years</h4>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Experience</p>
            <p className="text-xs text-zinc-400 font-medium font-sans">Building immersive front-end frameworks</p>
          </div>

        </div>

      </div>

      {/* Arched Section Curve at Bottom (Peaks UPWARDS into the white landing page - Taller for visibility) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[90px] text-[#09090b] fill-current"
        >
          <path d="M0,120 C300,10 900,10 1200,120 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

    </section>
  );
};

export default Hero;

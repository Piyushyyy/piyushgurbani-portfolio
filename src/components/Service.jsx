import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Palette, Megaphone, Monitor, Smartphone, Layout, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    title: "Branding",
    tag: "Design System",
    color: "#092212", // Distinct dark forest green
    icon: Palette,
    packages: [
      { name: "Starter", features: ["Logo (2 concepts)", "Color palette", "Typography guide", "Brand strategy brief"] },
      { name: "Brand Identity", features: ["Logo (3 concepts)", "Extended palette", "Brand patterns & assets", "3 custom mockups", "Guidelines PDF"], popular: true },
      { name: "Brand Premium", features: ["Full responsive logo system", "Mascot or custom icon set", "6 custom mockups", "Complete guidelines PDF", "30-day content starter plan"] }
    ]
  },
  {
    title: "Marketing & Content",
    tag: "Growth",
    color: "#251710", // Distinct dark rust/brown
    icon: Megaphone,
    packages: [
      { name: "Content Starter", features: ["3 custom product photoshoots", "3 designed carousel posts", "Captions + hashtags copy"] },
      { name: "Growth Pack", features: ["6 custom product photoshoots", "6 designed carousels", "2 premium reels edited", "Captions & campaign copy"], popular: true },
      { name: "Brand Campaign", features: ["12 product photoshoots", "12 designed carousels", "4 premium reels edited", "Ad copy & UGC scripts", "15-day content calendar"] }
    ]
  },
  {
    title: "Website",
    tag: "Web Tech",
    color: "#08122c", // Distinct dark navy blue
    icon: Monitor,
    packages: [
      { name: "Landing Page", features: ["Custom 1-page design/dev", "Mobile responsive styling", "Basic SEO setup", "Interactive contact form"] },
      { name: "Multi-Page Website", features: ["Up to 5 pages custom dev", "Full SEO optimization", "Interactive GSAP animations", "Professional copywriting"], popular: true },
      { name: "3D Premium", features: ["Up to 7 pages custom dev", "Spline 3D element integration", "Advanced micro-interactions", "SEO + performance audit"] }
    ]
  },
  {
    title: "Social Media Setup",
    tag: "Social Launch",
    color: "#230c11", // Distinct dark burgundy red
    icon: Smartphone,
    packages: [
      { name: "Basic Setup", features: ["1 platform setup", "Bio copywriting", "Profile & cover design", "5 highlight covers"] },
      { name: "Full Profile Launch", features: ["1 platform setup", "8 highlight covers", "First 9 posts designed", "Captions & hashtags", "Content calendar"], popular: true },
      { name: "Multi-Platform Presence", features: ["3 platforms setup", "15-day content starter plan", "Posting schedule & strategy"] }
    ]
  },
  {
    title: "Mockups",
    tag: "Asset Mockups",
    color: "#202008", // Distinct dark olive gold
    icon: Layout,
    packages: [
      { name: "Starter Mockups", features: ["Standard product mockups", "Apparel mockup templates", "Digital screen presentations"] },
      { name: "Brand Mockup Kit", features: ["Customized social mockups", "Web presentation mockups", "Physical branding mockups"], popular: true },
      { name: "Premium Mockup Set", features: ["High-end 3D product renders", "Custom packaging mockups", "Bespoke product presentations"] }
    ]
  },
  {
    title: "Agentic AI",
    tag: "Autonomous",
    color: "#121216", // Distinct dark zinc gray
    icon: Cpu,
    packages: [
      { name: "Coming Soon...", features: ["Custom AI agent setups", "Autonomous task workflows", "Automated pipeline integration", "Self-improving cognitive systems"] }
    ]
  }
];

const Service = () => {
  const serviceSectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Desktop 3D curved ScrollTrigger
  useGSAP(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const radius = 850; // Curve radius
    const spacing = 0.42; // Radians angle gap

    const updateCardsPosition = (activeProgress) => {
      const activeIdx = Math.max(0, Math.min(cardsData.length - 1, Math.round(activeProgress)));
      const activeColor = cardsData[activeIdx].color;

      // Transition section background to active card color
      gsap.to(serviceSectionRef.current, {
        backgroundColor: activeColor,
        duration: 0.6,
        ease: 'power2.out'
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const offset = i - activeProgress;
        const angle = offset * spacing;

        const x = Math.sin(angle) * radius;
        const y = radius - Math.cos(angle) * radius;
        const z = -Math.abs(offset) * 110;
        const rotZ = angle * (180 / Math.PI);
        const scale = 1 - Math.abs(offset) * 0.14;
        const opacity = 1 - Math.abs(offset) * 0.3;

        gsap.set(card, {
          x: x,
          y: y,
          z: z,
          rotationZ: rotZ,
          scale: scale,
          opacity: Math.max(0, opacity),
          zIndex: 100 - Math.round(Math.abs(offset) * 10)
        });
      });
    };

    // Pin section and scrub through indices 0 to 5
    ScrollTrigger.create({
      trigger: serviceSectionRef.current,
      start: 'top top',
      end: '+=350%',
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        updateCardsPosition(self.progress * (cardsData.length - 1));
      }
    });

    // Set initial position
    updateCardsPosition(0);

  }, { scope: serviceSectionRef });

  return (
    <div
      ref={serviceSectionRef}
      id="service"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden z-10 transition-colors duration-1000 bg-[#0c0c0e] py-20"
    >
      {/* Background Watermark */}
      <h2 
        className="absolute text-[18vw] font-black uppercase tracking-tighter leading-none text-zinc-900/40 pointer-events-none select-none z-0"
        style={{ mixBlendMode: 'overlay' }}
      >
        SERVICES
      </h2>

      {/* Title */}
      <div className="absolute top-16 text-center z-20 px-6">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400 block mb-2">Capabilities</span>
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">What I Deliver</h3>
      </div>

      {/* ================= DESKTOP VIEW: 3D Curve Carousel ================= */}
      <div className="hidden lg:flex relative w-full h-[660px] items-center justify-center perspective-container z-10 mt-16">
        {cardsData.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className="absolute w-[420px] h-[600px] rounded-[32px] p-7 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between text-left select-none group"
              style={{ 
                backgroundColor: 'rgba(20, 20, 22, 0.88)', // Increased opacity to pop text & reduce HMR blur
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translate3d(0,0,0)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              {/* Card Front Content */}
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center border border-yellow-400/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                      {card.tag}
                    </span>
                    <h4 className="text-xl font-black uppercase text-white tracking-tight leading-tight">
                      {card.title}
                    </h4>
                  </div>
                </div>
                
                {/* Structured Packages Boxes with Bulleted Features */}
                <div className="space-y-3.5 mt-4">
                  {card.packages.map((pkg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                        pkg.popular 
                          ? 'border-yellow-400/40 bg-yellow-400/5 hover:bg-yellow-400/10 shadow-lg shadow-yellow-400/5' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-xs md:text-sm font-bold uppercase tracking-wider ${
                          pkg.popular ? 'text-yellow-400' : 'text-zinc-100'
                        }`}>
                          {pkg.name}
                        </span>
                        {pkg.popular && (
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-yellow-400 text-zinc-950 rounded-full leading-none">
                            Popular
                          </span>
                        )}
                      </div>
                      
                      {/* Features list (Thicker font weight & high contrast for crispness) */}
                      <ul className="space-y-1">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-[11px] md:text-xs text-zinc-200 font-sans font-medium flex items-start gap-1.5 leading-tight">
                            <span className="text-yellow-400/70 mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card bottom branding */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">SERVICE_INDEX_0{i+1}</span>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MOBILE & TABLET VIEW: Symmetrical Responsive Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden w-full max-w-5xl px-6 py-8 gap-8 z-10 mt-28 justify-center">
        {cardsData.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="w-full max-w-[380px] mx-auto rounded-[28px] p-6 bg-zinc-900/80 border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-between text-left"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center border border-yellow-400/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block leading-none mb-1">
                      {card.tag}
                    </span>
                    <h4 className="text-base font-black uppercase text-white tracking-tight leading-none">
                      {card.title}
                    </h4>
                  </div>
                </div>
                
                {/* Structured Packages with Bulleted Features */}
                <div className="space-y-3 mt-3">
                  {card.packages.map((pkg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border ${
                        pkg.popular 
                          ? 'border-yellow-400/30 bg-yellow-400/5' 
                          : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          pkg.popular ? 'text-yellow-400' : 'text-zinc-100'
                        }`}>
                          {pkg.name}
                        </span>
                        {pkg.popular && (
                          <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-yellow-400 text-zinc-950 rounded-full leading-none">
                            Popular
                          </span>
                        )}
                      </div>
                      
                      {/* Features list */}
                      <ul className="space-y-0.5">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-[10px] text-zinc-200 font-sans font-medium flex items-start gap-1 leading-tight">
                            <span className="text-yellow-400/60 mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4">
                <span className="text-[9px] font-mono text-zinc-500">0{i+1} / 06</span>
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;

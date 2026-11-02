import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';


// Components
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import VideoProjects from './components/VideoProjects';
import ProductPhotoshoots from './components/ProductPhotoshoots';
import Service from './components/Service';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  // Global testimonials state (enables Navbar feedback modal submission to update the Welcome marquee dynamically)
  const testimonials = [
    {
      name: "Aditya Verma",
      role: "Tech Lead @ Freshkart",
      message: "Bhai, what a website Piyush made for us! The animations are super smooth and it loads in a blink. Highly recommended!"
    },
    {
      name: "Vikram Malhotra",
      role: "Manager @ Local Boutique",
      message: "Super happy with the landing page Piyush built. Pixel-perfect layout, super fast responses, and he finished everything ahead of schedule!"
    },
    {
      name: "Rohan Mehta",
      role: "Founder @ Decrypt Solutions",
      message: "Piyush saved us so much time. He rebuilt our entire marketing page, and now it loads 2x faster. The animations look very premium!"
    },
    {
      name: "Ananya Iyer",
      role: "Digital Lead @ Aura Crafts",
      message: "Piyush is brilliant at both design and code. Our new site looks modern and clean, and working with him was a breeze!"
    },
    {
      name: "Priya Sharma",
      role: "UI Designer @ TechSeva",
      message: "Piyush has a great eye for detail. The mobile layout and transitions are absolutely flawless. Truly loved working with him!"
    },
    {
      name: "Suresh Patel",
      role: "Co-Founder @ Zenith Web Studio",
      message: "Solid frontend developer! He fixed all our performance lags and made the scroll feel buttery smooth. Will definitely hire him again."
    },
    {
      name: "Neha Gupta",
      role: "Owner @ StyleCurry Boutique",
      message: "I am amazed by Piyush's work! He redesigned our store showcase with gorgeous interactive elements. The feedback from our customers has been fantastic."
    },
    {
      name: "Rajesh Singhania",
      role: "Manager @ Veloce Labs",
      message: "The 3D cards and smooth scrolling feel absolutely magic. He gave our portfolio a top-tier premium look. Super job!"
    }
  ];



  // Smooth Scroll and Animation Libraries Initialization
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with exact parameters
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to the GSAP Ticker loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for tight ScrollTrigger sync
    gsap.ticker.lagSmoothing(0);



    // Cleanup loops on unmount
    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(ScrollTrigger.update);
    };
  }, []);

  // High-performance scroll spy synced with GSAP ScrollTriggers in App.jsx
  useGSAP(() => {
    const sections = [
      { id: 'home', item: 'Home' },
      { id: 'portfolio', item: 'Project' },
      { id: 'service', item: 'Service' },
      { id: 'about', item: 'About' },
      { id: 'contact', item: 'Contact' }
    ];

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(sec.item);
            }
          }
        });
      }
    });
  });

  // Shared watermark ScrollTrigger animation
  useGSAP(() => {
    gsap.fromTo("#shared-watermark",
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#shared-work-wrapper",
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
          scrub: 0.5
        },
        opacity: 1,
        ease: "none"
      }
    );
  });

  return (
    <div className="relative w-full text-white bg-zinc-950 selection-yellow overflow-x-hidden min-h-screen">
      {/* Global Grain / Noise Overlay */}
      <div className="noise-overlay" />

      <Navbar activeSection={activeSection} />

      {/* FIXED BACKGROUND HERO PORTFOLIO SCANNER */}
      <Portfolio />

      {/* SCROLLING OVERLAY CONTENT (Rises over fixed portfolio element) */}
      <main id="main-content" className="relative w-full z-10">
        
        {/* 1. Hero Content Overlay */}
        <Hero onHireMeClick={() => setIsLeadModalOpen(true)} />

        {/* 2. Welcome & Testimonial Marquees (White Section) */}
        <Welcome testimonials={testimonials} />

        {/* SHARED WORK WRAPPER (Shares background and a single fixed watermark) */}
        <div id="shared-work-wrapper" className="relative w-full bg-[#f7f6f2] overflow-hidden">
          {/* Shared Fixed Watermark */}
          <h2 
            id="shared-watermark" 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-black uppercase tracking-tighter leading-none text-zinc-300/85 select-none pointer-events-none z-0 opacity-0"
          >
            My Work
          </h2>
          
          <Projects />
          <VideoProjects />
          <ProductPhotoshoots />
        </div>

        {/* 4. Services 3D Curve Carousel (Dynamic Color Changing Section) */}
        <Service />

        {/* About Me Section (Introduction, Experience, Why Hire Me) */}
        <About />

        {/* 5. Contact Form Section (Dark minimal Section) */}
        <Contact />

        {/* 6. Footer (Luxury Yellow Section) */}
        <Footer />
        
      </main>

      {/* Global Lead Form Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <LeadForm inline={false} onClose={() => setIsLeadModalOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default App;

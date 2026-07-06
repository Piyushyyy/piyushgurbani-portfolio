import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, FolderOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Potpourri",
    category: "Brand Platform",
    image: "/project_potpourri.png",
    desc: "An exclusive online platform designed to showcase Indian local brands, providing a premium space to promote homegrown businesses.",
    link: "https://www.potpourri.co.in/"
  },
  {
    title: "HireLens AI",
    category: "AI Recruitment",
    image: "/project_hirelens.png",
    desc: "Intelligent resume analysis tool evaluating profiles against roles for ATS scores, keyword insights, and actionable suggestions.",
    link: "https://github.com/Piyushyyy/HireLens-AI"
  },
  {
    title: "Gender & Age Detection",
    category: "Computer Vision",
    image: "/project_gender_age.png",
    desc: "Computer vision application that detects faces and estimates gender/age in real time using deep learning neural networks.",
    link: "https://github.com/Piyushyyy/Gender-Age-Detection-System"
  },
  {
    title: "Stock Price Prediction",
    category: "Machine Learning",
    image: "/project_stock_predict.png",
    desc: "Predictive model that analyzes historical stock market data to forecast future price trends using machine learning algorithms.",
    link: "https://github.com/Piyushyyy/Stock-Price-Prediction-Model"
  },
  {
    title: "Bank Management System",
    category: "Software Simulation",
    image: "/project_bank_manage.png",
    desc: "Digital banking simulator covering core operations like account creation, deposits, withdrawals, and transactions tracking.",
    link: "https://github.com/Piyushyyy/Bank-Management"
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    // 3D Folder Explosion is desktop-only (lg screens)
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    // Pin timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1
      }
    });

    // 1. Rotate Folder Front Flap Open (rotationX around bottom center hinge)
    tl.to(folderFrontRef.current, {
      rotateX: -125,
      duration: 1,
      ease: 'power3.inOut'
    });

    // 2. Rise & Spread Cards (positions relative to folder center)
    const positions = [
      { x: -360, y: -200, rotate: -8, scale: 0.95 },
      { x: 0, y: -250, rotate: 2, scale: 1 },
      { x: 360, y: -200, rotate: 8, scale: 0.95 },
      { x: -290, y: 150, rotate: -6, scale: 0.95 },
      { x: 290, y: 150, rotate: 6, scale: 0.95 }
    ];

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      tl.to(card, {
        x: positions[idx].x,
        y: positions[idx].y,
        rotation: positions[idx].rotate,
        scale: positions[idx].scale,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 1.5,
        ease: 'back.out(1.1)'
      }, '-=0.8');
    });

    // 3. Subtle floating loop once folder is open
    tl.add(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        gsap.to(card, {
          y: `+=10`,
          duration: 2.5 + idx * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    });

  }, { scope: sectionRef });

  return (
    <div 
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen w-full bg-transparent text-zinc-900 overflow-hidden flex flex-col justify-center items-center py-20"
      style={{ perspective: '2000px' }}
    >

      {/* Ambient yellow glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none z-0" />

      {/* ================= DESKTOP VIEW: 3D Folder Explosion ================= */}
      <div className="hidden lg:flex relative w-full h-[680px] items-center justify-center z-10">
        
        {/* Project Cards (Stacked inside the folder by default) */}
        <div ref={cardsContainerRef} className="absolute w-[240px] h-[320px] flex items-center justify-center">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              ref={el => cardRefs.current[idx] = el}
              onClick={() => window.open(project.link, '_blank')}
              className="absolute w-[240px] h-[320px] bg-white rounded-3xl p-4 shadow-2xl border border-zinc-200/50 backdrop-blur-md opacity-0 pointer-events-none flex flex-col justify-between group hover:-translate-y-4 hover:shadow-yellow-400/10 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
              style={{ transform: 'translate(0px, 40px) scale(0.85)' }}
            >
              {/* Project Image */}
              <div className="w-full h-36 rounded-2xl overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* Text */}
              <div className="text-left mt-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 block mb-1">
                  {project.category}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight text-zinc-950 leading-none mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-500 font-medium leading-normal">
                  {project.desc}
                </p>
              </div>
              {/* Button */}
              <div className="w-full py-2.5 bg-zinc-950 group-hover:bg-yellow-400 group-hover:text-zinc-950 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5">
                Explore Project
              </div>
            </div>
          ))}
        </div>

        {/* 3D Archive Folder */}
        <div 
          className="absolute w-[340px] h-[240px] transform-style-preserve-3d flex items-end justify-center pointer-events-none"
          style={{ transform: 'translateY(120px)' }}
        >
          {/* 1. Folder Back */}
          <div className="absolute inset-0 bg-yellow-400 rounded-3xl shadow-lg border border-yellow-300 flex items-center justify-center overflow-hidden z-0">
            {/* Subtle paper grain texture inside folder */}
            <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
            <FolderOpen className="w-12 h-12 text-yellow-600 opacity-20" />
          </div>

          {/* 2. Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute inset-0 bg-yellow-500 border border-yellow-400 rounded-3xl shadow-inner shadow-black/10 origin-bottom flex flex-col justify-end p-6 z-20"
            style={{ transform: 'rotateX(0deg)' }}
          >
            <div className="flex justify-between items-center text-left">
              <div>
                <h4 className="text-zinc-950 font-black text-sm uppercase tracking-wider">PROJECTS</h4>
                <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest">ARCHIVE_v2.0</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-950/10 flex items-center justify-center font-bold text-xs text-zinc-950 border border-zinc-950/20">
                {projectsData.length.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MOBILE & TABLET VIEW: Symmetrical Responsive Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden w-full max-w-5xl px-6 py-8 gap-8 z-10 justify-center">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            onClick={() => window.open(project.link, '_blank')}
            className={`bg-white rounded-3xl p-5 shadow-xl flex flex-col justify-between border border-zinc-200/50 cursor-pointer group hover:-translate-y-2 hover:shadow-yellow-400/10 hover:border-yellow-400 transition-all duration-300 ${
              idx === 4 ? 'sm:col-span-2 sm:max-w-md sm:mx-auto w-full' : 'w-full'
            }`}
          >
            {/* Image */}
            <div className="w-full h-44 rounded-2xl overflow-hidden mb-4">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            {/* Text */}
            <div className="text-left flex-grow mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 block mb-1">
                {project.category}
              </span>
              <h3 className="text-lg font-black uppercase tracking-tight text-zinc-950 mb-1 leading-none">
                {project.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-normal">
                {project.desc}
              </p>
            </div>
            {/* Button */}
            <div className="w-full py-3 bg-zinc-950 text-white group-hover:bg-yellow-400 group-hover:text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 text-center">
              Explore Project
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

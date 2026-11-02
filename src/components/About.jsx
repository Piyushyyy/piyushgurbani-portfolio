import { useState } from 'react';
import { Zap, BookOpen, Target, User, Briefcase, Award, Download } from 'lucide-react';

const timelineItems = [
  {
    date: "Oct 2025 – Sep 2026",
    title: "Media, PR & HR Officer",
    company: "IAESTE",
    desc: "Focused on strategic communications, partner outreach, and managing human resource operations."
  },
  {
    date: "Jun 2026 – Jul 2026",
    title: "Marketing Intern",
    company: "Kiara Group",
    desc: "Handled digital creatives, social content delivery, and campaign execution."
  },
  {
    date: "1 Year",
    title: "Creative Developer",
    company: "Freelance",
    desc: "Delivered high-converting websites and cinematic video edits for clients globally."
  },
  {
    date: "Nov 2023 – Sep 2024",
    title: "Head Boy",
    company: "Student Council",
    desc: "Led student council initiatives, organized large-scale events, and managed key administrative duties under pressure."
  },
  {
    date: "Nov 2023 – Mar 2024",
    title: "Event Management & Sales Intern",
    company: "TADS",
    desc: "Worked in client-facing roles, on-ground coordination, and sales execution."
  }
];

const About = () => {
  const [activeTab, setActiveTab] = useState('intro');

  const getTabImage = () => {
    switch (activeTab) {
      case 'intro':
        return '/piyush_waving.png';
      case 'experience':
        return '/piyush_laptop.png';
      case 'why-me':
        return '/piyush_pointing.png';
      default:
        return '/piyush_portrait.png';
    }
  };

  return (
    <section id="about" className="relative w-full bg-[#0c0c0e] text-white py-24 px-6 overflow-hidden border-t border-white/5">
      {/* Background Watermark */}
      <h2 
        className="absolute text-[16vw] font-black uppercase tracking-tighter leading-none text-zinc-900/30 pointer-events-none select-none z-0 left-10 top-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'overlay' }}
      >
        ABOUT ME
      </h2>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400 block mb-2">Profile</span>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">Who I Am</h3>
        </div>

        {/* Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: Grayscale Hover-to-Color Portrait (Left Column on Desktop, Middle on Mobile) */}
          <div className="col-span-1 lg:col-span-3 order-2 lg:order-1">
            <div className="relative w-full h-[320px] lg:h-[540px] rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-xl flex items-end justify-center group shadow-xl">
              {/* Subtle accent glow behind the cutout */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-yellow-400/5 blur-[50px] pointer-events-none z-0" />
              <img 
                key={activeTab}
                src={getTabImage()} 
                alt={`Piyush Gurbani - ${activeTab === 'intro' ? 'Creative Developer Profile' : activeTab === 'experience' ? 'Career Experience and Timeline' : 'Core Strengths and Execution'}`} 
                className={`object-contain relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-out origin-bottom animate-fadeIn ${
                  activeTab === 'intro'
                    ? 'w-full h-full scale-[1.2] lg:scale-[1.28] translate-y-[18%] lg:translate-y-[22%] group-hover:scale-[1.25] lg:group-hover:scale-[1.33]'
                    : 'w-[90%] lg:w-full h-[90%] lg:h-[95%] group-hover:scale-105'
                }`}
              />
            </div>
          </div>

          {/* COLUMN 2: Equal Height Content Card (Bottom Column on Mobile, Center on Desktop) */}
          <div className="col-span-1 lg:col-span-7 order-3 lg:order-2 bg-white/[0.02] border border-white/5 rounded-[32px] p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between h-[480px] lg:h-[540px] shadow-2xl">
            <div key={activeTab} className="h-full flex flex-col justify-between animate-fadeIn">
              
              {/* TAB CONTENT: INTRODUCTION */}
              {activeTab === 'intro' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-5 text-zinc-300 font-sans text-sm md:text-base leading-relaxed font-medium overflow-y-auto pr-1 scrollbar-none h-[420px]">
                    <p className="text-white text-lg font-bold">
                      I'm someone who's genuinely passionate about what I do.
                    </p>
                    <p>
                      I like working, building, improving, and honestly, I'm a little obsessed with growth, not just mine, but also helping the people I work with grow alongside me.
                    </p>
                    <p>
                      One thing that really defines me is adaptability. I can step into almost any environment, figure things out quickly, and get moving. Even if I don't know something, I'll learn it fast and make it work.
                    </p>
                    <p>
                      I'm also someone who focuses on getting things done. Ideas are great, but execution is what matters, and I make sure things actually move forward.
                    </p>
                    <p>
                      At the same time, I understand people. I naturally pick up on what someone wants or expects, which helps me deliver work that actually connects and makes sense for them.
                    </p>
                    <p>
                      Right now, I'm just focused on learning, building, and getting better every single day.
                    </p>
                  </div>
                  
                  {/* Content Footer ornament */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider">PROFILE_INTRO</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  </div>
                </div>
              )}

              {/* TAB CONTENT: EXPERIENCE (Symmetric 2-Column Grid Layout with Col-Span-2 for Last Item) */}
              {activeTab === 'experience' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 scrollbar-none h-[420px] items-start">
                    {timelineItems.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 md:p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 flex flex-col justify-start gap-1.5 ${
                          idx === 4 
                            ? 'md:col-span-2 h-[105px] md:mt-1' 
                            : 'h-[135px]'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                            {item.date}
                          </span>
                          <h4 className="text-xs md:text-[13px] font-black uppercase text-white tracking-tight leading-snug flex items-center gap-1.5 flex-wrap">
                            <span>{item.title}</span>
                            {item.company && (
                              <>
                                <span className="text-yellow-400/50">•</span>
                                <span className="text-yellow-400">{item.company}</span>
                              </>
                            )}
                          </h4>
                        </div>
                        <p className="text-zinc-300 font-sans text-[12px] md:text-[13px] leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Content Footer ornament */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider">PROFILE_TIMELINE</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  </div>
                </div>
              )}

              {/* TAB CONTENT: WHY HIRE ME */}
              {activeTab === 'why-me' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-5 overflow-y-auto pr-1 scrollbar-none h-[420px]">
                    <div className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed font-medium">
                      <p className="text-white text-lg font-bold mb-2">
                        I don't just complete tasks, I make sure they actually work.
                      </p>
                      <p>
                        I combine creativity, technical skills, and real-world understanding to deliver results that are not just good-looking, but effective.
                      </p>
                    </div>

                    {/* Compact Stacked highlight points */}
                    <div className="space-y-3">
                      <div className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center border border-yellow-400/20 shrink-0">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase text-white tracking-tight mb-0.5">Adaptability</h5>
                          <p className="text-zinc-300 font-sans text-[11px] md:text-xs leading-normal font-medium">
                            I adapt fast. I can step into any problem, analyze the situation, and figure out the path forward.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center border border-yellow-400/20 shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase text-white tracking-tight mb-0.5">Fast Learner</h5>
                          <p className="text-zinc-300 font-sans text-[11px] md:text-xs leading-normal font-medium">
                            I learn quickly. If a project requires a technology or skill I don't know yet, I will master it and make it work.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center border border-yellow-400/20 shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase text-white tracking-tight mb-0.5">Execution</h5>
                          <p className="text-zinc-300 font-sans text-[11px] md:text-xs leading-normal font-medium">
                            I execute. I focus on getting things done, turning strategies into solid, high-performing implementations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-zinc-300 font-sans text-sm leading-relaxed mt-2 font-medium">
                      I understand people, not just projects, which helps me create work that connects, performs, and delivers value.
                    </p>
                  </div>

                  {/* Content Footer ornament */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider">PROFILE_STRENGTHS</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* COLUMN 3: Centered Vertical Navigation Buttons (Right Column on Desktop, Top on Mobile) */}
          <div className="col-span-1 lg:col-span-2 order-1 lg:order-3 flex lg:flex-col gap-2.5 lg:gap-4 justify-center items-center w-full select-none">
            <div className="flex lg:flex-col gap-1.5 lg:gap-4 bg-zinc-900/60 lg:bg-transparent border border-white/5 lg:border-none p-1.5 lg:p-0 rounded-2xl lg:rounded-none w-full max-w-md lg:max-w-none">
              <button
                onClick={() => setActiveTab('intro')}
                className={`flex-1 lg:flex-none py-3 px-3.5 lg:w-[155px] rounded-xl lg:rounded-2xl border text-[10px] lg:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 lg:gap-2.5 active:scale-95 ${
                  activeTab === 'intro'
                    ? 'bg-yellow-400 text-zinc-950 border-yellow-400 shadow-lg shadow-yellow-400/10 font-black'
                    : 'bg-transparent lg:bg-white/5 text-zinc-400 border-transparent lg:border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Intro</span>
              </button>
              
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex-1 lg:flex-none py-3 px-3.5 lg:w-[155px] rounded-xl lg:rounded-2xl border text-[10px] lg:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 lg:gap-2.5 active:scale-95 ${
                  activeTab === 'experience'
                    ? 'bg-yellow-400 text-zinc-950 border-yellow-400 shadow-lg shadow-yellow-400/10 font-black'
                    : 'bg-transparent lg:bg-white/5 text-zinc-400 border-transparent lg:border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work</span>
              </button>

              <button
                onClick={() => setActiveTab('why-me')}
                className={`flex-1 lg:flex-none py-3 px-3.5 lg:w-[155px] rounded-xl lg:rounded-2xl border text-[10px] lg:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 lg:gap-2.5 active:scale-95 ${
                  activeTab === 'why-me'
                    ? 'bg-yellow-400 text-zinc-950 border-yellow-400 shadow-lg shadow-yellow-400/10 font-black'
                    : 'bg-transparent lg:bg-white/5 text-zinc-400 border-transparent lg:border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Why Me</span>
              </button>
            </div>
          </div>

        </div>

        {/* Centered Download CV CTA */}
        <div className="flex justify-center mt-12 relative z-20">
          <a 
            href="/Piyush_Gurbani_Resume.pdf" 
            download="Piyush_Gurbani_Resume.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-yellow-400 text-zinc-950 font-black uppercase text-xs lg:text-sm tracking-wider hover:bg-yellow-300 hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-yellow-400/20 active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Download my CV</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;

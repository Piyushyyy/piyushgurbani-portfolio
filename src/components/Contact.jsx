import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MessageCircle } from 'lucide-react';
import { Instagram, Linkedin, Github } from './BrandIcons';
import LeadForm from './LeadForm';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const iconsRef = useRef(null);

  // GSAP animation for fading/lifting elements on enter
  useGSAP(() => {
    gsap.fromTo(headingRef.current,
      { y: 80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo(formRef.current,
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo(iconsRef.current,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      }
    );
  }, { scope: sectionRef });



  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full bg-[#0a0a0a] rounded-t-[40px] flex items-center justify-center px-6 py-20 overflow-hidden z-10 border-t border-white/5"
    >
      {/* Massive Background Typography */}
      <h2 
        className="absolute text-[25vw] font-black text-white select-none pointer-events-none tracking-tighter opacity-[0.02] leading-none z-0"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        CONNECT
      </h2>

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center relative z-10 text-center">
        
        {/* Title */}
        <div ref={headingRef} className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400 mb-4 block">Get In Touch</span>
          <h3 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tight text-white leading-none">
            Let's Talk
          </h3>
        </div>

        {/* Contact Form */}
        <div ref={formRef} className="w-full mb-12">
          <LeadForm inline={true} />
        </div>

        {/* Social Icons Panel */}
        <div ref={iconsRef} className="flex flex-wrap justify-center gap-6 items-center">
          {/* WhatsApp */}
          <a
            href="https://wa.me/918949768356?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20marketing%2C%20website%20development%2C%20and%20branding%20services.%20Can%20you%20share%20more%20details%20on%20how%20you%20can%20help%20my%20business%20grow%3F"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Piyush Gurbani on WhatsApp"
            title="Chat with Piyush on WhatsApp"
            className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/_piyushyyyy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Piyush Gurbani on Instagram"
            title="Follow Piyush on Instagram"
            className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/piyush-gurbani-521a79441/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Piyush Gurbani on LinkedIn"
            title="Connect with Piyush on LinkedIn"
            className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Piyushyyy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Piyush Gurbani on GitHub"
            title="View Piyush on GitHub"
            className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;

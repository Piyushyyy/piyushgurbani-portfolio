import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Navbar = ({ activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const navRef = useRef(null);

  const leftNavItems = ['Home', 'About', 'Service'];
  const rightNavItems = ['Resume', 'Project', 'Contact'];



  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      if (currentScrollPos < 80) {
        setVisible(true);
      } else {
        setVisible(isScrollingUp);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // GSAP animation for show/hide nav container (Animates 'top' to prevent conflict with translateX centering)
  useGSAP(() => {
    gsap.to(navRef.current, {
      top: visible ? '24px' : '-100px',
      opacity: visible ? 1 : 0,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [visible]);



  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    if (id === 'Resume') {
      window.open('/Piyush_Gurbani_Resume.pdf', '_blank');
      return;
    }
    const targetId = id === 'Project' ? 'portfolio' : id.toLowerCase();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { duration: 1.2 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Symmetrical Floating Capsule Header */}
      <header
        ref={navRef}
        style={{ left: '50%', transform: 'translateX(-50%)' }}
        className="fixed top-6 z-50 w-[92%] max-w-4xl flex items-center justify-between md:justify-around px-8 py-3 bg-[#18181b]/95 border border-white/10 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300"
      >
        {/* Left menu group (Desktop only) */}
        <nav className="hidden md:flex items-center gap-6">
          {leftNavItems.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                onClick={() => handleLinkClick(item)}
                className={`text-xs font-black tracking-widest uppercase transition-all duration-300 rounded-full border-none outline-none cursor-pointer ${
                  isActive 
                    ? 'px-4 py-2 bg-[#f97316] text-white shadow-md shadow-[#f97316]/20' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Center Logo Group (Desktop & Mobile) */}
        <button
          onClick={() => handleLinkClick('Home')}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none"
        >
          {/* Orange Initials Circle */}
          <div className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center font-black text-xs text-white shadow-md shadow-[#f97316]/20">
            PG
          </div>
          {/* Name */}
          <span className="text-white font-black text-sm uppercase tracking-widest">Piyush</span>
        </button>

        {/* Right menu group (Desktop only) */}
        <nav className="hidden md:flex items-center gap-6">
          {rightNavItems.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                onClick={() => handleLinkClick(item)}
                className={`text-xs font-black tracking-widest uppercase transition-all duration-300 rounded-full border-none outline-none cursor-pointer ${
                  isActive 
                    ? 'px-4 py-2 bg-[#f97316] text-white shadow-md shadow-[#f97316]/20' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* WhatsApp Direct Chat Trigger */}
          <a
            href="https://wa.me/918949768356?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20marketing%2C%20website%20development%2C%20and%20branding%20services.%20Can%20you%20share%20more%20details%20on%20how%20you%20can%20help%20my%20business%20grow%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-[#25D366] transition-colors cursor-pointer flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          
          {/* Hamburger Menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-white hover:text-[#f97316] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-3xl flex flex-col justify-between items-center py-16 px-8 animate-fadeIn"
        >
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full bg-white/5 hover:bg-white/10 border-none outline-none"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Menu Header Details */}
          <div className="flex flex-col items-center select-none mt-4">
            <div className="w-14 h-14 rounded-full bg-[#f97316] text-white flex items-center justify-center font-black text-lg shadow-lg shadow-[#f97316]/20 mb-3">
              PG
            </div>
            <h4 className="text-white font-black uppercase tracking-tight text-sm">Piyush Gurbani</h4>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-550 mt-1">Growth & Development</span>
          </div>

          {/* Navigation Links with Active Highlighting */}
          <div className="flex flex-col items-center gap-6 my-auto">
            {[...leftNavItems, ...rightNavItems].map((item) => {
              const isActive = activeSection.toLowerCase() === (item === 'Portfolio' ? 'portfolio' : item.toLowerCase());
              return (
                <button
                  key={item}
                  onClick={() => {
                    handleLinkClick(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-3xl font-black uppercase tracking-tight transition-all duration-300 cursor-pointer active:scale-95 ${
                    isActive 
                      ? 'text-[#f97316] scale-105' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Menu Bottom Socials */}
          <div className="flex gap-6 border-t border-white/5 pt-8 w-full max-w-xs justify-center">
            <a 
              href="https://www.linkedin.com/in/piyush-gurbani-40966041b/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BgZG%2B%2BFD%2BR%2BK6cQWxZwzBMQ%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-90"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a 
              href="https://wa.me/918949768356" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#25D366] transition-all active:scale-90"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a 
              href="mailto:piyushgurbani456@gmail.com" 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-90"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button (FAB) on Desktop */}
      <a
        href="https://wa.me/918949768356?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20marketing%2C%20website%20development%2C%20and%20branding%20services.%20Can%20you%20share%20more%20details%20on%20how%20you%20can%20help%20my%20business%20grow%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 p-4 bg-[#25D366] text-white rounded-full shadow-xl shadow-[#25D366]/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer hover:bg-[#20ba5a] flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </>
  );
};

export default Navbar;

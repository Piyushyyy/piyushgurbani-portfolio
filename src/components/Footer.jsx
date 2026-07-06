import { useState } from 'react';
import { Send, UserPlus, X } from 'lucide-react';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleScrollTo = (id) => {
    const targetId = id === 'Portfolio' ? 'portfolio' : id.toLowerCase();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { duration: 1.2 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const marqueeText1 = "PIYUSH GURBANI FREELANCE STRATEGIST MARKETING EXPERT GROWTH  ";
  const marqueeText2 = "CREATIVE WORK SOCIAL MEDIA LEAD GENERATION DESIGN CODE SEO  ";

  return (
    <footer className="relative w-full bg-[#f4c400] text-zinc-900 overflow-hidden py-16 md:py-24 z-10">
      
      {/* 1. Animated Background Marquees (4 Layers with alternating directions and low opacity) */}
      <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none select-none z-0 opacity-10">
        
        {/* Row 1: Left */}
        <div className="overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-marquee-left text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950">
            <span>{marqueeText1}</span>
            <span>{marqueeText1}</span>
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-marquee-right text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950">
            <span>{marqueeText2}</span>
            <span>{marqueeText2}</span>
          </div>
        </div>

        {/* Row 3: Left */}
        <div className="overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-marquee-left text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950">
            <span>{marqueeText1}</span>
            <span>{marqueeText1}</span>
          </div>
        </div>

        {/* Row 4: Right */}
        <div className="overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-marquee-right text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950">
            <span>{marqueeText2}</span>
            <span>{marqueeText2}</span>
          </div>
        </div>

      </div>

      {/* 2. Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center z-10">
        
        {/* Profile Showcase & CTAs */}
        <div className="flex flex-col items-center mb-12">
          
          {/* Floating Profile Image */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl transition-transform duration-700 hover:scale-110 mb-6 relative group">
            <img 
              src="/piyush_footer.jpg" 
              alt="Piyush Gurbani Profile Avatar" 
              className="w-full h-full object-cover"
            />
            {/* Ambient hover glow ring */}
            <div className="absolute inset-0 rounded-full border border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            
            {/* Follow Button (Blue with Neon Glow hover) */}
            <a
              href="https://www.linkedin.com/in/piyush-gurbani-40966041b/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BgZG%2B%2BFD%2BR%2BK6cQWxZwzBMQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#2563eb] text-white hover:bg-blue-700 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Follow
            </a>

            {/* Message Button (Minimal white with elevation hover) */}
            <button
              onClick={() => handleScrollTo('Contact')}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-full font-black text-xs uppercase tracking-widest shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Message
            </button>
          </div>
        </div>

        {/* 3. Luxury Branding */}
        <div className="mb-10 text-center">
          <div className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 flex items-center justify-center gap-2 mb-2 select-none">
            <span className="w-8 h-8 rounded-full bg-[#18181b] text-white flex items-center justify-center font-black text-xs">PG</span>
            <span>Piyush</span>
          </div>
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-800">
            Crafting premium interactive digital arts.
          </p>
        </div>

        {/* 4. Responsive Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item)}
              className="text-xs md:text-sm font-black uppercase tracking-widest text-zinc-800 hover:text-zinc-950 transition-colors duration-300 relative py-1 group cursor-pointer"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-zinc-900 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* 5. Divider Line */}
        <div className="w-full border-t border-zinc-950/15 mb-8 rounded-full" />

        {/* 6. Copyright & Legal Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-800">
          <p className="uppercase tracking-widest">
            &copy; {new Date().getFullYear()} PIYUSH GURBANI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveModal('privacy')} 
              className="hover:text-zinc-950 transition-colors uppercase tracking-widest cursor-pointer border-none bg-transparent outline-none font-bold"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveModal('terms')} 
              className="hover:text-zinc-950 transition-colors uppercase tracking-widest cursor-pointer border-none bg-transparent outline-none font-bold"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>

      {/* Premium Legal Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-zinc-900/95 border border-white/10 text-white p-6 md:p-8 rounded-[32px] shadow-2xl relative max-h-[85vh] overflow-y-auto scrollbar-none">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full bg-white/5 hover:bg-white/10 border-none outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' ? (
              <div className="text-left">
                <h3 className="text-2xl font-black uppercase text-yellow-400 mb-6 tracking-tight">Privacy Policy</h3>
                <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-medium">
                  <p><strong>Effective Date:</strong> July 7, 2026</p>
                  <p>Welcome to the portfolio of Piyush Gurbani. Your privacy is highly valued. This policy outlines how information is handled on this site.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">1. Information Collected</h4>
                  <p>If you reach out via the Contact Form or initiate a WhatsApp chat, standard contact details (your name, email address, and message contents) are collected to respond to your inquiry.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">2. How Information is Used</h4>
                  <p>Your details are used strictly to communicate with you. To deliver this, your inquiry is processed through FormSubmit (for the contact form) and/or WhatsApp/Meta (if you message via WhatsApp). Your information is never sold or used for marketing by us.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">3. Security</h4>
                  <p>Industry-standard security practices are implemented to safeguard any data transmitted through this site. Redirections to WhatsApp are secured by end-to-end encryption.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">4. Cookies</h4>
                  <p>This site does not use tracking or advertising cookies. Any cookies present are limited to essential site functionality.</p>

                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">5. Your Data Rights (DPDP Act Compliance)</h4>
                  <p>To request access to, correction of, or deletion of your data, contact <a href="mailto:piyushgurbani456@gmail.com" className="text-yellow-400 hover:underline">piyushgurbani456@gmail.com</a>.</p>
                </div>
              </div>
            ) : (
              <div className="text-left">
                <h3 className="text-2xl font-black uppercase text-yellow-400 mb-6 tracking-tight">Terms of Service</h3>
                <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-medium">
                  <p><strong>Effective Date:</strong> July 7, 2026</p>
                  <p>By browsing or submitting request inquiries through this website, you agree to comply with and be bound by the following terms.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">1. Scope of Services</h4>
                  <p>Professional freelance offerings include branding designs, website development, marketing operations, mockup asset rendering, and cinematic video editing.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">2. Intellectual Property</h4>
                  <p>All finalized codebases, visual mockup files, and edited video assets are transferred under ownership of the client upon full invoice clearance. Piyush Gurbani retains the right to display elements in portfolio cases unless otherwise agreed upon in writing.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">3. Payment & Project Cancellation</h4>
                  <p>A deposit of 50% is required before work begins. Work is paused if scheduled payments are not received within 7 days of the due date. If a project is cancelled after work has begun, payment is due for work completed up to that point, and any deposit is non-refundable. Delays in asset transfer may extend final delivery dates.</p>
                  
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">4. Revision Limits</h4>
                  <p>Each project includes 3 rounds of revisions. Additional revisions beyond this may incur extra charges.</p>

                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">5. Liability & Warranty</h4>
                  <p>All solutions are delivered on an "as-is" basis. Pre-launch bug validation is provided for 30 days post-launch. Piyush Gurbani is not liable for third-party hosting failures or external api modifications.</p>

                  <h4 className="text-white font-bold uppercase text-xs tracking-wider mt-4">6. Governing Law & Jurisdiction</h4>
                  <p>These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of courts in Jaipur, Rajasthan.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

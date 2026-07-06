import { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, Check } from 'lucide-react';

const LeadForm = ({ onClose, inline = false }) => {
  const [step, setStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [emailInputOpen, setEmailInputOpen] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [formData, setFormData] = useState({
    service: '',
    brandType: '',
    budget: '',
    timeline: ''
  });

  const totalSteps = 4;

  const services = [
    "Branding",
    "Social Media Setup",
    "Website",
    "Marketing Content",
    "Not sure yet — let's talk"
  ];

  const brandTypes = [
    "Jewelry Brand",
    "Real Estate",
    "Construction",
    "Homestay",
    "Airbnb",
    "Other Business",
    "Personal Brand"
  ];

  const budgets = [
    "Under ₹15,000",
    "₹15,000 – ₹40,000",
    "₹40,000+",
    "Not sure yet"
  ];

  const timelines = [
    "ASAP",
    "Within this month",
    "Just exploring options"
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step <= totalSteps + 1) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  // Validation check for each step
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.service !== '';
      case 2:
        return formData.brandType !== '';
      case 3:
        return formData.budget !== '';
      case 4:
        return formData.timeline !== '';
      case 5:
        return formData.name.trim() !== '' && formData.contact.trim() !== '';
      default:
        return true;
    }
  };

  const handleSelectOption = (field, value) => {
    updateField(field, value);
    // Auto-advance by 300ms for extremely responsive flow
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const summaryText = 
`*New Project Inquiry* 🚀

*Service Needed:* ${formData.service}
*Brand Type:* ${formData.brandType}
*Budget Range:* ${formData.budget}
*Timeline:* ${formData.timeline}`;

    const encodedSummary = encodeURIComponent(summaryText);
    const whatsappUrl = `https://wa.me/918949768356?text=${encodedSummary}`;
    window.open(whatsappUrl, '_blank');
    if (onClose) onClose();
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!clientEmail.trim() || !isValidEmail(clientEmail)) {
      setEmailInputOpen(true);
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/piyushgurbani456@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Service Needed": formData.service,
          "Brand Type": formData.brandType,
          "Budget Range": formData.budget,
          "Timeline": formData.timeline,
          "Reply-To Email": clientEmail,
          "_replyto": clientEmail,
          "_honey": "",
          "_captcha": "false"
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmailInputOpen(false);
      } else {
        throw new Error('Formsubmit AJAX failed');
      }
    } catch (error) {
      console.error(error);
      // Fallback to mailto link if network is offline or fails
      const summaryText = 
`New Project Inquiry 🚀

Service Needed: ${formData.service}
Brand Type: ${formData.brandType}
Budget Range: ${formData.budget}
Timeline: ${formData.timeline}

Reply-To Email: ${clientEmail}`;

      const mailtoUrl = `mailto:piyushgurbani456@gmail.com?subject=Project Inquiry - ${encodeURIComponent(formData.service)}&body=${encodeURIComponent(summaryText)}`;
      window.open(mailtoUrl, '_blank');
      setSubmitStatus('idle');
      setEmailInputOpen(false);
      if (onClose) onClose();
    }
  };

  return (
    <div className={`w-full ${inline ? 'max-w-2xl mx-auto' : 'max-w-xl'} bg-zinc-950/95 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative text-left`}>
      
      {/* Modal Close Button */}
      {!inline && onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full bg-white/5 hover:bg-white/10 border-none outline-none z-30"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {submitStatus === 'submitting' && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin mb-6" />
          <h3 className="text-xl font-black uppercase text-white mb-2">Sending Inquiry</h3>
          <p className="text-zinc-400 text-xs font-semibold">Submitting details securely from your browser...</p>
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-6">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h3 className="text-2xl font-black uppercase text-white mb-2">Thank you!</h3>
          <p className="text-zinc-400 text-xs font-semibold max-w-sm mb-8 leading-relaxed font-sans">
            Your project inquiry has been sent successfully. Piyush will review your requirements and reach out to you shortly!
          </p>
          <button
            onClick={() => {
              setSubmitStatus('idle');
              setStep(1);
              setFormData({ service: '', brandType: '', budget: '', timeline: '' });
              if (onClose) onClose();
            }}
            className="px-8 py-3.5 bg-yellow-400 text-zinc-950 hover:bg-yellow-300 font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/10 cursor-pointer border-none outline-none"
          >
            Close window
          </button>
        </div>
      )}

      {submitStatus === 'idle' && (
        <>
          {step <= totalSteps && (
            <div className="mb-6">
              {/* Progress Indicator */}
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span className="text-yellow-400">{Math.round((step / totalSteps) * 100)}% Complete</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-300 ease-out"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-6">
                What service do you need?
              </h3>
              <div className="flex flex-col gap-3">
                {services.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption('service', opt)}
                    className={`w-full py-4 px-6 rounded-2xl border text-left font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      formData.service === opt
                        ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg shadow-yellow-400/5'
                        : 'border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      formData.service === opt
                        ? 'border-yellow-400 bg-yellow-400 text-zinc-950'
                        : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                    }`}>
                      {formData.service === opt && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Brand Type */}
          {step === 2 && (
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-6">
                What is your brand type?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {brandTypes.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption('brandType', opt)}
                    className={`py-4 px-5 rounded-2xl border text-left font-bold text-xs transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      formData.brandType === opt
                        ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg shadow-yellow-400/5 col-span-1'
                        : 'border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10 col-span-1'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                      formData.brandType === opt
                        ? 'border-yellow-400 bg-yellow-400 text-zinc-950'
                        : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                    }`}>
                      {formData.brandType === opt && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-6">
                What is your budget range?
              </h3>
              <div className="flex flex-col gap-3">
                {budgets.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption('budget', opt)}
                    className={`w-full py-4 px-6 rounded-2xl border text-left font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      formData.budget === opt
                        ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg shadow-yellow-400/5'
                        : 'border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      formData.budget === opt
                        ? 'border-yellow-400 bg-yellow-400 text-zinc-950'
                        : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                    }`}>
                      {formData.budget === opt && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Timeline */}
          {step === 4 && (
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-6">
                What is your timeline?
              </h3>
              <div className="flex flex-col gap-3">
                {timelines.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption('timeline', opt)}
                    className={`w-full py-4 px-6 rounded-2xl border text-left font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      formData.timeline === opt
                        ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg shadow-yellow-400/5'
                        : 'border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      formData.timeline === opt
                        ? 'border-yellow-400 bg-yellow-400 text-zinc-950'
                        : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                    }`}>
                      {formData.timeline === opt && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Summary & Confirmation */}
          {step === 5 && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="_honey" style={{ display: 'none' }} readOnly />
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-2">
                Verify details
              </h3>
              <p className="text-zinc-400 text-xs font-semibold mb-6">
                Review your answers. You can submit via WhatsApp or send a direct Email.
              </p>

              <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5 mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-[10px] font-black uppercase text-zinc-500 block mb-0.5">Service</span>
                    <span className="text-white">{formData.service}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-zinc-500 block mb-0.5">Brand Type</span>
                    <span className="text-white">{formData.brandType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-zinc-500 block mb-0.5">Budget</span>
                    <span className="text-white">{formData.budget}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-zinc-500 block mb-0.5">Timeline</span>
                    <span className="text-white">{formData.timeline}</span>
                  </div>
                </div>
              </div>

              {emailInputOpen ? (
                <div className="mt-4 border-t border-white/5 pt-4 animate-fadeIn">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-2">
                    Where should Piyush reply to you?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="yourname@domain.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="flex-grow px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-650 focus:outline-none focus:border-yellow-400 font-semibold text-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      disabled={!clientEmail.trim() || !isValidEmail(clientEmail)}
                      className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                        clientEmail.trim() && isValidEmail(clientEmail)
                          ? 'bg-yellow-400 text-zinc-950 hover:bg-yellow-300 cursor-pointer shadow-lg active:scale-95'
                          : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5'
                      }`}
                    >
                      Send ✉
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailInputOpen(false)}
                    className="text-[10px] font-black uppercase text-zinc-550 hover:text-zinc-350 tracking-wider mt-3 block border-none bg-transparent outline-none cursor-pointer"
                  >
                    ← Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-yellow-400 text-zinc-950 hover:bg-yellow-300 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 animate-fadeIn"
                  >
                    <Send className="w-4 h-4 stroke-[3]" />
                    Submit via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailInputOpen(true)}
                    className="flex-1 py-4 bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 animate-fadeIn"
                  >
                    <svg className="w-4 h-4 stroke-[3] fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Submit via Email
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Control Buttons */}
          <div className={`flex justify-between items-center mt-8 ${step > 1 ? 'border-t border-white/5 pt-6' : ''}`}>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer border border-white/5"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps + 1 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-1 ${
                  isStepValid()
                    ? 'bg-white text-black hover:bg-zinc-200 cursor-pointer shadow-lg shadow-white/5 active:scale-[0.98]'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5'
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeadForm;

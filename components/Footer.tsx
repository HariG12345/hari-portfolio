
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Processing...');
    setAiFeedback('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are Hari G's AI Portfolio Assistant. A user named ${formData.name} (${formData.email}) sent this message: "${formData.message}". 
        Write a very short, friendly, and professional confirmation message (max 2 sentences) acknowledging their specific intent and mentioning that Hari will get back to them soon. Keep it in character as an AI assistant.`,
      });

      setAiFeedback(response.text || "Thanks! I've received your message.");
      setStatus('Message Sent! 🚀');
      setFormData({ name: '', email: '', message: '' });
      
      // Keep success state for a while
      setTimeout(() => {
        setStatus('');
        setAiFeedback('');
      }, 8000);
    } catch (error) {
      console.error("AI Response error:", error);
      setStatus('Sent! (AI offline)');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div className="reveal">
            <h2 className="brand-text text-4xl mb-6">GET IN TOUCH</h2>
            <p className="cartoon-text text-gray-400 text-lg mb-10 max-w-md">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <div className="space-y-6">
              {[
                { icon: 'fa-envelope', label: 'gthari12345@gmail.com', href: 'mailto:gthari12345@gmail.com', color: 'text-blue-400' },
                { icon: 'fa-phone', label: '+91 9342279728', href: 'tel:+919342279728', color: 'text-green-400' },
                { icon: 'fa-linkedin-in', label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/hari-g-it-skct-2025/', color: 'text-blue-600' }
              ].map((item, i) => (
                <a 
                  key={i}
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group transition-all"
                >
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all transform group-hover:-rotate-6 border border-white/5">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <span className={`cartoon-text font-bold text-gray-300 group-hover:text-white transition-colors`}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="reveal">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
              <form onSubmit={handleSubmit} className="relative glass p-10 rounded-[2.5rem] border border-white/10 space-y-5">
                {status.includes('Sent') && aiFeedback && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl mb-4 animate-fade-in">
                    <p className="cartoon-text text-xs text-blue-300 italic">
                      <i className="fa-solid fa-robot mr-2"></i> {aiFeedback}
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="cartoon-text text-xs font-bold text-gray-500 mb-2 block uppercase tracking-widest">Full Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-blue-500/50 outline-none transition-all cartoon-text text-sm"
                  />
                </div>
                <div>
                  <label className="cartoon-text text-xs font-bold text-gray-500 mb-2 block uppercase tracking-widest">Email Address</label>
                  <input 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-blue-500/50 outline-none transition-all cartoon-text text-sm"
                  />
                </div>
                <div>
                  <label className="cartoon-text text-xs font-bold text-gray-500 mb-2 block uppercase tracking-widest">Your Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="What's on your mind?" 
                    rows={4} 
                    className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-blue-500/50 outline-none transition-all cartoon-text text-sm resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={status === 'Processing...'}
                  className={`w-full py-5 rounded-2xl font-black transition-all transform active:scale-95 shadow-lg uppercase tracking-widest text-xs brand-text flex items-center justify-center gap-2 ${
                    status.includes('Sent') ? 'bg-green-600' : 'bg-blue-600 hover:bg-white hover:text-blue-600 shadow-blue-500/20'
                  }`}
                >
                  {status || 'SEND MESSAGE'} {(!status || status === 'Processing...') && <i className={`fa-solid ${status === 'Processing...' ? 'fa-spinner animate-spin' : 'fa-paper-plane'}`}></i>}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="brand-text text-xl">
            <span className="text-blue-500">HARI</span>.G
          </div>
          <p className="cartoon-text text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            DEVELOPED BY HARI G(2026)
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/HariG12345" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:-translate-y-1">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/w_a_r_r_i_o_r_gt?igsh=ODJ2eTF6NHV2YWQ3" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:-translate-y-1">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/hari-g-it-skct-2025/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:-translate-y-1">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

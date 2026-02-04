
import React, { useEffect, useState, useRef } from 'react';

export const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  const phrases = ["Aspiring IT Professional", "React & Web Developer", "Creative Tech Explorer"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 60 : 120);
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      [leftPupilRef, rightPupilRef].forEach(ref => {
        if (ref.current) {
          const eyeRect = ref.current.parentElement?.getBoundingClientRect();
          if (eyeRect) {
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            const radius = Math.min(eyeRect.width / 4, 6);
            
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            ref.current.style.transform = `translate(${x}px, ${y}px)`;
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 reveal text-center md:text-left z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-blue-500/20 animate-bounce">
              <i className="fa-solid fa-sparkles text-yellow-400 text-xs"></i>
              <span className="cartoon-text text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Open for New Opportunities</span>
            </div>
            <a 
              href="https://github.com/HariG12345" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 hover:border-blue-500 transition-colors group"
            >
              <i className="fa-brands fa-github text-white text-xs group-hover:rotate-12 transition-transform"></i>
              <span className="cartoon-text text-[10px] font-bold text-gray-300 uppercase tracking-tighter">@HariG12345</span>
            </a>
          </div>
          <h1 className="brand-text text-5xl md:text-8xl mb-6 leading-tight text-white">
            I'M <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">HARI</span>
          </h1>
          <div className="cartoon-text text-2xl md:text-4xl font-semibold mb-8 h-10">
            <span className="text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{text}</span>
            <span className="animate-pulse ml-1">|</span>
          </div>
          <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed font-medium">
            Bridging the gap between complex engineering and delightful user interfaces. I turn coffee into code and ideas into reality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => scrollTo('projects')}
              className="cartoon-text px-10 py-4 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-2xl font-black transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-blue-500/20 group"
            >
              VIEW PROJECTS <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="cartoon-text px-10 py-4 glass rounded-2xl font-black transition-all hover:bg-white/10 active:scale-95 border border-white/10"
            >
              LET'S CHAT
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative reveal flex justify-center">
          <div className="relative group">
            {/* Animated Mascot */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-28 z-30 pointer-events-none floating-cartoon">
               <div className="relative w-full h-full flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl border-2 border-white flex items-center justify-center relative shadow-2xl overflow-hidden">
                     <div className="flex gap-2">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                           <div ref={leftPupilRef} className="w-2.5 h-2.5 bg-black rounded-full"></div>
                        </div>
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                           <div ref={rightPupilRef} className="w-2.5 h-2.5 bg-black rounded-full"></div>
                        </div>
                     </div>
                     <div className="absolute bottom-2.5 w-6 h-2 border-b-2 border-black rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="w-72 h-72 md:w-[420px] md:h-[420px] rounded-[2.5rem] overflow-hidden glass border-2 border-white/10 p-2 shadow-2xl relative z-10 transition-all duration-500 group-hover:border-blue-500/50">
           <img
  src="https://drive.google.com/uc?export=view&id=1hE8lwDDR2c1hWJ2muFl2mmf1WclY__nj"
  alt="Hari G"
  className="w-full h-full object-cover rounded-[2rem]"
/>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

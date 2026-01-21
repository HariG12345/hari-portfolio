
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <nav className={`fixed top-0 w-full z-50 glass-nav py-5 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="brand-text text-2xl tracking-widest text-white group"
        >
          <span className="text-blue-500 group-hover:text-yellow-400 transition-colors">HARI</span>
          <span className="text-white">.G</span>
          <div className="h-1 w-0 group-hover:w-full bg-blue-500 transition-all duration-300"></div>
        </a>
        <div className="hidden md:flex space-x-8">
          {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className={`cartoon-text text-sm font-bold transition-all transform hover:scale-110 uppercase tracking-widest ${
                activeSection === item.toLowerCase() ? 'text-blue-500 scale-110 underline decoration-2 underline-offset-8' : 'text-gray-300'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <i className="fa-solid fa-ghost animate-bounce text-blue-400"></i>
        </button>
      </div>
    </nav>
  );
};

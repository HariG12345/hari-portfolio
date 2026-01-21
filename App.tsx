
import React, { useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const eyeLeftRef = useRef<HTMLDivElement>(null);
  const eyeRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 12}px`;
        cursorRef.current.style.top = `${e.clientY - 12}px`;
      }
      
      const moveX = (e.movementX || 0) * 0.3;
      const moveY = (e.movementY || 0) * 0.3;
      
      if (eyeLeftRef.current && eyeRightRef.current) {
        const x = Math.max(-3, Math.min(3, moveX));
        const y = Math.max(-3, Math.min(3, moveY));
        eyeLeftRef.current.style.transform = `translate(${x}px, ${y}px)`;
        eyeRightRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);

    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          const skillBar = entry.target.querySelector('.skill-bar-inner');
          if (skillBar) {
            const targetWidth = (skillBar as HTMLElement).dataset.width;
            (skillBar as HTMLElement).style.width = targetWidth || '0%';
          }
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const handleMouseEnter = () => cursorRef.current?.classList.add('scale-150');
    const handleMouseLeave = () => cursorRef.current?.classList.remove('scale-150');

    const interactive = document.querySelectorAll('a, button, .tilt-card');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <style>{`
        section { scroll-margin-top: 80px; }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={cursorRef} className="custom-cursor hidden md:flex transition-transform duration-200">
        <div ref={eyeLeftRef} className="cursor-eye eye-left"></div>
        <div ref={eyeRightRef} className="cursor-eye eye-right"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <Certifications />
      </main>

      <Footer />
    </div>
  );
};

export default App;

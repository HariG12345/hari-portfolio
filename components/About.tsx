
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="brand-text text-3xl md:text-7xl mb-6">About Me</h2>
          <div className="w-32 h-2 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <div className="glass p-8 rounded-[3rem] h-full border-l-8 border-blue-600 shadow-2xl">
              <h3 className="brand-text text-2xl font-bold mb-8 text-blue-400 uppercase">Mission Summary</h3>
              <p className="cartoon-text text-gray-300 text-lg leading-relaxed mb-10 font-medium">
                I am a final-year Information Technology student at Sri Krishna College of Technology, passionate about crafting seamless user experiences. My focus lies in React.js development, where I bridge the gap between complex logic and beautiful design. Driven by growth and excellence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="glass p-4 rounded-2xl border-white/5">
                  <p className="cartoon-text text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Email</p>
                  <p className="cartoon-text font-bold text-sm text-white">gthari12345@gmail.com</p>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5">
                  <p className="cartoon-text text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Phone</p>
                  <p className="cartoon-text font-bold text-sm text-white">+91 9342279728</p>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5">
                  <p className="cartoon-text text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Languages</p>
                  <p className="cartoon-text font-bold text-sm text-white">English (B1), Tamil (C1)</p>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5">
                  <p className="cartoon-text text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Location</p>
                  <p className="cartoon-text font-bold text-sm text-white">Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="space-y-8">
              <div className="glass p-8 rounded-[2.5rem] flex gap-8 items-center border-t border-white/5 hover:bg-white/5 transition-all group">
                <div className="w-20 h-20 bg-blue-600/20 rounded-[1.5rem] flex items-center justify-center text-blue-400 text-3xl group-hover:scale-110 transition-transform shadow-lg border border-blue-500/20">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <h4 className="brand-text text-xl font-bold text-white uppercase tracking-tight">B.Tech IT</h4>
                  <p className="cartoon-text text-gray-400 font-medium">Sri Krishna College of Technology (2025)</p>
                  <p className="cartoon-text text-yellow-400 font-black mt-2 bg-yellow-400/10 inline-block px-3 py-1 rounded-lg">CGPA: 6.8</p>
                </div>
              </div>

              <div className="glass p-8 rounded-[2.5rem] flex gap-8 items-center border-t border-white/5 hover:bg-white/5 transition-all group">
                <div className="w-20 h-20 bg-indigo-600/20 rounded-[1.5rem] flex items-center justify-center text-indigo-400 text-3xl group-hover:scale-110 transition-transform shadow-lg border border-indigo-500/20">
                  <i className="fa-solid fa-school"></i>
                </div>
                <div>
                  <h4 className="brand-text text-xl font-bold text-white uppercase tracking-tight">Schooling</h4>
                  <p className="cartoon-text text-gray-400 font-medium">Vidya Sikshaa Matric Hr. Sec. School</p>
                  <p className="cartoon-text text-green-400 font-black mt-2 bg-green-400/10 inline-block px-3 py-1 rounded-lg">95% in SSLC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

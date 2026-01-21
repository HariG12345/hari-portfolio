
import React from 'react';

export const Experience: React.FC = () => {
  const items = [
    {
      company: "TITA Technology",
      role: "ReactJS Front-end Development Intern",
      period: "2024 - Present",
      description: "Working on modern web architectures and optimizing performance for enterprise-level React applications. Implementing modular UI components and ensuring high responsiveness across devices."
    },
    {
      company: "SystemTron",
      role: "Web Development Intern",
      period: "2023",
      description: "Focused on building responsive layouts and integrating core JavaScript functionalities for client projects. Collaborated on frontend features using standard HTML/CSS/JS practices."
    }
  ];

  return (
    <div className="py-32 px-6 bg-gray-900/10">
      <div className="container mx-auto">
        <div className="text-center mb-24 reveal">
          <div className="inline-block px-4 py-1 glass rounded-full border border-indigo-500/30 mb-4">
             <span className="cartoon-text text-[10px] font-black text-indigo-400 uppercase tracking-widest">The Journey</span>
          </div>
          <h2 className="brand-text text-4xl md:text-8xl mb-6">Experience</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          {items.map((item, index) => (
            <div key={index} className="relative pl-12 md:pl-0 reveal group">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-[-64px] w-1 bg-gradient-to-b from-blue-600 to-transparent md:-translate-x-1/2 opacity-20"></div>
              
              <div className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full">
                  <div className="glass p-10 rounded-[3rem] hover:border-blue-500/50 transition-all transform hover:-translate-y-4 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -z-10"></div>
                    <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-blue-600 rounded-2xl text-[10px] brand-text font-black mb-6 shadow-lg uppercase tracking-widest">{item.period}</span>
                    <h3 className="brand-text text-3xl text-white mb-2 leading-tight uppercase tracking-tighter">{item.company}</h3>
                    <h4 className="cartoon-text text-blue-400 font-bold mb-6 text-lg uppercase tracking-wide">{item.role}</h4>
                    <p className="cartoon-text text-gray-400 leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-0 md:relative md:left-auto w-10 h-10 rounded-[1rem] bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.6)] z-10 flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-all duration-700 border-4 border-white/20">
                    <i className="fa-solid fa-briefcase text-white -rotate-45 group-hover:-rotate-[225deg] transition-all duration-700 text-sm"></i>
                </div>
                
                <div className="hidden md:block flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

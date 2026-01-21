
import React from 'react';

const SkillBar: React.FC<{ name: string; percent: string }> = ({ name, percent }) => (
  <div className="mb-6 reveal">
    <div className="flex justify-between mb-2">
      <span className="font-semibold text-gray-200">{name}</span>
      <span className="text-blue-400">{percent}</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 skill-bar-inner rounded-full"
        data-width={percent}
      ></div>
    </div>
  </div>
);

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-gray-900/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Programming Languages */}
          <div className="glass p-10 rounded-3xl reveal">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <i className="fa-solid fa-code text-blue-500"></i> Languages
            </h3>
            <SkillBar name="C++" percent="85%" />
            <SkillBar name="Java" percent="80%" />
            <SkillBar name="SQL" percent="75%" />
            <SkillBar name="JavaScript" percent="90%" />
          </div>

          {/* Frameworks & Tools */}
          <div className="glass p-10 rounded-3xl reveal">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <i className="fa-solid fa-layer-group text-blue-500"></i> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-4 mb-8">
              {['React JS', 'HTML5', 'CSS3', 'Tailwind', 'Git', 'AWS Cloud'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:border-blue-500 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            <SkillBar name="React JS" percent="85%" />
            <SkillBar name="Web Dev" percent="90%" />
          </div>

          {/* Soft Skills */}
          <div className="glass p-10 rounded-3xl reveal">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <i className="fa-solid fa-brain text-blue-500"></i> Soft Skills
            </h3>
            <ul className="space-y-4">
              {['Adaptability', 'Problem-solving', 'Multitasking', 'Teamwork', 'Critical Thinking'].map(skill => (
                <li key={skill} className="flex items-center gap-3 text-gray-300">
                  <i className="fa-solid fa-check-circle text-blue-500"></i>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

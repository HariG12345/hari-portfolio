
import React from 'react';

export const Certifications: React.FC = () => {
  const certs = [
    { title: "Cisco Networking Basics", provider: "Cisco", icon: "fa-network-wired" },
    { title: "Java OOP", provider: "Coursera", icon: "fa-mug-hot" },
    { title: "SQL & Django", provider: "IBM", icon: "fa-database" }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={i} className="glass p-6 rounded-2xl flex items-center gap-6 reveal transition-all hover:bg-white/5">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 text-xl">
                <i className={`fa-solid ${cert.icon}`}></i>
              </div>
              <div>
                <h4 className="font-bold">{cert.title}</h4>
                <p className="text-sm text-gray-500">{cert.provider}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

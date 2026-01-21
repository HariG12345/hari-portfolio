
import React, { useEffect, useState, useRef } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 60px rgba(59, 130, 246, 0.4)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
    cardRef.current.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;
    setIsHovered(false);
  };

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
  const randomColor = colors[repo.id % colors.length];

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('voting')) return 'fa-check-to-slot';
    if (n.includes('kawasaki')) return 'fa-motorcycle';
    if (n.includes('glossary')) return 'fa-book-atlas';
    if (n.includes('django')) return 'fa-python';
    if (n.includes('react')) return 'fa-atom';
    return 'fa-code';
  };

  return (
    <div 
      ref={cardRef}
      className="glass p-8 rounded-[3rem] reveal border-b-[10px] transition-all duration-300 flex flex-col h-full group relative overflow-hidden wiggle cursor-pointer"
      style={{ borderBottomColor: randomColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className={`absolute -top-6 -right-6 w-24 h-24 opacity-20 transition-all duration-700 ${isHovered ? 'scale-150 rotate-45' : 'scale-0'}`} style={{ color: randomColor }}>
        <i className="fa-solid fa-bolt-lightning text-7xl"></i>
      </div>
      
      <div className="flex justify-between items-start mb-8">
        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl transition-all duration-500 border-4 border-white/20 ${isHovered ? 'rotate-[-15deg] scale-110' : ''}`} 
             style={{ backgroundColor: randomColor, color: 'white' }}>
          <i className={`fa-solid ${getIcon(repo.name)}`}></i>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2 text-gray-400 text-[12px] font-black uppercase tracking-widest cartoon-text">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl"><i className="fa-solid fa-star text-yellow-400"></i>{repo.stargazers_count}</span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl"><i className="fa-solid fa-code-fork text-blue-400"></i>{repo.forks_count}</span>
          </div>
          {repo.language && (
            <span className="text-[10px] font-black px-3 py-1 bg-white/10 rounded-full cartoon-text text-white uppercase tracking-tighter">
              {repo.language}
            </span>
          )}
        </div>
      </div>

      <h3 className="brand-text text-2xl mb-4 group-hover:text-white transition-colors uppercase leading-none tracking-tighter">
        {repo.name.split('-').join(' ')}
      </h3>
      
      <p className="cartoon-text text-gray-400 text-sm mb-8 line-clamp-4 flex-grow leading-relaxed font-medium">
        {repo.description || "A high-performance digital solution crafted with precision. Check out the source code to explore the internal architecture! 🚀"}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {repo.topics?.length ? repo.topics.slice(0, 3).map(topic => (
          <span key={topic} className="text-[10px] font-black px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-2xl cartoon-text border border-blue-500/20 uppercase tracking-widest">
            {topic}
          </span>
        )) : (
          <span className="text-[10px] font-black px-4 py-1.5 bg-white/5 text-gray-500 rounded-2xl cartoon-text uppercase tracking-widest">
            DEVELOPMENT
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="py-4 rounded-[1.5rem] bg-white/5 hover:bg-white hover:text-black transition-all text-center text-[12px] font-black brand-text flex items-center justify-center gap-3 group/btn border border-white/10"
        >
          <i className="fa-brands fa-github text-lg group-hover/btn:scale-125 transition-transform"></i> GITHUB
        </a>
        <a 
          href={`${repo.html_url}/tree/main`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="py-4 rounded-[1.5rem] bg-blue-600 hover:bg-yellow-400 hover:text-black transition-all text-center text-[12px] font-black brand-text flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40"
        >
          <i className="fa-solid fa-file-code text-lg"></i> SOURCE
        </a>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    fetch('https://api.github.com/users/HariG12345/repos?sort=updated&direction=desc&per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count);
          setRepos(sorted);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="py-32 px-6 relative overflow-hidden">
      {/* Parallax Decor */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full transition-transform duration-100 ease-out"
        style={{ transform: `translate(${scrollY * 0.15}px, ${-scrollY * 0.05}px)` }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full transition-transform duration-100 ease-out"
        style={{ transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.08}px)` }}
      ></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24 reveal">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-blue-500/40 mb-8 hover:scale-105 transition-transform">
             <i className="fa-solid fa-code-branch text-blue-400 text-xl animate-pulse"></i>
             <span className="cartoon-text text-[14px] font-black text-blue-400 uppercase tracking-[0.2em]">
               The Repository Lab
             </span>
          </div>
          <h2 className="brand-text text-5xl md:text-9xl mb-8 tracking-tighter leading-none">PROJECTS & CODE</h2>
          <p className="cartoon-text text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Every repository here tells a story. From late-night debugging sessions to the satisfying click of a successful deployment.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-10">
             <div className="w-32 h-32 relative">
                <div className="absolute inset-0 border-[10px] border-blue-600/10 rounded-full"></div>
                <div className="absolute inset-0 border-[10px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-6xl text-blue-400">
                   <i className="fa-solid fa-ghost animate-bounce"></i>
                </div>
             </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}

        <div className="mt-32 text-center reveal">
          <div className="glass p-16 rounded-[5rem] inline-block border-white/10 group relative">
            <h4 className="cartoon-text text-gray-400 font-bold mb-8 uppercase tracking-[0.4em] text-xs">Full Project History</h4>
            <a 
              href="https://github.com/HariG12345" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-16 py-8 bg-white text-black rounded-[2rem] brand-text text-xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-4 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden"
            >
              <span className="relative z-10">OPEN MY GITHUB HQ</span>
              <i className="fa-brands fa-github text-4xl group-hover:rotate-[360deg] transition-transform duration-1000 relative z-10"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

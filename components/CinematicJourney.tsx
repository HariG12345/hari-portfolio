import React, { useEffect, useMemo, useState } from 'react';

type Chapter = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  narration: string;
  facts: string[];
};

const chapters: Chapter[] = [
  {
    id: 'intro', number: '01', eyebrow: 'THE BEGINNING', title: 'Hello, I’m Hari.',
    subtitle: 'A curious mind building useful digital experiences.',
    location: 'Coimbatore, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85',
    narration: 'Hello! I am Hari G, an Information Technology graduate from Sri Krishna College of Technology in Coimbatore. I enjoy turning ideas into practical digital experiences and I am especially interested in frontend and full stack development.',
    facts: ['B.Tech Information Technology', 'Sri Krishna College of Technology', 'Graduated in 2026']
  },
  {
    id: 'studio', number: '02', eyebrow: 'THE WORKSPACE', title: 'Where ideas become interfaces.',
    subtitle: 'I enjoy crafting clean, responsive experiences with modern web technologies.',
    location: 'Developer workspace',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=85',
    narration: 'My core web development skills include React, TypeScript, JavaScript, HTML, CSS and Tailwind CSS. I also work with Java, SQL and REST APIs, and I use Git and GitHub to manage code and collaborate.',
    facts: ['React · TypeScript · JavaScript', 'HTML · CSS · Tailwind CSS', 'Java · SQL · REST APIs · Git']
  },
  {
    id: 'projects', number: '03', eyebrow: 'THE PROJECT FIELD', title: 'Technology with a purpose.',
    subtitle: 'From digital participation to smarter agriculture.',
    location: 'Smart agriculture research field',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85',
    narration: 'One project I worked on is a Community Digital Voting System using React, Tailwind CSS and Framer Motion, with voting, proposal management and analytics. My final year research project explores IoT-enabled crop yield prediction and soil nutrient recommendations using machine learning.',
    facts: ['Community Digital Voting System', 'Smart Crop & Yield Prediction', 'Python · Random Forest · IoT concepts']
  },
  {
    id: 'experience', number: '04', eyebrow: 'THE FIRST EXPERIENCE', title: 'Learning by building.',
    subtitle: 'A first step into professional frontend development.',
    location: 'TITA Technologies · Madurai',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85',
    narration: 'I completed a frontend development internship at TITA Technologies in Madurai, from 18 June to 18 July 2024. During this experience I focused on ReactJS and strengthened my understanding of building user interfaces.',
    facts: ['Frontend Developer Intern', 'TITA Technologies · Madurai', '18 June – 18 July 2024']
  },
  {
    id: 'interview', number: '05', eyebrow: 'THE NEXT CHAPTER', title: 'Let’s talk technology.',
    subtitle: 'Step into the interview room and ask me about my journey.',
    location: 'The interview room',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85',
    narration: 'Thank you for exploring my journey. I am looking forward to opportunities where I can keep learning, contribute to a team and build reliable software. You can now explore a few interview questions or contact me directly.',
    facts: ['Open to entry-level opportunities', 'Interested in frontend and full stack roles', 'Let’s connect']
  }
];

const interview = [
  { q: 'Tell me about yourself.', a: 'I’m Hari G, an Information Technology graduate from Sri Krishna College of Technology. I enjoy frontend development and building practical applications with React. I have also explored Java, SQL, REST APIs and machine learning through academic projects.' },
  { q: 'Explain your Community Digital Voting System.', a: 'It is a web application concept built with React, Tailwind CSS and Framer Motion. It focuses on digital voting, proposal management and analytics, with an emphasis on a clear and responsive user experience.' },
  { q: 'Tell me about your final-year project.', a: 'My final-year project is Smart Crop and Yield Prediction Based on Soil Quality Using Machine Learning. It explores soil nutrient inputs and environmental factors to predict suitable crops and estimate yield, using Random Forest models and an IoT-enabled concept.' },
  { q: 'What did you learn during your internship?', a: 'During my ReactJS frontend internship at TITA Technologies, I gained exposure to frontend development workflows and improved my understanding of building user interfaces with React.' },
  { q: 'What are your strengths as a fresher?', a: 'I am curious, willing to learn and comfortable exploring new tools. I like breaking a problem into smaller steps, building a working solution and improving it through feedback.' },
  { q: 'What role are you looking for?', a: 'I am interested in entry-level software development roles, especially frontend or full-stack opportunities where I can contribute with React and continue strengthening my engineering fundamentals.' }
];

export const CinematicJourney: React.FC = () => {
  const [active, setActive] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [question, setQuestion] = useState(0);
  const [avatarPhoto, setAvatarPhoto] = useState('https://avatars.githubusercontent.com/u/125337022?v=4');
  const chapter = chapters[active];

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.94;
    utterance.pitch = 0.96;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.toLowerCase() === 'en-in') || voices.find(v => v.lang.toLowerCase().startsWith('en'));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (voiceOn) speak(chapters[active].narration);
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeaking(false);
    };
  }, [active, voiceOn]);

  useEffect(() => {
    const updateFromScroll = () => {
      const markers = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter-marker]'));
      if (!markers.length) return;
      const marker = markers.reduce((best, el) => {
        const distance = Math.abs(el.getBoundingClientRect().top - window.innerHeight * 0.42);
        return distance < Math.abs(best.getBoundingClientRect().top - window.innerHeight * 0.42) ? el : best;
      }, markers[0]);
      const index = Number(marker.dataset.chapterMarker);
      if (Number.isFinite(index)) {
        setActive(index);
        setShowInterview(index === 4);
      }
    };
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    updateFromScroll();
    return () => window.removeEventListener('scroll', updateFromScroll);
  }, []);

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const go = (index: number) => {
    setActive(Math.max(0, Math.min(chapters.length - 1, index)));
    setShowInterview(index === 4);
  };

  const currentQuestion = interview[question];

  return (
    <div className="journey-shell">
      <style>{styles}
/* Scroll-led cinematic chapters: each viewport is a chapter trigger while the scene stays pinned. */
.journey-scroll-track{position:relative;z-index:0;margin-top:0;pointer-events:none}
.journey-scroll-marker{height:100vh;max-height:980px;min-height:780px}
.journey-scene{z-index:1}
.chapter-intro .avatar-card{animation:campusWalk 1.2s ease both,avatarFloat 6s ease-in-out 1.2s infinite}
.chapter-studio .avatar-card{animation:studioMove 1s ease both,avatarFloat 6s ease-in-out 1s infinite}
.chapter-projects .avatar-card{animation:projectMove 1s ease both,avatarFloat 6s ease-in-out 1s infinite}
.chapter-experience .avatar-card{animation:experienceMove 1s ease both,avatarFloat 6s ease-in-out 1s infinite}
.chapter-interview .avatar-card{animation:interviewMove 1s ease both,avatarFloat 6s ease-in-out 1s infinite}
@keyframes campusWalk{0%{transform:translate3d(80px,30px,0) rotateY(-28deg) scale(.92);opacity:.5}100%{transform:translate3d(0,0,0) rotateY(-12deg) scale(1);opacity:1}}
@keyframes studioMove{0%{transform:translate3d(0,55px,0) rotateY(20deg) scale(.9)}100%{transform:translate3d(0,0,0) rotateY(-8deg) scale(1)}}
@keyframes projectMove{0%{transform:translate3d(-65px,15px,0) rotateY(25deg)}100%{transform:translate3d(0,0,0) rotateY(-12deg)}}
@keyframes experienceMove{0%{transform:translate3d(65px,0,0) rotateY(-25deg)}100%{transform:translate3d(0,0,0) rotateY(-12deg)}}
@keyframes interviewMove{0%{transform:translate3d(0,65px,0) rotateY(0) scale(.94)}100%{transform:translate3d(0,0,0) rotateY(-12deg) scale(1)}}
@media(max-width:800px){.journey-scene{position:relative;top:auto;margin-bottom:0;height:auto;min-height:780px}.journey-scroll-track{display:none}}
</style>
      <div className="journey-grain" />
      <header className="journey-nav">
        <a className="journey-logo" href="#journey-top">HARI<span>.G</span></a>
        <div className="journey-nav-right">
          <span className="journey-location"><i /> {chapter.location}</span>
          <button className="journey-sound" onClick={() => { setVoiceOn(v => !v); if (voiceOn && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }} aria-label="Toggle narration">
            {voiceOn ? 'VOICE ON' : 'VOICE OFF'} <span>{voiceOn ? '◖))' : '×'}</span>
          </button>
        </div>
      </header>

      <main id="journey-top">
        <section className={`journey-scene chapter-${chapter.id}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(3,8,19,.94) 0%, rgba(3,8,19,.74) 46%, rgba(3,8,19,.22) 100%), linear-gradient(0deg, rgba(3,8,19,.88), transparent 50%), url(${chapter.image})` }}>
          <div className="scene-vignette" />
          <div className="scene-copy" key={chapter.id}>
            <div className="scene-eyebrow"><span>{chapter.number}</span> / {chapter.eyebrow}</div>
            <h1>{chapter.title}</h1>
            <p className="scene-subtitle">{chapter.subtitle}</p>
            <div className="scene-rule" />
            <div className="scene-facts">
              {chapter.facts.map((fact, i) => <div className="scene-fact" key={fact}><span>0{i + 1}</span>{fact}</div>)}
            </div>
            <div className="scene-actions">
              <button className="journey-primary" onClick={() => active === 4 ? setShowInterview(v => !v) : go(active + 1)}>
                {active === 4 ? (showInterview ? 'CLOSE INTERVIEW' : 'ENTER INTERVIEW ROOM') : 'CONTINUE JOURNEY'} <b>↗</b>
              </button>
              <button className="journey-text-button" onClick={() => speak(chapter.narration)} disabled={!voiceOn}>↻ REPLAY INTRO</button>
            </div>
          </div>

          <div className="avatar-stage" aria-label="Hari avatar portrait">
            <div className="avatar-orbit orbit-one" /><div className="avatar-orbit orbit-two" />
            <div className="avatar-platform"><span>HARI G</span></div>
            <div className="avatar-card">
              <div className="avatar-light" />
              <img src={avatarPhoto} alt="Hari avatar reference" />
              <div className="avatar-card-caption"><span>YOUR GUIDE</span><strong>HARI G.</strong><small>DEVELOPER · CREATOR</small></div>
            </div>
            <div className="avatar-side-label">A PERSONAL JOURNEY <span>✳</span></div>
          </div>

          <div className="scene-bottom">
            <div className="scene-counter"><strong>{chapter.number}</strong><span> / 05</span></div>
            <div className="scene-progress">{chapters.map((c, i) => <button key={c.id} className={i === active ? 'active' : ''} onClick={() => go(i)} aria-label={`Go to ${c.eyebrow}`} />)}</div>
            <div className="scene-scroll-hint">EXPLORE THE STORY <span>↓</span></div>
          </div>
        </section>
        <div className="journey-scroll-track" aria-hidden="true">
          {chapters.map((c, i) => <div className="journey-scroll-marker" data-chapter-marker={i} key={c.id} />)}
        </div>

        <section className="chapter-strip">
          <div className="chapter-strip-heading"><span>THE ROUTE</span><p>Five stops. One story.</p></div>
          <div className="chapter-stops">{chapters.map((c, i) => <button key={c.id} onClick={() => go(i)} className={active === i ? 'selected' : ''}><span>{c.number}</span><strong>{c.eyebrow}</strong></button>)}</div>
        </section>

        {active === 4 && showInterview && (
          <section className="interview-section">
            <div className="interview-heading"><span>THE FINAL STOP · INTERACTIVE Q&A</span><h2>Inside the interview room.</h2><p>Choose a question to explore how Hari talks about his skills, projects and goals.</p></div>
            <div className="interview-layout">
              <div className="interview-questions">{interview.map((item, i) => <button key={item.q} className={question === i ? 'chosen' : ''} onClick={() => setQuestion(i)}><span>0{i + 1}</span>{item.q}<b>↗</b></button>)}</div>
              <article className="interview-answer"><div className="answer-label">HARI’S RESPONSE</div><h3>{currentQuestion.q}</h3><p>{currentQuestion.a}</p><button onClick={() => speak(currentQuestion.a)} className="answer-speak">▶ LISTEN TO ANSWER</button></article>
            </div>
          </section>
        )}
      </main>

      <footer className="journey-footer">
        <div><span>READY FOR THE NEXT CHAPTER?</span><h2>Let’s build something<br/><em>meaningful.</em></h2></div>
        <div className="footer-links"><a href="mailto:gthari12345@gmail.com">EMAIL ME ↗</a><a href="https://github.com/HariG12345" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/hari-g-818547258/" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>
        <small>© 2026 HARI G. · DESIGNED AS A JOURNEY.</small>
      </footer>
    </div>
  );
};

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap');
.journey-shell{--ink:#eaf0f7;--muted:#a9b4c3;--blue:#74baff;background:#050a13;color:var(--ink);min-height:100vh;font-family:Manrope,Arial,sans-serif;overflow:hidden}.journey-grain{position:fixed;inset:0;z-index:20;pointer-events:none;opacity:.055;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")}.journey-nav{height:82px;position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:0 6vw;border-bottom:1px solid #ffffff18;background:linear-gradient(180deg,#050a13a8,transparent)}.journey-logo{font-size:20px;font-weight:800;letter-spacing:.16em;color:white;text-decoration:none}.journey-logo span{color:var(--blue)}.journey-nav-right{display:flex;gap:30px;align-items:center}.journey-location,.journey-sound{font:10px 'DM Mono',monospace;letter-spacing:.12em;color:#d1dbe8}.journey-location i{display:inline-block;width:7px;height:7px;background:#73d6ac;border-radius:50%;margin-right:9px;box-shadow:0 0 12px #73d6ac}.journey-sound{border:1px solid #ffffff36;border-radius:30px;padding:10px 14px;background:#07111f99;cursor:pointer}.journey-sound span{color:var(--blue);margin-left:8px}.journey-scene{min-height:780px;height:100vh;max-height:980px;position:sticky;top:0;margin-bottom:-100vh;background-size:cover;background-position:center;display:flex;align-items:center;padding:110px 8vw 100px;isolation:isolate;transition:background-image .6s ease}.scene-vignette{position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 74% 48%,transparent 0%,#03081335 58%,#030813a8 100%)}.scene-copy{max-width:610px;position:relative;z-index:2;animation:copyIn .8s ease both}.scene-eyebrow,.chapter-strip-heading span,.interview-heading>span,.journey-footer>div>span{font:11px 'DM Mono',monospace;letter-spacing:.22em;color:#9bcfff}.scene-eyebrow span{color:#fff;margin-right:8px}.scene-copy h1{font-size:clamp(48px,7.3vw,104px);line-height:.98;letter-spacing:-.075em;margin:30px 0 20px;font-weight:700;max-width:720px}.scene-subtitle{font-size:clamp(16px,1.5vw,20px);line-height:1.7;color:#d1dbe6;max-width:470px}.scene-rule{width:72px;height:1px;background:#7ebfff;margin:35px 0 24px}.scene-facts{display:grid;gap:12px}.scene-fact{font-size:13px;color:#e0e8f2;display:flex;align-items:center;gap:15px}.scene-fact span{font:10px 'DM Mono',monospace;color:#79baff}.scene-actions{display:flex;gap:25px;align-items:center;margin-top:38px;flex-wrap:wrap}.journey-primary{border:0;background:#eaf3fc;color:#081321;padding:16px 21px;font:700 10px 'DM Mono',monospace;letter-spacing:.13em;cursor:pointer;transition:.25s}.journey-primary:hover{background:#83c4ff;transform:translateY(-3px)}.journey-primary b{font-size:16px;margin-left:18px}.journey-text-button{background:none;border:0;color:#c4d0df;font:10px 'DM Mono',monospace;letter-spacing:.13em;cursor:pointer}.journey-text-button:disabled{opacity:.35}.avatar-stage{position:absolute;right:10vw;top:50%;transform:translateY(-45%);width:min(32vw,410px);height:500px;display:flex;align-items:center;justify-content:center;z-index:1;perspective:1200px}.avatar-card{width:260px;height:355px;position:relative;transform:rotateY(-12deg) rotateX(3deg);border:1px solid #c4e4ff70;background:linear-gradient(145deg,#a6d6ff30,#071321cc 65%);box-shadow:0 35px 100px #0009,0 0 60px #6dbaff24;backdrop-filter:blur(12px);padding:10px;animation:avatarFloat 6s ease-in-out infinite}.avatar-card:before{content:'';position:absolute;inset:6px;border:1px solid #ffffff30;pointer-events:none}.avatar-card img{width:100%;height:100%;object-fit:cover;filter:saturate(.8) contrast(1.04)}.avatar-light{position:absolute;z-index:2;inset:0;background:linear-gradient(120deg,#ffffff55,transparent 35%,transparent 70%,#80c4ff28);pointer-events:none}.avatar-card-caption{position:absolute;bottom:20px;left:22px;display:grid;gap:5px;text-shadow:0 2px 8px #000}.avatar-card-caption span,.avatar-card-caption small{font:9px 'DM Mono',monospace;letter-spacing:.2em;color:#d1e7ff}.avatar-card-caption strong{font-size:22px;letter-spacing:.08em}.avatar-orbit{position:absolute;width:390px;height:110px;border:1px solid #a9d9ff50;border-radius:50%;transform:rotate(-25deg);box-shadow:0 0 30px #77bfff1c}.orbit-two{width:350px;height:145px;transform:rotate(38deg);border-color:#ffffff26}.avatar-platform{position:absolute;bottom:25px;width:300px;height:40px;border-radius:50%;background:radial-gradient(ellipse,#80c6ff55,#0a1b2c00 70%);border-bottom:1px solid #9dd6ff88;display:flex;align-items:flex-end;justify-content:center;padding-bottom:3px}.avatar-platform span{font:9px 'DM Mono',monospace;letter-spacing:.35em;color:#b9dcfa}.avatar-side-label{position:absolute;right:-55px;top:50%;writing-mode:vertical-rl;font:9px 'DM Mono',monospace;letter-spacing:.2em;color:#c2d3e5}.avatar-side-label span{color:#81c2ff;margin-top:10px}.scene-bottom{position:absolute;bottom:35px;left:8vw;right:8vw;display:flex;align-items:center;gap:35px;z-index:3}.scene-counter{font:11px 'DM Mono',monospace;color:#9eacbd}.scene-counter strong{font-size:18px;color:#fff}.scene-progress{display:flex;gap:7px;flex:1}.scene-progress button{height:2px;max-width:85px;flex:1;border:0;background:#ffffff40;cursor:pointer}.scene-progress button.active{height:3px;background:#8ccaff;box-shadow:0 0 12px #7dbfff}.scene-scroll-hint{font:9px 'DM Mono',monospace;letter-spacing:.15em;color:#b8c6d6}.scene-scroll-hint span{color:#8ccaff;font-size:15px;margin-left:10px}.chapter-strip{padding:40px 8vw 48px;display:flex;align-items:center;gap:70px;background:#08111e;border-bottom:1px solid #ffffff12}.chapter-strip-heading{min-width:170px}.chapter-strip-heading p{font:17px 'Playfair Display',serif;color:#e5edf6;margin:8px 0 0}.chapter-stops{display:flex;flex:1;justify-content:space-between;gap:12px}.chapter-stops button{display:flex;align-items:center;gap:10px;background:none;border:0;color:#75869b;cursor:pointer;font:9px 'DM Mono',monospace;letter-spacing:.1em;padding:10px 0;text-align:left}.chapter-stops button span{color:#5f7791}.chapter-stops button.selected,.chapter-stops button:hover{color:#e8f4ff}.chapter-stops button.selected span{color:#8bc8ff}.interview-section{padding:100px 8vw 110px;background:linear-gradient(145deg,#0a1828,#050a13)}.interview-heading{max-width:720px;margin-bottom:45px}.interview-heading h2,.journey-footer h2{font-size:clamp(36px,5vw,64px);letter-spacing:-.06em;line-height:1.05;margin:20px 0}.interview-heading p{color:var(--muted);line-height:1.7}.interview-layout{display:grid;grid-template-columns:minmax(260px,.85fr) 1.15fr;gap:25px;max-width:1100px}.interview-questions{display:grid;gap:8px}.interview-questions button{display:flex;align-items:center;gap:13px;text-align:left;padding:18px;background:#ffffff08;border:1px solid #ffffff14;color:#cbd8e7;font:12px Manrope,sans-serif;cursor:pointer}.interview-questions button span{font:10px 'DM Mono',monospace;color:#80bfff}.interview-questions button b{margin-left:auto;color:#80bfff}.interview-questions button.chosen{background:#7dbfff18;border-color:#80bfff80;color:white}.interview-answer{padding:35px;background:linear-gradient(140deg,#142a40,#091321);border:1px solid #8dcaff35;min-height:270px}.answer-label{font:10px 'DM Mono',monospace;letter-spacing:.2em;color:#8ccaff}.interview-answer h3{font-size:24px;letter-spacing:-.04em;margin:25px 0 15px}.interview-answer p{color:#c2cfde;line-height:1.8;font-size:14px}.answer-speak{margin-top:22px;border:0;background:none;color:#8fcaff;font:10px 'DM Mono',monospace;letter-spacing:.13em;cursor:pointer}.journey-footer{padding:85px 8vw 30px;display:grid;grid-template-columns:1fr auto;gap:30px;background:#03070d}.journey-footer h2{font-family:'Playfair Display',serif;font-weight:500}.journey-footer h2 em{color:#8fcaff}.footer-links{display:flex;flex-direction:column;gap:17px;justify-content:center}.footer-links a{color:#d5e3f1;text-decoration:none;font:10px 'DM Mono',monospace;letter-spacing:.15em}.footer-links a:hover{color:#8bcaff}.journey-footer>small{grid-column:1/-1;border-top:1px solid #ffffff18;padding-top:25px;color:#6f8093;font:9px 'DM Mono',monospace;letter-spacing:.13em}
@keyframes copyIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}@keyframes avatarFloat{0%,100%{transform:translateY(0) rotateY(-12deg) rotateX(3deg)}50%{transform:translateY(-13px) rotateY(-7deg) rotateX(1deg)}}
@media(max-width:900px){.journey-scene{min-height:850px;height:auto;padding:140px 7vw 125px;align-items:flex-start}.scene-copy{max-width:580px}.avatar-stage{right:2vw;top:auto;bottom:65px;transform:scale(.7);transform-origin:bottom right;opacity:.72}.scene-copy{z-index:3}.chapter-strip{display:block}.chapter-strip-heading{margin-bottom:22px}.chapter-stops{overflow-x:auto;justify-content:flex-start}.chapter-stops button{min-width:150px}.interview-layout{grid-template-columns:1fr}.journey-footer{grid-template-columns:1fr}.footer-links{flex-direction:row;flex-wrap:wrap}.journey-footer>small{grid-column:auto}}
@media(max-width:560px){.journey-nav{height:68px;padding:0 5vw}.journey-location{display:none}.journey-scene{padding:125px 6vw 170px;min-height:900px}.scene-copy h1{font-size:54px}.scene-subtitle{max-width:330px}.scene-facts{max-width:300px}.avatar-stage{right:-20px;bottom:52px;transform:scale(.55);opacity:.58}.scene-bottom{left:6vw;right:6vw;bottom:24px;gap:14px}.scene-scroll-hint{display:none}.chapter-strip{padding:32px 6vw}.interview-section{padding:70px 6vw}.interview-answer{padding:24px}.journey-footer{padding:65px 6vw 25px}}
@media(prefers-reduced-motion:reduce){.journey-shell *{animation:none!important;scroll-behavior:auto!important;transition:none!important}}
`;

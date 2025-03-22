
import React, { useEffect, useRef } from 'react';
import { Code, Database, Palette } from 'lucide-react';

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
        }
      },
      { threshold: 0.1 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const languages = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'SQL', level: 65 },
    { name: 'Java', level: 60 },
  ];

  const expertise = [
    {
      title: 'Front-End',
      icon: <Code size={24} />,
      skills: ['React.js', 'Next.js', 'Vue.js', 'HTML5/CSS3', 'JavaScript', 'Responsive Design', 'Tailwind CSS']
    },
    {
      title: 'Back-End',
      icon: <Database size={24} />,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'API Development', 'Authentication', 'SQL Databases']
    },
    {
      title: 'UI/UX Design',
      icon: <Palette size={24} />,
      skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research', 'Interaction Design', 'Visual Design']
    }
  ];

  return (
    <section 
      id="skills" 
      ref={skillsRef}
      className="py-20 transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="gradient-text mb-6">My Skills</h2>
          <div className="w-20 h-1 bg-primary1 mx-auto mb-8"></div>
          <p className="text-lg text-white/80">
            I've developed a diverse skill set that enables me to create comprehensive web solutions, 
            from designing intuitive interfaces to implementing robust backend functionality.
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Languages */}
          <div className="animate-fade-in animate-delay-100">
            <h3 className="text-2xl font-bold mb-8 text-center text-primary1">Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languages.map((language, index) => (
                <div key={index} className="glass p-6 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-primary1">{language.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary1 to-primary2 rounded-full transform origin-left transition-transform duration-1000 scale-x-0"
                      style={{ transform: `scaleX(${language.level / 100})` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expertise */}
          <div className="animate-fade-in animate-delay-200">
            <h3 className="text-2xl font-bold mb-8 text-center text-primary1">Areas of Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {expertise.map((area, index) => (
                <div 
                  key={index} 
                  className="glass p-8 rounded-xl hover:translate-y-[-8px] transition-transform duration-300"
                >
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-6 mx-auto text-primary1">
                    {area.icon}
                  </div>
                  <h4 className="text-xl font-bold text-center mb-6">{area.title}</h4>
                  <ul className="space-y-3">
                    {area.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary1 mr-3"></div>
                        <span className="text-white/80">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

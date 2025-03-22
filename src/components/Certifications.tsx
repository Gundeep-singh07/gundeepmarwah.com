
import React, { useEffect, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credential: string;
  skills: string[];
}

const Certifications: React.FC = () => {
  const certRef = useRef<HTMLDivElement>(null);
  
  // Sample certifications data (replace with your actual certifications)
  const certifications: Certification[] = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      issuer: "Udemy",
      date: "October 2022",
      credential: "UC-12345",
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      id: 2,
      title: "React.js - The Complete Guide",
      issuer: "Coursera",
      date: "January 2023",
      credential: "CERT-5678",
      skills: ["React.js", "Redux", "Hooks", "React Router"]
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      issuer: "Google",
      date: "March 2023",
      credential: "GGL-9012",
      skills: ["UI Design", "User Research", "Prototyping", "Figma"]
    },
    {
      id: 4,
      title: "Full Stack JavaScript",
      issuer: "freeCodeCamp",
      date: "May 2023",
      credential: "FCC-3456",
      skills: ["Node.js", "Express", "MongoDB", "Authentication"]
    },
  ];
  
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
    
    if (certRef.current) {
      observer.observe(certRef.current);
    }
    
    return () => {
      if (certRef.current) {
        observer.unobserve(certRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="certifications" 
      ref={certRef}
      className="py-20 transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="gradient-text mb-6">Licenses & Certifications</h2>
          <div className="w-20 h-1 bg-primary1 mx-auto mb-8"></div>
          <p className="text-lg text-white/80">
            I'm committed to continuous learning and skill development. 
            These certifications represent my dedication to mastering the latest technologies and best practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className="glass p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary1">
                    <Award size={24} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                  <p className="text-primary1 mb-2">{cert.issuer}</p>
                  <p className="text-sm text-white/70 mb-4">Issued: {cert.date} • Credential: {cert.credential}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href="#"
                    className="inline-flex items-center text-sm text-primary1 hover:text-primary2 transition-colors"
                  >
                    <span className="mr-1">View Certificate</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

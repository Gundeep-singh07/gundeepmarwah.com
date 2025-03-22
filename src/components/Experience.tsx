
import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experienceRef = useRef<HTMLDivElement>(null);
  
  // Sample experience data (replace with your actual experience)
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      position: "Frontend Developer Intern",
      company: "Tech Innovations Ltd",
      location: "Remote",
      period: "Jun 2023 - Aug 2023",
      description: [
        "Developed responsive user interfaces using React.js and Tailwind CSS",
        "Collaborated with the design team to implement pixel-perfect UI components",
        "Optimized website performance, improving load times by 25%",
        "Participated in code reviews and implemented feedback from senior developers"
      ],
      technologies: ["React", "JavaScript", "Tailwind CSS", "Git"]
    },
    {
      id: 2,
      position: "Freelance Web Developer",
      company: "Self-employed",
      location: "Remote",
      period: "Jan 2023 - Present",
      description: [
        "Designed and developed custom websites for small businesses and individuals",
        "Created responsive layouts and implemented modern design principles",
        "Managed client relationships and provided ongoing support and maintenance",
        "Delivered projects on time and within budget constraints"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "Figma"]
    },
    {
      id: 3,
      position: "Web Development Teaching Assistant",
      company: "CodeCamp Academy",
      location: "Bangalore, India",
      period: "Sep 2022 - Dec 2022",
      description: [
        "Assisted students in understanding fundamental web development concepts",
        "Provided code reviews and debugging assistance for student projects",
        "Facilitated lab sessions covering HTML, CSS, and basic JavaScript",
        "Created supplementary learning materials to aid student comprehension"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Teaching", "Mentoring"]
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
    
    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }
    
    return () => {
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={experienceRef}
      className="py-20 transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="gradient-text mb-6">Work Experience</h2>
          <div className="w-20 h-1 bg-primary1 mx-auto mb-8"></div>
          <p className="text-lg text-white/80">
            My professional journey has equipped me with practical skills and industry experience, 
            allowing me to approach projects with confidence and expertise.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary1/30 transform md:translate-x-[-0.5px]"></div>
          
          {experiences.map((experience, index) => (
            <div 
              key={experience.id} 
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-12 md:ml-auto md:mr-[50%]' : 'md:pl-12 md:mr-auto md:ml-[50%]'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Timeline dot */}
              <div className={`absolute top-6 ${
                index % 2 === 0 ? 'md:-right-3 left-0 md:left-auto' : 'md:-left-3 left-0'
              } w-6 h-6 rounded-full bg-primary1 border-4 border-background z-10`}></div>
              
              <div className="glass p-6 rounded-xl ml-8 md:ml-0">
                <h3 className="text-xl font-bold mb-1">{experience.position}</h3>
                <h4 className="text-lg font-medium text-primary1 mb-3">{experience.company}</h4>
                
                <div className="flex flex-wrap text-sm text-white/70 mb-4">
                  <div className="flex items-center mr-4 mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{experience.location}</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {experience.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary1 mt-2 mr-2"></div>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Plus } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const Work: React.FC = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState(3);

  // Sample projects data (replace with your actual projects)
  const allProjects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Website",
      description:
        "A fully responsive e-commerce website built with React and Node.js, featuring product listings, cart functionality, and payment integration.",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 2,
      title: "Portfolio Template",
      description:
        "A customizable portfolio template for developers, featuring smooth animations and a modern design.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      tags: ["HTML", "CSS", "JavaScript", "GSAP"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "A productivity app that helps users manage tasks, set priorities, and track progress with intuitive UI.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Firebase", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description:
        "A weather application that displays current conditions and forecasts based on user location or search.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      tags: ["JavaScript", "API Integration", "CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 5,
      title: "Chat Application",
      description:
        "Real-time chat application with private messaging, group chats, and file sharing capabilities.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Socket.io", "Express", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description:
        "An application to track workouts, set fitness goals, and monitor progress over time.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      tags: ["React Native", "Firebase", "Charts.js"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0");
        }
      },
      { threshold: 0.1 }
    );

    if (workRef.current) {
      observer.observe(workRef.current);
    }

    return () => {
      if (workRef.current) {
        observer.unobserve(workRef.current);
      }
    };
  }, []);

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, allProjects.length));
  };

  const displayedProjects = allProjects.slice(0, visibleProjects);

  return (
    <section
      id="work"
      ref={workRef}
      className="py-20 transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="gradient-text mb-6">My Work</h2>
          <div className="w-20 h-1 bg-primary1 mx-auto mb-8"></div>
          <p className="text-lg text-white/80">
            Check out some of my recent projects. Each project represents my
            dedication to creating functional, beautiful, and user-friendly web
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass rounded-xl overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4 transition-opacity duration-300">
                  <a
                    href={project.githubUrl}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary1 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.liveUrl}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary1 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < allProjects.length && (
          <div className="flex justify-center mt-12">
            <button onClick={loadMoreProjects} className="btn-secondary group">
              <Plus size={18} className="mr-2" />
              View More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;

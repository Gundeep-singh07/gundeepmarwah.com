import React, { useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

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

  // Updated experience data with provided information
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      position: "Full Stack Developer",
      company: "Whalesbook",
      location: "Delhi, India",
      period: "Jan 2025 - Present",
      description: [
        "Currently working as a full stack developer",
        "Working with modern web technologies and frameworks",
        "Collaborating with team members to deliver high-quality solutions",
      ],
      technologies: ["React", "NodeJS", "MongoDB", "ExpressJS"],
    },
    {
      id: 2,
      position: "Student Trainee (AI/ML)",
      company: "Intel Corporation",
      location: "Delhi, India · On-site",
      period: "Sep 2024 - Present · 7 mos",
      description: [
        "I'm selected as a student trainee for first year bca students by intel.",
        "Learned machine learning concepts in real-world scenarios by experts.",
      ],
      technologies: ["AI", "Machine Learning", "Python"],
    },
    {
      id: 3,
      position: "Member",
      company: "Under 25 Universe",
      location: "Delhi, India · On-site",
      period: "Sep 2024 - Present · 7 mos",
      description: [
        "Active member of the Under 25 Universe community.",
        "Participated in various community events and U25 summit.",
        "Collaborated with other members on creative projects.",
        "Was the part of TL team in the main summit.",
      ],
      technologies: ["Networking", "Community Building", "Event Management"],
    },
    {
      id: 4,
      position: "Team Lead",
      company: "Cranberri",
      location: "Delhi, India · Remote",
      period: "Nov 2024 - Dec 2024 · 2 mos",
      description: [
        "Led a team of developers working on web applications.",
        "Managed project timelines and deliverables.",
        "Created and deployed Cranberri's official website.",
      ],
      technologies: [
        "MERN-STACK",
        "Leadership",
        "Project Management",
        "Team Coordination",
      ],
    },
    {
      id: 5,
      position: "Intern",
      company: "CoderOne",
      location: "Delhi, India · Remote",
      period: "Nov 2024 - Jan 2025 · 3 mos",
      description: [
        "Worked on web development projects as an intern",
        "Implemented responsive designs and user interfaces",
        "Collaborated with senior developers to improve coding skills",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Git"],
    },
    {
      id: 6,
      position: "Intern",
      company: "CodSoft",
      location: "Delhi, India · Remote",
      period: "Sep 2024 - Oct 2024 · 2 mos",
      description: [
        "Participated in coding projects and challenges",
        "Developed small web applications and features",
        "Received mentorship from experienced programmers",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Git"],
    },
    {
      id: 7,
      position: "EULIM SCIENCE CLUB MEMBER",
      company: "Christ University, Delhi NCR",
      location: "Delhi, India · On-site",
      period: "Aug 2024 - Present · 8 mos",
      description: [
        "Active member of the EULIM Science Club at Christ University",
        "Hosted various events with the club",
        "Collaborated with team members on various initiatives",
      ],
      technologies: [
        "Team Coordination",
        "Marketing",
        "Creative Strategy",
        "Team Building",
      ],
    },

    {
      id: 8,
      position: "TECHNICAL CLUB OF SCIENCES",
      company: "Christ University, Delhi NCR",
      location: "Delhi, India · On-site",
      period: "Aug 2024 - Present · 8 mos",
      description: [
        "Active member of the Tcs Club at Christ University",
        "Hosted various events with the club",
        "Collaborated with team members on various initiatives",
      ],
      technologies: [
        "Team Coordination",
        "Coding",
        "Creative Strategy",
        "Team Building",
      ],
    },

    {
      id: 8,
      position: "BRANDING AND MEDIA CLUB",
      company: "Christ University, Delhi NCR",
      location: "Delhi, India · On-site",
      period: "Aug 2024 - Feb 2025 · 8 mos",
      description: [
        "Was an Active member of the B&M Club at Christ University",
        "Hosted various events with the club",
        "Collaborated with team members on various initiatives",
      ],
      technologies: [
        "Video Editing",
        "Photography",
        "Videography",
        "Team Building",
      ],
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
            My professional journey has equipped me with practical skills and
            industry experience, allowing me to approach projects with
            confidence and expertise.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary1/30 transform md:translate-x-[-0.5px]"></div>

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:pr-12 md:ml-auto md:mr-[50%]"
                  : "md:pl-12 md:mr-auto md:ml-[50%]"
              } animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-6 ${
                  index % 2 === 0
                    ? "md:-right-3 left-0 md:left-auto"
                    : "md:-left-3 left-0"
                } w-6 h-6 rounded-full bg-primary1 border-4 border-background z-10`}
              ></div>

              <div className="glass p-6 rounded-xl ml-8 md:ml-0">
                <h3 className="text-xl font-bold mb-1">
                  {experience.position}
                </h3>
                <h4 className="text-lg font-medium text-primary1 mb-3">
                  {experience.company}
                </h4>

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

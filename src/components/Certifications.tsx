import React, { useEffect, useRef, useState } from "react";
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import CertificateDialog from "./CertificateDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  skills: string[];
}

const Certifications: React.FC = () => {
  const certRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certification | null>(null);

  // Extended certifications data with more certificates
  const certifications: Certification[] = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      issuer: "Udemy",
      date: "October 2022",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
    {
      id: 2,
      title: "React.js - The Complete Guide",
      issuer: "Coursera",
      date: "January 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["React.js", "Redux", "Hooks", "React Router"],
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      issuer: "Google",
      date: "March 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["UI Design", "User Research", "Prototyping", "Figma"],
    },
    {
      id: 4,
      title: "Full Stack JavaScript",
      issuer: "freeCodeCamp",
      date: "May 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["Node.js", "Express", "MongoDB", "Authentication"],
    },
    {
      id: 5,
      title: "Advanced CSS and Sass",
      issuer: "Udemy",
      date: "June 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["Advanced CSS", "Sass", "Flexbox", "CSS Grid", "Animations"],
    },
    {
      id: 6,
      title: "TypeScript Masterclass",
      issuer: "Frontend Masters",
      date: "August 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["TypeScript", "Type Systems", "Generics", "Advanced Types"],
    },
    {
      id: 7,
      title: "Cloud Computing Fundamentals",
      issuer: "AWS",
      date: "October 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: ["AWS", "Cloud Architecture", "Serverless", "Microservices"],
    },
    {
      id: 8,
      title: "Data Structures & Algorithms",
      issuer: "Stanford Online",
      date: "December 2023",
      image: "/public/lovable-uploads/f5fd008c-0691-4cee-8244-e40fd9b9d006.png",
      skills: [
        "Algorithms",
        "Data Structures",
        "Problem Solving",
        "Big O Notation",
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

    if (certRef.current) {
      observer.observe(certRef.current);
    }

    return () => {
      if (certRef.current) {
        observer.unobserve(certRef.current);
      }
    };
  }, []);

  const handleViewCertificate = (cert: Certification) => {
    setSelectedCertificate(cert);
    setDialogOpen(true);
  };

  // Group certifications into sets of 4
  const certificationGroups = [];
  for (let i = 0; i < certifications.length; i += 4) {
    certificationGroups.push(certifications.slice(i, i + 4));
  }

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
            I'm committed to continuous learning and skill development. These
            certifications represent my dedication to mastering the latest
            technologies and best practices.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {certificationGroups.map((group, groupIndex) => (
              <CarouselItem key={groupIndex}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {group.map((cert, index) => (
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
                          <h3 className="text-xl font-bold mb-1">
                            {cert.title}
                          </h3>
                          <p className="text-primary1 mb-2">{cert.issuer}</p>
                          <p className="text-sm text-white/70 mb-4">
                            Issued: {cert.date}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {cert.skills
                              .slice(0, 3)
                              .map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                                >
                                  {skill}
                                </span>
                              ))}
                            {cert.skills.length > 3 && (
                              <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">
                                +{cert.skills.length - 3} more
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleViewCertificate(cert)}
                            className="inline-flex items-center text-sm text-primary1 hover:text-primary2 transition-colors"
                          >
                            <span className="mr-1">View Certificate</span>
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious
              variant="outline"
              className="relative static h-10 w-10 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <CarouselNext
              variant="outline"
              className="relative static h-10 w-10 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>

      <CertificateDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        certificate={selectedCertificate}
      />
    </section>
  );
};

export default Certifications;

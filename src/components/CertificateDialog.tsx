import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { X } from "lucide-react";

interface CertificateDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  certificate: {
    title: string;
    issuer: string;
    date: string;
    image: string;
    skills: string[];
  } | null;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({
  isOpen,
  setIsOpen,
  certificate,
}) => {
  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass border-0 max-w-3xl p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl gradient-text">
              {certificate.title}
            </DialogTitle>
            <div className="flex flex-col space-y-1 mt-1">
              <p className="text-primary1 text-lg">{certificate.issuer}</p>
              <p className="text-white/70 text-sm">
                Issued: {certificate.date}
              </p>
            </div>
          </DialogHeader>

          {/* Certificate Image */}
          <div className="mb-4 bg-black/30 rounded-xl overflow-hidden">
            <AspectRatio ratio={16 / 9} className="w-full">
              <img
                src={certificate.image}
                alt={`${certificate.title} Certificate`}
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>

          <div className="border border-white/10 rounded-xl p-4 mb-4 bg-white/5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary1/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold">{certificate.title}</h3>
                  <p className="text-primary1 text-sm">{certificate.issuer}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold gradient-text">
                  Certificate of Completion
                </div>
                <p className="text-white/70 text-sm">
                  Verified • {certificate.date}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h4 className="text-md font-semibold mb-2">Skills Acquired:</h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-primary1/20 text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-white/60 text-sm">
            <p>
              This certificate verifies the completion of the{" "}
              {certificate.title} course by the certificate holder.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDialog;

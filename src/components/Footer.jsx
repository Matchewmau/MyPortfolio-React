import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-[10%] opacity-70"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full top-10 left-[25%] opacity-60"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-16 left-[40%] opacity-80"></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-6 left-[60%] opacity-70"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-14 left-[75%] opacity-50"></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-8 left-[85%] opacity-90"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-20 left-[95%] opacity-60"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full top-16 left-[15%] opacity-80"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-[55%] opacity-70"></div>
      </div>

      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 z-0"></div>

      <div className="container py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="text-center md:text-left">
          <p className="text-sm text-primary/90 font-medium mb-1">
            Exploring the cosmos of web development
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} John Mathew Mauricio
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Return to orbit</span>
          <a
            href="#hero"
            className="p-2 border border-primary/30 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
      e.target.reset(); // Reset the form after submission
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Contact information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6 justify-center">
              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-left">Email</h4>
                  <a
                    href="mailto:johnmathewmau@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    johnmathewmau@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-left">Phone</h4>
                  <a
                    href="tel:+639566284039"
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    +63 9566 284 039
                  </a>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-left">Location</h4>
                  <span className="text-muted-foreground text-left">
                    Zamboanga City, Philippines
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-8 border-t border-border">
              <h4 className="font-medium mb-6 text-center md:text-left">Connect <span className="text-primary"> With Me</span></h4>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/john-mathew-mauricio-04539a2a4/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://github.com/Matchewmau" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://www.facebook.com/jmathewmau/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://www.instagram.com/machew_404/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className="gradient-border p-8 rounded-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-primary/20 bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors duration-300"
                  placeholder="Full Name..."
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-primary/20 bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors duration-300"
                  placeholder="Email@gmail.com"
                />
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-md border border-primary/20 bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none transition-colors duration-300"
                  placeholder="Enter your message here..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 mt-6",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from "react";
import { X, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StarBackground } from "@/components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";

// Tour data with planetary theme
const tourData = [
  // Day 1 - Kepler-186f (Exoplanet in Cygnus constellation)
  {
    day: 1,
    planet: "Kepler-186f",
    planetInfo: "An Earth-sized exoplanet in the habitable zone of Kepler-186, 500 light-years away in the Cygnus constellation.",
    colorScheme: {
      primary: "from-emerald-700 to-green-900",
      secondary: "border-emerald-600",
      accent: "bg-emerald-700",
      text: "text-emerald-500",
      background: "bg-gradient-to-b from-emerald-900/20 to-emerald-800/5"
    },
    planetImage: "/tour/kepler186f.png",
    companies: [
      {
        name: "Tech Solutions Inc.",
        image: "/tour/company1.jpg",
        description: "Tech Solutions Inc. is a leading software development company specializing in enterprise solutions.",
        activities: "During our visit, we toured their development facilities and participated in a coding workshop focusing on modern web frameworks. We also had the opportunity to collaborate on a mock project using their proprietary development tools."
      },
      {
        name: "DataViz Systems",
        image: "/tour/company2.jpg",
        description: "DataViz Systems creates data visualization tools for business intelligence, helping organizations transform complex data into actionable insights.",
        activities: "We observed their design team working on user interface prototypes and participated in a demo of their latest analytics dashboard platform. The team allowed us to test their beta software and provide feedback on the user experience."
      }
    ],
    speakers: [
      {
        name: "Dr. Sophia Chen",
        company: "Tech Solutions Inc.",
        image: "/tour/speaker1.jpg",
        about: "CTO at Tech Solutions Inc. with 15+ years of experience in software architecture. Dr. Chen specializes in distributed systems and has led the development of several enterprise platforms."
      },
      {
        name: "Marcus Rivera",
        company: "DataViz Systems",
        image: "/tour/speaker2.jpg",
        about: "Lead UX Designer at DataViz Systems who pioneered their human-centered design approach. Marcus has a background in cognitive psychology and applies those principles to create intuitive interfaces."
      }
    ]
  },
  
  // Day 2 - HD 189733b (Exoplanet in Vulpecula constellation)
  {
    day: 2,
    planet: "HD 189733b",
    planetInfo: "A cobalt-blue exoplanet 63 light-years away in the Vulpecula constellation, known for its azure appearance and silicate rain.",
    colorScheme: {
      primary: "from-blue-700 to-indigo-900",
      secondary: "border-blue-600",
      accent: "bg-blue-700",
      text: "text-blue-500",
      background: "bg-gradient-to-b from-blue-900/20 to-blue-800/5"
    },
    planetImage: "/tour/hd189733b.png",
    companies: [
      {
        name: "Cloud Nexus",
        image: "/tour/company3.jpg",
        description: "Cloud Nexus provides cloud infrastructure and DevOps solutions for enterprises looking to modernize their IT operations.",
        activities: "Our tour included their server rooms and a presentation on their deployment pipeline. We also participated in a hands-on session about containerization technologies and got to deploy a sample application to their cloud platform."
      },
      {
        name: "SecureNet",
        image: "/tour/company4.jpg",
        description: "SecureNet specializes in cybersecurity solutions for finance and healthcare, providing robust protection against modern threats.",
        activities: "We learned about their threat detection systems and participated in a simulated security breach exercise to understand incident response protocols. The team demonstrated how they identify and mitigate zero-day vulnerabilities."
      }
    ],
    speakers: [
      {
        name: "Alex Patel",
        company: "Cloud Nexus",
        image: "/tour/speaker3.jpg",
        about: "Infrastructure Architect at Cloud Nexus with expertise in designing scalable cloud solutions. Alex is a certified AWS Solutions Architect and has helped numerous companies migrate to cloud-native architectures."
      },
      {
        name: "Elena Rodríguez",
        company: "SecureNet",
        image: "/tour/speaker4.jpg",
        about: "Head of Security Operations at SecureNet and former cybersecurity consultant for government agencies. Elena specializes in threat intelligence and has published papers on emerging security challenges."
      }
    ]
  },
  
  // Day 3 - TRAPPIST-1e (Exoplanet in Aquarius constellation)
  {
    day: 3,
    planet: "TRAPPIST-1e",
    planetInfo: "A potentially habitable rocky exoplanet in the TRAPPIST-1 system, 39 light-years away in the Aquarius constellation.",
    colorScheme: {
      primary: "from-purple-600 to-violet-800",
      secondary: "border-purple-600",
      accent: "bg-purple-600",
      text: "text-purple-500",
      background: "bg-gradient-to-b from-purple-800/20 to-purple-700/5"
    },
    planetImage: "/tour/trappist1e.png",
    companies: [
      {
        name: "AI Innovations",
        image: "/tour/company5.jpg",
        description: "AI Innovations develops machine learning solutions for various industries, transforming how businesses operate through intelligent automation.",
        activities: "We observed their data scientists working on training models and had the opportunity to interact with their conversational AI systems currently in development. The team showed us how they use reinforcement learning to optimize model performance."
      },
      {
        name: "Digital Media Pro",
        image: "/tour/company6.jpg",
        description: "Digital Media Pro creates multimedia content and digital marketing solutions that help brands connect with their audience across platforms.",
        activities: "We toured their content creation studios and participated in a workshop on SEO strategies and social media campaign development. They demonstrated their content analytics platform and showed case studies of successful campaigns."
      }
    ],
    speakers: [
      {
        name: "Dr. James Wilson",
        company: "AI Innovations",
        image: "/tour/speaker5.jpg",
        about: "Research Director at AI Innovations with a PhD in Machine Learning from MIT. Dr. Wilson leads a team developing cutting-edge natural language processing models and has contributed to several open-source AI projects."
      },
      {
        name: "Sarah Johnson",
        company: "Digital Media Pro",
        image: "/tour/speaker6.jpg",
        about: "Creative Director at Digital Media Pro with background in digital storytelling. Sarah has led award-winning campaigns for major brands and specializes in creating content that drives engagement."
      }
    ]
  },
  
  // Day 4 - Proxima Centauri b (Exoplanet in Alpha Centauri system)
  {
    day: 4,
    planet: "Proxima Centauri b",
    planetInfo: "The closest known exoplanet to our solar system, orbiting the red dwarf Proxima Centauri just 4.2 light-years away.",
    colorScheme: {
      primary: "from-rose-600 to-pink-800",
      secondary: "border-rose-600",
      accent: "bg-rose-600",
      text: "text-rose-500",
      background: "bg-gradient-to-b from-rose-800/20 to-rose-700/5"
    },
    planetImage: "/tour/proximab.png",
    companies: [
      {
        name: "Quantum Computing Labs",
        image: "/tour/company7.jpg",
        description: "Quantum Computing Labs is pioneering practical applications of quantum technology, working to solve previously intractable computational problems.",
        activities: "We were given a tour of their quantum computing facility and saw demonstrations of quantum algorithms in action. The research team explained how they're addressing quantum decoherence and scaling challenges in their systems."
      },
      {
        name: "BioTech Frontiers",
        image: "/tour/company8.jpg",
        description: "BioTech Frontiers develops cutting-edge biomedical technologies and computational biology solutions to address global health challenges.",
        activities: "During our visit, we explored their genomic sequencing lab and participated in a workshop on CRISPR gene editing technology. We also learned about their AI-driven drug discovery platform that accelerates medical research."
      }
    ],
    speakers: [
      {
        name: "Dr. Aisha Malik",
        company: "Quantum Computing Labs",
        image: "/tour/speaker7.jpg",
        about: "Principal Quantum Physicist at Quantum Computing Labs who earned her doctorate at Caltech. Dr. Malik is known for her work on quantum error correction and has been featured in Scientific American for her breakthroughs in quantum coherence."
      },
      {
        name: "Dr. David Kim",
        company: "BioTech Frontiers",
        image: "/tour/speaker8.jpg",
        about: "Head of Research at BioTech Frontiers with dual background in molecular biology and computer science. Dr. Kim leads interdisciplinary teams developing computational models for protein folding and has contributed to several patented medical technologies."
      }
    ]
  }
];

export const TourPage = () => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchPhase, setLaunchPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show return rocket after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };
  
  const handleReturnRocketClick = () => {
    if (!isLaunching) {
      // Start the return launch sequence
      setIsLaunching(true);
      setLaunchPhase(1); // Enlarge phase
      
      // Phase 2: Flying to the top
      setTimeout(() => {
        setLaunchPhase(2);
      }, 1500);
      
      // Phase 3: Disappear and navigate to home page
      setTimeout(() => {
        setLaunchPhase(3);
        setTimeout(() => {
          navigate('/');
        }, 500);
      }, 3000);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground />
      
      {/* Header */}
      <header className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-primary/20 p-4 flex justify-between items-center z-20">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-primary">Cosmic</span> Tour Experience
        </h1>
        <Link 
          to="/"
          className="p-2 rounded-full hover:bg-primary/10 transition-colors flex items-center gap-2"
        >
          <X size={20} />
          <span className="hidden sm:inline">Back to Portfolio</span>
        </Link>
      </header>

      {/* Theme Toggle - Added below the nav as requested */}
      <div className="relative">
        <ThemeToggle />
      </div>
      
      {/* Full-screen overlay for launch sequence */}
      {launchPhase > 0 && launchPhase < 3 && (
        <div 
          className="fixed inset-0 z-40 transition-all duration-500 flex items-center justify-center"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${launchPhase === 1 ? 0.8 : 0.9})`,
            backdropFilter: "blur(8px)"
          }}
        >
          {/* Milky way background at the top */}
          <div className="absolute top-0 left-0 w-full h-64 opacity-80">
            <div className="w-full h-full bg-gradient-to-b from-purple-900 to-transparent relative overflow-hidden">
              {/* Stars in the milky way */}
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Return Rocket - positioned at bottom right just like in home page */}
      <div
        className={`${launchPhase === 0 ? "fixed bottom-20 right-8 md:right-16" : "fixed"} 
          z-50 cursor-pointer transform transition-all duration-1000 
          ${isVisible && launchPhase === 0 ? "translate-y-0 opacity-100" : ""}
          ${launchPhase === 1 ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
          ${launchPhase === 2 ? "top-10 left-1/2 -translate-x-1/2 rotate-0 scale-50" : ""}
          ${launchPhase === 3 ? "top-0 left-1/2 -translate-x-1/2 opacity-0 scale-0" : ""}
          ${launchPhase === 0 && isLaunching ? "translate-y-[-150vh] rotate-12" : ""}`}
        onClick={launchPhase === 0 ? handleReturnRocketClick : undefined}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label="Return rocket - click to return to portfolio"
      >
        {/* Hover tooltip */}
        {isHovering && launchPhase === 0 && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap border border-primary/30 animate-fade-in">
            Return To Orbit
          </div>
        )}
        
        <div className={`relative ${launchPhase === 1 ? "w-64 h-64" : "w-16 h-16 md:w-24 md:h-24"} transition-all duration-1000`}>
          {/* Rocket flame animation when launching */}
          {(isLaunching || launchPhase > 0) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 md:w-12 md:h-24 scale-100">
              <div className="absolute top-0 left-0 w-full h-full flex justify-center">
                <div className={`w-full h-full animate-pulse bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-b-full opacity-90
                  ${launchPhase === 1 ? "scale-150" : ""}`}></div>
              </div>
            </div>
          )}
          
          {/* Rocket image */}
          <img
            src="/img/rocket.png" 
            alt="Return Rocket" 
            className={`w-full h-full object-contain transition-transform duration-300
              ${launchPhase === 0 && !isLaunching ? "hover:scale-110" : ""}`}
          />
          
          {/* Floating animation */}
          {launchPhase === 0 && <div className="absolute inset-0 animate-float"></div>}
        </div>
      </div>
      
      {/* Main Content */}
      <main>
        {/* Introduction - Styled like HeroSection */}
        <section className="z-10 relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container max-w-4xl mx-auto text-center z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="opacity-0 animate-fade-in">Interstellar</span>
                <span className="text-primary opacity-0 animate-fade-in-delay-1"> Tour </span>
                <span className="opacity-0 animate-fade-in-delay-2">Expedition</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                Journey with us through our four-day cosmic tour across distant worlds from far-away galaxies.
                Each day we visited different companies, exploring cutting-edge technologies and innovations.
              </p>
            </div>
          </div>
        </section>

        {/* Planetary Navigation - Keep as is, it's unique and works well */}
        <div className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6">
          {tourData.map((day, index) => (
            <a 
              key={index}
              href={`#day-${day.day}`}
              className="group relative"
              title={`Day ${day.day}: ${day.planet}`}
            >
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-300 
                            transform group-hover:scale-110 border-2 border-white/20 shadow-lg">
                <img 
                  src={day.planetImage} 
                  alt={day.planet}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap 
                             bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-sm
                             opacity-0 group-hover:opacity-100 transition-opacity">
                Day {day.day}: {day.planet}
              </span>
            </a>
          ))}
        </div>
        
        {/* Planet Sections */}
        {tourData.map((dayData, dayIndex) => (
          <section 
            key={dayIndex} 
            id={`day-${dayData.day}`}
            className={`py-24 px-4 relative ${dayIndex % 2 !== 0 ? 'bg-secondary/30' : ''}`}
          >
            <div className="container mx-auto max-w-5xl">
              {/* Day Header with planetary styling */}
              <div className="flex flex-col items-center mb-12">
                <div className="relative mb-6">
                  <div className="w-28 h-28 md:w-36 md:h-36 relative">
                    {/* Add special effects for different planets */}
                    {dayData.planet === "TRAPPIST-1e" && (
                      <div className="absolute inset-0 w-[140%] h-full -left-[20%] top-1/2 -translate-y-1/2 
                                  border-4 border-purple-600/40 rounded-full rotate-12"></div>
                    )}
                    {dayData.planet === "HD 189733b" && (
                      <div className="absolute inset-0 w-full h-full bg-blue-500/20 rounded-full animate-pulse-subtle"></div>
                    )}
                    {dayData.planet === "Proxima Centauri b" && (
                      <div className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] 
                                  border-2 border-rose-500/30 rounded-full"></div>
                    )}
                    <img 
                      src={dayData.planetImage} 
                      alt={dayData.planet} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className={`text-sm font-semibold uppercase ${dayData.colorScheme.text} mb-1`}>Day {dayData.day}</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Welcome to <span className={dayData.colorScheme.text}>{dayData.planet}</span>
                </h2>
                
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
                  {dayData.planetInfo}
                </p>
                
                <div className="w-24 h-1 bg-gradient-to-r rounded-full opacity-70 mt-4 mb-8"
                     style={{background: `linear-gradient(to right, var(--color-primary), ${
                        dayData.colorScheme.text === 'text-emerald-500' ? '#10b981' : 
                        dayData.colorScheme.text === 'text-blue-500' ? '#3b82f6' : 
                        dayData.colorScheme.text === 'text-purple-500' ? '#a855f7' : 
                        '#f43f5e'
                     })`}}>
                </div>
              </div>
              
              {/* Company Cards - Grid layout similar to ProjectsSection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {dayData.companies.map((company, companyIndex) => (
                  <div 
                    key={companyIndex} 
                    className="gradient-border p-6 transition-all duration-300 group hover:shadow-xl rounded-lg overflow-hidden card-hover"
                  >
                    <div className="h-48 relative overflow-hidden mb-6">
                      <img
                        src={company.image}
                        alt={company.name}
                        onClick={() => openImageModal(company.image)}
                        className="w-full h-full object-cover transition-all duration-500 
                                  group-hover:scale-110 cursor-pointer rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                                      transition-opacity flex items-center justify-center">
                        <span className={`${dayData.colorScheme.accent} text-white px-3 py-1 rounded-full text-sm`}>
                          Click to enlarge
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 group-hover:${dayData.colorScheme.text}`}>
                      {company.name}
                    </h3>
                    
                    {/* Company description section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">About the Company</h4>
                      <p className="text-muted-foreground">
                        {company.description}
                      </p>
                    </div>
                    
                    {/* Activities section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Our Activities</h4>
                      <p className="text-muted-foreground">
                        {company.activities}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-border mt-auto">
                      <div className={`text-sm ${dayData.colorScheme.text}`}>
                        Visited during Day {dayData.day}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Speakers Section */}
              <div className="mt-24">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Featured <span className={dayData.colorScheme.text}>Speakers</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {dayData.speakers.map((speaker, speakerIndex) => (
                    <div 
                      key={speakerIndex} 
                      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 gradient-border rounded-lg transition-all duration-300 hover:shadow-xl"
                    >
                      {/* Speaker image */}
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 shadow-lg shrink-0"
                           style={{borderColor: `var(--color-primary)`}}>
                        <img 
                          src={speaker.image} 
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Speaker info */}
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className={`text-xl font-semibold mb-1 ${dayData.colorScheme.text}`}>
                          {speaker.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {speaker.company}
                        </p>
                        <p className="text-muted-foreground">
                          {speaker.about}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Travel Partner DJM Section - Added after all planet sections */}
        <section className="py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full opacity-70 mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Cosmic Guide</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We extend our gratitude to our interstellar travel partner who made this journey possible
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 gradient-border rounded-lg bg-card/50 backdrop-blur-sm">
              {/* Left side - Spaceship icon and name */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-0">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
                  
                  {/* Spaceship icon */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-primary/5 
                               border border-primary/30 flex items-center justify-center z-10">
                    <div className="animate-pulse-slow">
                      <Rocket size={80} className="text-primary" />
                    </div>
                  </div>
                  
                  {/* Orbiting particles */}
                  <div className="absolute inset-0 w-full h-full animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 w-full h-full animate-spin-slow-reverse">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/60 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Text content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-primary mb-2">DJM Travel & Tour Services</h3>
                <p className="text-muted-foreground mb-6">
                  Our expert cosmic guide through the wonders of distant exoplanets
                </p>
                
                <div className="space-y-4">
                  <p>
                    We extend our heartfelt appreciation to DJM for their unparalleled expertise 
                    that made our four-day cosmic tour a reality. Their extensive knowledge of interstellar navigation 
                    and exoplanet environments ensured our safe journey across the stars.
                  </p>
                  
                  <p>
                    From providing specialized equipment for each planetary environment to arranging meetings with 
                    the brilliant minds we encountered, DJM's attention to detail was impeccable. Their vast network 
                    of contacts across the cosmos opened doors to technologies and insights we could scarcely imagine.
                  </p>
                  
                  <p>
                    Most importantly, DJM's commitment to educational exploration has enriched our understanding of the 
                    universe and the possibilities that await humanity among the stars. We couldn't have asked for a more 
                    knowledgeable or dedicated partner for this extraordinary journey.
                  </p>
                </div>
                
                <div className="mt-8 inline-flex items-center text-sm text-primary/90">
                  <span className="mr-2">✦</span>
                  DJM Travel & Tour Services since 2019
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer - Include same footer as Home page */}
      <Footer />
      
      {/* Image modal */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background/100 transition-colors duration-200"
              aria-label="Close image"
            >
              <X size={24} className="text-foreground" />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
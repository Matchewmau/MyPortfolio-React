import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StarBackground } from "@/components/StarBackground";

// Tour data with planetary theme
const tourData = [
  // Day 1 - Mars
  {
    day: 1,
    planet: "Mars",
    colorScheme: {
      primary: "from-red-700 to-red-900",
      secondary: "border-red-600",
      accent: "bg-red-700",
      text: "text-red-500",
      background: "bg-gradient-to-b from-red-900/20 to-red-800/5"
    },
    planetImage: "/tour/mars.png",
    companies: [
      {
        name: "Tech Solutions Inc.",
        image: "/tour/company1.jpg",
        description: "Tech Solutions Inc. is a leading software development company specializing in enterprise solutions. During our visit, we toured their development facilities and participated in a coding workshop focusing on modern web frameworks."
      },
      {
        name: "DataViz Systems",
        image: "/tour/company2.jpg",
        description: "DataViz Systems creates data visualization tools for business intelligence. We observed their design team working on user interface prototypes and participated in a demo of their latest analytics dashboard platform."
      }
    ]
  },
  // Day 2 - Jupiter
  {
    day: 2,
    planet: "Jupiter",
    colorScheme: {
      primary: "from-amber-600 to-orange-700",
      secondary: "border-amber-600",
      accent: "bg-amber-600",
      text: "text-amber-500",
      background: "bg-gradient-to-b from-amber-800/20 to-amber-700/5"
    },
    planetImage: "/tour/jupiter.png",
    companies: [
      {
        name: "Cloud Nexus",
        image: "/tour/company3.jpg",
        description: "Cloud Nexus provides cloud infrastructure and DevOps solutions. Our tour included their server rooms and a presentation on their deployment pipeline. We also participated in a hands-on session about containerization technologies."
      },
      {
        name: "SecureNet",
        image: "/tour/company4.jpg",
        description: "SecureNet specializes in cybersecurity solutions for finance and healthcare. We learned about their threat detection systems and participated in a simulated security breach exercise to understand incident response protocols."
      }
    ]
  },
  // Day 3 - Saturn
  {
    day: 3,
    planet: "Saturn",
    colorScheme: {
      primary: "from-yellow-600 to-amber-800",
      secondary: "border-yellow-600",
      accent: "bg-yellow-600",
      text: "text-yellow-500",
      background: "bg-gradient-to-b from-yellow-800/20 to-yellow-700/5"
    },
    planetImage: "/tour/saturn.png",
    companies: [
      {
        name: "AI Innovations",
        image: "/tour/company5.jpg",
        description: "AI Innovations develops machine learning solutions for various industries. We observed their data scientists working on training models and had the opportunity to interact with their conversational AI systems currently in development."
      },
      {
        name: "Digital Media Pro",
        image: "/tour/company6.jpg",
        description: "Digital Media Pro creates multimedia content and digital marketing solutions. We toured their content creation studios and participated in a workshop on SEO strategies and social media campaign development."
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
      
      {/* Introduction */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-transparent text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Planetary Tour Expedition</h2>
          <p className="text-lg text-muted-foreground">
            Journey with us through our three-day cosmic tour across the solar system's most fascinating planets.
            Each day we visited different companies, exploring new technologies and innovations.
          </p>
        </div>
      </section>

      {/* Planetary Navigation */}
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
      
      {/* Main Content - Vertical Scroll with centered planet content */}
      <div className="flex justify-center">
        <main className="pb-24 px-4 w-full max-w-5xl">
          {tourData.map((dayData, dayIndex) => (
            <section 
              key={dayIndex} 
              className="min-h-screen flex flex-col items-center justify-center py-20"
              id={`day-${dayData.day}`}
            >
              <div className={`w-full max-w-4xl ${dayData.colorScheme.background} rounded-2xl p-8 md:p-12 shadow-lg border border-opacity-30 ${dayData.colorScheme.secondary}`}>
                {/* Day Header with planetary styling */}
                <div className="relative py-8 mb-12 overflow-hidden flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="w-28 h-28 md:w-36 md:h-36 relative">
                    {/* Add rings for Saturn */}
                    {dayData.planet === "Saturn" && (
                      <div className="absolute inset-0 w-[140%] h-full -left-[20%] top-1/2 -translate-y-1/2 
                                border-4 border-yellow-600/60 rounded-full rotate-12"></div>
                    )}
                    <img 
                      src={dayData.planetImage} 
                      alt={dayData.planet} 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  
                  <div className="text-center md:text-left">
                    <div className={`text-sm font-semibold uppercase ${dayData.colorScheme.text}`}>Day {dayData.day}</div>
                    <h2 className="text-3xl font-bold">
                      Welcome to <span className={dayData.colorScheme.text}>{dayData.planet}</span>
                    </h2>
                  </div>
                </div>
                
                {/* Company Cards */}
                <div className="space-y-16">
                  {dayData.companies.map((company, companyIndex) => (
                    <div 
                      key={companyIndex} 
                      className={`bg-background/50 backdrop-blur-sm p-8 rounded-lg shadow-md transition-all duration-300 
                                hover:shadow-lg border ${dayData.colorScheme.secondary}/30 hover:border-opacity-50`}
                    >
                      <h3 className={`text-2xl font-semibold mb-6 ${dayData.colorScheme.text}`}>
                        {company.name}
                      </h3>
                      
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div 
                          className="lg:w-2/5 rounded-lg overflow-hidden cursor-pointer relative group"
                          onClick={() => openImageModal(company.image)}
                        >
                          <img 
                            src={company.image} 
                            alt={company.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className={`${dayData.colorScheme.accent} text-white px-3 py-1 rounded-full text-sm`}>
                              Click to enlarge
                            </span>
                          </div>
                        </div>
                        
                        <div className="lg:w-3/5">
                          <p className="text-foreground/90 leading-relaxed text-lg">
                            {company.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className="mt-12 flex justify-center">
                  <div className={`h-1 w-24 bg-gradient-to-r ${dayData.colorScheme.primary} rounded-full opacity-70`}></div>
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
      
      {/* Image modal */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setImageModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
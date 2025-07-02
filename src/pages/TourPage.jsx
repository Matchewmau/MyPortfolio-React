import { useState, useEffect, useRef } from "react";
import { X, Rocket, ArrowUp, ArrowDown, Menu, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StarBackground } from "@/components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer as MainFooter } from "../components/Footer";
import { cn } from "@/lib/utils";

// Tour data with planetary theme - expanded to 8 planets
const tourData = [
  // Day 1 - Kepler-186f (Arrival and City Tour)
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
        name: "Intramuros Historic District",
        image: "/tour/company1.jpg",
        description: "A famous historical area in Manila featuring walls and buildings from the Spanish colonial period, showcasing centuries of cultural heritage.",
        activities: "Our tour began on a rainy Sunday morning. Despite the heavy rain, our flight proceeded as scheduled and we arrived in Manila around 8:00 AM. After settling into our dormitory accommodations and having brunch, we started our city tour at 1:00 PM, visiting Intramuros where we learned about historical sites and glimpsed into the region's rich past."
      },
      {
        name: "SM Mall of Asia",
        image: "/tour/company2.jpg",
        description: "One of the largest shopping centers in the region, offering a wide range of retail stores, dining options, and entertainment facilities with scenic views.",
        activities: "Following our historical exploration, we visited SM Mall of Asia. We enjoyed walking around the expansive complex, taking in the impressive views and getting acquainted with the local retail environment. This casual exploration provided a pleasant and relaxed introduction to our educational journey."
      }
    ],
    speakers: []
  },
  
  // Day 2 - HD 189733b (Company Visit Day)
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
        name: "Foundever Philippines",
        image: "/tour/company3.jpg",
        description: "A leading company in the BPO industry specializing in customer experience management and support services for global clients.",
        activities: "We started our second day early, having breakfast at 6:00 AM before traveling to Pasig City to visit Foundever Philippines. Company representatives shared insights about their work culture, career growth opportunities, and work-life balance initiatives. Their presentations were particularly valuable for us as students preparing to enter the professional world. The visit included complimentary refreshments and a comprehensive site tour of their operational facilities."
      },
      {
        name: "Google Philippines",
        image: "/tour/company4.jpg",
        description: "The regional office of the global technology giant, focusing on local market development, digital innovation, and tech community support.",
        activities: "After lunch in our transport vehicle, we proceeded to Google Philippines for our afternoon visit. This was a highlight of our tour, featuring an inspiring presentation from the company's President. He shared his unconventional career path—studying law before eventually following his passion for technology to become a leader at one of the world's most influential tech companies. His story emphasized the importance of pursuing one's true interests regardless of initial career directions."
      }
    ],
    speakers: []
  },
  
  // Day 3 - TRAPPIST-1e (Company Visit Day)
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
        name: "Teleperformance Philippines",
        image: "/tour/company5.jpg",
        description: "A global leader in customer experience management providing omnichannel support services with a strong focus on digital transformation and employee development.",
        activities: "Day three began with another early start. After breakfast at 6:00 AM, we visited Teleperformance Philippines. The company welcomed us warmly with presentations about their global presence and employee career development programs. They explained their diverse service offerings including customer support, technical assistance, and digital solutions for international clients. Their emphasis on work-life balance and creating a positive workplace environment was evident throughout the tour of their modern facilities."
      },
      {
        name: "Manila American Cemetery & Kollab Philippines",
        image: "/tour/company6.jpg",
        description: "A combination visit to a historical memorial site honoring WWII veterans and a modern creative agency specializing in digital marketing and AI-driven solutions.",
        activities: "After lunch, we visited the peaceful Manila American Cemetery and Memorial in Bonifacio Global City, observing the beautifully maintained grounds honoring American and Filipino soldiers from WWII. We then proceeded to Kollab Philippines, which featured a contemporary and innovative atmosphere. Their team discussed the importance of company culture in career choices and presented insights on how artificial intelligence is transforming workplaces. They also provided valuable advice on portfolio development before treating us to refreshments."
      }
    ],
    speakers: []
  },
  
  // Day 4 - Proxima Centauri b (Company Visit Day)
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
        name: "Asian Development Bank (ADB)",
        image: "/tour/company7.jpg",
        description: "A regional financial institution dedicated to reducing poverty and promoting sustainable economic growth across Asia through strategic investments and development projects.",
        activities: "Our fourth day began with an early breakfast before visiting the Asian Development Bank. We were immediately impressed by their strict security protocols and immaculate facilities. The visit included a tour of their small museum where we learned about ADB's history and mission to improve lives across Asia. In their grand conference room, we were served refreshments before attending presentations by technology and development professionals. A personal highlight was presenting our project, RePay, to the distinguished audience."
      },
      {
        name: "MicroSourcing",
        image: "/tour/company8.jpg",
        description: "A specialized outsourcing provider offering tailored staffing solutions and managed services with a focus on building long-term client relationships and employee development.",
        activities: "After returning to our dormitory for lunch and a brief rest, we visited MicroSourcing in the afternoon. Their CEO delivered an insightful talk emphasizing the importance of both technical and soft skills in professional success. Following a comprehensive site tour, they treated us to J.CO Donuts and refreshments. A particularly valuable session covered LinkedIn profile optimization, while another speaker shared the inspirational message to 'Always keep your fork'—a metaphor reminding us that something good is always still to come, just as dessert follows a meal."
      }
    ],
    speakers: []
  },
  
  // Day 5 - Gliese 581d (Tagaytay Trip)
  {
    day: 5,
    planet: "Gliese 581d",
    planetInfo: "A potentially habitable super-Earth exoplanet orbiting within the habitable zone of the red dwarf star Gliese 581, about 20 light-years from Earth.",
    colorScheme: {
      primary: "from-teal-600 to-teal-900",
      secondary: "border-teal-500",
      accent: "bg-teal-600",
      text: "text-teal-500",
      background: "bg-gradient-to-b from-teal-800/20 to-teal-700/5"
    },
    planetImage: "/tour/gliese581d.png",
    companies: [
      {
        name: "Sky View Park",
        image: "/tour/company9.jpg",
        description: "A scenic overlook offering panoramic views of the surrounding highlands, popular for photography and experiencing the region's unique microclimate.",
        activities: "On Independence Day, we enjoyed the freedom to explore Tagaytay. Despite cold and foggy weather, we visited Sky View Park where the strong winds didn't stop us from taking numerous photos—individual selfies, group pictures, and a complete group shot. We also purchased local snacks and souvenirs to bring home as mementos of our visit to this picturesque location."
      },
      {
        name: "Sky Ranch Tagaytay",
        image: "/tour/company10.jpg",
        description: "An outdoor amusement park featuring various rides and attractions with spectacular views of Taal Lake and Volcano, offering both thrilling and family-friendly experiences.",
        activities: "Our next stop was Sky Ranch Tagaytay, where we had a picnic-style lunch in the parking area before entering. Inside, we experienced various rides ranging from gentle to extreme. The thrilling attractions elicited screams, laughter, and even made some of our friends dizzy enough to become ill—yet it remained a highlight of our day. We captured more photos, enjoyed snacks, and appreciated Tagaytay's beautiful scenery. By evening, we were tired but thoroughly satisfied with our recreational break from company visits."
      }
    ],
    speakers: []
  },
  
  // Day 6 - TOI-700d (Baguio Tour)
  {
    day: 6,
    planet: "TOI-700d",
    planetInfo: "An Earth-sized exoplanet in the habitable zone of its star TOI-700, about 100 light-years from Earth in the Dorado constellation.",
    colorScheme: {
      primary: "from-amber-600 to-orange-800",
      secondary: "border-amber-500",
      accent: "bg-amber-600",
      text: "text-amber-500",
      background: "bg-gradient-to-b from-amber-800/20 to-amber-700/5"
    },
    planetImage: "/tour/toi700d.png",
    companies: [
      {
        name: "La Trinidad Strawberry Farm & Cultural Sites",
        image: "/tour/company11.jpg",
        description: "A working agricultural attraction where visitors can experience strawberry cultivation alongside a tour of important cultural landmarks in the region.",
        activities: "Following our enjoyable day in Tagaytay, we departed at 1:00 AM for a 6-hour journey to Baguio, mostly sleeping during the overnight trip. Upon arrival around 6:00 AM, we first visited La Trinidad Strawberry Farm in Benguet, appreciating the cool, refreshing climate. We explored the farm, purchasing souvenirs like strawberry preserves, handcrafted items, fresh produce, and the famous strawberry taho. We then visited the Bell Church with its distinctive Chinese-inspired architecture before touring the Philippine Military Academy campus and passing The Mansion, a notable local landmark."
      },
      {
        name: "Mines View Park & Baguio Night Market",
        image: "/tour/company12.jpg",
        description: "A combination of daytime scenic views at an observation deck overlooking former mining areas and an evening market experience featuring local products and street food.",
        activities: "After checking into our hotel for lunch and rest, we continued to Mines View Park where we enjoyed the cool weather and panoramic vistas. Many of us posed for photos with large dogs and horses, and some tried on traditional Cordilleran attire, gaining insights into local cultural practices. As evening arrived, we explored the Baguio Night Market, sampling various street foods and browsing the famous ukay-ukay (thrift shops) where several of us found affordable clothing and souvenirs. Despite the cold weather and physical fatigue, the day created wonderful memories of Baguio's unique atmosphere."
      }
    ],
    speakers: []
  },
  
  // Day 7 - LHS 1140b (Last Day in Baguio)
  {
    day: 7,
    planet: "LHS 1140b",
    planetInfo: "A rocky super-Earth exoplanet orbiting within the habitable zone of the red dwarf LHS 1140, about 49 light-years from Earth.",
    colorScheme: {
      primary: "from-cyan-600 to-sky-800",
      secondary: "border-cyan-500",
      accent: "bg-cyan-600",
      text: "text-cyan-500",
      background: "bg-gradient-to-b from-cyan-800/20 to-cyan-700/5"
    },
    planetImage: "/tour/lhs1140b.png",
    companies: [
      {
        name: "Burnham Park",
        image: "/tour/company13.jpg",
        description: "A historic urban park in the heart of Baguio City offering boat rides, bicycle rentals, and beautifully landscaped gardens for recreation and relaxation.",
        activities: "On our final day in Baguio, we enjoyed breakfast before being given free time to explore independently. My group chose to visit Burnham Park where we rented bikes and had a great time circling the paths, comparing our experience to driving miniature racing cars while enjoying the crisp mountain air. During our exploration, we spotted SM Baguio in the distance and decided to walk there, underestimating the actual distance. The extended journey became a humorous anecdote as we joked about being 'scammed' by our own miscalculation of the distance."
      },
      {
        name: "Return to Quezon City",
        image: "/tour/company14.jpg",
        description: "The journey back to metropolitan Manila, transitioning from the highland climate to prepare for departure the following day.",
        activities: "By 11:30 AM, we reunited to have lunch and prepare for our return trip to Quezon City. We arrived at our dormitory around 6:00 PM, where we rested briefly before having dinner and beginning to pack our luggage for the next day's flight home. The evening was quiet as we reflected on the unforgettable week of experiences we had shared across multiple destinations."
      }
    ],
    speakers: []
  },
  
  // Day 8 - K2-18b (Return Journey)
  {
    day: 8,
    planet: "K2-18b",
    planetInfo: "A potentially habitable exoplanet orbiting the red dwarf star K2-18, located 124 light-years away in the constellation Leo.",
    colorScheme: {
      primary: "from-indigo-600 to-violet-900",
      secondary: "border-indigo-500",
      accent: "bg-indigo-600",
      text: "text-indigo-500",
      background: "bg-gradient-to-b from-indigo-800/20 to-indigo-700/5"
    },
    planetImage: "/tour/k218b.png",
    companies: [
      {
        name: "NAIA Terminal 2",
        image: "/tour/company15.jpg",
        description: "The main international gateway serving as the departure point for the return journey after completing the industrial tour program.",
        activities: "Our final tour day arrived as we left the dormitory in Quezon City early in the morning, heading to NAIA Terminal 2 for our flight back to Zamboanga City. We gathered our belongings, checked our luggage, and prepared for the journey home with mixed emotions about concluding our educational expedition."
      },
      {
        name: "Return to Zamboanga",
        image: "/tour/company16.jpg",
        description: "The completion of the circular journey, bringing participants back to their starting point with new knowledge, experiences, and professional connections.",
        activities: "The flight home was smooth, though tinged with some sadness at leaving behind the exciting week of exploration in Manila, Tagaytay, and Baguio. Despite physical exhaustion from our extensive travels, we returned with valuable knowledge, real-world industry exposure, and unforgettable memories. The tour provided each of us with new perspectives on potential career paths and a deeper appreciation for the diverse opportunities awaiting us after graduation."
      }
    ],
    speakers: []
  }
];

// Create a custom TourFooter component
const TourFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {/* Same stars as in the main Footer */}
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
          <span className="text-xs text-muted-foreground">Return to top</span>
          <button
            onClick={scrollToTop}
            className="p-2 border border-primary/30 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

// Updated TourNavbar component to match Home page navigation styling
const TourNavbar = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1); // Default to Day 1
  const mobileNavRef = useRef(null);
  const navContentRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // Create simplified nav items from tourData - just days, no planets
  const navItems = tourData.map(day => ({
    name: `Day ${day.day}`,
    href: `#day-${day.day}`,
    day: day.day
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Track which section is currently in view
      const sections = tourData.map(day => 
        document.getElementById(`day-${day.day}`)
      );
      
      // Calculate which section is most in view
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            setActiveDay(tourData[i].day);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside of menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen && 
        navContentRef.current && 
        !navContentRef.current.contains(event.target) && 
        toggleBtnRef.current && 
        !toggleBtnRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    let scrollPosition = 0;
    
    if (isMenuOpen) {
      // Save current scroll position before locking
      scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position when unlocking
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      
      // Only attempt to restore scroll if we have a position saved
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-4 bg-background/80 backdrop-blur-md shadow-xs" : "py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Left - Logo */}
        <Link
          className="text-xl font-bold text-primary flex items-center"
          to="/"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Space</span>{" "}
            Tour
          </span>
        </Link>

        {/* Center - Navigation Items (Desktop) - Made more centered like Home page */}
        <div className="hidden lg:flex items-center justify-center flex-grow mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 p-1 rounded-lg bg-background/50 backdrop-blur-sm border-border/50">
            {navItems.map((item) => {
              const isActive = activeDay === item.day;
              return (
                <a
                  key={item.day}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium",
                    isActive 
                      ? "bg-primary/90 text-primary-foreground shadow-sm" 
                      : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right - Theme toggle and mobile menu button */}
        <div className="flex items-center z-10">
          {/* Theme toggle - always visible */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border-primary/20 hover:bg-primary/10 transition-colors duration-300 mr-2"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-blue-900" />
            )}
          </button>

          {/* Mobile menu button - only visible on mobile */}
          <button
            ref={toggleBtnRef}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-foreground z-50 relative"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav overlay - Now matching the Home page styling */}
        <div
          ref={mobileNavRef}
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-30",
            "flex items-center justify-center lg:hidden",
            "transition-all duration-300",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* Mobile nav content wrapper - Same as Home page */}
          <div 
            ref={navContentRef}
            className="flex flex-col items-center max-h-[80vh] overflow-y-auto py-8"
          >
            <div className="flex flex-col space-y-3 p-2 bg-background/30 rounded-lg border border-border/50">
              {navItems.map((item, index) => {
                const isActive = activeDay === item.day;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={cn(
                      "px-6 py-3 rounded-md transition-all duration-300 text-center",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background/80 text-foreground/80 hover:bg-primary/10 hover:text-primary"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transitionDelay: isMenuOpen ? `${200 + index * 100}ms` : '0ms',
                      transitionProperty: 'transform, opacity',
                      transitionDuration: '500ms'
                    }}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const TourPage = () => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchPhase, setLaunchPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const mobileNavRef = useRef(null);
  const navContentRef = useRef(null);
  const toggleBtnRef = useRef(null);
  
  useEffect(() => {
    // Show return rocket after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Check initial theme on load
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(
      storedTheme === "dark" ||
        (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    return () => clearTimeout(timer);
  }, []);
  
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  
  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };
  
  const handleReturnRocketClick = () => {
    if (!isLaunching) {
      window.scrollTo(0, 0);
      setIsLaunching(true);
      setLaunchPhase(1);
      
      setTimeout(() => {
        setLaunchPhase(2);
      }, 1500);
      
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
      
      {/* Navigation - new component */}
      <TourNavbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Launch sequence overlay */}
      {launchPhase > 0 && launchPhase < 3 && (
        <div 
          className="fixed inset-0 z-40 transition-all duration-500 flex items-center justify-center"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${launchPhase === 1 ? 0.8 : 0.9})`,
            backdropFilter: "blur(8px)"
          }}
        >
          <div className="absolute top-0 left-0 w-full h-64 opacity-80">
            <div className="w-full h-full bg-gradient-to-b from-purple-900 to-transparent relative overflow-hidden">
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
      
      {/* Return Rocket - positioned at bottom right */}
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
        {isHovering && launchPhase === 0 && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap border border-primary/30 animate-fade-in">
            Return To Orbit
          </div>
        )}
        
        <div className={`relative ${launchPhase === 1 ? "w-64 h-64" : "w-16 h-16 md:w-24 md:h-24"} transition-all duration-1000`}>
          {(isLaunching || launchPhase > 0) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 md:w-12 md:h-24 scale-100">
              <div className="absolute top-0 left-0 w-full h-full flex justify-center">
                <div className={`w-full h-full animate-pulse bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-b-full opacity-90
                  ${launchPhase === 1 ? "scale-150" : ""}`}></div>
              </div>
            </div>
          )}
          
          <img
            src="/img/rocket.png" 
            alt="Return Rocket" 
            className={`w-full h-full object-contain transition-transform duration-300
              ${launchPhase === 0 && !isLaunching ? "hover:scale-110" : ""}`}
          />
          
          {launchPhase === 0 && <div className="absolute inset-0 animate-float"></div>}
        </div>
      </div>
      
      {/* Main Content - adjust top padding to account for navbar */}
      <main>
        {/* Introduction section */}
        <section
          id="tour-intro"
          className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
          <div className="container max-w-4xl mx-auto text-center z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="opacity-0 animate-fade-in">Industrial</span>
                <span className="text-primary opacity-0 animate-fade-in-delay-1"> Tour </span>
                <span className="text-gradient opacity-0 animate-fade-in-delay-2">Experience</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                Join us as we revisit our eight-day educational journey across Manila, Tagaytay, and Baguio. 
                From company visits to cultural sites, our industrial tour combined professional learning 
                with memorable experiences that inspired and prepared us for future careers.
              </p>

              <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                <a href="#day-1" className="cosmic-button">
                  Start The Journey
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground mb-2">Explore</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </section>
        
        {/* Planet Sections - Rest of the content remains mostly unchanged */}
        {tourData.map((dayData, dayIndex) => (
          <section 
            key={dayIndex} 
            id={`day-${dayData.day}`}
            className={`py-24 px-4 relative ${dayIndex % 2 !== 0 ? 'bg-secondary/30' : ''}`}
          >
            <div className="container mx-auto max-w-5xl">
              {/* Day Header with planetary styling */}
              <div className="flex flex-col items-center mb-12">
                {/* Planet image and effects - keep this part */}
                <div className="relative mb-6">
                  <div className="w-28 h-28 md:w-36 md:h-36 relative">
                    {/* Special effects for planets - keep these */}
                    {dayData.planet === "TRAPPIST-1e" && (
                      <div className="absolute inset-0 w-[140%] h-full -left-[20%] top-1/2 -translate-y-1/2 
                                  border-4 border-purple-600/40 rounded-full rotate-12"></div>
                    )}
                    {dayData.planet === "HD 189733b" && (
                      <div className="absolute inset-0 w-full h-full bg-blue-500/20 rounded-full animate-pulse-subtle"></div>
                    )}
                    {dayData.planet === "Gliese 581d" && (
                      <div className="absolute inset-0 w-full h-full bg-teal-500/20 rounded-full animate-pulse-slow"></div>
                    )}
                    {dayData.planet === "TOI-700d" && (
                      <div className="absolute inset-0 w-[130%] h-[130%] -left-[15%] -top-[15%] 
                                  border-4 border-amber-500/30 rounded-full -rotate-12"></div>
                    )}
                    {dayData.planet === "LHS 1140b" && (
                      <div className="absolute inset-0 w-full h-full bg-cyan-500/20 rounded-full animate-pulse-subtle"></div>
                    )}
                    {dayData.planet === "K2-18b" && (
                      <div className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] 
                                  border-2 border-indigo-500/40 rounded-full rotate-45"></div>
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
                        dayData.colorScheme.text === 'text-rose-500' ? '#f43f5e' :
                        dayData.colorScheme.text === 'text-teal-500' ? '#14b8a6' :
                        dayData.colorScheme.text === 'text-amber-500' ? '#f59e0b' :
                        dayData.colorScheme.text === 'text-cyan-500' ? '#06b6d4' :
                        '#818cf8'
                     })`}}>
                </div>
              </div>
              
              {/* Company Cards grid */}
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
                      <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">About the Location</h4>
                      <p className="text-muted-foreground">
                        {company.description}
                      </p>
                    </div>
                    
                    {/* Activities section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Our Experience</h4>
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
            </div>
          </section>
        ))}

        {/* Travel Partner DJM Section - Added after all planet sections */}
        <section className="py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full opacity-70 mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Tour Partner</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We extend our sincere appreciation to our travel partner who made this educational journey possible
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
                  Our expert guide through this educational industrial tour
                </p>
                
                <div className="space-y-4">
                  <p>
                    Our eight-day industrial tour wouldn't have been possible without the exceptional organizational 
                    skills of DJM Travel & Tour Services. Their careful planning transformed an educational requirement 
                    into a journey filled with meaningful experiences across Manila, Tagaytay, and Baguio.
                  </p>
                  
                  <p>
                    From coordinating transportation during unpredictable weather to arranging exclusive sessions 
                    with industry leaders like the President of Google Philippines, their attention to detail enhanced 
                    every aspect of our trip. They struck the perfect balance between professional development, 
                    cultural immersion, and recreational activities.
                  </p>
                  
                  <p>
                    Although we returned physically tired from our extensive travels, we came home intellectually 
                    energized with new knowledge, valuable industry connections, and practical insights for our 
                    future careers. DJM's thoughtful guidance ensured each participant found personal value 
                    and growth throughout this comprehensive industrial tour experience.
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
      <TourFooter />
      
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
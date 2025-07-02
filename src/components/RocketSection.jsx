import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RocketSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchPhase, setLaunchPhase] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  const handleRocketClick = () => {
    if (!isLaunching) {
      window.scrollTo(0, 0);
      
      // Start the launch sequence
      setIsLaunching(true);
      setLaunchPhase(1);
      
      // Phase 2: Flying to the top
      setTimeout(() => {
        setLaunchPhase(2);
      }, 1500);
      
      // Phase 3: Disappear and navigate to tour page
      setTimeout(() => {
        setLaunchPhase(3);
        setTimeout(() => {
          navigate('/tour');
        }, 500);
      }, 3000);
    }
  };

  return (
    <div className="relative h-32 overflow-hidden">
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
      
      {/* Rocket positioned at bottom right or centered when launching */}
      <div
        className={`${launchPhase === 0 ? "fixed bottom-20 right-8 md:right-16" : "fixed"} 
          z-50 cursor-pointer transform transition-all duration-1000 
          ${isVisible && launchPhase === 0 ? "translate-y-0 opacity-100" : ""}
          ${launchPhase === 1 ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
          ${launchPhase === 2 ? "top-10 left-1/2 -translate-x-1/2 rotate-0 scale-50" : ""}
          ${launchPhase === 3 ? "top-0 left-1/2 -translate-x-1/2 opacity-0 scale-0" : ""}
          ${launchPhase === 0 && isLaunching ? "translate-y-[-150vh] rotate-12" : ""}`}
        onClick={launchPhase === 0 ? handleRocketClick : undefined}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label="Rocket - click to start space tour"
      >
        {/* Hover tooltip */}
        {isHovering && launchPhase === 0 && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap border border-primary/30 animate-fade-in">
            Explore The Space
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
            alt="Rocket" 
            className={`w-full h-full object-contain transition-transform duration-300
              ${launchPhase === 0 && !isLaunching ? "hover:scale-110" : ""}`}
          />
          
          {/* Floating animation */}
          {launchPhase === 0 && <div className="absolute inset-0 animate-float"></div>}
        </div>
      </div>
    </div>
  );
};
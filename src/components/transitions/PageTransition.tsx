
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("animate-fade-in");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransistionStage("animate-fade-out");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "animate-fade-out") {
      setTransistionStage("animate-fade-in");
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full transition-all duration-300", 
        transitionStage,
        className
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

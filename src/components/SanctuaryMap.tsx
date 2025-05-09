
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Location, Season } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface SanctuaryMapProps {
  locations: Location[];
  season: Season;
}

const SanctuaryMap: React.FC<SanctuaryMapProps> = ({ locations, season }) => {
  const navigate = useNavigate();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const seasonBackgrounds = {
    spring: "bg-gradient-to-b from-nature-100 to-nature-200/50",
    summer: "bg-gradient-to-b from-nature-100/80 to-nature-300/30",
    autumn: "bg-gradient-to-b from-amber-50/80 to-amber-100/50",
    winter: "bg-gradient-to-b from-sky-50/90 to-sky-100/70"
  };

  const seasonTitles = {
    spring: "Frühling",
    summer: "Sommer",
    autumn: "Herbst",
    winter: "Winter"
  };

  const handleLocationClick = (locationId: string) => {
    navigate(`/location/${locationId}`);
  };

  return (
    <div className={`relative w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden shadow-lg border border-white/50 ${seasonBackgrounds[season]} animate-scale-in`}>
      <div className="map-container">
        {/* This could be replaced with an actual map image for each season */}
        <div className="absolute inset-0 p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-playfair text-center mb-6 md:mb-8 text-nature-600">
            Dein innerer Kraftort im {seasonTitles[season]}
          </h2>
          
          {/* Map locations */}
          {locations.map((location) => (
            <React.Fragment key={location.id}>
              <div 
                className="sanctuary-map-point"
                style={{ 
                  left: `${location.xPosition}%`, 
                  top: `${location.yPosition}%`,
                  backgroundColor: hoveredLocation === location.id ? '#8B5CF6' : undefined
                }}
                onClick={() => handleLocationClick(location.id)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onTouchStart={() => setHoveredLocation(location.id)}
                onTouchEnd={() => setHoveredLocation(null)}
              />
              <div 
                className={`map-tooltip ${isMobile ? "text-xs py-1 px-2" : ""}`}
                style={{ 
                  left: `${location.xPosition}%`, 
                  top: `${location.yPosition - 5}%` 
                }}
              >
                {location.name}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SanctuaryMap;

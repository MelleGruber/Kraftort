
import React from 'react';
import { Season } from '@/types';
import { Leaf, Sun, Snowflake, Wind } from 'lucide-react';

interface SeasonSelectorProps {
  currentSeason: Season;
  onSeasonChange: (season: Season) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ currentSeason, onSeasonChange }) => {
  const seasons: { id: Season; name: string; icon: React.ReactNode }[] = [
    { id: 'spring', name: 'Frühling', icon: <Leaf className="w-4 h-4" /> },
    { id: 'summer', name: 'Sommer', icon: <Sun className="w-4 h-4" /> },
    { id: 'autumn', name: 'Herbst', icon: <Wind className="w-4 h-4" /> },
    { id: 'winter', name: 'Winter', icon: <Snowflake className="w-4 h-4" /> },
  ];
  
  return (
    <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto py-2">
      <div className="inline-flex rounded-xl shadow-md bg-white/80 backdrop-blur-sm p-1 border border-nature-100">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => onSeasonChange(season.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-medium rounded-lg transition-all duration-200
                      ${currentSeason === season.id 
                        ? 'season-btn active text-nature-600 shadow-sm' 
                        : 'hover:bg-nature-100 text-nature-700'}`}
            aria-current={currentSeason === season.id ? 'page' : undefined}
          >
            {season.icon}
            <span>{season.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonSelector;

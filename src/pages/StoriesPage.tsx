
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import SeasonSelector from '@/components/SeasonSelector';
import { getStoriesBySeason } from '@/data/sanctuary';
import { Season } from '@/types';

const StoriesPage = () => {
  const [currentSeason, setCurrentSeason] = useState<Season>('summer');
  const stories = getStoriesBySeason(currentSeason);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-5xl font-playfair font-bold mb-3 md:mb-4 text-nature-600
                         bg-gradient-to-r from-nature-600 to-nature-500 bg-clip-text text-transparent">
              Geschichten vom Kraftort
            </h1>
            <p className="text-base md:text-lg text-nature-700 max-w-2xl mx-auto">
              Entdecke die verschiedenen Geschichten deines inneren Kraftortes.
            </p>
          </div>
          
          <SeasonSelector currentSeason={currentSeason} onSeasonChange={setCurrentSeason} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            {stories.length > 0 ? (
              stories.map((item, index) => (
                <div key={item.story.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <StoryCard 
                    locationId={item.locationId} 
                    story={item.story} 
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 md:p-12 text-center">
                <p className="text-base md:text-lg text-nature-600">
                  Keine Geschichten für diese Jahreszeit verfügbar.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoriesPage;

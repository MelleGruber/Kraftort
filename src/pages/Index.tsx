import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SanctuaryMap from '@/components/SanctuaryMap';
import SeasonSelector from '@/components/SeasonSelector';
import { sanctuaryData } from '@/data/sanctuary';
import { Season } from '@/types';
const Index = () => {
  const [currentSeason, setCurrentSeason] = useState<Season>('summer');
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-5xl font-playfair font-bold mb-3 md:mb-4 text-nature-600 
                          bg-gradient-to-r from-nature-600 to-nature-500 bg-clip-text text-transparent">Die Hütte am See</h1>
            <p className="text-base md:text-lg text-nature-700 max-w-2xl mx-auto">Eine Reise zu deinem inneren Sicheren Ort - ein Ort voller Geborgenheit und Kraft.</p>
          </div>
          
          <SeasonSelector currentSeason={currentSeason} onSeasonChange={setCurrentSeason} />
          
          <div className="mb-6 md:mb-10">
            <SanctuaryMap locations={sanctuaryData.locations} season={currentSeason} />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 md:p-6 border border-nature-100">
            <h2 className="text-xl md:text-2xl font-playfair font-semibold mb-3 md:mb-4 text-nature-600">
              Willkommen zu deiner inneren Reise
            </h2>
            <div className="prose prose-base md:prose-lg max-w-none">
              <p>
                Diese Fantasiereise lädt dich ein, zu deinem inneren Kraftort zu reisen – einem 
                Ort voller Geborgenheit, Ruhe und innerer Stärke. Klicke auf die verschiedenen 
                Orte auf der Karte, um die Geschichten zu erkunden, oder wähle eine andere Jahreszeit, 
                um neue Aspekte deines Kraftortes zu entdecken.
              </p>
              <p>
                Jede Reise beginnt mit einem tiefen Atemzug und dem Wunsch nach innerer Ruhe und Kraft.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Index;
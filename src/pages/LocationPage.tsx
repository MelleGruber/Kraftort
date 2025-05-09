
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import ImageGallery from '@/components/ImageGallery';
import { sanctuaryData } from '@/data/sanctuary';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const LocationPage = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  
  const location = sanctuaryData.locations.find(loc => loc.id === locationId);
  
  if (!location) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 pt-24 text-center">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Ort nicht gefunden</h1>
          <p className="mb-8">Der gewünschte Ort existiert nicht.</p>
          <Button onClick={() => navigate('/')}>Zurück zur Karte</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 md:mb-6">
            <Link to="/" className="inline-flex items-center text-sm md:text-base text-nature-500 hover:text-nature-600 transition-colors group">
              <ArrowLeft className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:-translate-x-1" />
              Zurück zur Karte
            </Link>
          </div>
          
          
          <h2 className="text-xl md:text-3xl font-playfair font-semibold mb-4 md:mb-6 text-nature-600">
            Geschichten von diesem Ort
          </h2>
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm">Frühling</Button>
            <Button variant="outline" size="sm">Sommer</Button>
            <Button variant="outline" size="sm">Herbst</Button>
            <Button variant="outline" size="sm">Winter</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {location.stories
              .sort((a, b) => {
                const seasons = ['spring', 'summer', 'autumn', 'winter'];
                return seasons.indexOf(a.season) - seasons.indexOf(b.season);
              })
              .map((story, index) => (
              <div key={story.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <StoryCard 
                  locationId={location.id} 
                  story={story} 
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocationPage;

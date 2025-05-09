
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// ImageGallery import is not directly used here anymore for the main page structure
import { sanctuaryData } from '@/data/sanctuary';
import { Button } from '@/components/ui/button';
import StoryNavigationView from '@/components/StoryNavigationView'; // Added import

const StoryPage = () => {
  const { locationId, storyId } = useParams<{ locationId: string; storyId: string }>();
  const navigate = useNavigate();
  
  const location = sanctuaryData.locations.find(loc => loc.id === locationId);
  const story = location?.stories.find(s => s.id === storyId);
  
  if (!location || !story) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 pt-24 text-center">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Geschichte nicht gefunden</h1>
          <p className="mb-8">Die gewünschte Geschichte existiert nicht.</p>
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Link to={`/location/${locationId}`} className="text-sm md:text-base text-nature-500 hover:text-nature-600 transition-colors">
              &larr; Zurück zu {location.name}
            </Link>
          </div>
          
          <article className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
            <header className="mb-4 md:mb-6">
              <div className="text-xs md:text-sm text-nature-500 mb-2">
                {story.season === 'spring' ? 'Frühling' : 
                story.season === 'summer' ? 'Sommer' :
                story.season === 'autumn' ? 'Herbst' : 'Winter'} | {location.name}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-playfair font-bold text-nature-600">
                {story.title}
              </h1>
            </header>

            {/* Added StoryNavigationView */}
            {locationId && storyId && story && (
              <StoryNavigationView 
                locationId={locationId} 
                storyId={storyId} 
                story={story} 
                activeView="story" 
              />
            )}
            
            <div className="story-content text-base md:text-lg space-y-4 text-center max-w-2xl mx-auto">
              {story.content.split('\n').map((paragraph, idx) => {
                // Check for image markers
                const imageMatch = paragraph.match(/\[IMAGE:(.*?)\]/);
                if (imageMatch) {
                  const imageName = imageMatch[1];
                  const imageUrl = `/images/cabin/${imageName}`;
                  return (
                    <div key={idx} className="my-6">
                      <img 
                        src={imageUrl} 
                        alt="" 
                        className="mx-auto rounded-lg shadow-md max-w-full h-auto max-h-96 object-contain"
                      />
                    </div>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </article>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-6 md:mt-8">
            <Button variant="outline" onClick={() => navigate(`/location/${locationId}`)}>
              Alle Geschichten von {location.name}
            </Button>
            <Button onClick={() => navigate('/')}>
              Zurück zur Karte
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoryPage;

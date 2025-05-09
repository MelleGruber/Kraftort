import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import { sanctuaryData } from '@/data/sanctuary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Headphones } from 'lucide-react'; // Removed Eye
import StoryNavigationView from '@/components/StoryNavigationView'; // Added import

const AudioPage = () => {
  const { locationId, storyId } = useParams<{ locationId: string; storyId: string }>();
  const navigate = useNavigate();
  // Removed viewMode state
  
  const location = sanctuaryData.locations.find(loc => loc.id === locationId);
  const story = location?.stories.find(s => s.id === storyId);
  
  if (!location || !story || !story.audioUrl) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 pt-24 text-center">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Audio nicht verfügbar</h1>
          <p className="mb-8">Die gewünschte Audio-Datei existiert nicht.</p>
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
            <Link to={`/location/${locationId}`} className="inline-flex items-center text-sm md:text-base text-nature-500 hover:text-nature-600 transition-colors">
              <ArrowLeft className="mr-1.5 h-3 w-3" />
              Zurück zu {location.name}
            </Link>
          </div>
          
          <article className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2 text-nature-600">
              {story.title}
            </h1>
            <div className="text-sm text-nature-500 mb-1"> {/* Adjusted margin */}
              {location.name} • {story.season === 'spring' ? 'Frühling' : 
              story.season === 'summer' ? 'Sommer' :
              story.season === 'autumn' ? 'Herbst' : 'Winter'}
            </div>

            {/* Added StoryNavigationView */}
            {locationId && storyId && story && (
              <StoryNavigationView 
                locationId={locationId} 
                storyId={storyId} 
                story={story} 
                activeView="audio" 
              />
            )}
            
            {/* AudioPlayer is now always visible on this page */}
            <div className="mb-6">
              <AudioPlayer audioUrl={`/audio/${story.audioUrl.split('/').pop()}`} title={story.title} />
            </div>
            
            {/* Removed "Geschichte lesen" button, now handled by StoryNavigationView */}
            <div className="flex justify-end"> {/* Adjusted to only have download button */}
              <a 
                href={`/audio/${story.audioUrl.split('/').pop()}`} 
                download={`${story.title.replace(/\s+/g, '_')}.mp3`}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium rounded-md transition-colors bg-nature-400 hover:bg-nature-500 text-white px-4 py-2"
              >
                <Download size={16} />
                Audio herunterladen
              </a>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AudioPage;

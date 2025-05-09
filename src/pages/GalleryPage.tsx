import React from 'react';
import { useParams } from 'react-router-dom';
import { sanctuaryData } from '@/data/sanctuary';
import ImageGallery from '@/components/ImageGallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Story } from '@/types';
import StoryNavigationView from '@/components/StoryNavigationView'; // Added import

const extractImagesFromContent = (content: string, locationId: string): string[] => {
  const imageTags = content.match(/\[IMAGE:(.*?)\]/g);
  if (!imageTags) {
    return [];
  }
  return imageTags.map(tag => {
    const filename = tag.substring(7, tag.length - 1); // Extracts filename from "[IMAGE:filename.jpg]"
    return `/images/${locationId}/${filename}`;
  });
};

const GalleryPage: React.FC = () => {
  const { locationId, storyId } = useParams<{ locationId: string; storyId: string }>();

  if (!locationId || !storyId) {
    // Handle cases where params might be undefined, though typically caught by router
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Fehler</h1>
          <p>Ungültige Anfrage für die Bildergalerie.</p>
        </main>
        <Footer />
      </>
    );
  }

  const location = sanctuaryData.locations.find(loc => loc.id === locationId);
  let story: Story | undefined;

  if (location) {
    story = location.stories.find(s => s.id === storyId);
  }

  if (!story || !location) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Geschichte nicht gefunden</h1>
          <p>Die angeforderte Bildergalerie konnte nicht gefunden werden.</p>
        </main>
        <Footer />
      </>
    );
  }

  const imagesFromContent = extractImagesFromContent(story.content, locationId);

  if (imagesFromContent.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-playfair font-bold mb-2 text-nature-700">{story.title}</h1>
          <p className="text-lg text-muted-foreground mb-1">Bildergalerie</p>
          {/* Added StoryNavigationView */}
          {locationId && storyId && story && (
            <StoryNavigationView 
              locationId={locationId} 
              storyId={storyId} 
              story={story} 
              activeView="gallery" 
            />
          )}
          <p>In dieser Geschichte sind keine Bilder direkt im Text eingebettet.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-playfair font-bold mb-2 text-nature-700">{story.title}</h1>
        <p className="text-lg text-muted-foreground mb-1">Bildergalerie</p>
        {/* Added StoryNavigationView */}
        {locationId && storyId && story && (
          <StoryNavigationView 
            locationId={locationId} 
            storyId={storyId} 
            story={story} 
            activeView="gallery" 
          />
        )}
        <ImageGallery images={imagesFromContent} alt={story.title} />
      </main>
      <Footer />
    </>
  );
};

export default GalleryPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Story } from '@/types';
import { Headphones, Image, BookOpen } from 'lucide-react';

interface StoryNavigationViewProps {
  locationId: string;
  storyId: string;
  story: Story;
  activeView: 'audio' | 'gallery' | 'story';
}

const extractImagesFromContent = (content: string, locationId: string): string[] => {
  const imageTags = content.match(/\[IMAGE:(.*?)\]/g);
  if (!imageTags) {
    return [];
  }
  return imageTags.map(tag => {
    const filename = tag.substring(7, tag.length - 1);
    return `/images/${locationId}/${filename}`;
  });
};

const StoryNavigationView: React.FC<StoryNavigationViewProps> = ({ locationId, storyId, story, activeView }) => {
  const navigate = useNavigate();
  const imagesInContent = extractImagesFromContent(story.content, locationId);

  return (
    <div className="flex gap-2 mb-6 mt-2 justify-center">
      {story.audioUrl && (
        <Button
          variant={activeView === 'audio' ? 'default' : 'outline'}
          onClick={() => navigate(`/audio/${locationId}/${storyId}`)}
          className="gap-2"
          aria-current={activeView === 'audio' ? 'page' : undefined}
        >
          <Headphones size={16} />
          <span>Hören</span>
        </Button>
      )}
      {imagesInContent.length > 0 && (
        <Button
          variant={activeView === 'gallery' ? 'default' : 'outline'}
          onClick={() => navigate(`/gallery/${locationId}/${storyId}`)}
          className="gap-2"
          aria-current={activeView === 'gallery' ? 'page' : undefined}
        >
          <Image size={16} />
          <span>Sehen</span>
        </Button>
      )}
      <Button
        variant={activeView === 'story' ? 'default' : 'outline'}
        onClick={() => navigate(`/story/${locationId}/${storyId}`)}
        className="gap-2"
        aria-current={activeView === 'story' ? 'page' : undefined}
      >
        <BookOpen size={16} />
        <span>Lesen</span>
      </Button>
    </div>
  );
};

export default StoryNavigationView;

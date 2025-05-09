
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Headphones, Image } from 'lucide-react';

interface StoryCardProps {
  locationId: string;
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ locationId, story }) => {
  const navigate = useNavigate();
  
  const seasonLabels = {
    spring: 'Frühling',
    summer: 'Sommer',
    autumn: 'Herbst',
    winter: 'Winter'
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-nature-100/50 overflow-hidden">
      {story.images.length > 0 && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={story.images[0]} 
            alt={story.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm px-2 py-1 text-xs text-nature-600 rounded-tl-md">
            {seasonLabels[story.season]}
          </div>
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="font-playfair text-xl">{story.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {story.content.substring(0, 150)}...
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end gap-2">
        {story.audioUrl && (
          <Button 
            onClick={() => navigate(`/audio/${locationId}/${story.id}`)}
            variant="outline"
            className="text-sm gap-2"
          >
            <Headphones size={16} />
            <span>Hören</span>
          </Button>
        )}
        {story.images && story.images.length > 0 && (
          <Button
            onClick={() => navigate(`/gallery/${locationId}/${story.id}`)}
            variant="outline"
            className="text-sm gap-2"
          >
            <Image size={16} />
            <span>Sehen</span>
          </Button>
        )}
        <Button 
          onClick={() => navigate(`/story/${locationId}/${story.id}`)}
          className="text-sm gap-2 bg-nature-400 hover:bg-nature-500"
        >
          <BookOpen size={16} />
          <span>Lesen</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;

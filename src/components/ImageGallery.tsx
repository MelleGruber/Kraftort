
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images.length) {
    return null;
  }

  return (
    <div className="mt-8">
      <Card className="overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
          <img 
            src={images[activeImage]} 
            alt={`${alt} - Bild ${activeImage + 1}`} 
            className="object-contain w-full max-h-[80vh] bg-gray-50"
          />
        </div>
        
        {images.length > 1 && (
          <div className="flex overflow-x-auto p-2 gap-2 bg-gray-50">
            {images.map((image, index) => (
              <button
                key={index}
                className={`min-w-[80px] h-16 border-2 transition-all ${
                  activeImage === index ? 'border-nature-400' : 'border-transparent'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-contain bg-gray-100"
                />
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageGallery;

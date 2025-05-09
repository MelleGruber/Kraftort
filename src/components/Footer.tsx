
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-nature-200/40 to-nature-300/40 backdrop-blur-sm py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6">
          <p className="text-nature-600 font-playfair text-sm md:text-base">
            Innerer Kraftort © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4 text-xs md:text-sm text-nature-500">
            <a href="#" className="hover:text-nature-600 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-nature-600 transition-colors">Impressum</a>
          </div>
        </div>
        <p className="mt-2 text-xs text-nature-500 max-w-md mx-auto">
          Ein Ort der inneren Ruhe und Kraft - inspiriert von Luise Redmann's Fantasiereisen
        </p>
      </div>
    </footer>
  );
};

export default Footer;

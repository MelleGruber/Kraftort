import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const Header = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return <header className="bg-gradient-to-r from-nature-200/40 to-nature-300/40 backdrop-blur-sm shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <h1 className="text-lg md:text-2xl font-playfair font-bold text-nature-600 tracking-wide">Mein innerer Kraftort</h1>
        </Link>
        
        {isMobile ? <>
            <button className="p-2 text-nature-600 hover:text-nature-400 transition-colors rounded-full bg-white/20 backdrop-blur-sm" onClick={toggleMenu} aria-label="Toggle menu">
              <Menu size={22} />
            </button>
            
            {menuOpen && <nav className="absolute top-full right-0 left-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 animate-fade-in">
                <ul className="flex flex-col py-4 px-6 text-nature-600 divide-y divide-nature-100">
                  <li className="py-3">
                    <Link to="/" className="block hover:text-nature-400 transition-colors" onClick={() => setMenuOpen(false)}>
                      Karte
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link to="/stories" className="block hover:text-nature-400 transition-colors" onClick={() => setMenuOpen(false)}>
                      Geschichten
                    </Link>
                  </li>
                </ul>
              </nav>}
          </> : <nav>
            <ul className="flex gap-6 text-nature-600">
              <li>
                <Link to="/" className="relative hover:text-nature-400 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-nature-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Karte
                </Link>
              </li>
              <li>
                <Link to="/stories" className="relative hover:text-nature-400 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-nature-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Geschichten
                </Link>
              </li>
            </ul>
          </nav>}
      </div>
    </header>;
};
export default Header;
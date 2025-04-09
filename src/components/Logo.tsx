
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-brown flex items-center justify-center transform rotate-45 border-2 border-cream">
            <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
              <span className="text-brown font-bold text-lg transform -rotate-45">Z</span>
            </div>
          </div>
          <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-brown-dark flex items-center justify-center transform -rotate-12 border border-cream">
            <span className="text-cream font-bold text-xs transform rotate-12">C</span>
          </div>
        </div>
        <span className="ml-2 text-2xl font-bold text-brown">Zain & Cole</span>
      </div>
    </Link>
  );
};

export default Logo;

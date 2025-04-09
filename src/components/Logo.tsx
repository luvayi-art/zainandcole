
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-brown-dark flex items-center justify-center transform rotate-12 border-2 border-cream">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
              <span className="text-brown-dark font-bold text-xl transform -rotate-12">Z</span>
            </div>
          </div>
          <div className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-brown flex items-center justify-center transform -rotate-45 border border-cream">
            <span className="text-cream font-bold text-xs transform rotate-45">C</span>
          </div>
        </div>
        <span className="ml-3 text-2xl font-bold text-brown-dark">Zain & Cole</span>
      </div>
    </Link>
  );
};

export default Logo;

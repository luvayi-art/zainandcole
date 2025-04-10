
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/lovable-uploads/e2a6bd7c-996a-413c-ae8e-5d64f1b59e82.png',
    title: 'African Elegance',
    subtitle: 'Authentic handcrafted Maasai jewelry and accessories',
    ctaText: 'Shop Collection',
    ctaLink: '/shop',
  },
  {
    id: 2,
    image: '/lovable-uploads/f975caab-a2f0-4edc-8e8a-4a51f22c9914.png',
    title: 'Cultural Heritage',
    subtitle: 'Celebrating African traditions through fashion',
    ctaText: 'Explore Now',
    ctaLink: '/shop',
  },
  {
    id: 3,
    image: '/lovable-uploads/c6ca3aa2-e850-4106-9ffe-593551e539d6.png',
    title: 'Artisan Crafted',
    subtitle: 'Supporting local artisans from Kisumu to Canada',
    ctaText: 'Learn More',
    ctaLink: '/story',
  },
  {
    id: 4,
    image: '/lovable-uploads/559f6b73-5ac1-4856-a7b8-90bd1409e87d.png',
    title: 'Handmade With Love',
    subtitle: 'Each piece tells a story of tradition and craftsmanship',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
  },
  {
    id: 5,
    image: '/lovable-uploads/42682d46-0562-47ce-a5c0-c97b666cf39c.png',
    title: 'Authentic Designs',
    subtitle: 'Bringing the spirit of Africa to your wardrobe',
    ctaText: 'View Collection',
    ctaLink: '/shop',
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="relative h-full flex items-center justify-center text-white text-center px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-zoom-in">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8 animate-zoom-in">{slide.subtitle}</p>
              <Link 
                to={slide.ctaLink}
                className="btn-primary inline-block animate-zoom-in"
              >
                {slide.ctaText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors focus:outline-none"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors focus:outline-none"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;


import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { products, getCategories } from '../data/products';
import { MapPin, Award, Gift, Truck } from 'lucide-react';

const HomePage = () => {
  const categories = getCategories();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="font-roboto">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-brown-light text-white p-3 rounded-full mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Authentic Craftsmanship</h3>
              <p className="text-gray-700">Every item made in Africa, by African artisans</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-brown-light text-white p-3 rounded-full mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Community Support</h3>
              <p className="text-gray-700">Supporting families and artisans in Nyanza</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-brown-light text-white p-3 rounded-full mb-4">
                <Gift size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Unique Designs</h3>
              <p className="text-gray-700">Limited-edition pieces you won't find elsewhere</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-brown-light text-white p-3 rounded-full mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Global Shipping</h3>
              <p className="text-gray-700">We deliver from Africa to anywhere in the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-pattern">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                to={`/shop?category=${encodeURIComponent(category)}`} 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg h-64"
              >
                <img 
                  src={products.find(p => p.category === category)?.image} 
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 group-hover:bg-opacity-50 transition-all">
                  <h3 className="text-white text-xl font-bold text-center">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/shop" className="btn-secondary">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-brown text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brown-dark bg-opacity-30 p-6 rounded-lg">
              <div className="mb-4">
                <svg className="w-6 h-6 text-sand" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mb-4">The quality of my beaded necklace is amazing. I love that every purchase supports African artisans directly!</p>
              <div className="font-bold">- Sarah M., Toronto</div>
            </div>
            
            <div className="bg-brown-dark bg-opacity-30 p-6 rounded-lg">
              <div className="mb-4">
                <svg className="w-6 h-6 text-sand" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mb-4">I purchased the Maasai sandals for my daughter's wedding. They were stunning and comfortable. Highly recommend!</p>
              <div className="font-bold">- David K., Vancouver</div>
            </div>
            
            <div className="bg-brown-dark bg-opacity-30 p-6 rounded-lg">
              <div className="mb-4">
                <svg className="w-6 h-6 text-sand" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mb-4">My Ankara fabric arrived quickly and was even more beautiful in person. I can't wait to create something special with it.</p>
              <div className="font-bold">- Michelle T., New York</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-cover bg-center relative" style={{ backgroundImage: `url('/lovable-uploads/acdeb040-c751-4540-88f4-77752d3836cc.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our Journey</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Be part of our story as we connect Africa to the world through fashion, culture, and craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop" className="btn-primary">Shop Now</Link>
            <Link to="/story" className="btn-secondary bg-transparent text-white border-white hover:bg-white/20">Our Story</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

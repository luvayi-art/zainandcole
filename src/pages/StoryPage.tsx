import { Link } from 'react-router-dom';

const StoryPage = () => {
  return (
    <div className="font-roboto">
      {/* Hero Section with Background Image */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/1fb0fe95-715c-45a1-8873-25f45b23f626.png" 
            alt="African landscape background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">Meet the founders who are bridging cultures and craftsmanship from Kisumu to Canada</p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="hexagon overflow-hidden w-full h-[400px] md:h-[500px]">
                  <img 
                    src="/lovable-uploads/499133cc-c5a7-4d55-81c9-20b1876853cc.png" 
                    alt="Mr. & Mrs. Ochieng" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-brown">Meet the Founders: Mr. & Mrs. Ochieng</h2>
              <p className="mb-4 text-gray-700">
                Celebrating African Fashion from Kisumu to Canada
              </p>
              <p className="mb-6 text-gray-700">
                Welcome to our world of color, culture, and craftsmanship. We're Mr. and Mrs. Ochieng — a passionate couple with a shared dream: to showcase the beauty of African fashion to the world.
              </p>
              <p className="mb-6 text-gray-700">
                My name is Emmanuel Ochieng and I was born and raised in Kisumu, a lakeside city in the heart of Nyanza, East Africa. Kisumu is more than just home — it's a rich tapestry of traditions, vibrant marketplaces, bold prints, and soulful sounds. It's here that my love for African fashion was born.
              </p>
              <p className="mb-6 text-gray-700">
                My wife, Zainab Ochieng, is a proud Canadian citizen from the Caribbean island with East African roots. Though born thousands of miles away, her heart beats for African culture. Zainab has always admired the elegance and symbolism behind African garments — from the storytelling power of Kitenge prints to the handcrafted beadwork passed down through generations. Her love for culture, style, and community is woven into everything we do.
              </p>
              <p className="text-gray-700">
                Together, we created this store not just as a business, but as a bridge — connecting the African continent with the diaspora and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-brown">Our Vision</h2>
            <p className="text-xl text-center mb-12 text-gray-700">
              To redefine African fashion for the modern world while staying true to our roots. Every outfit we offer is a celebration of identity, resilience, and beauty.
            </p>
            
            <h3 className="text-2xl font-bold mb-8 text-center text-brown">Our Values</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold mb-3 text-brown">Authenticity</h4>
                <p className="text-gray-700">Every item is made in Africa, by Africans.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold mb-3 text-brown">Community</h4>
                <p className="text-gray-700">We source from local artisans, supporting families, youth, and women in Nyanza.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold mb-3 text-brown">Sustainability</h4>
                <p className="text-gray-700">We're mindful of materials, creating fashion that feels good and does good.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold mb-3 text-brown">Exclusivity</h4>
                <p className="text-gray-700">No fast fashion here — just timeless, limited-edition pieces made with care.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-brown">Why Shop With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brown flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <p className="text-gray-700">Directly support African creators and tailors.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brown flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <p className="text-gray-700">Stand out with unique designs you won't find anywhere else.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brown flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                </svg>
              </div>
              <p className="text-gray-700">Carry a piece of African heritage, made with love and intention.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brown flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <p className="text-gray-700">Be part of a movement that values culture over trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zainab's Note Section */}
      <section className="py-16 bg-brown text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">A Note from Zainab</h2>
            
            <div className="mb-8">
              <img 
                src="/lovable-uploads/099a01c1-5d39-4046-9d92-2d29140b92cf.png" 
                alt="Zainab Ochieng" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
            </div>
            
            <blockquote className="text-xl italic mb-8">
              "African fashion is more than what you wear — it's who you are. It tells your story without speaking a word. I may be Canadian, but I'm African at heart. Every design we curate is deeply personal, and I'm so honored to help bring these stories to life."
            </blockquote>
            
            <p className="font-medium">— Zainab Ochieng</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-brown">Join Us on This Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            When you wear one of our pieces, you're not just wearing fabric — you're wearing a legacy. Thank you for supporting our dream, our culture, and our community.
          </p>
          <p className="mb-8 text-gray-700">
            From Africa to the world,<br />
            With love and purpose,<br />
            Mr. & Mrs. Ochieng<br />
            Founders of Zain & Cole
          </p>
          <Link to="/shop" className="btn-primary">Explore Our Collections</Link>
        </div>
      </section>
    </div>
  );
};

export default StoryPage;

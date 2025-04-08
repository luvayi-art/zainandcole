
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, getCategories } from '../data/products';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = getCategories();

  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term))
      );
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, priceRange]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'min-price') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setPriceRange([0, 200]);
  };

  return (
    <div className="font-roboto">
      {/* Shop Header */}
      <section className="bg-brown-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Shop Our Collections</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover authentic African-crafted products that bring culture, quality, and uniqueness to your everyday life.
          </p>
        </div>
      </section>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden sticky top-16 z-20 bg-white shadow-md p-4">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center w-full py-2 bg-brown text-white rounded-md"
        >
          <SlidersHorizontal size={18} className="mr-2" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-1/4 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brown">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-brown hover:text-brown-dark transition-colors flex items-center"
                >
                  <X size={16} className="mr-1" /> Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label htmlFor="search" className="block text-gray-700 font-medium mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md pl-9 focus:outline-none focus:ring-2 focus:ring-brown/50"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-gray-700 font-medium mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={`w-full text-left py-1 ${selectedCategory === null ? 'text-brown font-semibold' : 'text-gray-600'}`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left py-1 ${selectedCategory === category ? 'text-brown font-semibold' : 'text-gray-600'}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-gray-700 font-medium mb-3">Price Range</h3>
                <div className="flex justify-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <div className="w-1/2">
                    <label htmlFor="min-price" className="block text-sm text-gray-600">Min</label>
                    <input
                      type="number"
                      id="min-price"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={handlePriceChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown/50"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="max-price" className="block text-sm text-gray-600">Max</label>
                    <input
                      type="number"
                      id="max-price"
                      min={priceRange[0]}
                      max="500"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="mb-6 flex flex-wrap justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown/50"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

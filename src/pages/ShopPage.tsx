
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, fetchCategories } from '@/services/productService';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-brown mb-8">Our Collection</h1>
      
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-brown-dark mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === null 
                ? 'bg-brown text-white border-brown' 
                : 'bg-white text-brown-dark border-gray-300 hover:border-brown'
            }`}
          >
            All Products
          </button>
          
          {isLoadingCategories ? (
            <div>Loading categories...</div>
          ) : (
            categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === category 
                    ? 'bg-brown text-white border-brown' 
                    : 'bg-white text-brown-dark border-gray-300 hover:border-brown'
                }`}
              >
                {category}
              </button>
            ))
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoadingProducts ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-md mb-4"></div>
              <div className="bg-gray-200 h-4 w-20 rounded mb-2"></div>
              <div className="bg-gray-200 h-6 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-16 rounded"></div>
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl text-gray-600">No products found in this category.</h3>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-6 py-2 bg-brown text-white rounded-full hover:bg-brown-dark transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;

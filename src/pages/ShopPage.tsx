
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, fetchCategories, insertProducts } from '@/services/productService';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Trash2, RefreshCw } from 'lucide-react';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { data: products = [], isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  useEffect(() => {
    // Check if the current user is an admin
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error("Error checking admin status:", error);
            return;
          }
          
          setIsAdmin(data?.is_admin || false);
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const handleAddProducts = async () => {
    try {
      await insertProducts();
      refetchProducts();
      toast({
        title: "Success",
        description: "Products have been added to the database",
      });
    } catch (error) {
      console.error("Error adding products:", error);
      toast({
        title: "Error",
        description: "Failed to add products to the database",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteAllProducts = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .neq('id', '0'); // Delete all products
      
      if (error) throw error;
      
      refetchProducts();
      toast({
        title: "Success",
        description: "All products have been deleted from the database",
      });
    } catch (error) {
      console.error("Error deleting products:", error);
      toast({
        title: "Error",
        description: "Failed to delete products from the database",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-brown mb-8">Our Collection</h1>
      
      {/* Admin Controls - Only visible to admin users */}
      {isAdmin && (
        <div className="mb-8 p-6 border border-brown rounded-md bg-white/50">
          <h2 className="text-xl font-semibold text-brown-dark mb-4">Admin Controls</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleAddProducts}
              className="bg-brown hover:bg-brown-dark text-white flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              Populate Products
            </Button>
            
            <Button 
              onClick={() => refetchProducts()}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
            >
              <RefreshCw size={18} className="mr-2" />
              Refresh Products
            </Button>
            
            <Button 
              onClick={handleDeleteAllProducts}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center"
            >
              <Trash2 size={18} className="mr-2" />
              Delete All Products
            </Button>
          </div>
          
          <div className="mt-4 bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
            <p className="text-yellow-800">
              <strong>Admin Note:</strong> You're currently signed in as an admin. You can use these controls to manage products in the database.
            </p>
          </div>
        </div>
      )}
      
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

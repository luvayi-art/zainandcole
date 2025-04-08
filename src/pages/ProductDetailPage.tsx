
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { fetchProductById } from '@/services/productService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id || ''),
    enabled: !!id
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your cart",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    try {
      // Check if the product is already in the cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select()
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        // Update the quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item to cart
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity
          });

        if (error) throw error;
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product to cart",
        variant: "destructive"
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your wishlist",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    try {
      // Check if the product is already in the wishlist
      const { data: existingItem } = await supabase
        .from('wishlist_items')
        .select()
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        });
        return;
      }

      // Add new item to wishlist
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: product.id
        });

      if (error) throw error;

      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product to wishlist",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-2">
                {[1, 2, 3].map(n => (
                  <div key={n} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-brown mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="inline-flex items-center text-brown hover:text-brown-dark transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brown transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-brown transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-brown-dark">{product.name}</span>
      </div>
      
      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-brown-dark mb-2">{product.name}</h1>
          <div className="text-sm text-brown mb-4">{product.category}</div>
          
          <div className="text-2xl font-bold text-brown mb-6">${product.price.toFixed(2)}</div>
          
          <div className="text-gray-700 mb-6">
            {product.description}
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="text-gray-700 mr-4">Quantity:</span>
            <div className="flex border border-gray-300 rounded">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex items-center justify-center"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
            
            <button 
              onClick={handleAddToWishlist}
              className="btn-secondary flex items-center justify-center"
            >
              <Heart size={18} className="mr-2" />
              Add to Wishlist
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-medium text-brown-dark mb-2">Product details:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Ethically sourced materials</li>
              <li>Handmade by skilled artisans</li>
              <li>Supports local African communities</li>
              <li>Every purchase tells a unique story</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

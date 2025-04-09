
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (!user) {
        // Allow adding to cart without login, store in local storage
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cartItems.find((item: any) => item.product_id === product.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.push({
            product_id: product.id,
            quantity: 1,
            product: product // Store full product to display without fetching
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cartItems));
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
      } else {
        // If logged in, store in the database
        // Check if product already exists in cart
        const { data: existingCartItem, error: checkError } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          throw checkError;
        }

        if (existingCartItem) {
          // Update existing cart item quantity
          const { error: updateError } = await supabase
            .from('cart_items')
            .update({ 
              quantity: existingCartItem.quantity + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingCartItem.id);

          if (updateError) throw updateError;
        } else {
          // Insert new cart item
          const { error } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: product.id,
              quantity: 1
            });

          if (error) throw error;
        }
        
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  const addToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your wishlist",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    try {
      // Check if product already exists in wishlist
      const { data: existingWishlistItem, error: checkError } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingWishlistItem) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist`
        });
        return;
      }

      // Insert new wishlist item
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: product.id
        });

      if (error) throw error;

      toast({
        title: "Added to Wishlist",
        description: `${product.name} added to your wishlist`
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Quick action buttons */}
          <div className={`absolute bottom-0 left-0 right-0 bg-black/60 p-3 flex justify-between items-center transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
            <button 
              onClick={addToWishlist}
              className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors text-white"
            >
              <Heart size={18} />
            </button>
            <button 
              onClick={addToCart}
              className="ml-auto flex items-center bg-brown py-1 px-3 rounded-full text-white text-sm hover:bg-brown-dark transition-colors"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-brown mb-1">{product.category}</div>
          <h3 className="font-medium text-lg mb-1 group-hover:text-brown transition-colors">{product.name}</h3>
          <div className="font-bold text-brown-dark">${product.price.toFixed(2)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

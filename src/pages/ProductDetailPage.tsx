
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '@/services/productService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product details',
          variant: 'destructive'
        });
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add items to your cart',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    if (!product || !id) return;

    try {
      // Check if product already exists in cart
      const { data: existingCartItem, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingCartItem) {
        // Update existing cart item quantity
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ 
            quantity: existingCartItem.quantity + quantity,
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
            product_id: id,
            quantity: quantity
          });

        if (error) throw error;
      }

      toast({
        title: 'Added to Cart',
        description: `${product.name} added to your cart`
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive'
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add items to your wishlist',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    if (!product || !id) return;

    try {
      // Check if product already exists in wishlist
      const { data: existingWishlistItem, error: checkError } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingWishlistItem) {
        toast({
          title: 'Already in Wishlist',
          description: `${product.name} is already in your wishlist`
        });
        return;
      }

      // Insert new wishlist item
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: id
        });

      if (error) throw error;

      toast({
        title: 'Added to Wishlist',
        description: `${product.name} added to your wishlist`
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to wishlist',
        variant: 'destructive'
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image || '/placeholder.svg'} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold text-brown mb-4">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-4">Quantity:</label>
            <input 
              type="number" 
              id="quantity"
              min="1" 
              max={product.stock || 10} 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-1"
              disabled={!product.stock}
            >
              {product.stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="btn-secondary flex-1"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

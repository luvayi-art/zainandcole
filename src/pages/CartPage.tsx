
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface CartItem {
  id?: string;
  quantity: number;
  product_id: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Custom event to notify cart updates
  const notifyCartUpdated = () => {
    window.dispatchEvent(new Event('cartUpdated'));
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const { data, error } = await supabase
            .from('cart_items')
            .select(`
              id,
              quantity,
              product_id,
              products:product_id (
                id,
                name,
                price,
                image_url
              )
            `);

          if (error) throw error;

          const transformedData = data.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            product_id: item.product_id,
            product: {
              id: item.products.id,
              name: item.products.name,
              price: item.products.price,
              image: item.products.image_url
            }
          }));

          setCartItems(transformedData);
        } else {
          const localCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
          setCartItems(localCartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast({
          title: 'Error',
          description: 'Failed to load cart items',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      if (user && item.id) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', item.id);
          
        if (error) throw error;
      } else {
        const updatedItems = cartItems.map(cartItem => 
          cartItem.product_id === item.product_id 
            ? { ...cartItem, quantity: newQuantity } 
            : cartItem
        );
        
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        setCartItems(updatedItems);
      }
      
      setCartItems(prevItems => 
        prevItems.map(cartItem => 
          cartItem.product_id === item.product_id 
            ? { ...cartItem, quantity: newQuantity } 
            : cartItem
        )
      );
      
      notifyCartUpdated(); // Notify cart update
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: 'Error',
        description: 'Failed to update quantity',
        variant: 'destructive'
      });
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      if (user && item.id) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', item.id);
          
        if (error) throw error;
      } else {
        const updatedItems = cartItems.filter(cartItem => cartItem.product_id !== item.product_id);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        setCartItems(updatedItems);
      }
      
      setCartItems(prevItems => prevItems.filter(cartItem => cartItem.product_id !== item.product_id));
      
      notifyCartUpdated(); // Notify cart update
      
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart'
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive'
      });
    }
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div 
      className="min-h-screen py-12 font-roboto bg-cream bg-opacity-40 bg-pattern"
      style={{
        backgroundImage: `url('/lovable-uploads/066bc7a7e-130f-44cc-8e22-63d8edb4165c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-brown mb-12">Your Shopping Cart</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown"></div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-brown-dark mb-4">Items ({cartItems.length})</h2>
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.product_id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center">
                        {item.product && (
                          <>
                            <Link to={`/product/${item.product_id}`} className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-24 h-24 object-cover rounded"
                              />
                            </Link>
                            <div className="flex-grow mb-4 sm:mb-0">
                              <Link to={`/product/${item.product_id}`} className="text-lg font-medium text-brown-dark hover:text-brown">
                                {item.product.name}
                              </Link>
                              <div className="text-gray-600 mt-1">${item.product.price.toFixed(2)}</div>
                            </div>
                          </>
                        )}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded overflow-hidden">
                            <button 
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-brown-dark mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-brown hover:bg-brown-dark text-white"
                  >
                    Proceed to Checkout
                  </Button>
                  <div className="mt-4 text-center">
                    <Link to="/shop" className="text-brown hover:text-brown-dark transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
            <h2 className="text-xl text-brown-dark mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/shop" 
              className="btn-primary inline-block"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

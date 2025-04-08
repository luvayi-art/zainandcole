
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// This would normally come from context or state management
const initialCartItems: CartItem[] = [
  {
    id: "sandal-001",
    name: "Maasai Beaded Sandals",
    price: 59.99,
    image: "/lovable-uploads/350b2e10-569e-44dd-80bb-73fa948add60.png",
    quantity: 1
  },
  {
    id: "jewelry-001",
    name: "Coral Beaded Necklace",
    price: 79.99,
    image: "/lovable-uploads/1199c9e6-4882-4879-9e6e-90b9c71bae56.png",
    quantity: 2
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const proceedToCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "You will be redirected to the payment page",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-roboto">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-brown mb-12">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                    <button 
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map(item => (
                      <div key={item.id} className="py-6 flex flex-wrap md:flex-nowrap">
                        <div className="md:w-24 w-full h-24 mb-4 md:mb-0 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        
                        <div className="md:ml-6 flex-grow">
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">Unit Price: ${item.price.toFixed(2)}</p>
                          
                          <div className="flex items-center mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-gray-100 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="md:ml-6 flex flex-col justify-between items-end mt-4 md:mt-0">
                          <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 mt-2 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/shop" className="text-brown hover:text-brown-dark flex items-center">
                  <ShoppingBag size={18} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={proceedToCheckout}
                    className="btn-primary w-full"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">We Accept</h3>
                    <div className="flex space-x-2">
                      <div className="bg-gray-100 p-2 rounded">
                        <img src="https://cdn-icons-png.flaticon.com/128/5968/5968299.png" alt="Visa" className="h-6 w-auto" />
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-6 w-auto" />
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <img src="https://cdn-icons-png.flaticon.com/128/174/174861.png" alt="PayPal" className="h-6 w-auto" />
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <img src="https://cdn-icons-png.flaticon.com/128/5977/5977576.png" alt="Stripe" className="h-6 w-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

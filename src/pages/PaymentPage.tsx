
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login with a return path
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to complete your purchase",
      });
      navigate('/login', { state: { returnPath: '/payment' } });
    }
  }, [user, navigate]);

  const handlePayment = () => {
    setIsLoading(true);
    // This is where you would integrate with Stripe
    // For now, we'll simulate a successful payment
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
      });
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 bg-cream bg-opacity-40 bg-pattern">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-brown mb-8">Complete Your Purchase</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-brown-dark mb-6">Payment Details</h2>
            
            {/* Payment form placeholder */}
            <div className="space-y-6 mb-8">
              <p className="text-gray-600 text-center">
                This is where your Stripe payment form will be integrated.
              </p>
              <div className="p-8 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Stripe payment integration coming soon</p>
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/cart')}
                className="border-brown text-brown hover:bg-cream"
              >
                Return to Cart
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={isLoading}
                className="bg-brown hover:bg-brown-dark text-white"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Processing</span>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  'Complete Purchase'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

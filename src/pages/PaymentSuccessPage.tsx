
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen py-16 bg-cream bg-opacity-40 bg-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-brown mb-4">Payment Successful!</h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully processed and will be shipped to you soon.
          </p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-brown-dark mb-3">What's Next?</h2>
            <p className="text-gray-600">
              You will receive an email confirmation with your order details and tracking information once your package ships.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-brown hover:bg-brown-dark text-white">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="border-brown text-brown hover:bg-cream">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

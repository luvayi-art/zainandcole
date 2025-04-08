
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import { ShoppingCart, Heart, Share2, ArrowLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { toast } from '../hooks/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart`,
    });
  };

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="font-roboto pb-16">
      {/* Breadcrumbs */}
      <div className="bg-cream py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-brown transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/shop" className="hover:text-brown transition-colors">Shop</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-brown transition-colors">
              {product.category}
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-brown font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-brown hover:text-brown-dark transition-colors mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="text-sm text-brown mb-2">{product.category}</div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-2xl font-bold text-brown-dark mb-6">${product.price.toFixed(2)}</div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                {product.description || "No description available for this product."}
              </p>
            </div>

            <div className="mb-8">
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex">
                <button 
                  onClick={decreaseQuantity}
                  className="bg-gray-200 px-4 py-2 rounded-l-md hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                />
                <button 
                  onClick={increaseQuantity}
                  className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={addToCart}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button 
                onClick={addToWishlist}
                className="p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                <Heart size={20} />
              </button>
              <button className="p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="mb-4">
                <h3 className="font-bold">Shipping Information</h3>
                <p className="text-gray-600 text-sm">We ship worldwide. Delivery estimates will be shown at checkout.</p>
              </div>
              <div>
                <h3 className="font-bold">Returns</h3>
                <p className="text-gray-600 text-sm">Easy 30-day returns. See our return policy for more details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;

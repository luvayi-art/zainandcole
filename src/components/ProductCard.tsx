
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from '../hooks/use-toast';

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
  
  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const addToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
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


import { Product } from '../components/ProductCard';

export const products: Product[] = [
  {
    id: "sandal-001",
    name: "Maasai Beaded Sandals",
    price: 59.99,
    image: "/lovable-uploads/350b2e10-569e-44dd-80bb-73fa948add60.png",
    category: "African Sandals",
    description: "Handcrafted Maasai sandals made from genuine leather and adorned with colorful beadwork. Each pair is unique and tells a story of tradition and craftsmanship."
  },
  {
    id: "jewelry-001",
    name: "Coral Beaded Necklace",
    price: 79.99,
    image: "/lovable-uploads/1199c9e6-4882-4879-9e6e-90b9c71bae56.png",
    category: "Jewelry",
    description: "Traditional coral beaded necklace handcrafted by local artisans. The vibrant coral color represents strength and protection in many African cultures."
  },
  {
    id: "accessory-001",
    name: "Beaded Waist Belt",
    price: 45.99,
    image: "/lovable-uploads/099a01c1-5d39-4046-9d92-2d29140b92cf.png",
    category: "Beaded Accessories",
    description: "Colorful beaded waist belt inspired by Maasai designs. Perfect for adding a cultural touch to any outfit."
  },
  {
    id: "fabric-001",
    name: "Traditional Ankara Fabric",
    price: 24.99,
    image: "/lovable-uploads/76090898-cd00-471c-8c3e-d5bca265976c.png",
    category: "Ankara Fabric",
    description: "High-quality Ankara fabric with vibrant patterns. Each yard tells a story through its unique designs and colors."
  },
  {
    id: "jewelry-002",
    name: "Zulu Beaded Earrings",
    price: 34.99,
    image: "/lovable-uploads/acdeb040-c751-4540-88f4-77752d3836cc.png",
    category: "Jewelry",
    description: "Elegantly designed Zulu-inspired beaded earrings. Lightweight and perfect for everyday wear or special occasions."
  },
  {
    id: "sandal-002",
    name: "Leather Safari Sandals",
    price: 64.99,
    image: "/lovable-uploads/350b2e10-569e-44dd-80bb-73fa948add60.png",
    category: "African Sandals",
    description: "Durable and comfortable leather sandals inspired by traditional African designs. Perfect for warm weather and casual outings."
  },
  {
    id: "accessory-002",
    name: "Beaded Clutch Bag",
    price: 89.99,
    image: "/lovable-uploads/acdeb040-c751-4540-88f4-77752d3836cc.png",
    category: "Beaded Accessories",
    description: "Elegant beaded clutch bag, handcrafted with intricate patterns. A beautiful accessory for special occasions."
  },
  {
    id: "fabric-002",
    name: "Kente Print Fabric",
    price: 29.99,
    image: "/lovable-uploads/099a01c1-5d39-4046-9d92-2d29140b92cf.png",
    category: "Ankara Fabric",
    description: "Traditional Kente print fabric, inspired by West African designs. Perfect for creating unique garments with cultural significance."
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};


import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string | null;
  stock?: number;
  featured?: boolean;
};

// Function to add product data to Supabase
export async function insertProducts() {
  const products = [
    {
      name: "Maasai Teardrop Beaded Earrings",
      description: "Handcrafted colorful teardrop earrings with vibrant yellow and multicolored beadwork. Made by skilled Maasai artisans using traditional techniques.",
      price: 34.99,
      image_url: "/lovable-uploads/66bc7a7e-130f-44cc-8e22-63d8edb4165c.png",
      stock: 25,
      featured: true,
      category_id: await getCategoryId("Jewelry")
    },
    {
      name: "Tribal Beaded Necklace",
      description: "Traditional beaded collar necklace featuring intricate multicolored patterns on dark leather backing. Each piece is uniquely handcrafted.",
      price: 59.99,
      image_url: "/lovable-uploads/306ead75-ee63-4293-b686-ae7a89fbd973.png",
      stock: 15,
      featured: true,
      category_id: await getCategoryId("Jewelry")
    },
    {
      name: "Maasai Beaded Bracelets Set",
      description: "Set of authentic Maasai beaded bracelets in various designs. Includes cowrie shell details and traditional patterns.",
      price: 49.99,
      image_url: "/lovable-uploads/775f6f1c-7178-461f-adde-b12abacc97fd.png",
      stock: 30,
      featured: true,
      category_id: await getCategoryId("Beaded Accessories")
    },
    {
      name: "Bird Motif Beaded Sandals",
      description: "Genuine leather sandals adorned with colorful beadwork featuring bird motifs. Perfect blend of comfort and traditional African artistry.",
      price: 69.99,
      image_url: "/lovable-uploads/83b026bf-d241-490b-9b0e-0ef6ddc013fb.png",
      stock: 20,
      featured: true,
      category_id: await getCategoryId("African Sandals")
    },
    {
      name: "Geometric Beaded Sandals",
      description: "Handcrafted leather sandals with geometric beaded patterns in vibrant colors. Each pair is comfortable, durable and uniquely designed.",
      price: 74.99,
      image_url: "/lovable-uploads/4e474cea-f327-45b4-abca-3ac9f5d1ce09.png",
      stock: 18,
      featured: true,
      category_id: await getCategoryId("African Sandals")
    },
    {
      name: "Sisal Market Basket",
      description: "Two-tone sisal market basket with leather handles. Handwoven by skilled artisans using sustainable materials and traditional techniques.",
      price: 45.99,
      image_url: "/lovable-uploads/499133cc-c5a7-4d55-81c9-20b1876853cc.png",
      stock: 12,
      featured: false,
      category_id: await getCategoryId("Beaded Accessories")
    }
  ];

  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .upsert(
        product,
        { onConflict: 'name' }
      );
    
    if (error) {
      console.error("Error inserting product:", error);
      throw error;
    }
  }

  return { success: true, message: "Products inserted successfully" };
}

// Helper function to get category ID by name
async function getCategoryId(categoryName: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .single();

  if (error) {
    console.error("Error getting category ID:", error);
    return null;
  }

  return data?.id || null;
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      image_url,
      stock,
      featured,
      categories (name)
    `);

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description || '',
    price: item.price,
    image: item.image_url || "/placeholder.svg",
    category: item.categories?.name || 'Uncategorized',
    stock: item.stock,
    featured: item.featured
  }));
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      image_url,
      stock,
      featured,
      categories (name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Product not found
      return null;
    }
    console.error("Error fetching product:", error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    description: data.description || '',
    price: data.price,
    image: data.image_url || "/placeholder.svg",
    category: data.categories?.name || 'Uncategorized',
    stock: data.stock,
    featured: data.featured
  };
}

export async function fetchCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('name');

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return (data || []).map(category => category.name);
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('name', category)
    .single();

  if (categoryError) {
    console.error("Error fetching category:", categoryError);
    throw categoryError;
  }

  if (!categoryData) return [];

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      image_url,
      stock,
      featured,
      categories (name)
    `)
    .eq('category_id', categoryData.id);

  if (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }

  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description || '',
    price: item.price,
    image: item.image_url || "/placeholder.svg",
    category: item.categories?.name || 'Uncategorized',
    stock: item.stock,
    featured: item.featured
  }));
}

// Function to add new category to database
export async function insertCategory(name: string, description?: string) {
  const { error } = await supabase
    .from('categories')
    .insert({ name, description });
  
  if (error) {
    console.error("Error adding category:", error);
    throw error;
  }

  return { success: true };
}

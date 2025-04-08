
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

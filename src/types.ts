export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Dresses' | 'Tops' | 'Bottoms' | 'Accessories' | 'Beauty' | 'Footwear' | 'Fragrance';
  image: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  isFlashSale?: boolean;
  salePrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

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
  // FEMINÉ Gift Mode metadata
  isGift?: boolean;
  recipientName?: string;
  giftMessage?: string;
  giftWrapping?: boolean;
  giftWrappingFee?: number;
}

export type RecipientType = 'Her' | 'Partner' | 'Friend' | 'Mother' | 'Sister';
export type OccasionType = 'Birthday' | 'Anniversary' | "Valentine's" | 'Celebration' | 'Just Because';
export type BudgetRange = 'under-50k' | '50k-100k' | '100k-200k' | '200k-plus';
export type StylePreference = 'Elegant' | 'Soft' | 'Bold' | 'Minimal' | 'Glamorous';

export interface GiftModeAnswers {
  recipient: RecipientType | null;
  occasion: OccasionType | null;
  budget: BudgetRange | null;
  style: StylePreference | null;
}

export interface ScoredGiftProduct {
  product: Product;
  score: number;
  whyPicked: string;
}

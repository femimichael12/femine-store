import { Product } from './types';

export const products: Product[] = [
  // DRESSES
  {
    id: '1',
    name: 'Silk Evening Gown',
    price: 450000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious silk gown perfect for formal evening events. Features a sleek silhouette and a subtle sheen.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald', hex: '#046307' },
      { name: 'Midnight', hex: '#191970' },
      { name: 'Champagne', hex: '#F7E7CE' }
    ],
    stock: 5,
    isFlashSale: true,
    salePrice: 380000
  },
  {
    id: '5',
    name: 'Linen Wrap Dress',
    price: 180000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
    description: 'Breathable linen wrap dress for effortless summer style. Features a flattering tie-waist.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Terracotta', hex: '#E2725B' },
      { name: 'Sage', hex: '#BCB88A' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    stock: 12
  },
  {
    id: 'd3',
    name: 'Velvet Cocktail Mini',
    price: 220000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    description: 'A chic velvet mini dress with a structured bodice. Perfect for parties and night outs.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 22
  },

  // TOPS
  {
    id: '2',
    name: 'Cashmere Turtleneck',
    price: 280000,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-soft 100% cashmere turtleneck sweater. A timeless staple for the sophisticated wardrobe.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#E3D9C6' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Ivory', hex: '#FFFFF0' }
    ],
    stock: 14
  },
  {
    id: '6',
    name: 'Satin Blouse',
    price: 140000,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1604176354204-926873ff34b1?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant satin blouse with a delicate button-front. Perfect for transitioning from day to night.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Rose', hex: '#FF007F' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Navy', hex: '#000080' }
    ],
    stock: 9
  },

  // BEAUTY (Makeup & Skincare)
  {
    id: 'b1',
    name: 'Velvet Matte Lipstick',
    price: 45000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800',
    description: 'Long-lasting matte lipstick with a velvety finish. Infused with vitamin E for hydration.',
    sizes: ['Standard'],
    colors: [
      { name: 'Ruby Red', hex: '#9B111E' },
      { name: 'Dusty Rose', hex: '#BA7E7E' },
      { name: 'Nude', hex: '#E3BC9A' }
    ],
    stock: 3,
    isFlashSale: true,
    salePrice: 35000
  },
  {
    id: 'b2',
    name: 'Glow Serum',
    price: 95000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'A lightweight serum that brightens and hydrates. Formulated with Vitamin C and Hyaluronic Acid.',
    sizes: ['30ml', '50ml'],
    colors: [{ name: 'Clear', hex: '#FFFFFF' }],
    stock: 25
  },
  {
    id: 'b3',
    name: 'Eyeshadow Palette',
    price: 80000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    description: '12 highly pigmented shades ranging from soft mattes to shimmering metallics.',
    sizes: ['One Size'],
    colors: [{ name: 'Nude Palette', hex: '#D2B48C' }],
    stock: 8
  },
  {
    id: 'b4',
    name: 'Hydrating Face Cream',
    price: 70000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    description: 'Rich, non-greasy moisturizer that locks in moisture for 24 hours.',
    sizes: ['50ml'],
    colors: [{ name: 'White', hex: '#FFFFFF' }],
    stock: 15
  },

  // FOOTWEAR
  {
    id: 'f1',
    name: 'Stiletto Pumps',
    price: 240000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    description: 'Classic pointed-toe stilettos in premium leather. The ultimate power shoe.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Nude', hex: '#E3BC9A' },
      { name: 'Red', hex: '#FF0000' }
    ],
    stock: 2
  },
  {
    id: 'f2',
    name: 'Leather Ankle Boots',
    price: 320000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek leather boots with a comfortable block heel. Perfect for autumn styling.',
    sizes: ['37', '38', '39', '40'],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 10
  },

  // FRAGRANCE
  {
    id: 'fr1',
    name: 'Midnight Bloom Eau de Parfum',
    price: 190000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    description: 'A mysterious blend of jasmine, patchouli, and vanilla. Sophisticated and alluring.',
    sizes: ['50ml', '100ml'],
    colors: [{ name: 'Gold', hex: '#FFD700' }],
    stock: 20
  },
  {
    id: 'fr2',
    name: 'Morning Dew Mist',
    price: 110000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: 'Fresh and light with notes of citrus and white tea. Perfect for everyday wear.',
    sizes: ['100ml'],
    colors: [{ name: 'Clear', hex: '#FFFFFF' }],
    stock: 12
  },

  // ACCESSORIES
  {
    id: '4',
    name: 'Pearl Drop Earrings',
    price: 130000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    description: 'Classic freshwater pearl drop earrings with 14k gold plating. Adds a touch of elegance to any outfit.',
    sizes: ['One Size'],
    colors: [
      { name: 'Gold/Pearl', hex: '#FFD700' }
    ],
    stock: 6
  },
  {
    id: 'a2',
    name: 'Leather Tote Bag',
    price: 360000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    description: 'Spacious tote bag crafted from premium Italian leather. Includes a detachable pouch.',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac', hex: '#964B00' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 4
  },

  // BOTTOMS
  {
    id: '3',
    name: 'Tailored Wool Trousers',
    price: 220000,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    description: 'High-waisted wool trousers with a sharp crease. Designed for a perfect fit and professional look.',
    sizes: ['2', '4', '6', '8', '10'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    stock: 7
  }
];

import { Product } from './types';

export const products: Product[] = [
  // ================= DRESSES (12 items) =================
  {
    id: 'd1',
    name: 'Silk Evening Gown',
    price: 450000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious silk gown perfect for formal evening events. Features a sleek silhouette and a subtle radiant sheen.',
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
    id: 'd2',
    name: 'Linen Wrap Dress',
    price: 180000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
    description: 'Breathable European linen wrap dress for effortless summer sophistication. Features a flattering adjustable tie-waist.',
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
    description: 'A chic structured velvet mini dress with an exquisite bodice contour. Designed for celebrations and intimate dinners.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 22
  },
  {
    id: 'd4',
    name: 'Satin Cowl Slip Dress',
    price: 260000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    description: 'Effortless liquid satin slip featuring a sensual cowl neckline and graceful bias cut that drapes like second skin.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Bronze', hex: '#CD7F32' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Onyx', hex: '#0F0F0F' }
    ],
    stock: 8,
    isFlashSale: true,
    salePrice: 215000
  },
  {
    id: 'd5',
    name: 'Pleated Chiffon Tiered Maxi',
    price: 340000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=800',
    description: 'Floating plissé chiffon cascading through delicate micro-pleated tiers. Accented with subtle golden thread borders.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blush', hex: '#FBE7E9' },
      { name: 'Lavender', hex: '#E6E6FA' }
    ],
    stock: 15
  },
  {
    id: 'd6',
    name: 'Structured Crepe Midi Dress',
    price: 295000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
    description: 'Architectural crepe midi tailoring with a square neckline and delicate side slit for powerful modern elegance.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Noir', hex: '#1A1A1A' }
    ],
    stock: 9
  },
  {
    id: 'd7',
    name: 'Off-Shoulder Column Gown',
    price: 490000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
    description: 'Floor-length heavy crepe column gown with an off-shoulder fold-over neckline and concealed corset support.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Crimson', hex: '#990000' },
      { name: 'Midnight', hex: '#191970' }
    ],
    stock: 4,
    isFlashSale: true,
    salePrice: 420000
  },
  {
    id: 'd8',
    name: 'Backless Silk Halter Gown',
    price: 410000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800',
    description: 'Open back halter maxi draped in 100% mulberry silk with an adjustable neckline sash and dramatic train.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Rose', hex: '#FF007F' }
    ],
    stock: 7
  },
  {
    id: 'd9',
    name: 'Asymmetric Draped Midi',
    price: 275000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800',
    description: 'Contemporary one-shoulder silhouette with fluid diagonal ruching that cinches and sculpts effortlessly.',
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    stock: 14
  },
  {
    id: 'd10',
    name: 'Sculpted Blazer Mini Dress',
    price: 310000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    description: 'Double-breasted tailoring cut from structured virgin wool blend, detailed with engraved gold-tone crest buttons.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 11
  },
  {
    id: 'd11',
    name: 'Metallic Knit Evening Dress',
    price: 360000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    description: 'Fine gauge ribbed metallic lurex that catches the light with every step. Unlined body with soft stretch lining.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' }
    ],
    stock: 6
  },
  {
    id: 'd12',
    name: 'Floral Embroidered Silk Gown',
    price: 520000,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800',
    description: 'Couture handcrafted organza gown featuring hand-placed botanical floral embroidery and crystal micro-beading.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blush Gold', hex: '#F4C2C2' },
      { name: 'Soft Noir', hex: '#222222' }
    ],
    stock: 3,
    isFlashSale: true,
    salePrice: 460000
  },

  // ================= BEAUTY & SKINCARE & MAKEUP (12 items) =================
  {
    id: 'b1',
    name: 'Velvet Matte Lipstick',
    price: 45000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800',
    description: 'Long-lasting satin-matte lipstick with high pigment payoff. Infused with wild rosehip oil and antioxidant Vitamin E.',
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
    name: 'Glow Illuminating Serum',
    price: 95000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'A lightweight antioxidant serum formulated with 15% Vitamin C and triple-weight Hyaluronic Acid to brighten dull skin.',
    sizes: ['30ml', '50ml'],
    colors: [{ name: 'Clear', hex: '#FFFFFF' }],
    stock: 25
  },
  {
    id: 'b3',
    name: 'Luxe Eyeshadow Palette',
    price: 80000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    description: '18 buttery shades ranging from velvet mattes to celestial duochrome metallics with seamless blendability.',
    sizes: ['Standard'],
    colors: [{ name: 'Nude Gold Palette', hex: '#D2B48C' }],
    stock: 8
  },
  {
    id: 'b4',
    name: 'Hydrating Ceramide Cream',
    price: 70000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    description: 'Rich, non-greasy lipid-barrier cream that locks in hydration for up to 72 hours with oat peptides and squalane.',
    sizes: ['50ml', '100ml'],
    colors: [{ name: 'Pure White', hex: '#FFFFFF' }],
    stock: 15
  },
  {
    id: 'b5',
    name: 'Botanical Rosewater Mist',
    price: 48000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    description: 'Distilled organic Damask rose petals combined with aloe and niacinamide for an instant dewy glow on clean skin or over makeup.',
    sizes: ['100ml'],
    colors: [{ name: 'Rose', hex: '#FFB6C1' }],
    stock: 19
  },
  {
    id: 'b6',
    name: 'Luminous Silk Foundation',
    price: 88000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    description: 'Weightless medium-buildable foundation that replicates the natural texture of glowing skin with a soft-focus velvet finish.',
    sizes: ['30ml'],
    colors: [
      { name: 'Warm Nude', hex: '#E3BC9A' },
      { name: 'Almond', hex: '#C68B59' },
      { name: 'Espresso', hex: '#593B2B' }
    ],
    stock: 12
  },
  {
    id: 'b7',
    name: 'Restorative Peptide Eye Cream',
    price: 65000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    description: 'Targeted cooling eye concentrate with copper peptides and caffeine to instantly de-puff and visibly reduce fine lines.',
    sizes: ['15ml'],
    colors: [{ name: 'Standard', hex: '#FFFFFF' }],
    stock: 16
  },
  {
    id: 'b8',
    name: '24k Gold Infused Facial Oil',
    price: 110000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    description: 'Cold-pressed marula, jojoba, and pure 24-karat gold flakes that melt upon application for unmatched luminosity.',
    sizes: ['30ml'],
    colors: [{ name: 'Gold', hex: '#FFD700' }],
    stock: 5,
    isFlashSale: true,
    salePrice: 92000
  },
  {
    id: 'b9',
    name: 'Cream Blush & Highlight Duo',
    price: 52000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    description: 'Melt-on-contact cream blush paired with a pearlescent champagne highlighter in a sleek magnetic compact.',
    sizes: ['Standard'],
    colors: [
      { name: 'Peach Glow', hex: '#FFDAB9' },
      { name: 'Berry Flush', hex: '#C71585' }
    ],
    stock: 14
  },
  {
    id: 'b10',
    name: 'Mineral Sunscreen Essence SPF50+',
    price: 58000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    description: 'Broad spectrum UVA/UVB non-nano zinc oxide sunscreen with zero white cast. Leaves a smooth satin primer finish.',
    sizes: ['50ml'],
    colors: [{ name: 'Invisible', hex: '#FFFFFF' }],
    stock: 28
  },
  {
    id: 'b11',
    name: 'AHA + BHA Resurfacing Peel',
    price: 68000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800',
    description: 'Overnight exfoliating concentrate with 10% Glycolic Acid, 2% Salicylic Acid, and calming Tasmanian pepperberry.',
    sizes: ['30ml'],
    colors: [{ name: 'Clear', hex: '#FFFFFF' }],
    stock: 10
  },
  {
    id: 'b12',
    name: 'Hydra-Plump Tinted Lip Oil',
    price: 38000,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800',
    description: 'High-shine glass finish lip oil enriched with raspberry seed oil that deeply conditions without any sticky residue.',
    sizes: ['Standard'],
    colors: [
      { name: 'Cherry Glaze', hex: '#DE3163' },
      { name: 'Honey Nude', hex: '#E1A95F' },
      { name: 'Glass Crystal', hex: '#FFFFFF' }
    ],
    stock: 20
  },

  // ================= ACCESSORIES, HANDBAGS, JEWELRY & WATCHES (14 items) =================
  {
    id: 'a1',
    name: 'Pearl Drop Earrings',
    price: 130000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    description: 'Classic baroque freshwater pearl drop earrings set in 14k recycled gold plating. Adds timeless poise to any look.',
    sizes: ['One Size'],
    colors: [{ name: 'Gold/Pearl', hex: '#FFD700' }],
    stock: 6
  },
  {
    id: 'a2',
    name: 'Italian Leather Tote Bag',
    price: 360000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    description: 'Spacious everyday tote crafted from full-grain Florentine calfskin. Includes an interior zipped security pouch.',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac', hex: '#964B00' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 4
  },
  {
    id: 'a3',
    name: 'Quilted Chain Shoulder Bag',
    price: 420000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    description: 'Supple quilted lambskin leather bag with an adjustable gold-tone curb chain strap and signature twist lock.',
    sizes: ['One Size'],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    stock: 5,
    isFlashSale: true,
    salePrice: 365000
  },
  {
    id: 'a4',
    name: 'Cat-Eye UV Sunglasses',
    price: 115000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    description: 'Handcrafted Italian acetate frames featuring polarized category 3 UV400 lenses and gold hardware pins.',
    sizes: ['One Size'],
    colors: [
      { name: 'Gloss Black', hex: '#000000' },
      { name: 'Tortoiseshell', hex: '#8B4513' }
    ],
    stock: 17
  },
  {
    id: 'a5',
    name: 'Pavé Diamond 18k Bangle',
    price: 480000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
    description: 'Solid 18k gold hinge bangle encrusted with brilliant micro-pavé lab diamonds totaling 0.75 carats.',
    sizes: ['Small', 'Medium'],
    colors: [
      { name: 'Yellow Gold', hex: '#FFD700' },
      { name: 'White Gold', hex: '#E5E4E2' }
    ],
    stock: 3,
    isFlashSale: true,
    salePrice: 410000
  },
  {
    id: 'a6',
    name: 'Layered Herringbone Gold Chain',
    price: 165000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    description: 'Double-strand 18k vermeil flat herringbone snake chain that drapes seamlessly across the collarbone.',
    sizes: ['40cm + 45cm'],
    colors: [{ name: '18k Gold', hex: '#FFD700' }],
    stock: 11
  },
  {
    id: 'a7',
    name: 'Rose Gold Chronograph Watch',
    price: 580000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
    description: 'Precision Swiss movement chronograph encased in brushed 316L rose-gold stainless steel with sapphire crystal glass.',
    sizes: ['38mm'],
    colors: [
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Silver Steel', hex: '#C0C0C0' }
    ],
    stock: 4,
    isFlashSale: true,
    salePrice: 495000
  },
  {
    id: 'a8',
    name: 'Structured Leather Top-Handle',
    price: 395000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    description: 'Trapeze silhouette handbag crafted from scratch-resistant palmellato leather with a detachable crossbody strap.',
    sizes: ['Medium'],
    colors: [
      { name: 'Tan Caramel', hex: '#C68B59' },
      { name: 'Onyx', hex: '#111111' }
    ],
    stock: 7
  },
  {
    id: 'a9',
    name: 'Square Aviator Gold Sunglasses',
    price: 125000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    description: 'Modern geometric metal sunglasses with gradient amber lenses and hypoallergenic titanium nose pads.',
    sizes: ['One Size'],
    colors: [
      { name: 'Gold/Amber', hex: '#DAA520' },
      { name: 'Smoke', hex: '#4F4F4F' }
    ],
    stock: 13
  },
  {
    id: 'a10',
    name: 'Moissanite Solitaire Signet Ring',
    price: 210000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek flush-set 1.2 carat brilliant cut VVS moissanite set in a polished solid sterling silver band.',
    sizes: ['6', '7', '8'],
    colors: [
      { name: 'Platinum Finish', hex: '#E5E4E2' },
      { name: 'Gold Vermeil', hex: '#FFD700' }
    ],
    stock: 8
  },
  {
    id: 'a11',
    name: 'Saffiano Leather Envelope Clutch',
    price: 195000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
    description: 'Clean architectural clutch with interior card slots and hidden magnet closure. Fits all phone models comfortably.',
    sizes: ['One Size'],
    colors: [
      { name: 'Blush Nude', hex: '#FBE7E9' },
      { name: 'Midnight', hex: '#191970' }
    ],
    stock: 10
  },
  {
    id: 'a12',
    name: 'Ceramic Minimalist Watch',
    price: 540000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    description: 'High-tech scratchproof polished white ceramic casing with mother-of-pearl dial and diamond hour indices.',
    sizes: ['34mm'],
    colors: [
      { name: 'Pure White Ceramic', hex: '#FFFFFF' },
      { name: 'Matte Black', hex: '#111111' }
    ],
    stock: 2,
    isFlashSale: true,
    salePrice: 470000
  },
  {
    id: 'a13',
    name: 'Twisted Gold Chunky Hoops',
    price: 95000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
    description: 'Hollow lightweight twisted hoop earrings with secure click-top closure. Crafted in 18k heavy gold plating.',
    sizes: ['25mm'],
    colors: [{ name: '18k Gold', hex: '#FFD700' }],
    stock: 24
  },
  {
    id: 'a14',
    name: 'Woven Raffia & Leather Bucket Bag',
    price: 285000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&q=80&w=800',
    description: 'Hand-woven natural Madagascar raffia trimmed with smooth saddle leather and a linen drawstring pouch lining.',
    sizes: ['One Size'],
    colors: [{ name: 'Natural Tan', hex: '#D2B48C' }],
    stock: 9
  },

  // ================= FOOTWEAR (9 items) =================
  {
    id: 'f1',
    name: 'Pointed Stiletto Pumps',
    price: 240000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    description: 'Classic 100mm stiletto in Italian patent leather with padded memory foam insoles for unrivaled poise and posture.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Black Patent', hex: '#000000' },
      { name: 'Nude', hex: '#E3BC9A' },
      { name: 'Red', hex: '#FF0000' }
    ],
    stock: 2,
    isFlashSale: true,
    salePrice: 195000
  },
  {
    id: 'f2',
    name: 'Leather Block Heel Ankle Boots',
    price: 320000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek calfskin boots featuring a comfortable 65mm block heel and inner zip. An all-season wardrobe cornerstone.',
    sizes: ['37', '38', '39', '40'],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 10
  },
  {
    id: 'f3',
    name: 'Strappy Metallic Evening Sandals',
    price: 260000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&q=80&w=800',
    description: 'Minimalist crossover metallic leather straps with a 90mm flared heel and adjustable ankle buckle.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' }
    ],
    stock: 6
  },
  {
    id: 'f4',
    name: 'Polished Lug-Sole Leather Loafers',
    price: 290000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    description: 'Substantial chunky lugged EVA sole paired with brushed boxcalf leather and traditional penny strap detailing.',
    sizes: ['37', '38', '39', '40', '41'],
    colors: [
      { name: 'Gloss Black', hex: '#0F0F0F' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    stock: 12
  },
  {
    id: 'f5',
    name: 'Square-Toe Leather Mules',
    price: 215000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800',
    description: 'Slip-on sculpted architectural heel mules in butter-soft nappa leather with contoured footbeds.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Butter', hex: '#FFFDD0' },
      { name: 'Espresso', hex: '#362B28' }
    ],
    stock: 8
  },
  {
    id: 'f6',
    name: 'Suede Knee-High Boots',
    price: 380000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
    description: 'Plush velvet suede knee-high shaft with effortless slouch and almond toe styling on a wood-grain stacked heel.',
    sizes: ['37', '38', '39', '40'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Chocolate', hex: '#3B2F2F' }
    ],
    stock: 5,
    isFlashSale: true,
    salePrice: 320000
  },
  {
    id: 'f7',
    name: 'Minimalist Leather Slide Sandals',
    price: 160000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
    description: 'Wide crossover band slides in supple matte leather with hand-stitched welt and low stacked heel.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Oatmeal', hex: '#E3D9C6' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 18
  },
  {
    id: 'f8',
    name: 'Crystal Embellished Evening Pumps',
    price: 340000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&q=80&w=800',
    description: 'Lustrous duchess satin pointed pumps crowned with an exquisite crystal starburst brooch at the vamp.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Champagne', hex: '#F7E7CE' }
    ],
    stock: 3,
    isFlashSale: true,
    salePrice: 285000
  },
  {
    id: 'f9',
    name: 'Platform Espadrille Wedges',
    price: 195000,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800',
    description: 'Spanish braided jute wedge platform with soft linen ribbon ankle ties and cushioned leather insole.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Beige Canvas', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 14
  },

  // ================= FRAGRANCE (7 items) =================
  {
    id: 'fr1',
    name: 'Midnight Bloom Eau de Parfum',
    price: 190000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    description: 'A sensual blend of night-blooming jasmine, dark patchouli, bourbon vanilla, and luminous pink peppercorn.',
    sizes: ['50ml', '100ml'],
    colors: [{ name: 'Gold Essence', hex: '#FFD700' }],
    stock: 20
  },
  {
    id: 'fr2',
    name: 'Morning Dew Citrus Mist',
    price: 110000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: 'Sparkling Calabrian bergamot, green tea leaves, and white musk. Fresh, uplifting, and ethereal for everyday wear.',
    sizes: ['100ml'],
    colors: [{ name: 'Clear', hex: '#FFFFFF' }],
    stock: 12
  },
  {
    id: 'fr3',
    name: 'Santal & Smoked Vanilla Extrait',
    price: 240000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    description: '30% concentration extrait featuring Australian sandalwood, charred vanilla bean, cardamon, and golden amber resins.',
    sizes: ['50ml'],
    colors: [{ name: 'Amber', hex: '#FFBF00' }],
    stock: 7,
    isFlashSale: true,
    salePrice: 199000
  },
  {
    id: 'fr4',
    name: 'Fleur d\'Oranger & Neroli Parfum',
    price: 185000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    description: 'Sun-drenched Moroccan orange blossoms kissed with crisp petitgrain and velvety white cedarwood.',
    sizes: ['50ml', '100ml'],
    colors: [{ name: 'Golden Essence', hex: '#EEDC82' }],
    stock: 16
  },
  {
    id: 'fr5',
    name: 'Velvet Rose & Damask Oud',
    price: 265000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    description: 'Clove-spiced Damascena rose wrapped in smoky Agarwood oud, praline, and dark amber woods.',
    sizes: ['100ml'],
    colors: [{ name: 'Smoky Ruby', hex: '#800020' }],
    stock: 5,
    isFlashSale: true,
    salePrice: 225000
  },
  {
    id: 'fr6',
    name: 'Amberwood & Spiced Bergamot',
    price: 175000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
    description: 'Warm cedarwood, crushed pink pepper, sparkling Italian bergamot, and rich amber resin.',
    sizes: ['50ml', '100ml'],
    colors: [{ name: 'Deep Amber', hex: '#CC7722' }],
    stock: 14
  },
  {
    id: 'fr7',
    name: 'Solar Jasmine Hair & Body Mist',
    price: 85000,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
    description: 'Alcohol-free hydrating perfume mist with argan oil, sunny Sambac jasmine, ylang-ylang, and coconut water.',
    sizes: ['100ml'],
    colors: [{ name: 'Frosted Gold', hex: '#FFF8DC' }],
    stock: 22
  },

  // ================= TOPS & BOTTOMS (6 items) =================
  {
    id: 't1',
    name: 'Cashmere Turtleneck',
    price: 280000,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-soft 100% Grade-A Mongolian cashmere turtleneck sweater. A timeless staple for effortless refinement.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#E3D9C6' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Ivory', hex: '#FFFFF0' }
    ],
    stock: 14
  },
  {
    id: 't2',
    name: 'Silk Satin Tie-Neck Blouse',
    price: 190000,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    description: 'Fluid heavyweight silk blouse featuring an elegant removable lavallière tie and mother-of-pearl button cuffs.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Rose', hex: '#FF007F' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Navy', hex: '#000080' }
    ],
    stock: 9
  },
  {
    id: 'b13',
    name: 'Tailored Wool Trousers',
    price: 220000,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    description: 'High-waisted Italian wool trousers with a sharp pressed front crease and tailored wide-straight leg cut.',
    sizes: ['2', '4', '6', '8', '10'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    stock: 7
  },
  {
    id: 't3',
    name: 'Corset Detail Crepe Top',
    price: 165000,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800',
    description: 'Sculpting boned bodice with sweetheart neckline and stretch crepe back panel for seamless evening styling.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Off-White', hex: '#FAF9F6' }
    ],
    stock: 12
  },
  {
    id: 'b14',
    name: 'Wide-Leg Pleated Silk Pants',
    price: 270000,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800',
    description: 'Flowing silk double georgette with deep inverted pleats and a sleek banded high-rise waistline.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 6,
    isFlashSale: true,
    salePrice: 228000
  },
  {
    id: 't4',
    name: 'Structured Bouclé Tweed Jacket',
    price: 350000,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=800',
    description: 'Iconic collarless cropped jacket in French bouclé tweed with delicate frayed trims and gilded lion crest buttons.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ivory Tweed', hex: '#FFFFF0' },
      { name: 'Black Tweed', hex: '#1A1A1A' }
    ],
    stock: 4
  }
];

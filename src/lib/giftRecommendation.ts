import { Product, GiftModeAnswers, ScoredGiftProduct, BudgetRange, StylePreference, RecipientType, OccasionType } from '../types';

export type { ScoredGiftProduct };

/**
 * Global configurable gift wrapping price in Nigerian Naira (₦).
 */
export const GIFT_WRAPPING_FEE = 5000;

export const GIFT_WRAPPING_DETAILS = {
  title: 'FEMINÉ Signature Gift Wrapping',
  description: 'Hand-wrapped in our luxury textured ivory box, tied with our signature burgundy satin ribbon, and accompanied by a wax-sealed calligraphy card.',
  priceFormatted: `₦${GIFT_WRAPPING_FEE.toLocaleString()}`
};

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  'under-50k': 'Under ₦50,000',
  '50k-100k': '₦50,000 – ₦100,000',
  '100k-200k': '₦100,000 – ₦200,000',
  '200k-plus': '₦200,000+'
};

/**
 * Check whether a product price matches the chosen budget range.
 */
export function matchesBudget(product: Product, budget: BudgetRange): boolean {
  const price = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  switch (budget) {
    case 'under-50k':
      return price < 50000;
    case '50k-100k':
      return price >= 50000 && price <= 100000;
    case '100k-200k':
      return price > 100000 && price <= 200000;
    case '200k-plus':
      return price > 200000;
    default:
      return true;
  }
}

/**
 * Score a product based on category affinity for recipient.
 */
function getRecipientScore(product: Product, recipient: RecipientType): number {
  const cat = product.category;
  switch (recipient) {
    case 'Partner':
      if (cat === 'Fragrance') return 25;
      if (cat === 'Dresses') return 22;
      if (cat === 'Accessories') return 20;
      if (cat === 'Beauty') return 16;
      return 12;
    case 'Mother':
      if (cat === 'Beauty') return 25;
      if (cat === 'Fragrance') return 22;
      if (cat === 'Accessories') return 20;
      if (cat === 'Dresses') return 15;
      return 10;
    case 'Friend':
      if (cat === 'Beauty') return 24;
      if (cat === 'Accessories') return 22;
      if (cat === 'Fragrance') return 18;
      if (cat === 'Footwear') return 15;
      return 12;
    case 'Sister':
      if (cat === 'Dresses' || cat === 'Tops' || cat === 'Bottoms') return 24;
      if (cat === 'Beauty') return 22;
      if (cat === 'Footwear') return 18;
      if (cat === 'Accessories') return 16;
      return 12;
    case 'Her':
    default:
      if (cat === 'Dresses') return 22;
      if (cat === 'Fragrance') return 22;
      if (cat === 'Beauty') return 20;
      if (cat === 'Accessories') return 18;
      return 14;
  }
}

/**
 * Score a product based on occasion affinity.
 */
function getOccasionScore(product: Product, occasion: OccasionType): number {
  const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
  
  switch (occasion) {
    case 'Anniversary':
      if (text.includes('gown') || text.includes('silk') || text.includes('gold') || text.includes('fragrance') || text.includes('watch')) return 25;
      if (product.category === 'Fragrance' || product.category === 'Accessories') return 20;
      return 10;
    case 'Birthday':
      if (text.includes('palette') || text.includes('velvet') || text.includes('glow') || text.includes('tote') || text.includes('dress')) return 25;
      if (product.category === 'Beauty' || product.category === 'Dresses') return 20;
      return 12;
    case "Valentine's":
      if (text.includes('rose') || text.includes('red') || text.includes('ruby') || text.includes('velvet') || text.includes('satin') || text.includes('perfume')) return 30;
      if (product.category === 'Fragrance' || product.category === 'Dresses') return 20;
      return 10;
    case 'Celebration':
      if (text.includes('cocktail') || text.includes('clutch') || text.includes('metallic') || text.includes('heel') || text.includes('champagne')) return 25;
      if (product.category === 'Dresses' || product.category === 'Footwear') return 20;
      return 12;
    case 'Just Because':
      if (text.includes('mist') || text.includes('cream') || text.includes('serum') || text.includes('linen') || text.includes('wrap')) return 25;
      if (product.category === 'Beauty' || product.category === 'Accessories') return 18;
      return 14;
    default:
      return 10;
  }
}

/**
 * Score a product based on style preference.
 */
function getStyleScore(product: Product, style: StylePreference | null): number {
  if (!style) return 10;

  const text = `${product.name} ${product.description}`.toLowerCase();

  switch (style) {
    case 'Elegant':
      if (text.includes('silk') || text.includes('gold') || text.includes('pearl') || text.includes('crepe') || text.includes('timeless')) return 25;
      if (product.category === 'Dresses' || product.category === 'Fragrance') return 18;
      return 8;
    case 'Soft':
      if (text.includes('rose') || text.includes('blush') || text.includes('chiffon') || text.includes('lavender') || text.includes('hydrat')) return 25;
      if (product.category === 'Beauty' || product.category === 'Dresses') return 18;
      return 8;
    case 'Bold':
      if (text.includes('ruby') || text.includes('noir') || text.includes('burgundy') || text.includes('velvet') || text.includes('structured') || text.includes('terracotta')) return 25;
      return 10;
    case 'Minimal':
      if (text.includes('linen') || text.includes('white') || text.includes('pure') || text.includes('wrap') || text.includes('clean') || text.includes('onyx')) return 25;
      return 10;
    case 'Glamorous':
      if (text.includes('shimmer') || text.includes('cocktail') || text.includes('palette') || text.includes('gown') || text.includes('luminous') || text.includes('gold')) return 25;
      return 10;
    default:
      return 10;
  }
}

/**
 * Generate a refined, brand-aligned reason why this piece was selected.
 */
function generateWhyPicked(product: Product, answers: GiftModeAnswers): string {
  const cat = product.category;
  const occasion = answers.occasion;
  const recipient = answers.recipient;
  const style = answers.style;

  if (occasion === "Valentine's" && (cat === 'Fragrance' || cat === 'Dresses')) {
    return `An intoxicating and romantic choice — evocative notes tailored for a memorable Valentine's.`;
  }
  if (occasion === 'Anniversary') {
    return `Timeless luxury and refined craftsmanship — an exquisite keepsake for your anniversary.`;
  }
  if (occasion === 'Birthday') {
    return `Versatile, radiant, and indulgent — a celebrated favorite she will delight in unboxing.`;
  }
  if (occasion === 'Celebration') {
    return `Exquisitely tailored for celebratory moments, radiating confidence and effortless poise.`;
  }
  if (occasion === 'Just Because') {
    return `An everyday luxury to brighten her routine — thoughtful, intimate, and comforting.`;
  }
  if (style === 'Elegant') {
    return `Sleek silhouette with noble texture — crafted for understated, enduring elegance.`;
  }
  if (style === 'Soft') {
    return `Delicate tones and nourishing formulation designed for a gentle, luminous touch.`;
  }
  if (style === 'Bold') {
    return `Rich pigment and commanding structure — a confident statement piece for ${recipient || 'her'}.`;
  }
  if (style === 'Minimal') {
    return `Clean lines and pure materials that complement an effortless, modern aesthetic.`;
  }
  if (style === 'Glamorous') {
    return `Lustrous finish and high-impact allure designed to turn heads at every evening gathering.`;
  }

  return `Hand-selected by the concierge for its immaculate finish and timeless feminine charm.`;
}

/**
 * Core Gift Recommendation Engine.
 * Evaluates the full product list deterministically and returns 4-6 top matches.
 */
export function getGiftRecommendations(
  allProducts: Product[],
  answers: GiftModeAnswers,
  limit = 6
): ScoredGiftProduct[] {
  if (!allProducts || allProducts.length === 0) return [];

  // Filter valid products first
  const validProducts = allProducts.filter(
    p => p.name && p.image && p.price && p.price > 0 && p.stock > 0
  );

  // Filter by budget if provided
  let pool = answers.budget 
    ? validProducts.filter(p => matchesBudget(p, answers.budget!))
    : validProducts;

  // If strict budget yields fewer than 3 items, gracefully broaden pool
  if (pool.length < 3 && answers.budget) {
    pool = validProducts;
  }

  // Score each product
  const scored: ScoredGiftProduct[] = pool.map(product => {
    let score = 0;

    // Recipient affinity
    if (answers.recipient) {
      score += getRecipientScore(product, answers.recipient);
    }

    // Occasion affinity
    if (answers.occasion) {
      score += getOccasionScore(product, answers.occasion);
    }

    // Style affinity
    if (answers.style) {
      score += getStyleScore(product, answers.style);
    }

    // Small bonus for flash sale or in-stock favorites
    if (product.isFlashSale) score += 3;
    if (product.stock > 10) score += 2;

    const whyPicked = generateWhyPicked(product, answers);

    return {
      product,
      score,
      whyPicked
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Return top items (default 4-6)
  return scored.slice(0, limit);
}

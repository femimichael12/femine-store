import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Gift, 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  ChevronLeft, 
  Sun, 
  Moon, 
  Zap, 
  Flame, 
  Check, 
  SlidersHorizontal,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Product, RecipientType, OccasionType, BudgetRange, StylePreference, GiftModeAnswers, CartItem, ScoredGiftProduct } from './types';
import { getGiftRecommendations, BUDGET_LABELS } from './lib/giftRecommendation';
import GiftCustomizationModal from './components/GiftCustomizationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GiftModePageProps {
  products: Product[];
  onExit: () => void;
  onNavigateToGiftCards: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onAddToCart: (
    product: Product, 
    size: string, 
    color: string, 
    qty?: number,
    giftData?: {
      isGift: boolean;
      recipientName: string;
      giftMessage: string;
      giftWrapping: boolean;
      giftWrappingFee: number;
    }
  ) => void;
  cartCount: number;
  onOpenCart?: () => void;
  onSelectProduct: (product: Product) => void;
}

const RECIPIENT_OPTIONS: { id: RecipientType; label: string; desc: string; icon: string }[] = [
  { id: 'Her', label: 'Her', desc: 'Curated for womanhood', icon: '✨' },
  { id: 'Partner', label: 'Partner', desc: 'Intimate & romantic', icon: '💎' },
  { id: 'Friend', label: 'Friend', desc: 'Playful, radiant & chic', icon: '🌸' },
  { id: 'Mother', label: 'Mother', desc: 'Graceful & comforting', icon: '🕊️' },
  { id: 'Sister', label: 'Sister', desc: 'Trendsetting & stylish', icon: '💫' },
];

const OCCASION_OPTIONS: { id: OccasionType; label: string; desc: string }[] = [
  { id: 'Birthday', label: 'Birthday', desc: 'Celebrate her special year' },
  { id: 'Anniversary', label: 'Anniversary', desc: 'A timeless milestone keepsake' },
  { id: "Valentine's", label: "Valentine's", desc: 'Passionate romance & allure' },
  { id: 'Celebration', label: 'Celebration', desc: 'Promotions, milestones & wins' },
  { id: 'Just Because', label: 'Just Because', desc: 'An everyday token of adoration' },
];

const BUDGET_OPTIONS: { id: BudgetRange; label: string; sub: string }[] = [
  { id: 'under-50k', label: 'Under ₦50,000', sub: 'Accessible everyday luxury' },
  { id: '50k-100k', label: '₦50,000 – ₦100,000', sub: 'Elevated premium edits' },
  { id: '100k-200k', label: '₦100,000 – ₦200,000', sub: 'Signature statement pieces' },
  { id: '200k-plus', label: '₦200,000+', sub: 'High-luxury & couture edit' },
];

const STYLE_OPTIONS: { id: StylePreference; label: string; desc: string }[] = [
  { id: 'Elegant', label: 'Elegant', desc: 'Silk, structured tailoring & fine jewelry' },
  { id: 'Soft', label: 'Soft', desc: 'Subtle skincare, rosewater & plissé chiffon' },
  { id: 'Bold', label: 'Bold', desc: 'Rich velvets, statement lips & noir accents' },
  { id: 'Minimal', label: 'Minimal', desc: 'Clean European linen & modern essentials' },
  { id: 'Glamorous', label: 'Glamorous', desc: 'Duochrome metallics, cocktail gowns & sheen' },
];

export default function GiftModePage({
  products,
  onExit,
  onNavigateToGiftCards,
  theme,
  toggleTheme,
  onAddToCart,
  cartCount,
  onOpenCart,
  onSelectProduct
}: GiftModePageProps) {
  const isDark = theme === 'dark';

  // Step state: 1 (Recipient), 2 (Occasion), 3 (Budget), 4 (Style), 5 (Results)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<GiftModeAnswers>({
    recipient: null,
    occasion: null,
    budget: null,
    style: null,
  });

  // Modal for "Make It a Gift"
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  // Local wishlist state for heart toggle
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('femine_wishlist_ids') || '[]');
    } catch {
      return [];
    }
  });

  const toggleWishlist = (productId: string, productName: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('femine_wishlist_ids', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      if (exists) {
        toast.info(`${productName} removed from wishlist`);
      } else {
        toast.success(`${productName} saved to wishlist!`);
      }
      return updated;
    });
  };

  const handleSelectRecipient = (rec: RecipientType) => {
    setAnswers(prev => ({ ...prev, recipient: rec }));
    setCurrentStep(2);
  };

  const handleSelectOccasion = (occ: OccasionType) => {
    setAnswers(prev => ({ ...prev, occasion: occ }));
    setCurrentStep(3);
  };

  const handleSelectBudget = (b: BudgetRange) => {
    setAnswers(prev => ({ ...prev, budget: b }));
    setCurrentStep(4);
  };

  const handleSelectStyle = (s: StylePreference | null) => {
    setAnswers(prev => ({ ...prev, style: s }));
    setCurrentStep(5);
  };

  const handleRestart = () => {
    setAnswers({
      recipient: null,
      occasion: null,
      budget: null,
      style: null,
    });
    setCurrentStep(1);
  };

  const recommendations = useMemo(() => {
    if (currentStep < 5) return [];
    return getGiftRecommendations(products, answers, 6);
  }, [products, answers, currentStep]);

  const formatPrice = (price?: number) => `₦${(price ?? 0).toLocaleString()}`;

  return (
    <div className={cn(
      "min-h-screen relative flex flex-col justify-between transition-colors duration-500 selection:bg-brand-coral selection:text-white overflow-x-hidden",
      isDark ? "bg-[#090707] text-white" : "bg-background text-foreground"
    )}>
      {/* Ambient Concierge Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[100vw] max-w-[900px] h-[70vh] opacity-30 blur-[140px] rounded-full pointer-events-none animate-float-glow"
          style={{
            background: isDark
              ? `radial-gradient(circle, rgba(255, 140, 97, 0.25) 0%, rgba(194, 172, 106, 0.15) 45%, transparent 75%)`
              : `radial-gradient(circle, rgba(251, 231, 233, 0.8) 0%, rgba(233, 220, 201, 0.6) 50%, transparent 80%)`
          }}
        />
      </div>

      {/* Top Fixed Concierge Navbar */}
      <header className={cn(
        "sticky top-0 z-40 px-4 sm:px-8 py-3.5 border-b backdrop-blur-xl transition-all flex items-center justify-between",
        isDark ? "bg-black/60 border-white/10" : "bg-white/60 border-brand-maroon/10 shadow-xs"
      )}>
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-brand-coral transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Exit Gift Mode</span>
            <span className="sm:hidden">Exit</span>
          </button>

          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          {currentStep > 1 && (
            <button
              onClick={handleRestart}
              className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-muted-foreground/70 hover:text-brand-coral transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          )}
        </div>

        {/* Center Brand Title */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
          <span className="text-sm sm:text-base font-serif font-bold tracking-tight text-gradient">
            FEMINÉ GIFT CONCIERGE
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-brand-blush/40 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-maroon" />}
          </Button>

          {onOpenCart && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCart}
              className="rounded-full gap-1.5 text-xs font-bold px-3 py-1.5 border-muted/30 relative cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brand-coral" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-brand-coral text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </header>

      {/* Concierge Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Concierge Headline Header (Visible in wizard steps) */}
        {currentStep < 5 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2.5 max-w-2xl mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-brand-coral/20 bg-brand-coral/10 text-brand-coral text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>FEMINÉ GIFT MODE</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
              Find something she'll love.
            </h1>
            
            <p className="text-muted-foreground text-xs sm:text-base font-light tracking-wide">
              A little help choosing something beautiful.
            </p>

            {/* Step Indicator Progress */}
            <div className="flex items-center justify-center gap-2 pt-3">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    currentStep === step 
                      ? "w-8 bg-brand-coral" 
                      : currentStep > step 
                        ? "w-3 bg-brand-coral/60" 
                        : "w-3 bg-muted/40"
                  )}
                />
              ))}
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-2">
                Step 0{currentStep} / 04
              </span>
            </div>
          </motion.div>
        )}

        {/* Wizard Question Container (Single Question Visible at a Time) */}
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Who are you shopping for? */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-6 sm:p-10 rounded-[2.5rem] border backdrop-blur-2xl shadow-2xl space-y-6 text-center",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-white/80 shadow-brand-maroon/5"
                )}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-coral block">
                    Question 01
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold">
                    Who are you shopping for?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light">
                    Select who will be receiving this gift.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                  {RECIPIENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectRecipient(opt.id)}
                      className={cn(
                        "p-5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all duration-300 group cursor-pointer active:scale-98",
                        answers.recipient === opt.id
                          ? "bg-brand-coral/15 border-brand-coral ring-1 ring-brand-coral shadow-md"
                          : isDark
                            ? "bg-white/5 border-white/10 hover:border-brand-coral/50 hover:bg-white/10"
                            : "bg-white/90 border-brand-maroon/10 hover:border-brand-coral/50 hover:bg-white shadow-xs"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{opt.icon}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                          answers.recipient === opt.id ? "bg-brand-coral border-brand-coral text-white" : "border-muted-foreground/30"
                        )}>
                          {answers.recipient === opt.id && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-lg group-hover:text-brand-coral transition-colors">{opt.label}</p>
                        <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: What's the occasion? */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-6 sm:p-10 rounded-[2.5rem] border backdrop-blur-2xl shadow-2xl space-y-6 text-center",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-white/80 shadow-brand-maroon/5"
                )}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-coral block">
                    Question 02
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold">
                    What's the occasion?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light">
                    Every moment has its own signature rhythm.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                  {OCCASION_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOccasion(opt.id)}
                      className={cn(
                        "p-5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all duration-300 group cursor-pointer active:scale-98",
                        answers.occasion === opt.id
                          ? "bg-brand-coral/15 border-brand-coral ring-1 ring-brand-coral shadow-md"
                          : isDark
                            ? "bg-white/5 border-white/10 hover:border-brand-coral/50 hover:bg-white/10"
                            : "bg-white/90 border-brand-maroon/10 hover:border-brand-coral/50 hover:bg-white shadow-xs"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <Sparkles className="w-4 h-4 text-brand-coral opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                          answers.occasion === opt.id ? "bg-brand-coral border-brand-coral text-white" : "border-muted-foreground/30"
                        )}>
                          {answers.occasion === opt.id && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-lg group-hover:text-brand-coral transition-colors">{opt.label}</p>
                        <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: What's your budget? */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-6 sm:p-10 rounded-[2.5rem] border backdrop-blur-2xl shadow-2xl space-y-6 text-center",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-white/80 shadow-brand-maroon/5"
                )}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-coral block">
                    Question 03
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold">
                    What's your budget?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light">
                    We'll tailor suggestions to match your desired price tier.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectBudget(opt.id)}
                      className={cn(
                        "p-6 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 group cursor-pointer active:scale-98",
                        answers.budget === opt.id
                          ? "bg-brand-coral/15 border-brand-coral ring-1 ring-brand-coral shadow-md"
                          : isDark
                            ? "bg-white/5 border-white/10 hover:border-brand-coral/50 hover:bg-white/10"
                            : "bg-white/90 border-brand-maroon/10 hover:border-brand-coral/50 hover:bg-white shadow-xs"
                      )}
                    >
                      <div className="space-y-0.5">
                        <p className="font-serif font-bold text-xl group-hover:text-brand-coral transition-colors">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.sub}</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        answers.budget === opt.id ? "bg-brand-coral border-brand-coral text-white" : "border-muted-foreground/30"
                      )}>
                        {answers.budget === opt.id && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Style Preference (Optional with Skip) */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-6 sm:p-10 rounded-[2.5rem] border backdrop-blur-2xl shadow-2xl space-y-6 text-center",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-white/80 shadow-brand-maroon/5"
                )}
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-brand-coral">
                    <span>Optional Step</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold">
                    What feels like her?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light">
                    Select a style aesthetic that best captures her presence, or skip to see all curated gifts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                  {STYLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectStyle(opt.id)}
                      className={cn(
                        "p-5 rounded-2xl border text-left flex flex-col justify-between gap-2.5 transition-all duration-300 group cursor-pointer active:scale-98",
                        answers.style === opt.id
                          ? "bg-brand-coral/15 border-brand-coral ring-1 ring-brand-coral shadow-md"
                          : isDark
                            ? "bg-white/5 border-white/10 hover:border-brand-coral/50 hover:bg-white/10"
                            : "bg-white/90 border-brand-maroon/10 hover:border-brand-coral/50 hover:bg-white shadow-xs"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-coral">Aesthetic</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                          answers.style === opt.id ? "bg-brand-coral border-brand-coral text-white" : "border-muted-foreground/30"
                        )}>
                          {answers.style === opt.id && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-lg group-hover:text-brand-coral transition-colors">{opt.label}</p>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-muted/15 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleSelectStyle(null)}
                    className="text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-brand-coral px-8 py-2 rounded-full cursor-pointer"
                  >
                    Skip this step & view recommendations &rarr;
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Personalized Recommendations (YOUR FEMINÉ GIFT EDIT) */}
            {currentStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-10"
              >
                {/* Result Section Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-coral/25 bg-brand-coral/10 text-brand-coral text-[10px] uppercase tracking-[0.35em] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CURATED CONCIERGE SELECTIONS</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
                    YOUR FEMINÉ GIFT EDIT
                  </h2>

                  <p className="text-muted-foreground text-sm sm:text-base font-light max-w-lg mx-auto">
                    A few pieces we think she'll love.
                  </p>

                  {/* Active Criteria Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {answers.recipient && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-secondary text-foreground border border-muted/20">
                        For: {answers.recipient}
                      </span>
                    )}
                    {answers.occasion && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-secondary text-foreground border border-muted/20">
                        Occasion: {answers.occasion}
                      </span>
                    )}
                    {answers.budget && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-secondary text-foreground border border-muted/20">
                        Budget: {BUDGET_LABELS[answers.budget]}
                      </span>
                    )}
                    {answers.style && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-secondary text-foreground border border-muted/20">
                        Style: {answers.style}
                      </span>
                    )}

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-brand-coral/40 text-brand-coral hover:bg-brand-coral hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>Adjust Preferences</span>
                    </button>
                  </div>
                </div>

                {/* Recommendations Grid */}
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {recommendations.map((item: ScoredGiftProduct, idx: number) => {
                      const product = item.product;
                      const isWishlisted = wishlistIds.includes(product.id);

                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          <Card className={cn(
                            "group overflow-hidden rounded-[2rem] border transition-all duration-500 hover:shadow-2xl hover:border-brand-coral/40 flex flex-col h-full",
                            isDark 
                              ? "bg-white/[0.03] border-white/10 hover:shadow-black/80" 
                              : "bg-white/80 border-brand-maroon/10 hover:shadow-brand-maroon/10 shadow-xs"
                          )}>
                            <CardContent className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
                              {/* Image & Badges */}
                              <div 
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary cursor-pointer"
                                onClick={() => onSelectProduct(product)}
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.src = 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800';
                                  }}
                                />

                                {product.isFlashSale && (
                                  <div className="absolute top-3 left-3 bg-brand-coral text-white text-[8px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                                    <Zap className="w-2.5 h-2.5 fill-current" />
                                    <span>FLASH SALE</span>
                                  </div>
                                )}

                                <div className="absolute top-3 right-3 z-10">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleWishlist(product.id, product.name);
                                    }}
                                    className={cn(
                                      "w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer",
                                      isWishlisted 
                                        ? "bg-brand-coral text-white" 
                                        : "bg-white/90 text-brand-maroon hover:bg-brand-coral hover:text-white"
                                    )}
                                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                  >
                                    <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
                                  </button>
                                </div>
                              </div>

                              {/* Product Info & Why We Picked It */}
                              <div className="space-y-3 flex-1 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-brand-coral">
                                      {product.category}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-sans font-bold">
                                      Score: {item.score}pts
                                    </span>
                                  </div>

                                  <h3 
                                    onClick={() => onSelectProduct(product)}
                                    className="font-serif font-bold text-lg sm:text-xl leading-snug group-hover:text-brand-coral transition-colors cursor-pointer line-clamp-1"
                                  >
                                    {product.name}
                                  </h3>

                                  {/* "Why we picked it" Reason Card */}
                                  <div className={cn(
                                    "p-2.5 rounded-xl border text-[11px] leading-relaxed transition-colors",
                                    isDark ? "bg-white/[0.02] border-white/5 text-white/80" : "bg-brand-blush/30 border-brand-maroon/5 text-brand-maroon/80"
                                  )}>
                                    <span className="font-bold text-brand-coral block text-[9px] uppercase tracking-wider mb-0.5">
                                      Why we picked it
                                    </span>
                                    {item.whyPicked}
                                  </div>
                                </div>

                                {/* Price & Action Buttons */}
                                <div className="space-y-3 pt-2 border-t border-muted/20">
                                  <div className="flex items-baseline justify-between">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Price</span>
                                    <div className="flex items-baseline gap-2">
                                      {product.salePrice ? (
                                        <>
                                          <span className="text-xs text-muted-foreground line-through opacity-60 font-sans">
                                            {formatPrice(product.price)}
                                          </span>
                                          <span className="text-lg font-bold font-sans text-brand-coral">
                                            {formatPrice(product.salePrice)}
                                          </span>
                                        </>
                                      ) : (
                                        <span className="text-lg font-bold font-sans text-foreground">
                                          {formatPrice(product.price)}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Actions: "Make It a Gift" & "Quick Bag" */}
                                  <div className="grid grid-cols-2 gap-2">
                                    <Button
                                      onClick={() => setCustomizingProduct(product)}
                                      className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-xl py-2.5 text-[10px] uppercase tracking-widest font-bold shadow-md shadow-brand-coral/20 flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                      <Gift className="w-3.5 h-3.5" />
                                      <span>Make Gift</span>
                                    </Button>

                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        onAddToCart(
                                          product,
                                          product.sizes?.[0] || 'Standard',
                                          product.colors?.[0]?.name || 'Standard',
                                          1
                                        );
                                      }}
                                      className="rounded-xl py-2.5 text-[10px] uppercase tracking-widest font-bold border-muted/30 hover:bg-secondary flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                      <ShoppingBag className="w-3.5 h-3.5" />
                                      <span>Add to Bag</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty State Fallback */
                  <div className={cn(
                    "p-10 sm:p-16 rounded-[2.5rem] border text-center max-w-xl mx-auto space-y-5",
                    isDark ? "bg-white/[0.02] border-white/10" : "bg-white/80 border-brand-maroon/10"
                  )}>
                    <div className="w-16 h-16 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center mx-auto border border-brand-coral/20">
                      <Gift className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-2xl font-bold">We couldn't find the perfect match.</h3>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Try expanding your price range or adjusting your aesthetic preference to view more options.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <Button
                        onClick={() => setCurrentStep(1)}
                        className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-6 py-2 text-xs uppercase tracking-widest font-bold cursor-pointer"
                      >
                        Adjust Preferences
                      </Button>
                      <Button
                        variant="outline"
                        onClick={onExit}
                        className="rounded-full px-6 py-2 text-xs uppercase tracking-widest font-bold cursor-pointer"
                      >
                        Browse All Gifts
                      </Button>
                    </div>
                  </div>
                )}

                {/* Section 12: Gift Card Fallback at Bottom */}
                <div className={cn(
                  "p-8 sm:p-12 rounded-[2.5rem] border backdrop-blur-xl text-center space-y-4 max-w-3xl mx-auto mt-12 transition-all",
                  isDark ? "bg-white/[0.02] border-white/10" : "bg-brand-blush/30 border-brand-coral/20 shadow-xs"
                )}>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-coral block">
                    STILL NOT SURE?
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold">
                    Give her the choice.
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto font-light">
                    Send an instant digital gift card with a custom note and let her select her favorite FEMINÉ pieces.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={onNavigateToGiftCards}
                      className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 py-5 uppercase tracking-widest text-xs font-bold shadow-lg shadow-brand-coral/20 cursor-pointer active:scale-95 transition-all"
                    >
                      Explore Gift Cards
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-muted/15 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-center">
        © 2026 FEMINÉ Maison &bull; Bespoke Luxury Concierge Gifting
      </footer>

      {/* "Make It a Gift" Customization Dialog */}
      <GiftCustomizationModal
        product={customizingProduct}
        isOpen={!!customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        theme={theme}
        defaultRecipient={answers.recipient || ''}
        onAddToGiftBag={(product, size, color, qty, giftData) => {
          onAddToCart(product, size, color, qty, giftData);
        }}
      />
    </div>
  );
}

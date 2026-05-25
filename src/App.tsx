import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { usePaystackPayment } from 'react-paystack';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ArrowRight,
  Clock,
  Timer,
  Zap,
  Flame,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  Heart,
  Sun,
  Moon,
  CheckCircle2,
  Truck,
  Lock,
  Loader2
} from 'lucide-react';
import { products } from './data';
import { Product, CartItem } from './types';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import AdminDashboard from './AdminDashboard';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedQuantity(1);
      setSelectedSize(selectedProduct.sizes[0] || '');
      setSelectedColor(selectedProduct.colors[0]?.name || '');
    }
  }, [selectedProduct]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const trendingSearches = ['Radiance Serum', 'Hydration Gel', 'Glow Cream', 'Face Oil', 'Natural Cleanser'];

  const addToRecentSearches = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== query);
      const updated = [query, ...filtered].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const suggestedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4);
  }, [searchQuery]);

  const blogPosts = [
    {
      title: "The Ultimate 5-Step Morning Skincare Routine",
      category: "Skincare Tips",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
      date: "May 10, 2026",
      readTime: "5 min read"
    },
    {
      title: "Natural Makeup: How to Achieve the 'No-Makeup' Look",
      category: "Makeup Tutorials",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
      date: "May 08, 2026",
      readTime: "7 min read"
    },
    {
      title: "Mindful Wellness: Balancing Career and Self-Care",
      category: "Wellness Advice",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      date: "May 05, 2026",
      readTime: "4 min read"
    },
    {
      title: "Summer 2026: The Top 10 Fashion Trends to Watch",
      category: "Fashion Trends",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      date: "May 01, 2026",
      readTime: "6 min read"
    }
  ];

  const heroSlides = [
    {
      title: "Transform Your Skin",
      subtitle: "Discover premium skincare products crafted with love and science to bring out your best self.",
      label: "Personal Care",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200",
      color: "bg-brand-blush/20"
    },
    {
      title: "Elevate Your Style",
      subtitle: "Discover the latest trends in women's fashion. Elegance and comfort for every occasion.",
      label: "Fashion Collection",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
      color: "bg-brand-coral/10"
    },
    {
      title: "Glow Naturally",
      subtitle: "Luxury skincare for confident women who value nature and results.",
      label: "Eco-Conscious",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1200",
      color: "bg-brand-nude/20"
    },
    {
      title: "Clinical Luxury",
      subtitle: "Experience the harmony of modern clinical science and ancient herbal wisdom.",
      label: "Verified Quality",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200",
      color: "bg-brand-gold/10"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product, size: string, color: string, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      
      toast.success(`${product.name} added to bag`, {
        description: `Size: ${size}, Color: ${color}`,
        duration: 2000,
      });

      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => {
      const item = prev[index];
      toast.info(`${item.product.name} removed from bag`, { duration: 2000 });
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, item.quantity + delta);
        if (newQty !== item.quantity) {
          toast.success(`Quantity updated to ${newQty}`, { duration: 1500 });
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: customerEmail || 'guest@example.com',
    amount: Math.round(cartTotal * 100), // Paystack amount is in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const handleCheckout = () => {
    if (!customerEmail) {
      toast.error('Email Required', { description: 'Please enter your email address to continue.' });
      return;
    }

    if (!config.publicKey) {
      toast.error('Configuration Error', { description: 'Payment system is not properly configured.' });
      return;
    }

    setIsPaymentLoading(true);
    initializePayment({
      onSuccess: (reference: any) => {
        setIsPaymentLoading(false);
        toast.success('Payment Successful', { description: `Order reference: ${reference.reference}` });
        setCart([]);
        setCustomerEmail('');
      },
      onClose: () => {
        setIsPaymentLoading(false);
        toast.info('Payment cancelled.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-brand-coral selection:text-white">
      <Toaster position="bottom-right" richColors theme={theme} />
      
      {/* Top Shipping Banner */}
      <div className="bg-brand-maroon/95 backdrop-blur-md text-white h-10 flex items-center justify-center overflow-hidden relative z-[60] border-b border-white/5">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="whitespace-nowrap flex gap-20 text-[10px] uppercase tracking-[0.4em] font-bold"
        >
          {Array(10).fill("Free shipping on orders above ₦50,000 • Get 10% off your first luxury purchase").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-12 md:top-14 left-4 right-4 md:left-6 md:right-6 z-50 transition-all duration-500 rounded-full px-4 md:px-8 py-2 md:py-3 flex items-center justify-between",
        isScrolled 
          ? "glass shadow-xl shadow-brand-maroon/5 border-white/40 -translate-y-8 md:-translate-y-10" 
          : "bg-white/30 backdrop-blur-md border border-white/20"
      )}>
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger
              className="lg:hidden p-2.5 hover:bg-brand-blush rounded-full transition-all duration-300 bg-brand-blush/30 active:scale-90"
            >
              <Menu className="w-5 h-5 text-brand-maroon" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0 border-none glass-dark text-white overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col h-full">
                <SheetHeader className="flex flex-row items-center justify-between space-y-0 mb-10">
                  <div className="flex items-center gap-1 group">
                    <span className="text-2xl font-serif tracking-tighter font-bold text-white">FEMINÉ</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-coral group-hover:scale-150 transition-transform" />
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </SheetHeader>

                <div className="mb-8 relative">
                   <div className="flex items-center bg-white/10 px-4 py-3 rounded-2xl border border-white/10">
                    <Search className="w-4 h-4 mr-3 text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Search Feminé..." 
                      className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <ScrollArea className="flex-grow -mx-4 px-4 pr-10">
                  <div className="space-y-12 pb-10">
                    {/* Main Nav */}
                    <div className="flex flex-col gap-6">
                      {['Home', 'Shop', 'New Arrivals', 'Best Sellers', 'Beauty', 'Fashion', 'Accessories', 'Wishlist', 'Cart', 'Orders', 'Contact'].map((item, i) => (
                        <motion.button
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="text-left group flex items-center justify-between"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-lg font-light tracking-wide group-hover:text-brand-coral group-hover:translate-x-2 transition-all duration-300">
                            {item}
                          </span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-brand-coral" />
                        </motion.button>
                      ))}
                    </div>

                    {/* Categories */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Shop By Category</p>
                      <div className="grid grid-cols-1 gap-5">
                        {['Skincare', 'Makeup', 'Haircare', 'Dresses', 'Bags', 'Shoes', 'Perfumes'].map((cat, i) => (
                           <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.05) }}
                            className="text-left text-sm text-white/70 hover:text-white transition-colors flex items-center gap-3"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-coral/40" />
                            {cat}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="mt-auto pt-8 border-t border-white/10 space-y-8">
                  <Button className="w-full bg-white text-brand-maroon hover:bg-brand-coral hover:text-white rounded-2xl py-6 uppercase tracking-widest text-[10px] font-bold transition-all shadow-xl">
                    Login / Sign Up
                  </Button>
                  
                  <div className="flex justify-center gap-8 text-white/40">
                    {['Instagram', 'Pinterest', 'Facebook', 'TikTok'].map(social => (
                      <button key={social} className="hover:text-brand-coral transition-colors">
                        <span className="sr-only">{social}</span>
                        <div className="w-2.5 h-2.5 bg-current rounded-full" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-serif tracking-tighter font-bold flex items-center gap-1 group cursor-pointer">
            <span className="text-gradient text-xl md:text-2xl">FEMINÉ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mb-1 group-hover:scale-150 transition-transform" />
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
          {['All', 'Footwear', 'Beauty', 'Fragrance'].map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "hover:text-brand-coral transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-coral after:transition-all hover:after:w-full",
                selectedCategory === cat ? "text-brand-coral after:w-full" : "text-brand-maroon/70"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-brand-blush transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-brand-maroon" /> : <Sun className="w-5 h-5 text-brand-maroon" />}
          </Button>

          <div className="relative hidden md:block">
            <div className={cn(
              "flex items-center bg-white/40 px-4 py-2 rounded-full border transition-all duration-500",
              isSearchFocused ? "border-brand-coral/50 bg-background shadow-lg w-64" : "border-white/40 w-48"
            )}>
              <Search className={cn("w-3.5 h-3.5 mr-2 transition-colors", isSearchFocused ? "text-brand-coral" : "text-brand-maroon/40")} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  // Small delay to allow clicking suggestions
                  setTimeout(() => setIsSearchFocused(false), 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addToRecentSearches(searchQuery);
                    setIsSearchFocused(false);
                  }
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 hover:text-brand-coral">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-4 left-0 right-0 glass rounded-[2.5rem] shadow-2xl border-white/40 p-6 z-[100] min-w-[320px] shadow-brand-maroon/5 ring-1 ring-brand-maroon/5"
                >
                  <div className="space-y-6">
                    {/* Matching Products */}
                    {suggestedProducts.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Matching Products</p>
                        <div className="space-y-2">
                          {suggestedProducts.map(product => (
                            <button 
                              key={product.id}
                              onClick={() => {
                                setSelectedProduct(product);
                                addToRecentSearches(product.name);
                                setSearchQuery(product.name);
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center gap-3 w-full p-2 hover:bg-brand-blush/20 rounded-2xl transition-colors text-left group"
                            >
                              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center p-2 overflow-hidden">
                                <img src={product.image} alt={product.name} className={cn("w-full h-full object-contain transition-transform group-hover:scale-110", theme === 'light' && "mix-blend-multiply")} />
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm font-bold truncate">{product.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase">{product.category}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-brand-coral transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent & Trending */}
                    <div className="grid grid-cols-1 gap-6">
                      {recentSearches.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Recent Searches</p>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map(s => (
                              <button 
                                key={s}
                                onClick={() => {
                                  setSearchQuery(s);
                                  setIsSearchFocused(false);
                                }}
                                className="text-[10px] font-bold px-3 py-1.5 bg-secondary hover:bg-brand-coral hover:text-white rounded-full transition-all"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
 
                      <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Trending Now</p>
                        <div className="flex flex-wrap gap-2">
                          {trendingSearches.map(s => (
                            <button 
                              key={s}
                              onClick={() => {
                                setSearchQuery(s);
                                addToRecentSearches(s);
                                setIsSearchFocused(false);
                              }}
                              className="text-[10px] font-bold px-3 py-1.5 border border-brand-coral/20 hover:border-brand-coral hover:text-brand-coral rounded-full transition-all"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative group")}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-brand-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md md:max-w-lg flex flex-col glass border-l border-white/20 shadow-2xl p-0 h-full">
              <div className="flex flex-col h-full bg-background/50 backdrop-blur-xl">
                <SheetHeader className="p-6 md:p-8 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="font-serif text-3xl tracking-tight flex items-center gap-3">
                      Your Bag
                      <span className="text-sm font-sans bg-brand-coral/10 text-brand-coral px-3 py-1 rounded-full font-bold">
                        {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                      </span>
                    </SheetTitle>
                  </div>
                </SheetHeader>
                
                <ScrollArea className="flex-grow px-6 md:px-8 py-6">
                  <AnimatePresence mode="wait">
                    {cart.length === 0 ? (
                      <motion.div 
                        key="empty-cart"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="h-full flex flex-col items-center justify-center text-muted-foreground py-20 text-center"
                      >
                        <div className="w-24 h-24 mb-6 rounded-full bg-secondary flex items-center justify-center relative">
                          <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20 animate-[spin_10s_linear_infinite]" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-2 text-foreground">Your bag is empty</h3>
                        <p className="text-sm max-w-[250px] mx-auto mb-8">Looks like you haven't added anything to your bag yet.</p>
                        <Button 
                          className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 uppercase tracking-widest text-xs font-bold"
                          onClick={() => {
                            const closeBtn = document.querySelector('[data-state="open"] button[aria-label="Close"]');
                            if (closeBtn) (closeBtn as HTMLButtonElement).click();
                          }}
                        >
                          Start Shopping
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div layout className="space-y-4">
                        <AnimatePresence initial={false}>
                          {cart.map((item, idx) => (
                            <motion.div 
                              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                              layout="position"
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="flex gap-5 bg-card/30 p-3 rounded-2xl border border-white/5 shadow-sm group"
                            >
                              <div className="w-24 h-32 bg-secondary rounded-xl overflow-hidden flex-shrink-0 relative">
                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex-grow flex flex-col justify-between py-1">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-start gap-2">
                                    <h4 className="font-bold text-sm md:text-base leading-tight group-hover:text-brand-coral transition-colors line-clamp-2">{item.product.name}</h4>
                                    <p className="font-bold text-sm whitespace-nowrap">{formatPrice(item.product.price)}</p>
                                  </div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Size: {item.selectedSize} &bull; Color: {item.selectedColor}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center bg-secondary rounded-full p-1 border border-white/5">
                                    <button 
                                      onClick={() => updateQuantity(idx, -1)} 
                                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:text-brand-coral transition-all active:scale-95"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <motion.span 
                                      key={item.quantity}
                                      initial={{ scale: 0.5 }}
                                      animate={{ scale: 1 }}
                                      className="w-8 text-center text-sm font-bold"
                                    >
                                      {item.quantity}
                                    </motion.span>
                                    <button 
                                      onClick={() => updateQuantity(idx, 1)} 
                                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:text-brand-coral transition-all active:scale-95"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <button 
                                    onClick={() => removeFromCart(idx)} 
                                    className="p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ScrollArea>
                
                <SheetFooter className="mt-auto p-6 md:p-8 bg-card/50 border-t border-white/10 backdrop-blur-md">
                  <div className="w-full space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between items-center font-serif text-2xl font-bold">
                        <span>Total</span>
                        <span className="text-brand-coral">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {cart.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="relative group">
                            <input 
                              type="email" 
                              placeholder="Enter email for receipt" 
                              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral/50 transition-all shadow-inner"
                              value={customerEmail}
                              onChange={(e) => setCustomerEmail(e.target.value)}
                              required
                            />
                            <div className={cn(
                              "absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest font-bold transition-colors pointer-events-none",
                              customerEmail ? "text-brand-coral" : "text-muted-foreground"
                            )}>
                              Required
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button 
                      onClick={handleCheckout}
                      disabled={cart.length === 0 || isPaymentLoading}
                      className={cn(
                        "w-full rounded-xl py-7 text-sm uppercase tracking-widest font-bold transition-all duration-300 relative overflow-hidden group",
                        cart.length > 0 && !isPaymentLoading ? "bg-brand-coral text-white hover:bg-brand-coral/90 hover:shadow-lg hover:shadow-brand-coral/20 hover:-translate-y-1" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isPaymentLoading ? (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Securely Initializing...
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Proceed to Checkout
                          {cart.length > 0 && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </span>
                      )}
                      {cart.length > 0 && !isPaymentLoading && (
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                      )}
                    </Button>

                    <div className="flex flex-col items-center gap-4 pt-4 border-t border-border/50">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                        <Lock className="w-3 h-3" /> Secure Checkout
                      </p>
                      <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 w-auto" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 w-auto" />
                        <img src="https://paystack.com/assets/img/login/paystack-logo.png" alt="Paystack" className="h-3 w-auto" />
                      </div>
                    </div>
                  </div>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen pt-24 md:pt-32 items-center overflow-hidden flex flex-col justify-center">
        {/* Immersive Atmospheric Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-40 blur-[100px] z-0"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(--brand-blush) 0%, transparent 40%), radial-gradient(circle at 70% 70%, var(--brand-nude) 0%, transparent 40%), radial-gradient(circle at 50% 50%, var(--brand-gold) 33%, transparent 50%)`
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex items-center py-12 md:py-20 overflow-hidden">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 w-full cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) {
                setCurrentSlide(prev => (prev + 1) % heroSlides.length);
              } else if (swipe > 50) {
                setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
              }
            }}
          >
            <div className="lg:w-1/2 space-y-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-brand-coral text-xs uppercase tracking-[0.3em] font-bold"
                    >
                      {heroSlides[currentSlide].label}
                    </motion.span>
                    <motion.h2 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight"
                    >
                      <span className="text-brand-coral italic block mb-2 font-normal">
                        {heroSlides[currentSlide].title.split(' ')[0]}
                      </span>
                      {heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}
                    </motion.h2>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-base md:text-lg text-muted-foreground max-w-sm font-light leading-relaxed"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap items-center gap-4 pt-4"
                  >
                    <Button size="lg" className="rounded-full px-8 md:px-10 py-6 md:py-7 bg-brand-coral text-white hover:bg-brand-coral/90 uppercase tracking-widest text-[10px] md:text-xs font-bold shadow-lg shadow-brand-coral/20 border-none">
                      Shop Now
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 md:px-10 py-6 md:py-7 border-brand-coral text-brand-coral hover:bg-brand-coral/5 uppercase tracking-widest text-[10px] md:text-xs font-bold shadow-sm bg-transparent">
                      New Collection
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-4 md:gap-8 pt-8">
                {[
                  { label: "100% Natural", color: "bg-background" },
                  { label: "Clinically Approved", color: "bg-background" },
                  { label: "Herbal Products", color: "bg-background" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + (i * 0.1) }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-brand-coral/10 text-[8px] md:text-[9px] font-bold text-center p-2 leading-tight uppercase tracking-tighter", item.color)}>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9, rotate: 5, x: 50 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -5, x: -50 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Product Splash Effect */}
                  <div className="absolute -inset-10 bg-gradient-to-tr from-brand-coral/10 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10 max-w-md">
                    <img 
                      src={heroSlides[currentSlide].image} 
                      alt="Hero Product" 
                      className={cn("w-full h-auto drop-shadow-2xl", theme === 'light' && "mix-blend-multiply")}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Floating Badge */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -bottom-4 left-0 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Testimonial" />
                    </div>
                    <div className="text-[10px]">
                      <p className="font-bold">Amazing Results!</p>
                      <div className="flex text-brand-coral mt-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-2 h-2 fill-current" />)}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex flex-col gap-4 z-30">
                {heroSlides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "w-1.5 h-8 rounded-full transition-all duration-300",
                      currentSlide === i ? "bg-brand-coral h-12" : "bg-brand-maroon/20 hover:bg-brand-maroon/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="relative md:absolute md:bottom-0 left-0 right-0 bg-brand-maroon text-white py-8 md:py-10 z-20 w-full">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-1">
                <p className="text-xl lg:text-2xl font-serif">Loved by Over <span className="text-brand-coral font-bold">500,000+</span> Customers</p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Worldwide Presence</p>
              </div>
              <div className="flex gap-10 md:gap-16">
                <div>
                  <p className="text-3xl font-bold">1M+</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest">Products Sold This Year</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">4.9</p>
                    <div className="flex text-brand-coral">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest">Customer Ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Products */}
      <section className="py-20 md:py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <h3 className="text-4xl lg:text-5xl font-serif font-bold">Our Star <span className="text-brand-coral">Products</span></h3>
            <p className="text-muted-foreground max-w-sm font-light text-sm uppercase tracking-wide">
              Discover our most-loved skincare essentials that deliver real results.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', 'Beauty', 'Fragrance', 'Footwear'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-3 rounded-full transition-all border",
                  selectedCategory === cat ? "bg-brand-coral text-white border-brand-coral" : "bg-white border-border hover:border-brand-coral"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card 
                  className="group border-none glass hover:bg-background transition-all duration-700 rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(74,29,29,0.15)] hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardContent className="p-0">
                    <div className="p-4 md:p-8">
                      <div className={cn(
                        "relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-8 flex items-center justify-center p-4 md:p-8 transition-all duration-700 group-hover:scale-[0.98] group-hover:shadow-inner",
                        idx % 3 === 0 ? "bg-brand-blush/40" : idx % 3 === 1 ? "bg-brand-nude/40" : "bg-brand-gold/10"
                      )}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={cn("max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110", theme === 'light' && "mix-blend-multiply")}
                          referrerPolicy="no-referrer"
                        />
                        {product.isFlashSale && (
                          <div className="absolute top-4 left-4 bg-brand-coral text-white text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-bounce-slow">
                            <Zap className="w-2.5 h-2.5 fill-current" />
                            FLASH SALE
                          </div>
                        )}
                        {product.stock <= 5 && (
                          <div className="absolute bottom-4 left-4 bg-brand-maroon/90 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                            <Flame className="w-2.5 h-2.5 text-brand-coral fill-current" />
                            ONLY {product.stock} LEFT!
                          </div>
                        )}
                        <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                          <Button size="icon" className="w-10 h-10 rounded-full bg-white text-brand-coral hover:bg-brand-coral hover:text-white shadow-lg">
                            <Heart className={cn("w-4 h-4", idx % 3 === 0 && "fill-current")} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm md:text-lg leading-tight group-hover:text-brand-coral transition-colors line-clamp-2">{product.name}</h4>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">{product.category}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-dashed gap-1">
                          <div className="bg-brand-coral/10 text-brand-coral px-2.5 py-1 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-bold whitespace-nowrap">
                            Buy Now
                          </div>
                          <div className="flex flex-col items-end">
                            {product.salePrice ? (
                              <>
                                <span className="text-[9px] md:text-[10px] text-muted-foreground line-through opacity-60 font-bold">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="font-bold text-sm md:text-xl text-brand-coral">
                                  {formatPrice(product.salePrice)}
                                </span>
                              </>
                            ) : (
                               <span className="font-bold text-sm md:text-xl">{formatPrice(product.price)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-[1100px] w-[90vw] p-0 overflow-hidden border border-white/10 bg-background/80 backdrop-blur-xl rounded-[24px] shadow-2xl shadow-brand-coral/5">
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto scrollbar-hide relative"
            >
              {/* Left: Image Gallery */}
              <div className="lg:w-1/2 bg-brand-muted/10 p-6 md:p-10 flex flex-col gap-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-background group">
                  <motion.img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", 
                      theme === 'light' && "mix-blend-multiply"
                    )}
                    referrerPolicy="no-referrer"
                  />
                  {selectedProduct.isFlashSale && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="bg-brand-coral border-none text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest gap-1.5 shadow-lg">
                        <Zap className="w-3 h-3 fill-current" /> Flash Sale
                      </Badge>
                    </div>
                  )}
                </div>
                {/* Thumbnails (Simulated Gallery) */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={cn(
                      "aspect-square rounded-xl overflow-hidden bg-background border-2 cursor-pointer transition-all hover:opacity-100",
                      i === 1 ? "border-brand-coral opacity-100" : "border-transparent opacity-60"
                    )}>
                      <img 
                        src={selectedProduct.image} 
                        alt={`${selectedProduct.name} view ${i}`} 
                        className={cn("w-full h-full object-cover", theme === 'light' && "mix-blend-multiply")} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-between">
                <div className="space-y-8">
                  {/* Header & Title */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-brand-coral text-[10px] uppercase tracking-[0.2em] font-bold">
                        {selectedProduct.category}
                      </span>
                    </div>
                    <DialogTitle className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                      {selectedProduct.name}
                    </DialogTitle>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex text-brand-coral">
                          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <span className="text-muted-foreground text-xs uppercase tracking-widest">(24 reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price & Description */}
                  <div className="space-y-6">
                    <div className="flex items-baseline gap-4">
                      {selectedProduct.salePrice ? (
                        <>
                          <p className="text-3xl font-bold text-brand-coral">{formatPrice(selectedProduct.salePrice)}</p>
                          <p className="text-xl text-muted-foreground line-through opacity-50">{formatPrice(selectedProduct.price)}</p>
                        </>
                      ) : (
                        <p className="text-3xl font-medium">{formatPrice(selectedProduct.price)}</p>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed font-light text-sm">
                      {selectedProduct.description}
                    </p>

                    {/* Indicators */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Truck className="w-4 h-4 text-brand-coral" />
                        Free delivery on orders over ₦50,000
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                        In stock and ready to ship
                      </div>
                    </div>
                  </div>
                  
                  {/* Selectors */}
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Size</span>
                        <button className="text-[10px] text-muted-foreground underline hover:text-brand-coral transition-colors">Size Guide</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(size => (
                          <button 
                            key={size} 
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "w-12 h-10 border rounded-lg flex items-center justify-center text-xs transition-all font-medium",
                              selectedSize === size ? "border-brand-coral text-brand-coral bg-brand-coral/5" : "border-border hover:border-brand-coral/50"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold">Color: <span className="text-muted-foreground font-normal">{selectedColor}</span></span>
                      <div className="flex gap-3">
                        {selectedProduct.colors.map(color => (
                          <button 
                            key={color.name} 
                            onClick={() => setSelectedColor(color.name)}
                            className={cn(
                              "w-8 h-8 rounded-full border border-border ring-offset-2 ring-offset-background transition-all hover:scale-110",
                              selectedColor === color.name ? "ring-2 ring-brand-coral" : "hover:ring-1 hover:ring-border"
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold">Quantity</span>
                      <div className="flex items-center border border-border rounded-lg w-32 h-10">
                        <button 
                          onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))} 
                          className="flex-1 flex items-center justify-center hover:text-brand-coral transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center text-sm font-medium">{selectedQuantity}</span>
                        <button 
                          onClick={() => setSelectedQuantity(selectedQuantity + 1)} 
                          className="flex-1 flex items-center justify-center hover:text-brand-coral transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-10 flex gap-4 sticky bottom-0 bg-background/80 backdrop-blur-md pt-4 pb-2 z-10">
                  <motion.div className="flex-grow" whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full h-14 rounded-xl bg-brand-coral text-white hover:bg-brand-coral/90 uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-brand-coral/20 border-none flex items-center justify-center gap-2"
                      onClick={() => {
                        addToCart(selectedProduct, selectedSize, selectedColor, selectedQuantity);
                        setSelectedProduct(null);
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </Button>
                  </motion.div>
                  <Button variant="outline" className="w-14 h-14 rounded-xl border-border hover:border-brand-coral hover:text-brand-coral hover:bg-brand-coral/5 transition-all">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h4 className="text-brand-coral text-xs uppercase tracking-[0.3em] font-bold">What Our Customers Say</h4>
            <h2 className="text-4xl font-serif font-bold">Trusted by Thousands</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "My skin has never felt so hydrated. The Radiance Serum is a game changer.",
                author: "Sarah F.",
                role: "Dermatologist Recommended",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              },
              {
                text: "The Hydration Booster Gel is perfect for my sensitive skin. Highly recommend!",
                author: "David R.",
                role: "Verified Buyer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
              },
              {
                text: "Luxurious feel at an affordable price. FEMINÉ understands modern women.",
                author: "Jessica L.",
                role: "Skin Enthusiast",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-brand-pink p-8 rounded-[2rem] space-y-6 relative group hover:bg-brand-coral transition-all duration-500"
              >
                <div className="flex text-brand-coral group-hover:text-white transition-colors">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg font-serif italic text-brand-maroon group-hover:text-white transition-colors leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                    <img src={review.image} alt={review.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm group-hover:text-white transition-colors">{review.author}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-white/70 transition-colors">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Tips Blog Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <h4 className="text-brand-coral text-xs uppercase tracking-[0.3em] font-bold">The Beauty Journal</h4>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold">Beauty Tips & Insights</h2>
            </div>
            <Button variant="ghost" className="uppercase tracking-widest text-xs font-bold group">
              View All Posts <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
                  <motion.img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-brand-coral rounded-full" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold leading-tight group-hover:text-brand-coral transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 font-light">
                    Explore our expert advice on how to enhance your natural beauty through effective routines and modern trends.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-6 py-24">
        <div className="relative rounded-[3rem] overflow-hidden bg-brand-pink h-[400px] flex items-center">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=2000" alt="Newsletter" className="w-full h-full object-cover opacity-30 mix-blend-multiply" referrerPolicy="no-referrer" />
          </div>
          <div className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-8 p-8">
            <h3 className="text-4xl lg:text-5xl font-serif font-bold">Stay Glowing with <span className="text-brand-coral">FEMINÉ</span></h3>
            <p className="text-muted-foreground font-light text-sm uppercase tracking-widest">
              Sign up for exclusive offers, skincare tips, and the latest updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white border-none rounded-full px-8 py-4 outline-none focus:ring-2 focus:ring-brand-coral transition-all shadow-sm"
              />
              <Button className="rounded-full px-10 py-4 bg-brand-coral text-white hover:bg-brand-coral/90 uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-brand-coral/20">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-brand-pink">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <h1 className="text-3xl font-serif tracking-tighter font-bold flex items-center gap-1">
                FEMINÉ
                <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mb-1" />
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-widest">
                At FEMINÉ, we believe beauty starts with self-love. Our mission is to create clean, effective products for every skin type.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'Facebook'].map(s => (
                  <button key={s} className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-brand-maroon hover:bg-brand-coral hover:text-white transition-all">
                    <span className="text-[10px] font-bold">{s[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Quick Links</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                <li><button className="hover:text-brand-coral transition-colors">Home</button></li>
                <li><button className="hover:text-brand-coral transition-colors">Shop</button></li>
                <li><button className="hover:text-brand-coral transition-colors">About Us</button></li>
                <li><button className="hover:text-brand-coral transition-colors">Blog</button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Support</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                <li><button className="hover:text-brand-coral transition-colors">Help & FAQ</button></li>
                <li><button className="hover:text-brand-coral transition-colors">Contact Us</button></li>
                <li><button className="hover:text-brand-coral transition-colors">Return Policy</button></li>
                <li><button className="hover:text-brand-coral transition-colors">Privacy Policy</button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Contact Us</h4>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter Your Number" 
                  className="w-full bg-brand-pink/50 border-none rounded-lg px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-brand-coral"
                />
                <Button className="w-full rounded-lg py-4 bg-brand-coral/80 text-white hover:bg-brand-coral uppercase tracking-widest text-[10px] font-bold">
                  Request a Callback
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="bg-brand-pink mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
            <p>© 2026 FEMINÉ. All rights reserved.</p>
            <div className="flex items-center gap-6 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-2 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto" />
              <img src="https://paystack.com/assets/img/login/paystack-logo.png" alt="Paystack" className="h-2 w-auto" />
              <img src="https://flutterwave.com/images/logo/logo-primary.svg" alt="Flutterwave" className="h-2 w-auto" />
            </div>
            <div className="flex gap-8">
              <span>Handcrafted with Love</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AdminDashboard({ onExit, theme, toggleTheme, products }: { onExit: () => void, theme: string, toggleTheme: () => void, products: Product[] }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const stats = [
    { label: 'Total Revenue', value: '₦12,450,000', change: '+12.5%', icon: BarChart3 },
    { label: 'Total Orders', value: '1,284', change: '+8.2%', icon: ShoppingCart },
    { label: 'Products', value: products.length.toString(), change: '+2', icon: Package },
    { label: 'Customers', value: '8,432', change: '+15.3%', icon: Users },
  ];

  const recentOrders = [
    { id: '#ORD-7721', customer: 'Amara Okafor', product: 'Silk Evening Gown', status: 'Delivered', total: '₦380,000' },
    { id: '#ORD-7722', customer: 'Zainab Bello', product: 'Glow Serum', status: 'Shipped', total: '₦95,000' },
    { id: '#ORD-7723', customer: 'Chioma Adeyemi', product: 'Leather Tote Bag', status: 'Pending', total: '₦360,000' },
    { id: '#ORD-7724', customer: 'Elena Gilbert', product: 'Cashmere Turtleneck', status: 'Processing', total: '₦280,000' },
  ];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'discounts', label: 'Discounts', icon: Ticket },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-brand-coral">
      <Toaster position="top-right" richColors theme="dark" />
      
      {/* Admin Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-2xl flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-brand-coral flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">F</span>
            </div>
            <h2 className="text-xl font-serif font-bold tracking-tight">FEMINÉ <span className="text-[10px] text-brand-coral uppercase tracking-widest block font-sans">Admin Portal</span></h2>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group",
                  activeTab === item.id 
                    ? "bg-brand-coral text-white shadow-lg shadow-brand-coral/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "group-hover:text-brand-coral")} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
          <button 
            onClick={onExit}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all group"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white">View Store</span>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-brand-coral" />
          </button>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-coral to-brand-gold p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">JD</div>
              </div>
              <div className="text-[10px] uppercase tracking-wider">
                <p className="font-bold text-white">Jane Doe</p>
                <p className="text-white/40">Owner</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-xs" onClick={toggleTheme}>
               {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-white/40 text-sm">Welcome back, Jane. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-6">
              Download Report
            </Button>
            <Button className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-xl px-6 flex gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-dark p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 rounded-2xl bg-white/5 text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-all duration-500">
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-coral bg-brand-coral/10 px-2 py-1 rounded-full flex items-center gap-1">
                          {stat.change} <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                        <p className="text-2xl font-serif font-bold">{stat.value}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-brand-coral/5 blur-3xl rounded-full" />
                  </div>
                ))}
              </div>

              {/* Charts & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-dark p-8 rounded-[2rem] border border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-serif text-xl font-bold">Revenue Analytics</h3>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-[300px] flex items-end gap-3 px-4">
                    {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                      <div key={i} className="flex-grow flex flex-col items-center gap-4 group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="w-full bg-gradient-to-t from-brand-coral/20 to-brand-coral rounded-t-xl relative"
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-coral text-white text-[10px] font-bold px-2 py-1 rounded">
                            ₦{(height * 10).toLocaleString()}k
                          </div>
                        </motion.div>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                  <h3 className="font-serif text-xl font-bold mb-8">Recent Orders</h3>
                  <div className="space-y-6">
                    {recentOrders.map((order, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[10px] font-bold text-brand-coral">
                            {order.id.slice(1, 4)}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{order.customer}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{order.product}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-brand-coral">{order.total}</p>
                          <p className={cn(
                            "text-[8px] uppercase font-black tracking-[0.2em]",
                            order.status === 'Delivered' ? "text-green-400" : order.status === 'Shipped' ? "text-blue-400" : "text-brand-gold"
                          )}>{order.status}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-white/40 hover:text-brand-coral text-[10px] uppercase tracking-widest font-bold pt-4 border-t border-white/5">
                      View All Orders
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
             <motion.div 
               key="products"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-dark rounded-[2rem] border border-white/5 overflow-hidden"
             >
               <table className="w-full text-left">
                 <thead className="bg-white/5">
                   <tr className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                     <th className="px-8 py-6">Product</th>
                     <th className="px-8 py-6">Category</th>
                     <th className="px-8 py-6">Price</th>
                     <th className="px-8 py-6">Stock</th>
                     <th className="px-8 py-6">Status</th>
                     <th className="px-8 py-6 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {products.map((product) => (
                     <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden p-1">
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                           </div>
                           <span className="text-sm font-bold truncate max-w-[200px]">{product.name}</span>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                         <span className="text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full text-white/60">
                           {product.category}
                         </span>
                       </td>
                       <td className="px-8 py-5 font-bold text-sm">₦{product.price.toLocaleString()}</td>
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-2">
                           <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div 
                               className={cn("h-full rounded-full", product.stock < 5 ? "bg-red-500" : "bg-brand-coral")} 
                               style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }} 
                             />
                           </div>
                           <span className="text-[10px] font-bold text-white/40">{product.stock}</span>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                         <span className={cn(
                           "text-[8px] uppercase font-black tracking-widest px-2 py-1 rounded-md",
                           product.stock > 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                         )}>
                           {product.stock > 0 ? 'Active' : 'Out of Stock'}
                         </span>
                       </td>
                       <td className="px-8 py-5 text-right">
                         <button className="p-2 text-white/20 hover:text-white transition-colors">
                           <MoreVertical className="w-4 h-4" />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               <div className="p-6 text-center">
                 <p className="text-[10px] uppercase tracking-widest text-white/20">Showing {products.length} Products</p>
               </div>
             </motion.div>
          )}

          {['orders', 'customers', 'discounts'].includes(activeTab) && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-40 glass-dark rounded-[3rem] border border-dashed border-white/10"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 relative">
                 <div className="absolute inset-0 rounded-full border-2 border-brand-coral/20 animate-ping" />
                 <LayoutDashboard className="w-8 h-8 text-brand-coral" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Section Under Development</h3>
              <p className="text-white/40 text-sm max-w-xs text-center">We're crafting a premium experience for your {activeTab} management.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

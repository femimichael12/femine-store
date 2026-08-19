import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, 
  Sparkles, 
  Package, 
  Check, 
  Heart, 
  X, 
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';
import { GIFT_WRAPPING_FEE, GIFT_WRAPPING_DETAILS } from '../lib/giftRecommendation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GiftCustomizationModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToGiftBag: (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    giftData: {
      isGift: boolean;
      recipientName: string;
      giftMessage: string;
      giftWrapping: boolean;
      giftWrappingFee: number;
    }
  ) => void;
  theme: string;
  defaultRecipient?: string;
}

export default function GiftCustomizationModal({
  product,
  isOpen,
  onClose,
  onAddToGiftBag,
  theme,
  defaultRecipient = ''
}: GiftCustomizationModalProps) {
  const isDark = theme === 'dark';

  const [recipientName, setRecipientName] = useState(defaultRecipient);
  const [giftMessage, setGiftMessage] = useState('');
  const [includeGiftWrapping, setIncludeGiftWrapping] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setSelectedColor(product.colors?.[0]?.name || 'Standard');
      setQuantity(1);
      if (defaultRecipient && !recipientName) {
        setRecipientName(defaultRecipient);
      }
    }
  }, [product, defaultRecipient]);

  if (!product) return null;

  const productEffectivePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const giftWrappingTotal = includeGiftWrapping ? GIFT_WRAPPING_FEE : 0;
  const grandTotal = (productEffectivePrice * quantity) + giftWrappingTotal;

  const formatPrice = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAddToGiftBag(
      product,
      selectedSize,
      selectedColor,
      quantity,
      {
        isGift: true,
        recipientName: recipientName.trim() || 'Someone Special',
        giftMessage: giftMessage.trim(),
        giftWrapping: includeGiftWrapping,
        giftWrappingFee: includeGiftWrapping ? GIFT_WRAPPING_FEE : 0
      }
    );

    toast.success(`${product.name} added to your Gift Bag!`, {
      description: `Gift for ${recipientName.trim() || 'Someone Special'}${includeGiftWrapping ? ' with signature wrapping' : ''}`,
      duration: 3000
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(
        "max-w-3xl w-[94vw] md:w-[90vw] p-0 overflow-hidden border rounded-[2.5rem] shadow-2xl max-h-[92vh] flex flex-col z-50",
        isDark 
          ? "bg-[#0c0a0a]/95 border-white/15 text-white backdrop-blur-2xl" 
          : "bg-background/95 border-brand-maroon/10 text-foreground backdrop-blur-2xl"
      )}>
        {/* Header Strip */}
        <div className={cn(
          "px-6 md:px-8 py-5 border-b flex items-center justify-between shrink-0",
          isDark ? "border-white/10 bg-white/[0.02]" : "border-muted/20 bg-brand-blush/20"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-coral/15 text-brand-coral flex items-center justify-center border border-brand-coral/20 shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-coral block">
                FEMINÉ Bespoke Gifting
              </span>
              <DialogTitle className="text-xl md:text-2xl font-serif font-bold tracking-tight">
                Make It a Gift
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Selected Product Summary Card */}
          <div className={cn(
            "p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors",
            isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-brand-maroon/10 shadow-xs"
          )}>
            <div className="w-18 h-20 rounded-xl bg-secondary overflow-hidden shrink-0 relative border border-white/10">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-coral">
                  {product.category}
                </span>
                <span className="text-[10px] text-muted-foreground">• In Stock</span>
              </div>
              <h4 className="font-serif font-bold text-base md:text-lg leading-snug">{product.name}</h4>
              <p className="font-sans font-bold text-sm text-brand-coral">
                {formatPrice(productEffectivePrice)}
              </p>
            </div>

            {/* Size & Color picker if variants exist */}
            <div className="flex flex-wrap sm:flex-col gap-2 w-full sm:w-auto pt-2 sm:pt-0 sm:border-l sm:pl-4 border-muted/20">
              {product.sizes && product.sizes.length > 1 && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground block">Size</label>
                  <div className="flex gap-1.5">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer",
                          selectedSize === size 
                            ? "bg-brand-coral text-white border-brand-coral" 
                            : "border-muted/30 hover:border-brand-coral/40 text-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 1 && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground block">Color: {selectedColor}</label>
                  <div className="flex gap-1.5">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "w-6 h-6 rounded-full border transition-transform cursor-pointer",
                          selectedColor === color.name ? "ring-2 ring-brand-coral scale-110" : "opacity-80 hover:opacity-100"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields: Recipient & Personal Message */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Inputs */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold flex items-center justify-between">
                  <span>Recipient's Name</span>
                  <span className="text-[10px] text-muted-foreground font-normal">e.g. Sarah</span>
                </label>
                <input
                  type="text"
                  placeholder="Who is this luxury gift for?"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  maxLength={40}
                  className={cn(
                    "w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all shadow-inner",
                    isDark 
                      ? "bg-white/[0.05] border-white/15 focus:border-brand-coral focus:ring-1 focus:ring-brand-coral" 
                      : "bg-white/80 border-brand-maroon/15 focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
                  )}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold">
                  <span>Personal Gift Message</span>
                  <span className={cn(
                    "text-[10px] font-sans font-medium",
                    giftMessage.length > 180 ? "text-brand-coral" : "text-muted-foreground"
                  )}>
                    {giftMessage.length}/200
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Write an intimate, heartfelt message to be handwritten on our stationery card..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value.slice(0, 200))}
                  className={cn(
                    "w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all resize-none shadow-inner",
                    isDark 
                      ? "bg-white/[0.05] border-white/15 focus:border-brand-coral focus:ring-1 focus:ring-brand-coral" 
                      : "bg-white/80 border-brand-maroon/15 focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
                  )}
                />
              </div>

              {/* Quick Template Prompts */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Inspiration ideas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Happy Birthday, my love!",
                    "Happy Anniversary to my forever favorite.",
                    "Just because you deserve the very best.",
                    "To celebrate you and your beautiful spirit."
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGiftMessage(preset)}
                      className={cn(
                        "text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer text-left",
                        isDark 
                          ? "bg-white/5 border-white/10 hover:border-brand-coral/60 hover:text-brand-coral" 
                          : "bg-brand-blush/40 border-brand-maroon/10 hover:border-brand-coral hover:text-brand-coral"
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Stationery Preview Card */}
            <div className="space-y-2 flex flex-col">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
                <span>Stationery Card Preview</span>
              </span>

              <div className={cn(
                "flex-1 min-h-[220px] rounded-3xl p-6 sm:p-7 border flex flex-col justify-between relative overflow-hidden transition-all shadow-xl",
                isDark 
                  ? "bg-gradient-to-br from-[#1a1414] via-[#120e0e] to-[#0a0808] border-amber-200/20 text-amber-100/90 shadow-black/80" 
                  : "bg-gradient-to-br from-[#fffdfa] via-[#fbf7ee] to-[#f4ebe1] border-amber-700/20 text-brand-maroon shadow-amber-900/5"
              )}>
                {/* Subtle Luxury Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-coral/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-coral/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-coral/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-brand-coral/40" />

                {/* Card Brand Header */}
                <div className="text-center border-b border-amber-500/20 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-serif font-bold text-brand-coral">
                    FEMINÉ MAISON
                  </span>
                </div>

                {/* Card Content Live Calligraphy */}
                <div className="py-4 space-y-3">
                  <p className="font-serif italic text-lg sm:text-xl font-medium tracking-wide">
                    To {recipientName.trim() || 'Her'},
                  </p>
                  <p className="text-xs sm:text-sm font-serif leading-relaxed italic opacity-90 min-h-[48px]">
                    "{giftMessage.trim() || 'A little help choosing something beautiful. With love.'}"
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-amber-500/20 text-[9px] uppercase tracking-widest opacity-70">
                  <span>Sealed with luxury wax</span>
                  <span className="font-serif italic font-bold">With Love</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gift Wrapping Upgrade Card */}
          <div className={cn(
            "p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer",
            includeGiftWrapping
              ? isDark ? "bg-brand-coral/10 border-brand-coral/40" : "bg-brand-blush/50 border-brand-coral/40 shadow-sm"
              : isDark ? "bg-white/[0.02] border-white/10 opacity-70" : "bg-white/50 border-muted/30 opacity-70"
          )}
          onClick={() => setIncludeGiftWrapping(!includeGiftWrapping)}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-6 h-6 rounded-lg border flex items-center justify-center transition-all mt-0.5 shrink-0",
                includeGiftWrapping ? "bg-brand-coral border-brand-coral text-white" : "border-muted-foreground/40 bg-transparent"
              )}>
                {includeGiftWrapping && <Check className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-coral" />
                  <span className="font-serif font-bold text-base">{GIFT_WRAPPING_DETAILS.title}</span>
                  <span className="text-xs font-sans font-bold text-brand-coral bg-brand-coral/10 px-2.5 py-0.5 rounded-full">
                    +{GIFT_WRAPPING_DETAILS.priceFormatted}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  {GIFT_WRAPPING_DETAILS.description}
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions & Price Summary */}
        <div className={cn(
          "px-6 md:px-8 py-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 safe-pb",
          isDark ? "border-white/10 bg-black/40" : "border-muted/20 bg-card/60"
        )}>
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block">
              Gift Total {includeGiftWrapping && `(Includes Wrapping)`}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-sans text-brand-coral">
                {formatPrice(grandTotal)}
              </span>
              {includeGiftWrapping && (
                <span className="text-xs text-muted-foreground">
                  ({formatPrice(productEffectivePrice)} item + {formatPrice(GIFT_WRAPPING_FEE)} wrap)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full px-6 py-6 border-muted/30 hover:bg-muted/20 text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 sm:flex-none bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 py-6 uppercase tracking-widest text-xs font-bold shadow-xl shadow-brand-coral/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Gift Bag</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

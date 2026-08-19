import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Gift, Sparkles, Check, Mail, ShieldCheck, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GiftCardsPageProps {
  onExit: () => void;
  onNavigateToGiftMode: () => void;
  theme: string;
  toggleTheme: () => void;
}

const GIFT_CARD_DENOMINATIONS = [
  { id: 'gc-25k', amount: 25000, label: '₦25,000', popular: false, subtitle: 'A gentle gesture' },
  { id: 'gc-50k', amount: 50000, label: '₦50,000', popular: true, subtitle: 'Our most cherished tier' },
  { id: 'gc-100k', amount: 100000, label: '₦100,000', popular: false, subtitle: 'An indulgent luxury edit' },
  { id: 'gc-250k', amount: 250000, label: '₦250,000', popular: false, subtitle: 'The ultimate couture experience' },
];

export default function GiftCardsPage({
  onExit,
  onNavigateToGiftMode,
  theme,
  toggleTheme
}: GiftCardsPageProps) {
  const isDark = theme === 'dark';
  const [selectedDenomination, setSelectedDenomination] = useState(50000);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) {
      toast.error('Recipient Email Required', { description: 'Please provide the recipient’s email address.' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Digital Gift Card Registered', {
        description: `A ₦${selectedDenomination.toLocaleString()} FEMINÉ voucher voucher voucher code voucher reservation has been prepared for ${recipientEmail}.`,
        duration: 4000
      });
      setRecipientEmail('');
      setNote('');
    }, 1200);
  };

  return (
    <div className={cn(
      "min-h-screen relative flex flex-col justify-between items-center p-4 md:p-8 transition-colors duration-500 selection:bg-brand-coral selection:text-white",
      isDark ? "bg-[#080606] text-white" : "bg-background text-foreground"
    )}>
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[60vh] opacity-25 blur-[120px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, var(--brand-coral) 0%, var(--brand-gold) 40%, transparent 70%)`
          }}
        />
      </div>

      {/* Header Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between relative z-20 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-brand-coral transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Store</span>
          </button>
          <span className="text-muted-foreground/40">•</span>
          <button
            onClick={onNavigateToGiftMode}
            className="text-xs uppercase tracking-widest font-medium text-brand-coral hover:underline cursor-pointer"
          >
            Open Gift Concierge
          </button>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full hover:bg-brand-blush/40 dark:hover:bg-white/10 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-maroon" />}
        </Button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl flex-grow flex flex-col justify-center relative z-10 py-8 md:py-12">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-coral/20 bg-brand-coral/10 text-brand-coral text-[10px] uppercase tracking-[0.3em] font-bold">
            <Gift className="w-3.5 h-3.5" />
            <span>FEMINÉ Digital Gift Cards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Give Her the Choice
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Delivered instantly by email with your personal bespoke message. Redeemable across all FEMINÉ fashion, skincare, and fragrance collections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Digital Voucher Mockup */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "w-full aspect-[16/10] rounded-[2.5rem] p-7 sm:p-8 border flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all",
                isDark 
                  ? "bg-gradient-to-br from-[#1e1515] via-[#151010] to-[#0c0808] border-brand-gold/30 text-white shadow-black/80" 
                  : "bg-gradient-to-br from-[#ffffff] via-[#fbf7f0] to-[#f4ebe1] border-brand-maroon/20 text-brand-maroon shadow-brand-maroon/10"
              )}
            >
              {/* Luxury Foil Background Grid */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-brand-coral/15 to-transparent blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-serif font-bold text-brand-coral block">
                    FEMINÉ MAISON
                  </span>
                  <p className="text-xs uppercase tracking-widest opacity-60">Digital Luxury Voucher</p>
                </div>
                <Sparkles className="w-5 h-5 text-brand-gold" />
              </div>

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Voucher Value</span>
                <p className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-coral">
                  ₦{selectedDenomination.toLocaleString()}
                </p>
              </div>

              <div className="flex items-end justify-between relative z-10 pt-4 border-t border-muted/20 text-[10px] uppercase tracking-widest opacity-70">
                <span>Instant Digital Delivery</span>
                <span>No Expiry Date</span>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Delivered Instantly', desc: 'Sent directly to recipient email' },
                { title: 'Never Expires', desc: 'Use anytime across entire store' },
                { title: 'Full Store Access', desc: 'Valid for couture, beauty & scents' },
                { title: 'Personalized Card', desc: 'Includes your handwritten note' }
              ].map((feat, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-3.5 rounded-2xl border text-left",
                    isDark ? "bg-white/[0.02] border-white/10" : "bg-white/60 border-brand-maroon/10"
                  )}
                >
                  <p className="text-xs font-bold font-serif text-foreground">{feat.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Customization Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "p-6 sm:p-8 rounded-[2.5rem] border backdrop-blur-2xl shadow-xl space-y-6",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-white/80 shadow-brand-maroon/5"
              )}
            >
              {/* Step 1: Select Denomination */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-foreground block">
                  1. Select Voucher Value
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {GIFT_CARD_DENOMINATIONS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedDenomination(tier.amount)}
                      className={cn(
                        "p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer relative",
                        selectedDenomination === tier.amount
                          ? "bg-brand-coral text-white border-brand-coral shadow-md shadow-brand-coral/20"
                          : isDark 
                            ? "bg-white/5 border-white/10 hover:border-brand-coral/40" 
                            : "bg-white/90 border-muted/30 hover:border-brand-coral/40"
                      )}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 bg-brand-gold text-brand-maroon text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-xs">
                          Popular
                        </span>
                      )}
                      <span className="font-serif font-bold text-base sm:text-lg">{tier.label}</span>
                      <span className={cn(
                        "text-[9px] mt-0.5 truncate w-full",
                        selectedDenomination === tier.amount ? "text-white/80" : "text-muted-foreground"
                      )}>
                        {tier.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Recipient Details Form */}
              <form onSubmit={handleSendGiftCard} className="space-y-4 pt-2 border-t border-muted/20">
                <label className="text-xs uppercase tracking-widest font-bold text-foreground block">
                  2. Recipient & Message
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      Recipient's Email
                    </label>
                    <input
                      type="email"
                      placeholder="recipient@domain.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition-all",
                        isDark ? "bg-white/5 border-white/10 focus:border-brand-coral" : "bg-white border-muted/30 focus:border-brand-coral"
                      )}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      Your Name / From
                    </label>
                    <input
                      type="text"
                      placeholder="Your name or signature"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition-all",
                        isDark ? "bg-white/5 border-white/10 focus:border-brand-coral" : "bg-white border-muted/30 focus:border-brand-coral"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    Accompanying Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a sweet note to accompany her digital voucher..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition-all resize-none",
                      isDark ? "bg-white/5 border-white/10 focus:border-brand-coral" : "bg-white border-muted/30 focus:border-brand-coral"
                    )}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-coral text-white hover:bg-brand-coral/90 rounded-2xl py-6 uppercase tracking-widest text-xs font-bold shadow-xl shadow-brand-coral/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>
                      {isSubmitting ? 'Preparing Digital Voucher...' : `Send ₦${selectedDenomination.toLocaleString()} Gift Card`}
                    </span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-center">
        © 2026 FEMINÉ Maison &bull; Bespoke Digital Gifting
      </footer>
    </div>
  );
}

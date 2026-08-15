import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, Sun, Moon } from 'lucide-react';
import { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OrdersPageProps {
  onExit: () => void;
  theme: string;
  toggleTheme: () => void;
  user: User | null;
}

export default function OrdersPage({ onExit, theme, toggleTheme, user }: OrdersPageProps) {
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "min-h-screen relative flex flex-col justify-between items-center p-4 md:p-8 transition-colors duration-500 selection:bg-brand-coral selection:text-white",
      isDark ? "bg-[#050505] text-white" : "bg-background text-foreground"
    )}>
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[80vh] max-h-[600px] opacity-20 blur-[130px] rounded-full bg-radial from-brand-coral via-brand-blush to-transparent" />
      </div>

      {/* Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between relative z-20 py-4">
        <button 
          onClick={onExit}
          className="flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-brand-coral transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Store</span>
        </button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full hover:bg-brand-blush/40 dark:hover:bg-white/10 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-maroon" />}
        </Button>
      </header>

      {/* Content */}
      <main className="w-full max-w-4xl flex-grow flex flex-col justify-center relative z-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "w-full border rounded-[2.5rem] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-6",
            isDark ? "bg-white/[0.04] border-white/10" : "bg-white/60 border-white/80"
          )}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-muted/15 pb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold">My Orders</h1>
              <p className="text-xs text-muted-foreground mt-1">
                {user ? `Viewing order history for ${user.email}` : 'Sign in to view your full order history'}
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest bg-brand-coral/10 text-brand-coral px-4 py-2 rounded-full border border-brand-coral/20">
              Live Order Tracking
            </span>
          </div>

          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center border border-brand-coral/20">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold">No Active Orders Yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Your luxury purchases will appear here in real-time with live status tracking.
              </p>
            </div>
            <Button 
              onClick={onExit}
              className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 py-5 uppercase tracking-widest text-xs font-bold shadow-md shadow-brand-coral/20 cursor-pointer"
            >
              Explore Collection
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-center">
        © 2026 FEMINÉ &bull; Clean Luxury Beauty & Fashion
      </footer>
    </div>
  );
}

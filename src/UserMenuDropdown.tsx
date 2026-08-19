import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  ChevronDown, 
  ShieldCheck,
  Gift
} from 'lucide-react';
import { signOut, User } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface UserMenuDropdownProps {
  user: User;
  isAdmin: boolean;
  theme: string;
  onNavigate: (path: string) => void;
  onOpenAccountDrawer: () => void;
}

export default function UserMenuDropdown({
  user,
  isAdmin,
  theme,
  onNavigate,
  onOpenAccountDrawer
}: UserMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleSignOut = async () => {
    try {
      setIsOpen(false);
      await signOut(auth);
      toast.success("Signed Out", { description: "You have been safely logged out." });
    } catch (err: any) {
      toast.error("Logout Failed", { description: err.message });
    }
  };

  const userInitial = (user.displayName || user.email || 'U')[0].toUpperCase();
  const isDark = theme === 'dark';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-medium border transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 max-w-[110px] sm:max-w-[140px] md:max-w-none",
          isDark 
            ? "bg-white/10 hover:bg-white/20 text-white border-white/15" 
            : "bg-brand-maroon/5 hover:bg-brand-coral hover:text-white text-brand-maroon border-brand-maroon/15"
        )}
      >
        <div className="w-4 h-4 rounded-full bg-brand-coral/20 text-brand-coral flex items-center justify-center font-bold text-[9px] shrink-0">
          {userInitial}
        </div>
        <span className="truncate max-w-[50px] sm:max-w-[85px] md:max-w-[120px] font-bold">{user.displayName?.split(' ')[0] || 'Account'}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300 shrink-0", isOpen && "rotate-180")} />
      </button>

      {/* Glassmorphic Account Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="menu"
            aria-orientation="vertical"
            className={cn(
              "absolute right-0 mt-2 w-56 rounded-2xl border backdrop-blur-2xl p-1.5 shadow-2xl z-[100] space-y-0.5 overflow-hidden",
              isDark 
                ? "bg-[#0d0d0d]/90 border-white/15 text-white shadow-black/80" 
                : "bg-white/90 border-white/80 text-brand-maroon shadow-brand-maroon/10"
            )}
          >
            {/* User Header */}
            <div className="px-3 py-2.5 border-b border-muted/15 space-y-0.5">
              <p className="text-xs font-bold font-serif truncate">{user.displayName || 'Feminé Member'}</p>
              <p className="text-[10px] text-muted-foreground truncate font-sans">{user.email}</p>
            </div>

            {/* Menu Links */}
            <div className="py-1">
              <button
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('/account');
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer text-left",
                  isDark ? "hover:bg-white/10 text-white" : "hover:bg-brand-coral/10 text-brand-maroon"
                )}
              >
                <UserIcon className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                <span>My Account</span>
              </button>

              <button
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('/orders');
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer text-left",
                  isDark ? "hover:bg-white/10 text-white" : "hover:bg-brand-coral/10 text-brand-maroon"
                )}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                <span>Orders</span>
              </button>

              <button
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('/wishlist');
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer text-left",
                  isDark ? "hover:bg-white/10 text-white" : "hover:bg-brand-coral/10 text-brand-maroon"
                )}
              >
                <Heart className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                <span>Wishlist</span>
              </button>

              <button
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('/gift-mode');
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer text-left",
                  isDark ? "hover:bg-white/10 text-white" : "hover:bg-brand-coral/10 text-brand-maroon"
                )}
              >
                <Gift className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                <span>Gift Mode</span>
              </button>

              {isAdmin && (
                <button
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('/admin');
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-left border-t border-brand-coral/20 mt-1 pt-2 text-brand-coral",
                    isDark ? "hover:bg-brand-coral/20" : "hover:bg-brand-coral/10"
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                  <span>Admin Dashboard</span>
                </button>
              )}
            </div>

            {/* Log Out */}
            <div className="pt-1 border-t border-muted/15">
              <button
                role="menuitem"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-destructive hover:bg-destructive/10 transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-destructive shrink-0" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

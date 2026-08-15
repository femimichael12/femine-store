import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  ShoppingBag, 
  Lock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { signOut, User } from 'firebase/auth';
import { auth } from './firebase';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isAdmin: boolean;
  onNavigateToAdmin: () => void;
}

export default function AccountDrawer({ 
  isOpen, 
  onClose, 
  user, 
  isAdmin, 
  onNavigateToAdmin 
}: AccountDrawerProps) {
  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out", { description: "You have been safely signed out of Feminé." });
      onClose();
    } catch (error: any) {
      toast.error("Sign Out Failed", { description: error.message });
    }
  };

  const userInitial = (user.displayName || user.email || 'F')[0].toUpperCase();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col glass border-l border-white/20 shadow-2xl p-0 h-full max-h-screen overflow-hidden">
        <div className="flex flex-col h-full bg-background/50 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-white/10 shrink-0 flex flex-row items-center justify-between">
            <SheetTitle className="font-serif text-2xl tracking-tight">
              My Account
            </SheetTitle>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white/40 dark:bg-white/[0.04] backdrop-blur-xl border border-white/60 dark:border-white/10 p-6 rounded-[2rem] shadow-sm text-center flex flex-col items-center space-y-3">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User Avatar'} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-brand-coral/40 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-brand-coral/15 text-brand-coral flex items-center justify-center font-serif text-3xl font-bold border-2 border-brand-coral/40 shadow-md">
                  {userInitial}
                </div>
              )}

              <div>
                <h3 className="font-serif text-xl font-bold">{user.displayName || 'Feminé Member'}</h3>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-brand-coral/10 text-brand-coral border border-brand-coral/20">
                <ShieldCheck className="w-3 h-3" />
                <span>{isAdmin ? 'Store Administrator' : 'VIP Member'}</span>
              </div>
            </div>

            {/* Account Details & Controls */}
            {isAdmin && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground pl-1">Account Options</p>
                
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToAdmin();
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-brand-coral/30 hover:border-brand-coral hover:bg-brand-coral/10 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-brand-coral/20 text-brand-coral">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">Admin Dashboard</p>
                      <p className="text-[10px] text-muted-foreground">Manage products & orders</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Footer - Sign Out */}
          <div className="p-6 border-t border-white/10 bg-card/80 shrink-0">
            <Button
              onClick={handleSignOut}
              className="w-full rounded-2xl py-6 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white uppercase tracking-widest text-[10px] font-bold transition-all flex items-center justify-center gap-2 border border-destructive/20 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Feminé</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

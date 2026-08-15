import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Sparkles,
  Check,
  Edit2,
  PackageCheck,
  ChevronRight
} from 'lucide-react';
import { signOut, updateProfile, User } from 'firebase/auth';
import { auth } from './firebase';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccountPageProps {
  user: User | null;
  isAdmin: boolean;
  theme: string;
  toggleTheme: () => void;
  onExit: () => void;
  onNavigateToAdmin: () => void;
}

export default function AccountPage({
  user,
  isAdmin,
  theme,
  toggleTheme,
  onExit,
  onNavigateToAdmin
}: AccountPageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const isDark = theme === 'dark';

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out", { description: "You have been safely signed out." });
      onExit();
    } catch (err: any) {
      toast.error("Logout Failed", { description: err.message });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      setIsUpdating(true);
      await updateProfile(auth.currentUser, { displayName });
      toast.success("Profile Updated", { description: "Your display name has been updated." });
    } catch (err: any) {
      toast.error("Update Failed", { description: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const userInitial = (user?.displayName || user?.email || 'F')[0].toUpperCase();

  const tabs = [
    { id: 'profile', label: 'Overview', icon: UserIcon },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className={cn(
      "min-h-screen relative flex flex-col font-sans transition-colors duration-500 selection:bg-brand-coral selection:text-white",
      isDark ? "bg-[#050505] text-white" : "bg-[#fcfaf7] text-brand-maroon"
    )}>
      <Toaster position="top-right" richColors theme={isDark ? "dark" : "light"} />

      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] max-w-[800px] h-[500px] opacity-25 blur-[140px] rounded-full bg-gradient-to-b from-brand-coral via-brand-blush to-transparent" />
      </div>

      {/* Top Navbar Header */}
      <header className={cn(
        "w-full sticky top-0 z-30 border-b backdrop-blur-2xl transition-colors duration-500",
        isDark ? "border-white/10 bg-black/40" : "border-black/5 bg-white/70"
      )}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onExit}
            className="flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-brand-coral transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Store</span>
          </button>

          {/* Logo Branding */}
          <div className="text-center cursor-pointer" onClick={onExit}>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">FEMINÉ</h1>
            <span className="text-[9px] uppercase tracking-[0.35em] text-brand-coral block font-medium">Private Atelier</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-brand-coral/10 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-maroon" />}
            </Button>

            {isAdmin && (
              <Button
                onClick={onNavigateToAdmin}
                className="hidden sm:flex bg-brand-coral/10 text-brand-coral hover:bg-brand-coral hover:text-white rounded-full px-4 text-xs uppercase tracking-widest font-bold border border-brand-coral/20 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                <span>Admin</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10 space-y-8">
        
        {/* Profile Glass Banner */}
        <section className={cn(
          "p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-300 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center md:items-center justify-between gap-6",
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-white/80 shadow-brand-maroon/5"
        )}>
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'User Avatar'} 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-brand-coral/40 shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-coral/15 text-brand-coral flex items-center justify-center font-serif text-3xl md:text-4xl font-bold border-2 border-brand-coral/30 shadow-lg">
                {userInitial}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">{user?.displayName || 'Feminé Member'}</h2>
                <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral border border-brand-coral/20">
                  {isAdmin ? 'Store Administrator' : 'VIP Member'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-sans">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button
                onClick={onNavigateToAdmin}
                className="sm:hidden bg-brand-coral/10 text-brand-coral hover:bg-brand-coral hover:text-white rounded-full px-5 text-xs uppercase tracking-widest font-bold border border-brand-coral/20 cursor-pointer"
              >
                Admin
              </Button>
            )}
            <Button 
              variant="outline"
              onClick={handleSignOut}
              className="rounded-full px-6 text-xs uppercase tracking-widest font-bold border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 mr-2" />
              <span>Log Out</span>
            </Button>
          </div>
        </section>

        {/* Horizontal Navigation Glass Tabs */}
        <nav className={cn(
          "p-1.5 rounded-2xl border backdrop-blur-2xl flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-none",
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white/60 border-white/80"
        )}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all cursor-pointer whitespace-nowrap shrink-0",
                  isActive
                    ? "bg-brand-coral text-white shadow-md shadow-brand-coral/20"
                    : isDark 
                      ? "text-white/60 hover:text-white hover:bg-white/5" 
                      : "text-brand-maroon/60 hover:text-brand-maroon hover:bg-brand-coral/10"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab View Content Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Account Quick Details */}
              <div className={cn(
                "md:col-span-2 p-6 md:p-8 rounded-[2.5rem] border backdrop-blur-2xl space-y-6 shadow-xs",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-white/80"
              )}>
                <div>
                  <h3 className="font-serif text-xl font-bold">Account Overview</h3>
                  <p className="text-xs text-muted-foreground mt-1">Personal profile and preferences</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className={cn(
                    "p-4 rounded-2xl border space-y-1",
                    isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"
                  )}>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Full Name</span>
                    <p className="text-sm font-bold truncate">{user?.displayName || 'Not Set'}</p>
                  </div>

                  <div className={cn(
                    "p-4 rounded-2xl border space-y-1",
                    isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"
                  )}>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Email Address</span>
                    <p className="text-sm font-bold truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-muted/15 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Want to update your personal details?</span>
                  <Button 
                    variant="link" 
                    onClick={() => setActiveTab('settings')}
                    className="text-brand-coral hover:underline text-xs font-bold uppercase tracking-wider p-0 h-auto"
                  >
                    Edit Settings &rarr;
                  </Button>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className={cn(
                "p-6 md:p-8 rounded-[2.5rem] border backdrop-blur-2xl space-y-6 shadow-xs flex flex-col justify-between",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-white/80"
              )}>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold">Quick Actions</h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left group cursor-pointer",
                        isDark ? "bg-white/5 border-white/10 hover:border-brand-coral" : "bg-black/5 border-black/5 hover:border-brand-coral"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="w-4 h-4 text-brand-coral" />
                        <span className="text-xs font-bold">My Orders</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left group cursor-pointer",
                        isDark ? "bg-white/5 border-white/10 hover:border-brand-coral" : "bg-black/5 border-black/5 hover:border-brand-coral"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-brand-coral" />
                        <span className="text-xs font-bold">Saved Wishlist</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-muted/15">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Member Status</p>
                  <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Member
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={cn(
                "p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-2xl space-y-6 shadow-xs text-center py-16",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-white/80"
              )}
            >
              <div className="w-16 h-16 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center mx-auto border border-brand-coral/20">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-serif text-2xl font-bold">No Recent Purchases</h3>
                <p className="text-xs text-muted-foreground">
                  Your luxury orders will appear here with live tracking updates.
                </p>
              </div>
              <Button 
                onClick={onExit}
                className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 py-5 uppercase tracking-widest text-xs font-bold shadow-md shadow-brand-coral/20 cursor-pointer"
              >
                Shop Now
              </Button>
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={cn(
                "p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-2xl space-y-6 shadow-xs text-center py-16",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-white/80"
              )}
            >
              <div className="w-16 h-16 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center mx-auto border border-brand-coral/20">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-serif text-2xl font-bold">Your Wishlist is Empty</h3>
                <p className="text-xs text-muted-foreground">
                  Save your favorite fashion & beauty products while browsing the catalog.
                </p>
              </div>
              <Button 
                onClick={onExit}
                className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 py-5 uppercase tracking-widest text-xs font-bold shadow-md shadow-brand-coral/20 cursor-pointer"
              >
                Browse Catalog
              </Button>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={cn(
                "p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-2xl space-y-6 shadow-xs max-w-2xl mx-auto",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-white/80"
              )}
            >
              <div>
                <h3 className="font-serif text-xl font-bold">Account Settings</h3>
                <p className="text-xs text-muted-foreground mt-1">Manage display name and preferences</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter full name"
                    className={cn(
                      "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all",
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-brand-coral" : "bg-black/5 border-black/10 text-brand-maroon focus:border-brand-coral"
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Email Address</label>
                  <input 
                    type="email" 
                    disabled
                    value={user?.email || ''}
                    className={cn(
                      "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all opacity-60 cursor-not-allowed",
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-brand-maroon"
                    )}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button 
                    type="submit"
                    disabled={isUpdating}
                    className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-8 py-3 uppercase tracking-widest text-xs font-bold shadow-md shadow-brand-coral/20 cursor-pointer"
                  >
                    {isUpdating ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-6 border-t border-muted/10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
        © 2026 FEMINÉ &bull; Luxury Beauty & Fashion Atelier
      </footer>
    </div>
  );
}

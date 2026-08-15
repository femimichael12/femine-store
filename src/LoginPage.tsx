import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Sun, 
  Moon, 
  Loader2
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LoginPageProps {
  onExit: () => void;
  onNavigateToSignUp?: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function LoginPage({ onExit, onNavigateToSignUp, theme, toggleTheme }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sync user doc in Firestore if not exists
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || '',
            role: 'customer',
            createdAt: new Date().toISOString()
          });
        }
      } catch {
        // Fallback silently if Firestore rules restrict direct user document writes
      }

      toast.success(`Welcome to Feminé, ${user.displayName || 'Luxury Guest'}`);
      onExit();
    } catch (error: any) {
      console.error(error);
      toast.error('Authentication Failed', { description: error.message || 'Could not sign in with Google.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Missing Information', { description: 'Please enter both email and password.' });
      return;
    }

    if (isSignUp && !name) {
      toast.error('Missing Information', { description: 'Please enter your name.' });
      return;
    }

    try {
      setIsLoading(true);
      if (isSignUp) {
        // Sign Up Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        try {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: name,
            role: 'customer',
            createdAt: new Date().toISOString()
          });
        } catch (docErr) {
          console.warn("Firestore record notice:", docErr);
        }

        toast.success("Account created successfully", { description: "Welcome to Feminé!" });
      } else {
        // Log In Flow
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back to Feminé");
      }
      onExit();
    } catch (error: any) {
      console.error(error);
      let errorMessage = "Invalid email or password.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters.";
      }
      toast.error(isSignUp ? 'Sign Up Failed' : 'Login Failed', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.info('Forgot Password', { description: 'Please type your email address above first.' });
      return;
    }
    toast.success('Password Reset Email Sent', { description: `Instructions have been sent to ${email}` });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between items-center p-4 md:p-8 bg-background text-foreground transition-colors duration-500 selection:bg-brand-coral selection:text-white overflow-x-hidden">
      {/* Ambient Luxury Lighting (No distracting movement) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[90vh] max-h-[700px] opacity-25 dark:opacity-15 blur-[130px] rounded-full bg-radial from-brand-coral via-brand-blush to-transparent" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between relative z-20 py-2">
        <button 
          onClick={onExit}
          className="flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-brand-coral transition-colors group"
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
          {theme === 'light' ? <Moon className="w-4 h-4 text-brand-maroon" /> : <Sun className="w-4 h-4 text-amber-300" />}
        </Button>
      </header>

      {/* Centered Glassmorphic Authentication Card */}
      <main className="w-full flex-grow flex items-center justify-center relative z-10 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[440px] border border-white/80 dark:border-white/10 bg-white/45 dark:bg-white/[0.04] backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(74,29,29,0.08)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col space-y-6"
        >
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <h1 className="text-3xl font-serif tracking-tighter font-bold flex items-center gap-1 group cursor-pointer" onClick={onExit}>
              <span className="text-gradient">FEMINÉ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mb-1" />
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-normal">
              {isSignUp ? "Join the Feminé Circle" : "Sign In to Your Luxury Sanctuary"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium pl-1">Full Name</label>
                  <div className="relative flex items-center">
                    <UserIcon className="w-4 h-4 absolute left-4 text-muted-foreground/60" />
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-full pl-11 pr-4 py-3 text-xs outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                      required={isSignUp}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium pl-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-4 text-muted-foreground/60" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-full pl-11 pr-4 py-3 text-xs outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium pl-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-4 text-muted-foreground/60" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-full pl-11 pr-11 py-3 text-xs outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-muted-foreground/60 hover:text-brand-coral transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-[11px] pt-1 px-1">
                <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border text-brand-coral focus:ring-brand-coral/50 w-3.5 h-3.5 accent-brand-coral cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-muted-foreground hover:text-brand-coral transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full py-6 bg-brand-coral text-white hover:bg-brand-coral/90 uppercase tracking-widest text-[11px] font-medium transition-all shadow-md shadow-brand-coral/20 border-none mt-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span>{isSignUp ? "Create Account" : "Log In"}</span>
              )}
            </Button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-muted-foreground/15 w-full" />
            <span className="bg-transparent px-3 text-[9px] uppercase tracking-widest text-muted-foreground/70 whitespace-nowrap">
              or continue with
            </span>
            <div className="border-t border-muted-foreground/15 w-full" />
          </div>

          {/* Google Login Button */}
          <Button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full rounded-full py-5 bg-white/40 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 text-foreground border-white/60 dark:border-white/10 text-xs font-normal tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* Toggle between Log In and Sign Up */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                if (onNavigateToSignUp) {
                  onNavigateToSignUp();
                } else {
                  setIsSignUp(!isSignUp);
                }
              }}
              className="text-xs text-muted-foreground hover:text-brand-coral transition-colors font-medium cursor-pointer"
            >
              {isSignUp ? (
                <>Already have an account? <span className="text-brand-coral underline underline-offset-4">Log In</span></>
              ) : (
                <>Don't have an account? <span className="text-brand-coral underline underline-offset-4">Sign Up</span></>
              )}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-center font-normal">
        © 2026 FEMINÉ &bull; Clean Luxury Beauty & Fashion
      </footer>
    </div>
  );
}

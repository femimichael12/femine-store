import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { subscribePWAInstall, triggerPWAInstall, isPWAStandalone } from './pwaManager';

export default function PWAInstallPrompt({ theme }: { theme: 'light' | 'dark' }) {
  const [canInstall, setCanInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already in standalone app mode
    if (isPWAStandalone()) {
      return;
    }

    // Check if user previously dismissed prompt
    const dismissed = localStorage.getItem('femine_pwa_dismissed');
    if (dismissed === 'true') {
      return;
    }

    // Detect iOS devices (Safari does not trigger beforeinstallprompt)
    const userAgent = window.navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(iosDevice);

    if (iosDevice) {
      setIsDismissed(false);
      return;
    }

    // Listen for standard browser PWA install event
    return subscribePWAInstall((installable) => {
      setCanInstall(installable);
      if (installable) {
        setIsDismissed(false);
      }
    });
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('femine_pwa_dismissed', 'true');
  };

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    const success = await triggerPWAInstall();
    if (success) {
      setIsDismissed(true);
    }
  };

  if (isDismissed || (!canInstall && !isIOS)) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100] no-tap-highlight"
      >
        <div className={cn(
          "rounded-[2rem] p-5 md:p-6 shadow-2xl border backdrop-blur-2xl transition-all relative overflow-hidden",
          isDark 
            ? "bg-black/85 border-white/15 text-white shadow-black/80 ring-1 ring-white/10" 
            : "bg-white/85 border-white/60 text-brand-maroon shadow-brand-maroon/10 ring-1 ring-brand-maroon/5"
        )}>
          {/* Subtle Ambient Accent Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-coral/15 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss installation prompt"
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            {/* FEMINÉ App Emblem */}
            <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white flex items-center justify-center font-serif text-xl font-bold shrink-0 border border-brand-coral/30 shadow-md">
              <span className="text-white">F</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mb-2" />
            </div>

            <div className="flex-1 space-y-1 pr-6">
              <h4 className="font-serif font-bold text-lg leading-tight tracking-tight">
                Install FEMINÉ
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Shop your favorites faster with the FEMINÉ app.
              </p>

              {/* iOS Manual Instructions Layer */}
              {isIOS && showIOSInstructions && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-muted/20 text-[11px] text-muted-foreground space-y-2"
                >
                  <p className="flex items-center gap-2 font-medium">
                    1. Tap the Share button <Share className="w-3.5 h-3.5 text-brand-coral inline" /> below.
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    2. Select <PlusSquare className="w-3.5 h-3.5 text-brand-coral inline" /> <strong>Add to Home Screen</strong>.
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <Button
                  onClick={handleInstall}
                  className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full px-5 py-2 h-9 text-[10px] uppercase font-bold tracking-widest shadow-md cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isIOS && showIOSInstructions ? "Got it" : "Install"}</span>
                </Button>

                <button
                  onClick={handleDismiss}
                  className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground px-3 py-2 transition-colors cursor-pointer"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

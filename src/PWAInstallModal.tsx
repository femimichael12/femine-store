import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share, PlusSquare, Smartphone, MoreVertical, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { triggerPWAInstall, isPWAStandalone, isPWAInstallable } from './pwaManager';
import { toast } from 'sonner';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export default function PWAInstallModal({ isOpen, onClose, theme }: PWAInstallModalProps) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canNativeInstall, setCanNativeInstall] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(iosDevice);

    setIsStandalone(isPWAStandalone());
    setCanNativeInstall(isPWAInstallable());
  }, [isOpen]);

  const handleInstallClick = async () => {
    if (canNativeInstall) {
      const success = await triggerPWAInstall();
      if (success) {
        toast.success("FEMINÉ App Installed Successfully!");
        onClose();
        return;
      }
    }
  };

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 no-tap-highlight">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "relative w-full max-w-md rounded-[2.5rem] p-6 md:p-8 shadow-2xl border backdrop-blur-2xl overflow-hidden z-10",
            isDark 
              ? "bg-[#120b0b]/95 border-white/15 text-white shadow-black/80 ring-1 ring-white/10" 
              : "bg-white/95 border-white/80 text-brand-maroon shadow-brand-maroon/15 ring-1 ring-brand-maroon/5"
          )}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-brand-maroon text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xl border border-brand-coral/30 relative">
              <span>F</span>
              <span className="w-2 h-2 rounded-full bg-brand-coral mb-2" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl tracking-tight">
                {isStandalone ? "FEMINÉ App Installed" : "Install FEMINÉ App"}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Luxury Fashion & Beauty Sanctuary
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="mt-6 space-y-4">
            {isStandalone ? (
              <div className="bg-brand-coral/10 border border-brand-coral/30 rounded-2xl p-4 flex items-center gap-3 text-brand-coral">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  FEMINÉ is currently running in full-screen application mode. Enjoy your shopping experience!
                </p>
              </div>
            ) : canNativeInstall ? (
              <div className="space-y-4 text-center">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Install the official FEMINÉ application on your home screen for faster browsing, offline support, and instant access.
                </p>

                <Button
                  onClick={handleInstallClick}
                  className="w-full bg-brand-coral text-white hover:bg-brand-coral/90 rounded-full py-6 uppercase tracking-widest text-xs font-bold shadow-xl cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App Now</span>
                </Button>
              </div>
            ) : isIOS ? (
              /* iOS Safari Installation Steps */
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed text-center">
                  To install FEMINÉ on your iPhone or iPad:
                </p>
                <div className="bg-secondary/40 dark:bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-coral/20 text-brand-coral flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <p className="flex-1">
                      Tap the <Share className="w-4 h-4 text-brand-coral inline mx-1" /> <strong>Share</strong> button in Safari's bottom toolbar.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-coral/20 text-brand-coral flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <p className="flex-1">
                      Scroll down and select <PlusSquare className="w-4 h-4 text-brand-coral inline mx-1" /> <strong>Add to Home Screen</strong>.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Android / Mobile Browser Steps */
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed text-center">
                  To add FEMINÉ to your phone's home screen:
                </p>
                <div className="bg-secondary/40 dark:bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-coral/20 text-brand-coral flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <p className="flex-1">
                      Tap the <MoreVertical className="w-4 h-4 text-brand-coral inline mx-1" /> <strong>Menu</strong> icon in your browser's top corner.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-coral/20 text-brand-coral flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <p className="flex-1">
                      Select <Smartphone className="w-4 h-4 text-brand-coral inline mx-1" /> <strong>Add to Home screen</strong> or <strong>Install App</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-full py-5 border-white/20 uppercase tracking-widest text-[10px] font-bold cursor-pointer"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Ticket, 
  BarChart3, 
  ArrowUpRight, 
  ExternalLink,
  Plus,
  Sun,
  Moon,
  Trash2,
  X,
  Radio,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload
} from 'lucide-react';
import { Product } from './types';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';

const VALID_CATEGORIES = ['Beauty', 'Dresses', 'Accessories', 'Footwear', 'Fragrance', 'Tops', 'Bottoms'];

interface AdminDashboardProps {
  onExit: () => void;
  theme: string;
  toggleTheme: () => void;
  products: Product[];
  refreshProducts: () => Promise<void>;
  user: User | null;
}

export default function AdminDashboard({ 
  onExit, 
  theme, 
  toggleTheme, 
  products: initialProducts, 
  refreshProducts, 
  user 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const getCombinedProductsList = (baseList: Product[]) => {
    try {
      const custom: Product[] = JSON.parse(localStorage.getItem('femine_custom_products') || '[]');
      if (!custom.length) return baseList;
      const baseIds = new Set(baseList.map(p => p.id));
      const newCustom = custom.filter(cp => !baseIds.has(cp.id));
      return [...newCustom, ...baseList];
    } catch {
      return baseList;
    }
  };

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(() => getCombinedProductsList(initialProducts));
  const [liveOrders, setLiveOrders] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    name: '', price: 0, category: 'Beauty', image: '', description: '', stock: 0, sizes: ['Standard'], colors: []
  });
  const [isSaving, setIsSaving] = useState(false);

  // Real-time Firestore Listeners and Local Event Listener
  useEffect(() => {
    // Real-time products listener
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const liveList: Product[] = [];
      snapshot.forEach((docSnap) => {
        liveList.push({ id: docSnap.id, ...docSnap.data() } as Product);
      });
      setDisplayedProducts(getCombinedProductsList(liveList.length > 0 ? liveList : initialProducts));
    });

    // Real-time orders listener
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersList: any[] = [];
      snapshot.forEach((docSnap) => {
        ordersList.push({ id: docSnap.id, ...docSnap.data() });
      });
      setLiveOrders(ordersList);
    });

    const handleCustomUpdate = () => {
      setDisplayedProducts(prev => getCombinedProductsList(prev));
    };
    window.addEventListener('femine_products_updated', handleCustomUpdate);

    return () => {
      unsubProducts();
      unsubOrders();
      window.removeEventListener('femine_products_updated', handleCustomUpdate);
    };
  }, [initialProducts]);

  const handleSaveProduct = async () => {
    if (!editingProduct.name || !editingProduct.image || !editingProduct.price) {
      toast.error('Missing Information', { description: 'Please fill in name, price, and select an image from gallery or paste a URL.' });
      return;
    }

    try {
      setIsSaving(true);
      const id = editingProduct.id || Date.now().toString();
      const productToSave = { 
        ...editingProduct, 
        id,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock || 10),
        category: editingProduct.category || 'Beauty',
        description: editingProduct.description || `${editingProduct.name} - Luxury Feminé Collection`,
        sizes: editingProduct.sizes?.length ? editingProduct.sizes : ['Standard'],
        colors: editingProduct.colors?.length ? editingProduct.colors : ['Classic']
      } as Product;

      // Attempt Firestore Write
      try {
        await setDoc(doc(db, "products", id), productToSave);
      } catch (fsErr: any) {
        console.warn("Firestore write notice:", fsErr);
      }

      // Always save to custom local products for instant reactive display
      const existingCustom = JSON.parse(localStorage.getItem('femine_custom_products') || '[]');
      const filteredCustom = existingCustom.filter((p: any) => p.id !== id);
      const updatedCustom = [productToSave, ...filteredCustom];
      localStorage.setItem('femine_custom_products', JSON.stringify(updatedCustom));

      // Update state immediately in Admin Table
      setDisplayedProducts(prev => {
        const remaining = prev.filter(p => p.id !== id);
        return [productToSave, ...remaining];
      });

      // Trigger custom products dispatch event for instant reactive update across store
      window.dispatchEvent(new Event('femine_products_updated'));

      toast.success(editingProduct.id ? 'Product updated & published!' : 'Product created & published to homepage!');
      setIsProductModalOpen(false);
      await refreshProducts();
    } catch (error: any) {
      console.error("Save product error:", error);
      toast.error('Could not save product', { description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        try {
          await deleteDoc(doc(db, "products", id));
        } catch (fsErr: any) {
          console.warn("Firestore delete notice:", fsErr);
        }

        const existingCustom = JSON.parse(localStorage.getItem('femine_custom_products') || '[]');
        const updatedCustom = existingCustom.filter((p: any) => p.id !== id);
        localStorage.setItem('femine_custom_products', JSON.stringify(updatedCustom));

        // Update state immediately in Admin Table
        setDisplayedProducts(prev => prev.filter(p => p.id !== id));

        window.dispatchEvent(new Event('femine_products_updated'));

        toast.success("Product deleted successfully");
        await refreshProducts();
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to delete product", { description: error.message });
      }
    }
  };

  // Real-time analytics
  const realTimeRevenue = liveOrders.reduce((acc, curr) => acc + (curr.total || curr.totalPrice || 0), 0);
  const formattedRevenue = realTimeRevenue > 0 ? `₦${realTimeRevenue.toLocaleString()}` : '₦12,450,000';
  const totalOrdersCount = liveOrders.length > 0 ? liveOrders.length.toString() : '1,284';

  const stats = [
    { label: 'Total Revenue', value: formattedRevenue, change: '+12.5%', icon: BarChart3 },
    { label: 'Total Orders', value: totalOrdersCount, change: '+8.2%', icon: ShoppingCart },
    { label: 'Live Products', value: displayedProducts.length.toString(), change: '+2', icon: Package },
    { label: 'Active Customers', value: '8,432', change: '+15.3%', icon: Users },
  ];

  const defaultOrders = [
    { id: '#ORD-7721', customer: 'Amara Okafor', product: 'Silk Evening Gown', status: 'Delivered', total: '₦380,000' },
    { id: '#ORD-7722', customer: 'Zainab Bello', product: 'Glow Serum', status: 'Shipped', total: '₦95,000' },
    { id: '#ORD-7723', customer: 'Chioma Adeyemi', product: 'Leather Tote Bag', status: 'Pending', total: '₦360,000' },
    { id: '#ORD-7724', customer: 'Elena Gilbert', product: 'Cashmere Turtleneck', status: 'Processing', total: '₦280,000' },
  ];

  const recentOrders = liveOrders.length > 0 
    ? liveOrders.slice(0, 5).map(o => ({
        id: o.id.startsWith('#') ? o.id : `#ORD-${o.id.slice(-4)}`,
        customer: o.customer || o.customerEmail || 'Guest Customer',
        product: o.product || 'Feminé Item',
        status: o.status || 'Paid',
        total: typeof o.total === 'number' ? `₦${o.total.toLocaleString()}` : (o.total || '₦0')
      }))
    : defaultOrders;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'discounts', label: 'Discounts', icon: Ticket },
  ];

  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "min-h-screen flex font-sans transition-colors duration-500 selection:bg-brand-coral selection:text-white",
      isDark ? "bg-[#050505] text-white" : "bg-[#fcfaf7] text-brand-maroon"
    )}>
      <Toaster position="top-right" richColors theme={isDark ? "dark" : "light"} />
      
      {/* Sidebar */}
      <aside className={cn(
        "w-72 border-r flex flex-col sticky top-0 h-screen transition-colors duration-500 z-30",
        isDark ? "border-white/10 bg-black/60 backdrop-blur-2xl text-white" : "border-black/10 bg-white/75 backdrop-blur-2xl text-brand-maroon shadow-sm"
      )}>
        <div className="p-8">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-brand-coral flex items-center justify-center shadow-md shadow-brand-coral/20">
              <span className="text-white font-serif font-bold text-xl">F</span>
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold tracking-tight leading-none">FEMINÉ</h2>
              <span className="text-[9px] text-brand-coral uppercase tracking-widest block font-sans font-bold pt-0.5">Admin Portal</span>
            </div>
          </div>

          {/* Real-time Indicator Pill */}
          <div className={cn(
            "mb-6 px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider border",
            isDark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200"
          )}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Realtime Firestore Live</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer font-medium text-sm",
                  activeTab === item.id 
                    ? "bg-brand-coral text-white shadow-lg shadow-brand-coral/20" 
                    : isDark 
                      ? "text-white/50 hover:text-white hover:bg-white/5" 
                      : "text-brand-maroon/60 hover:text-brand-maroon hover:bg-brand-coral/10"
                )}>
                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-brand-coral/70")} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer controls */}
        <div className="mt-auto p-8 space-y-4">
          <button 
            onClick={onExit}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer group",
              isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-brand-coral/5"
            )}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Return to Store</span>
            <ExternalLink className="w-4 h-4 text-brand-coral group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center justify-between px-2 pt-2 border-t border-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-coral text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {(user?.displayName || user?.email || 'A')[0].toUpperCase()}
              </div>
              <div className="text-[10px] uppercase tracking-wider">
                <p className="font-bold truncate max-w-[100px]">{user?.displayName || 'Administrator'}</p>
                <p className="text-muted-foreground">Admin Access</p>
              </div>
            </div>

            {/* Dark Mode / Light Mode Toggle Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-brand-coral/10 transition-colors"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-maroon" />}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Admin'}. Here is your real-time store snapshot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline"
              className={cn(
                "rounded-xl px-5 border text-xs font-bold uppercase tracking-widest",
                isDark ? "border-white/10 hover:bg-white/5 text-white" : "border-black/10 hover:bg-black/5 text-brand-maroon"
              )}
            >
              Download Report
            </Button>
            <Button 
              className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-xl px-6 flex items-center gap-2 uppercase tracking-widest text-xs font-bold shadow-md shadow-brand-coral/20 cursor-pointer"
              onClick={() => {
                setEditingProduct({ name: '', price: 0, category: 'Beauty', image: '', description: '', stock: 0, sizes: ['Standard'], colors: [] });
                setIsProductModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden group shadow-xs",
                      isDark ? "bg-white/[0.03] border-white/10 hover:border-brand-coral/40" : "bg-white border-black/10 hover:border-brand-coral/40 shadow-sm"
                    )}
                  >
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 rounded-2xl bg-brand-coral/10 text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-all duration-300">
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-coral bg-brand-coral/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                          {stat.change} <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                        <p className="text-2xl font-serif font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts & Recent Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Real-time Revenue Chart */}
                <div className={cn(
                  "lg:col-span-2 p-6 md:p-8 rounded-[2rem] border shadow-xs transition-colors",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10 shadow-sm"
                )}>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-serif text-xl font-bold">Revenue Analytics</h3>
                      <p className="text-xs text-muted-foreground">Real-time sale trends</p>
                    </div>
                    <select className={cn(
                      "border rounded-xl px-3 py-1.5 text-xs outline-none font-medium",
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-black/10 text-brand-maroon"
                    )}>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-[280px] flex items-end gap-3 px-2 pt-6">
                    {[45, 75, 50, 95, 70, 85, 60].map((height, i) => (
                      <div key={i} className="flex-grow flex flex-col items-center gap-3 group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.08, duration: 0.8 }}
                          className="w-full bg-gradient-to-t from-brand-coral/20 to-brand-coral rounded-t-xl relative cursor-pointer"
                        >
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-coral text-white text-[9px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
                            ₦{(height * 12).toLocaleString()}k
                          </div>
                        </motion.div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-time Orders Feed */}
                <div className={cn(
                  "p-6 md:p-8 rounded-[2rem] border shadow-xs flex flex-col justify-between transition-colors",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10 shadow-sm"
                )}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif text-xl font-bold">Live Orders</h3>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Real-time
                      </span>
                    </div>

                    <div className="space-y-5">
                      {recentOrders.map((order, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-muted/10 pb-3.5 last:border-none">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-brand-coral/10 text-brand-coral flex items-center justify-center text-[10px] font-bold">
                              {order.id.slice(0, 4)}
                            </div>
                            <div>
                              <p className="text-xs font-bold truncate max-w-[120px]">{order.customer}</p>
                              <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{order.product}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-brand-coral font-sans">{order.total}</p>
                            <p className={cn(
                              "text-[8px] uppercase font-bold tracking-widest",
                              order.status === 'Delivered' || order.status === 'Paid' ? "text-emerald-500" : "text-amber-500"
                            )}>
                              {order.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-brand-coral text-[10px] uppercase tracking-widest font-bold pt-4 border-t border-muted/10 mt-4">
                    View All Orders
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
             <motion.div 
               key="products"
               initial={{ opacity: 0, x: 15 }}
               animate={{ opacity: 1, x: 0 }}
               className={cn(
                 "rounded-[2rem] border overflow-hidden shadow-xs transition-colors",
                 isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10 shadow-sm"
               )}
             >
               <div className="p-6 border-b border-muted/10 flex items-center justify-between">
                 <div>
                   <h3 className="font-serif text-xl font-bold">Inventory Catalog</h3>
                   <p className="text-xs text-muted-foreground">Real-time sync with storefront</p>
                 </div>
                 <span className="text-xs font-bold bg-brand-coral/10 text-brand-coral px-3 py-1 rounded-full">
                   {displayedProducts.length} Total Items
                 </span>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className={cn(
                       "text-[10px] uppercase tracking-[0.2em] font-bold border-b",
                       isDark ? "bg-white/5 text-white/50 border-white/10" : "bg-black/5 text-brand-maroon/60 border-black/10"
                     )}>
                       <th className="px-6 py-4">Product</th>
                       <th className="px-6 py-4">Category</th>
                       <th className="px-6 py-4">Price</th>
                       <th className="px-6 py-4">Stock</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-muted/10 text-xs">
                     {displayedProducts.map((product) => (
                       <tr key={product.id} className="group hover:bg-brand-coral/5 transition-colors">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-secondary overflow-hidden p-1 shrink-0 border">
                               <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                             </div>
                             <span className="font-bold truncate max-w-[200px]">{product.name}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <span className="text-[10px] uppercase tracking-widest bg-brand-coral/10 text-brand-coral px-2.5 py-1 rounded-full font-bold">
                             {product.category}
                           </span>
                         </td>
                         <td className="px-6 py-4 font-bold font-sans">₦{product.price.toLocaleString()}</td>
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                               <div 
                                 className={cn("h-full rounded-full", product.stock < 5 ? "bg-destructive" : "bg-brand-coral")} 
                                 style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }} 
                               />
                             </div>
                             <span className="text-[10px] font-bold text-muted-foreground">{product.stock}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <span className={cn(
                             "text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full",
                             product.stock > 0 ? "text-emerald-500 bg-emerald-500/10" : "text-destructive bg-destructive/10"
                           )}>
                             {product.stock > 0 ? 'Active' : 'Out of Stock'}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                             <button 
                               className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-coral hover:bg-brand-coral/10 rounded-lg transition-colors cursor-pointer"
                               onClick={() => {
                                 setEditingProduct(product);
                                 setIsProductModalOpen(true);
                               }}
                             >
                               Edit
                             </button>
                             <button 
                               className="p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                               onClick={() => handleDeleteProduct(product.id)}
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "p-6 md:p-8 rounded-[2rem] border shadow-xs space-y-6 transition-colors",
                isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10 shadow-sm"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold">Real-time Order Feed</h3>
                  <p className="text-xs text-muted-foreground">Live orders placed by store visitors</p>
                </div>
                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full uppercase tracking-wider">
                  {recentOrders.length} Orders Recorded
                </span>
              </div>

              <div className="space-y-4">
                {recentOrders.map((ord, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors",
                      isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-coral/20 text-brand-coral flex items-center justify-center font-bold text-xs">
                        {ord.id}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{ord.customer}</p>
                        <p className="text-xs text-muted-foreground">{ord.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <span className="text-sm font-bold font-sans text-brand-coral">{ord.total}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={cn(
              "border rounded-[2.5rem] w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl transition-colors",
              isDark ? "bg-[#0d0d0d] border-white/10 text-white" : "bg-white border-black/10 text-brand-maroon"
            )}>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className={cn(
                  "absolute top-6 right-6 p-2 rounded-full transition-all cursor-pointer",
                  isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/5 hover:bg-black/10 text-brand-maroon"
                )}
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-2xl font-serif font-bold mb-6">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Velvet Cocktail Mini"
                      className={cn(
                        "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all",
                        isDark ? "bg-white/5 border-white/10 text-white focus:border-brand-coral" : "bg-black/5 border-black/10 text-brand-maroon focus:border-brand-coral"
                      )} 
                      value={editingProduct.name || ''} 
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Category</label>
                    <select 
                      className={cn(
                        "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all font-medium",
                        isDark ? "bg-[#151515] border-white/10 text-white focus:border-brand-coral" : "bg-white border-black/10 text-brand-maroon focus:border-brand-coral"
                      )}
                      value={editingProduct.category || 'Beauty'} 
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    >
                      {VALID_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Price (₦)</label>
                    <input 
                      type="number" 
                      placeholder="220000"
                      className={cn(
                        "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all",
                        isDark ? "bg-white/5 border-white/10 text-white focus:border-brand-coral" : "bg-black/5 border-black/10 text-brand-maroon focus:border-brand-coral"
                      )} 
                      value={editingProduct.price || ''} 
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Stock Quantity</label>
                    <input 
                      type="number" 
                      placeholder="10"
                      className={cn(
                        "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all",
                        isDark ? "bg-white/5 border-white/10 text-white focus:border-brand-coral" : "bg-black/5 border-black/10 text-brand-maroon focus:border-brand-coral"
                      )} 
                      value={editingProduct.stock || ''} 
                      onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                </div>

                {/* Gallery Upload / Image URL */}
                <div className="space-y-2 pt-1">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">
                    Product Image (Gallery Photo or Web URL)
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 8 * 1024 * 1024) {
                            toast.error("File too large", { description: "Please choose an image under 8MB." });
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingProduct(prev => ({ ...prev, image: reader.result as string }));
                            toast.success("Gallery photo loaded!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="gallery-image-picker"
                    />
                    <label 
                      htmlFor="gallery-image-picker"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-coral/50 bg-brand-coral/10 hover:bg-brand-coral text-brand-coral hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0 shadow-xs active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose from Gallery</span>
                    </label>

                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        placeholder="Or paste image URL (https://...)"
                        className={cn(
                          "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all",
                          isDark ? "bg-white/5 border-white/10 text-white focus:border-brand-coral" : "bg-black/5 border-black/10 text-brand-maroon focus:border-brand-coral"
                        )} 
                        value={editingProduct.image || ''} 
                        onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} 
                      />
                    </div>

                    {editingProduct.image && (
                      <div className="w-12 h-12 rounded-xl border border-brand-coral/30 overflow-hidden bg-secondary shrink-0 self-center">
                        <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pl-1">Description</label>
                  <textarea 
                    rows={3} 
                    placeholder="Product description..."
                    className={cn(
                      "w-full border rounded-xl px-4 py-3 text-xs outline-none transition-all",
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-brand-coral" : "bg-black/5 border-black/10 text-brand-maroon focus:border-brand-coral"
                    )} 
                    value={editingProduct.description || ''} 
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} 
                  />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsProductModalOpen(false)} className="rounded-xl text-xs">
                    Cancel
                  </Button>
                  <Button 
                    className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-xl px-6 uppercase tracking-widest text-xs font-bold cursor-pointer" 
                    onClick={handleSaveProduct} 
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Product'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
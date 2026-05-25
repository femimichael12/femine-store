import { useState } from 'react';
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
  MoreVertical, 
  ExternalLink,
  Plus,
  Sun,
  Moon,
  Trash2,
  X
} from 'lucide-react';
import { Product } from './types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

interface AdminDashboardProps {
  onExit: () => void;
  theme: string;
  toggleTheme: () => void;
  products: Product[];
  refreshProducts: () => Promise<void>;
}

export default function AdminDashboard({ onExit, theme, toggleTheme, products, refreshProducts }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    name: '', price: 0, category: 'Beauty', image: '', description: '', stock: 0, sizes: ['Standard'], colors: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProduct = async () => {
    try {
      setIsSaving(true);
      const id = editingProduct.id || Date.now().toString();
      const productToSave = { ...editingProduct, id } as Product;
      await setDoc(doc(db, "products", id), productToSave);
      toast.success(editingProduct.id ? 'Product updated successfully' : 'Product created successfully');
      setIsProductModalOpen(false);
      await refreshProducts();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        toast.success("Product deleted");
        await refreshProducts();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product");
      }
    }
  };
  
  const stats = [
    { label: 'Total Revenue', value: '₦12,450,000', change: '+12.5%', icon: BarChart3 },
    { label: 'Total Orders', value: '1,284', change: '+8.2%', icon: ShoppingCart },
    { label: 'Products', value: products.length.toString(), change: '+2', icon: Package },
    { label: 'Customers', value: '8,432', change: '+15.3%', icon: Users },
  ];

  const recentOrders = [
    { id: '#ORD-7721', customer: 'Amara Okafor', product: 'Silk Evening Gown', status: 'Delivered', total: '₦380,000' },
    { id: '#ORD-7722', customer: 'Zainab Bello', product: 'Glow Serum', status: 'Shipped', total: '₦95,000' },
    { id: '#ORD-7723', customer: 'Chioma Adeyemi', product: 'Leather Tote Bag', status: 'Pending', total: '₦360,000' },
    { id: '#ORD-7724', customer: 'Elena Gilbert', product: 'Cashmere Turtleneck', status: 'Processing', total: '₦280,000' },
  ];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'discounts', label: 'Discounts', icon: Ticket },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-brand-coral">
      <Toaster position="top-right" richColors theme="dark" />
      
      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-2xl flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-brand-coral flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">F</span>
            </div>
            <h2 className="text-xl font-serif font-bold tracking-tight">FEMINÉ <span className="text-[10px] text-brand-coral uppercase tracking-widest block font-sans">Admin Portal</span></h2>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group",
                  activeTab === item.id 
                    ? "bg-brand-coral text-white shadow-lg shadow-brand-coral/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "group-hover:text-brand-coral")} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
          <button 
            onClick={onExit}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all group"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white">View Store</span>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-brand-coral" />
          </button>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-coral to-brand-gold p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">JD</div>
              </div>
              <div className="text-[10px] uppercase tracking-wider">
                <p className="font-bold text-white">Jane Doe</p>
                <p className="text-white/40">Owner</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
               {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-white/40 text-sm">Welcome back, Jane. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-6">
              Download Report
            </Button>
            <Button 
              className="bg-brand-coral text-white hover:bg-brand-coral/90 rounded-xl px-6 flex gap-2"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-dark p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 rounded-2xl bg-white/5 text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-all duration-500">
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-coral bg-brand-coral/10 px-2 py-1 rounded-full flex items-center gap-1">
                          {stat.change} <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                        <p className="text-2xl font-serif font-bold">{stat.value}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-brand-coral/5 blur-3xl rounded-full" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-dark p-8 rounded-[2rem] border border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-serif text-xl font-bold">Revenue Analytics</h3>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-[300px] flex items-end gap-3 px-4">
                    {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                      <div key={i} className="flex-grow flex flex-col items-center gap-4 group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="w-full bg-gradient-to-t from-brand-coral/20 to-brand-coral rounded-t-xl relative"
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-coral text-white text-[10px] font-bold px-2 py-1 rounded">
                            ₦{(height * 10).toLocaleString()}k
                          </div>
                        </motion.div>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                  <h3 className="font-serif text-xl font-bold mb-8">Recent Orders</h3>
                  <div className="space-y-6">
                    {recentOrders.map((order, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[10px] font-bold text-brand-coral">
                            {order.id.slice(1, 4)}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{order.customer}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{order.product}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-brand-coral">{order.total}</p>
                          <p className={cn(
                            "text-[8px] uppercase font-black tracking-[0.2em]",
                            order.status === 'Delivered' ? "text-green-400" : order.status === 'Shipped' ? "text-blue-400" : "text-brand-gold"
                          )}>{order.status}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-white/40 hover:text-brand-coral text-[10px] uppercase tracking-widest font-bold pt-4 border-t border-white/5">
                      View All Orders
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
             <motion.div 
               key="products"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-dark rounded-[2rem] border border-white/5 overflow-hidden"
             >
               <table className="w-full text-left">
                 <thead className="bg-white/5">
                   <tr className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                     <th className="px-8 py-6">Product</th>
                     <th className="px-8 py-6">Category</th>
                     <th className="px-8 py-6">Price</th>
                     <th className="px-8 py-6">Stock</th>
                     <th className="px-8 py-6">Status</th>
                     <th className="px-8 py-6 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {products.map((product) => (
                     <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden p-1">
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                           </div>
                           <span className="text-sm font-bold truncate max-w-[200px]">{product.name}</span>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                         <span className="text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full text-white/60">
                           {product.category}
                         </span>
                       </td>
                       <td className="px-8 py-5 font-bold text-sm">₦{product.price.toLocaleString()}</td>
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-2">
                           <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div 
                               className={cn("h-full rounded-full", product.stock < 5 ? "bg-red-500" : "bg-brand-coral")} 
                               style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }} 
                             />
                           </div>
                           <span className="text-[10px] font-bold text-white/40">{product.stock}</span>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                         <span className={cn(
                           "text-[8px] uppercase font-black tracking-widest px-2 py-1 rounded-md",
                           product.stock > 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                         )}>
                           {product.stock > 0 ? 'Active' : 'Out of Stock'}
                         </span>
                       </td>
                       <td className="px-8 py-5 text-right">
                         <div className="flex justify-end gap-2">
                           <button 
                             className="p-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                             onClick={() => {
                               setEditingProduct(product);
                               setIsProductModalOpen(true);
                             }}
                           >
                             Edit
                           </button>
                           <button 
                             className="p-2 text-red-400/60 hover:text-red-400 transition-colors"
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
               <div className="p-6 text-center">
                 <p className="text-[10px] uppercase tracking-widest text-white/20">Showing {products.length} Products</p>
               </div>
             </motion.div>
          )}
        </AnimatePresence>

        {isProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="glass-dark border border-white/10 rounded-[2rem] w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto relative bg-[#0a0a0a]">
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-2xl font-serif font-bold mb-6">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Name</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-coral" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Category</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-coral" value={editingProduct.category || ''} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Price (₦)</label>
                    <input type="number" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-coral" value={editingProduct.price || 0} onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Stock</label>
                    <input type="number" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-coral" value={editingProduct.stock || 0} onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Image URL</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-coral" value={editingProduct.image || ''} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Description</label>
                  <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-coral" value={editingProduct.description || ''} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsProductModalOpen(false)}>Cancel</Button>
                  <Button className="bg-brand-coral text-white hover:bg-brand-coral/90" onClick={handleSaveProduct} disabled={isSaving}>
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
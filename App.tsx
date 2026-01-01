
import React, { useState, useEffect, useCallback } from 'react';
import { Layout, LogIn, LayoutDashboard, Home, ShoppingBag, Plus, Trash2, Edit3, Settings, ShieldCheck, Megaphone, LogOut, CheckCircle2 } from 'lucide-react';
import { Offer, PlatformSettings, AdSettings } from './types';
import { DEFAULT_OFFERS, INITIAL_SETTINGS } from './constants';

// --- Logic for injecting Adsterra scripts ---
const injectAds = (ads: AdSettings) => {
  if (!ads.enabled) {
    document.getElementById('adsterra-head')!.innerHTML = '';
    document.getElementById('adsterra-body-top')!.innerHTML = '';
    const footerAd = document.getElementById('adsterra-footer');
    if (footerAd) footerAd.innerHTML = '';
    return;
  }

  // Head Injection
  const headEl = document.getElementById('adsterra-head');
  if (headEl) headEl.innerHTML = ads.headCode;

  // Body Top Injection
  const bodyTopEl = document.getElementById('adsterra-body-top');
  if (bodyTopEl) bodyTopEl.innerHTML = ads.bodyTopCode;

  // Footer Injection handled in React layout
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('aff_offers');
    return saved ? JSON.parse(saved) : DEFAULT_OFFERS;
  });

  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('aff_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Persist Data
  useEffect(() => {
    localStorage.setItem('aff_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('aff_settings', JSON.stringify(settings));
    injectAds(settings.ads);
  }, [settings]);

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === settings.adminPassword) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('كلمة السر غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setView('home');
  };

  // Offers Handlers
  const addOffer = (offer: Offer) => setOffers([offer, ...offers]);
  const deleteOffer = (id: string) => setOffers(offers.filter(o => o.id !== id));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-emerald-600 p-2 rounded-lg">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">{settings.siteName}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('home')}
              className={`px-4 py-2 rounded-lg transition ${view === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              الرئيسية
            </button>
            {isAdmin ? (
              <button 
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded-lg transition ${view === 'admin' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                لوحة التحكم
              </button>
            ) : (
              <button 
                onClick={() => setView('admin')}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
              >
                <LogIn size={18} />
                <span>دخول الإدارة</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'home' ? (
          <HomeView offers={offers} adsEnabled={settings.ads.enabled} />
        ) : (
          <AdminView 
            isAdmin={isAdmin} 
            handleLogin={handleLogin}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
            error={error}
            offers={offers}
            settings={settings}
            setSettings={setSettings}
            addOffer={addOffer}
            deleteOffer={deleteOffer}
            handleLogout={handleLogout}
            success={success}
            setSuccess={setSuccess}
          />
        )}
      </main>

      {/* Footer Ad Area */}
      {settings.ads.enabled && settings.ads.footerCode && (
        <div id="adsterra-footer" className="bg-white border-t py-6 flex justify-center overflow-hidden" 
             dangerouslySetInnerHTML={{ __html: settings.ads.footerCode }}>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} {settings.siteName}</p>
        </div>
      </footer>
    </div>
  );
};

// --- Home Components ---
const HomeView: React.FC<{ offers: Offer[], adsEnabled: boolean }> = ({ offers, adsEnabled }) => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    {/* Hero Section */}
    <div className="text-center mb-16 space-y-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">أفضل العروض والمنتجات الحصرية</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">تصفح مجموعة مختارة من المنتجات التي نوصي بها بأفضل الأسعار الممكنة.</p>
    </div>

    {/* Offers Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map(offer => (
        <div key={offer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
          <div className="relative aspect-video overflow-hidden">
            <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {offer.category}
            </span>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
              {offer.price && <span className="text-emerald-600 font-bold">{offer.price}</span>}
            </div>
            <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{offer.description}</p>
            <a 
              href={offer.affiliateUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-center transition-colors shadow-md shadow-emerald-100"
            >
              اذهب للعرض الآن
            </a>
          </div>
        </div>
      ))}
    </div>

    {offers.length === 0 && (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-400">لا توجد عروض متاحة حالياً.</h3>
      </div>
    )}
  </div>
);

// --- Admin Components ---
const AdminView: React.FC<any> = ({ 
  isAdmin, handleLogin, passwordInput, setPasswordInput, error, 
  offers, settings, setSettings, addOffer, deleteOffer, handleLogout,
  success, setSuccess
}) => {
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-emerald-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">تسجيل دخول المسؤول</h2>
            <p className="text-gray-500 text-sm">أدخل كلمة السر للوصول إلى لوحة التحكم</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="كلمة السر"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'offers' | 'ads' | 'settings'>('offers');
  const [newOffer, setNewOffer] = useState({ title: '', description: '', imageUrl: '', affiliateUrl: '', category: 'إلكترونيات', price: '' });

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.title || !newOffer.affiliateUrl) return;
    addOffer({ ...newOffer, id: Date.now().toString() });
    setNewOffer({ title: '', description: '', imageUrl: '', affiliateUrl: '', category: 'إلكترونيات', price: '' });
  };

  const updateAds = (field: keyof AdSettings, value: any) => {
    setSettings({
      ...settings,
      ads: { ...settings.ads, [field]: value }
    });
  };

  const showToast = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button onClick={() => setActiveTab('offers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'offers' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'hover:bg-gray-100'}`}>
            <LayoutDashboard size={20} />
            <span className="font-medium">إدارة العروض</span>
          </button>
          <button onClick={() => setActiveTab('ads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'ads' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'hover:bg-gray-100'}`}>
            <Megaphone size={20} />
            <span className="font-medium">الإعلانات (Adsterra)</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'hover:bg-gray-100'}`}>
            <Settings size={20} />
            <span className="font-medium">الإعدادات</span>
          </button>
          <hr className="my-4" />
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition">
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {success && (
            <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Plus size={20} className="text-emerald-600" />
                  إضافة عرض جديد
                </h3>
                <form onSubmit={handleAddOffer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="عنوان العرض" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none" required />
                  <input type="text" placeholder="السعر (اختياري)" value={newOffer.price} onChange={e => setNewOffer({...newOffer, price: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none" />
                  <input type="text" placeholder="رابط الأفلييت" value={newOffer.affiliateUrl} onChange={e => setNewOffer({...newOffer, affiliateUrl: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none" required />
                  <input type="text" placeholder="رابط الصورة (picsum.photos/400/300)" value={newOffer.imageUrl} onChange={e => setNewOffer({...newOffer, imageUrl: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none" />
                  <select value={newOffer.category} onChange={e => setNewOffer({...newOffer, category: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none">
                    <option>إلكترونيات</option>
                    <option>أزياء</option>
                    <option>صحة وجمال</option>
                    <option>منزل</option>
                  </select>
                  <textarea placeholder="وصف المنتج" value={newOffer.description} onChange={e => setNewOffer({...newOffer, description: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none md:col-span-2" />
                  <button type="submit" className="bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 md:col-span-2">إضافة العرض</button>
                </form>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold text-gray-700">العرض</th>
                      <th className="px-6 py-4 font-bold text-gray-700">التصنيف</th>
                      <th className="px-6 py-4 font-bold text-gray-700">السعر</th>
                      <th className="px-6 py-4 font-bold text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map(o => (
                      <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={o.imageUrl} className="w-10 h-10 rounded object-cover" />
                            <span className="font-medium">{o.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{o.category}</td>
                        <td className="px-6 py-4 text-emerald-600 font-bold">{o.price || '-'}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => { deleteOffer(o.id); showToast('تم حذف العرض'); }} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">إدارة إعلانات Adsterra</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{settings.ads.enabled ? 'مفعلة' : 'معطلة'}</span>
                  <button 
                    onClick={() => updateAds('enabled', !settings.ads.enabled)}
                    className={`w-12 h-6 rounded-full relative transition ${settings.ads.enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.ads.enabled ? 'right-7' : 'right-1'}`} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 italic text-left">Head Code (&lt;head&gt;)</label>
                  <textarea 
                    value={settings.ads.headCode}
                    onChange={e => updateAds('headCode', e.target.value)}
                    className="w-full h-32 px-4 py-2 border rounded-xl font-mono text-xs focus:ring-emerald-500 focus:outline-none"
                    placeholder="ضع هنا كود الـ Meta أو الـ Script المخصص للـ Head..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 italic text-left">Top Body Code (After Nav)</label>
                  <textarea 
                    value={settings.ads.bodyTopCode}
                    onChange={e => updateAds('bodyTopCode', e.target.value)}
                    className="w-full h-32 px-4 py-2 border rounded-xl font-mono text-xs focus:ring-emerald-500 focus:outline-none"
                    placeholder="ضع هنا كود البانر العلوي أو الإعلان المنبثق..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 italic text-left">Footer Code (Before Footer)</label>
                  <textarea 
                    value={settings.ads.footerCode}
                    onChange={e => updateAds('footerCode', e.target.value)}
                    className="w-full h-32 px-4 py-2 border rounded-xl font-mono text-xs focus:ring-emerald-500 focus:outline-none"
                    placeholder="ضع هنا كود الإعلانات السفلية..."
                  />
                </div>
              </div>
              <button onClick={() => showToast('تم حفظ الإعدادات')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition">حفظ التغييرات</button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold mb-4">إعدادات المنصة</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم الموقع</label>
                  <input 
                    type="text" 
                    value={settings.siteName}
                    onChange={e => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">تغيير كلمة سر الإدارة</label>
                  <div className="flex gap-2">
                    <input 
                      type="password" 
                      placeholder="كلمة السر الجديدة"
                      onBlur={e => {
                        if(e.target.value) {
                           setSettings({...settings, adminPassword: e.target.value});
                           showToast('تم تحديث كلمة السر');
                           e.target.value = '';
                        }
                      }}
                      className="w-full px-4 py-2 border rounded-xl focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">* سيتم الحفظ تلقائياً عند كتابة كلمة جديدة.</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm leading-relaxed">
                <p className="font-bold mb-1">تعليمات للمبتدئين:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>استخدم <strong>localStorage</strong> لحفظ البيانات تلقائياً على متصفحك.</li>
                  <li>عند رفع الموقع على GitHub Pages، سيتم تحميل الإعدادات الافتراضية لأول مرة.</li>
                  <li>يمكنك جلب روابط الصور من أي موقع (أو استخدام picsum.photos).</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

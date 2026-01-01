
/**
 * نظام تشغيل مدونة الأفلييت - الإصدار 2.0 (إصلاح الرندرة)
 */

// 1. البيانات الافتراضية الأولية
const INITIAL_BLOG_DATA = {
    siteName: "مدونة الصفقات",
    adminPassword: "admin123",
    ads: {
        enabled: true,
        head: "",
        top: "",
        footer: ""
    },
    offers: [
        { 
            id: "1", 
            title: "لماذا تعتبر سماعات Sony WH-1000XM5 الأفضل حالياً؟", 
            price: "249$", 
            category: "تقنية", 
            desc: "في هذه المراجعة نغوص في تفاصيل صوت سوني الجبار ونوضح لك لماذا يجب أن تقتنيها إذا كنت من محبي العزل الصوتي الفائق.", 
            img: "https://images.unsplash.com/photo-1618366712277-721217317452?q=80&w=400&h=300&fit=crop", 
            url: "#",
            date: "24 مايو 2024"
        },
        { 
            id: "2", 
            title: "أفضل 5 ساعات ذكية لممارسي الرياضة في 2024", 
            price: "تبدأ من 99$", 
            category: "منزل ذكي", 
            desc: "جمعنا لكم أفضل الساعات التي تدعم قياس نبضات القلب والمسافة المقطوعة بدقة عالية جداً.", 
            img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400&h=300&fit=crop", 
            url: "#",
            date: "23 مايو 2024"
        },
        { 
            id: "3", 
            title: "مراجعة شاملة لآلة قهوة Nespresso", 
            price: "120$", 
            category: "منزل ذكي", 
            desc: "هل تستحق آلة نسبريسو الشراء؟ جربناها لمدة شهر كامل وإليك النتائج النهائية وطعم القهوة.", 
            img: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=400&h=300&fit=crop", 
            url: "#",
            date: "22 مايو 2024"
        }
    ]
};

// 2. تحميل البيانات
let state = JSON.parse(localStorage.getItem('aff_blog_storage') || 'null') || INITIAL_BLOG_DATA;
let isLoggedIn = false;

// 3. دالة الحفظ وإعادة الرندرة
function syncAndRender() {
    localStorage.setItem('aff_blog_storage', JSON.stringify(state));
    renderApp();
}

// 4. وظائف التنقل
const showPage = (pageId: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const hero = document.getElementById('hero-section');
    
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
        if (hero) hero.classList.add('hidden');
    } else {
        document.getElementById(`page-${pageId}`)?.classList.remove('hidden');
        // إخفاء الهيرو في صفحة الإدارة لزيادة المساحة
        if (pageId === 'admin') hero?.classList.add('hidden');
        else hero?.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 5. تبويب لوحة التحكم
const switchTab = (tabId: string, event: any) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => {
        b.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        b.classList.add('hover:bg-white');
    });
    
    document.getElementById(tabId)?.classList.add('active');
    if (event && event.currentTarget) {
        (event.currentTarget as HTMLElement).classList.add('bg-orange-600', 'text-white', 'shadow-lg');
    }
};

// 6. تسجيل الدخول
const handleLogin = () => {
    const input = document.getElementById('admin-pass-input') as HTMLInputElement;
    if (input && input.value === state.adminPassword) {
        isLoggedIn = true;
        document.getElementById('login-error')?.classList.add('hidden');
        showPage('admin');
        renderAdmin();
    } else {
        document.getElementById('login-error')?.classList.remove('hidden');
    }
};

const handleLogout = () => {
    isLoggedIn = false;
    showPage('home');
};

// 7. إدارة المقالات
const addOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const img = (document.getElementById('offer-img') as HTMLInputElement).value;
    const cat = (document.getElementById('offer-cat') as HTMLSelectElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;

    if (!title || !url) return alert('يرجى وضع العنوان ورابط الأفلييت');

    const newPost = {
        id: Date.now().toString(),
        title, price, url, desc, category: cat,
        img: img || `https://picsum.photos/seed/${Date.now()}/400/300`,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    state.offers.unshift(newPost);
    syncAndRender();
    
    // تصفير الحقول
    ['offer-title', 'offer-price', 'offer-url', 'offer-img', 'offer-desc'].forEach(id => {
        (document.getElementById(id) as any).value = '';
    });
    alert('تم النشر في المدونة!');
};

const deleteOffer = (id: string) => {
    if (confirm('هل تريد حذف هذا المقال نهائياً؟')) {
        state.offers = state.offers.filter((o: any) => o.id !== id);
        syncAndRender();
    }
};

// 8. الإعلانات والإعدادات
const saveAds = () => {
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    syncAndRender();
    alert('تم تحديث الإعلانات');
};

const saveSettings = () => {
    const name = (document.getElementById('site-name-input') as HTMLInputElement).value;
    const pass = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    if (name) state.siteName = name;
    if (pass) state.adminPassword = pass;
    syncAndRender();
    alert('تم حفظ الإعدادات');
};

// 9. حقن الإعلانات
function injectAd(id: string, code: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = "";
    if (!code) return;
    const range = document.createRange();
    range.selectNode(el);
    const fragment = range.createContextualFragment(code);
    el.appendChild(fragment);
}

// 10. الرندرة الرئيسية
function renderApp() {
    // تحديث الهوية
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();

    // رندرة المقالات
    const grid = document.getElementById('offers-grid');
    if (grid) {
        if (state.offers.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400 font-bold">لم يتم نشر أي مقالات بعد.</div>`;
        } else {
            grid.innerHTML = state.offers.map((o: any) => `
                <article class="blog-card bg-white rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-2xl transition duration-500">
                    <div class="relative overflow-hidden h-60">
                        <img src="${o.img}" class="w-full h-full object-cover transition duration-700" alt="${o.title}">
                        <div class="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">${o.category || 'عام'}</div>
                    </div>
                    <div class="p-8 flex flex-col flex-grow">
                        <div class="text-xs text-gray-400 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            ${o.date || 'منذ وقت قصير'}
                        </div>
                        <h3 class="text-xl font-black text-gray-900 mb-3 leading-tight line-clamp-2 hover:text-orange-600 transition cursor-pointer">${o.title}</h3>
                        <p class="text-gray-500 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">${o.desc || 'لا يوجد وصف متاح لهذا العرض حالياً.'}</p>
                        <div class="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                            <span class="text-orange-600 font-black text-lg">${o.price || 'سعر منافس'}</span>
                            <a href="${o.url}" target="_blank" class="bg-gray-900 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md">شراء الآن</a>
                        </div>
                    </div>
                </article>
            `).join('');
        }
    }

    // حقن الإعلانات
    if (state.ads.enabled) {
        injectAd('adsterra-head-placeholder', state.ads.head);
        injectAd('adsterra-top-placeholder', state.ads.top);
        injectAd('adsterra-footer-placeholder', state.ads.footer);
    } else {
        ['adsterra-head-placeholder', 'adsterra-top-placeholder', 'adsterra-footer-placeholder'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });
    }

    if (isLoggedIn) renderAdmin();
}

function renderAdmin() {
    (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
    (document.getElementById('ads-enabled') as HTMLInputElement).checked = state.ads.enabled;
    (document.getElementById('ad-head') as HTMLTextAreaElement).value = state.ads.head;
    (document.getElementById('ad-top') as HTMLTextAreaElement).value = state.ads.top;
    (document.getElementById('ad-footer') as HTMLTextAreaElement).value = state.ads.footer;

    const list = document.getElementById('admin-offers-list');
    if (list) {
        list.innerHTML = state.offers.map((o: any) => `
            <tr class="border-b hover:bg-gray-50 transition">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <img src="${o.img}" class="w-12 h-12 rounded-xl object-cover shadow-sm">
                        <span class="font-bold text-gray-800 text-sm line-clamp-1">${o.title}</span>
                    </div>
                </td>
                <td class="p-4 text-sm font-semibold text-gray-500">${o.category}</td>
                <td class="p-4 text-center">
                    <button onclick="window.deleteOffer('${o.id}')" class="text-red-500 hover:bg-red-50 p-2 rounded-xl transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// 11. ربط النطاق العام
(window as any).showPage = showPage;
(window as any).switchTab = switchTab;
(window as any).handleLogin = handleLogin;
(window as any).handleLogout = handleLogout;
(window as any).addOffer = addOffer;
(window as any).deleteOffer = deleteOffer;
(window as any).saveAds = saveAds;
(window as any).saveSettings = saveSettings;

// 12. البدء
document.addEventListener('DOMContentLoaded', renderApp);
renderApp(); // تشغيل فوري

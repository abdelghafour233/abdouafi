
// --- البيانات الافتراضية للمنصة ---
const DEFAULT_DATA = {
    siteName: "AffiliateHub",
    adminPassword: "admin123",
    ads: {
        enabled: true,
        head: "",
        top: "",
        footer: ""
    },
    offers: [
        { id: "1", title: "ساعة ذكية Ultra", price: "299 ريال", category: "إلكترونيات", desc: "أفضل ساعة ذكية تدعم جميع الميزات الرياضية ومقاومة للماء.", img: "https://picsum.photos/seed/watch/400/300", url: "#" },
        { id: "2", title: "سماعات بلوتوث Pro", price: "150 ريال", category: "إكسسوارات", desc: "سماعات لاسلكية بجودة صوت نقية جداً مع خاصية عزل الضوضاء.", img: "https://picsum.photos/seed/audio/400/300", url: "#" },
        { id: "3", title: "كاميرا مراقبة ذكية", price: "450 ريال", category: "إلكترونيات", desc: "كاميرا بدقة 4K مع خاصية التتبع والتحميل السحابي.", img: "https://picsum.photos/seed/camera/400/300", url: "#" }
    ]
};

// --- تحميل الحالة من المتصفح ---
let state = JSON.parse(localStorage.getItem('aff_platform_data') || 'null') || DEFAULT_DATA;
let isLoggedIn = false;

// --- وظيفة الحفظ والتحديث ---
function saveData() {
    localStorage.setItem('aff_platform_data', JSON.stringify(state));
    render();
}

// --- وظائف التنقل (Show Page) ---
const showPage = (pageId: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
    } else {
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) targetPage.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- وظيفة التبديل بين التبويبات في لوحة التحكم ---
const switchTab = (tabId: string, event: any) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
        b.classList.add('hover:bg-gray-200');
    });
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');
    
    if (event && event.currentTarget) {
        (event.currentTarget as HTMLElement).classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        (event.currentTarget as HTMLElement).classList.remove('hover:bg-gray-200');
    }
};

// --- وظيفة الدخول للإدارة ---
const handleLogin = () => {
    const passInput = document.getElementById('admin-pass-input') as HTMLInputElement;
    const errorMsg = document.getElementById('login-error');
    
    if (passInput && passInput.value === state.adminPassword) {
        isLoggedIn = true;
        if (errorMsg) errorMsg.classList.add('hidden');
        showPage('admin');
        renderAdmin();
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
};

const handleLogout = () => {
    isLoggedIn = false;
    showPage('home');
};

// --- إدارة العروض (Offers Management) ---
const addOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const img = (document.getElementById('offer-img') as HTMLInputElement).value;
    const cat = (document.getElementById('offer-cat') as HTMLSelectElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;

    if (!title || !url) {
        alert('يرجى إدخال عنوان المنتج ورابط الأفلييت على الأقل');
        return;
    }

    const newOffer = {
        id: Date.now().toString(),
        title,
        price,
        url,
        img: img || `https://picsum.photos/seed/${Date.now()}/400/300`,
        category: cat,
        desc
    };

    state.offers.unshift(newOffer);
    saveData();
    
    // تفريغ الحقول
    ['offer-title', 'offer-price', 'offer-url', 'offer-img', 'offer-desc'].forEach(id => {
        (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement).value = '';
    });
    alert('تمت إضافة العرض بنجاح');
};

const deleteOffer = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
        state.offers = state.offers.filter((o: any) => o.id !== id);
        saveData();
    }
};

// --- إدارة الإعلانات والإعدادات ---
const saveAds = () => {
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    saveData();
    alert('تم حفظ الإعلانات وتحديث الموقع');
};

const saveSettings = () => {
    const newName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    const newPass = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    
    if (newName) state.siteName = newName;
    if (newPass) state.adminPassword = newPass;
    
    saveData();
    alert('تم تحديث إعدادات المنصة بنجاح');
};

// --- وظيفة حقن الأكواد (Adsterra Injector) ---
function injectScript(container: HTMLElement, code: string) {
    container.innerHTML = "";
    if (!code) return;
    const range = document.createRange();
    range.selectNode(container);
    const documentFragment = range.createContextualFragment(code);
    container.appendChild(documentFragment);
}

// --- الرندرة (Render functions) ---
function render() {
    // 1. تحديث الهوية
    const siteNames = ['display-site-name', 'footer-site-name'];
    siteNames.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = state.siteName;
    });
    
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.innerText = new Date().getFullYear().toString();

    // 2. رندرة المنتجات
    const grid = document.getElementById('offers-grid');
    if (grid) {
        if (state.offers.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400">لا توجد عروض حالياً، يرجى إضافتها من لوحة التحكم.</div>`;
        } else {
            grid.innerHTML = state.offers.map((o: any) => `
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                    <div class="relative overflow-hidden group">
                        <img src="${o.img}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" alt="${o.title}">
                        <span class="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">${o.category || 'عرض'}</span>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-gray-800">${o.title}</h3>
                            <span class="text-emerald-600 font-bold whitespace-nowrap">${o.price}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">${o.desc || 'لا يوجد وصف متاح.'}</p>
                        <a href="${o.url}" target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-bold shadow-md shadow-emerald-50 transition-colors">اذهب للعرض الآن</a>
                    </div>
                </div>
            `).join('');
        }
    }

    // 3. تحديث الإعلانات
    const headPlace = document.getElementById('adsterra-head-placeholder');
    const topPlace = document.getElementById('adsterra-top-placeholder');
    const footPlace = document.getElementById('adsterra-footer-placeholder');

    if (state.ads.enabled) {
        if (headPlace) injectScript(headPlace, state.ads.head);
        if (topPlace) injectScript(topPlace, state.ads.top);
        if (footPlace) injectScript(footPlace, state.ads.footer);
    } else {
        if (headPlace) headPlace.innerHTML = '';
        if (topPlace) topPlace.innerHTML = '';
        if (footPlace) footPlace.innerHTML = '';
    }

    if (isLoggedIn) renderAdmin();
}

function renderAdmin() {
    // ملء بيانات الحقول
    const siteNameInput = document.getElementById('site-name-input') as HTMLInputElement;
    if (siteNameInput) siteNameInput.value = state.siteName;

    const adsCheck = document.getElementById('ads-enabled') as HTMLInputElement;
    if (adsCheck) adsCheck.checked = state.ads.enabled;

    const adFields = { 'ad-head': state.ads.head, 'ad-top': state.ads.top, 'ad-footer': state.ads.footer };
    Object.entries(adFields).forEach(([id, val]) => {
        const el = document.getElementById(id) as HTMLTextAreaElement;
        if (el) el.value = val;
    });

    // قائمة العروض في الإدارة
    const list = document.getElementById('admin-offers-list');
    if (list) {
        list.innerHTML = state.offers.map((o: any) => `
            <tr class="border-b hover:bg-gray-50 transition">
                <td class="p-4">
                    <div class="flex items-center gap-2">
                        <img src="${o.img}" class="w-8 h-8 rounded object-cover">
                        <span class="font-medium text-sm">${o.title}</span>
                    </div>
                </td>
                <td class="p-4 text-sm text-emerald-600 font-bold">${o.price}</td>
                <td class="p-4 text-center">
                    <button onclick="window.deleteOffer('${o.id}')" class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// --- ربط الدوال بـ window لتعمل مع HTML onclick ---
(window as any).showPage = showPage;
(window as any).switchTab = switchTab;
(window as any).handleLogin = handleLogin;
(window as any).handleLogout = handleLogout;
(window as any).addOffer = addOffer;
(window as any).deleteOffer = deleteOffer;
(window as any).saveAds = saveAds;
(window as any).saveSettings = saveSettings;

// --- التشغيل الأول عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    render();
});

// أيضاً نشغل render فوراً لضمان عدم وجود شاشة بيضاء
render();

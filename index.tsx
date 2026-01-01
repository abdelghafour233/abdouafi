
// 1. البيانات الافتراضية في حال عدم وجود بيانات مخزنة
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
        { id: "1", title: "ساعة Ultra الذكية", price: "299 ريال", category: "إلكترونيات", desc: "ساعة ذكية متطورة تدعم المكالمات والقياسات الصحية.", img: "https://picsum.photos/seed/watch/400/300", url: "#" },
        { id: "2", title: "سماعات Pro عازلة", price: "150 ريال", category: "إكسسوارات", desc: "سماعات بلوتوث بجودة صوت نقية وعزل ضوضاء ممتاز.", img: "https://picsum.photos/seed/audio/400/300", url: "#" },
        { id: "3", title: "كاميرا 4K ذكية", price: "450 ريال", category: "إلكترونيات", desc: "كاميرا مراقبة منزلية بدقة عالية وتصوير ليلي.", img: "https://picsum.photos/seed/camera/400/300", url: "#" }
    ]
};

// 2. إدارة الحالة (State Management)
let state = JSON.parse(localStorage.getItem('aff_data') || 'null') || DEFAULT_DATA;
let isLoggedIn = false;

// 3. وظيفة الحفظ والتحديث الشامل
function saveData() {
    localStorage.setItem('aff_data', JSON.stringify(state));
    render();
}

// 4. وظائف التنقل بين الصفحات
const showPage = (pageId: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
    } else {
        document.getElementById(`page-${pageId}`)?.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 5. وظيفة تبديل التبويبات في لوحة التحكم
const switchTab = (tabId: string, event: any) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('bg-emerald-600', 'text-white', 'shadow-md'));
    
    document.getElementById(tabId)?.classList.add('active');
    if (event && event.currentTarget) {
        (event.currentTarget as HTMLElement).classList.add('bg-emerald-600', 'text-white', 'shadow-md');
    }
};

// 6. إدارة الدخول والخروج
const handleLogin = () => {
    const passInput = document.getElementById('admin-pass-input') as HTMLInputElement;
    if (passInput && passInput.value === state.adminPassword) {
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

// 7. إدارة المنتجات (إضافة/حذف)
const addOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const img = (document.getElementById('offer-img') as HTMLInputElement).value;
    const cat = (document.getElementById('offer-cat') as HTMLSelectElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;

    if (!title || !url) return alert('يرجى ملء الحقول الأساسية');

    const newOffer = {
        id: Date.now().toString(),
        title, price, url, desc, category: cat,
        img: img || `https://picsum.photos/seed/${Date.now()}/400/300`
    };

    state.offers.unshift(newOffer);
    saveData();
    
    // تفريغ الحقول بعد الحفظ
    ['offer-title', 'offer-price', 'offer-url', 'offer-img', 'offer-desc'].forEach(id => {
        (document.getElementById(id) as any).value = '';
    });
};

const deleteOffer = (id: string) => {
    if (confirm('هل تريد حذف هذا المنتج؟')) {
        state.offers = state.offers.filter((o: any) => o.id !== id);
        saveData();
    }
};

// 8. إدارة الإعلانات والإعدادات
const saveAds = () => {
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    saveData();
    alert('تم حفظ أكواد الإعلانات وتفعيلها');
};

const saveSettings = () => {
    const name = (document.getElementById('site-name-input') as HTMLInputElement).value;
    const pass = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    if (name) state.siteName = name;
    if (pass) state.adminPassword = pass;
    saveData();
    alert('تم حفظ الإعدادات');
};

// 9. وظيفة حقن الإعلانات (لضمان تشغيل الـ Script)
function injectScript(containerId: string, code: string) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    if (!code) return;
    const range = document.createRange();
    range.selectNode(container);
    const fragment = range.createContextualFragment(code);
    container.appendChild(fragment);
}

// 10. الرندرة (Rendering) - قلب التطبيق
function render() {
    // تحديث الهوية
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();

    // رندرة المنتجات في الشبكة
    const grid = document.getElementById('offers-grid');
    if (grid) {
        if (state.offers.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400">لا توجد منتجات حالياً.</div>`;
        } else {
            grid.innerHTML = state.offers.map((o: any) => `
                <div class="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-2xl transition duration-500">
                    <img src="${o.img}" class="w-full h-56 object-cover" alt="${o.title}">
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-xl font-bold text-gray-800">${o.title}</h3>
                            <span class="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-sm">${o.price || 'عرض'}</span>
                        </div>
                        <p class="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">${o.desc || ''}</p>
                        <a href="${o.url}" target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl text-center font-bold transition shadow-lg shadow-emerald-50">اذهب للعرض الآن</a>
                    </div>
                </div>
            `).join('');
        }
    }

    // حقن الإعلانات
    if (state.ads.enabled) {
        injectScript('adsterra-head-placeholder', state.ads.head);
        injectScript('adsterra-top-placeholder', state.ads.top);
        injectScript('adsterra-footer-placeholder', state.ads.footer);
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
                    <div class="flex items-center gap-2">
                        <img src="${o.img}" class="w-10 h-10 rounded-lg object-cover">
                        <span class="font-semibold text-gray-700">${o.title}</span>
                    </div>
                </td>
                <td class="p-4 text-emerald-600 font-bold">${o.price || '-'}</td>
                <td class="p-4 text-center">
                    <button onclick="window.deleteOffer('${o.id}')" class="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// 11. ربط الدوال بالنطاق العام (Global Scope)
(window as any).showPage = showPage;
(window as any).switchTab = switchTab;
(window as any).handleLogin = handleLogin;
(window as any).handleLogout = handleLogout;
(window as any).addOffer = addOffer;
(window as any).deleteOffer = deleteOffer;
(window as any).saveAds = saveAds;
(window as any).saveSettings = saveSettings;

// 12. التشغيل الأول
document.addEventListener('DOMContentLoaded', render);
render(); // تشغيل احتياطي فوراً

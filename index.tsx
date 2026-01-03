
/**
 * abdouweb - Ultimate Isolated Ads Edition
 * All ads are encapsulated in iframes to prevent global click hijacking.
 */

const DB_KEY = 'abdouweb_isolated_v1';

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        code2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`
    },
    articles: [
        { 
            id: "1", 
            title: "أفضل الهواتف الذكية في المغرب لعام 2025: دليل الشراء الكامل", 
            body: "سوق الهواتف الذكية في المغرب يشهد منافسة شرسة هذا العام بين سامسونج وشاومي وآبل. إذا كنت تبحث عن القيمة مقابل السعر، فإن الفئة المتوسطة هي الأنسب حالياً...", 
            category: "تقنية", 
            img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" 
        }
    ],
    offers: [
        { 
            id: "o1", 
            title: "تخفيضات جوميا: Samsung Galaxy A55", 
            price: "3,800 درهم", 
            img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80", 
            url: "https://www.jumia.ma" 
        }
    ]
};

let state = JSON.parse(localStorage.getItem(DB_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

/**
 * CREATE SANDBOXED IFRAME FOR ADS
 * This is the magic part: the script inside the iframe cannot "see" the parent site buttons.
 */
const createAdIframe = (containerId: string, adCode: string) => {
    const wrapper = document.getElementById(containerId);
    if (!wrapper || !adCode.trim()) return;

    wrapper.innerHTML = ''; // Clear previous
    const iframe = document.createElement('iframe');
    iframe.className = 'ad-iframe';
    iframe.title = 'Advertisement';
    
    // Construct the isolated document
    const htmlContent = `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <style>body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100px; overflow: hidden; }</style>
        </head>
        <body>
            ${adCode}
        </body>
        </html>
    `;

    wrapper.appendChild(iframe);
    
    // Inject content into iframe safely
    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
    }
};

const refreshAllAds = () => {
    createAdIframe('ad-slot-1-wrapper', state.ads.code1);
    createAdIframe('ad-slot-2-wrapper', state.ads.code2);
};

const showPage = (id: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${id}`);
    
    if (id === 'admin' && !isLogged) {
        document.getElementById('page-login')?.classList.remove('hidden');
    } else if (target) {
        target.classList.remove('hidden');
        if (id === 'admin') {
            (document.getElementById('ad-code-1') as HTMLTextAreaElement).value = state.ads.code1;
            (document.getElementById('ad-code-2') as HTMLTextAreaElement).value = state.ads.code2;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleLogin = () => {
    const p = (document.getElementById('admin-pass') as HTMLInputElement).value;
    if (p === state.adminPass) { 
        isLogged = true; 
        showPage('admin'); 
    } else {
        alert('كلمة مرور خاطئة');
    }
};

const saveAds = () => {
    state.ads.code1 = (document.getElementById('ad-code-1') as HTMLTextAreaElement).value;
    state.ads.code2 = (document.getElementById('ad-code-2') as HTMLTextAreaElement).value;
    localStorage.setItem(DB_KEY, JSON.stringify(state));
    refreshAllAds();
    alert('تم تحديث الإعلانات داخل المنطقة المعزولة بنجاح.');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        content.innerHTML = `
            <div class="animate-in slide-in-from-bottom-4 duration-500">
                <div class="relative rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl">
                    <img src="${a.img}" class="w-full h-[400px] object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                        <span class="bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase">${a.category}</span>
                    </div>
                </div>
                <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight text-gray-900 dark:text-white">${a.title}</h1>
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-xl whitespace-pre-line">
                    ${a.body}
                </div>
            </div>
        `;
    }
    showPage('article-detail');
};

const renderMain = () => {
    // 1. Articles
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:border-orange-200 dark:hover:border-orange-900/50 hover:shadow-xl transition-all duration-300">
                <div class="w-full md:w-56 h-48 overflow-hidden rounded-2xl shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="flex-1 flex flex-col justify-center">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                        <span class="text-orange-600 text-[10px] font-black uppercase tracking-widest">${a.category}</span>
                    </div>
                    <h3 class="text-2xl font-black mb-4 group-hover:text-orange-600 transition-colors">${a.title}</h3>
                    <button onclick="window.viewArticle('${a.id}')" class="w-fit text-gray-900 dark:text-white font-black text-sm border-b-2 border-orange-600 pb-1 hover:text-orange-600 transition-colors">إقرأ التفاصيل الكاملة</button>
                </div>
            </div>
        `).join('');
    }

    // 2. Sidebar Offers
    const sideOffers = document.getElementById('offers-sidebar');
    if (sideOffers) {
        sideOffers.innerHTML = state.offers.slice(0, 3).map(o => `
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                <img src="${o.img}" class="w-full h-32 object-cover rounded-2xl mb-4">
                <h4 class="font-bold text-sm mb-3 line-clamp-1">${o.title}</h4>
                <div class="flex items-center justify-between">
                    <span class="text-orange-600 font-black">${o.price}</span>
                    <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2 rounded-xl text-[10px] font-black hover:opacity-90 transition">شراء الآن</a>
                </div>
            </div>
        `).join('');
    }

    // 3. Full Offers Grid
    const fullGrid = document.getElementById('offers-full-grid');
    if (fullGrid) {
        fullGrid.innerHTML = state.offers.map(o => `
            <div class="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition duration-300">
                <img src="${o.img}" class="w-full h-40 object-cover rounded-2xl mb-4">
                <h4 class="font-black mb-2">${o.title}</h4>
                <p class="text-orange-600 font-black text-lg mb-4">${o.price}</p>
                <a href="${o.url}" target="_blank" class="block w-full text-center bg-gray-100 dark:bg-gray-800 dark:text-white py-3 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition">زيارة العرض</a>
            </div>
        `).join('');
    }

    // Initial Ad Load (Isolated)
    refreshAllAds();
};

const addArticle = () => {
    const t = (document.getElementById('new-art-title') as HTMLInputElement).value;
    const b = (document.getElementById('new-art-body') as HTMLTextAreaElement).value;
    if(!t || !b) { alert('يرجى ملء جميع الحقول'); return; }
    
    state.articles.unshift({ 
        id: Date.now().toString(), 
        title: t, 
        body: b, 
        category: "جديد", 
        img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80" 
    });
    
    localStorage.setItem(DB_KEY, JSON.stringify(state));
    renderMain();
    showPage('home');
    alert('تم نشر المقال بنجاح!');
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds, addArticle,
    switchTab: (id: string) => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
        document.getElementById(id)?.classList.remove('hidden');
        document.querySelectorAll('.admin-nav-btn').forEach(b => {
            b.classList.remove('bg-orange-600', 'text-white', 'shadow-md');
            b.classList.add('bg-gray-100', 'dark:bg-gray-800');
        });
        const activeBtn = Array.from(document.querySelectorAll('.admin-nav-btn')).find(b => b.getAttribute('onclick')?.includes(id));
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-100', 'dark:bg-gray-800');
            activeBtn.classList.add('bg-orange-600', 'text-white', 'shadow-md');
        }
    },
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', renderMain);

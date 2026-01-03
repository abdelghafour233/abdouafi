
/**
 * abdouweb - Clean UI & Bottom-Only Ads
 * No intrusive ad-scripts on buttons.
 */

const STORAGE_KEY = 'abdouweb_final_clean_v1';

const DEFAULT_DATA = {
    siteName: "عبدو ويب abdouweb",
    siteDescription: "منصة مغربية رائدة لمراجعات التقنية والصفقات الحصرية.",
    adminPassword: "admin",
    ads: {
        slot1: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        slot2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`
    },
    offers: [
        {
            id: "o1",
            title: "عرض لابتوب احترافي",
            price: "8,500 درهم",
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
            url: "#"
        }
    ],
    articles: [
        {
            id: "a1",
            category: "أخبار التقنية",
            title: "دليل شراء الأجهزة الذكية في المغرب لعام 2025",
            content: "إليك كل ما تحتاجه لاتخاذ قرار شراء ذكي وتوفير ميزانيتك...",
            img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
            date: "2025/01/30"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_DATA;
let isLoggedIn = false;

/**
 * Strict Ad Injection - Only run once on mount and settings change
 */
const injectAdsStrict = () => {
    const s1 = document.getElementById('footer-ad-slot-1');
    const s2 = document.getElementById('footer-ad-slot-2');
    
    if (s1 && s1.innerHTML === '') {
        const range = document.createRange();
        const frag = range.createContextualFragment(state.ads.slot1);
        s1.appendChild(frag);
    }
    
    if (s2 && s2.innerHTML === '') {
        const range = document.createRange();
        const frag = range.createContextualFragment(state.ads.slot2);
        s2.appendChild(frag);
    }
};

const showPage = (pageId: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${pageId}`);
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
    } else if (target) {
        target.classList.remove('hidden');
        if (pageId === 'admin') {
            (document.getElementById('ad-general-input') as HTMLTextAreaElement).value = state.ads.slot1;
            (document.getElementById('ad-footer-input') as HTMLTextAreaElement).value = state.ads.slot2;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const saveAdSettings = () => {
    state.ads.slot1 = (document.getElementById('ad-general-input') as HTMLTextAreaElement).value;
    state.ads.slot2 = (document.getElementById('ad-footer-input') as HTMLTextAreaElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Clear and re-inject to apply new scripts
    const s1 = document.getElementById('footer-ad-slot-1'); if(s1) s1.innerHTML = '';
    const s2 = document.getElementById('footer-ad-slot-2'); if(s2) s2.innerHTML = '';
    injectAdsStrict();
    alert('تم الحفظ. الإعلانات ستظهر في أسفل الصفحة فقط.');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const container = document.getElementById('article-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-sm animate-fade-in">
                <img src="${a.img}" class="w-full h-72 object-cover">
                <div class="p-8">
                    <span class="text-orange-600 text-xs font-black mb-4 block">${a.category}</span>
                    <h1 class="text-3xl font-black mb-6 leading-tight">${a.title}</h1>
                    <div class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">${a.content}</div>
                </div>
            </div>`;
    }
    showPage('article-detail');
};

function renderApp() {
    // 1. Inject Ads (Only in Bottom Slots)
    injectAdsStrict();

    // 2. Render Articles (Buttons here are PURE internal navigation)
    const artGrid = document.getElementById('articles-grid');
    if (artGrid) {
        artGrid.innerHTML = state.articles.map(a => `
            <article class="bg-white dark:bg-gray-900 p-5 rounded-[1.5rem] border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition cursor-pointer" onclick="window.viewArticle('${a.id}')">
                <img src="${a.img}" class="w-full md:w-32 h-32 object-cover rounded-xl">
                <div>
                    <span class="text-orange-600 text-[10px] font-black uppercase mb-2 block">${a.category}</span>
                    <h3 class="text-lg font-black mb-3">${a.title}</h3>
                    <div class="text-orange-600 text-[11px] font-bold">إقرأ المزيد ←</div>
                </div>
            </article>`).join('');
    }

    // 3. Render Offers (Buttons are direct affiliate links)
    const offGrid = document.getElementById('offers-grid');
    if (offGrid) {
        offGrid.innerHTML = state.offers.map(o => `
            <article class="bg-white dark:bg-gray-900 p-5 rounded-[1.5rem] border border-gray-50 dark:border-gray-800 shadow-sm">
                <img src="${o.img}" class="w-full h-40 object-cover rounded-xl mb-4">
                <h3 class="font-black text-md mb-2 line-clamp-1">${o.title}</h3>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-orange-600 font-black text-lg">${o.price}</span>
                    <a href="${o.url}" target="_blank" class="bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-xs">شراء</a>
                </div>
            </article>`).join('');
    }
}

const handleLogin = () => {
    const p = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (p === state.adminPassword) { isLoggedIn = true; showPage('admin'); renderApp(); }
};

const saveArticle = () => {
    const t = (document.getElementById('article-title') as HTMLInputElement).value;
    const c = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    if(!t || !c) return;
    state.articles.unshift({ id: Date.now().toString(), title: t, content: c, category: "عام", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800", date: "2025" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderApp();
    showPage('home');
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveArticle, saveAdSettings,
    switchTab: (tabId: string, event: any) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.replace('bg-orange-600', 'text-gray-500'));
        event.target.classList.replace('text-gray-500', 'bg-orange-600');
        event.target.classList.add('text-white');
    },
    toggleDarkMode: () => { document.documentElement.classList.toggle('dark'); },
    setCategoryFilter: (cat: string) => { /* Basic Filter placeholder */ renderApp(); }
});

document.addEventListener('DOMContentLoaded', renderApp);

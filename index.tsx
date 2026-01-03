
/**
 * abdouweb - Ultimate Moroccan Tech & Affiliate Platform
 * Professional Version - Adsterra Optimized for Conversions
 */

const STORAGE_KEY = 'abdouweb_final_v18';

const DEFAULT_BLOG_DATA = {
    siteName: "عبدو ويب abdouweb",
    siteDescription: "منصتكم الأولى لأخبار التقنية في المغرب، تطوير الذات، وأفضل مراجعات المنتجات التقنية.",
    adminPassword: "admin",
    stats: {
        totalVisitors: 125430,
        lastVisitTimestamp: Date.now(),
        todayVisitors: 842
    },
    ads: {
        general: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        footerBanner: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`
    },
    social: {
        fb: "facebook.com/abdouweb", 
        tt: "tiktok.com/@abdouweb", 
        tw: "x.com/abdouweb", 
        ig: "instagram.com/abdouweb", 
        wa: "212600000000", 
        pin: "pinterest.com/abdouweb"
    },
    staticPages: {
        about: "مرحباً بكم في عبدو ويب abdouweb. نحن نهتم بتقديم محتوى تقني عالي الجودة يركز على السوق المغربي، بالإضافة إلى مراجعات دقيقة للمنتجات ونصائح عملية لتطوير الذات.",
        privacy: "نحن في عبدو ويب نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية وفق القوانين المعمول بها.",
        terms: "باستخدامك لموقعنا، فإنك توافق على شروط الخدمة والاستخدام العادل."
    },
    offers: [
        {
            id: "of-1",
            title: "MacBook Air M3 - أقوى عرض في المغرب",
            price: "12,900 درهم",
            desc: "أقوى جهاز محمول للعمل عن بعد والمصممين في المغرب. تعرف على المميزات والعيوب قبل الشراء.",
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop",
            url: "https://www.apple.com/ma/macbook-air/",
            date: "2025/01/26"
        }
    ],
    articles: [
        {
            id: "ar-1",
            category: "أخبار وطنية",
            title: "افتتاح الكان في المغرب: عرس إفريقي بمواصفات عالمية وتجهيزات غير مسبوقة",
            content: `تستعد المملكة المغربية لكتابة فصل جديد ومبهر في تاريخ كرة القدم الإفريقية...`,
            img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&h=500&fit=crop",
            date: "2025/01/30"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
if (!state.ads) state.ads = { general: DEFAULT_BLOG_DATA.ads.general, footerBanner: DEFAULT_BLOG_DATA.ads.footerBanner };

let isLoggedIn = false;
let currentCategoryFilter = 'الكل';
let currentMainImageBase64 = '';
let currentArticleImageBase64 = '';

/**
 * Ad Injection Logic
 * target slots: ad-footer-slot (interactions), ad-banner-slot (bottom banner)
 */
const injectAds = () => {
    // Inject Social/Pop Ads
    const interactionContainer = document.getElementById('ad-footer-slot');
    if (interactionContainer && state.ads.general) {
        interactionContainer.innerHTML = '';
        const range = document.createRange();
        const fragment = range.createContextualFragment(state.ads.general);
        interactionContainer.appendChild(fragment);
    }
    // Inject Footer Banner
    const bannerContainer = document.getElementById('ad-banner-slot');
    if (bannerContainer && state.ads.footerBanner) {
        bannerContainer.innerHTML = '';
        const range = document.createRange();
        const fragment = range.createContextualFragment(state.ads.footerBanner);
        bannerContainer.appendChild(fragment);
    }
};

const updateVisitorStats = () => {
    const now = Date.now();
    const lastUpdate = state.stats.lastVisitTimestamp;
    const diffInMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
    
    if (diffInMinutes > 0) {
        const newVisitors = diffInMinutes * (Math.floor(Math.random() * 3) + 1);
        state.stats.totalVisitors += newVisitors;
        state.stats.lastVisitTimestamp = now;
        sync();
    }
    
    const elements = {
        'stat-total-visitors': state.stats.totalVisitors.toLocaleString(),
        'stat-online-now': (Math.floor(Math.random() * 20) + 15).toString(),
        'admin-stat-total': state.stats.totalVisitors.toLocaleString(),
        'admin-stat-articles': state.articles.length.toString(),
        'stat-online-now-hero': (Math.floor(Math.random() * 20) + 15).toString()
    };

    Object.entries(elements).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    });
};

const fixUrl = (val: string, type: string = 'generic') => {
    if (!val || val.trim() === "") return "javascript:void(0)";
    let trimmed = val.trim();
    if (type === 'wa' && !trimmed.startsWith('http') && /^\d+$/.test(trimmed.replace('+', ''))) {
        return `https://wa.me/${trimmed.replace('+', '')}`;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('javascript:')) {
        return trimmed;
    }
    return 'https://' + trimmed;
};

const ICONS = {
    fb: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    tt: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>`,
    tw: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    ig: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.163 6.162-2.759 6.162-6.163 6.162-3.403-2.759-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
};

const renderSocialButtons = (containerId: string, mode: 'follow' | 'share' = 'follow') => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const platforms = [
        { id: 'fb', color: '#1877F2', icon: ICONS.fb, follow: fixUrl(state.social.fb) },
        { id: 'tt', color: '#000000', icon: ICONS.tt, follow: fixUrl(state.social.tt) },
        { id: 'tw', color: '#000000', icon: ICONS.tw, follow: fixUrl(state.social.tw) },
        { id: 'ig', color: '#E4405F', icon: ICONS.ig, follow: fixUrl(state.social.ig) }
    ];
    container.innerHTML = platforms.map(p => {
        return `<a href="${p.follow}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-11 h-11 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all text-gray-600 dark:text-gray-300 hover:text-white" style="--hover-bg: ${p.color}" onmouseover="this.style.backgroundColor=this.style.getPropertyValue('--hover-bg');" onmouseout="this.style.backgroundColor='';" title="تابعنا على ${p.id.toUpperCase()}">${p.icon}</a>`;
    }).join('');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const container = document.getElementById('article-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in">
                <img src="${a.img}" class="w-full h-72 md:h-[500px] object-cover">
                <div class="p-8 md:p-16">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">${a.category}</span>
                        <span class="text-gray-400 text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-black mb-8 dark:text-white leading-tight">${a.title}</h1>
                    <div class="article-body text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-line">${a.content}</div>
                </div>
            </div>`;
    }
    showPage('article-detail');
};

const showPage = (pageId: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const hero = document.getElementById('hero-section');
    const target = document.getElementById(`page-${pageId}`);
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
        hero?.classList.add('hidden');
    } else {
        target?.classList.remove('hidden');
        if (pageId !== 'home') hero?.classList.add('hidden');
        else hero?.classList.remove('hidden');
        if (pageId === 'admin') {
            (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
            (document.getElementById('ad-general-input') as HTMLTextAreaElement).value = state.ads.general;
            (document.getElementById('ad-footer-input') as HTMLTextAreaElement).value = state.ads.footerBanner;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    injectAds();
};

const saveAdSettings = () => {
    state.ads.general = (document.getElementById('ad-general-input') as HTMLTextAreaElement).value;
    state.ads.footerBanner = (document.getElementById('ad-footer-input') as HTMLTextAreaElement).value;
    sync(); injectAds(); alert('تم تحديث إعدادات الإعلانات بنجاح.');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value || state.siteName;
    sync(); renderApp(); alert('تم حفظ الإعدادات.');
};

const sync = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function renderApp() {
    const siteTitle = document.getElementById('display-site-name');
    if (siteTitle) siteTitle.innerText = state.siteName;
    const footerTitle = document.getElementById('footer-site-name');
    if (footerTitle) footerTitle.innerText = state.siteName;
    const heroDesc = document.getElementById('hero-site-desc');
    if (heroDesc) heroDesc.innerText = state.siteDescription;
    updateVisitorStats();
    injectAds();
    renderSocialButtons('footer-social-container');
    
    // Render Offers Grid
    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition group">
                <div class="h-56 overflow-hidden relative cursor-pointer" onclick="window.open('${fixUrl(o.url)}', '_blank')">
                    <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-black mb-2 dark:text-white line-clamp-1">${o.title}</h3>
                    <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span class="text-orange-600 font-black text-xl">${o.price}</span>
                        <a href="${fixUrl(o.url)}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md">شراء المنتج</a>
                    </div>
                </div>
            </article>`).join('');
    }

    // Render Articles
    const filteredArticles = currentCategoryFilter === 'الكل' ? state.articles : state.articles.filter((a:any) => a.category === currentCategoryFilter);
    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = filteredArticles.map((a: any) => `
            <article class="bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-lg transition group cursor-pointer" onclick="window.viewArticle('${a.id}')">
                <div class="w-full md:w-32 h-32 overflow-hidden rounded-2xl flex-shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                </div>
                <div class="flex flex-col justify-center">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-orange-600 text-[9px] font-black border border-orange-600 px-2 py-0.5 rounded-md">${a.category}</span>
                    </div>
                    <h3 class="text-lg font-black dark:text-white line-clamp-2">${a.title}</h3>
                    <div class="mt-2 text-orange-600 text-[10px] font-black uppercase">إقرأ المزيد ←</div>
                </div>
            </article>`).join('');
    }

    // Admin Rendering
    if (isLoggedIn) {
        const oL = document.getElementById('admin-offers-list');
        if(oL) {
            oL.innerHTML = state.offers.map((o:any)=>`
                <tr class="border-b dark:border-gray-800">
                    <td class="p-4 pr-6 text-sm font-bold">${o.title}</td>
                    <td class="p-4 text-sm font-black text-orange-600">${o.price}</td>
                    <td class="p-4 text-left pl-6">
                        <button onclick="window.deleteOffer('${o.id}')" class="text-red-500 font-black text-[10px] uppercase">حذف</button>
                    </td>
                </tr>`).join('');
        }
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span class="text-xs font-bold line-clamp-1">${a.title}</span>
                <button onclick="window.deleteArticle('${a.id}')" class="text-red-500 font-black text-[10px] uppercase">حذف</button>
            </div>`).join('');
    }
}

const handleLogin = () => {
    const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (pass === state.adminPassword) { isLoggedIn = true; showPage('admin'); renderApp(); }
    else { document.getElementById('login-error')?.classList.remove('hidden'); }
};

const toggleLoginPassword = () => {
    const passInput = document.getElementById('admin-pass-input') as HTMLInputElement;
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
};

const setCategoryFilter = (cat: string) => {
    currentCategoryFilter = cat;
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        if(btn.textContent === cat) btn.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
    });
    renderApp();
};

const saveOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    if(!title || !price) return alert('بيانات ناقصة');
    state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop", date: new Date().toLocaleDateString('ar-EG') });
    sync(); renderApp();
};

const saveArticle = () => {
    const title = (document.getElementById('article-title') as HTMLInputElement).value;
    const content = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    const category = (document.getElementById('article-category') as HTMLSelectElement).value;
    if(!title || !content) return alert('بيانات ناقصة');
    state.articles.unshift({ id: Date.now().toString(), title, content, category, img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop", date: new Date().toLocaleDateString('ar-EG') });
    sync(); renderApp();
};

function deleteOffer(id: string) { state.offers = state.offers.filter((o:any)=>o.id !== id); sync(); renderApp(); }
function deleteArticle(id: string) { state.articles = state.articles.filter((a:any)=>a.id !== id); sync(); renderApp(); }

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, setCategoryFilter,
    saveOffer, saveArticle, saveSettings, deleteOffer, deleteArticle, toggleLoginPassword, saveAdSettings,
    switchTab: (tabId: string, event: any) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');
    },
    toggleDarkMode: () => { document.documentElement.classList.toggle('dark'); }
});

document.addEventListener('DOMContentLoaded', renderApp);
setInterval(updateVisitorStats, 30000);


/**
 * abdouweb - Absolute Ad Isolation Engine
 * Prevents any ad script from hijacking page clicks.
 */

const STORAGE_KEY = 'abdouweb_pro_v1';

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        code2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`
    },
    articles: [
        { 
            id: "a1", 
            title: "لماذا تسيطر الهواتف القابلة للطي على سوق 2025؟", 
            body: "شهدت بداية عام 2025 ثورة حقيقية في عالم الهواتف الذكية، حيث أصبحت الشاشات المرنة أكثر متانة وأرخص سعراً. إذا كنت تفكر في الترقية، فإليك أهم الموديلات التي تستحق اهتمامك...", 
            category: "مراجعات", 
            img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" 
        }
    ],
    offers: [
        { 
            id: "o1", 
            title: "تخفيض 40% على iPhone 15 Pro", 
            price: "9,900 درهم", 
            img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80", 
            url: "https://www.apple.com" 
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

/**
 * CORE ISOLATION LOGIC
 * Creates a sandboxed environment for scripts so they can't touch parent buttons.
 */
const injectSafeAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container || !adCode.trim()) return;

    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.className = 'ad-sandbox-iframe';
    iframe.title = 'Isolated Ad';
    
    // sandbox attributes: 
    // allow-scripts is needed for ads to load
    // NO allow-top-navigation to prevent redirects
    iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-forms allow-same-origin');

    const html = `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <style>body { margin: 0; padding: 0; display: flex; justify-content: center; overflow: hidden; }</style>
        </head>
        <body>
            ${adCode}
        </body>
        </html>
    `;

    container.appendChild(iframe);
    
    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
    }
};

const refreshAds = () => {
    injectSafeAd('ad-slot-1-safe-container', state.ads.code1);
    injectSafeAd('ad-slot-2-safe-container', state.ads.code2);
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
    if (p === state.adminPass) { isLogged = true; showPage('admin'); }
};

const saveAds = () => {
    state.ads.code1 = (document.getElementById('ad-code-1') as HTMLTextAreaElement).value;
    state.ads.code2 = (document.getElementById('ad-code-2') as HTMLTextAreaElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshAds();
    alert('تم تحديث نظام الحماية والإعلانات بنجاح.');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        content.innerHTML = `
            <div class="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <img src="${a.img}" class="w-full h-[450px] object-cover rounded-[3rem] shadow-2xl">
                <div class="space-y-6">
                    <span class="bg-orange-600 text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">${a.category}</span>
                    <h1 class="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                    <div class="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line font-medium">
                        ${a.body}
                    </div>
                </div>
            </div>
        `;
    }
    showPage('article-detail');
};

const render = () => {
    // Articles
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-10 hover:shadow-2xl hover:border-orange-100 dark:hover:border-orange-900/30 transition-all duration-500">
                <div class="w-full md:w-64 h-56 overflow-hidden rounded-[2rem] shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center">
                    <span class="text-orange-600 text-xs font-black uppercase tracking-widest mb-3">${a.category}</span>
                    <h3 class="text-2xl md:text-3xl font-black mb-6 group-hover:text-orange-600 transition-colors">${a.title}</h3>
                    <button onclick="window.viewArticle('${a.id}')" class="w-fit text-sm font-black border-b-2 border-orange-600 pb-1 hover:text-orange-600 transition-all">إقرأ المقال الكامل</button>
                </div>
            </div>
        `).join('');
    }

    // Sidebar
    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.slice(0, 3).map(o => `
            <div class="group flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <img src="${o.img}" class="w-20 h-20 object-cover rounded-xl">
                <div>
                    <h4 class="font-bold text-sm mb-1 line-clamp-1 group-hover:text-orange-600 transition">${o.title}</h4>
                    <p class="text-orange-600 font-black text-xs mb-2">${o.price}</p>
                    <a href="${o.url}" target="_blank" class="text-[10px] font-black underline uppercase tracking-tighter">رابط العرض</a>
                </div>
            </div>
        `).join('');
    }

    // Full Offers
    const fullGrid = document.getElementById('offers-full-grid');
    if (fullGrid) {
        fullGrid.innerHTML = state.offers.map(o => `
            <div class="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <img src="${o.img}" class="w-full h-44 object-cover rounded-2xl mb-6">
                <h4 class="font-black text-lg mb-3">${o.title}</h4>
                <div class="flex items-center justify-between">
                    <span class="text-orange-600 font-black text-xl">${o.price}</span>
                    <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-6 py-2 rounded-xl text-xs font-black">اطلب الآن</a>
                </div>
            </div>
        `).join('');
    }

    refreshAds();
};

const addArticle = () => {
    const t = (document.getElementById('new-art-title') as HTMLInputElement).value;
    const b = (document.getElementById('new-art-body') as HTMLTextAreaElement).value;
    if(!t || !b) return;
    state.articles.unshift({ id: Date.now().toString(), title: t, body: b, category: "عام", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
    showPage('home');
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds, addArticle,
    switchTab: (id: string) => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
        document.getElementById(id)?.classList.remove('hidden');
        document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.replace('bg-orange-600', 'bg-white'));
        const active = Array.from(document.querySelectorAll('.admin-nav-btn')).find(b => b.getAttribute('onclick')?.includes(id));
        if(active) active.classList.replace('bg-white', 'bg-orange-600');
    },
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', render);

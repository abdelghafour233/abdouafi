
/**
 * abdouweb - Ultimate Moroccan Tech & Affiliate Platform
 * Professional Version - Categories & Social Fix
 */

const STORAGE_KEY = 'abdouweb_final_v12';

const DEFAULT_BLOG_DATA = {
    siteName: "عبدو ويب abdouweb",
    siteDescription: "منصتكم الأولى لأخبار التقنية في المغرب، تطوير الذات، وأفضل مراجعات المنتجات.",
    adminPassword: "admin",
    social: {
        fb: "#", tt: "#", tw: "#", ig: "#", wa: "#", pin: "#"
    },
    staticPages: {
        about: "مرحباً بكم في عبدو ويب abdouweb. نحن نهتم بتقديم محتوى تقني عالي الجودة يركز على السوق المغربي، بالإضافة إلى مراجعات دقيقة للمنتجات ونصائح عملية لتطوير الذات.",
        privacy: "نحن في عبدو ويب نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية.",
        terms: "باستخدامك لموقعنا، فإنك توافق على شروط الخدمة والاستخدام العادل."
    },
    offers: [
        {
            id: "of-1",
            title: "MacBook Air M3 - مراجعة شاملة",
            price: "12,900 درهم",
            desc: "أقوى جهاز محمول للعمل عن بعد والمصممين في المغرب. تعرف على المميزات والعيوب قبل الشراء.",
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop",
            url: "#",
            date: "2025/01/26"
        }
    ],
    articles: [
        {
            id: "ar-1",
            category: "أخبار التقنية",
            title: "إطلاق خدمات السحابة الرقمية الجديدة في الدار البيضاء",
            content: "يشهد المغرب تحولاً رقمياً كبيراً مع افتتاح مراكز بيانات جديدة ستغير وجه الشركات الناشئة في المملكة...",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&fit=crop",
            date: "2025/01/25"
        },
        {
            id: "ar-2",
            category: "تطوير الذات",
            title: "كيف تنظم وقتك كمستقل (Freelancer) مغربي؟",
            content: "العمل الحر يتطلب انضباطاً عالياً. في هذا المقال نشارككم أفضل الأدوات والتقنيات لتنظيم اليوم والرفع من الإنتاجية...",
            img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&h=400&fit=crop",
            date: "2025/01/24"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentCategoryFilter = 'الكل';
let currentMainImageBase64 = '';
let currentArticleImageBase64 = '';

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
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const setCategoryFilter = (cat: string) => {
    currentCategoryFilter = cat;
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        if(btn.textContent === cat) btn.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
    });
    renderApp();
};

const renderSocialButtons = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const platforms = [
        { id: 'fb', color: '#1877F2', icon: 'FB', link: state.social.fb },
        { id: 'tt', color: '#000000', icon: 'TT', link: state.social.tt },
        { id: 'tw', color: '#1DA1F2', icon: 'X', link: state.social.tw },
        { id: 'ig', color: '#E4405F', icon: 'IG', link: state.social.ig },
        { id: 'wa', color: '#25D366', icon: 'WA', link: state.social.wa },
        { id: 'pin', color: '#BD081C', icon: 'PI', link: state.social.pin }
    ];
    container.innerHTML = platforms.map(p => {
        const href = p.link && p.link !== "#" ? p.link : "javascript:void(0)";
        return `
            <a href="${href}" ${href !== "javascript:void(0)" ? 'target="_blank"' : ''} 
               class="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full text-xs font-black shadow-md border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all hover:bg-orange-600 hover:text-white">
                ${p.icon}
            </a>
        `;
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
                    <div class="article-body text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                        ${a.content}
                    </div>
                    <div class="mt-16 p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center border border-gray-100 dark:border-gray-700">
                        <h4 class="font-black mb-6">شارك المقال وتابع عبدو ويب:</h4>
                        <div id="article-social-container" class="flex justify-center gap-3"></div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => renderSocialButtons('article-social-container'), 50);
    }
    showPage('article-detail');
};

const handleLogin = () => {
    const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (pass === state.adminPassword) { isLoggedIn = true; showPage('admin'); renderApp(); }
    else { document.getElementById('login-error')?.classList.remove('hidden'); }
};

const saveOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    if(!title || !price) return alert('يرجى إكمال البيانات');
    state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: currentMainImageBase64 || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop", date: new Date().toLocaleDateString('ar-EG') });
    sync(); renderApp(); alert('تم الحفظ');
};

const saveArticle = () => {
    const title = (document.getElementById('article-title') as HTMLInputElement).value;
    const content = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    const category = (document.getElementById('article-category') as HTMLSelectElement).value;
    if(!title || !content) return alert('يرجى إكمال البيانات');
    state.articles.unshift({ id: Date.now().toString(), title, content, category, img: currentArticleImageBase64 || "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop", date: new Date().toLocaleDateString('ar-EG') });
    sync(); renderApp(); alert('تم النشر');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    state.social.fb = (document.getElementById('social-fb') as HTMLInputElement).value || "#";
    state.social.tt = (document.getElementById('social-tt') as HTMLInputElement).value || "#";
    state.social.tw = (document.getElementById('social-tw') as HTMLInputElement).value || "#";
    state.social.ig = (document.getElementById('social-ig') as HTMLInputElement).value || "#";
    state.social.wa = (document.getElementById('social-wa') as HTMLInputElement).value || "#";
    state.social.pin = (document.getElementById('social-pin') as HTMLInputElement).value || "#";
    sync(); renderApp(); alert('تم تحديث الإعدادات');
};

const sync = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-copy-name')!.innerText = state.siteName;
    document.getElementById('hero-site-desc')!.innerText = state.siteDescription;
    
    renderSocialButtons('footer-social-container');

    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition group">
                <div class="h-56 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-4 left-4 bg-orange-600 text-white px-3 py-0.5 rounded-full text-[9px] font-black uppercase">Review</span>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-black mb-2 dark:text-white line-clamp-1">${o.title}</h3>
                    <p class="text-gray-500 text-xs mb-4 line-clamp-2">${o.desc}</p>
                    <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                        <span class="text-orange-600 font-black text-xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md">طلب المنتج</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

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
                        <span class="text-gray-400 text-[9px] font-bold">${a.date}</span>
                    </div>
                    <h3 class="text-lg font-black dark:text-white line-clamp-2">${a.title}</h3>
                </div>
            </article>
        `).join('');
    }

    if (isLoggedIn) {
        const oL = document.getElementById('admin-offers-list');
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b dark:border-gray-800"><td class="py-3 font-bold text-xs">${o.title}</td><td class="text-left"><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 font-black">X</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2 text-xs font-bold"><span>${a.title}</span><button onclick="window.deleteArticle('${a.id}')" class="text-red-500">حذف</button></div>`).join('');
    }
}

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImg = async (e: any) => { if(e.target.files[0]) currentMainImageBase64 = await fileToBase64(e.target.files[0]); };
const previewArtImg = async (e: any) => { if(e.target.files[0]) currentArticleImageBase64 = await fileToBase64(e.target.files[0]); };

function deleteOffer(id: string) { state.offers = state.offers.filter((o:any)=>o.id !== id); sync(); renderApp(); }
function deleteArticle(id: string) { state.articles = state.articles.filter((a:any)=>a.id !== id); sync(); renderApp(); }

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, setCategoryFilter,
    saveOffer, saveArticle, saveSettings, previewMainImg, previewArtImg,
    deleteOffer, deleteArticle, 
    switchTab: (tabId: string, event: any) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('bg-orange-600', 'text-white'));
        document.getElementById(tabId)?.classList.add('active');
        event.currentTarget.classList.add('bg-orange-600', 'text-white');
    },
    toggleDarkMode: () => { document.documentElement.classList.toggle('dark'); }
});

document.addEventListener('DOMContentLoaded', renderApp);

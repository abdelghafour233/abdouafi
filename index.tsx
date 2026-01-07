
/**
 * abdouweb - Affiliate Revenue Platform
 * Strategy: Monetag (Direct Link + Global Tag) - CLEAN PERFORMANCE
 */

const STORAGE_KEY = 'abdouweb_hybrid_v14'; 

const INITIAL_DATA = {
    siteName: "عبدو ويب Pro",
    adminPass: "admin",
    ads: {
        smartlink1: "https://otieu.com/4/10428641",
        monetagTag: `<script>(function(s){s.dataset.zone='10430750',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>`
    },
    articles: [
        {
            id: "win-iphone-2025",
            title: "مسابقة عبدو ويب: كيف تحصل على آيفون 16 برو مجاناً؟",
            body: `بمناسبة العام الجديد، نطلق أكبر مسابقة لتوزيع الجوائز التقنية. الشروط بسيطة جداً ولا تتطلب دفع أي رسوم.

1. التسجيل في القائمة البريدية للحصول على رقم الاشتراك.
2. مشاركة المقال مع أصدقائك عبر المنصات الاجتماعية.
3. النقر على زر "تأكيد الاشتراك" بالأسفل.

لماذا نقوم بذلك؟ نحن في عبدو ويب نسعى لبناء أكبر مجتمع تقني عربي، ودعمكم هو الوقود الذي يحركنا.`,
            category: "مسابقات",
            img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80"
        },
        {
            id: "fast-profit-2025",
            title: "أفضل طرق الربح من الإنترنت للمبتدئين في 2025 (بدون رأس مال)",
            body: `العمل الحر، الأفلييت، وإنشاء المحتوى.. هذه هي الأعمدة الثلاثة للثراء الرقمي اليوم. في هذا الدليل، نكشف لك كيف تبدأ أول مشروع لك وتجني أول 100 دولار.

- استغلال منصات الـ Short-form content.
- استراتيجية الـ Smartlinks وتوجيه الترافيك.
- الذكاء الاصطناعي وكيف يختصر عليك 90% من الجهد.

اضغط على الزر بالأسفل لتحميل ملف "خطة الـ 30 يوماً" مجاناً.`,
            category: "استراتيجيات الربح",
            img: "https://images.unsplash.com/photo-1554224155-16974a4ea2b5?w=800&q=80"
        }
    ],
    offers: [
        { id: "o1", title: "كوبون خصم نون 90%", price: "مجاني", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400", url: "#" },
        { id: "o2", title: "بطاقة جوجل بلاي 50$", price: "0 ريال", img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400", url: "#" }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

// Helpers to inject scripts dynamically
const injectScriptTag = (adCode: string) => {
    if (!adCode) return;
    const container = document.getElementById('monetag-injection-point');
    if (!container) return;
    
    container.innerHTML = adCode;
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.innerHTML = oldScript.innerHTML;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
};

// SOCIAL PROOF SYSTEM
const winners = [
    { name: "محمد ع.", action: "حصل على بطاقة جوجل 50$", time: "قبل دقيقتين" },
    { name: "سارة م.", action: "فازت بآيفون 16 برو", time: "الآن" },
    { name: "أحمد ك.", action: "استلم كود خصم 90%", time: "قبل 5 دقائق" },
    { name: "ياسين هـ.", action: "قام بتحميل ملف الربح", time: "قبل ثوانٍ" }
];

const showSocialProof = () => {
    const toast = document.getElementById('social-proof-toast');
    if (!toast) return;
    
    const randomWinner = winners[Math.floor(Math.random() * winners.length)];
    const nameEl = toast.querySelector('.winner-name');
    const actionEl = toast.querySelector('.winner-action');
    const timeEl = toast.querySelector('.winner-time');
    
    if (nameEl) nameEl.textContent = randomWinner.name;
    if (actionEl) actionEl.textContent = randomWinner.action;
    if (timeEl) timeEl.textContent = randomWinner.time;
    
    toast.classList.remove('translate-y-full', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-full', 'opacity-0');
    }, 5000);
};

// VIRAL ENGINE
const getShareButtonsHtml = (title: string, id: string) => {
    const url = `${window.location.origin}?art=${id}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    return `
        <div class="viral-box bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 text-center my-8">
            <h4 class="text-sm font-black mb-4">شارك هذا المحتوى عبر منصاتك المفضلة</h4>
            <div class="flex flex-wrap justify-center gap-3">
                <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">
                    واتساب
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="bg-[#1877F2] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">
                    فيسبوك
                </a>
                <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" class="bg-black text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">
                    تويتر (X)
                </a>
                <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="bg-[#0088cc] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">
                    تلغرام
                </a>
                <a href="https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}" target="_blank" class="bg-[#BD081C] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">
                    بنتريست
                </a>
            </div>
        </div>
    `;
};

const initRevenueEngine = () => {
    setInterval(showSocialProof, 25000); 
    setTimeout(showSocialProof, 3000);
    injectScriptTag(state.ads.monetagTag);
};

const refreshGlobalAds = () => {
    setTimeout(() => {
        const monetagLink = state.ads.smartlink1;
        document.querySelectorAll('.revenue-link').forEach((el: any) => el.href = monetagLink);
    }, 400);
};

const showPage = (id: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${id}`);
    if (id === 'admin' && !isLogged) document.getElementById('page-login')?.classList.remove('hidden');
    else if (target) {
        target.classList.remove('hidden');
        if (id === 'admin') {
            (document.getElementById('ad-smartlink-1') as HTMLInputElement).value = state.ads.smartlink1 || "";
            (document.getElementById('ad-monetag-tag') as HTMLTextAreaElement).value = state.ads.monetagTag || "";
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
    refreshGlobalAds();
};

const handleLogin = () => {
    const p = (document.getElementById('admin-pass') as HTMLInputElement).value;
    if (p === state.adminPass) { isLogged = true; showPage('admin'); }
};

const saveAds = () => {
    state.ads.smartlink1 = (document.getElementById('ad-smartlink-1') as HTMLInputElement).value;
    state.ads.monetagTag = (document.getElementById('ad-monetag-tag') as HTMLTextAreaElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    injectScriptTag(state.ads.monetagTag);
    alert('تم تحديث الإعدادات بنجاح!');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        content.innerHTML = `
            <div class="space-y-8 animate-in fade-in duration-700">
                <img src="${a.img}" class="w-full h-[300px] md:h-[550px] object-cover rounded-[3rem] shadow-2xl">
                <div class="max-w-3xl mx-auto space-y-8">
                    <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                    <div class="text-lg md:text-2xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${a.body}</div>
                    ${getShareButtonsHtml(a.title, a.id)}
                    <div class="my-10 flex flex-col items-center gap-6 p-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-[3rem] text-white shadow-2xl">
                        <div class="text-center space-y-2">
                            <h3 class="text-2xl md:text-3xl font-black">الرابط المباشر جاهز الآن</h3>
                        </div>
                        <a href="${state.ads.smartlink1}" target="_blank" class="revenue-link w-full text-center bg-white text-blue-800 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all">
                             انتقل للعرض الآن 🚀
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all mb-10 overflow-hidden">
                <div class="w-full md:w-72 h-60 overflow-hidden rounded-[2.5rem] shrink-0 cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <div onclick="window.viewArticle('${a.id}')" class="cursor-pointer">
                        <span class="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest">${a.category}</span>
                        <h3 class="text-2xl md:text-3xl font-black mb-4 group-hover:text-blue-600 transition-colors leading-tight">${a.title}</h3>
                        <p class="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    </div>
                    <button onclick="window.viewArticle('${a.id}')" class="bg-gray-900 dark:bg-blue-600 text-white w-fit px-8 py-3 rounded-2xl font-black text-xs hover:scale-105 transition-all">اقرأ المزيد</button>
                </div>
            </div>
        `).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.map(o => `
            <div class="group flex gap-4 items-center p-4 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer mb-3" onclick="window.showPage('offers')">
                <img src="${o.img}" class="w-16 h-16 object-cover rounded-2xl shrink-0">
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-black text-sm mb-1 truncate">${o.title}</h4>
                    <p class="font-black text-xs opacity-70">${o.price}</p>
                </div>
            </div>
        `).join('');
    }
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds,
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    refreshGlobalAds();
    initRevenueEngine(); 
    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('art');
    if (artId) setTimeout(() => viewArticle(artId), 500);
});

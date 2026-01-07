
/**
 * abdouweb - Ultimate Revenue Machine (HYBRID MAXIMIZER V13)
 * Strategy: Monetag (Popunder & Smartlink) + Adsterra (Social Bar & Banners)
 */

const STORAGE_KEY = 'abdouweb_hybrid_v13'; 

const INITIAL_DATA = {
    siteName: "عبدو ويب Pro",
    adminPass: "admin",
    ads: {
        // Adsterra Passive Ads (Banners/Social Bar)
        code1: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        code2: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        socialBar: `<script src="https://bouncingbuzz.com/3d/40/12/3d4012bf393d5dde160f3b0dd073d124.js"></script>`,
        // Monetag Active Ads (Direct Link/Popunder)
        smartlink1: "https://otieu.com/4/10428459"
    },
    articles: [
        {
            id: "win-iphone-2025",
            title: "مسابقة عبدو ويب: كيف تحصل على آيفون 16 برو مجاناً؟",
            body: `بمناسبة العام الجديد، نطلق أكبر مسابقة لتوزيع الجوائز التقنية. الشروط بسيطة جداً ولا تتطلب دفع أي رسوم.

1. التسجيل في القائمة البريدية للحصول على رقم الاشتراك.
2. مشاركة المقال مع 5 من أصدقائك عبر الواتساب.
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
let hasPopped = false;

// VIRAL ENGINE: Enhances click rate by making links social-ready
const getShareButtonsHtml = (title: string, id: string) => {
    const url = `${window.location.origin}?art=${id}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    return `
        <div class="viral-box bg-white dark:bg-gray-900 border-2 border-blue-600/20 rounded-[2rem] p-6 text-center my-8 shadow-xl">
            <h4 class="text-sm font-black mb-4 flex items-center justify-center gap-2">
                <span class="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                شارك لفتح الرابط المباشر
            </h4>
            <div class="flex flex-wrap justify-center gap-3">
                <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" onclick="window.recordShare()" class="bg-[#25D366] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition shadow-lg">
                    واتساب
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" onclick="window.recordShare()" class="bg-[#1877F2] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition shadow-lg">
                    فيسبوك
                </a>
            </div>
            <p class="text-[10px] text-gray-400 mt-4 font-medium italic">المشاركة تضمن تفعيل رابط السيرفر المباشر</p>
        </div>
    `;
};

// HYBRID REVENUE ENGINE: Managed Popunder to avoid conflicts
const initRevenueEngine = () => {
    document.addEventListener('click', (e) => {
        // Only trigger pop if it's not a logged admin and haven't popped recently
        if (!hasPopped && state.ads.smartlink1 && !isLogged) {
            // Priority given to Monetag for the main popunder
            window.open(state.ads.smartlink1, '_blank');
            hasPopped = true;
            // Anti-spam timeout: won't pop again for 2 minutes to keep users happy
            setTimeout(() => { hasPopped = false; }, 120000); 
        }
    }, { once: false });
};

const injectAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!adCode || adCode.trim() === "") {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';
    container.innerHTML = ''; 
    const wrapper = document.createElement('div');
    wrapper.innerHTML = adCode;
    
    const scripts = Array.from(wrapper.querySelectorAll('script'));
    const elements = Array.from(wrapper.childNodes).filter(node => node.nodeName !== 'SCRIPT');
    
    elements.forEach(node => container.appendChild(node.cloneNode(true)));
    
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
        } else if (oldScript.src) {
            newScript.src = oldScript.src;
        }
        container.appendChild(newScript);
    });
};

const refreshGlobalAds = () => {
    setTimeout(() => {
        // Adsterra Slots
        injectAd('top-global-ad', state.ads.code1);
        injectAd('sidebar-ad-slot', state.ads.code2);
        injectAd('social-bar-container', state.ads.socialBar);
        
        // Monetag Slots (Direct Links)
        const monetagLink = state.ads.smartlink1;
        document.querySelectorAll('.revenue-link').forEach((el: any) => {
            el.href = monetagLink;
        });
        
        const hLink = document.getElementById('header-smart-link') as HTMLAnchorElement;
        const tLink = document.getElementById('ticker-link') as HTMLAnchorElement;
        const qLink = document.getElementById('footer-smart-link') as HTMLAnchorElement;
        if (hLink) hLink.href = monetagLink;
        if (tLink) tLink.href = monetagLink;
        if (qLink) qLink.href = monetagLink;
    }, 400);
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
            (document.getElementById('ad-social-bar') as HTMLTextAreaElement).value = state.ads.socialBar;
            (document.getElementById('ad-smartlink-1') as HTMLInputElement).value = state.ads.smartlink1;
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
    state.ads.code1 = (document.getElementById('ad-code-1') as HTMLTextAreaElement).value;
    state.ads.code2 = (document.getElementById('ad-code-2') as HTMLTextAreaElement).value;
    state.ads.socialBar = (document.getElementById('ad-social-bar') as HTMLTextAreaElement).value;
    state.ads.smartlink1 = (document.getElementById('ad-smartlink-1') as HTMLInputElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshGlobalAds();
    alert('تم تحديث نظام الأرباح الهجين (Monetag + Adsterra) بنجاح!');
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
                    
                    <div id="top-article-ad" class="ad-slot bg-gray-100/30 dark:bg-gray-800/20 rounded-2xl h-[100px]"></div>

                    <div class="text-lg md:text-2xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${a.body}</div>
                    
                    ${getShareButtonsHtml(a.title, a.id)}

                    <div class="my-10 flex flex-col items-center gap-6 p-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-[3rem] text-white shadow-2xl">
                        <div class="text-center space-y-2">
                            <span class="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-1 rounded-full">حصري لزوار عبدو ويب</span>
                            <h3 class="text-2xl md:text-3xl font-black">الرابط المباشر جاهز الآن</h3>
                        </div>
                        <a href="${state.ads.smartlink1}" target="_blank" class="revenue-link w-full text-center bg-white text-blue-800 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                             انتقل للعرض الآن 🚀
                        </a>
                        <p class="text-[10px] opacity-60">سيتم فتح العرض في نافذة جديدة</p>
                    </div>

                    <div id="in-article-ad-mid" class="ad-slot bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-4 min-h-[100px]"></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            injectAd('top-article-ad', state.ads.code1);
        }, 300);
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all mb-10 relative overflow-hidden">
                <div class="w-full md:w-72 h-60 overflow-hidden rounded-[2.5rem] shrink-0 cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <div onclick="window.viewArticle('${a.id}')" class="cursor-pointer">
                        <span class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest">${a.category}</span>
                        <h3 class="text-2xl md:text-3xl font-black mb-4 group-hover:text-blue-700 transition-colors line-clamp-2 leading-tight">${a.title}</h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <button onclick="window.viewArticle('${a.id}')" class="bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-xs hover:scale-105 transition-all">
                            دخول العرض
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.map(o => `
            <div class="group flex gap-4 items-center p-4 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/40 hover:bg-blue-700 hover:text-white transition cursor-pointer mb-3" onclick="window.open('${state.ads.smartlink1}', '_blank')">
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
    toggleDarkMode: () => document.documentElement.classList.toggle('dark'),
    recordShare: () => {
        console.log("Hybrid Viral Share Logged.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    refreshGlobalAds();
    initRevenueEngine(); 
    
    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('art');
    if (artId) {
        setTimeout(() => viewArticle(artId), 500);
    }
});

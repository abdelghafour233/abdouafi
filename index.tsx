
/**
 * abdouweb - Ultimate Revenue Machine (REVENUE MAXIMIZER V11)
 * Optimized for Monetag Direct Link & Adsterra Hybrid Integration.
 */

const STORAGE_KEY = 'abdouweb_monetag_v11'; 

const INITIAL_DATA = {
    siteName: "عبدو ويب Pro",
    adminPass: "admin",
    ads: {
        // Top Banner / Invoke Code (Adsterra)
        code1: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        // Popunder / OnClick Code (Adsterra)
        code2: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        inArticle1: ``,
        inArticle2: ``,
        // Social Bar / Push (Adsterra)
        socialBar: `<script src="https://bouncingbuzz.com/3d/40/12/3d4012bf393d5dde160f3b0dd073d124.js"></script>`,
        // Your High-CPM Monetag Smartlink
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
            id: "adsterra-vs-monetag-secrets",
            title: "أسرار الربح: أيهما أفضل Adsterra أم Monetag في 2025؟",
            body: `العديد من الناشرين يتساءلون عن المنصة الأكثر ربحية. بعد تجارب دامت لشهور، إليك الخلاصة:

- Adsterra: هي الملكة في إعلانات الـ Social Bar والـ Direct Link. إذا كان زوارك من السوشيال ميديا، فهي الأفضل لك.
- Monetag: تتفوق في إعلانات الـ Popunder للدول الأجنبية وتعطي CPM مرتفع جداً لزوار الـ SEO.

نصيحة عبدو ويب: استخدم Social Bar من Adsterra مع Popunder من Monetag لتحقيق أرباح مضاعفة!`,
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
        <div class="viral-box bg-white dark:bg-gray-900 border-2 border-orange-600/20 rounded-[2rem] p-6 text-center my-8 shadow-xl">
            <h4 class="text-sm font-black mb-4 flex items-center justify-center gap-2">
                <span class="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                شارك لفتح رابط السيرفر السريع
            </h4>
            <div class="flex flex-wrap justify-center gap-3">
                <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" onclick="window.recordShare()" class="bg-[#25D366] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-green-500/30">
                    واتساب
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="bg-[#1877F2] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-blue-600/30">
                    فيسبوك
                </a>
                <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="bg-[#0088cc] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-blue-400/30">
                    تليجرام
                </a>
            </div>
            <p class="text-[10px] text-gray-400 mt-4 font-medium italic">بعد المشاركة، سيتم تفعيل زر التحميل تلقائياً</p>
        </div>
    `;
};

// Revenue Engine: Trigger popunder on ANY interaction
const initRevenueEngine = () => {
    document.addEventListener('click', () => {
        if (!hasPopped && state.ads.smartlink1 && !isLogged) {
            window.open(state.ads.smartlink1, '_blank');
            hasPopped = true;
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
        injectAd('top-global-ad', state.ads.code1);
        injectAd('sidebar-ad-slot', state.ads.code2);
        injectAd('social-bar-container', state.ads.socialBar);
        injectAd('home-native-ad', state.ads.inArticle2);
        
        const hLink = document.getElementById('header-smart-link') as HTMLAnchorElement;
        const sLink = document.getElementById('sidebar-smart-link') as HTMLAnchorElement;
        const tLink = document.getElementById('ticker-link') as HTMLAnchorElement;
        if (hLink) hLink.href = state.ads.smartlink1 || "#";
        if (sLink) sLink.href = state.ads.smartlink1 || "#";
        if (tLink) tLink.href = state.ads.smartlink1 || "#";
    }, 300);
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
            (document.getElementById('ad-in-article-1') as HTMLTextAreaElement).value = state.ads.inArticle1;
            (document.getElementById('ad-in-article-2') as HTMLTextAreaElement).value = state.ads.inArticle2;
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
    state.ads.inArticle1 = (document.getElementById('ad-in-article-1') as HTMLTextAreaElement).value;
    state.ads.inArticle2 = (document.getElementById('ad-in-article-2') as HTMLTextAreaElement).value;
    state.ads.socialBar = (document.getElementById('ad-social-bar') as HTMLTextAreaElement).value;
    state.ads.smartlink1 = (document.getElementById('ad-smartlink-1') as HTMLInputElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshGlobalAds();
    alert('تم تحديث الرابط الذكي وجميع الإعدادات بنجاح!');
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

                    <div class="my-10 flex flex-col items-center gap-6 p-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-[3rem] text-white shadow-2xl shadow-orange-600/30">
                        <div class="text-center space-y-2">
                            <span class="text-xs font-black uppercase tracking-tighter bg-white/20 px-4 py-1 rounded-full">تنبيه: عرض Monetag الحصري</span>
                            <h3 class="text-2xl md:text-3xl font-black">جاهز للمتابعة؟</h3>
                        </div>
                        <a href="${state.ads.smartlink1}" target="_blank" class="w-full text-center bg-white text-orange-600 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                             مشاهدة العرض الآن 
                             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </a>
                    </div>

                    <div id="in-article-ad-mid" class="ad-slot bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-4 min-h-[100px]"></div>

                    <div class="py-12 border-t border-gray-100 dark:border-gray-800">
                        <h4 class="text-xl font-black mb-6">مواضيع قد تهمك:</h4>
                        <div id="related-articles" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            injectAd('in-article-ad-mid', state.ads.inArticle1);
            injectAd('top-article-ad', state.ads.code1);
            
            const rel = document.getElementById('related-articles');
            if (rel) {
                rel.innerHTML = state.articles.filter(x => x.id !== a.id).slice(0, 2).map(r => `
                    <div class="flex gap-4 cursor-pointer hover:opacity-80 transition" onclick="window.viewArticle('${r.id}')">
                        <img src="${r.img}" class="w-20 h-20 object-cover rounded-2xl">
                        <div>
                            <h5 class="font-black text-sm line-clamp-2">${r.title}</h5>
                            <span class="text-orange-600 text-[10px] font-black uppercase">${r.category}</span>
                        </div>
                    </div>
                `).join('');
            }
        }, 300);
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all mb-10 overflow-hidden relative">
                <div class="w-full md:w-72 h-60 overflow-hidden rounded-[2.5rem] shrink-0 cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <div onclick="window.viewArticle('${a.id}')" class="cursor-pointer">
                        <span class="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest">${a.category}</span>
                        <h3 class="text-2xl md:text-3xl font-black mb-4 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">${a.title}</h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <button onclick="window.viewArticle('${a.id}')" class="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-8 py-3 rounded-2xl font-black text-xs hover:scale-105 transition-all">
                            اقرأ الآن
                        </button>
                        <div class="flex gap-2">
                             <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(a.title)}%20${encodeURIComponent(window.location.origin + '?art=' + a.id)}" target="_blank" class="p-3 bg-green-500 text-white rounded-xl hover:scale-110 transition shadow-lg shadow-green-500/20">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                             </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.slice(0, 4).map(o => `
            <div class="group flex gap-4 items-center p-4 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/40 hover:bg-orange-600 hover:text-white transition cursor-pointer mb-3" onclick="window.open('${state.ads.smartlink1}', '_blank')">
                <img src="${o.img}" class="w-16 h-16 object-cover rounded-2xl shrink-0">
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-black text-sm mb-1 truncate">${o.title}</h4>
                    <p class="font-black text-xs opacity-70">${o.price}</p>
                </div>
            </div>
        `).join('');
    }
};

const addArticle = () => {
    const t = (document.getElementById('new-art-title') as HTMLInputElement).value;
    const b = (document.getElementById('new-art-body') as HTMLTextAreaElement).value;
    if(!t || !b) return;
    state.articles.unshift({ id: Date.now().toString(), title: t, body: b, category: "جديد", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showPage('home');
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds, addArticle,
    switchTab: (id: string) => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
        document.getElementById(id)?.classList.remove('hidden');
    },
    toggleDarkMode: () => document.documentElement.classList.toggle('dark'),
    recordShare: () => {
        console.log("Viral share recorded.");
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

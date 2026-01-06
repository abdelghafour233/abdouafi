
/**
 * abdouweb - Ultimate Affiliate & Ad Engine (REVENUE MAXIMIZER V8)
 * Optimized with User-provided Adsterra scripts and Social Sharing.
 */

const STORAGE_KEY = 'abdouweb_revenue_v8'; // Changed to force update with new codes

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        code2: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        inArticle1: ``,
        inArticle2: ``,
        socialBar: `<script src="https://bouncingbuzz.com/3d/40/12/3d4012bf393d5dde160f3b0dd073d124.js"></script>`,
        smartlink1: "https://bouncingbuzz.com/ctpynfts0?key=a6c7eb53025d8d39c467b947581bb153"
    },
    articles: [
        {
            id: "free-ai-tools-2025",
            title: "أفضل 10 أدوات ذكاء اصطناعي مجانية في 2025 (بدائل ChatGPT المدفوعة)",
            body: `هل تبحث عن قوة الذكاء الاصطناعي دون دفع اشتراكات شهرية؟ في هذا المقال الحصري على عبدو ويب، جمعنا لك قائمة بأفضل الأدوات التي تمنحك نتائج احترافية مجاناً تماماً.

1. أداة توليد الصور العصبية:
تعتبر هذه الأداة البديل الأقوى لـ Midjourney، حيث تتيح لك إنشاء صور بدقة 4K عبر أوامر نصية بسيطة. (يمكنك تجربة الأداة عبر رابط الوصول السريع بالأسفل).

2. مساعد البرمجة الذكي:
إذا كنت مبرمجاً أو هاوياً، فهذه الأداة ستكتب لك الكود وتصحح الأخطاء فوراً. 

كيفية الوصول لهذه الأدوات؟
لقد وفرنا لكم روابط الوصول المباشر والسيرفرات السريعة لضمان أفضل تجربة مستخدم. كل ما عليك هو الضغط على زر "تفعيل الوصول" وتخطي الاختبار الأمني البسيط.`,
            category: "تقنية",
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
        },
        {
            id: "adsterra-profit-strategy",
            title: "كيف تضاعف أرباحك من أدستيرا (Adsterra)؟ 5 أسرار يجهلها الكثيرون",
            body: `إذا وجدت أن أرباحك في أدستيرا قليلة، فأنت غالباً ترتكب أخطاء شائعة في توزيع الإعلانات أو نوعية الزوار. إليك كيف تعالج هذا الأمر وتصل إلى 10$ يومياً كبداية.

أولاً: لا تعتمد على نوع واحد من الإعلانات. أدستيرا تقدم "Social Bar" وهو الإعلان الأعلى ربحاً حالياً.
ثانياً: استهدف الدول ذات الـ CPM المرتفع.
ثالثاً: استخدم الـ Smartlink بذكاء خلف أزرار التحميل.
رابعاً: استراتيجية إعلانات الـ Native في نهاية الصفحة.
خامساً: جودة المحتوى لزيادة وقت الجلسة.`,
            category: "استراتيجيات الربح",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        }
    ],
    offers: [
        { id: "o1", title: "آيفون 16 برو ماكس - عرض محدود", price: "4,500 ريال", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400", url: "#" },
        { id: "o2", title: "سماعات سوني عازلة للضوضاء", price: "1,100 ريال", img: "https://images.unsplash.com/photo-1644990861622-38d7c2b655f4?w=400", url: "#" }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;
let hasPopped = false;

// Helper: Social Share HTML Generator
const getShareButtonsHtml = (title: string, url: string = window.location.href) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    return `
        <div class="flex flex-wrap items-center justify-center gap-3 py-6">
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest block w-full text-center mb-2">مشاركة هذا المقال:</span>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition shadow-lg shadow-blue-600/20">
                <span>فيسبوك</span>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition shadow-lg">
                <span>تويتر X</span>
            </a>
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition shadow-lg shadow-green-600/20">
                <span>واتساب</span>
            </a>
            <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition shadow-lg shadow-blue-500/20">
                <span>تليجرام</span>
            </a>
        </div>
    `;
};

// Revenue Function: First Click Popunder
const initRevenueEngine = () => {
    document.addEventListener('click', () => {
        if (!hasPopped && state.ads.smartlink1 && !isLogged) {
            window.open(state.ads.smartlink1, '_blank');
            hasPopped = true;
            setTimeout(() => { hasPopped = false; }, 300000);
        }
    }, { once: false });
};

const injectAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!adCode || adCode.trim() === "" || adCode.includes("Placeholder")) {
        if (isLogged) {
            container.style.display = 'flex';
            container.innerHTML = `<div class="w-full h-full border-2 border-dashed border-orange-200 flex items-center justify-center text-[10px] text-orange-400 font-bold p-4 text-center">مكان الإعلان الشاغر: ${containerId}<br>(ضع الكود في لوحة التحكم)</div>`;
        } else {
            container.style.display = 'none';
        }
        return;
    }

    container.style.display = 'flex';
    container.innerHTML = ''; 
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = adCode;
    
    // Extract scripts and elements
    const scripts = Array.from(wrapper.querySelectorAll('script'));
    const elements = Array.from(wrapper.childNodes).filter(node => node.nodeName !== 'SCRIPT');
    
    // Add non-script elements
    elements.forEach(node => container.appendChild(node.cloneNode(true)));
    
    // Execute scripts correctly
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
        if (hLink) hLink.href = state.ads.smartlink1 || "#";
        if (sLink) sLink.href = state.ads.smartlink1 || "#";
    }, 500);
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
    alert('تم تحديث أكواد الأرباح بنجاح!');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        const paragraphs = a.body.split('\n\n');
        const midIndex = Math.ceil(paragraphs.length / 2);
        const firstHalf = paragraphs.slice(0, midIndex).join('\n\n');
        const secondHalf = paragraphs.slice(midIndex).join('\n\n');
        
        content.innerHTML = `
            <div class="space-y-8 animate-in fade-in duration-500">
                <img src="${a.img}" class="w-full h-[300px] md:h-[500px] object-cover rounded-[2.5rem] shadow-2xl">
                <div class="space-y-8">
                    <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                    <div class="text-lg md:text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${firstHalf}</div>
                    
                    <!-- HIGH CTR DOWNLOAD BUTTON AREA -->
                    <div class="my-10 flex flex-col items-center gap-4 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] border-2 border-dashed border-blue-200 dark:border-blue-800">
                        <span class="text-xs font-black text-blue-600 uppercase tracking-widest">رابط التحميل المباشر جاهز</span>
                        <a href="${state.ads.smartlink1}" target="_blank" class="animate-bounce bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl shadow-blue-600/40 transition-all flex items-center gap-3">
                            تفعيل سيرفر التحميل ⚡
                        </a>
                    </div>

                    <div id="in-article-ad-mid" class="ad-slot bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-4 min-h-[100px]"></div>

                    <div class="text-lg md:text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${secondHalf}</div>
                    
                    <!-- Social Sharing Section -->
                    <div class="pt-8 border-t border-gray-100 dark:border-gray-800 mt-12 bg-white dark:bg-gray-900 rounded-[2rem] p-4">
                        ${getShareButtonsHtml(a.title)}
                    </div>

                    <div class="py-12 px-6 flex flex-col items-center gap-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-[3rem] border-2 border-orange-200 dark:border-orange-800/30">
                        <p class="text-2xl font-black text-center text-gray-900 dark:text-white">هل تريد الحصول على العرض الآن؟</p>
                        <a href="${state.ads.smartlink1}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-14 py-5 rounded-2xl font-black text-xl hover:scale-110 transition-all shadow-2xl shadow-orange-600/40">
                             مشاهدة العرض الآن ←
                        </a>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            injectAd('in-article-ad-mid', state.ads.inArticle1);
            injectAd('end-article-ad', state.ads.inArticle2);
        }, 500);
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all">
                <div class="w-full md:w-64 h-52 overflow-hidden rounded-[2rem] shrink-0 cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <div onclick="window.viewArticle('${a.id}')" class="cursor-pointer">
                        <span class="text-orange-600 text-[10px] font-black uppercase tracking-widest mb-3">${a.category}</span>
                        <h3 class="text-xl md:text-2xl font-black mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">${a.title}</h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    </div>
                    <div class="flex items-center justify-between mt-auto flex-wrap gap-4">
                        <div onclick="window.viewArticle('${a.id}')" class="cursor-pointer flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                            اقرأ التفاصيل <span>←</span>
                        </div>
                        <div class="flex gap-2">
                             <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(a.title)}%20${encodeURIComponent(window.location.origin + '?art=' + a.id)}" target="_blank" class="p-2 bg-green-500 text-white rounded-lg hover:scale-110 transition">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                             </a>
                             <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '?art=' + a.id)}" target="_blank" class="p-2 bg-blue-600 text-white rounded-lg hover:scale-110 transition">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
            <div class="group flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer" onclick="window.open('${state.ads.smartlink1}', '_blank')">
                <img src="${o.img}" class="w-14 h-14 object-cover rounded-xl shrink-0">
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-black text-xs mb-1 truncate">${o.title}</h4>
                    <p class="text-orange-600 font-black text-xs">${o.price}</p>
                </div>
            </div>
        `).join('');
    }

    const fullGrid = document.getElementById('offers-full-grid');
    if (fullGrid) {
        fullGrid.innerHTML = state.offers.map((o) => `
            <div class="group bg-white dark:bg-gray-900 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div class="overflow-hidden rounded-2xl mb-5 aspect-square">
                    <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <h4 class="font-black text-lg mb-2 line-clamp-1">${o.title}</h4>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-orange-600 font-black text-xl">${o.price}</span>
                </div>
                <a href="${state.ads.smartlink1}" target="_blank" class="block w-full text-center bg-gray-900 dark:bg-orange-600 text-white py-3.5 rounded-xl font-black text-xs mb-4">اطلب الآن</a>
                <div class="flex justify-center border-t border-gray-50 dark:border-gray-800 pt-3">
                    <button onclick="window.open('https://api.whatsapp.com/send?text=${encodeURIComponent(o.title)}%20${encodeURIComponent(window.location.href)}', '_blank')" class="text-[10px] font-bold text-gray-400 hover:text-green-500 transition">شارك العرض عبر واتساب</button>
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
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    refreshGlobalAds();
    initRevenueEngine(); // Activation of the Popunder Engine
});

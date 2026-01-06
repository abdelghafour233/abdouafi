
/**
 * abdouweb - Ultimate Affiliate & Ad Engine
 * Optimized for Revenue: Multi-slot ad injection and Smartlink integration.
 */

const STORAGE_KEY = 'abdouweb_pro_v5';

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<!-- Top Banner Placeholder -->`,
        code2: `<!-- Sidebar Banner Placeholder -->`,
        inArticle1: `<!-- Mid Article Ad Placeholder -->`,
        inArticle2: `<!-- End Article Native Ad Placeholder -->`,
        socialBar: `<!-- Social Bar Placeholder -->`,
        smartlink1: "https://bouncingbuzz.com/ctpynfts0?key=a6c7eb53025d8d39c467b947581bb153"
    },
    articles: [
        {
            id: "adsterra-profit-strategy",
            title: "كيف تضاعف أرباحك من أدستيرا (Adsterra)؟ 5 أسرار يجهلها الكثيرون",
            body: `إذا وجدت أن أرباحك في أدستيرا قليلة، فأنت غالباً ترتكب أخطاء شائعة في توزيع الإعلانات أو نوعية الزوار. إليك كيف تعالج هذا الأمر وتصل إلى 10$ يومياً كبداية.

أولاً: لا تعتمد على نوع واحد من الإعلانات
أكبر خطأ هو وضع بانر واحد فقط. أدستيرا تقدم "Social Bar" وهو الإعلان الأعلى ربحاً حالياً لأنه يظهر كإشعار على هاتف المستخدم ولا يتأثر بمانع الإعلانات (AdBlock) بشكل كبير. قمنا في هذا التحديث بتفعيل مكان خاص له في موقعك.

ثانياً: استهدف الدول ذات الـ CPM المرتفع
إذا كان أغلب زوارك من دول ذات عائد منخفض، فستكون أرباحك قليلة. حاول كتابة مقالات باللغة الإنجليزية أو استهداف دول الخليج (السعودية، الإمارات) حيث يصل الـ CPM لأرقام ممتازة.

ثالثاً: استخدم الـ Smartlink بذكاء
الرابط المباشر (Smartlink) هو منجم ذهب. بدلاً من وضعه كإعلان مزعج، ضعه خلف أزرار "تحميل" أو "مشاهدة العرض". الزائر عندما يضغط على زر هو يتوقع الانتقال لمكان آخر، لذا لن ينزعج إذا ظهر له إعلان أدستيرا الذكي.

رابعاً: استراتيجية إعلانات الـ Native
الزوار يكرهون البانرات التقليدية. إعلانات Native تظهر كأنها مقالات مقترحة في نهاية الصفحة. قمنا بإضافة كود خاص لها في نهاية كل مقال بمدونتك لزيادة نسبة النقر (CTR).

خامساً: جودة المحتوى وتصدر النتائج
كلما قضى الزائر وقتاً أطول في القراءة، زادت فرص ظهور الإعلانات المتغيرة له (Refresh)، مما يضاعف الربح من نفس الزائر الواحد.`,
            category: "استراتيجيات الربح",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        },
        {
            id: "affiliate-marketing-2025",
            title: "التسويق بالعمولة (Affiliate Marketing): دليل المبتدئين لتحقيق آلاف الدولارات في 2025",
            body: `يعتبر التسويق بالعمولة (Affiliate Marketing) أحد أقوى وأسرع الطرق لتحقيق دخل مادي محترم عبر الإنترنت دون الحاجة لامتلك منتج خاص بك. في هذا الدليل، سنشرح لك كيف تبدأ رحلتك في هذا المجال من الصفر حتى الاحتراف.

ما هو التسويق بالعمولة ببساطة؟
هو عملية ترويج لمنتجات أو خدمات تابعة لشركات أخرى مقابل عمولة محددة عن كل عملية بيع أو إجراء يتم من خلال رابطك الخاص. أنت تلعب دور الوسيط بين البائع والمشتري، وكلما زادت مبيعاتك، زادت أرباحك.

لماذا الأفلييت هو الخيار الأفضل؟
1. تكلفة منخفضة جداً.
2. لا حاجة لخدمة عملاء.
3. إمكانية تحقيق دخل سلبي مستمر.`,
            category: "الربح من الإنترنت",
            img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
        }
    ],
    offers: [
        { id: "o1", title: "آيفون 16 برو ماكس - عرض محدود", price: "4,500 ريال", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400", url: "#" },
        { id: "o2", title: "سماعات سوني عازلة للضوضاء", price: "1,100 ريال", img: "https://images.unsplash.com/photo-1644990861622-38d7c2b655f4?w=400", url: "#" },
        { id: "o3", title: "ماك بوك اير M3 نسخة 2025", price: "5,900 ريال", img: "https://images.unsplash.com/photo-1517336714460-4c9889a10acc?w=400", url: "#" },
        { id: "o4", title: "ساعة ابل الترا 2 الأصلية", price: "2,400 ريال", img: "https://images.unsplash.com/photo-1434494878577-86c23bdd0639?w=400", url: "#" }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

const injectAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!adCode || adCode.trim() === "" || adCode.includes("Placeholder")) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';
    container.innerHTML = ''; 
    const wrapper = document.createElement('div');
    wrapper.innerHTML = adCode;
    const scripts = Array.from(wrapper.querySelectorAll('script'));
    const nonScripts = Array.from(wrapper.childNodes).filter(node => node.nodeName !== 'SCRIPT');
    
    nonScripts.forEach(node => container.appendChild(node.cloneNode(true)));
    
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        if (oldScript.innerHTML) newScript.innerHTML = oldScript.innerHTML;
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
    alert('تم حفظ الإعدادات بنجاح. ستلاحظ تحسناً في الأرباح قريباً!');
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
                    
                    <div id="in-article-ad-mid" class="ad-slot bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-4"></div>

                    <div class="text-lg md:text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${secondHalf}</div>
                    
                    <div class="py-12 px-6 flex flex-col items-center gap-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-[3rem] border-2 border-orange-200 dark:border-orange-800/30">
                        <p class="text-2xl font-black text-center">اغتنم العرض الحصري من عبدو ويب!</p>
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
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    </div>
                    <div onclick="window.viewArticle('${a.id}')" class="cursor-pointer flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                        اقرأ التفاصيل <span>←</span>
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
                <a href="${state.ads.smartlink1}" target="_blank" class="block w-full text-center bg-gray-900 dark:bg-orange-600 text-white py-3.5 rounded-xl font-black text-xs">اطلب الآن</a>
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
});

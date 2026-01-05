
/**
 * abdouweb - Absolute Ad Isolation Engine with In-Article Ads
 * Supports dynamic injection of ads into content.
 */

const STORAGE_KEY = 'abdouweb_pro_v2';

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        code2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        inArticle1: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        inArticle2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script>`
    },
    articles: [
        { 
            id: "a1", 
            title: "ثورة الذكاء الاصطناعي في 2025: كيف ستتغير حياتنا اليومية؟", 
            body: `دخلنا رسمياً عصر "الذكاء الشامل"، حيث لم يعد الذكاء الاصطناعي مجرد أداة للدردشة، بل أصبح المحرك الخفي لكل ما نقوم به. في هذا التقرير المفصل، نستعرض كيف سيغير هذا العام حياتك المهنية والشخصية.

أولاً: التحول في سوق العمل
لن يحل الذكاء الاصطناعي محلك، بل الشخص الذي يجيد استخدامه هو من سيفعل. نرى الآن تكاملاً عميقاً في أدوات التصميم، البرمجة، وحتى الطبابة عن بعد. المهارة الأهم في 2025 هي "هندسة الأوامر" وفهم كيفية توجيه الآلة للوصول لأفضل النتائج.

ثانياً: المنازل الذكية التي تفكر
لم يعد الأمر يقتصر على فتح الأضواء بالأوامر الصوتية. المنازل في 2025 تتنبأ باحتياجاتك؛ الثلاجة تطلب النواقص تلقائياً، ونظام التكييف يضبط نفسه بناءً على حالتك الصحية المكتشفة عبر ساعتك الذكية.

ثالثاً: الأمان والخصوصية
مع التطور الهائل، تزداد التحديات. التزييف العميق (Deepfakes) أصبح أكثر إقناعاً، مما يفرض علينا استخدام أدوات حماية تعتمد هي الأخرى على الذكاء الاصطناعي لكشف التلاعب. 

نصيحة عبدو ويب: لا تقاوم التغيير، بل استثمر ساعة يومياً في تعلم أداة جديدة، فهذا هو الاستثمار الأضمن لمستقبلك.`, 
            category: "تقنية المستقبل", 
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" 
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

const injectSafeAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container || !adCode || !adCode.trim()) return;

    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.className = 'ad-sandbox-iframe';
    iframe.title = 'Isolated Ad Content';
    // Use sandbox to prevent top-level redirects and other hijacking
    iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-forms allow-same-origin');

    const html = `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; overflow: hidden; height: 100%; }
                #ad-wrapper { width: 100%; text-align: center; }
            </style>
        </head>
        <body>
            <div id="ad-wrapper">${adCode}</div>
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
    setTimeout(() => {
        injectSafeAd('ad-slot-1-safe-container', state.ads.code1);
        injectSafeAd('ad-slot-2-safe-container', state.ads.code2);
    }, 600);
};

const shareTo = (platform: string, title: string, url: string = window.location.href) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    let shareUrl = '';
    switch (platform) {
        case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`; break;
        case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`; break;
        case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`; break;
        case 'telegram': shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`; break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
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
    state.ads.inArticle1 = (document.getElementById('ad-in-article-1') as HTMLTextAreaElement).value;
    state.ads.inArticle2 = (document.getElementById('ad-in-article-2') as HTMLTextAreaElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshAds();
    alert('تم تحديث جميع الوحدات الإعلانية بنجاح.');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        // Split body to inject ad after first paragraph
        const paragraphs = a.body.split('\n\n');
        const firstPara = paragraphs[0];
        const restOfParas = paragraphs.slice(1).join('\n\n');

        content.innerHTML = `
            <div class="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <img src="${a.img}" class="w-full h-[450px] object-cover rounded-[3rem] shadow-2xl">
                <div class="space-y-6">
                    <span class="bg-orange-600 text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">${a.category}</span>
                    <h1 class="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                    
                    <div class="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line font-medium">
                        ${firstPara}
                    </div>

                    <!-- IN-ARTICLE AD 1 -->
                    <div id="in-article-ad-slot-1" class="in-article-ad"></div>

                    <div class="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line font-medium">
                        ${restOfParas}
                    </div>

                    <!-- IN-ARTICLE AD 2 -->
                    <div id="in-article-ad-slot-2" class="in-article-ad"></div>
                    
                    <div class="pt-10 border-t dark:border-gray-800">
                        <h4 class="text-xl font-black mb-6">شارك هذه المعلومات:</h4>
                        <div class="flex flex-wrap gap-4">
                            <button onclick="window.shareTo('whatsapp', '${a.title}')" class="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-[1.5rem] font-black hover:scale-105 transition">واتساب</button>
                            <button onclick="window.shareTo('facebook', '${a.title}')" class="flex items-center gap-2 bg-[#1877F2] text-white px-8 py-4 rounded-[1.5rem] font-black hover:scale-105 transition">فيسبوك</button>
                            <button onclick="window.shareTo('twitter', '${a.title}')" class="flex items-center gap-2 bg-[#000000] text-white px-8 py-4 rounded-[1.5rem] font-black hover:scale-105 transition">تويتر</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Inject Ads after rendering placeholders
        setTimeout(() => {
            injectSafeAd('in-article-ad-slot-1', state.ads.inArticle1);
            injectSafeAd('in-article-ad-slot-2', state.ads.inArticle2);
        }, 100);
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-10 hover:shadow-2xl transition-all duration-500">
                <div class="w-full md:w-72 h-64 overflow-hidden rounded-[2.5rem] shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <span class="text-orange-600 text-xs font-black uppercase tracking-widest mb-3">${a.category}</span>
                    <h3 class="text-2xl md:text-3xl font-black mb-4 group-hover:text-orange-600 transition-colors line-clamp-2">${a.title}</h3>
                    <p class="text-gray-500 text-lg mb-6 line-clamp-3">${a.body}</p>
                    <div class="flex items-center justify-between">
                        <button onclick="window.viewArticle('${a.id}')" class="text-sm font-black border-b-2 border-orange-600 pb-1">مواصلة القراءة ←</button>
                        <button onclick="window.shareTo('whatsapp', '${a.title}')" class="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-green-600"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.slice(0, 3).map(o => `
            <div class="group flex gap-4 items-center p-4 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <img src="${o.img}" class="w-20 h-20 object-cover rounded-xl shrink-0">
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-black text-sm mb-1 truncate">${o.title}</h4>
                    <p class="text-orange-600 font-black text-xs">${o.price}</p>
                </div>
            </div>
        `).join('');
    }

    const fullGrid = document.getElementById('offers-full-grid');
    if (fullGrid) {
        fullGrid.innerHTML = state.offers.map(o => `
            <div class="bg-white dark:bg-gray-900 p-6 rounded-[3rem] border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all">
                <img src="${o.img}" class="w-full h-48 object-cover rounded-[2rem] mb-6">
                <h4 class="font-black text-xl mb-3 line-clamp-1">${o.title}</h4>
                <div class="flex items-center justify-between mb-6">
                    <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                    <button onclick="window.shareTo('whatsapp', '${o.title}')" class="p-3 bg-green-50 text-green-600 rounded-2xl"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></button>
                </div>
                <a href="${o.url}" target="_blank" class="block w-full text-center bg-gray-900 dark:bg-orange-600 text-white py-4 rounded-2xl font-black">اطلب الآن</a>
            </div>
        `).join('');
    }
    refreshAds();
};

const addArticle = () => {
    const t = (document.getElementById('new-art-title') as HTMLInputElement).value;
    const b = (document.getElementById('new-art-body') as HTMLTextAreaElement).value;
    if(!t || !b) return;
    state.articles.unshift({ id: Date.now().toString(), title: t, body: b, category: "جديد", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
    showPage('home');
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds, addArticle, shareTo,
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

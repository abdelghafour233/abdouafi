
/**
 * abdouweb - Adsterra Revenue Engine PRO
 * 100% Adsterra Optimized - No other ad networks integrated.
 */

// تحديث المفتاح إلى v3 لضمان إعادة ضبط البيانات عند المستخدمين وتصحيح مشكلة الصور
const STORAGE_KEY = 'abdouweb_adsterra_final_v3'; 

const FALLBACK_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";

const INITIAL_DATA = {
    siteName: "عبدو ويب Pro",
    adminPass: "admin",
    ads: {
        adsterraLink: "https://bouncingbuzz.com/wga5mrxfz?key=2d97310179e241819b7915da9473f01d",
        adsterraScript: `<script type="text/javascript">
	atOptions = {
		'key' : '28265724',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/28265724/invoke.js"></script>`,
        adsterraPopScript: `<script src="https://bouncingbuzz.com/3d/40/12/3d4012bf393d5dde160f3b0dd073d124.js"></script>`,
        adsterraExtraScript: `<script src="https://bouncingbuzz.com/18/8b/2d/188b2d4248e4748cda209b5a7c18dcb0.js"></script>`,
        adsterraNativeScript: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script>
<div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        adsterraBanner2: `<script type="text/javascript">
  atOptions = {
    'key' : 'fff99eab9d1e62398408de9a9f30aabb',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://bouncingbuzz.com/fff99eab9d1e62398408de9a9f30aabb/invoke.js"></script>`
    },
    articles: [
        {
            id: "hosting-profit-2025",
            title: "دليل الربح من الأفلييت: كيف تجني آلاف الدولارات من تسويق استضافات المواقع؟",
            body: `تعد استضافات المواقع (Web Hosting) من أكثر المجالات ربحية في عالم التسويق بالعمولة (Affiliate Marketing). لماذا؟ لأن الشركات تدفع عمولات ضخمة تصل إلى 200 دولار لكل عميل واحد، بالإضافة إلى الدخل المتكرر.

في هذا الدليل، نكشف لك أسرار النجاح في هذا المجال:
- لماذا مجال الاستضافات هو الأفضل للمبتدئين والمحترفين على حد سواء.
- مراجعة لأفضل برامج الأفلييت التي تدفع عمولات مرتفعة مثل Bluehost و Cloudways.
- استراتيجيات ذكية لجلب الزوار المهتمين ببناء مواقعهم الخاصة.

إذا كنت تبحث عن مصدر دخل حقيقي ومستدام في 2025، فإن تسويق الاستضافات هو بوابتك الذهبية. ابدأ الآن ولا تضيع الفرصة.`,
            category: "أفلييت واستضافات",
            img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&q=80"
        },
        {
            id: "win-iphone-2025",
            title: "مسابقة عبدو ويب: كيف تحصل على آيفون 16 برو مجاناً؟",
            body: `بمناسبة العام الجديد، نطلق أكبر مسابقة لتوزيع الجوائز التقنية. الشروط بسيطة جداً ولا تتطلب دفع أي رسوم.

1. التسجيل في القائمة البريدية للحصول على رقم الاشتراك.
2. مشاركة المقال مع أصدقائك عبر المنصات الاجتماعية.
3. النقر على زر "تأكيد الاشتراك" بالأسفل للمتابعة.

لماذا نقوم بذلك؟ نحن في عبدو ويب نسعى لبناء أكبر مجتمع تقني عربي، ودعمكم هو الوقود الذي يحركنا.`,
            category: "مسابقات",
            img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80"
        },
        {
            id: "fast-profit-2025",
            title: "أفضل طرق الربح من الإنترنت للمبتدئين في 2025 (بدون رأس مال)",
            body: `العمل الحر، الأفلييت، وإنشاء المحتوى.. هذه هي الأعمدة الثلاثة للثراء الرقمي اليوم. في هذا الدليل، نكشف لك كيف تبدأ أول مشروع لك وتجني أول 100 دولار.

- استغلال منصات الـ Short-form content.
- استراتيجية توجيه الترافيك الذكي.
- الذكاء الاصطناعي وكيف يختصر عليك 90% من الجهد.

اضغط على الزر بالأسفل للبدء في دليلك العملي.`,
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

// دالة لمعالجة أخطاء الصور واستبدالها بصورة افتراضية
const handleImageError = (img: HTMLImageElement) => {
    img.onerror = null;
    img.src = FALLBACK_IMG;
};

const injectAdScriptToSelector = (selector: string, adCode: string) => {
    if (!adCode) return;
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
        container.innerHTML = adCode;
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.innerHTML = oldScript.innerHTML;
            }
            oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
    });
};

const injectGlobalScript = (adCode: string) => {
    if (!adCode) return;
    const temp = document.createElement('div');
    temp.innerHTML = adCode;
    const scripts = temp.querySelectorAll('script');
    scripts.forEach(oldScript => {
        if (oldScript.src && document.querySelector(`script[src="${oldScript.src}"]`)) return;

        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.innerHTML = oldScript.innerHTML;
        }
        document.head.appendChild(newScript);
    });
};

const refreshAllAds = () => {
    injectAdScriptToSelector('#ad-sidebar-point', state.ads.adsterraScript);
    injectAdScriptToSelector('#ad-article-top', state.ads.adsterraScript);
    injectAdScriptToSelector('#ad-article-middle', state.ads.adsterraBanner2);
    injectAdScriptToSelector('#ad-native-point', state.ads.adsterraNativeScript);
    injectAdScriptToSelector('#ad-article-bottom', state.ads.adsterraNativeScript);
    injectGlobalScript(state.ads.adsterraPopScript);
    injectGlobalScript(state.ads.adsterraExtraScript);
    
    document.querySelectorAll('.adsterra-direct').forEach((el: any) => {
        el.href = state.ads.adsterraLink;
        el.target = "_blank";
    });
};

const winners = [
    { name: "محمد ع.", action: "حصل على بطاقة جوجل 50$", time: "قبل دقيقتين" },
    { name: "سارة م.", action: "فازت بآيفون 16 برو", time: "الآن" },
    { name: "أحمد ك.", action: "استلم كود خصم 90%", time: "قبل 5 دقائق" },
    { name: "ياسين هـ.", action: "قام بالاشتراك في المسابقة", time: "قبل ثوانٍ" }
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

const getShareButtonsHtml = (title: string, id: string) => {
    const url = `${window.location.origin}?art=${id}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    return `
        <div class="viral-box bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 text-center my-8">
            <h4 class="text-sm font-black mb-4">شارك لفتح القفل عن الجائزة</h4>
            <div class="flex flex-wrap justify-center gap-3">
                <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">واتساب</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="bg-[#1877F2] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:opacity-90 transition">فيسبوك</a>
            </div>
        </div>
    `;
};

const showPage = (id: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${id}`);
    if (id === 'admin' && !isLogged) document.getElementById('page-login')?.classList.remove('hidden');
    else if (target) {
        target.classList.remove('hidden');
        if (id === 'admin') {
            (document.getElementById('adsterra-link-input') as HTMLInputElement).value = state.ads.adsterraLink;
            (document.getElementById('adsterra-script-input') as HTMLTextAreaElement).value = state.ads.adsterraScript;
            (document.getElementById('adsterra-pop-input') as HTMLTextAreaElement).value = state.ads.adsterraPopScript;
            (document.getElementById('adsterra-extra-input') as HTMLTextAreaElement).value = state.ads.adsterraExtraScript;
            (document.getElementById('adsterra-native-input') as HTMLTextAreaElement).value = state.ads.adsterraNativeScript;
            (document.getElementById('adsterra-banner2-input') as HTMLTextAreaElement).value = state.ads.adsterraBanner2;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
    setTimeout(refreshAllAds, 100);
};

const handleLogin = () => {
    const p = (document.getElementById('admin-pass') as HTMLInputElement).value;
    if (p === state.adminPass) { isLogged = true; showPage('admin'); }
};

const saveAds = () => {
    state.ads.adsterraLink = (document.getElementById('adsterra-link-input') as HTMLInputElement).value;
    state.ads.adsterraScript = (document.getElementById('adsterra-script-input') as HTMLTextAreaElement).value;
    state.ads.adsterraPopScript = (document.getElementById('adsterra-pop-input') as HTMLTextAreaElement).value;
    state.ads.adsterraExtraScript = (document.getElementById('adsterra-extra-input') as HTMLTextAreaElement).value;
    state.ads.adsterraNativeScript = (document.getElementById('adsterra-native-input') as HTMLTextAreaElement).value;
    state.ads.adsterraBanner2 = (document.getElementById('adsterra-banner2-input') as HTMLTextAreaElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshAllAds();
    alert('تم تحديث إعدادات Adsterra بنجاح!');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        const lines = a.body.split('\n');
        const mid = Math.floor(lines.length / 2);
        const topPart = lines.slice(0, mid).join('\n');
        const bottomPart = lines.slice(mid).join('\n');
        const articleImg = a.img || FALLBACK_IMG;

        content.innerHTML = `
            <div class="space-y-8 animate-in fade-in duration-700">
                <div class="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-[3rem] shadow-2xl bg-gray-200">
                    <img src="${articleImg}" 
                         class="w-full h-full object-cover" 
                         onerror="this.src='${FALLBACK_IMG}'; this.onerror=null;">
                </div>
                <div class="max-w-3xl mx-auto space-y-8">
                    <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                    
                    <div class="text-lg md:text-2xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${topPart}</div>
                    
                    <div id="ad-article-middle" class="ad-container active-ad min-h-[250px] my-10"></div>
                    
                    <div class="text-lg md:text-2xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${bottomPart}</div>

                    ${getShareButtonsHtml(a.title, a.id)}
                    
                    <div class="my-10 p-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] text-white shadow-2xl text-center flex flex-col items-center gap-6">
                        <div class="space-y-2">
                            <h3 class="text-2xl md:text-3xl font-black italic underline decoration-yellow-400 font-tajawal">الرابط الحصري جاهز</h3>
                            <p class="text-sm opacity-90">اضغط بالأسفل للمتابعة وتأكيد اشتراكك الآن عبر Adsterra Direct Link</p>
                        </div>
                        <a href="${state.ads.adsterraLink}" target="_blank" class="adsterra-direct w-full bg-white text-blue-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl text-center">
                            انتقل للعرض الآن ⚡
                        </a>
                    </div>
                    <div id="ad-article-bottom" class="ad-container active-ad min-h-[100px] mt-10"></div>
                </div>
            </div>
        `;
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => {
            const articleImg = a.img || FALLBACK_IMG;
            return `
            <div class="group bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all mb-10 overflow-hidden">
                <div class="w-full md:w-72 h-60 overflow-hidden rounded-[2.5rem] shrink-0 cursor-pointer bg-gray-100" onclick="window.viewArticle('${a.id}')">
                    <img src="${articleImg}" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                         onerror="this.src='${FALLBACK_IMG}'; this.onerror=null;">
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
        `}).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.map(o => `
            <div class="group flex gap-4 items-center p-4 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer mb-3" onclick="window.showPage('offers')">
                <img src="${o.img || FALLBACK_IMG}" 
                     class="w-16 h-16 object-cover rounded-2xl shrink-0"
                     onerror="this.src='${FALLBACK_IMG}'; this.onerror=null;">
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
    resetSite: () => {
        if(confirm('هل أنت متأكد من إعادة ضبط الموقع وحذف كافة الإعدادات؟')) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    setTimeout(refreshAllAds, 500);
    setInterval(showSocialProof, 25000); 
    setTimeout(showSocialProof, 3000);

    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('art');
    if (artId) setTimeout(() => viewArticle(artId), 500);
});

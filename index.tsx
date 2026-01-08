
/**
 * abdouweb - Adsterra & Monetag Revenue Engine PRO
 */

const STORAGE_KEY = 'abdouweb_ads_v8'; 

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
<script type="text/javascript" src="https://bouncingbuzz.com/fff99eab9d1e62398408de9a9f30aabb/invoke.js"></script>`,
        monetagScript: `<script src="https://otieu.com/4/10428641"></script>`
    },
    articles: [
        {
            id: "hosting-profit-2025",
            title: "دليل الربح من الأفلييت: كيف تجني آلاف الدولارات من تسويق استضافات المواقع؟",
            body: `تعد استضافات المواقع (Web Hosting) من أكثر المجالات ربحية في عالم التسويق بالعمولة (Affiliate Marketing). لماذا؟ لأن الشركات تدفع عمولات ضخمة تصل إلى 200 دولار لكل عميل واحد، بالإضافة إلى الدخل المتكرر.`,
            category: "أفلييت واستضافات",
            img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&q=80"
        },
        {
            id: "win-iphone-2025",
            title: "مسابقة عبدو ويب: كيف تحصل على آيفون 16 برو مجاناً؟",
            body: `بمناسبة العام الجديد، نطلق أكبر مسابقة لتوزيع الجوائز التقنية. الشروط بسيطة جداً ولا تتطلب دفع أي رسوم.`,
            category: "مسابقات",
            img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80"
        }
    ],
    offers: [
        { id: "o1", title: "كوبون خصم نون 90%", price: "مجاني", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400", url: "#" }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

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

const injectGlobalScript = (adCode: string, idPrefix: string) => {
    if (!adCode) return;
    const temp = document.createElement('div');
    temp.innerHTML = adCode;
    const scripts = temp.querySelectorAll('script');
    scripts.forEach((oldScript, idx) => {
        const scriptId = `script-${idPrefix}-${idx}`;
        if (document.getElementById(scriptId)) return;

        const newScript = document.createElement('script');
        newScript.id = scriptId;
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
    
    injectGlobalScript(state.ads.adsterraPopScript, 'adsterra-pop');
    injectGlobalScript(state.ads.adsterraExtraScript, 'adsterra-extra');
    injectGlobalScript(state.ads.monetagScript, 'monetag');
    
    document.querySelectorAll('.adsterra-direct').forEach((el: any) => {
        el.href = state.ads.adsterraLink;
        el.target = "_blank";
    });
};

const getShareButtonsHtml = (title: string, id: string, compact = false) => {
    const url = `${window.location.origin}?art=${id}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    if (compact) {
        return `<div class="flex items-center gap-2 mt-4">
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition shadow-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition shadow-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
        </div>`;
    }
    return `<div class="viral-box bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 text-center my-8">
        <h4 class="text-sm font-black mb-4">شارك لفتح القفل عن الجائزة</h4>
        <div class="flex flex-wrap justify-center gap-3">
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition shadow-lg">واتساب</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="bg-[#1877F2] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition shadow-lg">فيسبوك</a>
        </div>
    </div>`;
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
            (document.getElementById('adsterra-native-input') as HTMLTextAreaElement).value = state.ads.adsterraNativeScript;
            (document.getElementById('monetag-script-input') as HTMLTextAreaElement).value = state.ads.monetagScript;
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
    state.ads.adsterraNativeScript = (document.getElementById('adsterra-native-input') as HTMLTextAreaElement).value;
    state.ads.monetagScript = (document.getElementById('monetag-script-input') as HTMLTextAreaElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    alert('تم تحديث إعدادات الإعلانات بنجاح!');
    location.reload(); 
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        const articleImg = a.img || FALLBACK_IMG;
        content.innerHTML = `<div class="space-y-8 animate-in fade-in duration-700">
            <div class="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-[3rem] shadow-2xl bg-gray-200">
                <img src="${articleImg}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="max-w-3xl mx-auto space-y-8">
                <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                <div class="text-lg md:text-2xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${a.body}</div>
                <div id="ad-article-middle" class="ad-container active-ad min-h-[250px] my-10"></div>
                ${getShareButtonsHtml(a.title, a.id)}
                <a href="${state.ads.adsterraLink}" target="_blank" class="adsterra-direct block w-full bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl text-center">انتقل للعرض الآن ⚡</a>
                <div id="ad-article-bottom" class="ad-container active-ad min-h-[100px] mt-10"></div>
            </div>
        </div>`;
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `<div class="group bg-white dark:bg-gray-900 p-6 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all mb-10">
            <div class="w-full md:w-72 h-60 overflow-hidden rounded-[2.5rem] shrink-0 cursor-pointer bg-gray-100" onclick="window.viewArticle('${a.id}')">
                <img src="${a.img || FALLBACK_IMG}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="flex flex-col justify-center flex-1">
                <h3 class="text-2xl md:text-3xl font-black mb-4 group-hover:text-blue-600 transition-colors cursor-pointer" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                <div class="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto">
                    <button onclick="window.viewArticle('${a.id}')" class="bg-gray-900 dark:bg-blue-600 text-white w-fit px-8 py-3 rounded-2xl font-black text-xs hover:scale-105 transition-all">اقرأ المزيد</button>
                    ${getShareButtonsHtml(a.title, a.id, true)}
                </div>
            </div>
        </div>`).join('');
    }
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds,
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    setTimeout(refreshAllAds, 500);
});

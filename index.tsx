
/**
 * abdouweb - Ultimate Ad Injection Engine (Direct DOM Execution)
 * Integration with Native Banner & Smartlink
 */

const STORAGE_KEY = 'abdouweb_pro_v3';

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<!-- Global Bottom Banner -->
<script type="text/javascript">
	atOptions = {
		'key' : 'a8b678d7d8c502dc8ae4d07cc79789d2',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script>`,
        code2: `<!-- Global Sidebar Banner -->
<script type="text/javascript">
	atOptions = {
		'key' : '188b2d4248e4748cda209b5a7c18dcb0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/188b2d4248e4748cda209b5a7c18dcb0/invoke.js"></script>`,
        inArticle1: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        inArticle2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        smartlink1: "https://bouncingbuzz.com/wga5mrxfz?key=2d97310179e241819b7915da9473f01d"
    },
    articles: [
        { 
            id: "a1", 
            title: "أفضل 5 تطبيقات لزيادة الإنتاجية في 2025", 
            body: `في ظل التسارع الرقمي الذي نعيشه، أصبح الهاتف المحمول أداة إما للتشتت أو للإنجاز. نحن في عبدو ويب قمنا بتجربة أكثر من 50 تطبيقاً لنختار لكم الأفضل.

أولاً: تطبيق Notion
يعتبر نوتشن هو العمود الفقري لأي شخص يريد تنظيم حياته. فهو يجمع بين كتابة الملاحظات، إدارة المشاريع، وقواعد البيانات في واجهة واحدة بسيطة. ما يميزه في 2025 هو دمج الذكاء الاصطناعي الذي يساعدك على تلخيص اجتماعاتك بضغطة زر.

ثانياً: تطبيق Forest
إذا كنت تعاني من إدمان الهاتف أثناء العمل، فهذا التطبيق هو الحل. الفكرة بسيطة: تزرع شجرة رقمية وتنمو طالما أنك لا تلمس هاتفك. إذا خرجت من التطبيق، تموت الشجرة. أسلوب ممتع وفعال جداً.

ثالثاً: تطبيق Todoist
البساطة هي سر النجاح. تودويست يساعدك على جدولة مهامك اليومية مع منبهات ذكية تعتمد على موقعك الجغرافي.

نصيحة تقنية: لا تحمل كل هذه التطبيقات مرة واحدة. ابدأ بواحد فقط واستمر عليه لمدة أسبوع لتلاحظ الفرق في إنتاجيتك.`, 
            category: "تطبيقات", 
            img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" 
        }
    ],
    offers: [
        { id: "o1", title: "آيفون 15 برو ماكس", price: "8,500 درهم", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400", url: "#" },
        { id: "o2", title: "سماعات سوني WH-1000XM5", price: "1,200 درهم", img: "https://images.unsplash.com/photo-1644990861622-38d7c2b655f4?w=400", url: "#" },
        { id: "o3", title: "ماك بوك اير M3", price: "12,900 درهم", img: "https://images.unsplash.com/photo-1517336714460-4c9889a10acc?w=400", url: "#" },
        { id: "o4", title: "ساعة ابل الترا 2", price: "3,400 درهم", img: "https://images.unsplash.com/photo-1434494878577-86c23bdd0639?w=400", url: "#" }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

const injectAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!adCode || adCode.trim() === "") {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = ''; 

    const wrapper = document.createElement('div');
    wrapper.innerHTML = adCode;

    const scripts = Array.from(wrapper.querySelectorAll('script'));
    const nonScripts = Array.from(wrapper.childNodes).filter(node => node.nodeName !== 'SCRIPT');
    
    nonScripts.forEach(node => container.appendChild(node.cloneNode(true)));

    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
        }
        container.appendChild(newScript);
    });
};

const refreshAds = () => {
    setTimeout(() => {
        injectAd('ad-slot-1-safe-container', state.ads.code1);
        injectAd('ad-slot-2-safe-container', state.ads.code2);
        
        // Update Smartlinks
        const hLink = document.getElementById('header-smart-link') as HTMLAnchorElement;
        const sLink = document.getElementById('sidebar-smart-link') as HTMLAnchorElement;
        if (hLink) hLink.href = state.ads.smartlink1 || "#";
        if (sLink) sLink.href = state.ads.smartlink1 || "#";
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
            (document.getElementById('ad-smartlink-1') as HTMLInputElement).value = state.ads.smartlink1;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
    refreshAds();
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
    state.ads.smartlink1 = (document.getElementById('ad-smartlink-1') as HTMLInputElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshAds();
    alert('تم تفعيل وحفظ الإعلانات بنجاح!');
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
                <img src="${a.img}" class="w-full h-[250px] md:h-[400px] object-cover rounded-[2rem] shadow-xl">
                <div class="space-y-6">
                    <h1 class="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">${a.title}</h1>
                    
                    <div class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">
                        ${firstHalf}
                    </div>

                    <!-- SMARTLINK PROMOTION BUTTON -->
                    <div class="py-6 flex flex-col items-center gap-4 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-800/30">
                        <p class="text-sm font-black text-orange-600">هذا العرض متاح لفترة محدودة فقط!</p>
                        <a href="${state.ads.smartlink1}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-10 py-3 rounded-full font-black text-sm hover:scale-105 transition">احصل على العرض الآن</a>
                    </div>

                    <!-- NATIVE AD IN THE MIDDLE -->
                    <div id="in-article-ad-mid" class="my-8 flex justify-center w-full min-h-[100px]"></div>

                    <div class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">
                        ${secondHalf}
                    </div>

                    <!-- END OF ARTICLE AD -->
                    <div id="in-article-ad-bottom" class="my-8 flex justify-center w-full min-h-[100px]"></div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            injectAd('in-article-ad-mid', state.ads.inArticle1);
            injectAd('in-article-ad-bottom', state.ads.inArticle2);
        }, 400);
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-5 md:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all cursor-pointer" onclick="window.viewArticle('${a.id}')">
                <div class="w-full md:w-52 h-44 overflow-hidden rounded-2xl shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <span class="text-orange-600 text-[10px] font-black uppercase mb-1">${a.category}</span>
                    <h3 class="text-lg md:text-xl font-black mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">${a.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    <div class="mt-auto">
                        <span class="text-[10px] font-black text-gray-400 border-b-2 border-orange-600/30 pb-0.5">اقرأ المزيد</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.slice(0, 3).map(o => `
            <div class="group flex gap-3 items-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer" onclick="window.location.href='${state.ads.smartlink1}'">
                <img src="${o.img}" class="w-12 h-12 object-cover rounded-lg shrink-0">
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-black text-[10px] mb-0.5 truncate">${o.title}</h4>
                    <p class="text-orange-600 font-black text-[10px]">${o.price}</p>
                </div>
            </div>
        `).join('');
    }

    const fullGrid = document.getElementById('offers-full-grid');
    if (fullGrid) {
        let itemsHtml = state.offers.map((o, index) => {
            let html = `
                <div class="bg-white dark:bg-gray-900 p-4 rounded-[1.5rem] border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                    <img src="${o.img}" class="w-full h-36 object-cover rounded-xl mb-4">
                    <h4 class="font-black text-base mb-1 line-clamp-1">${o.title}</h4>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-orange-600 font-black text-lg">${o.price}</span>
                    </div>
                    <a href="${state.ads.smartlink1}" target="_blank" class="block w-full text-center bg-gray-900 dark:bg-orange-600 text-white py-2.5 rounded-lg font-black text-[10px]">اطلب الآن</a>
                </div>
            `;
            // Inject Ad in grid middle (after 2nd item)
            if (index === 1) {
                html += `<div id="grid-ad-slot" class="col-span-full py-4 flex justify-center"></div>`;
            }
            return html;
        }).join('');
        fullGrid.innerHTML = itemsHtml;
        setTimeout(() => injectAd('grid-ad-slot', state.ads.inArticle1), 300);
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
        document.querySelectorAll('.admin-nav-btn').forEach(b => {
            b.classList.remove('bg-orange-600', 'text-white');
            b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
        });
        const active = Array.from(document.querySelectorAll('.admin-nav-btn')).find(b => b.getAttribute('onclick')?.includes(id));
        if(active) {
            active.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            active.classList.add('bg-orange-600', 'text-white');
        }
    },
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    refreshAds();
});

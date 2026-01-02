
/**
 * abdouweb - Professional Moroccan Tech & Affiliate Platform
 */

const STORAGE_KEY = 'abdouweb_analytical_v1';

const DEFAULT_BLOG_DATA = {
    siteName: "abdouweb",
    siteUrl: "https://abdouweb.ma",
    adminPassword: "admin",
    staticPages: {
        about: "مرحباً بكم في abdouweb، منصتكم الأولى لمتابعة جديد التقنية في المغرب، نصائح تطوير الذات، وأفضل مراجعات المنتجات التقنية التي تستحق استثماركم.",
        privacy: "سياسة الخصوصية لدينا تضمن حماية بيانات زوارنا بشكل كامل.",
        terms: "استخدامك للموقع يعني موافقتك على شروط الاستخدام."
    },
    offers: [
        {
            id: "of-1",
            title: "مراجعة MacBook Air M3 في المغرب",
            price: "12,500 درهم",
            desc: "هل يستحق جهاز آبل الجديد الانتقال إليه؟ قمنا بتجربة الجهاز في ظروف العمل اليومية للمصممين والمبرمجين في المغرب.",
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop",
            url: "https://www.apple.com/ma/macbook-air/",
            date: "2025/01/22"
        }
    ],
    articles: [
        {
            id: "ar-1",
            category: "تقنية المغرب",
            title: "الجيل الخامس (5G) في المغرب: ثورة رقمية تتجاوز مجرد سرعة التحميل",
            content: "يشهد المشهد التكنولوجي في المملكة المغربية تحولاً جذرياً مع الاستعدادات المتسارعة لإطلاق شبكات الجيل الخامس (5G). لكن، ومن منظور تحليلي، لا ينبغي حصر هذه التكنولوجيا في خانة 'سرعة الإنترنت' فحسب، بل هي ركيزة أساسية للاقتصاد الرقمي المستقبلي.\n\nأولاً: البنية التحتية والسيادة الرقمية\nيتطلب نشر الـ 5G استثمارات ضخمة في الألياف البصرية ومراكز البيانات. المغرب، من خلال استراتيجيته 'المغرب الرقمي 2030'، يهدف إلى خلق نظام بيئي يسمح بربط ملايين الأجهزة (IoT) في آن واحد، مما سيمكن المدن الكبرى مثل الدار البيضاء وطنجة من التحول إلى 'مدن ذكية' حقيقية تدير حركة المرور واستهلاك الطاقة بشكل آلي بالكامل.\n\nثانياً: التأثير على المقاولات الناشئة والصناعة\nفي المناطق الصناعية مثل طنجة المتوسط، سيمثل الجيل الخامس محركاً للصناعة 4.0. المصانع ستعتمد على الروبوتات المتصلة التي تتفاعل في الوقت الفعلي بفضل 'الكمون المنخفض' (Low Latency). بالنسبة للمقاولات الناشئة المغربية، سيفتح هذا المجال لتطوير تطبيقات في الجراحة عن بعد، والواقع المعزز، والتعليم الافتراضي.\n\nثالثاً: التحديات الجيواستراتيجية والتقنية\nرغم التفاؤل، تبقى هناك تحديات تتعلق بتكلفة التجهيزات للمواطن البسيط، وضرورة تحديث الهواتف الذكية لتتوافق مع هذه التقنية. التحليل يشير إلى أن الفجوة الرقمية قد تتسع إذا لم يتم توفير تغطية عادلة تشمل المناطق القروية بنفس كفاءة الحواضر.\n\nختاماً، إن الـ 5G ليس مجرد رفاهية، بل هو ضرورة حتمية لتعزيز تنافسية المغرب القارية والدولية، وهو الجسر الذي سيعبر به الاقتصاد الوطني نحو الرقمنة الشاملة.",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop",
            date: "2025/01/25"
        },
        {
            id: "ar-2",
            category: "تطوير الذات",
            title: "الذكاء الاصطناعي وسوق الشغل بالمغرب: كيف تنجو من 'الأتمتة'؟",
            content: "لم يعد السؤال اليوم هو 'هل سيحل الذكاء الاصطناعي محل البشر؟'، بل 'كيف يمكن للمحترف المغربي أن يستغل هذه الأدوات ليصبح لا غنى عنه؟'. التحول الحالي في سوق الشغل يتطلب مرونة ذهنية وتحديثاً مستمراً للمهارات.\n\nتحليل المهارات المطلوبة مستقبلاً\nتشير الدراسات الحديثة إلى أن المهارات التقنية الصرفة (Hard Skills) بدأت تفقد بريقها لصالح 'المهارات الناعمة' (Soft Skills). في المغرب، يزداد الطلب على المحللين القادرين على توجيه نماذج الذكاء الاصطناعي (مثل ChatGPT و Claude) للحصول على نتائج دقيقة في مجالات التسويق، القانون، والهندسة.\n\nالأتمتة كفرصة وليست تهديداً\nبدلاً من الخوف من ضياع الوظائف التقليدية في مراكز الاتصال أو المحاسبة، يجب النظر إلى الذكاء الاصطناعي كـ 'مساعد طيار'. فهو يقوم بالمهام الروتينية والمملة، تاركاً للإنسان المجال للإبداع والابتكار واتخاذ القرارات الاستراتيجية المعقدة.\n\nخطة العمل للمحترفين الشباب\n1. التعلم المستمر: خصص ساعة يومياً لتعلم كيفية دمج أدوات الذكاء الاصطناعي في تخصصك.\n2. بناء الهوية الرقمية: استغل التقنية لبناء ملف شخصي قوي على LinkedIn يبرز قدرتك على التكيف مع التكنولوجيا.\n3. التركيز على الذكاء العاطفي: الآلات تفتقر للتعاطف والقدرة على فهم السياق الثقافي المغربي الفريد، وهنا تكمن قوتك.\n\nفي النهاية، المستقبل ينتمي لأولئك الذين يتبنون التكنولوجيا ولا يكتفون بمراقبتها من بعيد. الذكاء الاصطناعي لن يسلبك وظيفتك، بل سيفعل ذلك شخص يعرف كيف يستخدمه أفضل منك.",
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&fit=crop",
            date: "2025/01/26"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
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

const switchTab = (tabId: string, event: any) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('bg-orange-600', 'text-white', 'shadow-lg'));
    document.getElementById(tabId)?.classList.add('active');
    if (event) event.currentTarget.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    
    const detailContainer = document.getElementById('article-detail-content');
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors">
                <img src="${a.img}" class="w-full h-64 md:h-[500px] object-cover">
                <div class="p-6 md:p-16">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">${a.category}</span>
                        <span class="text-gray-400 text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-black mb-10 leading-tight dark:text-white">${a.title}</h1>
                    <div class="article-body text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-12 border-b border-gray-100 dark:border-gray-800 pb-12">
                        ${a.content.split('\n').map((p: string) => p.trim() ? `<p class="mb-6">${p}</p>` : '').join('')}
                    </div>
                </div>
            </div>
        `;
    }
    showPage('article-detail');
};

const viewStaticPage = (key: string) => {
    const container = document.getElementById('static-page-container');
    if (!container) return;
    let title = key === 'privacy' ? "الخصوصية" : (key === 'terms' ? "الشروط" : "من نحن");
    let content = state.staticPages[key as keyof typeof state.staticPages] || "";
    container.innerHTML = `<h1 class="text-3xl md:text-5xl font-black mb-10 text-orange-600">${title}</h1><div class="text-lg md:text-2xl leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">${content}</div>`;
    showPage('static');
};

const handleLogin = () => {
    const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (pass === state.adminPassword) { isLoggedIn = true; showPage('admin'); renderApp(); }
    else { document.getElementById('login-error')?.classList.remove('hidden'); }
};
const handleLogout = () => { isLoggedIn = false; showPage('home'); };

const saveOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    const editId = (document.getElementById('edit-offer-id') as HTMLInputElement).value;
    if (editId) {
        const idx = state.offers.findIndex((o: any) => o.id === editId);
        state.offers[idx] = { ...state.offers[idx], title, price, url, desc, img: currentMainImageBase64 || state.offers[idx].img };
    } else {
        state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: currentMainImageBase64, date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); alert('تم حفظ المنتج');
};

const saveArticle = () => {
    const title = (document.getElementById('article-title') as HTMLInputElement).value;
    const content = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    const category = (document.getElementById('article-category') as HTMLSelectElement).value;
    const editId = (document.getElementById('edit-article-id') as HTMLInputElement).value;
    if (editId) {
        const idx = state.articles.findIndex((a: any) => a.id === editId);
        state.articles[idx] = { ...state.articles[idx], title, content, category, img: currentArticleImageBase64 || state.articles[idx].img };
    } else {
        state.articles.unshift({ id: Date.now().toString(), title, content, category, img: currentArticleImageBase64, date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); alert('تم نشر المقال');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    syncAndRender(); alert('تم حفظ الإعدادات بنجاح');
};

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImage = async (e: any) => { if(!e.target.files[0]) return; currentMainImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('main-image-preview')!.setAttribute('src', currentMainImageBase64); document.getElementById('main-image-preview-container')!.classList.remove('hidden'); };
const previewArticleImage = async (e: any) => { if(!e.target.files[0]) return; currentArticleImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('article-image-preview')!.setAttribute('src', currentArticleImageBase64); document.getElementById('article-image-preview-container')!.classList.remove('hidden'); };

function deleteOffer(id: string) { if(confirm('حذف المنتج؟')){ state.offers = state.offers.filter((o:any)=>o.id !== id); syncAndRender(); } }
function deleteArticle(id: string) { if(confirm('حذف المقال؟')){ state.articles = state.articles.filter((a:any)=>a.id !== id); syncAndRender(); } }

function syncAndRender() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderApp(); }

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-copy-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();
    document.getElementById('footer-about-text')!.innerText = state.staticPages.about;

    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-sm hover:shadow-xl transition group">
                <div class="h-64 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black">مراجعة</span>
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-black mb-3 dark:text-white">${o.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">${o.desc}</p>
                    <div class="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                        <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition active:scale-95">شراء</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = state.articles.map((a: any) => `
            <article class="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-lg transition group">
                <div class="w-full sm:w-40 h-40 overflow-hidden rounded-3xl cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                </div>
                <div class="flex-grow flex flex-col justify-center">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-orange-600 text-[10px] font-black border-2 border-orange-600 px-3 py-0.5 rounded-full">${a.category}</span>
                        <span class="text-gray-400 text-[10px] font-bold">${a.date}</span>
                    </div>
                    <h3 class="text-xl font-black mb-4 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                    <button onclick="window.viewArticle('${a.id}')" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-black text-xs hover:bg-orange-600 hover:text-white transition w-fit">إقرأ المقال</button>
                </div>
            </article>
        `).join('');
    }

    if (isLoggedIn) {
        (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
        const oL = document.getElementById('admin-offers-list');
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b dark:border-gray-800"><td class="py-4 font-bold text-sm">${o.title}</td><td class="py-4 text-orange-600 font-bold text-sm">${o.price}</td><td class="py-4 text-left"><button onclick="window.deleteOffer('${o.id}')" class="bg-red-500 text-white px-4 py-1 rounded-lg text-xs font-bold">حذف</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-2 font-bold text-sm"><span>${a.title}</span><button onclick="window.deleteArticle('${a.id}')" class="bg-red-500 text-white px-4 py-1 rounded-lg text-xs">حذف</button></div>`).join('');
    }
}

const toggleDarkMode = () => { document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); };

Object.assign(window as any, { 
    showPage, switchTab, handleLogin, handleLogout, viewArticle, viewStaticPage, 
    saveOffer, saveArticle, saveSettings, previewMainImage, previewArticleImage,
    toggleDarkMode, deleteOffer, deleteArticle
});

document.addEventListener('DOMContentLoaded', renderApp);

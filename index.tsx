
/**
 * Affiliate Blog Engine - V7.0 (Production Ready)
 */

const STORAGE_KEY = 'aff_blog_pro_storage_v5';

const DEFAULT_BLOG_DATA = {
    siteName: "مدونة الصفقات",
    adminPassword: "admin123",
    ads: { enabled: true, head: "", top: "", footer: "" },
    social: {
        fb: "#",
        ig: "#",
        tw: "#",
        pin: "#"
    },
    staticPages: {
        about: "نحن منصة متخصصة في مراجعة أفضل المنتجات وتقديم صفقات حصرية لمتابعينا. هدفنا هو مساعدتك في اتخاذ قرار الشراء الأنسب.",
        privacy: "نحن نحترم خصوصيتك. نحن لا نقوم بجمع أي بيانات شخصية حساسة عن زوارنا إلا ما يتم تقديمه طواعية عبر نموذج الاتصال.",
        terms: "استخدامك للموقع يعني موافقتك على الشروط. الروابط الموجودة هي روابط أفلييت قد نحصل من خلالها على عمولة بسيطة عند الشراء دون أي تكلفة إضافية عليك.",
        contactInfo: "البريد الإلكتروني: contact@yourdomain.com\nالهاتف: +212 600 000 000\nالمقر: المغرب"
    },
    offers: [
        {
            id: "default-1",
            title: "ساعة Apple Watch Series 9",
            price: "4200 درهم",
            category: "تقنية",
            desc: "أحدث إصدارات أبل للمهتمين بالصحة والرياضة. مراجعة شاملة للميزات الجديدة.",
            img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&h=300&fit=crop",
            extraImgs: [],
            url: "https://amazon.com",
            date: "25 مايو 2024"
        }
    ],
    articles: [
        {
            id: "temu-morocco",
            title: "دليلك الشامل للشراء من Temu في المغرب 2024",
            content: "يعتبر موقع Temu حالياً من أقوى المواقع التي توفر منتجات بأسعار رخيصة جداً. في هذا المقال نشرح لك طريقة الطلب، الجمارك، ومدة التوصيل للمغرب بالتفصيل...",
            img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&h=400&fit=crop",
            url: "https://temu.to",
            date: "20 يونيو 2024"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentMainImageBase64 = '';
let currentExtraImages = [] as string[];
let currentArticleImageBase64 = '';

const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const togglePasswordVisibility = (inputId: string, iconId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>';
    } else {
        input.type = 'password';
        icon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
    }
};

const injectScript = (containerId: string, scriptHtml: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!scriptHtml || !state.ads.enabled) return;
    const range = document.createRange();
    const fragment = range.createContextualFragment(scriptHtml);
    container.appendChild(fragment);
};

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
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(a.title);
    const detailContainer = document.getElementById('article-detail-content');
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <img src="${a.img}" class="w-full h-[300px] md:h-[500px] object-cover">
                <div class="p-6 md:p-16">
                    <span class="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-4 py-1 rounded-full text-xs font-bold mb-6 inline-block">${a.date}</span>
                    <h1 class="text-3xl md:text-5xl font-black mb-10 leading-tight dark:text-white">${a.title}</h1>
                    <div class="article-body text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
                        ${a.content.split('\n').map((p: string) => `<p>${p}</p>`).join('')}
                    </div>
                    <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-100 dark:border-gray-800">
                        <div class="flex gap-4">
                            <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" class="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-white transition shadow-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
                            <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" class="w-12 h-12 bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-white rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                        </div>
                        ${a.url ? `<a href="${a.url}" target="_blank" class="w-full md:w-auto bg-orange-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-orange-700 transition">انتقل للعرض</a>` : ''}
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
    let title = "";
    let content = state.staticPages[key as keyof typeof state.staticPages] || "";
    
    switch(key) {
        case 'about': title = "من نحن"; break;
        case 'privacy': title = "سياسة الخصوصية"; break;
        case 'terms': title = "الشروط والأحكام"; break;
        case 'contact': title = "اتصل بنا"; break;
    }

    let extraHtml = "";
    if (key === 'contact') {
        extraHtml = `
            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="space-y-4">
                    <h4 class="text-xl font-bold">معلوماتنا</h4>
                    <p class="whitespace-pre-line text-gray-500">${state.staticPages.contactInfo}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <h4 class="text-xl font-bold mb-6">أرسل لنا رسالة</h4>
                    <div class="space-y-4">
                        <input type="text" placeholder="الاسم" class="w-full p-4 rounded-xl border-none outline-none dark:bg-gray-800">
                        <input type="email" placeholder="البريد الإلكتروني" class="w-full p-4 rounded-xl border-none outline-none dark:bg-gray-800">
                        <textarea placeholder="رسالتك..." class="w-full h-32 p-4 rounded-xl border-none outline-none dark:bg-gray-800"></textarea>
                        <button onclick="alert('تم إرسال رسالتك بنجاح سنرد عليك قريباً!')" class="w-full bg-orange-600 text-white py-4 rounded-xl font-bold">إرسال</button>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <h1 class="text-4xl font-black mb-10 text-orange-600">${title}</h1>
        <div class="text-lg leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">${content}</div>
        ${extraHtml}
    `;
    showPage('static');
};

// Admin Functions
const handleLogin = () => {
    const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (pass === state.adminPassword) {
        isLoggedIn = true;
        showPage('admin');
        renderApp();
    } else {
        document.getElementById('login-error')?.classList.remove('hidden');
    }
};

const handleLogout = () => { isLoggedIn = false; showPage('home'); };

/**
 * Fix: Added resetOfferForm and resetArticleForm to clear form fields after submission
 */
const resetOfferForm = () => {
    ['offer-title', 'offer-price', 'offer-url', 'offer-desc', 'edit-offer-id'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
        if (el) el.value = '';
    });
    currentMainImageBase64 = '';
    currentExtraImages = [];
    document.getElementById('main-image-preview-container')?.classList.add('hidden');
};

const resetArticleForm = () => {
    ['article-title', 'article-content', 'article-url-input', 'edit-article-id'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
        if (el) el.value = '';
    });
    currentArticleImageBase64 = '';
    document.getElementById('article-image-preview-container')?.classList.add('hidden');
};

/**
 * Fix: Added edit and delete handlers for Offers and Articles
 */
const editOffer = (id: string) => {
    const o = state.offers.find((x: any) => x.id === id);
    if (!o) return;
    (document.getElementById('offer-title') as HTMLInputElement).value = o.title;
    (document.getElementById('offer-price') as HTMLInputElement).value = o.price;
    (document.getElementById('offer-url') as HTMLInputElement).value = o.url;
    (document.getElementById('offer-desc') as HTMLTextAreaElement).value = o.desc;
    (document.getElementById('edit-offer-id') as HTMLInputElement).value = o.id;
    currentMainImageBase64 = o.img;
    currentExtraImages = o.extraImgs || [];
    const preview = document.getElementById('main-image-preview');
    if (preview) preview.setAttribute('src', o.img);
    document.getElementById('main-image-preview-container')?.classList.remove('hidden');
    switchTab('tab-offers-form', null);
};

const deleteOffer = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return;
    state.offers = state.offers.filter((o: any) => o.id !== id);
    syncAndRender();
};

const editArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    (document.getElementById('article-title') as HTMLInputElement).value = a.title;
    (document.getElementById('article-content') as HTMLTextAreaElement).value = a.content;
    (document.getElementById('article-url-input') as HTMLInputElement).value = a.url || '';
    (document.getElementById('edit-article-id') as HTMLInputElement).value = a.id;
    currentArticleImageBase64 = a.img;
    const preview = document.getElementById('article-image-preview');
    if (preview) preview.setAttribute('src', a.img);
    document.getElementById('article-image-preview-container')?.classList.remove('hidden');
    switchTab('tab-articles-form', null);
};

const deleteArticle = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    state.articles = state.articles.filter((a: any) => a.id !== id);
    syncAndRender();
};

const saveOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    const editId = (document.getElementById('edit-offer-id') as HTMLInputElement).value;
    if (!title || !price) return alert('أكمل الحقول');
    if (editId) {
        const idx = state.offers.findIndex((o: any) => o.id === editId);
        state.offers[idx] = { ...state.offers[idx], title, price, url, desc, img: currentMainImageBase64 || state.offers[idx].img, extraImgs: [...currentExtraImages] };
    } else {
        state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: currentMainImageBase64, extraImgs: [...currentExtraImages], date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); resetOfferForm(); alert('تم الحفظ');
};

const saveArticle = () => {
    const title = (document.getElementById('article-title') as HTMLInputElement).value;
    const content = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    const url = (document.getElementById('article-url-input') as HTMLInputElement).value;
    const editId = (document.getElementById('edit-article-id') as HTMLInputElement).value;
    if (!title || !content) return alert('أكمل الحقول');
    if (editId) {
        const idx = state.articles.findIndex((a: any) => a.id === editId);
        state.articles[idx] = { ...state.articles[idx], title, content, url, img: currentArticleImageBase64 || state.articles[idx].img };
    } else {
        state.articles.unshift({ id: Date.now().toString(), title, content, url, img: currentArticleImageBase64, date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); resetArticleForm(); alert('تم النشر');
};

const saveStaticPages = () => {
    state.staticPages.about = (document.getElementById('edit-about') as HTMLTextAreaElement).value;
    state.staticPages.privacy = (document.getElementById('edit-privacy') as HTMLTextAreaElement).value;
    state.staticPages.terms = (document.getElementById('edit-terms') as HTMLTextAreaElement).value;
    state.staticPages.contactInfo = (document.getElementById('edit-contact-info') as HTMLTextAreaElement).value;
    syncAndRender(); alert('تم حفظ الصفحات');
};

const saveAds = () => {
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    syncAndRender(); alert('تم حفظ الإعلانات');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    state.social.fb = (document.getElementById('social-fb') as HTMLInputElement).value;
    state.social.ig = (document.getElementById('social-ig') as HTMLInputElement).value;
    state.social.tw = (document.getElementById('social-tw') as HTMLInputElement).value;
    state.social.pin = (document.getElementById('social-pin') as HTMLInputElement).value;
    const pass = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    if (pass) state.adminPassword = pass;
    syncAndRender(); alert('تم حفظ الإعدادات');
};

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImage = async (e: any) => { currentMainImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('main-image-preview')!.setAttribute('src', currentMainImageBase64); document.getElementById('main-image-preview-container')!.classList.remove('hidden'); };
const previewArticleImage = async (e: any) => { currentArticleImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('article-image-preview')!.setAttribute('src', currentArticleImageBase64); document.getElementById('article-image-preview-container')!.classList.remove('hidden'); };

function syncAndRender() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderApp(); }

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-copy-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();
    document.getElementById('footer-about-text')!.innerText = state.staticPages.about.substring(0, 100) + "...";
    
    // Social Links
    (document.getElementById('footer-social-fb') as HTMLAnchorElement).href = state.social.fb;
    (document.getElementById('footer-social-ig') as HTMLAnchorElement).href = state.social.ig;
    (document.getElementById('footer-social-tw') as HTMLAnchorElement).href = state.social.tw;
    (document.getElementById('footer-social-pin') as HTMLAnchorElement).href = state.social.pin;

    injectScript('adsterra-head-placeholder', state.ads.head);
    injectScript('adsterra-top-placeholder', state.ads.top);
    injectScript('adsterra-footer-placeholder', state.ads.footer);

    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="blog-card bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-sm hover:shadow-xl transition group">
                <div class="h-64 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="main-img w-full h-full object-cover transition duration-700 group-hover:scale-110">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-black mb-3 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.open('${o.url}', '_blank')">${o.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">${o.desc}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">تسوق الآن</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = state.articles.map((a: any) => `
            <article class="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition">
                <div class="w-full md:w-40 h-40 overflow-hidden rounded-2xl cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="flex-grow">
                    <span class="text-orange-600 text-xs font-bold">${a.date}</span>
                    <h3 class="text-lg md:text-xl font-black mt-2 mb-3 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                    <button onclick="window.viewArticle('${a.id}')" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition">قراءة المقال كاملاً</button>
                </div>
            </article>
        `).join('');
    }

    if (isLoggedIn) {
        // Admin Tab Content Population
        (document.getElementById('edit-about') as HTMLTextAreaElement).value = state.staticPages.about;
        (document.getElementById('edit-privacy') as HTMLTextAreaElement).value = state.staticPages.privacy;
        (document.getElementById('edit-terms') as HTMLTextAreaElement).value = state.staticPages.terms;
        (document.getElementById('edit-contact-info') as HTMLTextAreaElement).value = state.staticPages.contactInfo;
        (document.getElementById('ad-head') as HTMLTextAreaElement).value = state.ads.head;
        (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
        (document.getElementById('social-fb') as HTMLInputElement).value = state.social.fb;
        (document.getElementById('social-ig') as HTMLInputElement).value = state.social.ig;
        (document.getElementById('social-tw') as HTMLInputElement).value = state.social.tw;
        (document.getElementById('social-pin') as HTMLInputElement).value = state.social.pin;
        
        // List Rendering
        const oL = document.getElementById('admin-offers-list');
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b border-gray-50 dark:border-gray-800"><td class="p-4 flex items-center gap-3"><img src="${o.img}" class="w-10 h-10 rounded"> <span class="text-sm font-bold dark:text-white">${o.title}</span></td><td class="p-4 text-left"><button onclick="window.editOffer('${o.id}')" class="text-blue-500 text-xs ml-3">تعديل</button><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 text-xs">حذف</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"><div class="flex items-center gap-3"><img src="${a.img}" class="w-10 h-10 rounded"> <span class="font-bold text-sm dark:text-white">${a.title}</span></div><div class="flex gap-4"><button onclick="window.editArticle('${a.id}')" class="text-blue-500 text-xs">تعديل</button><button onclick="window.deleteArticle('${a.id}')" class="text-red-500 text-xs">حذف</button></div></div>`).join('');
    }
}

// Bindings
Object.assign(window as any, { 
    showPage, switchTab, handleLogin, handleLogout, 
    viewArticle, viewStaticPage, 
    saveOffer, saveArticle, saveStaticPages, saveAds, saveSettings,
    previewMainImage, previewArticleImage,
    toggleDarkMode, togglePasswordVisibility,
    editOffer, deleteOffer, editArticle, deleteArticle, resetOfferForm, resetArticleForm
});

document.addEventListener('DOMContentLoaded', renderApp);

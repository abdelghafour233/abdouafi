
/**
 * Personalized Affiliate Platform - PC & Mobile Ready
 */

const STORAGE_KEY = 'aff_platform_v6';

const DEFAULT_BLOG_DATA = {
    siteName: "منصتي التقنية",
    siteUrl: "https://yourdomain.com",
    adminPassword: "admin",
    social: {
        fb: "https://facebook.com/yourprofile",
        ig: "https://instagram.com/yourprofile",
        tw: "https://twitter.com/yourprofile",
        pin: "https://pinterest.com/yourprofile"
    },
    staticPages: {
        about: "أهلاً بك في منصتي. هنا أشاركك شغفي بالتقنية وأفضل المنتجات التي أستخدمها وأثق بها.",
        privacy: "نحن نحمي خصوصيتك ولا نشارك بياناتك مع أي طرف ثالث.",
        terms: "جميع الروابط هي روابط أفلييت تدعم استمرار المحتوى."
    },
    offers: [
        {
            id: "of-1",
            title: "ساعة ذكية Ultra Pro",
            price: "850 درهم",
            desc: "أفضل ساعة ذكية للفئة المتوسطة مع شاشة AMOLED وبطارية تدوم طويلاً.",
            img: "https://images.unsplash.com/photo-1544117518-30dd0f135dce?q=80&w=400&h=300&fit=crop",
            url: "#",
            date: "2025/01/20"
        }
    ],
    articles: [
        {
            id: "ar-1",
            category: "تقنية",
            title: "كيف تختار هاتفك القادم في 2025؟",
            content: "لا تنجذب دائماً للأرقام الكبيرة في الكاميرا، المعالج وشاشة العرض هما الأهم لتجربة استخدام سلسة.\n\nفي هذا المقال قمنا بمراجعة شاملة لأهم المعايير التي تجعل هاتفك يدوم لسنوات دون مشاكل تقنية، بدءاً من جودة التصنيع وصولاً إلى دعم التحديثات الأمنية.",
            img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&h=400&fit=crop",
            date: "2025/01/22"
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
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(a.title);
    
    const detailContainer = document.getElementById('article-detail-content');
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-3xl md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <img src="${a.img}" class="w-full h-56 md:h-[500px] object-cover">
                <div class="p-6 md:p-16">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">${a.category}</span>
                        <span class="text-gray-400 text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-2xl md:text-5xl font-black mb-8 leading-tight dark:text-white">${a.title}</h1>
                    <div class="article-body text-gray-600 dark:text-gray-400 text-base md:text-xl leading-relaxed mb-12">
                        ${a.content.split('\n').map((p: string) => `<p>${p}</p>`).join('')}
                    </div>
                    
                    <div class="bg-gray-50 dark:bg-gray-800/50 p-6 md:p-10 rounded-3xl text-center">
                        <h4 class="text-lg font-black mb-6 dark:text-white">تواصل معي أو شارك المقال</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <a href="${state.social.fb}" target="_blank" class="bg-blue-600 text-white py-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                <span class="text-[10px] font-black">فيسبوك</span>
                            </a>
                            <a href="${state.social.ig}" target="_blank" class="bg-pink-600 text-white py-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                <span class="text-[10px] font-black">انستغرام</span>
                            </a>
                            <a href="${state.social.tw}" target="_blank" class="bg-gray-900 text-white py-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                <span class="text-[10px] font-black">تويتر</span>
                            </a>
                            <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" class="bg-green-600 text-white py-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                <span class="text-[10px] font-black">واتساب</span>
                            </a>
                        </div>
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
    container.innerHTML = `<h1 class="text-3xl md:text-4xl font-black mb-8 text-orange-600">${title}</h1><div class="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">${content}</div>`;
    showPage('static');
};

// Logic Functions
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
    syncAndRender(); alert('تم الحفظ');
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
    syncAndRender(); alert('تم النشر');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    state.social.fb = (document.getElementById('social-fb') as HTMLInputElement).value;
    state.social.ig = (document.getElementById('social-ig') as HTMLInputElement).value;
    state.social.tw = (document.getElementById('social-tw') as HTMLInputElement).value;
    state.social.pin = (document.getElementById('social-pin') as HTMLInputElement).value;
    syncAndRender(); alert('تم التحديث');
};

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImage = async (e: any) => { if(!e.target.files[0]) return; currentMainImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('main-image-preview')!.setAttribute('src', currentMainImageBase64); document.getElementById('main-image-preview-container')!.classList.remove('hidden'); };
const previewArticleImage = async (e: any) => { if(!e.target.files[0]) return; currentArticleImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('article-image-preview')!.setAttribute('src', currentArticleImageBase64); document.getElementById('article-image-preview-container')!.classList.remove('hidden'); };

function syncAndRender() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderApp(); }

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-copy-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();
    document.getElementById('footer-about-text')!.innerText = state.staticPages.about;
    
    // Socials
    const fb = document.getElementById('footer-social-fb') as HTMLAnchorElement; fb.href = state.social.fb;
    const ig = document.getElementById('footer-social-ig') as HTMLAnchorElement; ig.href = state.social.ig;

    // Grids
    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="blog-card bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-sm hover:shadow-xl transition group">
                <div class="h-56 md:h-64 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="main-img w-full h-full object-cover transition duration-500 group-hover:scale-110">
                    <span class="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold">مراجعة</span>
                </div>
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 class="text-lg md:text-xl font-black mb-2 dark:text-white">${o.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-4 line-clamp-3">${o.desc}</p>
                    <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                        <span class="text-orange-600 font-black text-lg md:text-xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-sm transition-transform active:scale-95">شراء</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = state.articles.map((a: any) => `
            <article class="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 md:gap-6 shadow-sm hover:shadow-md transition">
                <div class="w-full sm:w-32 md:w-40 h-40 overflow-hidden rounded-2xl cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="flex-grow">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-orange-600 text-[10px] font-bold border border-orange-600 px-2 py-0.5 rounded-full">${a.category}</span>
                        <span class="text-gray-400 text-[10px] font-bold">${a.date}</span>
                    </div>
                    <h3 class="text-base md:text-lg font-black mb-4 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                    <button onclick="window.viewArticle('${a.id}')" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition">التفاصيل</button>
                </div>
            </article>
        `).join('');
    }

    if (isLoggedIn) {
        (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
        (document.getElementById('social-fb') as HTMLInputElement).value = state.social.fb;
        (document.getElementById('social-ig') as HTMLInputElement).value = state.social.ig;
        (document.getElementById('social-tw') as HTMLInputElement).value = state.social.tw;
        (document.getElementById('social-pin') as HTMLInputElement).value = state.social.pin;

        const oL = document.getElementById('admin-offers-list');
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b dark:border-gray-800 text-xs md:text-sm"><td class="py-3">${o.title}</td><td class="text-left py-3"><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 font-bold">حذف</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2 text-xs md:text-sm"><span>${a.title}</span><button onclick="window.deleteArticle('${a.id}')" class="text-red-500 font-bold">حذف</button></div>`).join('');
    }
}

const toggleDarkMode = () => { document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); };

Object.assign(window as any, { 
    showPage, switchTab, handleLogin, handleLogout, viewArticle, viewStaticPage, 
    saveOffer, saveArticle, saveSettings, previewMainImage, previewArticleImage,
    toggleDarkMode
});

document.addEventListener('DOMContentLoaded', renderApp);

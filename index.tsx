
/**
 * abdouweb - Professional Moroccan Tech & Affiliate Platform
 */

const STORAGE_KEY = 'abdouweb_final_v2';

const DEFAULT_BLOG_DATA = {
    siteName: "abdouweb",
    siteUrl: "https://abdouweb.ma",
    adminPassword: "admin",
    social: {
        fb: "https://facebook.com/yourprofile",
        ig: "https://instagram.com/yourprofile",
        tw: "https://twitter.com/yourprofile",
        pin: "https://pinterest.com/yourprofile",
        yt: "https://youtube.com/@yourchannel",
        li: "https://linkedin.com/in/yourprofile",
        wa: "https://wa.me/212600000000"
    },
    staticPages: {
        about: "مرحباً بكم في abdouweb، منصتكم الأولى لمتابعة جديد التقنية في المغرب، نصائح تطوير الذات، وأفضل مراجعات المنتجات التقنية التي تستحق استثماركم.",
        privacy: "سياسة الخصوصية لدينا تضمن حماية بيانات زوارنا المغاربة بشكل كامل.",
        terms: "استخدامك للموقع يعني موافقتك على شروط الاستخدام. الروابط قد تتضمن روابط أفلييت لدعم استمراريتنا."
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
            title: "مستقبل تقنية 5G في المدن المغربية الكبرى",
            content: "يشهد المغرب تحولاً رقمياً متسارعاً مع اقتراب تعميم شبكات الجيل الخامس. في هذا المقال، نحلل التأثيرات المرتقبة على المقاولات الناشئة وسرعة الإنترنت المنزلي.\n\nمن المتوقع أن يساهم هذا التطور في تعزيز الاقتصاد الرقمي الوطني وفتح فرص شغل جديدة للشباب المغربي في مجالات البرمجة والذكاء الاصطناعي.",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop",
            date: "2025/01/25"
        },
        {
            id: "ar-2",
            category: "تطوير الذات",
            title: "5 عادات يومية تزيد من إنتاجيتك كصانع محتوى",
            content: "الإنتاجية ليست بالعمل لساعات طويلة، بل بالعمل بذكاء. تنظيم الوقت، ممارسة الرياضة الصباحية، والابتعاد عن المشتتات هي مفاتيح النجاح.\n\nابدأ يومك بتحديد أهم ثلاث مهام فقط، وسترى الفرق الشاسع في إنجازاتك الأسبوعية.",
            img: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=600&h=400&fit=crop",
            date: "2025/01/24"
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
            <div class="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors">
                <img src="${a.img}" class="w-full h-64 md:h-[500px] object-cover">
                <div class="p-6 md:p-16">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">${a.category}</span>
                        <span class="text-gray-400 text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-black mb-10 leading-tight dark:text-white">${a.title}</h1>
                    <div class="article-body text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-12 border-b border-gray-100 dark:border-gray-800 pb-12">
                        ${a.content.split('\n').map((p: string) => `<p>${p}</p>`).join('')}
                    </div>
                    
                    <div class="mt-8 text-center">
                        <h4 class="text-xl font-black mb-8 dark:text-white">شارك المقال</h4>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="flex flex-col items-center gap-3 p-6 bg-blue-600/10 text-blue-600 rounded-3xl hover:bg-blue-600 hover:text-white transition group shadow-sm">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                <span class="font-bold text-xs">فيسبوك</span>
                            </a>
                            <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" class="flex flex-col items-center gap-3 p-6 bg-gray-900/10 text-gray-900 dark:text-white rounded-3xl hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black hover:text-white transition shadow-sm">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                <span class="font-bold text-xs">تويتر</span>
                            </a>
                            <a href="https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}" target="_blank" class="flex flex-col items-center gap-3 p-6 bg-red-600/10 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition shadow-sm">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                                <span class="font-bold text-xs">بنتريست</span>
                            </a>
                            <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" class="flex flex-col items-center gap-3 p-6 bg-green-600/10 text-green-600 rounded-3xl hover:bg-green-600 hover:text-white transition shadow-sm">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                <span class="font-bold text-xs">واتساب</span>
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
    state.social.yt = (document.getElementById('social-yt') as HTMLInputElement).value;
    state.social.li = (document.getElementById('social-li') as HTMLInputElement).value;
    state.social.wa = (document.getElementById('social-wa') as HTMLInputElement).value;
    syncAndRender(); alert('تم التحديث');
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
    
    // Update footer social links
    (document.getElementById('footer-social-fb') as HTMLAnchorElement).href = state.social.fb;
    (document.getElementById('footer-social-ig') as HTMLAnchorElement).href = state.social.ig;
    (document.getElementById('footer-social-tw') as HTMLAnchorElement).href = state.social.tw;
    (document.getElementById('footer-social-pin') as HTMLAnchorElement).href = state.social.pin;
    (document.getElementById('footer-social-yt') as HTMLAnchorElement).href = state.social.yt;
    (document.getElementById('footer-social-li') as HTMLAnchorElement).href = state.social.li;
    (document.getElementById('footer-social-wa') as HTMLAnchorElement).href = state.social.wa;

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
        (document.getElementById('social-fb') as HTMLInputElement).value = state.social.fb;
        (document.getElementById('social-ig') as HTMLInputElement).value = state.social.ig;
        (document.getElementById('social-tw') as HTMLInputElement).value = state.social.tw;
        (document.getElementById('social-pin') as HTMLInputElement).value = state.social.pin;
        (document.getElementById('social-yt') as HTMLInputElement).value = state.social.yt;
        (document.getElementById('social-li') as HTMLInputElement).value = state.social.li;
        (document.getElementById('social-wa') as HTMLInputElement).value = state.social.wa;

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

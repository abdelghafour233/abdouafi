
/**
 * Affiliate Blog Engine - V7.4 (Personalized & Cleaned)
 */

const STORAGE_KEY = 'aff_blog_pro_storage_v5';

const DEFAULT_BLOG_DATA = {
    siteName: "abdouweb",
    siteUrl: "https://abdouweb.ma",
    adminPassword: "admin123",
    ads: { enabled: true, head: "", top: "", footer: "" },
    social: {
        fb: "https://facebook.com/your_username",
        ig: "https://instagram.com/your_username",
        tw: "https://twitter.com/your_username",
        pin: "https://pinterest.com/your_username"
    },
    staticPages: {
        about: "مرحباً بكم في منصتي الشخصية. أنا أركز على تمكين الفرد المغربي من خلال تزويده بأحدث أخبار التكنولوجيا، استراتيجيات تطوير الذات، ومراجعات دقيقة للمنتجات.",
        privacy: "نحن نحترم خصوصيتك تماماً. لا يتم جمع أي بيانات دون موافقتك.",
        terms: "جميع الروابط هي روابط أفلييت تدعم استمرار المحتوى دون أي تكلفة إضافية عليك.",
        contactInfo: "البريد الإلكتروني: contact@yourdomain.com\nالمقر: المغرب"
    },
    offers: [
        {
            id: "review-1",
            title: "مراجعة MacBook Air M3: هل يستحق الشراء في المغرب؟",
            price: "12,900 درهم",
            category: "مراجعات المنتجات",
            desc: "أداء مذهل وعمر بطارية طويل. قمنا باختبار النسخة الجديدة لنعرف مدى ملاءمتها للمبرمجين والمصممين المغاربة.",
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&h=300&fit=crop",
            extraImgs: [],
            url: "https://amazon.com",
            date: "12 يناير 2025"
        }
    ],
    articles: [
        {
            id: "morocco-tech-5g",
            category: "تقنية المغرب",
            title: "إطلاق خدمات الجيل الخامس (5G) في المغرب: ماذا يعني ذلك للمقاولات الناشئة؟",
            content: "يشهد المغرب تحولاً رقمياً كبيراً مع اقتراب الإطلاق الفعلي لشبكات الجيل الخامس. هذا التحول سيفتح آفاقاً جديدة للشركات الناشئة في مجالات الذكاء الاصطناعي وإنترنت الأشياء، مما يعزز مكانة المغرب كقطب تكنولوجي في أفريقيا.\n\nمن المتوقع أن يساهم هذا التطور في تسريع وتيرة الرقمنة في مختلف القطاعات الحيوية، مما يوفر فرص عمل جديدة للشباب المغربي في مجالات التكنولوجيا والابتكار.",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop",
            url: "https://example.com",
            date: "15 يناير 2025"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentMainImageBase64 = '';
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
            <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors">
                <img src="${a.img}" class="w-full h-[300px] md:h-[500px] object-cover">
                <div class="p-6 md:p-16">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">${a.category || 'مقال'}</span>
                        <span class="text-gray-400 dark:text-gray-500 text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-black mb-10 leading-tight dark:text-white">${a.title}</h1>
                    <div class="article-body text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-12 border-b border-gray-100 dark:border-gray-800 pb-10">
                        ${a.content.split('\n').map((p: string) => `<p>${p}</p>`).join('')}
                    </div>
                    
                    <div class="space-y-6">
                        <h4 class="text-lg font-black text-center dark:text-white">تابعني وشارك المقال</h4>
                        <div class="flex flex-wrap justify-center gap-6">
                            <a href="${state.social.fb}" target="_blank" class="flex flex-col items-center gap-2 group">
                                <div class="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </div>
                                <span class="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition">فيسبوك</span>
                            </a>
                            <a href="${state.social.ig}" target="_blank" class="flex flex-col items-center gap-2 group">
                                <div class="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </div>
                                <span class="text-xs font-bold text-gray-400 group-hover:text-pink-600 transition">انستغرام</span>
                            </a>
                            <a href="${state.social.pin}" target="_blank" class="flex flex-col items-center gap-2 group">
                                <div class="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                                </div>
                                <span class="text-xs font-bold text-gray-400 group-hover:text-red-600 transition">بنتريست</span>
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
    let title = "";
    let content = state.staticPages[key as keyof typeof state.staticPages] || "";
    
    switch(key) {
        case 'about': title = "من نحن"; break;
        case 'privacy': title = "سياسة الخصوصية"; break;
        case 'terms': title = "الشروط والأحكام"; break;
        case 'contact': title = "اتصل بنا"; break;
    }

    container.innerHTML = `
        <h1 class="text-4xl font-black mb-10 text-orange-600">${title}</h1>
        <div class="text-lg leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">${content}</div>
        ${key === 'contact' ? `
            <div class="mt-12 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 transition-colors">
                <h4 class="text-xl font-bold mb-6">تواصل معي مباشرة</h4>
                <p class="mb-6 text-gray-500">${state.staticPages.contactInfo}</p>
                <div class="space-y-4">
                    <input id="contact-name" type="text" placeholder="اسمك الكريم" class="w-full p-4 rounded-xl dark:bg-gray-800 border-none outline-none">
                    <textarea id="contact-msg" placeholder="اكتب رسالتك هنا..." class="w-full h-32 p-4 rounded-xl dark:bg-gray-800 border-none outline-none"></textarea>
                    <button onclick="alert('تم استلام رسالتك، سأقوم بالرد عليك في أقرب وقت!')" class="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition">إرسال الرسالة</button>
                </div>
            </div>
        ` : ''}
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

const resetOfferForm = () => {
    ['offer-title', 'offer-price', 'offer-url', 'offer-desc', 'edit-offer-id'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
    });
    currentMainImageBase64 = '';
    document.getElementById('main-image-preview-container')?.classList.add('hidden');
};

const resetArticleForm = () => {
    ['article-title', 'article-content', 'edit-article-id'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
    });
    currentArticleImageBase64 = '';
    document.getElementById('article-image-preview-container')?.classList.add('hidden');
};

const editOffer = (id: string) => {
    const o = state.offers.find((x: any) => x.id === id);
    if (!o) return;
    (document.getElementById('offer-title') as HTMLInputElement).value = o.title;
    (document.getElementById('offer-price') as HTMLInputElement).value = o.price;
    (document.getElementById('offer-url') as HTMLInputElement).value = o.url;
    (document.getElementById('offer-desc') as HTMLTextAreaElement).value = o.desc;
    (document.getElementById('edit-offer-id') as HTMLInputElement).value = o.id;
    currentMainImageBase64 = o.img;
    const preview = document.getElementById('main-image-preview');
    if (preview) preview.setAttribute('src', o.img);
    document.getElementById('main-image-preview-container')?.classList.remove('hidden');
};

const deleteOffer = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    state.offers = state.offers.filter((o: any) => o.id !== id);
    syncAndRender();
};

const editArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    (document.getElementById('article-title') as HTMLInputElement).value = a.title;
    (document.getElementById('article-content') as HTMLTextAreaElement).value = a.content;
    (document.getElementById('edit-article-id') as HTMLInputElement).value = a.id;
    (document.getElementById('article-category') as HTMLSelectElement).value = a.category || "تقنية المغرب";
    currentArticleImageBase64 = a.img;
    const preview = document.getElementById('article-image-preview');
    if (preview) preview.setAttribute('src', a.img);
    document.getElementById('article-image-preview-container')?.classList.remove('hidden');
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
    if (editId) {
        const idx = state.offers.findIndex((o: any) => o.id === editId);
        state.offers[idx] = { ...state.offers[idx], title, price, url, desc, img: currentMainImageBase64 || state.offers[idx].img };
    } else {
        state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: currentMainImageBase64, date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); resetOfferForm(); alert('تم حفظ المنتج بنجاح!');
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
    syncAndRender(); resetArticleForm(); alert('تم نشر المقال بنجاح!');
};

const saveStaticPages = () => {
    state.staticPages.about = (document.getElementById('edit-about') as HTMLTextAreaElement).value;
    state.staticPages.privacy = (document.getElementById('edit-privacy') as HTMLTextAreaElement).value;
    state.staticPages.terms = (document.getElementById('edit-terms') as HTMLTextAreaElement).value;
    syncAndRender(); alert('تم حفظ الصفحات القانونية!');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    state.siteUrl = (document.getElementById('site-url-input') as HTMLInputElement).value;
    state.social.fb = (document.getElementById('social-fb') as HTMLInputElement).value;
    state.social.ig = (document.getElementById('social-ig') as HTMLInputElement).value;
    state.social.tw = (document.getElementById('social-tw') as HTMLInputElement).value;
    state.social.pin = (document.getElementById('social-pin') as HTMLInputElement).value;
    syncAndRender(); alert('تم تحديث الإعدادات والروابط بنجاح!');
};

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImage = async (e: any) => { if(!e.target.files[0]) return; currentMainImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('main-image-preview')!.setAttribute('src', currentMainImageBase64); document.getElementById('main-image-preview-container')!.classList.remove('hidden'); };
const previewArticleImage = async (e: any) => { if(!e.target.files[0]) return; currentArticleImageBase64 = await fileToBase64(e.target.files[0]); document.getElementById('article-image-preview')!.setAttribute('src', currentArticleImageBase64); document.getElementById('article-image-preview-container')!.classList.remove('hidden'); };

function syncAndRender() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderApp(); }

function renderApp() {
    // Update texts
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-copy-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();
    document.getElementById('footer-about-text')!.innerText = state.staticPages.about.substring(0, 100) + "...";
    
    // Social Links Logic (Update icons links to match User Profiles)
    const fbLink = document.getElementById('footer-social-fb') as HTMLAnchorElement;
    fbLink.href = state.social.fb; 
    fbLink.style.display = (state.social.fb && state.social.fb !== "#") ? 'flex' : 'none';
    
    const igLink = document.getElementById('footer-social-ig') as HTMLAnchorElement;
    igLink.href = state.social.ig; 
    igLink.style.display = (state.social.ig && state.social.ig !== "#") ? 'flex' : 'none';
    
    const twLink = document.getElementById('footer-social-tw') as HTMLAnchorElement;
    twLink.href = state.social.tw; 
    twLink.style.display = (state.social.tw && state.social.tw !== "#") ? 'flex' : 'none';
    
    const pinLink = document.getElementById('footer-social-pin') as HTMLAnchorElement;
    pinLink.href = state.social.pin; 
    pinLink.style.display = (state.social.pin && state.social.pin !== "#") ? 'flex' : 'none';

    // Grids rendering (Offers & Articles)
    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="blog-card bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-sm hover:shadow-xl transition group">
                <div class="h-64 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="main-img w-full h-full object-cover transition duration-700 group-hover:scale-110">
                    <span class="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">مراجعة</span>
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-black mb-3 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.open('${o.url}', '_blank')">${o.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">${o.desc}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">التفاصيل</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = state.articles.map((a: any) => {
            return `
            <article class="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition">
                <div class="w-full md:w-40 h-40 overflow-hidden rounded-2xl cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="flex-grow flex flex-col">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-orange-600 text-[10px] font-bold border border-orange-600 px-2 py-0.5 rounded-full">${a.category || 'تقنية'}</span>
                        <span class="text-gray-400 dark:text-gray-500 text-[10px] font-bold">${a.date}</span>
                    </div>
                    <h3 class="text-lg md:text-xl font-black mb-3 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                    <div class="mt-auto flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-4">
                        <button onclick="window.viewArticle('${a.id}')" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition">إقرأ المقال</button>
                        <div class="flex gap-2">
                            <a href="${state.social.fb}" target="_blank" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="فيسبوك">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="${state.social.ig}" target="_blank" class="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="انستغرام">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="${state.social.pin}" target="_blank" class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="بنتريست">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `}).join('');
    }

    if (isLoggedIn) {
        // Populating admin inputs
        const siteNameInput = document.getElementById('site-name-input') as HTMLInputElement;
        if(siteNameInput) siteNameInput.value = state.siteName;
        
        const siteUrlInput = document.getElementById('site-url-input') as HTMLInputElement;
        if(siteUrlInput) siteUrlInput.value = state.siteUrl;

        (document.getElementById('social-fb') as HTMLInputElement).value = state.social.fb;
        (document.getElementById('social-ig') as HTMLInputElement).value = state.social.ig;
        (document.getElementById('social-tw') as HTMLInputElement).value = state.social.tw;
        (document.getElementById('social-pin') as HTMLInputElement).value = state.social.pin;
        (document.getElementById('edit-about') as HTMLTextAreaElement).value = state.staticPages.about;
        (document.getElementById('edit-privacy') as HTMLTextAreaElement).value = state.staticPages.privacy;
        (document.getElementById('edit-terms') as HTMLTextAreaElement).value = state.staticPages.terms;

        const oL = document.getElementById('admin-offers-list');
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b dark:border-gray-800"><td class="py-2 font-bold text-sm">${o.title}</td><td class="text-left py-2"><button onclick="window.editOffer('${o.id}')" class="text-blue-500 mr-2 text-xs">تعديل</button><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 text-xs">حذف</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2"><span>${a.title}</span><div class="flex gap-4"><button onclick="window.editArticle('${a.id}')" class="text-blue-500 text-xs">تعديل</button><button onclick="window.deleteArticle('${a.id}')" class="text-red-500 text-xs">حذف</button></div></div>`).join('');
    }
}

Object.assign(window as any, { 
    showPage, switchTab, handleLogin, handleLogout, viewArticle, viewStaticPage, 
    saveOffer, saveArticle, saveStaticPages, saveSettings, previewMainImage, previewArticleImage,
    toggleDarkMode, togglePasswordVisibility, editOffer, deleteOffer, editArticle, deleteArticle
});

document.addEventListener('DOMContentLoaded', renderApp);

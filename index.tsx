
/**
 * Affiliate Blog Engine - V4.8 (Temu Morocco & Action Links Support)
 */

const STORAGE_KEY = 'aff_blog_pro_storage_v4';

const DEFAULT_BLOG_DATA = {
    siteName: "مدونة الصفقات",
    adminPassword: "admin123",
    ads: { enabled: true, head: "", top: "", footer: "" },
    offers: [
        {
            id: "default-1",
            title: "Apple Watch Series 9",
            price: "399$",
            category: "تقنية",
            desc: "تعتبر هذه الساعة هي الأفضل حالياً لمستخدمي أيفون، حيث تقدم ميزات صحية متطورة ومعالجاً أسرع من أي وقت مضى. جربناها لمدة أسبوع وإليك الانطباع الكامل.",
            img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&h=300&fit=crop",
            url: "https://amazon.com",
            date: "25 مايو 2024"
        }
    ],
    articles: [
        {
            id: "temu-morocco",
            title: "لماذا تيمو (Temu) هو الخيار الأفضل للمتسوقين في المغرب؟",
            content: "أحدث موقع تيمو ثورة في عالم التسوق الإلكتروني بالمغرب، حيث يوفر ملايين المنتجات بأسعار تنافسية لا تقبل المنافسة. من أهم مميزات الشراء من تيمو في المغرب هي خدمة التوصيل المجاني والسريع لجميع المدن، بالإضافة إلى جودة المنتجات وتنوعها الهائل الذي يشمل الملابس، الإلكترونيات، والأدوات المنزلية. كما يوفر الموقع طرق دفع آمنة وسهلة تناسب المستخدم المغربي. لا تفوت فرصة الحصول على خصومات حصرية وتوصيل مجاني لباب منزلك.",
            img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&h=400&fit=crop",
            url: "https://temu.to/k/u6zpr84k5n5",
            date: "20 يونيو 2024"
        },
        {
            id: "art-1",
            title: "مقدمة شاملة في التجارة الإلكترونية",
            content: "تعتبر التجارة الإلكترونية اليوم عصب الاقتصاد العالمي الجديد. في هذا المقال، سنستعرض الخطوات الأساسية لإنشاء متجرك الأول، من اختيار المنصة المناسبة وصولاً إلى استراتيجيات التسويق الرقمي الفعالة في عام 2025.",
            img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&h=400&fit=crop",
            url: "",
            date: "12 يونيو 2024"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentMainImageBase64 = '';
let currentArticleImageBase64 = '';

const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
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
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
        hero?.classList.add('hidden');
    } else {
        document.getElementById(`page-${pageId}`)?.classList.remove('hidden');
        if (pageId === 'admin') hero?.classList.add('hidden');
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

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const previewMainImage = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
        currentMainImageBase64 = await fileToBase64(file);
        const img = document.getElementById('main-image-preview') as HTMLImageElement;
        img.src = currentMainImageBase64;
        document.getElementById('main-image-preview-container')?.classList.remove('hidden');
        document.getElementById('main-upload-label')?.classList.add('hidden');
    }
};

const previewArticleImage = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
        currentArticleImageBase64 = await fileToBase64(file);
        const img = document.getElementById('article-image-preview') as HTMLImageElement;
        img.src = currentArticleImageBase64;
        document.getElementById('article-image-preview-container')?.classList.remove('hidden');
        document.getElementById('article-upload-label')?.classList.add('hidden');
    }
};

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

const saveOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    const editId = (document.getElementById('edit-offer-id') as HTMLInputElement).value;

    if (!title || !price || (!currentMainImageBase64 && !editId)) return alert('يرجى ملء البيانات الأساسية');

    if (editId) {
        const idx = state.offers.findIndex((o: any) => o.id === editId);
        if (idx !== -1) state.offers[idx] = { ...state.offers[idx], title, price, url, desc, img: currentMainImageBase64 || state.offers[idx].img };
    } else {
        state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: currentMainImageBase64, date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); resetOfferForm(); alert('تم الحفظ');
};

const deleteOffer = (id: string) => { if (confirm('حذف؟')) { state.offers = state.offers.filter((o: any) => o.id !== id); syncAndRender(); } };

const editOffer = (id: string) => {
    const o = state.offers.find((o: any) => o.id === id);
    if (!o) return;
    (document.getElementById('edit-offer-id') as HTMLInputElement).value = o.id;
    (document.getElementById('offer-title') as HTMLInputElement).value = o.title;
    (document.getElementById('offer-price') as HTMLInputElement).value = o.price;
    (document.getElementById('offer-url') as HTMLInputElement).value = o.url;
    (document.getElementById('offer-desc') as HTMLTextAreaElement).value = o.desc;
    (document.getElementById('main-image-preview') as HTMLImageElement).src = o.img;
    document.getElementById('main-image-preview-container')?.classList.remove('hidden');
    document.getElementById('main-upload-label')?.classList.add('hidden');
    document.getElementById('offer-form-title')!.innerText = "تعديل المنتج";
    document.getElementById('btn-cancel-offer-edit')?.classList.remove('hidden');
};

const resetOfferForm = () => {
    ['offer-title', 'offer-price', 'offer-url', 'offer-desc', 'edit-offer-id', 'offer-img-file'].forEach(id => (document.getElementById(id) as any).value = '');
    currentMainImageBase64 = '';
    document.getElementById('main-image-preview-container')?.classList.add('hidden');
    document.getElementById('main-upload-label')?.classList.remove('hidden');
    document.getElementById('offer-form-title')!.innerText = "إضافة منتج جديد";
    document.getElementById('btn-cancel-offer-edit')?.classList.add('hidden');
};

// Article Functions
const saveArticle = () => {
    const title = (document.getElementById('article-title') as HTMLInputElement).value;
    const content = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    const url = (document.getElementById('article-url-input') as HTMLInputElement).value;
    const editId = (document.getElementById('edit-article-id') as HTMLInputElement).value;

    if (!title || !content || (!currentArticleImageBase64 && !editId)) return alert('يرجى كتابة العنوان والمحتوى');

    if (editId) {
        const idx = state.articles.findIndex((a: any) => a.id === editId);
        if (idx !== -1) state.articles[idx] = { ...state.articles[idx], title, content, url, img: currentArticleImageBase64 || state.articles[idx].img };
    } else {
        state.articles.unshift({ id: Date.now().toString(), title, content, url, img: currentArticleImageBase64, date: new Date().toLocaleDateString('ar-EG') });
    }
    syncAndRender(); resetArticleForm(); alert('تم نشر المقال');
};

const editArticle = (id: string) => {
    const a = state.articles.find((a: any) => a.id === id);
    if (!a) return;
    (document.getElementById('edit-article-id') as HTMLInputElement).value = a.id;
    (document.getElementById('article-title') as HTMLInputElement).value = a.title;
    (document.getElementById('article-content') as HTMLTextAreaElement).value = a.content;
    (document.getElementById('article-url-input') as HTMLInputElement).value = a.url || '';
    (document.getElementById('article-image-preview') as HTMLImageElement).src = a.img;
    document.getElementById('article-image-preview-container')?.classList.remove('hidden');
    document.getElementById('article-upload-label')?.classList.add('hidden');
    document.getElementById('article-form-title')!.innerText = "تعديل المقال";
    document.getElementById('btn-cancel-article-edit')?.classList.remove('hidden');
};

const deleteArticle = (id: string) => { if (confirm('حذف المقال؟')) { state.articles = state.articles.filter((a: any) => a.id !== id); syncAndRender(); } };

const resetArticleForm = () => {
    ['article-title', 'article-content', 'article-url-input', 'edit-article-id', 'article-img-file'].forEach(id => (document.getElementById(id) as any).value = '');
    currentArticleImageBase64 = '';
    document.getElementById('article-image-preview-container')?.classList.add('hidden');
    document.getElementById('article-upload-label')?.classList.remove('hidden');
    document.getElementById('article-form-title')!.innerText = "كتابة مقال جديد";
    document.getElementById('btn-cancel-article-edit')?.classList.add('hidden');
};

const saveAds = () => {
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    syncAndRender(); alert('تم حفظ الإعلانات');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value || state.siteName;
    const np = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    if (np) state.adminPassword = np;
    syncAndRender(); alert('تم الحفظ');
};

function syncAndRender() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderApp(); }

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();
    injectScript('adsterra-head-placeholder', state.ads.head);
    injectScript('adsterra-top-placeholder', state.ads.top);
    injectScript('adsterra-footer-placeholder', state.ads.footer);

    // Render Home Grid (Offers)
    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="blog-card bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-sm hover:shadow-xl transition group">
                <div class="h-64 overflow-hidden"><img src="${o.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110"></div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-black mb-3 line-clamp-2 dark:text-white">${o.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">${o.desc}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition">تسوق الآن</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // Render Home Articles
    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = state.articles.map((a: any) => `
            <article class="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition">
                <img src="${a.img}" class="w-full md:w-40 h-40 object-cover rounded-2xl">
                <div class="flex-grow">
                    <span class="text-orange-600 text-xs font-bold">${a.date}</span>
                    <h3 class="text-lg font-black mt-2 mb-3 dark:text-white">${a.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">${a.content}</p>
                    <div class="flex gap-4 items-center">
                        ${a.url ? `<a href="${a.url}" target="_blank" class="bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-orange-700 transition">انتقل للعرض</a>` : ''}
                        <button class="text-gray-400 dark:text-gray-500 font-bold text-xs hover:underline">قراءة المقال كاملاً</button>
                    </div>
                </div>
            </article>
        `).join('');
    }

    if (isLoggedIn) {
        // Admin Offer List
        const offerList = document.getElementById('admin-offers-list');
        if (offerList) offerList.innerHTML = state.offers.map((o: any) => `
            <tr class="border-b border-gray-50 dark:border-gray-800">
                <td class="p-4 flex items-center gap-3"><img src="${o.img}" class="w-10 h-10 rounded-lg"> <span class="text-sm font-bold truncate max-w-[150px] dark:text-white">${o.title}</span></td>
                <td class="p-4 text-left"><button onclick="window.editOffer('${o.id}')" class="text-blue-500 text-xs ml-3">تعديل</button><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 text-xs">حذف</button></td>
            </tr>
        `).join('');

        // Admin Article List
        const artList = document.getElementById('admin-articles-list');
        if (artList) artList.innerHTML = state.articles.map((a: any) => `
            <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div class="flex items-center gap-3"><img src="${a.img}" class="w-10 h-10 rounded-lg"> <span class="font-bold text-sm dark:text-white">${a.title}</span></div>
                <div class="flex gap-4"><button onclick="window.editArticle('${a.id}')" class="text-blue-500 text-xs">تعديل</button><button onclick="window.deleteArticle('${a.id}')" class="text-red-500 text-xs">حذف</button></div>
            </div>
        `).join('');

        (document.getElementById('ad-head') as HTMLTextAreaElement).value = state.ads.head;
        (document.getElementById('ad-top') as HTMLTextAreaElement).value = state.ads.top;
        (document.getElementById('ad-footer') as HTMLTextAreaElement).value = state.ads.footer;
        (document.getElementById('ads-enabled') as HTMLInputElement).checked = state.ads.enabled;
        (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
    }
}

// Bindings
Object.assign(window as any, { 
    showPage, switchTab, handleLogin, handleLogout, saveOffer, deleteOffer, editOffer, resetOfferForm, 
    previewMainImage, previewArticleImage, saveArticle, editArticle, deleteArticle, resetArticleForm,
    saveAds, saveSettings, togglePasswordVisibility, toggleDarkMode 
});

document.addEventListener('DOMContentLoaded', renderApp);


/**
 * Affiliate Blog Engine - V6.6 (Mobile Compatibility Fix)
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
            price: "4200 درهم",
            category: "تقنية",
            desc: "تعتبر هذه الساعة هي الأفضل حالياً لمستخدمي أيفون، حيث تقدم ميزات صحية متطورة ومعالجاً أسرع من أي وقت مضى. جربناها لمدة أسبوع وإليك الانطباع الكامل.",
            img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&h=300&fit=crop",
            extraImgs: [],
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
        if (pageId === 'admin' || pageId === 'article-detail') hero?.classList.add('hidden');
        else hero?.classList.remove('hidden');
    }
    
    // التمرير للأعلى مع معالجة التوافق للهواتف
    window.scrollTo({ top: 0 });
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
                <img src="${a.img}" class="w-full h-[300px] md:h-[400px] object-cover">
                <div class="p-6 md:p-12">
                    <div class="flex items-center gap-4 mb-6">
                        <span class="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-4 py-1 rounded-full text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-2xl md:text-5xl font-black mb-10 leading-tight dark:text-white">${a.title}</h1>
                    <div class="article-body text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
                        ${a.content.split('\n').map((p: string) => `<p>${p}</p>`).join('')}
                    </div>
                    
                    <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-100 dark:border-gray-800">
                        <div class="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            <span class="font-bold text-gray-400 text-sm">شارك هذا المقال:</span>
                            <div class="flex gap-4">
                                <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" title="واتساب" class="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-white transition shadow-sm">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </a>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" title="فيسبوك" class="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-sm">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" title="تويتر" class="w-12 h-12 bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-white rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                            </div>
                        </div>
                        ${a.url ? `<a href="${a.url}" target="_blank" class="w-full md:w-auto bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-center shadow-xl hover:bg-orange-700 transition">انتقل للعرض المرتبط بالمقال</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    showPage('article-detail');
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

const handleExtraImages = async (event: any) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        currentExtraImages.push(base64);
    }
    renderExtraImagesPreview();
};

const removeExtraImage = (index: number) => {
    currentExtraImages.splice(index, 1);
    renderExtraImagesPreview();
};

const renderExtraImagesPreview = () => {
    const container = document.getElementById('extra-images-preview');
    if (!container) return;
    container.innerHTML = currentExtraImages.map((src, idx) => `
        <div class="thumb-preview">
            <img src="${src}" class="preview-img">
            <div class="thumb-remove" onclick="window.removeExtraImage(${idx})">×</div>
        </div>
    `).join('');
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
        if (idx !== -1) {
            state.offers[idx] = { 
                ...state.offers[idx], 
                title, price, url, desc, 
                img: currentMainImageBase64 || state.offers[idx].img,
                extraImgs: [...currentExtraImages]
            };
        }
    } else {
        state.offers.unshift({ 
            id: Date.now().toString(), title, price, url, desc, 
            img: currentMainImageBase64, 
            extraImgs: [...currentExtraImages],
            date: new Date().toLocaleDateString('ar-EG') 
        });
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
    currentMainImageBase64 = o.img;
    currentExtraImages = o.extraImgs ? [...o.extraImgs] : [];
    
    document.getElementById('main-image-preview-container')?.classList.remove('hidden');
    document.getElementById('main-upload-label')?.classList.add('hidden');
    renderExtraImagesPreview();
    
    document.getElementById('offer-form-title')!.innerText = "تعديل المنتج";
    document.getElementById('btn-cancel-offer-edit')?.classList.remove('hidden');
};

const resetOfferForm = () => {
    ['offer-title', 'offer-price', 'offer-url', 'offer-desc', 'edit-offer-id', 'offer-img-file', 'offer-extra-imgs-file'].forEach(id => {
        const el = document.getElementById(id);
        if(el) (el as any).value = '';
    });
    currentMainImageBase64 = '';
    currentExtraImages = [];
    document.getElementById('main-image-preview-container')?.classList.add('hidden');
    document.getElementById('main-upload-label')?.classList.remove('hidden');
    document.getElementById('extra-images-preview')!.innerHTML = '';
    document.getElementById('offer-form-title')!.innerText = "إضافة منتج جديد";
    document.getElementById('btn-cancel-offer-edit')?.classList.add('hidden');
};

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
    ['article-title', 'article-content', 'article-url-input', 'edit-article-id', 'article-img-file'].forEach(id => {
        const el = document.getElementById(id);
        if(el) (el as any).value = '';
    });
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

    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => {
            const extraThumbnails = (o.extraImgs || []).map((img: string) => `
                <img src="${img}" class="w-10 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-500" onclick="const p = this.closest('article').querySelector('.main-img'); p.src='${img}'">
            `).join('');

            const shareUrl = encodeURIComponent(window.location.href);
            const shareTitle = encodeURIComponent(o.title);
            const shareImg = encodeURIComponent(o.img);

            return `
            <article class="blog-card bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-sm hover:shadow-xl transition group">
                <div class="h-64 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="main-img w-full h-full object-cover transition duration-700 group-hover:scale-110">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-black mb-3 line-clamp-2 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.open('${o.url}', '_blank')">${o.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">${o.desc}</p>
                    
                    ${extraThumbnails ? `
                        <div class="flex flex-wrap gap-2 mb-6 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                            <img src="${o.img}" class="w-10 h-10 object-cover rounded-lg border-2 border-orange-500 cursor-pointer" onclick="const p = this.closest('article').querySelector('.main-img'); p.src='${o.img}'">
                            ${extraThumbnails}
                        </div>
                    ` : ''}

                    <div class="flex items-center justify-between mb-4 border-t border-gray-50 dark:border-gray-800 pt-4">
                        <span class="text-xs font-bold text-gray-400">مشاركة:</span>
                        <div class="flex gap-3">
                            <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" title="واتساب" class="p-2.5 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                            <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" title="تويتر" class="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-black hover:text-white transition">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${shareImg}&description=${shareTitle}" target="_blank" title="بنتريست" class="p-2.5 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                            </a>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg">تسوق الآن</a>
                    </div>
                </div>
            </article>
            `
        }).join('') || '<p class="col-span-full text-center py-20 text-gray-400">لا توجد منتجات حالياً.</p>';
    }

    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = state.articles.map((a: any) => {
            const shareUrl = encodeURIComponent(window.location.href);
            const shareTitle = encodeURIComponent(a.title);
            const shareImg = encodeURIComponent(a.img);

            return `
            <article class="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition">
                <div class="w-full md:w-40 h-48 md:h-40 overflow-hidden rounded-2xl cursor-pointer" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-orange-600 text-xs font-bold bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">${a.date}</span>
                        <div class="flex gap-3">
                            <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" title="واتساب" class="text-gray-400 hover:text-green-500 transition">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                            <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" title="تويتر" class="text-gray-400 hover:text-orange-500 transition">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                        </div>
                    </div>
                    <h3 class="text-lg md:text-xl font-black mt-2 mb-3 dark:text-white cursor-pointer hover:text-orange-600 transition" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">${a.content}</p>
                    <div class="flex flex-wrap gap-4 items-center">
                        ${a.url ? `<a href="${a.url}" target="_blank" class="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-700 transition">انتقل للعرض</a>` : ''}
                        <button onclick="window.viewArticle('${a.id}')" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition">قراءة المقال كاملاً</button>
                    </div>
                </div>
            </article>
            `
        }).join('') || '<p class="col-span-full text-center py-10 text-gray-400">لا توجد مقالات حالياً.</p>';
    }

    if (isLoggedIn) {
        const offerList = document.getElementById('admin-offers-list');
        if (offerList) offerList.innerHTML = state.offers.map((o: any) => `
            <tr class="border-b border-gray-50 dark:border-gray-800">
                <td class="p-4 flex items-center gap-3"><img src="${o.img}" class="w-10 h-10 rounded-lg"> <span class="text-sm font-bold truncate max-w-[150px] dark:text-white">${o.title}</span></td>
                <td class="p-4 text-left"><button onclick="window.editOffer('${o.id}')" class="text-blue-500 text-xs ml-3">تعديل</button><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 text-xs">حذف</button></td>
            </tr>
        `).join('');

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

// Global Bindings
Object.assign(window as any, { 
    showPage, switchTab, handleLogin, handleLogout, saveOffer, deleteOffer, editOffer, resetOfferForm, 
    previewMainImage, previewArticleImage, saveArticle, editArticle, deleteArticle, resetArticleForm,
    handleExtraImages, removeExtraImage, viewArticle,
    saveAds, saveSettings, togglePasswordVisibility, toggleDarkMode 
});

document.addEventListener('DOMContentLoaded', renderApp);

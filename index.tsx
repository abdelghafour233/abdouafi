
/**
 * Affiliate Blog Engine - V3.7 (Enhanced Product Management & File Uploads)
 */

const STORAGE_KEY = 'aff_blog_pro_storage_v3';

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
            gallery: [],
            url: "https://amazon.com",
            date: "25 مايو 2024"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentMainImageBase64 = '';
let currentGalleryBase64: string[] = [];

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
        const container = document.getElementById('main-image-preview-container');
        const label = document.getElementById('main-upload-label');
        img.src = currentMainImageBase64;
        container?.classList.remove('hidden');
        label?.classList.add('hidden');
    }
};

const previewGalleryImages = async (event: any) => {
    const files = Array.from(event.target.files as FileList);
    currentGalleryBase64 = [];
    const container = document.getElementById('gallery-preview-container');
    if (container) container.innerHTML = '';
    for (const file of files) {
        const b64 = await fileToBase64(file);
        currentGalleryBase64.push(b64);
        const img = document.createElement('img');
        img.src = b64;
        img.className = 'preview-img w-16 h-16 object-cover rounded-xl border border-gray-100 shadow-sm';
        container?.appendChild(img);
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
    const cat = (document.getElementById('offer-cat') as HTMLSelectElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    const editId = (document.getElementById('edit-id') as HTMLInputElement).value;

    if (!title || !price || (!currentMainImageBase64 && !editId)) {
        return alert('يرجى كتابة اسم المنتج والسعر ورفع الصورة الرئيسية على الأقل.');
    }

    if (editId) {
        const index = state.offers.findIndex((o: any) => o.id === editId);
        if (index !== -1) {
            state.offers[index] = {
                ...state.offers[index],
                title, price, url, category: cat, desc,
                img: currentMainImageBase64 || state.offers[index].img,
                gallery: currentGalleryBase64.length > 0 ? currentGalleryBase64 : state.offers[index].gallery
            };
        }
    } else {
        const newOffer = {
            id: Date.now().toString(),
            title, price, url, category: cat, desc,
            img: currentMainImageBase64,
            gallery: currentGalleryBase64,
            date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })
        };
        state.offers.unshift(newOffer);
    }

    syncAndRender();
    resetOfferForm();
    alert('تم حفظ المنتج بنجاح!');
};

const deleteOffer = (id: string) => {
    if (confirm('حذف هذا المنتج نهائياً؟')) {
        state.offers = state.offers.filter((o: any) => o.id !== id);
        syncAndRender();
    }
};

const editOffer = (id: string) => {
    const offer = state.offers.find((o: any) => o.id === id);
    if (!offer) return;
    (document.getElementById('edit-id') as HTMLInputElement).value = offer.id;
    (document.getElementById('offer-title') as HTMLInputElement).value = offer.title;
    (document.getElementById('offer-price') as HTMLInputElement).value = offer.price;
    (document.getElementById('offer-url') as HTMLInputElement).value = offer.url;
    (document.getElementById('offer-cat') as HTMLSelectElement).value = offer.category;
    (document.getElementById('offer-desc') as HTMLTextAreaElement).value = offer.desc;

    const mainPreview = document.getElementById('main-image-preview') as HTMLImageElement;
    mainPreview.src = offer.img;
    document.getElementById('main-image-preview-container')?.classList.remove('hidden');
    document.getElementById('main-upload-label')?.classList.add('hidden');

    const galleryContainer = document.getElementById('gallery-preview-container');
    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        offer.gallery?.forEach((imgStr: string) => {
            const img = document.createElement('img');
            img.src = imgStr;
            img.className = 'preview-img w-16 h-16 object-cover rounded-xl';
            galleryContainer.appendChild(img);
        });
    }
    document.getElementById('form-title')!.innerText = "تعديل بيانات المنتج";
    document.getElementById('btn-submit-offer')!.innerText = "حفظ التغييرات";
    document.getElementById('btn-cancel-edit')?.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetOfferForm = () => {
    ['offer-title', 'offer-price', 'offer-url', 'offer-desc', 'edit-id', 'offer-img-file', 'offer-gallery-files'].forEach(id => {
        const el = document.getElementById(id) as any;
        if (el) el.value = '';
    });
    currentMainImageBase64 = '';
    currentGalleryBase64 = [];
    document.getElementById('main-image-preview-container')?.classList.add('hidden');
    document.getElementById('main-upload-label')?.classList.remove('hidden');
    document.getElementById('gallery-preview-container')!.innerHTML = '';
    document.getElementById('form-title')!.innerText = "إضافة منتج جديد";
    document.getElementById('btn-submit-offer')!.innerText = "نشر المنتج في الموقع";
    document.getElementById('btn-cancel-edit')?.classList.add('hidden');
};

const saveAds = () => {
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    syncAndRender();
    alert('تم تفعيل وحفظ الإعلانات');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value || state.siteName;
    const newPass = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    if (newPass) state.adminPassword = newPass;
    syncAndRender();
    alert('تم حفظ الإعدادات');
};

function syncAndRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderApp();
}

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-year')!.innerText = new Date().getFullYear().toString();
    injectScript('adsterra-head-placeholder', state.ads.head);
    injectScript('adsterra-top-placeholder', state.ads.top);
    injectScript('adsterra-footer-placeholder', state.ads.footer);

    const grid = document.getElementById('offers-grid');
    if (grid) {
        grid.innerHTML = state.offers.length ? state.offers.map((o: any) => `
            <article class="blog-card bg-white rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-xl transition duration-500 group">
                <div class="relative overflow-hidden h-64">
                    <img src="${o.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="${o.title}">
                    <div class="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">${o.category}</div>
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-black mb-3 line-clamp-2 text-gray-900 leading-tight">${o.title}</h3>
                    <p class="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">${o.desc}</p>
                    ${o.gallery && o.gallery.length > 0 ? `
                        <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
                            ${o.gallery.map((g: string) => `<img src="${g}" class="w-10 h-10 rounded-lg object-cover border border-gray-100">`).join('')}
                        </div>
                    ` : ''}
                    <div class="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                        <span class="text-orange-600 font-black text-2xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition">تسوق الآن</a>
                    </div>
                </div>
            </article>
        `).join('') : '<p class="col-span-full text-center py-24 text-gray-400">لا يوجد منتجات حالياً.</p>';
    }

    if (isLoggedIn) {
        const list = document.getElementById('admin-offers-list');
        if (list) {
            list.innerHTML = state.offers.map((o: any) => `
                <tr class="border-b border-gray-50 hover:bg-gray-50/50">
                    <td class="p-4 flex items-center gap-4">
                        <img src="${o.img}" class="w-12 h-12 rounded-xl object-cover shadow-sm">
                        <div>
                            <span class="font-black text-gray-800 text-sm block line-clamp-1">${o.title}</span>
                            <span class="text-xs text-orange-600 font-bold">${o.price}</span>
                        </div>
                    </td>
                    <td class="p-4 text-center">
                        <div class="flex justify-center gap-2">
                            <button onclick="window.editOffer('${o.id}')" class="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">تعديل</button>
                            <button onclick="window.deleteOffer('${o.id}')" class="text-red-500 hover:bg-red-50 p-2 rounded-lg">حذف</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
        (document.getElementById('ad-head') as HTMLTextAreaElement).value = state.ads.head || '';
        (document.getElementById('ad-top') as HTMLTextAreaElement).value = state.ads.top || '';
        (document.getElementById('ad-footer') as HTMLTextAreaElement).value = state.ads.footer || '';
        (document.getElementById('ads-enabled') as HTMLInputElement).checked = state.ads.enabled;
        (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
    }
}

// Global Bindings
(window as any).showPage = showPage;
(window as any).switchTab = switchTab;
(window as any).handleLogin = handleLogin;
(window as any).handleLogout = handleLogout;
(window as any).saveOffer = saveOffer;
(window as any).deleteOffer = deleteOffer;
(window as any).editOffer = editOffer;
(window as any).resetOfferForm = resetOfferForm;
(window as any).previewMainImage = previewMainImage;
(window as any).previewGalleryImages = previewGalleryImages;
(window as any).saveAds = saveAds;
(window as any).saveSettings = saveSettings;

document.addEventListener('DOMContentLoaded', renderApp);

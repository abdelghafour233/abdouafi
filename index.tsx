
// --- البيانات الافتراضية ---
const DEFAULT_DATA = {
    siteName: "AffiliateHub",
    adminPassword: "admin123",
    ads: {
        enabled: true,
        head: "",
        top: "",
        footer: ""
    },
    offers: [
        { id: "1", title: "ساعة ذكية Ultra", price: "299 ريال", category: "إلكترونيات", desc: "أفضل ساعة في السوق", img: "https://picsum.photos/seed/watch/400/300", url: "#" },
        { id: "2", title: "سماعات بلوتوث", price: "150 ريال", category: "إكسسوارات", desc: "صوت نقي وواضح", img: "https://picsum.photos/seed/audio/400/300", url: "#" }
    ]
};

// --- الحالة الحالية (State) ---
// @ts-ignore
let state = JSON.parse(localStorage.getItem('aff_platform_data') || 'null') || DEFAULT_DATA;
let isLoggedIn = false;

// --- وظائف المساعدة ---
function saveData() {
    localStorage.setItem('aff_platform_data', JSON.stringify(state));
    render();
}

function showPage(pageId: string) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    
    if (pageId === 'admin' && !isLoggedIn) {
        document.getElementById('page-login')?.classList.remove('hidden');
    } else {
        document.getElementById(`page-${pageId}`)?.classList.remove('hidden');
    }
}

/**
 * Fixed Error in file index.tsx on line 43: Property 'classList' does not exist on type 'EventTarget'.
 * Added 'event' parameter for switchTab and used type casting for currentTarget.
 */
function switchTab(tabId: string, event: any) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('bg-emerald-600', 'text-white'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');
    
    if (event && event.currentTarget) {
        (event.currentTarget as HTMLElement).classList.add('bg-emerald-600', 'text-white');
    }
}

// --- الإدارة ---
function handleLogin() {
    /**
     * Fixed Error in file index.tsx on line 48: Property 'value' does not exist on type 'HTMLElement'.
     * Cast to HTMLInputElement to access .value property.
     */
    const passInput = document.getElementById('admin-pass-input') as HTMLInputElement | null;
    const pass = passInput ? passInput.value : '';
    
    if (pass === state.adminPassword) {
        isLoggedIn = true;
        document.getElementById('login-error')?.classList.add('hidden');
        showPage('admin');
        renderAdmin();
    } else {
        document.getElementById('login-error')?.classList.remove('hidden');
    }
}

function handleLogout() {
    isLoggedIn = false;
    showPage('home');
}

function addOffer() {
    /**
     * Fixed Errors in file index.tsx on lines 67-72: Property 'value' does not exist on type 'HTMLElement'.
     * Used type casting to appropriate HTML element types.
     */
    const newOffer = {
        id: Date.now().toString(),
        title: (document.getElementById('offer-title') as HTMLInputElement).value,
        price: (document.getElementById('offer-price') as HTMLInputElement).value,
        url: (document.getElementById('offer-url') as HTMLInputElement).value,
        img: (document.getElementById('offer-img') as HTMLInputElement).value || 'https://picsum.photos/seed/item/400/300',
        cat: (document.getElementById('offer-cat') as HTMLSelectElement).value,
        desc: (document.getElementById('offer-desc') as HTMLTextAreaElement).value
    };
    if (!newOffer.title || !newOffer.url) return alert('يرجى ملء الحقول الأساسية');
    state.offers.unshift(newOffer);
    saveData();
    // Reset fields
    /**
     * Fixed Error in file index.tsx on line 78: Property 'value' does not exist on type 'Element'.
     * Cast element to HTMLInputElement | HTMLTextAreaElement.
     */
    document.querySelectorAll('#tab-offers input, #tab-offers textarea').forEach(i => {
        (i as HTMLInputElement | HTMLTextAreaElement).value = '';
    });
}

// @ts-ignore
function deleteOffer(id: string) {
    state.offers = state.offers.filter((o: any) => o.id !== id);
    saveData();
}

function saveAds() {
    /**
     * Fixed Errors in file index.tsx on lines 87-90: Property 'checked' or 'value' does not exist on type 'HTMLElement'.
     * Used type casting for checkbox and textareas.
     */
    state.ads.enabled = (document.getElementById('ads-enabled') as HTMLInputElement).checked;
    state.ads.head = (document.getElementById('ad-head') as HTMLTextAreaElement).value;
    state.ads.top = (document.getElementById('ad-top') as HTMLTextAreaElement).value;
    state.ads.footer = (document.getElementById('ad-footer') as HTMLTextAreaElement).value;
    saveData();
    alert('تم حفظ أكواد الإعلانات');
}

function saveSettings() {
    /**
     * Fixed Errors in file index.tsx on lines 96-97: Property 'value' does not exist on type 'HTMLElement'.
     * Added type casting to HTMLInputElement.
     */
    const newName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    const newPass = (document.getElementById('new-admin-pass') as HTMLInputElement).value;
    
    if (newName) state.siteName = newName;
    if (newPass) state.adminPassword = newPass;
    
    saveData();
    alert('تم حفظ الإعدادات بنجاح');
}

// --- الرندرة (Rendering) ---
function render() {
    // تحديث النصوص الأساسية
    const siteNameEl = document.getElementById('display-site-name');
    if (siteNameEl) siteNameEl.innerText = state.siteName;
    
    const footerNameEl = document.getElementById('footer-site-name');
    if (footerNameEl) footerNameEl.innerText = state.siteName;
    
    /**
     * Fixed Error in file index.tsx on line 111: Type 'number' is not assignable to type 'string'.
     * Converted year to string using .toString().
     */
    const footerYearEl = document.getElementById('footer-year');
    if (footerYearEl) footerYearEl.innerText = new Date().getFullYear().toString();

    // رندرة العروض في الصفحة الرئيسية
    const grid = document.getElementById('offers-grid');
    if (grid) {
        grid.innerHTML = state.offers.map((o: any) => `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition">
                <img src="${o.img}" class="w-full h-48 object-cover" alt="${o.title}">
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold">${o.title}</h3>
                        <span class="text-emerald-600 font-bold">${o.price}</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-6 flex-grow">${o.desc || ''}</p>
                    <a href="${o.url}" target="_blank" class="w-full bg-emerald-600 text-white py-3 rounded-xl text-center font-bold">عرض المنتج</a>
                </div>
            </div>
        `).join('');
    }

    // حقن الإعلانات
    const headPlace = document.getElementById('adsterra-head-placeholder');
    const topPlace = document.getElementById('adsterra-top-placeholder');
    const footPlace = document.getElementById('adsterra-footer-placeholder');

    if (state.ads.enabled) {
        if (headPlace) injectScript(headPlace, state.ads.head);
        if (topPlace) {
            injectScript(topPlace, state.ads.top);
            topPlace.classList.remove('hidden');
        }
        if (footPlace) {
            injectScript(footPlace, state.ads.footer);
            footPlace.classList.remove('hidden');
        }
    } else {
        if (headPlace) headPlace.innerHTML = '';
        if (topPlace) {
            topPlace.innerHTML = '';
            topPlace.classList.add('hidden');
        }
        if (footPlace) {
            footPlace.innerHTML = '';
            footPlace.classList.add('hidden');
        }
    }

    if (isLoggedIn) renderAdmin();
}

function injectScript(container: HTMLElement, code: string) {
    container.innerHTML = "";
    const range = document.createRange();
    range.selectNode(container);
    const documentFragment = range.createContextualFragment(code);
    container.appendChild(documentFragment);
}

function renderAdmin() {
    // ملء الحقول في لوحة التحكم بالبيانات الحالية
    /**
     * Fixed Errors in file index.tsx on lines 163-167: Property 'value' or 'checked' does not exist on type 'HTMLElement'.
     * Added type casting for all input elements in the admin view.
     */
    const siteNameInput = document.getElementById('site-name-input') as HTMLInputElement | null;
    if (siteNameInput) siteNameInput.value = state.siteName;

    const adsEnabledInput = document.getElementById('ads-enabled') as HTMLInputElement | null;
    if (adsEnabledInput) adsEnabledInput.checked = state.ads.enabled;

    const adHeadInput = document.getElementById('ad-head') as HTMLTextAreaElement | null;
    if (adHeadInput) adHeadInput.value = state.ads.head;

    const adTopInput = document.getElementById('ad-top') as HTMLTextAreaElement | null;
    if (adTopInput) adTopInput.value = state.ads.top;

    const adFooterInput = document.getElementById('ad-footer') as HTMLTextAreaElement | null;
    if (adFooterInput) adFooterInput.value = state.ads.footer;

    // قائمة العروض للحذف
    const list = document.getElementById('admin-offers-list');
    if (list) {
        list.innerHTML = state.offers.map((o: any) => `
            <tr class="border-b">
                <td class="p-4 font-medium">${o.title}</td>
                <td class="p-4">${o.price}</td>
                <td class="p-4">
                    <button onclick="deleteOffer('${o.id}')" class="text-red-500 hover:bg-red-50 p-2 rounded">حذف</button>
                </td>
            </tr>
        `).join('');
    }
}

// التشغيل الأول
render();

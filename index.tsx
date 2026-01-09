
/**
 * abdouweb - Pro Content Manager
 */

const STORAGE_KEY = 'abdouweb_clean_v2'; 

const FALLBACK_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";

const INITIAL_DATA = {
    siteName: "عبدو ويب Pro",
    adminPass: "admin",
    articles: [
        {
            id: "hosting-profit-2025",
            title: "دليل الربح من الأفلييت: كيف تجني آلاف الدولارات من تسويق استضافات المواقع؟",
            body: `تعد استضافات المواقع (Web Hosting) من أكثر المجالات ربحية في عالم التسويق بالعمولة (Affiliate Marketing). لماذا؟ لأن الشركات تدفع عمولات ضخمة تصل إلى 200 دولار لكل عميل واحد، بالإضافة إلى الدخل المتكرر.`,
            category: "أفلييت واستضافات",
            img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&q=80",
            url: "#"
        },
        {
            id: "win-iphone-2025",
            title: "مسابقة عبدو ويب: كيف تحصل على آيفون 16 برو مجاناً؟",
            body: `بمناسبة العام الجديد، نطلق أكبر مسابقة لتوزيع الجوائز التقنية. الشروط بسيطة جداً ولا تتطلب دفع أي رسوم.`,
            category: "مسابقات",
            img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
            url: "#"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;
let editingId: string | null = null;

const getShareButtonsHtml = (title: string, id: string, compact = false) => {
    const url = `${window.location.origin}?art=${id}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    if (compact) {
        return `<div class="flex items-center gap-2 mt-4">
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition shadow-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition shadow-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
        </div>`;
    }
    return `<div class="viral-box bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 text-center my-8">
        <h4 class="text-sm font-black mb-4">شارك المقال مع أصدقائك</h4>
        <div class="flex flex-wrap justify-center gap-3">
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition shadow-lg">واتساب</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="bg-[#1877F2] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition shadow-lg">فيسبوك</a>
        </div>
    </div>`;
};

const showPage = (id: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${id}`);
    if (id === 'admin' && !isLogged) document.getElementById('page-login')?.classList.remove('hidden');
    else if (target) {
        target.classList.remove('hidden');
        if (id === 'admin') renderAdmin();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'home') render();
};

const handleLogin = () => {
    const p = (document.getElementById('admin-pass') as HTMLInputElement).value;
    if (p === state.adminPass) { isLogged = true; showPage('admin'); }
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    alert('تم حفظ إعدادات الموقع!');
};

const deleteArticle = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    state.articles = state.articles.filter((a: any) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderAdmin();
    render();
};

const editArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    editingId = id;
    (document.getElementById('art-title') as HTMLInputElement).value = a.title;
    (document.getElementById('art-img') as HTMLInputElement).value = a.img;
    (document.getElementById('art-url') as HTMLInputElement).value = a.url || "";
    (document.getElementById('art-category') as HTMLInputElement).value = a.category;
    (document.getElementById('art-body') as HTMLTextAreaElement).value = a.body;
    document.getElementById('art-form-title')!.innerText = "تعديل المقال";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const saveArticle = () => {
    const title = (document.getElementById('art-title') as HTMLInputElement).value;
    const img = (document.getElementById('art-img') as HTMLInputElement).value;
    const url = (document.getElementById('art-url') as HTMLInputElement).value;
    const category = (document.getElementById('art-category') as HTMLInputElement).value;
    const body = (document.getElementById('art-body') as HTMLTextAreaElement).value;

    if (!title || !body) return alert("يرجى ملء العنوان والمحتوى");

    if (editingId) {
        const idx = state.articles.findIndex((x: any) => x.id === editingId);
        state.articles[idx] = { ...state.articles[idx], title, img, url, category, body };
        editingId = null;
    } else {
        const newArt = {
            id: Date.now().toString(),
            title, img, url, category, body
        };
        state.articles.unshift(newArt);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    alert("تم حفظ المقال بنجاح!");
    resetArtForm();
    renderAdmin();
};

const resetArtForm = () => {
    editingId = null;
    (document.getElementById('art-title') as HTMLInputElement).value = "";
    (document.getElementById('art-img') as HTMLInputElement).value = "";
    (document.getElementById('art-url') as HTMLInputElement).value = "";
    (document.getElementById('art-category') as HTMLInputElement).value = "عام";
    (document.getElementById('art-body') as HTMLTextAreaElement).value = "";
    document.getElementById('art-form-title')!.innerText = "إضافة مقال جديد";
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        content.innerHTML = `<div class="space-y-8 animate-in fade-in duration-700">
            <div class="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-[3rem] shadow-2xl bg-gray-200">
                <img src="${a.img || FALLBACK_IMG}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="max-w-3xl mx-auto space-y-8">
                <div class="flex items-center gap-4">
                    <span class="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold">${a.category}</span>
                </div>
                <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                <div class="text-lg md:text-2xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${a.body}</div>
                ${a.url && a.url !== "#" ? `<a href="${a.url}" target="_blank" class="block w-full bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl text-center">انتقل إلى العرض ⚡</a>` : ''}
                ${getShareButtonsHtml(a.title, a.id)}
            </div>
        </div>`;
    }
    showPage('article-detail');
};

const renderAdmin = () => {
    const list = document.getElementById('admin-articles-list');
    if (list) {
        list.innerHTML = state.articles.map((a: any) => `
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div class="flex items-center gap-4">
                    <img src="${a.img || FALLBACK_IMG}" class="w-12 h-12 rounded-xl object-cover">
                    <div>
                        <h4 class="font-bold text-sm line-clamp-1">${a.title}</h4>
                        <span class="text-[10px] text-gray-400">${a.category}</span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.viewArticle('${a.id}')" class="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:text-blue-600" title="معاينة (عين)">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                    <button onclick="window.editArticle('${a.id}')" class="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:text-green-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="window.deleteArticle('${a.id}')" class="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:text-red-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </div>
        `).join('');
    }
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map((a: any) => `
            <div class="group bg-white dark:bg-gray-900 p-6 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all mb-10">
                <div class="w-full md:w-72 h-60 overflow-hidden rounded-[2.5rem] shrink-0 cursor-pointer bg-gray-100" onclick="window.viewArticle('${a.id}')">
                    <img src="${a.img || FALLBACK_IMG}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onerror="this.src='${FALLBACK_IMG}'">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <span class="text-blue-600 font-bold text-xs mb-2">${a.category}</span>
                    <h3 class="text-2xl md:text-3xl font-black mb-4 group-hover:text-blue-600 transition-colors cursor-pointer" onclick="window.viewArticle('${a.id}')">${a.title}</h3>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto">
                        <button onclick="window.viewArticle('${a.id}')" class="bg-gray-900 dark:bg-blue-600 text-white w-fit px-8 py-3 rounded-2xl font-black text-xs hover:scale-105 transition-all">اقرأ المزيد</button>
                        ${getShareButtonsHtml(a.title, a.id, true)}
                    </div>
                </div>
            </div>`).join('');
    }
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveSettings, deleteArticle, editArticle, saveArticle, resetArtForm,
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
});

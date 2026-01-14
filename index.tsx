
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
            id: "can-semi-finals-2025",
            title: "صدام العمالقة في نصف نهائي الكان: المغرب يواجه نيجيريا ومصر في مواجهة نارية ضد السنغال",
            body: `تتجه أنظار عشاق الكرة الأفريقية إلى الملاعب التي ستحتضن مباريات نصف نهائي كأس أمم أفريقيا "الكان"، في مواجهات وصفت بالأقوى في تاريخ البطولة الحديث.

المغرب ضد نيجيريا: "أسود الأطلس" في مهمة ترويض "النسور"
يدخل المنتخب المغربي المواجهة وعينه على اللقب الغالي، متسلحاً بروح قتالية عالية وأداء تكتيكي مبهر أبهر العالم مؤخراً. في المقابل، تسعى نيجيريا لاستغلال قوتها البدنية وسرعة مهاجميها لإيقاف الزحف المغربي. الجماهير المغربية تترقب بآمال عريضة عبور كتيبة الركراكي إلى النهائي الحلم.

مصر ضد السنغال: كلاسيكو القارة يتجدد بطعم الثأر
في الجهة الأخرى، نتابع تكراراً لنهائي النسخة الماضية والمواجهات الحاسمة الأخيرة، حيث يصطدم "الفراعنة" بمنتخب السنغال القوي. مواجهة تحمل طابع الثأر الكروي لمحمد صلاح وزملائه ضد "أسود التيرانجا". هي مباراة التفاصيل الصغيرة والخبرة الكبيرة التي يمتلكها المنتخب المصري في القارة السمراء.

توقعات المحللين:
تجمع هذه النسخة من نصف النهائي أفضل أربعة منتخبات في القارة حالياً، مما يجعل التوقعات صعبة جداً. هل نشهد نهائياً عربياً خالصاً بين المغرب ومصر؟ أم أن للنسور والأسود السنغالية رأي آخر؟

شاركونا توقعاتكم للنتائج في التعليقات عبر منصات التواصل الاجتماعي!`,
            category: "رياضة أفريقية",
            img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
            url: "https://www.cafonline.com"
        },
        {
            id: "temu-morocco-deal-2025",
            title: "دليل الشراء من تيمو (Temu) في المغرب: مميزات مذهلة وتوصيل مجاني لباب منزلك",
            body: `يعتبر تطبيق تيمو (Temu) حالياً من أشهر منصات التسوق في المغرب، حيث يقدم تجربة فريدة تجمع بين الجودة والأسعار التنافسية التي لا تقبل المنافسة.

لماذا يفضل المغاربة الشراء من تيمو؟
1. أسعار المصنع مباشرة: يوفر تيمو منتجات بأسعار منخفضة جداً لأنك تشتري مباشرة من الموردين.
2. تنوع لا يصدق: ستجد كل شيء، من الإلكترونيات والملابس إلى أدوات المطبخ والديكور المنزلي.
3. خدمة التوصيل المجاني إلى المغرب: أهم ميزة هي أن تيمو يقدم حالياً خدمة التوصيل المجاني للعديد من الطلبات، مما يوفر عليك مصاريف الشحن الدولية المكلفة.
4. حماية المشتري: يضمن تيمو استرداد أموالك في حال تأخر الطلب أو وصوله بحالة غير مطابقة للوصف.

كيف تستفيد من العروض الحالية؟
يمكنك البدء بالتسوق والاستفادة من كوبونات الخصم والخدمات المجانية عبر الضغط على الرابط أسفله للولوج إلى المتجر الرسمي والاستمتاع بتجربة تسوق عالمية من قلب المغرب.`,
            category: "تسوق و صفقات",
            img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
            url: "https://temu.to/k/u6zpr84k5n5"
        },
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
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="واتساب">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="فيسبوك">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="تويتر X">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:scale-110 transition shadow-sm" title="تليجرام">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.13 0 .19z"/></svg>
            </a>
        </div>`;
    }
    return `<div class="viral-box bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 text-center my-8">
        <h4 class="text-sm font-black mb-4">شارك المقال مع أصدقائك</h4>
        <div class="flex flex-wrap justify-center gap-3">
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 transition shadow-lg">واتساب</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="bg-[#1877F2] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 transition shadow-lg">فيسبوك</a>
            <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" class="bg-black text-white px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 transition shadow-lg">تويتر X</a>
            <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="bg-[#0088cc] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 transition shadow-lg">تليجرام</a>
        </div>
    </div>`;
};

const showPage = (id: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${id}`);
    
    // Reset back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.setAttribute('onclick', "showPage('home')");
        (backBtn.querySelector('span') as HTMLElement).innerText = "العودة للرئيسية";
    }

    if (id === 'admin' && !isLogged) document.getElementById('page-login')?.classList.remove('hidden');
    else if (target) {
        target.classList.remove('hidden');
        if (id === 'admin') {
            (document.getElementById('site-name-input') as HTMLInputElement).value = state.siteName;
            (document.getElementById('admin-pass-input') as HTMLInputElement).value = state.adminPass;
            renderAdmin();
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'home') render();
};

const handleLogin = () => {
    const p = (document.getElementById('admin-pass') as HTMLInputElement).value;
    if (p === state.adminPass) { isLogged = true; showPage('admin'); }
    else alert("كلمة السر خاطئة!");
};

const saveSettings = () => {
    const newName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    const newPass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    
    if (!newPass) return alert("لا يمكن ترك كلمة السر فارغة");
    
    state.siteName = newName;
    state.adminPass = newPass;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    alert('تم حفظ إعدادات الموقع بنجاح!');
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

const renderFullArticle = (a: any, fromPreview = false) => {
    const content = document.getElementById('article-full-content');
    if (content) {
        content.innerHTML = `<div class="space-y-8 animate-in fade-in duration-700">
            ${fromPreview ? '<div class="bg-yellow-100 text-yellow-800 p-4 rounded-2xl text-center font-bold mb-4">وضع المعاينة: هذا المقال لم يتم حفظه بعد</div>' : ''}
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
    
    if (fromPreview) {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.setAttribute('onclick', "showPage('admin')");
            (backBtn.querySelector('span') as HTMLElement).innerText = "العودة للوحة التحكم";
        }
    }

    showPage('article-detail');
};

const previewForm = () => {
    const title = (document.getElementById('art-title') as HTMLInputElement).value;
    const img = (document.getElementById('art-img') as HTMLInputElement).value;
    const url = (document.getElementById('art-url') as HTMLInputElement).value;
    const category = (document.getElementById('art-category') as HTMLInputElement).value;
    const body = (document.getElementById('art-body') as HTMLTextAreaElement).value;

    if (!title || !body) return alert("يرجى ملء العنوان والمحتوى للمعاينة");

    const tempArt = { id: 'temp-preview', title, img, url, category, body };
    renderFullArticle(tempArt, true);
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    renderFullArticle(a);
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
                    <button onclick="window.viewArticle('${a.id}')" class="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:text-blue-600" title="معاينة">
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
    showPage, handleLogin, viewArticle, saveSettings, deleteArticle, editArticle, saveArticle, resetArtForm, previewForm,
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
});

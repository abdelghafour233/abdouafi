
/**
 * abdouweb - Ultimate Moroccan Tech & Affiliate Platform
 * Professional Version - Long Form Content Update
 */

const STORAGE_KEY = 'abdouweb_final_v13';

const DEFAULT_BLOG_DATA = {
    siteName: "عبدو ويب abdouweb",
    siteDescription: "منصتكم الأولى لأخبار التقنية في المغرب، تطوير الذات، وأفضل مراجعات المنتجات التقنية.",
    adminPassword: "admin",
    social: {
        fb: "#", tt: "#", tw: "#", ig: "#", wa: "#", pin: "#"
    },
    staticPages: {
        about: "مرحباً بكم في عبدو ويب abdouweb. نحن نهتم بتقديم محتوى تقني عالي الجودة يركز على السوق المغربي، بالإضافة إلى مراجعات دقيقة للمنتجات ونصائح عملية لتطوير الذات.",
        privacy: "نحن في عبدو ويب نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية وفق القوانين المعمول بها.",
        terms: "باستخدامك لموقعنا، فإنك توافق على شروط الخدمة والاستخدام العادل."
    },
    offers: [
        {
            id: "of-1",
            title: "MacBook Air M3 - أقوى عرض في المغرب",
            price: "12,900 درهم",
            desc: "أقوى جهاز محمول للعمل عن بعد والمصممين في المغرب. تعرف على المميزات والعيوب قبل الشراء.",
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop",
            url: "#",
            date: "2025/01/26"
        }
    ],
    articles: [
        {
            id: "ar-1",
            category: "أخبار التقنية",
            title: "ثورة الذكاء الاصطناعي في المغرب: كيف يستعد المغرب لريادة الاقتصاد الرقمي الأفريقي؟",
            content: `يشهد المغرب تحولاً رقمياً غير مسبوق، حيث لم يعد الذكاء الاصطناعي مجرد رفاهية تكنولوجية، بل أصبح ركيزة أساسية في استراتيجية "المغرب الرقمي 2030". في هذا المقال المطول، نسلط الضوء على آفاق هذه التكنولوجيا وتأثيرها على المجتمع والاقتصاد المغربي.

أولاً: البنية التحتية والسيادة الرقمية
تدرك المملكة المغربية أن البيانات هي نفط القرن الحادي والعشرين. لذلك، استثمرت الدولة في إنشاء مراكز بيانات ضخمة (Data Centers) في مدن مثل الدار البيضاء وطنجة. الهدف هو ضمان معالجة بيانات المغاربة داخل حدود الوطن، مما يعزز الأمن القومي الرقمي.

ثانياً: الذكاء الاصطناعي في التعليم والتشغيل
بدأت الجامعات المغربية الكبرى في إدراج تخصصات دقيقة في تعلم الآلة (Machine Learning) وعلوم البيانات. هذا التوجه يهدف إلى خلق جيل جديد من المبرمجين القادرين على المنافسة دولياً من داخل المغرب. الشركات الناشئة المغربية (Startups) بدأت بالفعل في ابتكار حلول تعتمد على الذكاء الاصطناعي في مجالات الفلاحة الذكية لإدارة الموارد المائية، والتشخيص الطبي عن بعد.

ثالثاً: التحديات المستقبلية
رغم التفاؤل، تظل هناك تحديات تتعلق بـ "الفجوة الرقمية" وتكلفة التكنولوجيا. المغرب يعمل حالياً على تعميم الربط بالألياف البصرية ليشمل المناطق القروية، لضمان استفادة الجميع من ثورة المعلومات.

خلاصة القول، المغرب يسير بخطى ثابتة نحو التحول إلى قطب تكنولوجي قاري، والذكاء الاصطناعي هو المحرك الرئيسي لهذا التحول.`,
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&fit=crop",
            date: "2025/01/26"
        },
        {
            id: "ar-2",
            category: "تطوير الذات",
            title: "دليل العمل الحر (Freelance) في المغرب 2025: من أول درهم إلى الحرية المالية",
            content: `أصبح العمل الحر خياراً مفضلاً لآلاف الشباب المغاربة، لكن البداية دائماً ما تكون محفوفة بالتساؤلات حول القانون، الضرائب، وطرق استلام الأموال. إليكم الدليل الشامل للنجاح كمستقل في المغرب.

1. اختيار التخصص المربح
في سوق العمل الحر الدولي، الطلب على المبرمجين، المصممين، وخبراء التسويق الرقمي المغاربة في تزايد. يجب عليك التركيز على "نيش" (Niche) معين والتميز فيه بدلاً من محاولة القيام بكل شيء.

2. الوضع القانوني: نظام المقاول الذاتي
يعتبر نظام "المقاول الذاتي" (Auto-entrepreneur) في المغرب الحل الأمثل للمستقلين. فهو يمنحك صبغة قانونية، ويمكنك من إصدار فواتير (Invoices) لعملائك، بالإضافة إلى الاستفادة من تغطية صحية وضريبية مخفضة جداً.

3. استلام الأموال وتحديات الصرف
تعتبر البطاقات البنكية المغربية (مثل تلك المقدمة من CIH أو Attijari) والربط مع حسابات "بايبال" (PayPal) أو "بايونير" (Payoneer) هي الوسيلة الأكثر شيوعاً. يجب فهم كيفية تحويل العملة الصعبة إلى الدرهم المغربي وفق ضوابط مكتب الصرف.

4. بناء العلامة الشخصية (Personal Branding)
النجاح في الفريلانس لا يعتمد فقط على مهاراتك التقنية، بل على قدرتك على تسويق نفسك. ابدأ ببناء معرض أعمال (Portfolio) قوي، وكن نشطاً على منصات مثل LinkedIn و Behance.

الحرية المالية ليست حلمًا بعيد المنال، بل هي نتيجة للتخطيط الجيد والتعلم المستمر وتطوير الذات بشكل يومي.`,
            img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&h=400&fit=crop",
            date: "2025/01/24"
        },
        {
            id: "ar-3",
            category: "مراجعات المنتجات",
            title: "مراجعة MacBook Air M3: هل هو الجهاز المثالي للمستخدم المغربي؟",
            content: `لطالما كان الـ MacBook Air الخيار المفضل لمن يبحث عن التوازن بين الأداء وسهولة التنقل. مع إطلاق نسخة M3 الجديدة، طرح الكثيرون سؤالاً: هل يستحق الترقية؟

التصميم والجودة
لم يتغير التصميم الخارجي كثيراً عن نسخة M2، وهو أمر جيد. الجهاز لا يزال نحيفاً جداً وخفيفاً، مما يجعله مثالياً للطلاب والمستقلين الذين يتنقلون كثيراً بين المقاهي ومساحات العمل المشترك في المغرب.

الأداء الاستثنائي لشريحة M3
الفرق الحقيقي يكمن في الداخل. شريحة M3 تقدم أداءً أسرع بنسبة تصل إلى 20% في المهام اليومية، وأداءً مبهراً في معالجة الرسوميات. إذا كنت تعمل في المونتاج البسيط أو البرمجة، فهذا الجهاز لن يخذلك أبداً.

البطارية والشحن
من أهم مميزات أجهزة آبل الحديثة هي البطارية. يمكنك العمل لمدة يوم كامل (تصل إلى 18 ساعة) دون الحاجة للبحث عن شاحن. هذا الأمر حيوي جداً في ظل ظروف التنقل المستمر.

السعر في المغرب
يتراوح سعر الجهاز في الأسواق المغربية والمتاجر المعتمدة بين 12,500 و 14,000 درهم حسب السعة. رغم أن السعر قد يبدو مرتفعاً، إلا أنه استثمار طويل الأمد لجهاز سيعيش معك لسنوات بنفس الأداء.

القرار النهائي:
إذا كنت تملك نسخة M2، فالفرق قد لا يكون كبيراً بما يكفي للترقية. أما إذا كنت تنتقل من أجهزة Intel أو حتى M1، فإن الـ MacBook Air M3 هو أفضل لابتوب يمكنك شراؤه حالياً في هذه الفئة السعرية.`,
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&h=400&fit=crop",
            date: "2025/01/23"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentCategoryFilter = 'الكل';
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

const setCategoryFilter = (cat: string) => {
    currentCategoryFilter = cat;
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        if(btn.textContent === cat) btn.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
    });
    renderApp();
};

const renderSocialButtons = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const platforms = [
        { id: 'fb', color: '#1877F2', icon: 'FB', link: state.social.fb },
        { id: 'tt', color: '#000000', icon: 'TT', link: state.social.tt },
        { id: 'tw', color: '#1DA1F2', icon: 'X', link: state.social.tw },
        { id: 'ig', color: '#E4405F', icon: 'IG', link: state.social.ig },
        { id: 'wa', color: '#25D366', icon: 'WA', link: state.social.wa },
        { id: 'pin', color: '#BD081C', icon: 'PI', link: state.social.pin }
    ];
    container.innerHTML = platforms.map(p => {
        const href = p.link && p.link !== "#" ? p.link : "javascript:void(0)";
        return `
            <a href="${href}" ${href !== "javascript:void(0)" ? 'target="_blank"' : ''} 
               class="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full text-xs font-black shadow-md border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all hover:bg-orange-600 hover:text-white">
                ${p.icon}
            </a>
        `;
    }).join('');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const container = document.getElementById('article-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in">
                <img src="${a.img}" class="w-full h-72 md:h-[500px] object-cover">
                <div class="p-8 md:p-16">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">${a.category}</span>
                        <span class="text-gray-400 text-xs font-bold">${a.date}</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-black mb-8 dark:text-white leading-tight">${a.title}</h1>
                    <div class="article-body text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                        ${a.content}
                    </div>
                    <div class="mt-16 p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center border border-gray-100 dark:border-gray-700">
                        <h4 class="font-black mb-6">شارك المقال وتابع عبدو ويب:</h4>
                        <div id="article-social-container" class="flex justify-center gap-3"></div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => renderSocialButtons('article-social-container'), 50);
    }
    showPage('article-detail');
};

const handleLogin = () => {
    const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (pass === state.adminPassword) { isLoggedIn = true; showPage('admin'); renderApp(); }
    else { document.getElementById('login-error')?.classList.remove('hidden'); }
};

const saveOffer = () => {
    const title = (document.getElementById('offer-title') as HTMLInputElement).value;
    const price = (document.getElementById('offer-price') as HTMLInputElement).value;
    const url = (document.getElementById('offer-url') as HTMLInputElement).value;
    const desc = (document.getElementById('offer-desc') as HTMLTextAreaElement).value;
    if(!title || !price) return alert('يرجى إكمال البيانات');
    state.offers.unshift({ id: Date.now().toString(), title, price, url, desc, img: currentMainImageBase64 || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=300&fit=crop", date: new Date().toLocaleDateString('ar-EG') });
    sync(); renderApp(); alert('تم الحفظ');
};

const saveArticle = () => {
    const title = (document.getElementById('article-title') as HTMLInputElement).value;
    const content = (document.getElementById('article-content') as HTMLTextAreaElement).value;
    const category = (document.getElementById('article-category') as HTMLSelectElement).value;
    if(!title || !content) return alert('يرجى كتابة العنوان والمحتوى');
    state.articles.unshift({ id: Date.now().toString(), title, content, category, img: currentArticleImageBase64 || "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop", date: new Date().toLocaleDateString('ar-EG') });
    sync(); renderApp(); alert('تم النشر');
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value;
    state.social.fb = (document.getElementById('social-fb') as HTMLInputElement).value || "#";
    state.social.tt = (document.getElementById('social-tt') as HTMLInputElement).value || "#";
    state.social.tw = (document.getElementById('social-tw') as HTMLInputElement).value || "#";
    state.social.ig = (document.getElementById('social-ig') as HTMLInputElement).value || "#";
    state.social.wa = (document.getElementById('social-wa') as HTMLInputElement).value || "#";
    state.social.pin = (document.getElementById('social-pin') as HTMLInputElement).value || "#";
    sync(); renderApp(); alert('تم تحديث الإعدادات');
};

const sync = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function renderApp() {
    document.getElementById('display-site-name')!.innerText = state.siteName;
    document.getElementById('footer-site-name')!.innerText = state.siteName;
    document.getElementById('footer-copy-name')!.innerText = state.siteName;
    document.getElementById('hero-site-desc')!.innerText = state.siteDescription;
    
    renderSocialButtons('footer-social-container');

    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition group">
                <div class="h-56 overflow-hidden relative cursor-pointer" onclick="window.open('${o.url}', '_blank')">
                    <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-4 left-4 bg-orange-600 text-white px-3 py-0.5 rounded-full text-[9px] font-black uppercase">Review</span>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-black mb-2 dark:text-white line-clamp-1">${o.title}</h3>
                    <p class="text-gray-500 text-xs mb-4 line-clamp-2">${o.desc}</p>
                    <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                        <span class="text-orange-600 font-black text-xl">${o.price}</span>
                        <a href="${o.url}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md">طلب المنتج</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    const filteredArticles = currentCategoryFilter === 'الكل' ? state.articles : state.articles.filter((a:any) => a.category === currentCategoryFilter);
    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = filteredArticles.map((a: any) => `
            <article class="bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-lg transition group cursor-pointer" onclick="window.viewArticle('${a.id}')">
                <div class="w-full md:w-32 h-32 overflow-hidden rounded-2xl flex-shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                </div>
                <div class="flex flex-col justify-center">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-orange-600 text-[9px] font-black border border-orange-600 px-2 py-0.5 rounded-md">${a.category}</span>
                        <span class="text-gray-400 text-[9px] font-bold">${a.date}</span>
                    </div>
                    <h3 class="text-lg font-black dark:text-white line-clamp-2">${a.title}</h3>
                </div>
            </article>
        `).join('');
    }

    if (isLoggedIn) {
        const oL = document.getElementById('admin-offers-list');
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b dark:border-gray-800"><td class="py-3 font-bold text-xs">${o.title}</td><td class="text-left"><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 font-black">X</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2 text-xs font-bold"><span>${a.title}</span><button onclick="window.deleteArticle('${a.id}')" class="text-red-500">حذف</button></div>`).join('');
    }
}

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImg = async (e: any) => { if(e.target.files[0]) currentMainImageBase64 = await fileToBase64(e.target.files[0]); };
const previewArtImg = async (e: any) => { if(e.target.files[0]) currentArticleImageBase64 = await fileToBase64(e.target.files[0]); };

function deleteOffer(id: string) { state.offers = state.offers.filter((o:any)=>o.id !== id); sync(); renderApp(); }
function deleteArticle(id: string) { state.articles = state.articles.filter((a:any)=>a.id !== id); sync(); renderApp(); }

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, setCategoryFilter,
    saveOffer, saveArticle, saveSettings, previewMainImg, previewArtImg,
    deleteOffer, deleteArticle, 
    switchTab: (tabId: string, event: any) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('bg-orange-600', 'text-white'));
        document.getElementById(tabId)?.classList.add('active');
        event.currentTarget.classList.add('bg-orange-600', 'text-white');
    },
    toggleDarkMode: () => { document.documentElement.classList.toggle('dark'); }
});

document.addEventListener('DOMContentLoaded', renderApp);

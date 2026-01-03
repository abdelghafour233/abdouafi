
/**
 * abdouweb - Ultimate Moroccan Tech & Affiliate Platform
 * Professional Version - Universal Share & Follow System
 */

const STORAGE_KEY = 'abdouweb_final_v17';

const DEFAULT_BLOG_DATA = {
    siteName: "عبدو ويب abdouweb",
    siteDescription: "منصتكم الأولى لأخبار التقنية في المغرب، تطوير الذات، وأفضل مراجعات المنتجات التقنية.",
    adminPassword: "admin",
    social: {
        fb: "facebook.com/abdouweb", 
        tt: "tiktok.com/@abdouweb", 
        tw: "x.com/abdouweb", 
        ig: "instagram.com/abdouweb", 
        wa: "212600000000", 
        pin: "pinterest.com/abdouweb"
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
            url: "https://www.apple.com/ma/macbook-air/",
            date: "2025/01/26"
        }
    ],
    articles: [
        {
            id: "ar-ai-can-2025",
            category: "أخبار التقنية",
            title: "الذكاء الاصطناعي يتوقع بطل 'كان' المغرب: هل يقترب أسود الأطلس من الكأس التاريخية? تحليل رقمي شامل",
            content: `مع اقتراب العرس الكروي الإفريقي الذي يستضيفه المغرب، توقفت لغة العواطف وبدأت لغة الأرقام والخوارزميات في الحديث. بفضل تقنيات "التعلم الآلي" (Machine Learning) وتحليل البيانات الضخمة، أطلقت مراكز بحثية رياضية كبرى توقعاتها حول هوية البطل المحتمل لكأس أمم إفريقيا 2025.

أولاً: كيف يتوقع الذكاء الاصطناعي النتائج؟
لا يعتمد الذكاء الاصطناعي على الحظ، بل يقوم بتحليل آلاف المتغيرات؛ بما في ذلك الأداء الفردي للاعبين في أنديتهم الأوروبية والمحلية، سجل الإصابات، تاريخ المواجهات المباشرة بين المنتخبات، وحتى تأثير العوامل المناخية والجغرافية. النماذج الرقمية تحاكي البطولة آلاف المرات (Monte Carlo Simulation) لاستخراج النسبة المئوية الأكثر ترجيحاً لكل منتخب.

ثانياً: أسود الأطلس في صدارة التوقعات
تضع معظم نماذج الذكاء الاصطناعي المنتخب المغربي في المركز الأول كأبرز مرشح للظفر باللقب بنسبة تتراوح بين 28% و32%. هذا التفاؤل الرقمي يعود إلى ثلاثة عوامل رئيسية:
1. استقرار التشكيلة: الحفاظ على الركائز التي حققت إنجاز مونديال قطر.
2. عامل الأرض والجمهور: تاريخياً، تزيد نسبة فوز المستضيف باللقب بنحو 15% وفق خوارزميات تحليل "ميزة الأرض".
3. القيمة السوقية والجودة الفنية: يتفوق المغرب في جودة "التمريرات المفتاحية" والصلابة الدفاعية مقارنة بمنافسيه المباشرين.

ثالثاً: المنافسون حسب لغة الأرقام
رغم أفضلية المغرب، تظهر البيانات أن المنافسة ستكون شرسة. منتخب السنغال يحل ثانياً بنسبة توقع تصل إلى 19%، يليه منتخب كوت ديفوار (حامل اللقب) بنسبة 15%. المثير للاهتمام هو تراجع حظوظ بعض المنتخبات الكبرى التي تعاني من "شيخوخة" في التشكيلة أو عدم استقرار فني، وهو ما تلتقطه الحساسات الرقمية بدقة عالية.

رابعاً: هل تخطئ التكنولوجيا؟
رغم دقة الذكاء الاصطناعي، تظل كرة القدم "لعبة المفاجآت". فالأرقام لا يمكنها دائماً قياس "الروح القتالية" أو القرارات التحكيمية المفاجئة في أجزاء من الثانية. ومع ذلك، أصبح المدربون والاتحادات الكروية، بما فيها الجامعة الملكية المغربية لكرة القدم، يعتمدون بشكل متزايد على هذه البيانات لتطوير الخطط التكتيكية ورصد نقاط ضعف الخصوم.

خلاصة القول، كل المؤشرات الرقمية والتقنية تصب في مصلحة المغرب ليكون بطلاً للقارة السمراء. هي لحظة تاريخية ينتظرها الملايين، وبدعم الجمهور المغربي، قد تتحول هذه التوقعات الرقمية إلى حقيقة ملموسة فوق المستطيل الأخضر.`,
            img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&h=500&fit=crop",
            date: "2025/01/30"
        },
        {
            id: "ar-dirham-2025",
            category: "أخبار التقنية",
            title: "تعويم الدرهم المغربي: هل الاقتصاد الوطني مستعد لمواجهة تقلبات الأسواق العالمية؟ تحليل للمزايا والمخاطر",
            content: `عاد الجدل من جديد حول ملف "ليونة سعر صرف الدرهم" أو ما يعرف بـ "التعويم"، وهو قرار استراتيجي ينهجه بنك المغرب تدريجياً منذ سنوات...`,
            img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=800&h=500&fit=crop",
            date: "2025/01/30"
        },
        {
            id: "ar-rain-2025",
            category: "أخبار التقنية",
            title: "أمطار الخير في المغرب: التساقطات الأخيرة تنعش الآمال وتدفع بعجلة الاقتصاد الوطني نحو النمو",
            content: `استبشر المغاربة خيراً بالتساقطات المطرية والثلجية الكثيفة التي شهدتها مختلف أقاليم المملكة خلال الأيام الماضية...`,
            img: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=800&h=500&fit=crop",
            date: "2025/01/29"
        },
        {
            id: "ar-olive-oil-2025",
            category: "مراجعات المنتجات",
            title: "بشرى للمغاربة: وفرة إنتاج زيت الزيتون هذا الموسم تؤدي إلى انخفاض ملحوظ في الأسعار",
            content: `شهدت الأسواق المغربية خلال الأسابيع الأخيرة تحولاً إيجابياً أسعد ملايين الأسر، حيث سجلت أسعار زيت الزيتون انخفاضاً ملحوظاً بعد موجة غلاء استمرت لأكثر من سنتين...`,
            img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&h=500&fit=crop",
            date: "2025/01/28"
        }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_BLOG_DATA;
let isLoggedIn = false;
let currentCategoryFilter = 'الكل';
let currentMainImageBase64 = '';
let currentArticleImageBase64 = '';

const fixUrl = (val: string, type: string = 'generic') => {
    if (!val || val.trim() === "") return "javascript:void(0)";
    let trimmed = val.trim();
    if (type === 'wa' && !trimmed.startsWith('http') && /^\d+$/.test(trimmed.replace('+', ''))) {
        return `https://wa.me/${trimmed.replace('+', '')}`;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('javascript:')) {
        return trimmed;
    }
    return 'https://' + trimmed;
};

const ICONS = {
    fb: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    tt: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>`,
    tw: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    ig: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    wa: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    pin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.164 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C24.021 5.367 18.643 0 12.017 0z"/></svg>`
};

const renderSocialButtons = (containerId: string, mode: 'follow' | 'share' = 'follow', data?: { title: string, url: string, img: string }) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentUrl = data?.url || window.location.href;
    const currentTitle = data?.title || state.siteName;
    const currentImg = data?.img || "";

    const platforms = [
        { 
            id: 'fb', color: '#1877F2', icon: ICONS.fb, 
            follow: fixUrl(state.social.fb),
            share: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        },
        { 
            id: 'tw', color: '#000000', icon: ICONS.tw, 
            follow: fixUrl(state.social.tw),
            share: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('اكتشف ' + currentTitle + ': ')}`
        },
        { 
            id: 'wa', color: '#25D366', icon: ICONS.wa, 
            follow: fixUrl(state.social.wa, 'wa'),
            share: `https://wa.me/?text=${encodeURIComponent(currentTitle + " " + currentUrl)}`
        },
        { 
            id: 'tt', color: '#000000', icon: ICONS.tt, 
            follow: fixUrl(state.social.tt),
            share: fixUrl(state.social.tt) 
        },
        { 
            id: 'ig', color: '#E4405F', icon: ICONS.ig, 
            follow: fixUrl(state.social.ig),
            share: fixUrl(state.social.ig) 
        },
        { 
            id: 'pin', color: '#BD081C', icon: ICONS.pin, 
            follow: fixUrl(state.social.pin),
            share: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(currentImg)}&description=${encodeURIComponent(currentTitle)}`
        }
    ];

    container.innerHTML = platforms.map(p => {
        const isShareStandard = ['fb', 'tw', 'wa', 'pin'].includes(p.id);
        const finalUrl = (mode === 'share' && isShareStandard) ? p.share : p.follow;
        const isAction = finalUrl.startsWith('javascript:');
        
        return `
            <a href="${finalUrl}" ${!isAction ? 'target="_blank" rel="noopener noreferrer"' : ''} 
               class="flex items-center justify-center w-11 h-11 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all text-gray-600 dark:text-gray-300 hover:text-white"
               style="--hover-bg: ${p.color}"
               onmouseover="this.style.backgroundColor=this.style.getPropertyValue('--hover-bg');" 
               onmouseout="this.style.backgroundColor='';"
               title="${(mode === 'share' && isShareStandard) ? 'مشاركة عبر ' : 'تابعنا على '}${p.id.toUpperCase()}">
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
                        <h4 class="font-black mb-6 text-xl">شارك هذا المقال مع أصدقائك:</h4>
                        <div id="article-social-container" class="flex justify-center flex-wrap gap-4"></div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => renderSocialButtons('article-social-container', 'share', { title: a.title, url: window.location.href, img: a.img }), 50);
    }
    showPage('article-detail');
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
        
        if (pageId === 'admin') {
            const siteInput = document.getElementById('site-name-input') as HTMLInputElement;
            if (siteInput) siteInput.value = state.siteName;
            (document.getElementById('social-fb') as HTMLInputElement).value = state.social.fb;
            (document.getElementById('social-tt') as HTMLInputElement).value = state.social.tt;
            (document.getElementById('social-tw') as HTMLInputElement).value = state.social.tw;
            (document.getElementById('social-ig') as HTMLInputElement).value = state.social.ig;
            (document.getElementById('social-wa') as HTMLInputElement).value = state.social.wa;
            (document.getElementById('social-pin') as HTMLInputElement).value = state.social.pin;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const saveSettings = () => {
    state.siteName = (document.getElementById('site-name-input') as HTMLInputElement).value || state.siteName;
    state.social.fb = (document.getElementById('social-fb') as HTMLInputElement).value;
    state.social.tt = (document.getElementById('social-tt') as HTMLInputElement).value;
    state.social.tw = (document.getElementById('social-tw') as HTMLInputElement).value;
    state.social.ig = (document.getElementById('social-ig') as HTMLInputElement).value;
    state.social.wa = (document.getElementById('social-wa') as HTMLInputElement).value;
    state.social.pin = (document.getElementById('social-pin') as HTMLInputElement).value;
    
    sync(); renderApp(); 
    alert('تم حفظ الإعدادات بنجاح.');
};

const changePassword = () => {
    const oldPass = (document.getElementById('setting-old-pass') as HTMLInputElement).value;
    const newPass = (document.getElementById('setting-new-pass') as HTMLInputElement).value;
    const confirmPass = (document.getElementById('setting-confirm-pass') as HTMLInputElement).value;

    if (!oldPass || !newPass || !confirmPass) {
        return alert('يرجى ملء جميع حقول كلمة المرور.');
    }

    if (oldPass !== state.adminPassword) {
        return alert('كلمة المرور الحالية غير صحيحة.');
    }

    if (newPass !== confirmPass) {
        return alert('تأكيد كلمة المرور الجديدة غير متطابق.');
    }

    if (newPass.length < 4) {
        return alert('يجب أن تكون كلمة المرور الجديدة 4 أحرف على الأقل.');
    }

    state.adminPassword = newPass;
    sync();
    alert('تم تغيير كلمة المرور بنجاح.');
    
    // Clear inputs
    (document.getElementById('setting-old-pass') as HTMLInputElement).value = '';
    (document.getElementById('setting-new-pass') as HTMLInputElement).value = '';
    (document.getElementById('setting-confirm-pass') as HTMLInputElement).value = '';
};

const sync = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function renderApp() {
    const siteTitle = document.getElementById('display-site-name');
    if (siteTitle) siteTitle.innerText = state.siteName;
    const footerTitle = document.getElementById('footer-site-name');
    if (footerTitle) footerTitle.innerText = state.siteName;
    const footerCopy = document.getElementById('footer-copy-name');
    if (footerCopy) footerCopy.innerText = state.siteName;
    const heroDesc = document.getElementById('hero-site-desc');
    if (heroDesc) heroDesc.innerText = state.siteDescription;
    
    renderSocialButtons('footer-social-container', 'share', { 
        title: state.siteName, 
        url: window.location.origin, 
        img: "" 
    });

    const offersGrid = document.getElementById('offers-grid');
    if (offersGrid) {
        offersGrid.innerHTML = state.offers.map((o: any) => `
            <article class="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition group">
                <div class="h-56 overflow-hidden relative cursor-pointer" onclick="window.open('${fixUrl(o.url)}', '_blank')">
                    <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-4 left-4 bg-orange-600 text-white px-3 py-0.5 rounded-full text-[9px] font-black uppercase">Review</span>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-black mb-2 dark:text-white line-clamp-1">${o.title}</h3>
                    <p class="text-gray-500 text-xs mb-4 line-clamp-2">${o.desc}</p>
                    <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                        <span class="text-orange-600 font-black text-xl">${o.price}</span>
                        <a href="${fixUrl(o.url)}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md">طلب المنتج</a>
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
        if(oL) oL.innerHTML = state.offers.map((o:any)=>`<tr class="border-b dark:border-gray-800"><td class="py-3 font-bold text-xs">${o.title}</td><td class="text-left"><button onclick="window.deleteOffer('${o.id}')" class="text-red-500 font-black">حذف</button></td></tr>`).join('');
        const aL = document.getElementById('admin-articles-list');
        if(aL) aL.innerHTML = state.articles.map((a:any)=>`<div class="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2 text-xs font-bold"><span>${a.title}</span><button onclick="window.deleteArticle('${a.id}')" class="text-red-500">حذف</button></div>`).join('');
    }
}

const handleLogin = () => {
    const pass = (document.getElementById('admin-pass-input') as HTMLInputElement).value;
    if (pass === state.adminPassword) { isLoggedIn = true; showPage('admin'); renderApp(); }
    else { document.getElementById('login-error')?.classList.remove('hidden'); }
};

const toggleLoginPassword = () => {
    const passInput = document.getElementById('admin-pass-input') as HTMLInputElement;
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');
    
    if (passInput.type === 'password') {
        passInput.type = 'text';
        eyeOpen?.classList.add('hidden');
        eyeClosed?.classList.remove('hidden');
    } else {
        passInput.type = 'password';
        eyeOpen?.classList.remove('hidden');
        eyeClosed?.classList.add('hidden');
    }
};

const setCategoryFilter = (cat: string) => {
    currentCategoryFilter = cat;
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        if(btn.textContent === cat) btn.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
    });
    renderApp();
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

const fileToBase64 = (file: File): Promise<string> => new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result as string); rd.readAsDataURL(file); });
const previewMainImg = async (e: any) => { if(e.target.files[0]) currentMainImageBase64 = await fileToBase64(e.target.files[0]); };
const previewArtImg = async (e: any) => { if(e.target.files[0]) currentArticleImageBase64 = await fileToBase64(e.target.files[0]); };

function deleteOffer(id: string) { if(confirm('حذف المنتج؟')) { state.offers = state.offers.filter((o:any)=>o.id !== id); sync(); renderApp(); } }
function deleteArticle(id: string) { if(confirm('حذف المقال؟')) { state.articles = state.articles.filter((a:any)=>a.id !== id); sync(); renderApp(); } }

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, setCategoryFilter,
    saveOffer, saveArticle, saveSettings, changePassword, previewMainImg, previewArtImg,
    deleteOffer, deleteArticle, toggleLoginPassword,
    switchTab: (tabId: string, event: any) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('bg-orange-600', 'text-white'));
        document.getElementById(tabId)?.classList.add('active');
        if(event) event.currentTarget.classList.add('bg-orange-600', 'text-white');
    },
    toggleDarkMode: () => { document.documentElement.classList.toggle('dark'); }
});

document.addEventListener('DOMContentLoaded', renderApp);

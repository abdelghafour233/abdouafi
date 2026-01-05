
/**
 * abdouweb - Ultimate Ad Injection Engine (Direct DOM Execution)
 * Integration with Native Banner & Smartlink + Pro Social Sharing
 */

const STORAGE_KEY = 'abdouweb_pro_v3';

const INITIAL_DATA = {
    siteName: "عبدو ويب",
    adminPass: "admin",
    ads: {
        code1: `<!-- Global Bottom Banner -->
<script type="text/javascript">
	atOptions = {
		'key' : 'a8b678d7d8c502dc8ae4d07cc79789d2',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script>`,
        code2: `<!-- Global Sidebar Banner -->
<script type="text/javascript">
	atOptions = {
		'key' : '188b2d4248e4748cda209b5a7c18dcb0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/188b2d4248e4748cda209b5a7c18dcb0/invoke.js"></script>`,
        inArticle1: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        inArticle2: `<script async="async" data-cfasync="false" src="https://bouncingbuzz.com/a8b678d7d8c502dc8ae4d07cc79789d2/invoke.js"></script><div id="container-a8b678d7d8c502dc8ae4d07cc79789d2"></div>`,
        smartlink1: "https://bouncingbuzz.com/wga5mrxfz?key=2d97310179e241819b7915da9473f01d"
    },
    articles: [
        { 
            id: "a1", 
            title: "دليل أفضل 5 تطبيقات لزيادة الإنتاجية في عام 2025", 
            body: `في ظل التسارع الرقمي الذي نعيشه اليوم، أصبح الهاتف المحمول أداة إما للتشتت أو للإنجاز العظيم. نحن في عبدو ويب قمنا بتجربة أكثر من 50 تطبيقاً مختلفاً على مدار الأشهر الماضية لنختار لكم النخبة التي ستغير طريقة عملكم.

أولاً: تطبيق Notion - مركز القيادة الشخصي
يعتبر نوتشن هو العمود الفقري لأي شخص يريد تنظيم حياته المهنية والشخصية بشكل احترافي. فهو يجمع بين كتابة الملاحظات، إدارة المشاريع المعقدة، وبناء قواعد البيانات الشخصية في واجهة واحدة بسيطة وأنيقة. ما يميز نوتشن في تحديثات 2025 هو الدمج العميق للذكاء الاصطناعي (Notion AI) الذي يساعدك الآن على صياغة رسائل البريد الإلكتروني، تلخيص الاجتماعات الطويلة بضغطة زر واحدة، وحتى برمجة جداول بيانات كاملة بمجرد طلب ذلك نصياً. إذا كنت تبحث عن تطبيق واحد يغنيك عن عشرة تطبيقات أخرى، فنوتشن هو خيارك الأول بدون منازع.

ثانياً: تطبيق Forest - الحل السحري لإدمان الهاتف
هل تجد نفسك تفتح تطبيقات التواصل الاجتماعي لا إرادياً أثناء العمل؟ تطبيق Forest يقدم حلاً عبقرياً يعتمد على "التلعيب" (Gamification). عندما تريد التركيز، تقوم بزراعة شجرة رقمية داخل التطبيق وضبط المؤقت. طالما أنك لا تلمس هاتفك وتخرج من التطبيق، تستمر الشجرة في النمو. إذا استسلمت لإغراء الهاتف وفتحت تطبيقاً آخر، ستموت شجرتك الجميلة فوراً. المذهل في الأمر أن الشركة المطورة تتعاون مع منظمات بيئية حقيقية لزراعة أشجار حقيقية على كوكب الأرض مقابل العملات التي تجمعها داخل التطبيق، مما يعطيك دافعاً أخلاقياً بجانب الدافع الإنتاجي.

ثالثاً: تطبيق Todoist - البساطة التي تصنع المعجزات
السر في الإنتاجية ليس في كثرة الأدوات، بل في بساطتها. تودويست يساعدك على جدولة مهامك اليومية مع منبهات ذكية تعتمد ليس فقط على الوقت، بل وعلى موقعك الجغرافي أيضاً. تخيل أن هاتفك يذكرك بشراء مستلزمات المنزل بمجرد اقترابك من المتجر!

نصيحة تقنية من فريق عبدو ويب: لا تحاول تحميل كل هذه التطبيقات مرة واحدة. ابدأ بتطبيق واحد فقط (وننصح بنوتشن) واستمر في استخدامه لمدة أسبوع كامل حتى تعتاد عليه، ثم انتقل للتالي. التدرج هو مفتاح النجاح المستدام في عالم الإنتاجية الرقمية.`, 
            category: "تطبيقات", 
            img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" 
        },
        {
            id: "a2",
            title: "مراجعة شاملة لأقوى الهواتف الذكية في الأسواق حالياً",
            body: `يشهد عام 2025 ثورة حقيقية في عالم الهواتف الذكية، حيث لم يعد التنافس مقتصرًا على جودة الكاميرا أو سرعة المعالج فقط، بل أصبح "الذكاء الاصطناعي التوليدي" المدمج داخل نظام التشغيل هو اللاعب الأساسي. في هذا المقال، سنستعرض لكم الوحوش التقنية التي تسيطر على الساحة الآن.

ملك الأداء: آيفون 16 برو ماكس
تستمر آبل في فرض سيطرتها من خلال معالج A18 Pro الجديد، والذي أثبت تفوقه في معالجة الفيديو بدقة 8K دون أي حرارة تذكر. التصميم المصنوع من التيتانيوم من الدرجة الخامسة جعل الهاتف أخف وزناً وأكثر صلابة. لكن الميزة الحقيقية هي "الذكاء البصري" الجديد الذي يسمح للكاميرا بالتعرف على كل ما تراه في الواقع وتقديم معلومات فورية عنه، سواء كان ذلك نوع نبات نادر أو سعر منتج في متجر أمامك.

المنافس الشرس: سامسونج Galaxy S25 Ultra
إذا كنت من عشاق الشاشات الكبيرة والإنتاجية، فإن سامسونج مازالت تتربع على عرش الأندرويد. الشاشة الجديدة بتقنية Dynamic AMOLED 3X تقدم سطوعاً يصل إلى 3000 شمعة، مما يجعل الرؤية تحت أشعة الشمس المباشرة واضحة تماماً. قلم S-Pen أصبح الآن أكثر ذكاءً، حيث يدعم ميزات الترجمة الفورية للكتابة اليدوية وتحويل الخربشات إلى لوحات فنية بفضل الذكاء الاصطناعي.

جوجل بيكسل 9 برو: عبقرية البرمجيات
قد لا يمتلك البيكسل أقوى عتاد صلب مقارنة بالمنافسين، لكنه بالتأكيد الأذكى. معالج Tensor G4 مصمم خصيصاً لمهام الذكاء الاصطناعي، مما يجعل ميزات مثل "Magic Editor" لتعديل الصور تبدو كالسحر الحقيقي. يمكنك إزالة الأشخاص من الخلفية أو تغيير إضاءة الصورة بالكامل بلمسة واحدة.

عند التفكير في شراء هاتف جديد، اسأل نفسك دائماً: هل أحتاج إلى القوة الغاشمة للألعاب (آيفون)، أم أحتاج إلى أدوات الإنتاجية والشاشة المبهرة (سامسونج)، أم أبحث عن أذكى تجربة استخدام وكاميرا واقعية (بيكسل)؟ قرارك يجب أن يبنى على احتياجك اليومي الفعلي.`,
            category: "هواتف",
            img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80"
        },
        {
            id: "a3",
            title: "كيف تبدأ العمل الحر عبر الإنترنت وتجني أول 1000 دولار؟",
            body: `كثير من الشباب يسألوننا في عبدو ويب: هل فعلاً يمكن كسب العيش من الإنترنت؟ الإجابة هي نعم قطعية، ولكنها تتطلب صبراً، مهارة، واستراتيجية واضحة. العمل الحر (Freelancing) ليس مجرد وظيفة، بل هو مشروع تجاري صغير أنت مديره الوحيد.

الخطوة الأولى: تحديد "النيش" أو التخصص
أكبر خطأ يقع فيه المبتدئ هو محاولة فعل كل شيء. الشركات تبحث عن "متخصص". إذا كنت مصمماً، تخصص في "تصميم شعارات الشركات الناشئة". إذا كنت مبرمجاً، تخصص في "تطوير تطبيقات المتاجر الإلكترونية". التخصص يسمح لك برفع سعرك لأنك تصبح خبيراً في مجالك.

الخطوة الثانية: بناء معرض أعمال (Portfolio) قوي
لا أحد سيوظفك بناءً على كلامك الجميل. العميل يريد أن يرى أفعالك. حتى لو لم يكن لديك عملاء سابقون، قم بتنفيذ مشاريع وهمية أو تطوع لجهات خيرية لتبني معرض أعمالك. استخدم منصات مثل Behance للمصممين أو GitHub للمبرمجين لعرض مهاراتك بشكل احترافي.

الخطوة الثالثة: اختيار المنصة المناسبة
هناك منصات عالمية مثل Upwork و Fiverr، ومنصات عربية قوية مثل "مستقل" و "خمسات". نصيحتنا هي البدء بالمنصات العربية لتفهم عقلية العميل وتبني تقييماتك الأولى، ثم الانطلاق نحو المنصات العالمية حيث الأسعار المرتفعة بالدولار.

تذكر دائماً أن البدايات هي الأصعب. قد ترسل 50 عرضاً ولا تحصل على رد، ولكن بمجرد حصولك على أول تقييم بـ 5 نجوم، ستنهال عليك العروض. الاستمرارية هي السر الذي يفصل بين الناجحين والفاشلين في هذا المجال.`,
            category: "عمل حر",
            img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
        },
        {
            id: "a4",
            title: "أدوات الذكاء الاصطناعي التي يجب أن تعرفها في 2025",
            body: `لم يعد الذكاء الاصطناعي مجرد رفاهية أو ميزة عابرة، بل أصبح ضرورة للبقاء في سوق العمل الحالي. نحن في عبدو ويب نؤمن بأن "الذكاء الاصطناعي لن يستبدل البشر، بل البشر الذين يستخدمون الذكاء الاصطناعي هم من سيستبدلون الذين لا يستخدمونه".

ChatGPT-5: الثورة المستمرة
النسخة الجديدة من تشات جي بي تي أصبحت تفهم السياق بشكل مذهل. لم يعد مجرد "بوت" للرد، بل أصبح مساعداً شخصياً يمكنه التفكير معك بصوت عالٍ، كتابة أكواد برمجية معقدة، وحتى تحليل البيانات الضخمة التي ترفعها له في ملفات إكسل.

Midjourney v7: الفن في أرقى صوره
للمصممين وصناع المحتوى، يعتبر ميدجورني هو الأداة الأقوى لتحويل الخيال إلى واقع بصري. النسخة السابعة قدمت دقة تفاصيل غير مسبوقة، وفهماً أعمق للإضاءة والظلال، مما يجعل الصور الناتجة عنه تبدو كأنها التقطت بعدسة مصور محترف في استوديو عالمي.

Gamma: إنشاء العروض التقديمية في ثوانٍ
هل تقضي ساعات في تصميم ملفات PowerPoint؟ أداة Gamma تقوم بذلك بدلاً عنك. فقط أعطها العنوان والعناصر الأساسية، وسوف تقوم بتصميم عرض تقديمي كامل، منسق، ويحتوي على صور مناسبة في أقل من دقيقة واحدة.`,
            category: "ذكاء اصطناعي",
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
        }
    ],
    offers: [
        { id: "o1", title: "آيفون 16 برو ماكس - عرض محدود", price: "4,500 ريال", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400", url: "#" },
        { id: "o2", title: "سماعات سوني عازلة للضوضاء", price: "1,100 ريال", img: "https://images.unsplash.com/photo-1644990861622-38d7c2b655f4?w=400", url: "#" },
        { id: "o3", title: "ماك بوك اير M3 نسخة 2025", price: "5,900 ريال", img: "https://images.unsplash.com/photo-1517336714460-4c9889a10acc?w=400", url: "#" },
        { id: "o4", title: "ساعة ابل الترا 2 الأصلية", price: "2,400 ريال", img: "https://images.unsplash.com/photo-1434494878577-86c23bdd0639?w=400", url: "#" }
    ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || INITIAL_DATA;
let isLogged = false;

// Function to generate social sharing icons HTML
const getShareButtonsHtml = (title: string, url: string = window.location.href) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    return `
        <div class="flex items-center justify-center gap-3 mt-4">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition shadow-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" class="w-9 h-9 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:scale-110 transition shadow-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" class="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition shadow-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}" target="_blank" class="w-9 h-9 rounded-full bg-[#BD081C] flex items-center justify-center text-white hover:scale-110 transition shadow-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.718-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592 0 11.996 0h.021z"/></svg>
            </a>
            <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="w-9 h-9 rounded-full bg-[#0088cc] flex items-center justify-center text-white hover:scale-110 transition shadow-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.762 5.319-1.083 7.035-.136.727-.403.97-.663.994-.566.052-1.024-.374-1.572-.734-.859-.564-1.344-.914-2.177-1.462-1.012-.668-.321-1.037.222-1.604.142-.147 2.607-2.39 2.655-2.598.006-.026.011-.124-.048-.176-.06-.052-.147-.034-.21-.02-.09.02-1.528.97-4.312 2.85-.408.281-.778.419-1.11.412-.364-.007-1.066-.205-1.587-.375-.639-.208-1.146-.319-1.101-.673.023-.184.276-.373.759-.566 2.963-1.29 4.937-2.14 5.922-2.55 2.814-1.168 3.398-1.371 3.78-1.377z"/></svg>
            </a>
        </div>
    `;
};

const injectAd = (containerId: string, adCode: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!adCode || adCode.trim() === "") {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'block';
    container.innerHTML = ''; 
    const wrapper = document.createElement('div');
    wrapper.innerHTML = adCode;
    const scripts = Array.from(wrapper.querySelectorAll('script'));
    const nonScripts = Array.from(wrapper.childNodes).filter(node => node.nodeName !== 'SCRIPT');
    nonScripts.forEach(node => container.appendChild(node.cloneNode(true)));
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        if (oldScript.innerHTML) newScript.innerHTML = oldScript.innerHTML;
        container.appendChild(newScript);
    });
};

const refreshAds = () => {
    setTimeout(() => {
        injectAd('ad-slot-1-safe-container', state.ads.code1);
        injectAd('ad-slot-2-safe-container', state.ads.code2);
        const hLink = document.getElementById('header-smart-link') as HTMLAnchorElement;
        const sLink = document.getElementById('sidebar-smart-link') as HTMLAnchorElement;
        if (hLink) hLink.href = state.ads.smartlink1 || "#";
        if (sLink) sLink.href = state.ads.smartlink1 || "#";
    }, 300);
};

const showPage = (id: string) => {
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${id}`);
    if (id === 'admin' && !isLogged) {
        document.getElementById('page-login')?.classList.remove('hidden');
    } else if (target) {
        target.classList.remove('hidden');
        if (id === 'admin') {
            (document.getElementById('ad-code-1') as HTMLTextAreaElement).value = state.ads.code1;
            (document.getElementById('ad-code-2') as HTMLTextAreaElement).value = state.ads.code2;
            (document.getElementById('ad-in-article-1') as HTMLTextAreaElement).value = state.ads.inArticle1;
            (document.getElementById('ad-in-article-2') as HTMLTextAreaElement).value = state.ads.inArticle2;
            (document.getElementById('ad-smartlink-1') as HTMLInputElement).value = state.ads.smartlink1;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
    refreshAds();
};

const handleLogin = () => {
    const p = (document.getElementById('admin-pass') as HTMLInputElement).value;
    if (p === state.adminPass) { isLogged = true; showPage('admin'); }
};

const saveAds = () => {
    state.ads.code1 = (document.getElementById('ad-code-1') as HTMLTextAreaElement).value;
    state.ads.code2 = (document.getElementById('ad-code-2') as HTMLTextAreaElement).value;
    state.ads.inArticle1 = (document.getElementById('ad-in-article-1') as HTMLTextAreaElement).value;
    state.ads.inArticle2 = (document.getElementById('ad-in-article-2') as HTMLTextAreaElement).value;
    state.ads.smartlink1 = (document.getElementById('ad-smartlink-1') as HTMLInputElement).value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshAds();
    alert('تم تفعيل وحفظ الإعلانات بنجاح!');
};

const viewArticle = (id: string) => {
    const a = state.articles.find((x: any) => x.id === id);
    if (!a) return;
    const content = document.getElementById('article-full-content');
    if (content) {
        const paragraphs = a.body.split('\n\n');
        const midIndex = Math.ceil(paragraphs.length / 2);
        const firstHalf = paragraphs.slice(0, midIndex).join('\n\n');
        const secondHalf = paragraphs.slice(midIndex).join('\n\n');
        content.innerHTML = `
            <div class="space-y-8 animate-in fade-in duration-500">
                <img src="${a.img}" class="w-full h-[300px] md:h-[500px] object-cover rounded-[2.5rem] shadow-2xl">
                <div class="space-y-8">
                    <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">${a.title}</h1>
                    <div class="text-lg md:text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${firstHalf}</div>
                    
                    <div class="py-10 px-6 flex flex-col items-center gap-6 bg-orange-50 dark:bg-orange-900/10 rounded-[3rem] border border-orange-100 dark:border-orange-800/30">
                        <p class="text-xl font-black text-center">اغتنم العرض الحصري من عبدو ويب!</p>
                        <a href="${state.ads.smartlink1}" target="_blank" class="bg-gray-900 dark:bg-orange-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl shadow-orange-600/30">مشاهدة العرض الآن ←</a>
                    </div>

                    <div id="in-article-ad-mid" class="my-10 flex justify-center w-full min-h-[120px]"></div>
                    <div class="text-lg md:text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${secondHalf}</div>
                    
                    <div class="pt-12 border-t border-gray-100 dark:border-gray-800">
                        <p class="text-center text-sm font-black text-gray-400 mb-6 uppercase tracking-widest">شارك الفائدة مع مجتمعك</p>
                        ${getShareButtonsHtml(a.title)}
                    </div>

                    <div id="in-article-ad-bottom" class="my-10 flex justify-center w-full min-h-[120px]"></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            injectAd('in-article-ad-mid', state.ads.inArticle1);
            injectAd('in-article-ad-bottom', state.ads.inArticle2);
        }, 500);
    }
    showPage('article-detail');
};

const render = () => {
    const artList = document.getElementById('articles-list');
    if (artList) {
        artList.innerHTML = state.articles.map(a => `
            <div class="group bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all cursor-pointer" onclick="window.viewArticle('${a.id}')">
                <div class="w-full md:w-64 h-52 overflow-hidden rounded-[2rem] shrink-0">
                    <img src="${a.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <span class="text-orange-600 text-[10px] font-black uppercase tracking-widest mb-3">${a.category}</span>
                    <h3 class="text-xl md:text-2xl font-black mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">${a.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">${a.body}</p>
                    <div class="mt-auto flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        اقرأ التفاصيل <span>←</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const side = document.getElementById('offers-sidebar');
    if (side) {
        side.innerHTML = state.offers.slice(0, 4).map(o => `
            <div class="group flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer" onclick="window.location.href='${state.ads.smartlink1}'">
                <img src="${o.img}" class="w-14 h-14 object-cover rounded-xl shrink-0">
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-black text-xs mb-1 truncate">${o.title}</h4>
                    <p class="text-orange-600 font-black text-xs">${o.price}</p>
                </div>
            </div>
        `).join('');
    }

    const fullGrid = document.getElementById('offers-full-grid');
    if (fullGrid) {
        let itemsHtml = state.offers.map((o, index) => {
            let html = `
                <div class="group bg-white dark:bg-gray-900 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all flex flex-col">
                    <div class="overflow-hidden rounded-2xl mb-5 aspect-square">
                        <img src="${o.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    </div>
                    <h4 class="font-black text-lg mb-2 line-clamp-1">${o.title}</h4>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-orange-600 font-black text-xl">${o.price}</span>
                    </div>
                    <a href="${state.ads.smartlink1}" target="_blank" class="block w-full text-center bg-gray-900 dark:bg-orange-600 text-white py-3.5 rounded-xl font-black text-xs shadow-lg shadow-orange-600/20 transition-all mb-4">اطلب الآن</a>
                    
                    <div class="border-t border-gray-100 dark:border-gray-800 pt-3 mt-auto">
                        ${getShareButtonsHtml(o.title)}
                    </div>
                </div>
            `;
            if (index === 1) html += `<div id="grid-ad-slot" class="col-span-full py-8 flex justify-center w-full min-h-[100px] bg-gray-50 dark:bg-gray-800/20 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800"></div>`;
            return html;
        }).join('');
        fullGrid.innerHTML = itemsHtml;
        setTimeout(() => injectAd('grid-ad-slot', state.ads.inArticle1), 600);
    }
};

const addArticle = () => {
    const t = (document.getElementById('new-art-title') as HTMLInputElement).value;
    const b = (document.getElementById('new-art-body') as HTMLTextAreaElement).value;
    if(!t || !b) return;
    state.articles.unshift({ id: Date.now().toString(), title: t, body: b, category: "جديد", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showPage('home');
};

Object.assign(window as any, { 
    showPage, handleLogin, viewArticle, saveAds, addArticle,
    switchTab: (id: string) => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
        document.getElementById(id)?.classList.remove('hidden');
        document.querySelectorAll('.admin-nav-btn').forEach(b => {
            b.classList.remove('bg-orange-600', 'text-white');
            b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
        });
        const active = Array.from(document.querySelectorAll('.admin-nav-btn')).find(b => b.getAttribute('onclick')?.includes(id));
        if(active) {
            active.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            active.classList.add('bg-orange-600', 'text-white');
        }
    },
    toggleDarkMode: () => document.documentElement.classList.toggle('dark')
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    refreshAds();
});

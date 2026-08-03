"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import ContactForm from "@/app/components/ContactForm";

type Lang = "ar" | "en";

const mattresses = [
  {
    id: "signature", video: "signature", frameCount: 30, height: "27 cm",
    name: { ar: "سيقنتشر", en: "Signature" },
    value: { ar: "راحة راقية تُصمّم لتدوم.", en: "Refined comfort, designed to last." },
    feel: { ar: "متوازن", en: "Balanced" },
    line: { ar: "تفاصيل تصنع فرقاً.", en: "Designed in every detail." },
    intro: { ar: "طبقات متوازنة تلتقي في راحة أنيقة ومساندة ثابتة.", en: "Balanced layers, refined comfort, and steady support." },
    layers: [
      { ar: "قماش خارجي — خياطة مستقيمة كلاسيكية", en: "Classic straight-quilted outer fabric" },
      { ar: "سوبر فوم ٢ سم", en: "2 cm Super Foam" },
      { ar: "لوح مضغوط ٢ سم", en: "2 cm compressed board" },
      { ar: "إسفنج أبيض خفيف ٢ سم (سفلي)", en: "2 cm light white foam (base)" },
    ],
    highlights: { ar: ["راحة متوازنة", "تشطيب أنيق", "دعم ثابت"], en: ["Balanced comfort", "Elegant finish", "Steady support"] },
  },
  {
    id: "softness", video: "softness", frameCount: 30, height: "28–29 cm",
    name: { ar: "السوفتنس", en: "Softness" },
    value: { ar: "نعومة وطبقات راحة.", en: "Softness and comfort layers." },
    feel: { ar: "لين", en: "Soft" },
    line: { ar: "نعومة تُحَس من أول ليلة.", en: "Softness from the first night." },
    intro: { ar: "طبقات فاخرة تمنح استقبالاً ناعماً مع شعور دافئ بالاحتواء.", en: "Plush layers for a soft, enveloping first impression." },
    layers: [
      { ar: "قماش خارجي أبيض", en: "White outer fabric" },
      { ar: "سوبرفوم ٦ سم", en: "6 cm Super Foam" },
      { ar: "طبقة راحة إضافية ٥ سم", en: "5 cm added comfort layer" },
      { ar: "إسفنج أبيض خفيف (سفلي)", en: "Light white foam (base)" },
    ],
    highlights: { ar: ["نعومة استثنائية", "توزيع لطيف للضغط", "تهوية مريحة"], en: ["Exceptional softness", "Gentle pressure relief", "Comfortable airflow"] },
  },
  {
    id: "prada", video: "prada", frameCount: 30, height: "27 cm",
    name: { ar: "برادا", en: "Prada" },
    value: { ar: "Euro Top وتقليل انتقال الحركة.", en: "Euro Top with reduced motion transfer." },
    feel: { ar: "متوسط", en: "Medium" },
    line: { ar: "فخامة عملية، ليلة بعد ليلة.", en: "Practical luxury, night after night." },
    intro: { ar: "تركيبة دقيقة تجمع طبقات الراحة مع قاعدة داعمة للمشاريع الراقية.", en: "A precise build of comfort layers and a supportive foundation." },
    layers: [
      { ar: "قماش خارجي — خياطة معينات (كابيتونيه)", en: "Quilted diamond-pattern outer fabric" },
      { ar: "سوبرفوم ٢ سم", en: "2 cm Super Foam" },
      { ar: "لوح مضغوط ٢ سم", en: "2 cm compressed board" },
      { ar: "إسفنج أبيض خفيف ٢ سم (سفلي)", en: "2 cm light white foam (base)" },
    ],
    highlights: { ar: ["دعم متوازن", "تصميم Euro Top", "حركة أقل بين النائمين"], en: ["Balanced support", "Euro Top design", "Reduced sleep-partner motion"] },
  },
  {
    id: "grand", video: "grand", frameCount: 30, height: "29 cm",
    name: { ar: "الجراند", en: "Grand" },
    value: { ar: "ارتفاع فاخر واستقرار يومي.", en: "Premium height and daily stability." },
    feel: { ar: "متوسط", en: "Medium" },
    line: { ar: "مساحة أكبر لراحة أكبر.", en: "More room for greater rest." },
    intro: { ar: "بنية مدروسة تجمع الإحساس المترف مع أداء موثوق طويل الأمد.", en: "A considered build combining a plush feel and lasting performance." },
    layers: [
      { ar: "قماش خارجي أبيض ٢ سم", en: "2 cm white outer fabric" },
      { ar: "سوبرفوم ٤ سم", en: "4 cm Super Foam" },
      { ar: "لوح مضغوط", en: "Compressed board" },
      { ar: "إسفنج أبيض خفيف ٢ سم (سفلي)", en: "2 cm light white foam (base)" },
    ],
    highlights: { ar: ["ارتفاع فاخر", "استقرار يومي", "راحة ممتدة"], en: ["Premium height", "Daily stability", "Extended comfort"] },
  },
  {
    id: "classic", video: "classic", frameCount: 30, height: "25 cm",
    name: { ar: "الكلاسيك", en: "Classic" },
    value: { ar: "دبل فيس: جهة لينة وجهة متوسطة القسوة.", en: "Dual-sided: soft and medium-firm." },
    feel: { ar: "لين / متوسط القسوة", en: "Soft / medium-firm" },
    line: { ar: "كلاسيكية موثوقة بمستوى جديد.", en: "Dependable classic comfort, elevated." },
    intro: { ar: "تصميم دبل فيس يمنحك جهتين للنوم: لينة أو متوسطة القسوة، مع جودة يومية وقيمة مستمرة.", en: "A dual-sided design offering two sleep feels: soft or medium-firm, with daily quality and lasting value." },
    layers: [
      { ar: "قماش خارجي وبريم", en: "Outer fabric and trim" },
      { ar: "طبقة قماش منفوش بمايكرو", en: "Microfiber-padded fabric layer" },
      { ar: "طبقة فوم", en: "Foam layer" },
      { ar: "إسفنج عالي الكثافة", en: "High-density foam" },
      { ar: "إسفنج عادي ناعم (سفلي)", en: "Soft standard foam (base)" },
    ],
    highlights: { ar: ["دبل فيس: لينة / متوسطة القسوة", "دعم متزن", "قيمة طويلة الأمد"], en: ["Dual-sided: soft / medium-firm", "Balanced support", "Long-term value"] },
  },
];

const pillows = [
  {
    id: "pillow-standard", video: "signature", frameCount: 30, height: "12 cm",
    name: { ar: "وسادة فندقية قياسية", en: "Standard Hotel Pillow" },
    value: { ar: "دعم فندقي احترافي.", en: "Professional hotel support." },
    feel: { ar: "متوسط", en: "Medium" },
    line: { ar: "دعم العنق المثالي.", en: "Perfect neck support." },
    intro: { ar: "وسادة مصممة خصيصاً لمعايير الفنادق الفاخرة، توفر دعماً ثابتاً وراحة طوال الليل.", en: "A pillow designed for luxury hotel standards, providing steady support and comfort throughout the night." },
    layers: [
      { ar: "غطاء فندقي 100% قطن مصري", en: "100% Egyptian cotton hotel cover" },
      { ar: "حشوة ألياف عالية الكثافة", en: "High-density fiber fill" },
      { ar: "دعم منتصف الرقبة", en: "Mid-neck support layer" },
    ],
    highlights: { ar: ["دعم احترافي", "قطن مصري 100%", "مضاد للحساسية"], en: ["Professional support", "100% Egyptian cotton", "Hypoallergenic"] },
  },
  {
    id: "pillow-premium", video: "softness", frameCount: 30, height: "15 cm",
    name: { ar: "وسادة فندقية فاخرة", en: "Premium Hotel Pillow" },
    value: { ar: "فخامة محسوسة.", en: "Luxury you can feel." },
    feel: { ar: "ناعم", en: "Soft" },
    line: { ar: "لذة النعومة الفاخرة.", en: "The pleasure of luxury softness." },
    intro: { ar: "وسادة عالية الجودة بحشوة فاخرة توفر أقصى درجات الراحة والدعم للنزلاء المتطلبين.", en: "Premium-quality pillow with luxury fill offering maximum comfort and support for discerning guests." },
    layers: [
      { ar: "ساتان فندقي 100% حرير", en: "100% silk hotel satin" },
      { ar: "حشوة بر الشرقية المحسنة", en: "Enhanced eider fill" },
      { ar: "دعم مرن عالي الجودة", en: "Premium flexible support" },
    ],
    highlights: { ar: ["حرير 100%", "حشوة فاخرة", "دعم فائق"], en: ["100% silk", "Luxury fill", "Superior support"] },
  },
];

const bedLinens = [
  {
    id: "sheets-sateen", video: "classic", frameCount: 30, height: "300 TC",
    name: { ar: "مفروشات ساتان فندقية", en: "Sateen Hotel Linens" },
    value: { ar: "انزلاق ناعم وتشطيب فاخر.", en: "Silky smooth glide and luxury finish." },
    feel: { ar: "ناعم جداً", en: "Ultra soft" },
    line: { ar: "إحساس الفخامة من أول لمسة.", en: "Luxury sensation from first touch." },
    intro: { ar: "مفروشات فندقية من القطن النقي بنسج ساتان يوفر انزلاقاً ناعماً وتشطيباً فاخراً يستمر طويلاً.", en: "Pure cotton hotel linens with sateen weave providing silky glide and luxury finish that lasts." },
    layers: [
      { ar: "قطن 100% مصري طويل الألياف", en: "100% long-staple Egyptian cotton" },
      { ar: "نسج ساتان 500 TC", en: "500 TC sateen weave" },
      { ar: "تشطيب فندقي فاخر", en: "Luxury hotel finish" },
    ],
    highlights: { ar: ["قطن 100% مصري", "نسج ساتان", "عمر طويل"], en: ["100% Egyptian cotton", "Sateen weave", "Long-lasting"] },
  },
  {
    id: "sheets-percale", video: "prada", frameCount: 30, height: "300 TC",
    name: { ar: "مفروشات بيركال فندقية", en: "Percale Hotel Linens" },
    value: { ar: "تهوية مثالية وتنظيف سهل.", en: "Perfect ventilation and easy care." },
    feel: { ar: "خفيف وحريري", en: "Light and silky" },
    line: { ar: "تهوية وراحة مثالية.", en: "Perfect airflow and comfort." },
    intro: { ar: "مفروشات بنسج بيركال تجمع بين التهوية المثالية والراحة العالية، مثالية للفنادق والمشاريع السكنية.", en: "Percale weave linens combining perfect ventilation and high comfort, ideal for hotels and residential projects." },
    layers: [
      { ar: "قطن 100% خالص", en: "100% pure cotton" },
      { ar: "نسج بيركال 400 TC", en: "400 TC percale weave" },
      { ar: "معالجة مضادة للتجاعيد", en: "Wrinkle-resistant treatment" },
    ],
    highlights: { ar: ["تهوية ممتازة", "سهلة التنظيف", "مضادة للتجاعيد"], en: ["Excellent ventilation", "Easy care", "Wrinkle-resistant"] },
  },
];

const mattressPads = [
  {
    id: "pad-quilted", video: "grand", frameCount: 30, height: "2 cm",
    name: { ar: "لباد مرتبة مخيط فندقي", en: "Quilted Hotel Mattress Pad" },
    value: { ar: "حماية وراحة إضافية.", en: "Protection and added comfort." },
    feel: { ar: "متوسط", en: "Medium" },
    line: { ar: "حماية المرتبة مع راحة زائدة.", en: "Mattress protection with added comfort." },
    intro: { ar: "لباد مرتبة مخيط يوفر حماية كاملة للمرتبة مع طبقة راحة إضافية، مثالي للفنادق والمشاريع السكنية.", en: "Quilted mattress pad providing full mattress protection with added comfort layer, ideal for hotels and residential projects." },
    layers: [
      { ar: "قطن 100% أبيض", en: "100% white cotton" },
      { ar: "حشوة بولي فاخرة", en: "Luxury poly fill" },
      { ar: "قاعدة مطاطية مرنة", en: "Elastic rubber base" },
    ],
    highlights: { ar: ["حماية كاملة", "راحة إضافية", "تثبيت آمن"], en: ["Full protection", "Added comfort", "Secure fit"] },
  },
  {
    id: "pad-waterproof", video: "softness", frameCount: 30, height: "1.5 cm",
    name: { ar: "لباد مرتبة مقاوم للماء", en: "Waterproof Hotel Mattress Pad" },
    value: { ar: "حماية مقاومة للماء والبقع.", en: "Waterproof and stain protection." },
    feel: { ar: "خفيف", en: "Light" },
    line: { ar: "حماية فعالة بدون سمك زائد.", en: "Effective protection without bulk." },
    intro: { ar: "لباد مقاوم للماء يحمي المرتبة من السوائل والبقع مع الحفاظ على المرونة والراحة، حل مثالي للفنادق.", en: "Waterproof pad protecting mattresses from liquids and stains while maintaining flexibility and comfort, ideal for hotels." },
    layers: [
      { ar: "طبقة ميكروفيبر علوية", en: "Top microfiber layer" },
      { ar: "غشاء مقاوم للماء", en: "Waterproof membrane" },
      { ar: "قاعدة لا تنزلق", en: "Non-slip base" },
    ],
    highlights: { ar: ["مقاوم للماء 100%", "سهل التنظيف", "لا ينزلق"], en: ["100% waterproof", "Easy clean", "Non-slip"] },
  },
];

const copy = {
  ar: {
    collection: "منتجات هوفن قسم مبيعات الجملة", menu: "تواصل", switch: "EN", hero: "مزيج الجودة مع\nالسعر والموثوقية",
    heroBody: "مجموعة شاملة من المراتب والوسائد والمفروشات واللباد للفنادق، والمشاريع السكنية، ومتاجر الأثاث التي تبحث عن جودة يمكن الوثوق بها.", explore: "اكتشف المجموعة",
    layerTitle: "طبقات المنتج", layerHint: "تظهر المواصفات بعد اكتمال الحركة", height: "المقاس", feel: "الإحساس", layersCount: "عدد الطبقات", benefits: "المزايا بعد اكتمال الطبقات",
    wholesale: "مصمم للأعمال", wholesaleTitle: "شريك الراحة\nلمشروعك القادم.", wholesaleBody: "ضمان ٧ سنوات · توريد إلى جميع مناطق المملكة · مدة التجهيز ١٥ يومًا وتختلف حسب الكمية.",
    contact: "لنصنع راحة أفضل", contactTitle: "لنبدأ الحديث عن\nمشروعك القادم.", top: "للأعلى", label: "المجموعة",
    mattresses: "المراتب الفندقية", pillows: "الوسائد الفندقية", linens: "المفروشات الفندقية", pads: "لباد المراتب",
    formName: "الاسم", formEmail: "البريد الإلكتروني", formPhone: "الهاتف", formCompany: "اسم المشروع", formMessage: "الرسالة", formSubmit: "أرسل الطلب", formSuccess: "تم إرسال طلبك بنجاح!",
  },
  en: {
    collection: "HOVEN WHOLESALE COLLECTION · 2026", menu: "Contact", switch: "ع", hero: "Comfort made\nfor your projects.",
    heroBody: "A comprehensive collection of mattresses, pillows, linens, and pads for hospitality, residences, and retail partners seeking quality they can rely on.", explore: "Explore collection",
    layerTitle: "Product layers", layerHint: "Specifications reveal when the motion is complete", height: "Size", feel: "Feel", layersCount: "Layer count", benefits: "Benefits revealed after every layer",
    wholesale: "BUILT FOR BUSINESS", wholesaleTitle: "A comfort partner\nfor your next project.", wholesaleBody: "7-year warranty · Delivery across Saudi Arabia · 15-day preparation time, varying by order quantity.",
    contact: "LET'S BUILD BETTER REST", contactTitle: "Let's talk about\nyour next project.", top: "Back to top", label: "THE COLLECTION",
    mattresses: "Hotel Mattresses", pillows: "Hotel Pillows", linens: "Hotel Linens", pads: "Mattress Pads",
    formName: "Name", formEmail: "Email", formPhone: "Phone", formCompany: "Project Name", formMessage: "Message", formSubmit: "Send Request", formSuccess: "Your request has been sent successfully!",
  },
} as const;

function Multiline({ children }: { children: string }) { return <>{children.split("\n").map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</>; }

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#top" className="flex-shrink-0">
            <img src="/hoven-logo-white.png" alt="HOVEN" className="h-8 w-auto" />
          </a>
          <nav className="flex items-center gap-4 text-white">
            <a href="#contact" className="hover:opacity-80 transition">{t.menu}</a>
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition"
              aria-label="Change language"
            >
              {t.switch}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-widest mb-4 opacity-75">{t.collection}</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto whitespace-pre-line">
            {t.hero}
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{t.heroBody}</p>
          <a
            href="#signature"
            className="inline-flex items-center gap-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition"
          >
            {t.explore}
          </a>
        </div>
      </section>

      {/* Collection Intro - Mattresses */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <p className="text-sm tracking-widest text-gray-500 mb-4">{t.label}</p>
        <h2 className="text-4xl md:text-5xl font-bold">
          {lang === "ar" ? (
            <>المجموعة الأولى<br /><em className="font-normal italic">المراتب</em></>
          ) : (
            <>Five mattresses,<br /><em className="font-normal italic">clearly considered.</em></>
          )}
        </h2>
      </section>

      {/* Mattresses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-20 md:space-y-32">
        {mattresses.map((m) => (
          <ProductCard
            key={m.id}
            id={m.id}
            nameAr={m.name.ar}
            nameEn={m.name.en}
            taglineAr={m.value.ar}
            taglineEn={m.value.en}
            descriptionAr={m.intro.ar}
            descriptionEn={m.intro.en}
            heightCm={m.height}
            feel={m.feel[lang]}
            layers={m.layers}
            highlightsAr={m.highlights.ar}
            highlightsEn={m.highlights.en}
            video={m.video}
            frameCount={m.frameCount}
            language={lang}
          />
        ))}
      </div>

      {/* Collection Intro - Pillows */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold">
          {lang === "ar" ? (
            <>المجموعة الثانية<br /><em className="font-normal italic">الوسائد</em></>
          ) : (
            <>Premium pillows,<br /><em className="font-normal italic">for perfect rest.</em></>
          )}
        </h2>
      </section>

      {/* Pillows Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-20 md:space-y-32">
        {pillows.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            nameAr={p.name.ar}
            nameEn={p.name.en}
            taglineAr={p.value.ar}
            taglineEn={p.value.en}
            descriptionAr={p.intro.ar}
            descriptionEn={p.intro.en}
            heightCm={p.height}
            feel={p.feel[lang]}
            layers={p.layers}
            highlightsAr={p.highlights.ar}
            highlightsEn={p.highlights.en}
            video={p.video}
            frameCount={p.frameCount}
            language={lang}
          />
        ))}
      </div>

      {/* Collection Intro - Linens */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold">
          {lang === "ar" ? (
            <>المجموعة الثالثة<br /><em className="font-normal italic">المفروشات</em></>
          ) : (
            <>Hotel linens,<br /><em className="font-normal italic">luxury every night.</em></>
          )}
        </h2>
      </section>

      {/* Linens Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-20 md:space-y-32">
        {bedLinens.map((l) => (
          <ProductCard
            key={l.id}
            id={l.id}
            nameAr={l.name.ar}
            nameEn={l.name.en}
            taglineAr={l.value.ar}
            taglineEn={l.value.en}
            descriptionAr={l.intro.ar}
            descriptionEn={l.intro.en}
            heightCm={l.height}
            feel={l.feel[lang]}
            layers={l.layers}
            highlightsAr={l.highlights.ar}
            highlightsEn={l.highlights.en}
            video={l.video}
            frameCount={l.frameCount}
            language={lang}
          />
        ))}
      </div>

      {/* Collection Intro - Pads */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold">
          {lang === "ar" ? (
            <>المجموعة الرابعة<br /><em className="font-normal italic">لباد المراتب</em></>
          ) : (
            <>Mattress protection,<br /><em className="font-normal italic">built to last.</em></>
          )}
        </h2>
      </section>

      {/* Pads Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-20 md:space-y-32">
        {mattressPads.map((pad) => (
          <ProductCard
            key={pad.id}
            id={pad.id}
            nameAr={pad.name.ar}
            nameEn={pad.name.en}
            taglineAr={pad.value.ar}
            taglineEn={pad.value.en}
            descriptionAr={pad.intro.ar}
            descriptionEn={pad.intro.en}
            heightCm={pad.height}
            feel={pad.feel[lang]}
            layers={pad.layers}
            highlightsAr={pad.highlights.ar}
            highlightsEn={pad.highlights.en}
            video={pad.video}
            frameCount={pad.frameCount}
            language={lang}
          />
        ))}
      </div>

      {/* Wholesale */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm tracking-widest text-gray-500 mb-4">{t.wholesale}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 whitespace-pre-line">
            {t.wholesaleTitle}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{t.wholesaleBody}</p>
        </div>
      </section>

      {/* Contact Section with Form */}
      <footer id="contact" className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="text-center lg:text-start" dir={lang === "ar" ? "rtl" : "ltr"}>
              <img src="/hoven-logo-white.png" alt="HOVEN" className="h-8 mb-8 mx-auto lg:mx-0" />
              <p className="text-sm tracking-widest mb-4 opacity-75">{t.contact}</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 whitespace-pre-line">
                {t.contactTitle}
              </h2>
              <div className="space-y-4 mb-8">
                <div>
                  <a
                    href="mailto:ceo@brandsforhome.sa"
                    className="hover:opacity-75 transition text-lg"
                  >
                    ceo@brandsforhome.sa
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+966557227180"
                    className="hover:opacity-75 transition text-lg"
                  >
                    055 722 7180
                  </a>
                </div>
                <div>
                  <a
                    href="https://wa.me/966505130111"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 border border-white/50 hover:border-white transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <a
                href="#top"
                className="text-sm opacity-75 hover:opacity-100 transition"
              >
                {t.top} ↑
              </a>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm
                language={lang}
                copy={{
                  formName: t.formName,
                  formEmail: t.formEmail,
                  formPhone: t.formPhone,
                  formCompany: t.formCompany,
                  formMessage: t.formMessage,
                  formSubmit: t.formSubmit,
                  formSuccess: t.formSuccess,
                }}
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

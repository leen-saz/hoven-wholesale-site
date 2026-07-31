"use client";

import { useEffect, useState } from "react";

type Lang = "ar" | "en";

const mattresses = [
  {
    id: "signature", video: "signature", height: "27 cm",
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
    id: "softness", video: "softness", height: "28–29 cm",
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
    id: "prada", video: "prada", height: "27 cm",
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
    id: "grand", video: "grand", height: "29 cm",
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
    id: "classic", video: "classic", height: "25 cm",
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

const copy = {
  ar: {
    collection: "مجموعة هوفن للمبيعات بالجملة · ٢٠٢٦", menu: "تواصل", switch: "EN", hero: "الراحة التي\nتستحقها المشاريع.",
    heroBody: "مجموعة مراتب للفنادق، المشاريع السكنية، ومتاجر الأثاث التي تبحث عن جودة يمكن الوثوق بها.", explore: "اكتشف المجموعة",
    layerTitle: "تفكيك المرتبة", layerHint: "تظهر المواصفات بعد اكتمال الحركة", height: "ارتفاع المرتبة", feel: "الإحساس", layersCount: "عدد الطبقات", benefits: "المزايا بعد اكتمال الطبقات",
    wholesale: "مصمم للأعمال", wholesaleTitle: "شريك الراحة\nلمشروعك القادم.", wholesaleBody: "ضمان ٧ سنوات · توريد إلى جميع مناطق المملكة · مدة التجهيز ١٥ يومًا وتختلف حسب الكمية.",
    contact: "لنصنع راحة أفضل", contactTitle: "لنبدأ الحديث عن\nمشروعك القادم.", top: "للأعلى", label: "المجموعة",
  },
  en: {
    collection: "HOVEN WHOLESALE COLLECTION · 2026", menu: "Contact", switch: "ع", hero: "Comfort made\nfor your projects.",
    heroBody: "A mattress collection for hospitality, residences, and retail partners seeking quality they can rely on.", explore: "Explore collection",
    layerTitle: "Mattress breakdown", layerHint: "Specifications reveal when the motion is complete", height: "Mattress height", feel: "Feel", layersCount: "Layer count", benefits: "Benefits revealed after every layer",
    wholesale: "BUILT FOR BUSINESS", wholesaleTitle: "A comfort partner\nfor your next project.", wholesaleBody: "7-year warranty · Delivery across Saudi Arabia · 15-day preparation time, varying by order quantity.",
    contact: "LET'S BUILD BETTER REST", contactTitle: "Let's talk about\nyour next project.", top: "Back to top", label: "THE COLLECTION",
  },
} as const;

function Multiline({ children }: { children: string }) { return <>{children.split("\n").map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</>; }

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [active, setActive] = useState("");
  const t = copy[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { threshold: 0.63 });
    document.querySelectorAll<HTMLElement>(".mattress-stage").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [lang]);
  return <main className={`site ${lang}`} dir={lang === "ar" ? "rtl" : "ltr"}>
    <header className="topbar">
      <a href="#top" className="logo" aria-label="HOVEN home"><img src="/hoven-logo-white.png" alt="HOVEN" /></a>
      <div className="header-actions"><a href="#contact">{t.menu}</a><button onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label="Change language">{t.switch}</button></div>
    </header>
    <section id="top" className="hero-screen">
      <video autoPlay muted loop playsInline preload="auto"><source src="/video/hero.mp4" type="video/mp4" /></video><div className="veil" />
      <div className="center-copy hero-copy"><p className="eyebrow">{t.collection}</p><h1><Multiline>{t.hero}</Multiline></h1><p>{t.heroBody}</p><a className="round-link" href="#signature"><span>{t.explore}</span><b>↓</b></a></div>
    </section>
    <section className="collection-intro"><p className="eyebrow">{t.label}</p><h2>{lang === "ar" ? <>خمس مراتب،<br /><em>تفاصيل واضحة.</em></> : <>Five mattresses,<br /><em>clearly considered.</em></>}</h2></section>
    {mattresses.map((m, index) => <section id={m.id} key={m.id} className={`mattress-stage ${active === m.id ? "is-active" : ""}`}>
      <div className="sticky-stage"><video autoPlay muted loop playsInline preload="auto"><source src={`/video/${m.video}.mp4`} type="video/mp4" /></video><div className="veil" />
        <div className="center-copy product-copy"><p className="eyebrow">{String(index + 1).padStart(2, "0")} / {m.name.en.toUpperCase()}</p><h2>{m.name[lang]}</h2><strong>{m.value[lang]}</strong></div>
        <div className="product-details"><h3>{m.line[lang]}</h3><p>{m.intro[lang]}</p></div>
        <div className="spec-strip" aria-label={t.layerTitle}>
          <div><span>{t.height}</span><b>{m.height}</b></div>
          <div><span>{t.feel}</span><b>{m.feel[lang]}</b></div>
          <div className="layer-summary"><span>{t.layerTitle}</span><p>{m.layers.map((layer, layerIndex) => <i key={layer.en}><b>{String(layerIndex + 1).padStart(2, "0")}</b>{layer[lang]}</i>)}</p></div>
        </div>
        <div className="layers" aria-label={t.layerTitle}><div className="layers-head"><span>{t.layerTitle}</span><small>{t.layerHint}</small></div>{m.layers.map((layer, layerIndex) => <article key={layer.en} style={{ "--delay": `${layerIndex * 150}ms` } as React.CSSProperties}><b>{String(layerIndex + 1).padStart(2, "0")}</b><span>{layer[lang]}</span></article>)}</div>
        <div className="highlights"><small>{t.benefits}</small>{m.highlights[lang].map(item => <span key={item}>{item}</span>)}</div>
      </div>
    </section>)}
    <section className="wholesale"><p className="eyebrow">{t.wholesale}</p><h2><Multiline>{t.wholesaleTitle}</Multiline></h2><p>{t.wholesaleBody}</p></section>
    <footer id="contact"><img src="/hoven-logo-white.png" alt="HOVEN" /><p className="eyebrow">{t.contact}</p><h2><Multiline>{t.contactTitle}</Multiline></h2><a className="email" href="mailto:leen@brandsforhome.sa">leen@brandsforhome.sa</a><a className="phone" href="tel:+966557227180">055 722 7180</a><a className="whatsapp" href="https://wa.me/966505130111" target="_blank" rel="noreferrer">WhatsApp</a><a className="to-top" href="#top">{t.top} ↑</a></footer>
  </main>;
}

"use client";

import { useEffect, useState } from "react";
import LinenProductCard from "@/app/components/LinenProductCard";
import ContactForm from "@/app/components/ContactForm";
import Navigation from "@/app/components/Navigation";
import { bedLinens, copy } from "@/app/lib/products";

type Lang = "ar" | "en";

export default function Linens() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <Navigation
        currentPage="linens"
        language={lang}
        onLanguageChange={() => setLang(lang === "ar" ? "en" : "ar")}
      />

      {/* Hero - Image Background with Overlay Text */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("/products/sheets-sateen.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 py-20 text-white" dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="space-y-6">
            <p className="text-sm tracking-widest opacity-80 uppercase">{t.collection}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {lang === "ar" ? "مفروشات هوفن الفندقية" : "HOVEN Hotel Linens"}
            </h1>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl leading-relaxed">
              {lang === "ar"
                ? "ملمس حريري فاخر مع متانة فندقية عالية لراحة استثنائية"
                : "Luxury silky texture with premium durability for exceptional comfort"}
            </p>
          </div>
        </div>
      </section>

      {/* Collection Intro */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <p className="text-sm tracking-widest text-gray-500 mb-4">{t.label}</p>
        <h2 className="text-4xl md:text-5xl font-bold">
          {lang === "ar" ? (
            <>المجموعة الثالثة<br /><em className="font-normal italic">المفروشات</em></>
          ) : (
            <>Hotel linens,<br /><em className="font-normal italic">luxury every night.</em></>
          )}
        </h2>
      </section>

      {/* Linens Grid */}
      <div className="pb-16 space-y-20 md:space-y-32">
        {bedLinens.map((l) => (
          <LinenProductCard
            key={l.id}
            id={l.id}
            image={l.image}
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

      {/* Contact Section */}
      <footer id="contact" className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
              <a href="#top" className="text-sm opacity-75 hover:opacity-100 transition">
                {t.top} ↑
              </a>
            </div>

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

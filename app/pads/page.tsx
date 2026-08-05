"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import ContactForm from "@/app/components/ContactForm";
import Navigation from "@/app/components/Navigation";
import { mattressPads, copy } from "@/app/lib/products";

type Lang = "ar" | "en";

export default function Pads() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <Navigation
        currentPage="pads"
        language={lang}
        onLanguageChange={() => setLang(lang === "ar" ? "en" : "ar")}
      />

      {/* Hero - Image Background */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/products/pad-quilted.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 text-white text-center">
          <p className="text-sm tracking-widest mb-4 opacity-75 uppercase">{t.collection}</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {lang === "ar" ? "لباد هوفن الفندقي" : "HOVEN Hotel Mattress Pads"}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {lang === "ar"
              ? "حماية شاملة مع راحة إضافية وارتفاع مثالي للمراتب"
              : "Complete protection with added comfort and ideal height for mattresses"}
          </p>
        </div>
      </section>

      {/* Collection Intro */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <p className="text-sm tracking-widest text-gray-500 mb-4">{t.label}</p>
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

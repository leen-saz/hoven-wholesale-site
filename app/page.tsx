"use client";

import { useEffect, useState } from "react";
import MattressProductCard from "@/app/components/MattressProductCard";
import ContactForm from "@/app/components/ContactForm";
import Navigation from "@/app/components/Navigation";
import { mattresses, copy } from "@/app/lib/products";

type Lang = "ar" | "en";

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
      <Navigation
        currentPage="home"
        language={lang}
        onLanguageChange={() => setLang(lang === "ar" ? "en" : "ar")}
      />

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
      <div className="pb-16 space-y-0">
        {mattresses.map((m) => (
          <MattressProductCard
            key={m.id}
            id={m.id}
            video={m.video}
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
            language={lang}
          />
        ))}
      </div>


      {/* Wholesale */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F2E9' }}>
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

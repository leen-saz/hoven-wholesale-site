"use client";

import { useEffect, useState } from "react";
import LinenProductCard from "@/app/components/LinenProductCard";
import Navigation from "@/app/components/Navigation";
import { bedLinens, copy } from "@/app/lib/products";

type Lang = "ar" | "en";

export default function Linens() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = copy[lang];

  useEffect(() => {
    const saved = localStorage.getItem("language-linens") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("language-linens", lang);
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

      {/* Hero */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
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
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 py-20 text-white text-center" dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="space-y-6">
            <p className="text-sm tracking-widest opacity-80 uppercase">{t.collection}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {lang === "ar" ? "مفروشات هوفن الفندقية" : "HOVEN Hotel Linens"}
            </h1>
            <p className="text-lg md:text-xl opacity-95 mx-auto max-w-2xl leading-relaxed">
              {lang === "ar"
                ? "ملمس حريري فاخر مع متانة فندقية عالية لراحة استثنائية"
                : "Luxury silky texture with premium durability for exceptional comfort"}
            </p>
          </div>
        </div>
      </section>

      {/* Collection Intro */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
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
      <section className="py-16 md:py-24 bg-cover bg-center" style={{ backgroundImage: 'url("/products/wholesale-bg.jpg")', backgroundAttachment: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest text-gray-500 mb-4">{t.wholesale}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 whitespace-pre-line">
              {t.wholesaleTitle}
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {t.wholesalePoints.map((point, idx) => (
              <div
                key={idx}
                className="px-4 py-3 backdrop-blur-xl bg-white/15 border border-white/25 rounded-lg text-gray-800 text-sm font-medium hover:bg-white/50 transition text-center"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/hoven-logo-white.png" alt="HOVEN" className="h-8 mb-8 mx-auto" />
          <p className="text-sm tracking-widest mb-4 opacity-75">{t.contact}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 whitespace-pre-line">
            {t.contactTitle}
          </h2>
          <a
            href="https://wa.me/0505130111"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition mb-8"
          >
            {lang === "ar" ? "تواصل عبر WhatsApp" : "Contact via WhatsApp"}
          </a>
          <div className="mt-12">
            <a href="#top" className="text-sm opacity-75 hover:opacity-100 transition">
              {t.top} ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

interface ProductHeroSectionProps {
  imageUrl: string;
  language: "ar" | "en";
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export default function ProductHeroSection({
  imageUrl,
  language,
  title,
  subtitle,
  description,
  highlights,
}: ProductHeroSectionProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      dir={dir}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 text-white">
        <div className="space-y-8">
          {/* Eyebrow */}
          <p className="text-sm tracking-widest uppercase opacity-90">
            {isArabic ? "مجموعة هوفن الفندقية" : "HOVEN Collection"}
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl opacity-95 font-light">
            {subtitle}
          </p>

          {/* Description */}
          <div className="space-y-4 pt-6 border-t border-white/30">
            <p className="text-base md:text-lg leading-relaxed max-w-3xl">
              {description}
            </p>

            {/* Highlights */}
            <div className="pt-6 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest opacity-75">
                {isArabic ? "المميزات الرئيسية" : "Key Features"}
              </p>
              <div className="space-y-2">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition duration-300 text-sm uppercase tracking-widest font-semibold"
            >
              {isArabic ? "تواصل معنا" : "Contact Us"}
              <span>{isArabic ? "←" : "→"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

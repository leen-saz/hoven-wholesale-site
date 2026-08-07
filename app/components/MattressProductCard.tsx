'use client';

interface Layer {
  ar: string;
  en: string;
}

interface MattressProductCardProps {
  id: string;
  video: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  heightCm: string;
  feel: string;
  layers: Layer[];
  highlightsAr: string[];
  highlightsEn: string[];
  language: 'ar' | 'en';
}

export default function MattressProductCard({
  id,
  video,
  nameAr,
  nameEn,
  taglineAr,
  taglineEn,
  descriptionAr,
  descriptionEn,
  heightCm,
  feel,
  layers,
  highlightsAr,
  highlightsEn,
  language,
}: MattressProductCardProps) {
  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const videoUrl = `/video/${video}.mp4`;

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      dir={dir}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center" }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Text Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-12 py-8 md:py-16 text-white">
        <div className="space-y-3 md:space-y-6">
          {/* Product name */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-2">
              {isArabic ? nameAr : nameEn}
            </h2>
            <p className="text-lg lg:text-xl text-gray-100">
              {isArabic ? taglineAr : taglineEn}
            </p>
          </div>

          {/* Description */}
          <p className="text-base lg:text-lg leading-relaxed max-w-3xl">
            {isArabic ? descriptionAr : descriptionEn}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/30">
            <div>
              <p className="text-sm text-gray-200 mb-1">
                {isArabic ? 'الارتفاع' : 'Height'}
              </p>
              <p className="text-2xl font-semibold">{heightCm}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200 mb-1">
                {isArabic ? 'الإحساس' : 'Feel'}
              </p>
              <p className="text-xl font-semibold">{feel}</p>
            </div>
          </div>

          {/* Layers */}
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-4">
              {isArabic ? 'التركيبة' : 'Composition'}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {layers.map((layer, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-100">
                    {isArabic ? layer.ar : layer.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2 pt-6">
            {(isArabic ? highlightsAr : highlightsEn).map((highlight, idx) => (
              <div
                key={idx}
                className="px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition text-center"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

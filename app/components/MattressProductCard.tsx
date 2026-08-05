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
  const frameImage = `/frames/${video}/001.jpg`;

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${frameImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      dir={dir}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16 text-white">
        <div className="space-y-6">
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
          <div className="flex flex-wrap gap-2 pt-6">
            {(isArabic ? highlightsAr : highlightsEn).map((highlight, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full border border-white/40"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

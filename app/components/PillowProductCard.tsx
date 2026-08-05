'use client';

interface Layer {
  ar: string;
  en: string;
}

interface PillowProductCardProps {
  id: string;
  image: string;
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
  isSecond?: boolean;
}

export default function PillowProductCard({
  id,
  image,
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
  isSecond,
}: PillowProductCardProps) {
  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      dir={dir}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-16 text-white">
        <div className="space-y-6">
          {!isSecond && (
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                {isArabic ? nameAr : nameEn}
              </h2>
              <p className="text-lg text-gray-100">
                {isArabic ? taglineAr : taglineEn}
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-base leading-relaxed max-w-2xl">
            {isArabic ? descriptionAr : descriptionEn}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/30">
            <div>
              <p className="text-sm text-gray-200 mb-1">
                {isArabic ? 'الارتفاع' : 'Height'}
              </p>
              <p className="text-lg font-semibold">{heightCm}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200 mb-1">
                {isArabic ? 'الإحساس' : 'Feel'}
              </p>
              <p className="text-lg font-semibold">{feel}</p>
            </div>
          </div>

          {/* Layers */}
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">
              {isArabic ? 'التركيبة' : 'Composition'}
            </p>
            <div className="space-y-2">
              {layers.map((layer, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-100">
                    {isArabic ? layer.ar : layer.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 pt-4">
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
    </div>
  );
}

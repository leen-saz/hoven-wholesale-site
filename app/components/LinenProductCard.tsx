interface Layer {
  ar: string;
  en: string;
}

interface LinenProductCardProps {
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
  alignRight?: boolean;
}

export default function LinenProductCard({
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
  alignRight = false,
}: LinenProductCardProps) {
  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <section
      id={id}
      className="py-12 lg:py-24"
      dir={dir}
    >
      {/* Image with Description Overlay */}
      <div
        className="relative min-h-96 lg:min-h-screen flex items-center justify-center overflow-hidden rounded-lg mb-12 lg:mb-20"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Description overlay */}
        <div className="absolute z-10 inset-0 flex items-center justify-center px-8 md:px-16 text-white">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold leading-snug text-center">
              {isArabic ? nameAr : nameEn}
            </h2>
            <p className="text-lg text-gray-100 leading-relaxed text-center">
              {isArabic ? taglineAr : taglineEn}
            </p>
            <p className="text-lg md:text-xl leading-loose text-center">
              {isArabic ? descriptionAr : descriptionEn}
            </p>
          </div>
        </div>
      </div>

      {/* Composition Details */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specs */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {isArabic ? 'الارتفاع' : 'Height'}
                </p>
                <p className="text-2xl font-semibold text-gray-900 whitespace-pre-line">{heightCm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {isArabic ? 'الإحساس' : 'Feel'}
                </p>
                <p className="text-xl font-semibold text-gray-900">{feel}</p>
              </div>
            </div>
          </div>

          {/* Layers */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              {isArabic ? 'التركيبة' : 'Composition'}
            </p>
            <div className="space-y-3">
              {layers.map((layer, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {isArabic ? layer.ar : layer.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2 pt-8 mt-8 border-t border-gray-200">
          {(isArabic ? highlightsAr : highlightsEn).map((highlight, idx) => (
            <div
              key={idx}
              className="px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-gray-800 text-sm font-medium hover:bg-white/30 transition text-center"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface Layer {
  ar: string;
  en: string;
}

interface PadProductCardProps {
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
}

export default function PadProductCard({
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
}: PadProductCardProps) {
  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <section
      id={id}
      className="py-12 lg:py-24"
      dir={dir}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto px-4">
        {/* Image */}
        <div className={isArabic ? 'lg:order-2' : 'lg:order-1'}>
          <img
            src={image}
            alt={isArabic ? nameAr : nameEn}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product info */}
        <div className={isArabic ? 'lg:order-1' : 'lg:order-2'} dir={dir}>
          <div className="space-y-6">
            {/* Product name */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {isArabic ? nameAr : nameEn}
              </h2>
              <p className="text-lg text-gray-600">
                {isArabic ? taglineAr : taglineEn}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {isArabic ? descriptionAr : descriptionEn}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {isArabic ? 'الارتفاع' : 'Height'}
                </p>
                <p className="text-2xl font-semibold text-gray-900" style={{ whiteSpace: 'pre-line' }}>{heightCm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {isArabic ? 'الإحساس' : 'Feel'}
                </p>
                <p className="text-xl font-semibold text-gray-900">{feel}</p>
              </div>
            </div>

            {/* Layers */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {isArabic ? 'التركيبة' : 'Composition'}
              </p>
              <div className="space-y-2">
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

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 pt-4">
              {(isArabic ? highlightsAr : highlightsEn).map((highlight, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

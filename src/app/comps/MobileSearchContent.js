import { useI18n } from "../lib/i18n";
import { IMG_URL } from "../local";

export default function MobileSearchContent({ isSearching, sugges, onProductClick }) {
  const { t } = useI18n();

  if (isSearching) {
    return (
      <div className="h-64 flex flex-col justify-center items-center text-gray-400 p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-moon-200 mb-4"></div>
        <p className="text-lg font-medium text-gray-600">{t('searching')}</p>
      </div>
    );
  }

  if (sugges?.length === 0) {
    return (
      <div className="h-64 flex flex-col justify-center items-center text-gray-400 p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-600">{t('noResults')}</p>
        <p className="text-sm mt-2">{t('tryDifferentKeywords')}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {sugges.map((sug, index) => (
        <div
          key={index}
          onClick={() => onProductClick(sug.id)}
          dir="rtl"
          className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 active:bg-gray-50 transition-colors"
        >
          <div className="relative flex-shrink-0">
            <img
              src={
                sug.images?.[0]?.url
                  ? `${IMG_URL || ''}${sug.images[0].url}`
                  : "/no-image.jpg"
              }
              alt={sug.name_ar}
              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-base font-semibold text-gray-800 truncate">
              {sug.name_ar}
            </span>
            <span className="text-sm text-gray-500 mt-1 inline-flex items-center gap-1">
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                {sug.code}
              </span>
            </span>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

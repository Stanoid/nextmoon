import { useI18n } from "../lib/i18n";
import { IMG_URL } from "../local";

export default function SearchContent({ isSearching, sugges, onProductClick }) {
  const { t } = useI18n();

  if (isSearching) {
    return (
      <div className="h-48 flex flex-col justify-center items-center text-gray-400 p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moon-200 mb-3"></div>
        <p className="text-base font-medium text-gray-600">{t('searching')}</p>
      </div>
    );
  }

  if (sugges?.length === 0) {
    return (
      <div className="h-48 flex flex-col justify-center items-center text-gray-400 p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 mb-3 opacity-50"
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
        <p className="text-base font-medium text-gray-600">{t('noResults')}</p>
        <p className="text-sm mt-1">{t('tryDifferentKeywords')}</p>
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-4 space-y-2">
      {sugges.map((sug, index) => (
        <div
          key={index}
          onClick={() => onProductClick(sug.id)}
          dir="rtl"
          className="flex items-center gap-3 lg:gap-4 hover:bg-gray-50 bg-white p-3 lg:p-4 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-moon-100 hover:shadow-sm"
        >
          <div className="relative flex-shrink-0">
            <img
              src={
                sug.images?.[0]?.url
                  ? `${IMG_URL || ''}${sug.images[0].url}`
                  : "/no-image.jpg"
              }
              alt={sug.name_ar}
              className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg border-2 border-gray-100 group-hover:border-moon-200 transition-colors"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm lg:text-base font-semibold text-gray-800 truncate group-hover:text-moon-300 transition-colors">
              {sug.name_ar}
            </span>
            <span className="text-xs lg:text-sm text-gray-500 mt-1 inline-flex items-center gap-1">
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                {sug.code}
              </span>
            </span>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-moon-200 transition-colors flex-shrink-0"
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

import { useI18n } from "../lib/i18n";

export default function MobileSearchInput({ inputRef, value, onChange }) {
  const { t } = useI18n();

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={t('searchPlaceholder')}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-moon-200 focus:border-transparent"
    />
  );
}

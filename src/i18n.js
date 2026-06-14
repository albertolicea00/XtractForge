// Lightweight i18n. One file per language under ./locales. Add a language by
// creating ./locales/<code>.js and registering it here. Missing keys fall back
// to English, then to the key itself. Use makeT(lang) to get a t(key) function.
import en from './locales/en';
import es from './locales/es';

const STRINGS = { en, es };

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export function makeT(lang) {
  const dict = STRINGS[lang] || STRINGS.en;
  return (key) => dict[key] ?? STRINGS.en[key] ?? key;
}

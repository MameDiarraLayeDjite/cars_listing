import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // Load translation files
    .use(HttpBackend)
    // Detect user language
    .use(LanguageDetector)
    // Pass i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        fallbackLng: 'fr',
        debug: false,

        // Language detection options
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },

        interpolation: {
            escapeValue: false, // React already escapes
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        ns: ['translation'],
        defaultNS: 'translation',

        react: {
            useSuspense: true,
        },
    });

export default i18n;

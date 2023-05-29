import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const prefixUrl = isProduction ? '/' : 'http://localhost:3000/';

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr'],
    debug: false,
    // Should only contain common & features namespaces
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    appendNamespaceToMissingKey: true,
    backend: {
      loadPath: `${prefixUrl}locales/{{lng}}/{{ns}}.json`
    }
  });

export default i18n;

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const prefixUrl = isProduction ? '/' : 'http://localhost:3000/';

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr','en'],
    debug: false,
    ns: ['common', 'account', 'documents', 'content', 'settings'],
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

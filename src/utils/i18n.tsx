import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LANGUAGE from 'utils/translate.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: LANGUAGE['TRANSLATE']['en'],
    },
    ko: {
      translation: LANGUAGE['TRANSLATE']['ko'],
    },
    es: {
      translation: LANGUAGE['TRANSLATE']['es'],
    },
    ja: {
      translation: LANGUAGE['TRANSLATE']['ja'],
    },
    zh: {
      translation: LANGUAGE['TRANSLATE']['zh'],
    },
    vn: {
      translation: LANGUAGE['TRANSLATE']['vn'],
    },
  },
  lng: 'ko',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

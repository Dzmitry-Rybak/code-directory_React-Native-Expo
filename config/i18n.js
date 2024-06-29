import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/locales/en.json';
import pl from '../assets/locales/pl.json';
import ru from '../assets/locales/ru.json';

const resources = {
  english: { translation: en },
  polish: { translation: pl },
  russian: { translation: ru }
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'english', // начальный язык
    fallbackLng: 'english', // язык по умолчанию, если перевод отсутствует
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

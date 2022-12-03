import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from "react-i18next";
import * as path from "path";

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    react: {
        useSuspense: false
    },
    fallbackLng: 'ua',
    debug: false,
    backend: {
      loadPath: path.resolve(__dirname,'../locales/{{lng}}/{{ns}}.json')
    },
    detection: {
        order: ['querystring', 'cookie'],
        cache: ['cookie']
    },
    interpolation: {
        escapeValue: false
    }
})

export default i18n;
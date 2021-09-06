import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import all namespaces (for the default language, only)
import pageFr from '../public/locales/fr/translation.json';

export const defaultNS = 'pageFr'
export const resources = {
    fr: {
      pageFr
    },
  } as const;

i18n.use(initReactI18next).init({
  lng: 'fr',
  ns: 'pageFr',
  defaultNS,
  interpolation:{
      escapeValue : false
  }
});
  
export default i18n;
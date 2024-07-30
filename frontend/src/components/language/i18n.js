// language/i18n.js
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslation from "./locales/enTranslation.json"
import frTranslation from "./locales/frTranslation.json"
import ruTranslation from "./locales/ruTranslation.json"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    ru: { translation: ruTranslation },
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

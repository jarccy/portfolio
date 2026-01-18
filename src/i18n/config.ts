import i18next from "i18next";
import enCommon from "../locales/en/common.json";
import esCommon from "../locales/es/common.json";

export const languages = {
    en: "English",
    es: "Español",
};

export const defaultLanguage = "en";

i18next.init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: Object.keys(languages),
    ns: ["common"],
    defaultNS: "common",
    resources: {
        en: {
            common: enCommon,
        },
        es: {
            common: esCommon,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export const t = (key: string, options?: any): string => i18next.t(key, options) as string;
export { i18next };
export default i18next;
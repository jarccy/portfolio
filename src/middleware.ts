import { defineMiddleware } from "astro:middleware";
import i18next from "./i18n/config";

export const onRequest = defineMiddleware((context, next) => {
    const locale = context.currentLocale;
    if (locale) {
        i18next.changeLanguage(locale);
    }
    return next();
});

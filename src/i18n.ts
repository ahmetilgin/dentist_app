import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import al from './locales/al.json';
import en from './locales/en.json';
import tr from './locales/tr.json';

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			al: {
				translation: al,
			},
			en: {
				translation: en,
			},
			tr: {
				translation: tr,
			},
		},
		debug: true,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			// order and from where user language should be detected
			order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],

			// keys or params to lookup language from
			lookupLocalStorage: 'i18nextLng',
			lookupCookie: 'i18next',

			// cache user language on
			caches: ['localStorage', 'cookie'],
		},
	});

export default i18n;

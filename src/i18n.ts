import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import al from './locales/al.json';
import en from './locales/en.json';
import it from './locales/it.json';
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
			it: {
				translation: it,
			},
		},
		debug: true,
		fallbackLng: 'al',
		interpolation: {
			escapeValue: false,
		},
		lng: localStorage.getItem('i18nextLng') || 'al',
		detection: {
			order: ['localStorage', 'cookie', 'querystring', 'navigator', 'htmlTag'],
			lookupLocalStorage: 'i18nextLng',
			lookupCookie: 'i18next',
			caches: ['localStorage', 'cookie'],
			excludeCacheFor: ['cimode'],
		},
	});

export default i18n;

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import sq from './locales/sq.json';
import tr from './locales/tr.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			sq: {
				translation: sq
			},
			en: {
				translation: en
			},
			tr: {
				translation: tr
			}
		},
		debug: true,
		fallbackLng: 'en',
		lng:"sq",
		interpolation: {
			escapeValue: false
		}		
	});

export default i18n;
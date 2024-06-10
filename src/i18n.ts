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
			en: {
				translation: en
			},
			tr: {
				translation: tr
			},
			sq: {
				translation: sq
			}
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false
		},
		missingKeyHandler:(
			lngs: readonly string[],
			ns: string,
			key: string,
			fallbackValue: string,
			updateMissing: boolean,
			options: any,
		) =>{
				console.log("Missing ",ns,key,fallbackValue,options,updateMissing,lngs)
		}
	});

export default i18n;
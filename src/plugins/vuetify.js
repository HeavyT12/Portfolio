import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/styles/typography.css';

import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const fireRed = '#EC1C24';
const fireOrange = '#FF7F27';
const fireYellow = '#FFF200';
const windGray = '#C3C3C3';
const rainBlue = '#00A2E8';
const leafGreen = '#0ED145';
const rockBrown = '#B67B43';

export default createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: { mdi }
	},
	theme: {
		defaultTheme: 'light',
		themes: {
			light: {
				colors: {
					primary: rainBlue,
					secondary: rockBrown,
					accent: windGray,
					error: fireRed,
					info: rainBlue,
					success: leafGreen,
					warning: fireOrange,
					fireRed,
					fireOrange,
					fireYellow,
					windGray,
					rainBlue,
					leafGreen,
					rockBrown
				}
			}
		}
	}
});

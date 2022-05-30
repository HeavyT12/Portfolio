import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const fireRed = '#EC1C24';
const fireOrange = '#FF7F27';
const fireYellow = '#FFF200';
const windGray = '#C3C3C3';
const rainBlue = '#00A2E8';
const leafGreen = '#0ED145';
const rockBrown = '#B67B43';


export default new Vuetify({
	icons: {
		iconfont: 'md'
	},
	theme: {
		themes: {
			light: {
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
});

import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		colors: {
			primary: '#1D63ED',
			secondary: '#00084D',
			text: '#E5F2FC',
			background: '#17191E',
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;

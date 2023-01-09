/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./node_modules/@gits-id/**/src/**/*.{vue,js,ts,jsx,tsx,css}'],
	theme: {
		extend: {}
	},
	plugins: [],
	presets: [require('@gits-id/tailwind-config/preset')]
}

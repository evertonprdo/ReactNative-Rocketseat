import { colors } from './src/theme/colors';
import { fontFamily } from './src/theme/fontFamily';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: colors,
            fontFamily: fontFamily,
        },
    },
    plugins: [],
}
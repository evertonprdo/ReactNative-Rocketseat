import { colors } from "./src/theme/colors";
import { fontFamily, fontSize } from "./src/theme/fontFamily";
import { sizes } from "./src/theme/size";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors,
            fontFamily,
            spacing: sizes,
            fontSize
        },
    },
    plugins: [],
}
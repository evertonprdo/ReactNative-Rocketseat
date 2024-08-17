const Roboto = {
  regular: "Roboto_400Regular",
  bold: "Roboto_700Bold",
  lg: 20,
  md: 16,
  sm: 14,
  xs: 12,
}

const Baloo2 = {
  bold: "Baloo2_700Bold",
  xl: 36,
  lg: 24,
  md: 20,
  sm: 16,
  xs: 14,
}

const TagFontStyle = {
  fontFamily: Roboto.bold,
  fontSize: 10,
}

const ButtonFontSize = 14

const ButtonFontStyle = {
  fontFamily: Roboto.bold,
  fontSize: ButtonFontSize,
  lineHeight: ButtonFontSize * 1.6, // 160%
  textTransform: "uppercase"
}

type Baloo2SizesType = keyof Omit<typeof Fonts.Baloo2, "bold">
type RobotoSizesType = keyof Omit<typeof Fonts.Roboto, "bold" | "regular">

export type { Baloo2SizesType, RobotoSizesType }
export const Fonts = { Roboto, Baloo2, TagFontStyle, ButtonFontStyle }
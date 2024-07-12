export const fontFamily = {
    regular: "Inter_400Regular",
    bold: "Inter_700Bold",
}

export function getLineHeight(fontSize: number, percent?: number): number {
    const lineHeightPercent = percent ??= 1.4
    return fontSize * lineHeightPercent
}
 
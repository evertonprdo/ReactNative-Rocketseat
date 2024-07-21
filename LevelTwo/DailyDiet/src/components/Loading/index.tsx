import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

export function Loading() {
    const theme = useTheme();
    return (
        <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} color={theme.COLORS.GRAY_200}/>
    )
}
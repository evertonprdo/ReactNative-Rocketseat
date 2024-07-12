import { StyleSheet } from "react-native";
import { colors as col, colors } from "../../../styles/colors";
import { fontFamily, getLineHeight } from "../../../styles/fontFamily";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        width: '100%',
        marginTop: 32,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
        fontFamily: fontFamily.bold
    },
    count: {
        backgroundColor: colors.gray[400],

        fontSize: 12,
        fontFamily: fontFamily.bold,
        color: col.gray[200],

        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
    },

    listContainer: {
        gap: 8
    },
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 20,
        paddingVertical: 48,
        gap: 16
    },
    emptyListText: {
        color: colors.gray[300],
        lineHeight: getLineHeight(14, 1.4),
        fontSize: 14
    },
})

export default styles
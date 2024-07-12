import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fontFamily, getLineHeight} from "../../styles/fontFamily";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: "100%",

        paddingVertical: 12,
        paddingLeft: 12,
        paddingRight: 8,
        gap: 8,

        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray[400],

        backgroundColor: colors.gray[500]
    },
    containerDone: {
        backgroundColor: colors.gray[500]
    },

    text: {
        flex: 1,

        color: colors.gray[100],
        fontFamily: fontFamily.regular,
        fontSize: 14,
        textAlign: 'justify',
    },
    textDone: {
        color: colors.gray[300],
        lineHeight: getLineHeight(14),
        textDecorationLine: 'line-through',
    },
})

export default styles
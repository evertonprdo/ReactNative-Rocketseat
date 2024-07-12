import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 8,
    },

    addButtonPressIn: {
        backgroundColor: colors.product.blue
    },
    addButton: {
        paddingHorizontal: 21,
        paddingVertical: 18,
        backgroundColor: colors.product.blueDark,
    },

    deleteButton: {
        height: 32,
        width: 32,
    },
    deleteButtonPressIn: {
        backgroundColor: colors.gray[400]
    },
})

export default styles
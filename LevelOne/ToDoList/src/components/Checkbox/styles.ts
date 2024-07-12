import { StyleSheet } from "react-native";
import { colors as col } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        height: 20,
        width: 20,

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        
    },
    checked: {
        borderColor: col.product.blue,
        borderWidth: 2,
    },
    checkedPressIn: {
        backgroundColor: col.product.purple
    },
    unchecked: {
        backgroundColor: col.product.purpleDark
    },
    uncheckedPressIn: {
        backgroundColor: col.product.blueDark
    }
})

export default styles
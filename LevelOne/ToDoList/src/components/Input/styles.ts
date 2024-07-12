import { StyleSheet } from "react-native";
import { colors as col } from "../../styles/colors";
import { fontFamily } from "../../styles/fontFamily";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: col.gray[500],

        borderWidth: 1,
        borderColor: col.gray[700],
        borderRadius: 8,

        padding: 16
    },
    containerFocus: {
        borderColor: col.product.purpleDark
    },
    field: {
        color: col.gray[100],
        fontFamily: fontFamily.regular,
        fontSize: 18,
    },
})

export default styles
import { StyleSheet } from "react-native";
import { colors as col } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

        backgroundColor: col.gray[600]
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        height: 200,
        paddingTop: 10,
        
        backgroundColor: col.gray[700],

    },
    image: {
        width: 132,
        height: 70,
    },

    addTaskContainer: {
        flexDirection: 'row',
        gap: 4,

        width: '100%',
        marginTop: -33,
        paddingHorizontal: 20
    }
})

export default styles
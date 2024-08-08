import { StyleSheet } from 'react-native';
import { BaseToast, ToastConfig } from 'react-native-toast-message';

import { colors } from '@theme/colors';
import { fontFamily } from '@theme/fontFamily';

const CustomToasts: ToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={[styles.base, styles.leadingBorder, styles.sucess]}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
    error: (props) => (
        <BaseToast
            {...props}
            style={[styles.base, styles.leadingBorder, styles.error]}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
    info: (props) => (
        <BaseToast
            {...props}
            style={[styles.base, styles.leadingBorder, styles.info]}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    )
};

const HEIGHT = 60;
const WIDTH = 340;
const BORDER_RADIUS = 6;

export const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        height: HEIGHT,
        width: WIDTH,
        borderRadius: BORDER_RADIUS,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: BORDER_RADIUS,
        elevation: 2,
        backgroundColor: colors.gray[700]
    },
    leadingBorder: {
        borderLeftWidth: 5,
    },
    info: {
        borderLeftColor: colors.gray[200]
    },
    sucess: {
        borderLeftColor: colors.green[500]
    },
    error: {
        borderLeftColor: colors.red[500]
    },
    contentContainer: {
        paddingHorizontal: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text1: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
        color: colors.gray[100],
        width: '100%'
    },
    text2: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: colors.gray[200],
        width: '100%'
    }
});

export { CustomToasts }
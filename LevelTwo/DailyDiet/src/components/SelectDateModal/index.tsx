import { Modal, type ModalProps } from "react-native"
import {
    Calendar as CalendarRN,
    type CalendarProps,

} from "react-native-calendars"

import { Container, DimissZone, ModalBg } from "./styles"
import { useTheme } from "styled-components"

export function Calendar({...rest}: CalendarProps) {
    const theme = useTheme();
    return (
        <CalendarRN
            hideExtraDays
            style={{
                backgroundColor: "transparent",
                borderRadius: 12,
                overflow: "hidden",
            }}
            theme= {{
                textMonthFontSize: 18,
                selectedDayBackgroundColor: theme.COLORS.GRAY_200,
                selectedDayTextColor: theme.COLORS.GRAY_700,
                textDayFontFamily: theme.FONT_FAMILY.REGULAR,
                monthTextColor: theme.COLORS.GRAY_200,
                arrowColor: theme.COLORS.GRAY_200,
                agendaDayNumColor: theme.COLORS.GRAY_200,
                todayTextColor: theme.COLORS.GRAY_100,
                textDisabledColor: theme.COLORS.GRAY_600,
                calendarBackground: "transparent",
                textDayStyle: { color: theme.COLORS.GRAY_200 },
            }}
            {...rest}
        />
    )
}

type SelectDateProps = ModalProps & {
    onClose: () => void
}
export function SelectDateModal({onClose, children, ...rest}: SelectDateProps) {
    return (
        <Modal 
            statusBarTranslucent
            transparent
            animationType="fade" 
            {...rest}
        >   
            <ModalBg>
                <DimissZone onPress={ onClose }/>
                <Container>
                    { children }
                </Container>
            </ModalBg>
        </Modal>
    )
}
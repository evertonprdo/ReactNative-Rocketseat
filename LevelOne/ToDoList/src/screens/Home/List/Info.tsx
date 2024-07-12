import { Text, View } from "react-native";

import st from "./styles";
import { colors } from "../../../styles/colors";

type InfoProps = {
    count_total: number
    count_done: number
}
export function Info({ count_total, count_done }: InfoProps) {
    return(
        <View style= {st.infoContainer}>
            <Label 
                title="Criadas"
                qtd={ count_total }
                textColor= {colors.product.blue}
            />
            <Label
                title="Concluídas"
                qtd={ count_done }
                textColor= {colors.product.purple}
            />
        </View>
    )
}

type LabelProps = {
    title: string
    qtd: number
    textColor: string
}
function Label({ title, qtd, textColor }: LabelProps) {
    return (
        <View style= {st.labelContainer}>
            <Text 
                style= {[
                    st.text,
                    {color: textColor }
                ]}
            >
                { title }
            </Text>

            <Text
                style= {st.count}
            >
                { qtd }
            </Text>
        </View>
    )
}
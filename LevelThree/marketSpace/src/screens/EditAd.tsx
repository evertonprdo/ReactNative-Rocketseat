import { TextApp } from "@components/base/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@routes/app.stack.routes";
import { View } from "react-native";

type Props = NativeStackScreenProps<AppStackParamList, "editAd">

export function EditAd() {
    return (
        <View className="flex-1 justify-center items-center">
            <TextApp>Editar App!</TextApp>
        </View>
    )
}
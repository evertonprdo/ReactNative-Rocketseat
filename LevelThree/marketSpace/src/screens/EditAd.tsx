import { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AppStackParamList } from "@routes/app.stack.routes";
import { CreateEditAd } from "@templates/CreateEditAd";

type Props = NativeStackScreenProps<AppStackParamList, "editAd">

export function EditAd({ navigation, route }: Props) {
    return (
        <CreateEditAd
            type="edit"
            onPressGoBack={() => navigation.goBack()}
            onPressCancel={() => navigation.goBack()}
            
        />
    )
}
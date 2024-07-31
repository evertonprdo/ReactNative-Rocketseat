import { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AppStackParamList } from "@routes/app.stack.routes";

import { CreateEditAd } from "@templates/CreateEditAd";

type Props = NativeStackScreenProps<AppStackParamList, "createAd">

export function CreateAd({ navigation, route }: Props) {
    return (
        <CreateEditAd
            type="create"
            onPressCancel={() => navigation.goBack()}
            onPressGoBack={() => navigation.goBack()}
        />
    )
}
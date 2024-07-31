import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Power, Trash } from "phosphor-react-native";

import { Header } from "@components/Header";

import { colors } from "@theme/colors";
import { Button } from "@components/base/Button";

import { AdDetailsTemplate } from "@templates/AdDetailsTemplate";

import type { AppStackParamList } from "@routes/app.stack.routes";

type Props = NativeStackScreenProps<AppStackParamList, "userAdDetails">

export function UserAdDetails({ navigation }: Props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Header className="pb-3">
                <Header.GoBack
                    onPress={() => navigation.goBack()}
                />
                <Header.Edit
                    onPress={() => navigation.navigate("editAd")}
                />
            </Header>

            <AdDetailsTemplate>
                <View className="gap-2 mt-6">
                    <Button variant="black">
                        <Power size={16} color={colors.gray[600]}/>
                        <Button.Title>Desativar anúncio</Button.Title>
                    </Button>

                    <Button variant="gray">
                        <Trash size={16} color={colors.gray[300]}/>
                        <Button.Title>Excluir anúncio</Button.Title>
                    </Button>
                </View>
            </AdDetailsTemplate>

        </SafeAreaView>
    )
}
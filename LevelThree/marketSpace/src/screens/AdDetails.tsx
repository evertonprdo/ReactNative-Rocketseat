import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WhatsappLogo } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Button } from "@components/base/Button";
import { Header } from "@components/Header";

import { AdDetailsTemplate } from "@templates/AdDetailsTemplate";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@routes/app.stack.routes";

type Props = NativeStackScreenProps<AppStackParamList, "adDetails">
export function AdDetails({navigation}: Props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header className="pb-3">
                <Header.GoBack onPress={() => navigation.goBack()}/>
            </Header>

            <AdDetailsTemplate

            />

            <View className="bg-gray-700 p-6 flex-row items-center justify-between">
                <View className="flex-row items-baseline">
                    <TextApp className="font-bold text-blue-light text-sm">R$ </TextApp>
                    <TextApp className="font-bold text-blue-light text-2xl">120,00</TextApp>
                </View>

                <Button variant="blue">
                    <WhatsappLogo size={16} weight="fill" color={colors.gray[700]} />
                    <Button.Title>Entrar em contato</Button.Title>
                </Button>
            </View>
        </SafeAreaView>
    )
}
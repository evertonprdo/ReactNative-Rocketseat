import { Pressable, View } from "react-native";
import { Eye, EyeClosed } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native";

import LogoHomeImg from "@assets/SvgView/LogoHome"

import { Input } from "@components/Input";
import { TextApp } from "@components/atoms/Text";
import { Button } from "@components/Button";
import { colors } from "@theme/colors";
import { useState } from "react";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SingIn() {
    const [ pass, setPass ] = useState(false);
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    return (
        <View style={{flex: 1, backgroundColor: colors.gray[700]}}>
            <View
                className="flex-1 justify-center p-12 w-full items-center bg-gray-600 rounded-b-3xl"
            >
                <View className="mt-4 mb-[77px]">
                    <LogoHomeImg/>
                </View>

                <View className="w-full gap-4 mb-8">
                    <TextApp className="text-sm text-center">
                        Acesse sua conta
                    </TextApp>

                    <Input>
                        <Input.Field
                            placeholder="E-mail"
                        />
                    </Input>

                    <Input>
                        <Input.Field
                            placeholder="Senha"
                            secureTextEntry={pass}
                        />
                        <Pressable
                            onPress={() => setPass(!pass)}
                            hitSlop={12}
                        >
                            { pass
                                ? <EyeClosed size={20} color={colors.gray[300]}/>
                                : <Eye size={20} color={colors.gray[300]}/>
                            }
                        </Pressable>
                    </Input>
                </View>

                <Button className="w-full" variant="blue">
                    <Button.Title>Entrar</Button.Title>
                </Button>
            </View>

            <View className="w-full justify-center p-14 gap-4">
                <TextApp className="text-center">
                    Ainda não tem acesso?
                </TextApp>

                <Button onPress={() => navigate("singUp")}>
                    <Button.Title>Criar uma conta</Button.Title>
                </Button>
            </View>
        </View>
    )
}
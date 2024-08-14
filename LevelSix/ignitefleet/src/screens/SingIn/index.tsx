import { useState } from "react";
import { Container, Slogan, Title } from "./styles";
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Realm, useApp } from "@realm/react"

import BackgroundImg from "../../assets/background.png"
import { Button } from "../../components/Button";

import { WEB_CLIENT_ID } from "@env"
import { Alert } from "react-native";

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
})

export function SingIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const app = useApp();

  async function handleGoogleSingIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (!idToken) throw new Error

      const credentials = Realm.Credentials.jwt(idToken)

      await app.logIn(credentials)

    } catch (error) {
      setIsAuthenticating(false)
      console.log(error)
      Alert.alert("Entrar", "Não foi possível conectar-se na sua conta google.")
    }
  }

  return (
    <Container
      source={BackgroundImg}
      defaultSource={BackgroundImg}
    >
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSingIn}
      />
    </Container>
  );
}
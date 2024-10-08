import { useEffect, useRef, useState } from "react";
import { TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { LocationAccuracy, useForegroundPermissions, watchPositionAsync, LocationSubscription, LocationObjectCoords, requestBackgroundPermissionsAsync } from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useUser } from '@realm/react'
import { Car } from "phosphor-react-native";

import { useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";

import { Container, Content, Message, MessageContent } from "./styles";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { LocationInfo } from "../../components/LocationInfo";
import { Loading } from "../../components/Loading";
import { Map } from "../../components/Map";

import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { getAddressLocation } from "../../utils/getAddressLocation";
import { startLocationTask } from "../../tasks/backgroundLocationTask";
import { openSettings } from "../../utils/openSettings";

const KeyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
	const [description, setDescription] = useState("");
	const [licensePlate, setLicensePlate] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [isLoadingLocation, setIsLoadingLocation] = useState(true);
	const [currentAddress, setCurrentAddress] = useState<string | null>(null)
	const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null)

	const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();

	const realm = useRealm();
	const user = useUser();
	const { goBack } = useNavigation();

	const descriptionRef = useRef<TextInput>(null)
	const licensePlateRef = useRef<TextInput>(null)

	async function handleDepartureRegister() {
		try {
			if (!licensePlateValidate(licensePlate)) {
				licensePlateRef.current?.focus();
				return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.')
			}

			if (description.trim().length === 0) {
				descriptionRef.current?.focus();
				return Alert.alert('Finalidade', 'Por favor informe a finalidade da utilização do veículo.')
			}

			if (!currentCoords?.latitude && !currentCoords?.longitude) {
				return Alert.alert('Localização', 'Não foi possível obter a localização atual. Tente novamente!')
			}

			setIsRegistering(true);

			const backgroundPermissions = await requestBackgroundPermissionsAsync();

			if (!backgroundPermissions.granted) {
				setIsRegistering(false);
				return Alert.alert(
					'Localização',
					'É necessário permitir que o App tenha acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."',
					[
						{ text: "Abrir configurações", onPress: openSettings }
					]
				)
			}

			await startLocationTask();

			realm.write(() => {
				realm.create('Historic', Historic.generate({
					user_id: user!.id,
					license_plate: licensePlate.toUpperCase(),
					description,
					coords: [{
						latitude: currentCoords.latitude,
						longitude: currentCoords.longitude,
						timestamp: new Date().getTime()
					}]
				}))
			});

			Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');
			goBack();
		} catch (error) {
			console.log(error)
			Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
			setIsRegistering(false)
		}
	}

	useEffect(() => {
		requestLocationForegroundPermission();
	}, [])

	useEffect(() => {
		if (!locationForegroundPermission?.granted) return

		let subscription: LocationSubscription

		watchPositionAsync(
			{
				accuracy: LocationAccuracy.High,
				timeInterval: 1000
			},
			(location) => {
				setCurrentCoords(location.coords)

				getAddressLocation(location.coords)
					.then((address) => {
						if (address) setCurrentAddress(address)
					})
					.finally(() => setIsLoadingLocation(false))
			})
			.then((response) => subscription = response);

		return () => { if (subscription) subscription.remove(); }
	}, [locationForegroundPermission])

	if (!locationForegroundPermission?.granted) {
		return (
			<Container>
				<Header title="Saída" />

				<MessageContent>
					<Message>
						Você precisa permitir que o aplicativo tenha acesso a localização para utilizar essa funcionalidade.
						Por favor, acesse as configurações do seu dispositivo para conceder essa permissão ao aplicativo.
					</Message>
				</MessageContent>

				<Button title="Abrir configurações" onPress={openSettings} />
			</Container>
		)
	}

	if (isLoadingLocation) return <Loading />
	return (
		<Container>
			<Header title="Saída" />

			<KeyboardAvoidingView style={{ flex: 1 }} behavior={KeyboardAvoidingViewBehavior}>
				<ScrollView>
					{currentCoords &&
						<Map coordinates={[currentCoords]} />
					}
					<Content>
						{currentAddress &&
							<LocationInfo
								label='Localização atual'
								description={currentAddress}
								icon={Car}
							/>
						}

						<LicensePlateInput
							ref={licensePlateRef}
							label="Placa do veículo"
							placeholder="BRA1234"
							onSubmitEditing={() => descriptionRef.current?.focus()}
							returnKeyType="next"
							onChangeText={setLicensePlate}
						/>

						<TextAreaInput
							ref={descriptionRef}
							label="Finalidade"
							placeholder="Vou utilizar o veículo para..."
							onSubmitEditing={handleDepartureRegister}
							returnKeyType="send"
							blurOnSubmit
							onChangeText={setDescription}
						/>

						<Button
							title="Registrar Saída"
							onPress={handleDepartureRegister}
							isLoading={isRegistering}
						/>
					</Content>
				</ScrollView>
			</KeyboardAvoidingView>
		</Container>
	)
}
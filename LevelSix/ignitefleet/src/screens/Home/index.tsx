import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Realm } from "realm";
import { CloudArrowUp } from "phosphor-react-native";
import { useUser } from "@realm/react";
import dayjs from "dayjs";

import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from "../../libs/asyncStorage/syncStorage";

import { Container, Content, Label, Title } from "./styles";
import { CarStatus } from "../../components/CarStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import Toast from "react-native-toast-message";
import { TopMessage } from "../../components/TopMessage";

export function Home() {
	const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
	const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])
	const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

	const { navigate } = useNavigation();

	const historic = useQuery(Historic);
	const realm = useRealm();
	const user = useUser();

	function handleRegisterMoviment() {
		if (vehicleInUse?._id) {
			return navigate('arrival', { id: vehicleInUse._id.toString() });
		} else {
			navigate("departure")
		}
	}

	function fetchVehicleInUse() {
		try {
			const vehicle = historic.filtered("status = 'departure'")[0];
			setVehicleInUse(vehicle);

		} catch (error) {
			Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
			console.log(error)
		}
	}

	async function fetchHistoric() {
		try {
			const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");

			const lastSync = await getLastAsyncTimestamp();

			const formattedHistoric = response.map(item => {
				return ({
					id: item._id!.toString(),
					licensePlate: item.license_plate,
					isSync: lastSync > item.updated_at!.getTime(),
					created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm')
				});
			});

			setVehicleHistoric(formattedHistoric);

		} catch (error) {
			console.log(error)
			Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
		}
	}

	function handleHistoricDetails(id: string) {
		navigate('arrival', { id })
	}

	async function progressNotification(transferred: number, transferable: number) {
		const percentage = (Number(transferred) / Number(transferable)) * 100;

		if (percentage === 100) {
			await saveLastSyncTimestamp();
			await fetchHistoric();
			setPercentageToSync(null)

			Toast.show({
				text1: 'Todos os dados estão sincronizados',
				type: "info"
			})
		}

		if (percentage < 100) {
			setPercentageToSync(`${percentage.toFixed(0)}% sincronizados.`)
		}
	}

	useEffect(() => {
		fetchVehicleInUse();
	}, [])

	useEffect(() => {
		realm.addListener('change', fetchVehicleInUse)

		return () => {
			if (realm && !realm.isClosed)
				realm.removeListener('change', fetchVehicleInUse);
		}
	}, [])

	useEffect(() => {
		fetchHistoric();
	}, [historic])

	useEffect(() => {
		const syncSession = realm.syncSession;

		if (!syncSession) return

		syncSession.addProgressNotification(
			Realm.ProgressDirection.Upload,
			Realm.ProgressMode.ReportIndefinitely,
			progressNotification
		)

		return () => syncSession.removeProgressNotification(progressNotification);
	}, [])

	useEffect(() => {
		realm.subscriptions.update((mutableSubs, realm) => {
			const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`);

			mutableSubs.add(historicByUserQuery, { name: 'hostoric_by_user' });
		})
	}, [realm]);

	return (
		<Container>
			{percentageToSync &&
				<TopMessage title={percentageToSync} icon={CloudArrowUp} />
			}

			<HomeHeader />

			<Content>
				<CarStatus
					licensePlate={vehicleInUse?.license_plate}
					onPress={handleRegisterMoviment}
				/>

				<Title>
					Histórico
				</Title>

				<FlatList
					data={vehicleHistoric}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<HistoricCard
							data={item}
							onPress={() => handleHistoricDetails(item.id)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 100 }}
					ListEmptyComponent={(
						<Label>Nenhum registro de utilização.</Label>
					)}
				/>
			</Content>
		</Container>
	)
}
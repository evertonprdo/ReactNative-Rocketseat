import { FlatList, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPin } from "phosphor-react-native";

import CoffeeBeans from "@assets/coffeeBeans.png"

import st from "./styles";
import { Colors } from "@styles/colors";
import { Baloo2, Regular } from "@components/Text";
import { CartIcon } from "@components/CartIcon";
import { Input } from "@components/Input";
import { HighlightCard } from "@components/HighlightCard";
import { Tag } from "@components/Tag";

export function Home() {
	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={st.intro}>
				<SafeAreaView style={st.navbarContainer}>
					<View style={st.location}>
						<MapPin
							weight="fill"
							size={20}
							color={Colors.app.purpleDark}
						/>

						<Regular
							size="sm"
							style={st.locationTitle}
						>
							Porto Alegre, RS
						</Regular>
					</View>

					<CartIcon />
				</SafeAreaView>

				<View style={st.titleContainer}>
					<Baloo2 size="md" style={st.title}>
						Encontre o café perfeito para{"\n"}qualquer hora do dia
					</Baloo2>

					<Input
						placeholder="Pesquisar"
					/>

				</View>
				<Image
					source={CoffeeBeans}
					width={83}
					height={83}
					style={st.coffeeBeans}
				/>
			</View>

			<FlatList
				data={[0, 1, 2, 3, 4]}
				renderItem={() => (
					<HighlightCard />
				)}
				style={st.carrosel}
				contentContainerStyle={st.contentCarrosel}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>

			<View style={st.sectionHeader}>
				<Baloo2
					size="sm"
					style={st.sectionTitle}
				>
					Nossos cafés
				</Baloo2>

				<View style={st.sectionFilter}>
					<Tag>Tradicionais</Tag>
					<Tag>Doces</Tag>
					<Tag>Especiais</Tag>
				</View>
			</View>
		</ScrollView>
	)
}
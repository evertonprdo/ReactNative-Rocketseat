import { Button } from "@components/Button";
import { Cart } from "@components/Cart";
import { CatalogCard } from "@components/CatalogCard";
import { HighlightCard } from "@components/HighlightCard";
import { InputNumber } from "@components/InputNumber";
import { PressableIcon } from "@components/PressableIcon";
import { ScrollView, View } from "react-native";

export default function Home() {
	return (
		<ScrollView style={{flex: 1}} contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 38, gap: 50 }}>
			<CatalogCard />

			<HighlightCard />

			<Button variant="purple">
				Label
			</Button>

			<Button variant="yellow">
				Label
			</Button>

			<View style={{ flexDirection: "row", gap: 30 }}>
				<PressableIcon />
				<PressableIcon variant="trash" />
				<InputNumber />
				<Cart itemsCount={3}/>
			</View>

		</ScrollView>
	)
}
import { Button } from "@components/Button";
import { CartIcon } from "@components/CartIcon";
import { CartCard } from "@components/CartCard";
import { CatalogCard } from "@components/CatalogCard";
import { HighlightCard } from "@components/HighlightCard";
import { Input } from "@components/Input";
import { InputNumber } from "@components/InputNumber";
import { PressableIcon } from "@components/PressableIcon";
import { Select } from "@components/Select";
import { Tag } from "@components/Tag";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function ComponsView() {
	const [value, setValue] = useState(false)
	const [text, setText] = useState("")

	return (
		<ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 38, gap: 50 }}>
			<CatalogCard />

			<HighlightCard onPress={() => {}}/>

			<CartCard />

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
				<CartIcon itemsCount={3} />
			</View>

			<View style={{ flexDirection: "row", gap: 30 }}>
				<Select active={value} onPress={() => setValue(!value)} />
				<Tag active={value} />
			</View>

			<Input value={text} onChangeText={setText} />
			
		</ScrollView>
	)
}
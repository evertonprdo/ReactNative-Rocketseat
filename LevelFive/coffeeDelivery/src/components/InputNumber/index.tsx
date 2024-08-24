import { View } from "react-native";

import st from "./styles"
import { InputNumberIcon } from "@components/InputNumberIcon";
import { TextRegular } from "@components/Text";

type Props = {
  count: number
  onCountChange: (val: number) => void
}

export function InputNumber({ count, onCountChange }: Props) {
  function handleOnPressPlus() {
    if (count === 99) return
    onCountChange(count + 1)
  }

  function handleOnPressMinus() {
    if (count === 1) return
    onCountChange(count - 1)
  }
  return (
    <View style={st.container}>
      <InputNumberIcon
        variant="minus"
        onPress={handleOnPressMinus}
      />

      <TextRegular
        size="md"
        style={st.number}
      >
        {count}
      </TextRegular>

      <InputNumberIcon
        variant="plus"
        onPress={handleOnPressPlus}
      />
    </View>
  )
}
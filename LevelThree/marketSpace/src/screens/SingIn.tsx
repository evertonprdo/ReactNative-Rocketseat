import { useState } from "react";
import { View } from "react-native";
import { Ticket } from "phosphor-react-native"
import Icon from "@expo/vector-icons/Ionicons"

import { Button } from "@components/Button";
import { Checkable } from "@components/Checkable";

import { colors } from "@theme/colors";
import { Toggle } from "@components/Toggle";
import { Select } from "@components/Select";

export function SingIn() {
    const [ checkedC, setCheckedC ] = useState(false);
    const [ checked, setChecked ] = useState(false);
    const [ toggled, setToggled ] = useState(false);
    const [ selected, setSelected ] = useState("");

    return (
        <View className="flex-1 justify-center p-5 gap-3">
            <Checkable>
                <Checkable.Title>Selection</Checkable.Title>
                <Checkable.Checkbox checked={checkedC} onPress={() => setCheckedC(!checkedC)}/>
            </Checkable>

            <Checkable onPressLabel={() => setChecked(!checked)}>
                <Checkable.Radio checked={checked}/>
                <Checkable.Title>Selection</Checkable.Title>
            </Checkable>

            <Button>
                <Ticket size={16}/>
                <Button.Title>Press</Button.Title>
            </Button>

            <Button className="flex-col" variant="black" isLoading>
                <Icon name="woman-outline" color={colors.gray[700]}/>
                <Button.Title>Press</Button.Title>
            </Button>

            <Button variant="blue">
                <Button.Title>Press</Button.Title>
            </Button>

            <Toggle
                value={toggled}
                onPress={() => setToggled(!toggled)}
            />

            <Select selected={ selected }>
                <Select.Option onPress={() => setSelected("Todos")}>Todos</Select.Option>
                <Select.Option onPress={() => setSelected("Ativos")}>Ativos</Select.Option>
                <Select.Option onPress={() => setSelected("Inativos")}>Inativos</Select.Option>
            </Select>
        </View>
    )
}
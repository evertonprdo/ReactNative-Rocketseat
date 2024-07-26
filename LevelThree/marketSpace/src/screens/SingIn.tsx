import { useState } from "react";
import { View } from "react-native";
import { Ticket } from "phosphor-react-native"

import { Button } from "@components/Button";
import { Checkable } from "@components/Checkbox";

export function SingIn() {
    const [ checkedC, setCheckedC ] = useState(false);
    const [ checked, setChecked ] = useState(false);
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
                <Button.HView>
                    <Ticket size={16}/>
                    <Button.Title>Press</Button.Title>
                </Button.HView>
            </Button>

            <Button variant="black">
                <Button.Title>Press</Button.Title>
            </Button>

            <Button variant="blue">
                <Button.Title>Press</Button.Title>
            </Button>
        </View>
    )
}
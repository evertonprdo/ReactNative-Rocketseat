import { useToast } from "@hooks/useToast";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AppStackParamList } from "@routes/app.stack.routes";

import { BooleanInputsProps, CreateEditAd, RadioInputProps, TextFieldsProps } from "@templates/CreateEditAd";
import { useState } from "react";

type Props = NativeStackScreenProps<AppStackParamList, "createAd">

export function CreateAd({ navigation, route }: Props) {
    const { showToast } = useToast();

    const [ showModal, setShowModal ] = useState(false);

    const [textFields, setTextFields] = useState<TextFieldsProps>({
        name: "",
        description: "",
        price: ""
    })
    const [booleanInputs, setBooleanInputs] = useState<BooleanInputsProps>({
        boleto: false,
        card: false,
        cash: false,
        deposit: false,
        acceptTrade: false,
        pix: false
    })
    const [radioInput, setRadioInput] = useState<RadioInputProps>({ isNew: undefined });

    function handleOnFieldTextChange(text: string, key: keyof TextFieldsProps) {
        setTextFields({
            ...textFields,
            [key]: text
        })
    }

    function handleOnBooleanInputChange(key: keyof BooleanInputsProps) {
        setBooleanInputs({
            ...booleanInputs,
            [key]: !booleanInputs[key]
        })
    }

    function handleOnRadioInputPress(val: boolean) {
        setRadioInput({
            isNew: val
        })
    }

    function handleOnPressNext() {
        setShowModal(true)
    }
    return (
        <CreateEditAd
            type="create"
            product={{
                ...booleanInputs,
                ...textFields,
                ...radioInput
            }}
            onPressCancel={() => navigation.goBack()}
            onPressGoBack={() => navigation.goBack()}
            onPressNext={handleOnPressNext}
            modaVisibility={showModal}
            onPressBackEdit={() => setShowModal(false)}
            handleOnFieldTextChange={handleOnFieldTextChange}
            handleOnRadioInputPress={handleOnRadioInputPress}
            handleOnBooleanInputChange={handleOnBooleanInputChange}
        />
    )
}
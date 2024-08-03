import { useState } from "react";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AppStackParamList } from "@routes/app.stack.routes";

import { CreateEditAd } from "@templates/CreateOrEditProduct";
import type { FormResult } from "src/@types/FormProps";
import { useAuth } from "@hooks/useAuth";

type Props = NativeStackScreenProps<AppStackParamList, "CreateProduct">

export function CreateProduct({ navigation }: Props) {
    const { user: { avatar, name } } = useAuth();
    
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({} as FormResult)

    function handleOnPressNext() {
        setShowModal(true)
    }
    return (
        <CreateEditAd
            type="create"

            user={{ avatar, name }}
            state={data}
            setState={setData}

            onPressCancel={() => navigation.goBack()}
            onPressGoBack={() => navigation.goBack()}

            onPressNext={handleOnPressNext}

            modalVisibility={showModal}
            onPressBackEdit={() => setShowModal(false)}
        />
    )
}
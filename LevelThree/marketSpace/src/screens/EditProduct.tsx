import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAuth } from "@hooks/useAuth";

import { CreateEditAd } from "@templates/CreateOrEditProduct";

import type { AppStackParamList } from "@routes/app.stack.routes";
import type { FormResult } from "src/@types/FormProps";

type Props = NativeStackScreenProps<AppStackParamList, "EditProduct">

export function EditProduct({ navigation, route }: Props) {
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
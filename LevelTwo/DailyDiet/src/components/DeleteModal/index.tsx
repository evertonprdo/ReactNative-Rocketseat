import { Modal, type ModalProps } from "react-native";

import { Actions, FillContainer, Warning, Window } from "./styles";
import { Button } from "@components/Button";

type Props = ModalProps & {
    onPressConfirm: () => void
    onPressCancel: () => void
}
export function DeleteModal({ onPressCancel, onPressConfirm, ...rest }: Props) {
    return (
        <Modal 
            statusBarTranslucent
            transparent
            animationType="fade"
            {...rest}
        >
            <FillContainer>
                <Window>

                    <Warning style={{textAlign: "center"}}>
                        Deseja realmente excluir o{"\n"} registro da refeição?
                    </Warning>

                    <Actions>
                        <Button
                            title="Cancelar"
                            type="Light"
                            style={{flex: 1}}
                            onPress={ onPressCancel }
                        />
                        <Button
                            title="Sim, excluir"
                            type="Dark"
                            style={{flex: 1}}
                            onPress={ onPressConfirm }
                        />
                    </Actions>
                </Window>
            </FillContainer>
        </Modal>
    )
}
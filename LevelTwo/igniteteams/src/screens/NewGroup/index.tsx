import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/appError";

import { Container, Content, Icon } from "./styles";

import { groupCreate } from "@storage/group/groupCreate";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function NewGroup() {
    const navigation = useNavigation();

    const [ group, setGroup ] = useState('')

    async function handleNew() {
        try {
            if(group.trim().length === 0) {
                return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
            }

            await groupCreate(group);
            navigation.navigate('players', { group })
            
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon />
                <Highlight 
                    title="Nova turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />

                <Input 
                    placeholder="Nome da turma"
                    onChangeText={ setGroup }
                    style={{width: '100%'}}
                />

                <Button
                    title="Criar"
                    style={{width: '100%', marginTop:20}}
                    onPress={ handleNew }
                />
            </Content>
        </Container>
    )
}
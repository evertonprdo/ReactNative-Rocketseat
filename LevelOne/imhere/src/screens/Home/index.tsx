import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import Participant from "../../components/Participant";

export default function Home() {
    const [ participant, setParticipant ] = useState('')
    const [ participants, setParticipants ] = useState<string[]>([])

    function handleParticipantAdd() {
        if(participants.includes(participant)) {
            return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
        }

        setParticipants(prevState => [...prevState, participant])
        setParticipant('')
    }
    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}?`,[
            {
                text: 'Sim',
                onPress: () => { setParticipants(prev => prev.filter((value) => value !== name)) }
            },
            {
                text: 'Não',
                style: 'cancel',
            }
        ])

        console.log(`Você clicou em remover o participante ${name}`)
    }

    return (
        <View style={styles.container}>
            <Text style= {styles.eventName}>
                Nome do evento
            </Text>

            <Text style= {styles.eventDate}>
                Sexta, 4 de Novembro de 2022
            </Text>

            <View style= {styles.form}>
                <TextInput
                    style={styles.input}

                    placeholder="Nome do participante"
                    placeholderTextColor={"#6b6b6b"}

                    onChangeText={ setParticipant }
                    value= {participant}
                />
                <TouchableOpacity
                    style= {styles.button}
                    onPress={ handleParticipantAdd }
                >
                    <Text style= {styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={ participants }
                keyExtractor={ item => item }
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )} 
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style= {styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
        </View>
    )
}
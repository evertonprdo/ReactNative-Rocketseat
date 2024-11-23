import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import Participant from "../../components/Participant";

export default function Home() {
  const [participant, setParticipant] = useState('')
  const [participants, setParticipants] = useState<string[]>([])

  function handleParticipantAdd() {
    if (participants.includes(participant)) {
      return Alert.alert("Participant exists", "There is already a participant on the list with that name")
    }

    setParticipants(prevState => [...prevState, participant])
    setParticipant('')
  }
  
  function handleParticipantRemove(name: string) {
    Alert.alert("Remove", `Remove participant ${name}?`, [
      {
        text: 'Yes',
        onPress: () => { setParticipants(prev => prev.filter((value) => value !== name)) }
      },
      {
        text: 'No',
        style: 'cancel',
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event name
      </Text>

      <Text style={styles.eventDate}>
        Friday, November 4, 2022
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}

          placeholder="Participant name"
          placeholderTextColor={"#6b6b6b"}

          onChangeText={setParticipant}
          value={participant}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            No one has arrived the event yet?{'\n'}Add participants to your presence list.
          </Text>
        )}
      />
    </View>
  )
}
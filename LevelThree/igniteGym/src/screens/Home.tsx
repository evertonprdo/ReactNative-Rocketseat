import { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
    const [ group, setGroup ] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])
    const [ exercises, setExercises ] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Desenvolvimento Ombro'])

    const [ groupSelected, setGroupSelected ] = useState('costas')

    return (
        <View className="flex-1 justify-start">
            <Header className="py-5">
                <Header.Home/>
            </Header>

            <View>
                <FlatList
                    data={group}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Group
                            name={item}
                            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
                            onPress={() => setGroupSelected(item)}
                        />
                    )}
                    contentContainerClassName="px-8 my-10 max-h-10"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View className="flex-1 px-8">
                <View className="flex-row justify-between mb-5">
                    
                    <Text className="text-gray-200 text-base font-bold">
                        Exercícios
                    </Text>

                    <Text className="text-gray-200 font-regular">
                        {exercises.length}
                    </Text>
                </View>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <ExerciseCard
                            name={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-20"
                />
            </View>
        </View>

    )
}
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useToast } from "@hooks/useToast";

import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { ExerciseCard } from "@components/ExerciseCard";
import { Loading } from "@components/Loading";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";

import { api } from "@services/api";

import type { ExerciseDTO } from "@dtos/ExerciseDTO";

export function Home() {
    const [ isLoading, setIsLoading ] = useState(true);

    const [ group, setGroup ] = useState<string[]>([])
    const [ exercises, setExercises ] = useState<ExerciseDTO[]>([])

    const [ groupSelected, setGroupSelected ] = useState('antebraço')

    const { showToast } = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate("exercise", { exerciseId })
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups')
            setGroup(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possivel carregar os grupos musculares."

            showToast(title)
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsLoading(true);

            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data);
            
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possivel pegar os exercicios."

            showToast(title)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    }, [groupSelected]))

    return (
        <View className="flex-1 justify-start">
            <Header className="pb-5 flex-row items-center" paddingTop={20}>
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
                    contentContainerClassName="px-8 my-10 max-h-10 min-h-10"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            
            { isLoading 
                ? <Loading/>
                : (
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
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <ExerciseCard
                                    data={item}
                                    onPress={ () => handleOpenExerciseDetails(item.id) }
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerClassName="pb-20"
                        />
                    </View>
                )
            }
        </View>

    )
}
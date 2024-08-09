import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useToast } from "@hooks/useToast";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import type { ExerciseDTO } from "@dtos/ExerciseDTO";

import { Header } from "@components/Header";
import { Button } from "@components/Button";

import SeriesSvg from "@assets/SvgView/Series";
import RepetionsSvg from "@assets/SvgView/Repetitions";

import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
    exerciseId: string
}

export function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const route = useRoute();
    const { showToast } = useToast();

    const { exerciseId } = route.params as RouteParamsProps

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possivel carregar os detalhes do exercício."

            showToast(title, "bg-red-500")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true)

            await api.post('/history', { exercise_id: exerciseId })
            showToast("Parabéns! Exercício registrado no seu histórico.", "bg-green-500")

            navigation.navigate("history")
            
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possivel registrar o exercício."

            showToast(title, "bg-red-500")
        } finally {
            setSendingRegister(false)
        }
    }

    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId])

    return (
        <View className="flex-1">
            <Header className="pb-8 items-start">
                <Header.Exercises
                    data={exercise}
                    onPress={handleGoBack}
                />
            </Header>

            { isLoading
                ? <Loading />
                : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 32 }}
                    >
                        <View className="p-8">
                            <View className="w-full h-[364px] mb-3 rounded-lg overflow-hidden">
                                <Image
                                    className="flex-1"
                                    source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                                    resizeMode="cover"
                                />
                            </View>

                            <View className="bg-gray-600 rounded-md pb-4 px-4">
                                <View className="items-center justify-around mb-6 mt-5 flex-row">
                                    <View className="flex-row">
                                        <SeriesSvg />

                                        <Text className="text-gray-200 ml-2 font-regular">
                                            {exercise.series} séries
                                        </Text>
                                    </View>

                                    <View className="flex-row">
                                        <RepetionsSvg />

                                        <Text className="text-gray-200 ml-2 font-regular">
                                            {exercise.repetitions} repetições
                                        </Text>
                                    </View>
                                </View>

                                <Button
                                    title="Marcar como realizado"
                                    isLoading={sendingRegister}
                                    onPress={ handleExerciseHistoryRegister }
                                />
                            </View>
                        </View>
                    </ScrollView>
                )
            }
        </View>
    )
}
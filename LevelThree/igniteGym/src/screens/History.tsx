import { useCallback, useState } from "react";
import { SectionList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import cn from "@utils/cn";

import { useToast } from "@hooks/useToast";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";

import type { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { Loading } from "@components/Loading";

export function History() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ exercises, setExercises ] = useState<HistoryByDayDTO[]>([]);

    const { showToast } = useToast();

    async function fetchHistory() {
        try {
            setIsLoading(true);

            const response = await api.get('/history')
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possivel carregar os detalhes do exercício."

            showToast(title, "bg-red-500")
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory()
    }, []))

    return (
        <View className="flex-1">
            <Header>
                <Header.Title>Histórico de Exercícios</Header.Title>
            </Header>

            { isLoading ? <Loading/> : (
                <SectionList 
                    sections={ exercises }
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <HistoryCard data={item}/>}
                    renderSectionHeader={({ section }) => (
                        <Text className="text-gray-200 mt-10 mb-3 font-bold">
                            { section.title }
                        </Text>
                    )}
                    ListEmptyComponent={() => (
                        <Text className="text-gray-100 text-center font-regular">
                            Não há exercícios registrados ainda. {"\n"}
                            Vamos fazer exercícios hoje?
                        </Text>
                    )}
                    contentContainerClassName={cn("px-8 pb-20", {"flex-1 justify-center items-center": exercises.length === 0})}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    )
}
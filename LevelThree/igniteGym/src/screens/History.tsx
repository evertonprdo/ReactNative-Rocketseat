import { useState } from "react";
import { SectionList, Text, View } from "react-native";

import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import cn from "@utils/cn";

export function History() {
    const [ exercises, setExercises ] = useState([
        {
            title: "22.10.17",
            data: ["asdasd", "dadsa", "fdss", "sa"]
        },
        {
            title: "22.10.19",
            data: ["asdasd"]
        },
        {
            title: "22.10.21",
            data: ["asdasd", "dadsa"]
        },
    ]);

    return (
        <View className="flex-1">
            <Header>
                <Header.Title>Histórico de Exercícios</Header.Title>
            </Header>

            <SectionList 
                sections={ exercises }
                keyExtractor={item => item}
                renderItem={({}) => (
                    <HistoryCard/>
                )}
                renderSectionHeader={({ section }) => (
                    <Text className="text-gray-200 mt-10 mb-3 font-bold">
                        {section.title}
                    </Text>
                )}
                ListEmptyComponent={() => (
                    <Text className="text-gray-100 text-center">
                        Não há exercícios registrados ainda. {"\n"}
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
                contentContainerClassName={cn("px-8 pb-20", {"flex-1 justify-center items-center": exercises.length === 0})}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
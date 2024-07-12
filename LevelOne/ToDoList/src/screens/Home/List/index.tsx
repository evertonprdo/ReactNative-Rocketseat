import { FlatList, Text, View } from "react-native";
import { ClipboardList } from "lucide-react-native";

import { colors } from "../../../styles/colors";

import st from "./styles";
import { Task } from "../../../components/Task";
import { Info } from "./Info";
import { fontFamily } from "../../../styles/fontFamily";

import { type TaskProps } from "..";

type ListProps = {
    tasks: TaskProps[]
    onDelete: (id: number) => void
    onChangeStatus: (val: TaskProps) => void
}
export function List({ tasks, onDelete, onChangeStatus }: ListProps) {
    const done = tasks.filter(item => item.is_done !== false)
    return (
        <View style= { st.container }>
            <Info
                count_total={tasks.length}
                count_done={done.length}
            />
            <FlatList
                data= { tasks }
                keyExtractor={ item => "ToDo_" + item.id.toString() }
                renderItem={({item}) => (
                    <Task
                        checked= { item.is_done }
                        onDelete={ () => onDelete(item.id) }
                        onChangeStatus={ () => onChangeStatus(item) }
                    >
                        <Task.Text>{ item.description }</Task.Text>
                    </Task>
                )}
                ListEmptyComponent={ <EmptyList/> }
                contentContainerStyle= { st.listContainer }
                showsVerticalScrollIndicator= { false }
            />
        </View>
    )
}

function EmptyList() {
    return (
        <View style= {st.emptyListContainer}>
            <ClipboardList
                size={56}
                color={colors.gray[300]}
                strokeWidth={1}
            />
            <Text style= {st.text}>
                <Text
                    style= {st.emptyListText }
                >
                    Você ainda não tem tarefas cadastradas{"\n"}
                </Text>
                <Text
                    style= {[
                        st.emptyListText,
                        { fontFamily: fontFamily.regular }
                    ]}
                >
                    Crie tarefas e organize seus itens a fazer
                </Text>
            </Text>
        </View>
    )
}
import { Image, View } from "react-native";

import st from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { List } from "./List";
import { useState } from "react";

export type TaskProps = {
    id: number
    description: string,
    is_done: boolean
}

let nextId = 0

export default function Home() {
    const [ taskDescription, setTaskDescription ] = useState('');
    const [ tasks, setTasks ] = useState<TaskProps[]>([]);

    function handleOnAddTask() {
        const newTask: TaskProps = {
            id: nextId,
            description: taskDescription,
            is_done: false
        }
        setTasks([...tasks, newTask])
        setTaskDescription('')
        nextId++
    }
    function handleOnChangeStatus(task: TaskProps) {
        const updatedTask = {
            ...task,
            is_done: !task.is_done
        }
        const updatedTasks = tasks.map(item => {
            if(item.id === updatedTask.id) {
                return updatedTask
            } else {
                return item
            }
        })
        setTasks(updatedTasks)
    }
    function handleOnDeleteTask(id: number) {
        setTasks(tasks.filter(item => item.id !== id))
    }
    return (
        <View style={ st.container }>
            <View style= { st.imageContainer }>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style= { st.image }
                    resizeMode="contain"
                />
            </View>

            <View style= {st.addTaskContainer}>
                <Input>
                    <Input.Field 
                        onChangeText={ setTaskDescription }
                        value={ taskDescription }
                    />
                </Input>
                <Button 
                    variant="add"
                    onPress={ handleOnAddTask }
                />
            </View>

            <List
                tasks={ tasks }
                onDelete={ handleOnDeleteTask }
                onChangeStatus={ handleOnChangeStatus }
            />
        </View>
    )
}
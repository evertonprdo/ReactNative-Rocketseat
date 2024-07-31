import { PressableProps, TextProps, View, ViewProps } from "react-native";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native";
import cn from "@utils/cn";

import { colors } from "@theme/colors";
import { PressableIcon } from "@components/base/PressableIcon";
import { TextApp } from "@components/base/Text";

function Header({ children, className, ...props }: ViewProps) {
    return (
        <View
            className={cn("p-6 flex-row justify-between items-center gap-2", className)}
            {...props}
        >
            {children}
        </View>
    )
}

function GoBack({ ...props }: PressableProps) {
    return (
        <PressableIcon
            {...props}
        >
            <ArrowLeft color={colors.gray[100]} size={20} />
        </PressableIcon>
    )
}

function Edit({ ...props }: PressableProps) {
    return (
        <PressableIcon
            {...props}
        >
            <PencilSimpleLine color={colors.gray[100]} size={20}/>
        </PressableIcon>
    )
}

function Add({ ...props }: PressableProps) {
    return (
        <PressableIcon
            {...props}
        >
            <Plus color={colors.gray[100]} size={20}/>
        </PressableIcon>
    )
}

function Title({ children, ...props }: TextProps) {
    return (
        <TextApp
            className="font-bold text-xl text-gray-100"
            {...props}
        >
            {children}
        </TextApp>
    )
}

function Empty() {
    return (
        <View
            className="p-6"
        />
    )
}

Header.GoBack = GoBack
Header.Edit = Edit
Header.Add = Add
Header.Title = Title
Header.Empty = Empty

export { Header }
import { View, ViewProps } from "react-native";
import { Heading, Text } from "@components/Text";
import cn from "@utils/cn";

type Props = ViewProps & {
    title: string;
    counter: number;
}

export function HeaderList({ title, counter, className, ...rest }: Props) {
    return (
        <View
            className={cn("flex-row w-full justify-between items-center px-8 mt-6", className)}
            {...rest}
        >
            <Heading className="text-gray-200">
                {title}
            </Heading>

            <Text className="text-gray-200">
                {counter}
            </Text>
        </View>
    )
}
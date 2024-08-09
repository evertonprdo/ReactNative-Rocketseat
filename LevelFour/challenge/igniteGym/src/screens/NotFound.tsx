import React from 'react';
import { View, Text } from 'react-native';

function NotFoundScreen() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-white">Esta página não existe!</Text>
        </View>
    );
}

export default NotFoundScreen;
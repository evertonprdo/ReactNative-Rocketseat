import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@hooks/useAuth';

function NotFoundScreen() {
    const { user } = useAuth();
    const navigate = useNavigation();

    useEffect(() => {
        if (user.id) {
            navigate.reset({
                index: 0,
                routes: [{ name: 'home' } as never],
            });
        }
    }, [user.id]);

    return <View/>
}

export default NotFoundScreen;
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feedback } from "@screens/Feedback";
import { Home } from "@screens/Home";
import { Meal } from "@screens/Meal";
import { MenageMeal } from "@screens/MenageMeal";
import { Statistics } from "@screens/Statistics";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{headerShown: false}}
        >
            <Screen 
                name="home"
                component={Home}
            />
            <Screen 
                name="menage_meal"
                component={MenageMeal}
            />
            <Screen 
                name="meal"
                component={Meal}
            />
            <Screen 
                name="feedback"
                component={Feedback}
            />
            <Screen 
                name="statistics"
                component={Statistics}
            />
        </Navigator>
    )
}
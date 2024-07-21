import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import { getStorageMeals } from "./getStorageMeal";

export async function deleteMealById(mealId: number) {
    try {
        const storage = await getStorageMeals();
        const updatedMeals = storage.meals.filter((meal) => meal.id !== mealId)

        const updatedStorage = {
            ...storage,
            meals: updatedMeals
        }

        await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(updatedStorage))
    } catch (error) {
        throw error
    }
}
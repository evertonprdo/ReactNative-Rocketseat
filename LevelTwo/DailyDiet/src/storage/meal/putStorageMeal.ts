import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/appError";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import { getStorageMeals } from "./getStorageMeal";

import type { MealStorageDTO } from "./MealStorageDTO";

export async function putStorageMealById(updatedMeal: MealStorageDTO) {
    try {
        const storage = await getStorageMeals();
        const index = storage.meals.findIndex(item => item.id === updatedMeal.id);

        if(index === -1) throw new AppError("Refeição não foi encontrada!");
        storage.meals[index] = updatedMeal

        await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(storage))

    } catch (error) {
        throw error
    }   
}
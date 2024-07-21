import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import type { MealsStorageDTO } from "./MealStorageDTO";
import { AppError } from "@utils/appError";

export async function getStorageMeals() {
    try {
        const storage = await AsyncStorage.getItem(MEALS_COLLECTION);
        
        const meals: MealsStorageDTO = storage 
            ? JSON.parse(storage) 
            : { meals: [], last_id: null, streak: null }
        ;
        return meals

    } catch (error) {
        throw error
    }
}

export async function getStorageMealById(id: number) {
    try {
        const storage = await getStorageMeals();

        const meal = storage.meals.find((item) => item.id === id)
        if(!meal) {throw new AppError("Id não foi encontrado!")}

        return meal
    } catch (error) {
        throw error
    }
}

export async function getStorageStreak() {
    try {
        const storage = await getStorageMeals();

        return storage.streak ??= 0;
    } catch (error) {
        throw error
    }
}
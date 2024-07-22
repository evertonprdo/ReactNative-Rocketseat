import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorageMeals } from "./getStorageMeal";
import { MEALS_COLLECTION } from "@storage/storageConfig";

import type { MealStorageDTO, MealsStorageDTO } from "./MealStorageDTO";

export async function postMeal(meal: Omit<MealStorageDTO, "id">) {
    try {
        const storage = await getStorageMeals();
        const id = storage.last_id === null ? 0 : storage.last_id + 1;

        const newMeal = {...meal, id};
        const newStorageMeals: MealsStorageDTO = {
            meals: [...storage.meals, newMeal],
            last_id: id,
        };

        AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(newStorageMeals));

    } catch (error) {
        throw error
    }
}
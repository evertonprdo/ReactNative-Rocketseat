import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import type { MealsStorageDTO } from "./MealStorageDTO";

export async function getStorageMeals() {
    try {
        const storage = await AsyncStorage.getItem(MEALS_COLLECTION);
        
        const meals: MealsStorageDTO = storage 
            ? JSON.parse(storage) 
            : { meals: [], last_id: 0 }
        ;
        return meals

    } catch (error) {
        throw error
    }
}
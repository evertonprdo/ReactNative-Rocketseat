import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MealStorageDTO } from "./MealStorageDTO";

export async function postLastId(id: number) {

}

export async function postMeal(meal: Omit<MealStorageDTO, "id">) {
    try {
        

        const storage = JSON.stringify([])
    } catch (error) {
        throw error
    }
}
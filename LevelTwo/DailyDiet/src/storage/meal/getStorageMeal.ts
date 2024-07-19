import AsyncStorage from "@react-native-async-storage/async-storage";
import { LAST_ID } from "@storage/storageConfig";

export async function getLastId() {
    try {
        const storage = await AsyncStorage.getItem(LAST_ID);
        return storage ? storage : 0;

    } catch (error) {
        throw error
    }
}
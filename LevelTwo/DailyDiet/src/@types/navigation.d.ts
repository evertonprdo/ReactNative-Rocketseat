import type { StatusProps } from "@storage/meal/MealStorageDTO"

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined
            menage_meal: undefined | {
                id: number
            }
            meal: {
                id: number
            }
            feedback: undefined | {
                status: StatusProps
            }
            statistics: undefined
        }
    }
}
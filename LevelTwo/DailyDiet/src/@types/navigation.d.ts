export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined
            menage_meal: undefined | {
                id: number
            }
            meal: undefined
            feedback: undefined | {
                status: "GREEN" | "RED"
            }
            statistics: undefined
        }
    }
}
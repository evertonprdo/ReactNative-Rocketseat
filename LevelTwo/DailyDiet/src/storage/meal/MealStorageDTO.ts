export type MealStorageDTO = {
    id: number

    name: string
    description: string

    date: string
    time: string

    status: "RED" | "GREEN"
}

export type MealsStorageDTO = {
    meals: MealStorageDTO[]
    last_id: number
}
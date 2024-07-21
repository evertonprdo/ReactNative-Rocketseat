export type StatusProps = "RED" | "GREEN"

export type MealStorageDTO = {
    id: number

    name: string
    description: string

    date: string
    time: string

    status: StatusProps
}

export type MealsStorageDTO = {
    meals: MealStorageDTO[]
    last_id: number
}
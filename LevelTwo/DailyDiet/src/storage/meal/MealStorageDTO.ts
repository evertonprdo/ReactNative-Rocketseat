export type MealStorageDTO = {
    id: number

    name: string
    description: string

    date: Date
    time: Date

    status: "RED" | "GREEN"
}
import type { MealsStorageDTO, StatusProps } from "@storage/meal/MealStorageDTO";

export type StatisticsScreenDataProps = {
    streak: number
    registers: number
    goodMeals: number
    badMeals: number
    percent: string
    type: StatusProps
}

function goodMealsPercent(meals : MealsStorageDTO["meals"]) {
    let some = 0;

    meals.map(meal => {
        if(meal.status === "GREEN") {
            some++
        }
    })
    let percentFloat = (some / meals.length)*100
    
    return percentFloat
}

function orderByDate(meals : MealsStorageDTO["meals"]) {
    return meals.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function screenData(meals: MealsStorageDTO["meals"]): StatisticsScreenDataProps {
    let goodMeals = 0;
    let badMeals = 0;
    let streak = 0;
    let bestStreak = 0;

    const orderedMeals = orderByDate(meals);

    for(const meal of orderedMeals) {
        if(meal.status === "GREEN") {
            goodMeals++
            streak++
            if(streak > bestStreak) {
                bestStreak = streak
            }
        } else {
            badMeals++
            streak = 0
        }
    }
    const percentFloat = goodMealsPercent(meals)
    const formatedPercent = percentFloat.toFixed(2) + "%"

    return {
        streak: bestStreak,
        registers: meals.length,
        goodMeals,
        badMeals,
        percent: formatedPercent,
        type: percentFloat >= 50 ? "GREEN" : "RED"
    }
}

export const statistics = { goodMealsPercent, screenData }
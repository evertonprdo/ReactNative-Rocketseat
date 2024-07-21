import type { SectionListMealsProps, SectionListDateMealsProps } from "@components/MealsSectionList";
import { MealsStorageDTO } from "@storage/meal/MealStorageDTO";
import dayjs from "dayjs";

export function parseMealsToSectionList(meals: MealsStorageDTO["meals"]): SectionListMealsProps {
    const result: SectionListMealsProps = [];
    let dates: string[] = getOrderedDates(meals);
    
    for(const date of dates) {
        const dateMeals: SectionListDateMealsProps = {date: "", data: []}
        for(const meal of meals) {
            if(date === meal.date) {
                dateMeals.date = dayjs(date).format("DD.MM.YYYY")
                dateMeals.data.push(meal)
            }
        }
        dateMeals.data = orderSectionDateMealsByTime(dateMeals.data)
        result.push(dateMeals)
    }
    return result
}

export function getOrderedDates(meals: MealsStorageDTO["meals"]) {
    let dates: string[] = [];
    for(const meal of meals) {
        if(!dates.includes(meal.date)) {
            dates.push(meal.date)
        }
    }
    dates = dates.sort((a, b) => Number(new Date(b)) - Number(new Date(a)));
    return dates
}

export function orderSectionDateMealsByTime(data: SectionListDateMealsProps["data"]) {
    return data.sort((a, b) => {
        const aParts = a.time.split(":");
        const bParts = b.time.split(":");

        const aMinutes = parseInt(aParts[0]) * 60 + parseInt(bParts[1]);
        const bMinutes = parseInt(bParts[0]) * 60 + parseInt(aParts[1]);
        return bMinutes - aMinutes;
    })
}
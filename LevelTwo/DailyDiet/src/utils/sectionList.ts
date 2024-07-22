import type { SectionListMealsProps, SectionListDateMealsProps } from "@components/MealsSectionList";
import { MealsStorageDTO } from "@storage/meal/MealStorageDTO";
import dayjs from "dayjs";

export function parseMealsToSectionList(meals: MealsStorageDTO["meals"]): SectionListMealsProps {
    const result: SectionListMealsProps = [];
    let dates: string[] = getOrderedDates(meals);
    
    for(const date of dates) {

        const dateMeals: SectionListDateMealsProps = {date: "", data: []}

        for(const meal of meals) {

            if(dayjs(date).isSame(meal.date, "day")) {
                dateMeals.date = dayjs(date).format("DD.MM.YYYY")
                dateMeals.data.push(meal)
            }
        }
        dateMeals.data = dateMeals.data.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        result.push(dateMeals)
    }
    return result
}

export function getOrderedDates(meals: MealsStorageDTO["meals"]) {
    let dates: string[] = [];

    for(const meal of meals) {
        
        let date = dayjs(meal.date).format("YYYY-MM-DD");
        date = dayjs(date).toISOString();

        if(!dates.includes(date)) {
            dates.push(date)
        }
    }
    dates = dates.sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime()
    });
    return dates
}
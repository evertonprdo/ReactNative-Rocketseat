import type { MealFormProps } from "@screens/MenageMeal";

function validateTime(filteredText: string) {
    const parts = filteredText.split(':');
    if (parts.length === 2) {
        const hours = parts[0];
        const minutes = parts[1];
        if (hours.length !== 2 || minutes.length !== 2 || parseInt(hours) > 23 || parseInt(minutes) > 59) {
            return false;
        } else {
            return true;
        }
    }
    return false
}

function allInputsFill(meal: MealFormProps, iptLenght: number) {
    if(Object.keys(meal).length !== iptLenght ) return false

    let isValid = true
    for (const key in meal) {
        if(meal[key as keyof MealFormProps].trim() === "") {
            return isValid = false;
        }
    }
    return isValid
}

export const validateForm = { validateTime, allInputsFill }
function price(price: string) {
    const splitPrice = price.split(",")

    if(splitPrice.length > 2) return false
    if(splitPrice[1] && splitPrice[1].length > 2) return false
    if(isNaN(parseFloat(price.trim()))) return false
    if(parseFloat(price) <= 0) return false
    return true
}

function stringLenght(str: string, min: number, max: number) {
    return str.trim().length >= min && str.trim().length <= max
}

export const InputValidation = { price, stringLenght }
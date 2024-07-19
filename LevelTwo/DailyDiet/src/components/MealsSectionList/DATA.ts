export type MealDTO = {
    time: string
    description: string
    status: "RED" | "GREEN"
}

export type MealsDTO = {
    date: string
    data: MealDTO[]
}[]

export const DATA: MealsDTO = [
    {
        date: "12.08.22",
        data: [
            {
                time: "20:00",
                description: "X-tudo",
                status: "RED"
            },
            {
                time: "12:00",
                description: "Salada cesar com Frango",
                status: "GREEN"
            }
        ]
    },
    {
        date: "12.08.23",
        data: [
            {
                time: "20:00",
                description: "X-tudo",
                status: "RED"
            },
            {
                time: "12:00",
                description: "Salada cesar com Frango",
                status: "GREEN"
            }
        ]
    },
    {
        date: "12.08.24",
        data: [
            {
                time: "08:00",
                description: "Iogurte com granola",
                status: "GREEN"
            },
            {
                time: "13:00",
                description: "Salmão grelhado com legumes",
                status: "GREEN"
            },
            {
                time: "19:00",
                description: "Pizza de calabresa",
                status: "RED"
            }
        ]
    },
    {
        date: "12.08.25",
        data: [
            {
                time: "07:30",
                description: "Torradas com abacate",
                status: "GREEN"
            },
            {
                time: "12:30",
                description: "Arroz integral com frango",
                status: "GREEN"
            },
            {
                time: "18:00",
                description: "Sorvete de chocolate",
                status: "RED"
            }
        ]
    },
    {
        date: "12.08.26",
        data: [
            {
                time: "08:00",
                description: "Suco verde",
                status: "GREEN"
            },
            {
                time: "13:00",
                description: "Quinoa com legumes",
                status: "GREEN"
            },
            {
                time: "20:00",
                description: "Hambúrguer",
                status: "RED"
            }
        ]
    },
    {
        date: "12.08.27",
        data: [
            {
                time: "09:00",
                description: "Panqueca de aveia",
                status: "GREEN"
            },
            {
                time: "14:00",
                description: "Lasanha de berinjela",
                status: "GREEN"
            },
            {
                time: "21:00",
                description: "Frango à parmegiana",
                status: "RED"
            }
        ]
    },
    {
        date: "12.08.28",
        data: [
            {
                time: "07:00",
                description: "Smoothie de frutas",
                status: "GREEN"
            },
            {
                time: "12:00",
                description: "Sopa de legumes",
                status: "GREEN"
            },
            {
                time: "19:00",
                description: "Bolo de chocolate",
                status: "RED"
            }
        ]
    }
];

import Expresso from "@assets/coffees/Expresso.svg";
import Americano from "@assets/coffees/Americano.svg";
import ExpressoCremoso from "@assets/coffees/ExpressoCremoso.svg";
import Latte from "@assets/coffees/Latte.svg";
import CafeGelado from "@assets/coffees/CafeGelado.svg";
import Capuccino from "@assets/coffees/Capuccino.svg";
import Mochaccino from "@assets/coffees/Mochaccino.svg";
import ChocolateQuente from "@assets/coffees/ChocolateQuente.svg";
import Cubano from "@assets/coffees/Cubano.svg";
import Havaiano from "@assets/coffees/Havaiano.svg";
import Arabe from "@assets/coffees/Arabe.svg";
import Irlandes from "@assets/coffees/Irlandes.svg";

export const traditional = [
  { id: 1, price: 990, icon: Expresso, title: "Expresso Tradicional", description: "O tradicional café feito com água quente e grãos moídos", category: "Tradicionais" },
  { id: 2, price: 730, icon: Americano, title: "Expresso Americano", description: "Expresso diluído, menos intenso que o tradicional", category: "Tradicionais" },
  { id: 3, price: 810, icon: ExpressoCremoso, title: "Expresso Cremoso", description: "Café expresso tradicional com espuma cremosa", category: "Tradicionais" },
  { id: 4, price: 1190, icon: Latte, title: "Latte", description: "Café expresso com o dobro de leite e espuma cremosa", category: "Tradicionais" },
  { id: 5, price: 890, icon: CafeGelado, title: "Expresso Gelado", description: "Bebida preparada com café expresso e cubos de gelo", category: "Tradicionais" },
]

const sweet = [
  { id: 6, price: 1212, icon: Capuccino, title: "Capuccino", description: "Bebida com canela feita de doses de café, leite e espuma", category: "Doces" },
  { id: 7, price: 730, icon: Mochaccino, title: "Mocaccino", description: "Café expresso com calda de chocolate, pouco leite e espuma", category: "Doces" },
  { id: 8, price: 810, icon: ChocolateQuente, title: "Chocolate Quente", description: "Bebida feita com chocolate dissolvido no leite quente e café", category: "Doces" },
]

const specials = [
  { id: 9, price: 950, icon: Cubano, title: "Cubano", description: "Drink gelado de café expresso com rum, creme de leite e hortelã", category: "Especiais" },
  { id: 10, price: 1480, icon: Havaiano, title: "Havaiano", description: "Bebida adocicada preparada com café e leite de coco", category: "Especiais" },
  { id: 11, price: 1212, icon: Arabe, title: "Árabe", description: "Bebida preparada com grãos de café árabe e especiarias", category: "Especiais" },
  { id: 12, price: 1590, icon: Irlandes, title: "Irlandês", description: "Bebida a base de café, uísque irlandês, açúcar e chantilly", category: "Especiais" },
]

export const coffeeSearchArray = [...traditional, ...sweet, ...specials]

const DATA = [
  {
    title: "Tradicionais",
    data: traditional
  },
  {
    title: "Doces",
    data: sweet
  },
  {
    title: "Especiais",
    data: specials
  },
]



export type CoffeeProps = typeof DATA[0]["data"]
export default DATA
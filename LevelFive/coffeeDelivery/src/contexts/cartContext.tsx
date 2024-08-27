import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { CoffeeProps, coffeeSearchArray } from "@data/coffee";
import { addCartItem, CartItemProps, getCartItems, updateCartItem } from "@storage/cartStorage";

type CoffeeCartProps = CoffeeProps & CartItemProps

export type CartContextProps = {
  cart: {
    items: CoffeeCartProps[]
    total_amount: number
    lenght: number
  }
  addItem: (newItem: CartItemProps) => Promise<void>
  updateItem: (updItem: CartItemProps) => Promise<void>
}

export const CartContext = createContext<CartContextProps | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartContextProps["cart"]>({} as CartContextProps["cart"]);

  async function fetchStorageCart() {
    const items = await getCartItems()

    let totalAmount = 0;
    const dataItems = items.map(item => {
      const dataItem = coffeeSearchArray.filter(dataCoffee => dataCoffee.id === item.id)[0]

      totalAmount += dataItem.price * item.amount
      return {
        ...dataItem,
        amount: item.amount,
        coffee_size: item.coffee_size
      }
    })

    setCart({
      items: dataItems,
      total_amount: totalAmount,
      lenght: dataItems.length
    })
  }

  async function addItem(newCoffee: CartItemProps) {
    try {
      await addCartItem(newCoffee)

      fetchStorageCart();

    } catch (error) {
      throw error
    }
  }

  async function updateItem(updateCoffee: CartItemProps) {
    try {
      await updateCartItem(updateCoffee)

      fetchStorageCart();

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchStorageCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem }}>
      {children}
    </CartContext.Provider>
  )
}
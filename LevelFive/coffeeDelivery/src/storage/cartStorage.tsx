import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = '@coffee:cart'

export type CoffeeSizes = "114ml" | "140ml" | "227ml"

export type CartItemProps = {
  id: number
  amount: number
  coffee_size: CoffeeSizes
}

export type CartProps = CartItemProps[]

export async function getCartItems() {
  try {
    const response = await AsyncStorage.getItem(CART_KEY)
    return response ? JSON.parse(response) as CartProps : [] as CartProps

  } catch (error) {
    throw error
  }
}

export async function addCartItem(newItem: CartItemProps) {
  try {
    const cartItems = await getCartItems();

    if (cartItems.length === 0) {
      cartItems.push(newItem)

      return AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems))
    }

    let isAlredyIn = false

    const newCart = cartItems.map((item) => {
      if (item.id === newItem.id && item.coffee_size === newItem.coffee_size) {
        isAlredyIn = true
        item.amount += newItem.amount
      }

      return item
    })

    if (!isAlredyIn) {
      newCart.push(newItem)
    }

    return AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart))

  } catch (error) {
    throw error
  }
}

export async function updateCartItem(updateItem: CartItemProps) {
  try {
    const cartItems = await getCartItems();

    const updatedCart = cartItems.map((item) => {
      if (item.id === updateItem.id && item.coffee_size === updateItem.coffee_size) {
        item.amount = updateItem.amount
      }

      return item
    })
    return AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart))

  } catch (error) {
    throw error
  }
}

export async function removeItemCart(id: number, size: CoffeeSizes) {
  try {
    const response = await getCartItems();

    const newData = response.filter(item => !(item.id === id && item.coffee_size === size))

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(newData))
  } catch (error) {
    throw error
  }
}

export async function removeAllItems() {
  try {
    AsyncStorage.removeItem(CART_KEY)

  } catch (error) {
    throw error
  }
}
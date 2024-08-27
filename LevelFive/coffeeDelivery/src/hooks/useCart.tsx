import { useContext } from "react";
import { CartContext, CartContextProps } from "@contexts/cartContext";

export function useCart() {
  const context = useContext(CartContext)
  
  return context as CartContextProps
}
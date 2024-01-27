import { Product } from "../payload-types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type CartItem = {
  product: Product
}

type CartState = {
  items: CartItem[]
  addItems: (product: Product) => void
  removeItems: (productId: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItems: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] }
        }),
      removeItems: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

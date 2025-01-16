import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define the initial state shape explicitly with proper types.
interface ProductState {
  items: any[];
  item: any;
  cart: any[];
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    item: {},
    cart: [],
  } as ProductState,
  reducers: {
    addtocart: (state, action: PayloadAction<{ item: any }>) => {
      const { item } = action.payload;
      const id = item.name;
      let ClonedItem = [...state.cart];
      const existingIndex = ClonedItem.findIndex((i) => i.name === id);
      if (existingIndex !== -1) {
        ClonedItem[existingIndex].quantity =
          parseInt(ClonedItem[existingIndex].quantity) +
          parseInt(item.quantity);
        console.log(ClonedItem[existingIndex].quantity);
        state.cart = ClonedItem;
      } else {
        state.cart.push(item);
      }

      toast.success(item.name + "  added to Cart");
    },
    removefromcart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((i) => i.name !== id);
    },
    updateQuantity: (state, action) => {
      console.log("Updated quantity");
      const { id, type } = action.payload;
      let ClonedItem = [...state.cart];

      ClonedItem = ClonedItem.map((item) => {
        if (item.name === id) {
          if (type === "increase") {
            return { ...item, quantity: parseInt(item.quantity) + 1 };
          } else if (type === "decrease") {
            if (item.quantity === "1") {
              return null;
            } else {
              return { ...item, quantity: parseInt(item.quantity) - 1 };
            }
          }
        }
        return item;
      });

      state.cart = ClonedItem.filter((item) => item !== null);
    },
    updateProductData: (state, action) => {
      const { cart } = action.payload;
      if (cart) {
        state.cart = cart;
      }
    },
  },
});

export const { addtocart, updateProductData, updateQuantity, removefromcart } =
  productSlice.actions;

export default productSlice.reducer;

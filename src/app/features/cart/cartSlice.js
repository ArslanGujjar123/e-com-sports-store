import { createSlice } from "@reduxjs/toolkit";

const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

const initialState = {
  cartList: storedCartList,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.cartList.find(
        (item) => item._id === productToAdd._id
      );
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item._id === action.payload.product._id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action) => {
      const productTodecreaseQnty = action.payload;
      const productExit = state.cartList.find(
        (item) => item._id === productTodecreaseQnty._id
      );
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item._id !== productExit._id
        );
      } else {
        state.cartList = state.cartList.map((item) =>
          item._id === productExit._id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    clearCart: (state) => {
      state.cartList = []; // Clear the cart list
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item._id !== productToDelete._id
      );
    },
  },
});

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct,clearCart } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      
    },
    addProductFailure:(state,action) => {
      state.error= action.payload;
  },
    getProduct: (state, action) => {
      state.products = action.payload.map((product) => {
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          quantity: product.quantity,
        };
      });
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (ele) => ele.id == action.payload.id
      );
      state.products[index] = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity,
        category: action.payload.category,
        description: action.payload.description,
      };
      
    },
    updateProductFailure: (state,action) => {
      state.error=action.payload;
  },
    deleteProduct: (state, action) => {
      const id = action.payload.id;
      state.products = state.products.filter((ele) => ele.id  !== id);
    },
  },
});

export const { addProduct,addProductFailure, getProduct, updateProduct,updateProductFailure, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;

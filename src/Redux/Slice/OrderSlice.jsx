import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    getOrder: (state, action) => {
      state.orders = action.payload.map((order) => {
        return {
          id: order._id,
          name: order.name,
          product: order.product,
          quantity: order.quantity,
          orderValue: order.orderValue,
          orderedDate: order.orderedDate,
          deliveryStatus: order.deliveryStatus,
        };
      });
    },
    
  },
});

export const {addOrder, getOrder}= orderSlice.actions;

export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    addOrderFailure: (state, action) => {
      state.error = action.payload;
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(
        (ele) => ele.id == action.payload.id
      );
      state.orders[index] = {
        id: action.payload.id,
        name: action.payload.name,
        product: action.payload.product,
        quantity: action.payload.quantity,
        orderValue: action.payload.orderValue,
        orderedDate: action.payload.orderedDate,
        deliveryStatus: action.payload.deliveryStatus,
      };
    },
    updateOrderFailure: (state, action) => {
      state.error = action.payload;
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

export const { addOrder, addOrderFailure, getOrder, updateOrder, updateOrderFailure } = orderSlice.actions;

export default orderSlice.reducer;

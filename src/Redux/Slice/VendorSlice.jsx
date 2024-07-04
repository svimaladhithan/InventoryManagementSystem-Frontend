import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: [],
  },
  reducers: {
    addVendor: (state, action) => {
      state.vendor.push(action.payload);
    },
    getVendor: (state, action) => {
      state.vendor = action.payload.map((vendor) => {
        return {
          id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          phone: vendor.phone,
          address: vendor.address,
          gst_no: vendor.gst_no,
          products: vendor.products,
        };
      });
    },
    addVendorFailure: (state,action) => {
        state.error=action.payload;
    }
  },
});

export const {addVendor, getVendor, addVendorFailure} = vendorSlice.actions;
export default vendorSlice.reducer;

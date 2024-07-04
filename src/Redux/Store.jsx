import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import themeReducer from "./Slice/ThemeSlice";
import productReducer from "./Slice/ProductSlice";
import vendorReducer from "./Slice/VendorSlice";
import orderReducer from "./Slice/OrderSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  products: productReducer,
  vendors: vendorReducer,
  orders: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);

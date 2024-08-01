import { configureStore } from "@reduxjs/toolkit";
import countPageReducer from "./features/countPageSlice";
import cartReducer from "./features/cart";
import useReducer from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    cartReducer,
    countPageReducer,
    useReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

setupListeners(store.dispatch);

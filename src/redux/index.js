import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoriesApi } from "../api/categories";
import { productsApi } from "../api/products";
import { userApi } from "../api/user";
import { cartApi } from "../api/cart";
import { ordersApi } from "../api/orders";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(userApi.middleware)
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(cartApi.middleware),
});

setupListeners(store.dispatch);

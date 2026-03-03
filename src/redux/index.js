import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoriesApi } from "../api/categories";
import { productsApi } from "../api/products";
import { userApi } from "../api/user";
import { cartApi } from "../api/cart";
import { ordersApi } from "../api/orders";
import { favoritesApi } from "../api/favorites";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(categoriesApi.middleware)
      .concat(userApi.middleware)
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(cartApi.middleware)
      .concat(favoritesApi.middleware),
});

setupListeners(store.dispatch);

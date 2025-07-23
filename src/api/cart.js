import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users/",
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    getCartContents: build.query({
      query: () => "cart/",
      providesTags: ["Cart"],
    }),

    addItemToCart: build.mutation({
      query: (item) => ({
        url: "cart/items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: build.mutation({
      query: () => ({
        url: "cart/items",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    partialUpdateItem: build.mutation({
      query: (item) => ({
        url: "cart/items",
        method: "PATCH",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeItemFromCart: build.mutation({
      query: (id) => ({
        url: `cart/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartContentsQuery,
  useAddItemToCartMutation,
  useClearCartMutation,
  usePartialUpdateItemMutation,
  useRemoveItemFromCartMutation,
} = cartApi;

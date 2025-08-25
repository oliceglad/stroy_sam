import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users/",
    credentials: "include",
    responseHandler: async (response) => {
      const data = await response.json().catch(() => null);
      return {
        data,
        status: response.status,
      };
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    getCartContents: build.query({
      query: () => "cart/",
      transformResponse: (response) => ({
        ...response.data,
        status: response.status,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.data,
      }),
      providesTags: ["Cart"],
    }),

    addItemToCart: build.mutation({
      query: (item) => ({
        url: "cart/items",
        method: "POST",
        body: item,
      }),
      transformResponse: (response) => ({
        ...response.data,
        status: response.status,
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: build.mutation({
      query: () => ({
        url: "cart/items",
        method: "DELETE",
      }),
      transformResponse: (response) => ({
        ...response.data,
        status: response.status,
      }),
      invalidatesTags: ["Cart"],
    }),

    partialUpdateItem: build.mutation({
      query: (item) => ({
        url: "cart/items",
        method: "PATCH",
        body: item,
      }),
      transformResponse: (response) => ({
        ...response.data,
        status: response.status,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeItemFromCart: build.mutation({
      query: (id) => ({
        url: `cart/items/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => ({
        ...response.data,
        status: response.status,
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

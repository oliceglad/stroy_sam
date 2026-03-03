import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavoritesContents: builder.query({
      query: () => "/users/favorites/",
      providesTags: ["Favorites"],
    }),

    addItemToFavorites: builder.mutation({
      query: (body) => ({
        url: "/users/favorites/items",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Favorites"],
    }),

    removeItemFromFavorites: builder.mutation({
      query: (id) => ({
        url: `/users/favorites/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesContentsQuery,
  useAddItemToFavoritesMutation,
  useRemoveItemFromFavoritesMutation,
} = favoritesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://92.242.60.110:8000/api" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProductsByCategoryId: builder.query({
      query: (categoryId) => `/products/category/${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: "Products", id: `category-${categoryId}` },
      ],
    }),

    getProductById: builder.query({
      query: (id) => `/products/id/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    searchProducts: builder.query({
      query: (search) =>
        `/products/search?search=${encodeURIComponent(search)}`,
    }),

    autocompleteProducts: builder.query({
      query: (search) =>
        `/products/autocomplete?search=${encodeURIComponent(search)}`,
    }),

    getFilterOptions: builder.query({
      query: (categoryId) =>
        `/products/filters/options?category_id=${categoryId}`,
    }),

    getProductsByFilter: builder.mutation({
      query: ({ categoryId, filters }) => ({
        url: `/products/filter?category_id=${categoryId}`,
        method: "POST",
        body: filters,
      }),
    }),
  }),
});

export const {
  useGetProductsByCategoryIdQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useAutocompleteProductsQuery,
  useGetFilterOptionsQuery,
  useGetProductsByFilterMutation,
} = productsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getMainCategories: builder.query({
      query: () => "/categories/main",
      providesTags: ["Categories"],
    }),
    getSubcategories: builder.query({
      query: (parentId) => `/categories/sub/${parentId}`,
      providesTags: (result, error, parentId) => [
        { type: "Categories", id: parentId },
      ],
    }),
  }),
});

export const { useGetMainCategoriesQuery, useGetSubcategoriesQuery } =
  categoriesApi;

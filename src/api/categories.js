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

    getCategoriesTree: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const mainRes = await fetchWithBQ("/categories/main");
          if (mainRes.error) return { error: mainRes.error };

          const main = mainRes.data || [];

          const loadSubs = async (cat) => {
            const subRes = await fetchWithBQ(`/categories/sub/${cat.id}`);
            if (subRes.error) return { ...cat, children: [] };

            const subs = subRes.data || [];
            if (subs.length > 0) {
              const children = await Promise.all(subs.map(loadSubs));
              return { ...cat, children };
            } else {
              return { ...cat, children: [] };
            }
          };

          const tree = await Promise.all(main.map(loadSubs));
          return { data: tree };
        } catch (err) {
          console.error("Ошибка в getCategoriesTree:", err);
          return { error: { status: "CUSTOM_ERROR", error: err.message } };
        }
      },
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetMainCategoriesQuery,
  useGetSubcategoriesQuery,
  useGetCategoriesTreeQuery,
} = categoriesApi;

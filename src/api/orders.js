import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users/orders",
    credentials: "include",
  }),
  tagTypes: ["Orders", "Order"],
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: ({ start_date, end_date, status } = {}) => {
        const params = new URLSearchParams();
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (status) params.append("status", status);
        return `?${params.toString()}`;
      },
      providesTags: ["Orders"],
    }),

    getOrderDetail: builder.query({
      query: (orderId) => `/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createOrder: builder.mutation({
      query: () => ({
        url: "/checkout",
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => ["Orders", { type: "Order", id }],
    }),

    reorder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}/reorder`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetOrderDetailQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useReorderMutation,
} = ordersApi;

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
        const queryStr = params.toString();
        return queryStr ? `?${queryStr}` : "";
      },
      providesTags: ["Orders"],
    }),

    getOrderDetail: builder.query({
      query: (orderId) => `/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    getOrderDeliveryInfo: builder.query({
      query: (orderId) => `/info_delivery/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
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
  useGetOrderDeliveryInfoQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useReorderMutation,
} = ordersApi;

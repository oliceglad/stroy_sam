import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),

    smsVerification: builder.mutation({
      query: (body) => ({
        url: "/users/sms_verification",
        method: "POST",
        body,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials).toString(),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("access", data.access_token);
          if (data.refresh_token) {
            Cookies.set("refresh", data.refresh_token);
          }
        } catch {}
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          Cookies.remove("access");
          Cookies.remove("refresh");
        } catch {}
      },
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh/",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("access_token", data.access_token);
          if (data.refresh_token) {
            Cookies.set("refresh_token", data.refresh_token);
          }
        } catch {}
      },
    }),

    getMe: builder.query({
      query: () => "/users/me/",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useSmsVerificationMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
} = userApi;

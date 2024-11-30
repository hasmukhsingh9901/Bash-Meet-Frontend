import { createApi } from "@reduxjs/toolkit/query/react";
import transformBaseQuery from "./authAPI";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: transformBaseQuery,
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (id) => `/user/${id}`,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserMutation } = apiSlice;

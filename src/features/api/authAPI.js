import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import authSlice from "../authSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.process.env.VITE_SERVER_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      getState().auth.accessToken || localStorage.getItem("accessToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReafreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      api.dispatch(authSlice.actions.setAccessToken(accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authSlice.actions.logout());
    }
  }
  return result;
};

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReafreshToken,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => `/auth/user`,
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authAPI;

import { RootState } from './../feature/store';

import { logout, setUser } from '../feature/Auth/authSlice'
import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 404) {
    // toast.error(result.error.data.message);
    console.log(result.error)
  }
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes : ["books"],
  endpoints: () => ({}),
});

import {
  fetchBaseQuery,
  createApi,
  BaseQueryApi,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { logOut } from "store/reducers/userReducer";

import { BASE_URL } from "constants/urls";
import { RootState } from "store";

type customError = {
  data: {
    message: string;
    status: string;
  };
  status: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    headers.set("Content-Type", "application/json");

    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, customError, {}>;

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logOut());
    return result;
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["user"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

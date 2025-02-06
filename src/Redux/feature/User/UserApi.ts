import { baseApi } from "@/Redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        const params = new URLSearchParams();

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),

    deactivateUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ({ userId }) => [
        { type: "users", id: userId }, // ✅ Lowercase tag
        "users", // ✅ Invalidate the books list
      ],
    }),
    activateUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/active/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ({ userId }) => [
        { type: "users", id: userId }, // ✅ Lowercase tag
        "users", // ✅ Invalidate the books list
      ],
    }),
    makeUserToAdmin: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/makeAdmin/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ({ userId }) => [
        { type: "users", id: userId }, // ✅ Lowercase tag
        "users", // ✅ Invalidate the books list
      ],
    }),
    makeAdminToUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/makeUser/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "users", id: userId }, // ✅ Lowercase tag
        "users", // ✅ Invalidate the books list
      ],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/changePassword",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "users", id: userId }, // ✅ Lowercase tag
        "users", // ✅ Invalidate the books list
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeactivateUserMutation,
  useActivateUserMutation,
  useMakeUserToAdminMutation,
  useMakeAdminToUserMutation,
  useChangePasswordMutation,
} = userApi;
